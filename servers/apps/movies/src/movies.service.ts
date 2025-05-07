import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaMovieService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Movie } from './entities/movie.entity';
import { MovieSortDto, MoviesQueryDto, QueryPagingDto } from './dto/movie.dto';

interface RunCommandResult {
  cursor?: {
    firstBatch?: Movie[];
  };
  ok?: number;
}
@Injectable()
export class MoviesService {
  constructor(
    private readonly prisma: PrismaMovieService,
    private readonly configService: ConfigService
  ) { }
  // get top new movie
  async getTopNewMovie(limit: number) {
    try {
      const start = new Date(new Date().getFullYear() - 1, 0, 1).toISOString();
      const end = new Date().toISOString();
      // console.log("start end: ", start, end)
      const result = await this.prisma.$runCommandRaw({ // cho phép bạn chạy các lệnh MongoDB gốc, không bị giới hạn bởi Prisma schema.
        aggregate: 'movies', //"Movie" là tên collection (được ánh xạ từ Prisma model Movie).
        pipeline: [
          { $match: { "modified.time": { $gte: start, $lte: end } } }, // Chỉ chọn những phim có modified.time nằm trong khoảng từ start đến end.
          { $sort: { "modified.time": -1 } }, //-1 là sắp xếp giảm dần (mới nhất trước).
          { $limit: limit } // Chỉ lấy limit phim gần nhất (sau khi đã lọc và sort).
        ],
        cursor: {} //dùng để yêu cầu MongoDB trả kết quả dưới dạng cursor, để bạn có thể đọc được như mảng.
      }) as unknown as RunCommandResult; //bởi vì $runCommandRaw() trả về kiểu Prisma.JsonValue, nên cần as unknown trước rồi mới as RunCommandResult
      const rawMovies = result.cursor?.firstBatch ?? [];
      const movies = rawMovies.map((movie: any) => ({
        ...movie,
        id: movie._id?.toString() ?? null, // dùng toString nếu là ObjectId
      }));
      return movies;
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  // get recommend movies
  async getRecommendedMovies(limit: number) {
    if (!limit) limit = 20;
    try {
      const currentYear = new Date().getFullYear();
      const lastYear = currentYear - 1;
      const result = await this.prisma.movie.findMany({
        where: {
          year: {
            gte: lastYear,
            lte: currentYear,
          }
        },
        orderBy: {
          view: 'desc',
        },
        take: limit,
      });
      return result;
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  // get specified movie
  // type:
  //   "series",
  //   "single",
  //   "tvshows",
  //   "hoathinh"
  async getSpecifiedMovie(slug: string) {
    try {

      const movie = await this.prisma.movie.findFirst({
        where: {
          slug
        }
      })

      // console.log("got movie: ", movie);
      if (!movie) {
        throw new BadRequestException("Cannot find this movie")
      }

      const categories = await this.prisma.category.findMany({
        where: {
          id: { in: movie.category }
        }
      });

      const countries = await this.prisma.country.findMany({
        where: {
          id: { in: movie.country }
        }
      });

      const fullMovie = {
        ...movie,
        category: categories,
        country: countries
      };

      return fullMovie;
    } catch (err) {
      //console.log("er: ", err)
      throw new BadRequestException(err);
    }
  }

  // lay danh sach phim
  async getMovies(paging: QueryPagingDto, query: MoviesQueryDto, sorting: MovieSortDto) {
    try {
      const { limit = 10, page = 1 } = paging;
      const { type = "tat-ca", category = "tat-ca", country = "tat-ca", year = "tat-ca" } = query;
      const { sort = "mac-dinh" } = sorting;

      // pre-handle filter
      const where: any = {};
      if (type !== "tat-ca") where.type = type;
      if (category !== "tat-ca") {
        const result = await this.prisma.category.findFirst({
          where: {
            slug: category
          }
        })
        if (!result) throw new BadRequestException("Category is not existed");
        where.category = {
          has: result.id // kiểm tra mảng có chứa đúng id
        };
      }
      if (country !== "tat-ca") {
        const result = await this.prisma.country.findFirst({
          where: {
            slug: country
          }
        })
        if (!result) throw new BadRequestException("Country is not existed");
        where.country = {
          has: result.id // kiểm tra mảng có chứa đúng id
        };
      }
      if (year !== "tat-ca") where.year = parseInt(year);

      // pre-handle sort
      let orderBy: any = {};
      switch (sort) {
        case "nam":
          orderBy = [{ year: "desc" }, { id: 'asc' }];
          break;
        case "luot-xem":
          orderBy = [{ view: "desc" }, { id: 'asc' }];
          break;
        default:
          orderBy = [{ id: 'asc' }]; // mặc định không sắp xếp
      }

      const movies = await this.prisma.movie.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      })

      const total = await this.prisma.movie.count({ where });
      return {
        movies: movies,
        meta: {
          total: total,
          page: page,
          totalPages: Math.ceil(total / limit),
        }
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getPrivateMovies() {
    try {
      const movies = await this.prisma.movie.findMany({
        where: {
          year:2025
        }
      })
      return movies;
    }catch(err) {
      throw new BadRequestException(err.message);
    }
  }

  async addComment (comment) {
    const {userId, movieId, type, content} = comment;
    try {
      const result = await this.prisma.comment.create({
        data: {
          type,
          content,
          userId,
          movieId
        }
      })
      return result
    }catch(err) {
      console.log("comment error: ", err.message)
      throw new BadRequestException(err.message);
    }
  }

  // get comments
  async getComments(movieId: string) {
    try {
      const result = await this.prisma.comment.findMany({
        where: {
          movieId
        }
      })
      return result
    }catch(err) {
      console.log("comment error: ", err.message)
      throw new BadRequestException(err.message);
    }
  }

  // default query
  getMovie(): string {
    return 'Hello Movie!';
  }
}
