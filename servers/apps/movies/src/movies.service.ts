import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaMovieService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Movie } from './entities/movie.entity';
import { QueryPagingDto } from './dto/movie.dto';
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
      console.log("start end: ", start, end)
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

  // get specified movie
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
  async getMovies(paging: QueryPagingDto) {
    try {
      const { limit, page } = paging;
      // type:
      // "series",
      //   "single",
      //   "tvshows",
      //   "hoathinh"
      const movies = await this.prisma.movie.findMany({

      })

    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  // default query
  getMovie(): string {
    return 'Hello Movie!';
  }
}
