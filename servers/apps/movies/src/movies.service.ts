import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaMovieService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Movie } from './entities/movie.entity';
import { MovieSortDto, MoviesQueryDto, QueryDto, QueryPagingDto, RecentMovieDto } from './dto/movie.dto';


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
          year: 2025
        }
      })
      return movies;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async addComment(comment) {
    const { userId, movieId, type, content } = comment;
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
    } catch (err) {
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
    } catch (err) {
      console.log("comment error: ", err.message)
      throw new BadRequestException(err.message);
    }
  }

  // get movies with name
  async getMoviesWithName(content: string, query: QueryDto) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;
    try {
      const totalItems = await this.prisma.movie.count({
        where: {
          name: {
            contains: content,
            mode: 'insensitive', // Không phân biệt chữ hoa/chữ thường (tùy chọn)
          }
        }
      });
      if (totalItems === 0) {
        return {
          movies: [],
          meta: {
            total: 0,
            totalPages: 0,
            page
          }
        }
      }
      const result = await this.prisma.movie.findMany({
        where: {
          name: {
            contains: content,
            mode: 'insensitive', // Không phân biệt chữ hoa/chữ thường (tùy chọn)
          }
        },
        skip,
        take: limit,
      })
      const totalPages = Math.ceil(totalItems / limit);
      return {
        movies: result,
        meta: {
          total: totalItems,
          totalPages,
          page
        }
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  // update liked movies
  async updateLikedMovies(userId: string, movieId: string) {
    try {
      const refre = await this.prisma.reference.findFirst({
        where: {
          userId
        }
      })
      if (!refre) {

        await this.prisma.reference.create({
          data: {
            userId,
            likedMovies: [movieId],
            recentWatching: []
          }
        })
      } else {
        const exist = refre.likedMovies.includes(movieId);
        if (exist) {
          const new_likedMovies = refre.likedMovies.filter((ele) => {
            return ele !== movieId
          })
          await this.prisma.reference.update({
            where: {
              id: refre.id
            },
            data: {
              likedMovies: new_likedMovies,
            }
          })
        } else {
          const new_likedMovies = [...refre.likedMovies, movieId]
          await this.prisma.reference.update({
            where: {
              id: refre.id
            },
            data: {
              likedMovies: new_likedMovies,
            }
          })
        }
      }
      return true;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getStatusLikedMovie(userId: string, movieId: string) {
    try {
      const result = await this.prisma.reference.findFirst({
        where: {
          userId: userId
        }
      })
      if (!result) return false;
      const isLiked = result.likedMovies.includes(movieId)
      if (isLiked) return true
      return false
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getLikedMovies(userId: string) {
    if (!userId) throw new BadRequestException("Login to access")
    try {
      const reference = await this.prisma.reference.findFirst({
        where: { userId: userId },
        select: { likedMovies: true },
      });
      if (reference && reference.likedMovies.length > 0) {
        const movies = await this.prisma.movie.findMany({
          where: {
            id: {
              in: reference.likedMovies,
            },
          },
        });
        return {
          movies: movies
        };
      } else {
        return {
          movies: []
        };
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async addRecentMovie(userId: string, movieInfor: RecentMovieDto) {
    // console.log("caching: ", movieInfor)
    try {
      const reference = await this.prisma.reference.findFirst({
        where: {
          userId: userId
        }
      })
      if (!reference) {
        const { movieId, episode, time, name, thumb_url, slug } = movieInfor
        await this.prisma.reference.create({
          data: {
            userId,
            likedMovies: [],
            recentWatching: [
              {
                movieId: movieId,
                episode: episode,
                time: time,
                name: name,
                slug: slug,
                thumb_url: thumb_url
              }
            ]
          }
        })
      } else {
        if (Array.isArray(reference.recentWatching) && reference.recentWatching.length > 0) {
          const recent = reference.recentWatching as {
            movieId: string;
            episode: string;
            time: string;
            name: string;
            thumb_url: string;
            slug: string;
          }[];
          const foundItem = recent.find(item => item.movieId === movieInfor.movieId);
          if (foundItem) {
            const updatedRecent = recent.map(item =>
              item.movieId === movieInfor.movieId
                ? {
                  movieId: movieInfor.movieId,
                  episode: movieInfor.episode,
                  time: movieInfor.time,
                  name: movieInfor.name,
                  thumb_url: movieInfor.thumb_url,
                  slug: movieInfor.slug
                }
                : item
            );
            await this.prisma.reference.update({
              where: {
                id: reference.id,
              },
              data: {
                recentWatching: updatedRecent,
              },
            });
          } else {
            recent.push({
              movieId: movieInfor.movieId,
              episode: movieInfor.episode,
              time: movieInfor.time,
              name: movieInfor.name,
              thumb_url: movieInfor.thumb_url,
              slug: movieInfor.slug
            });
            await this.prisma.reference.update({
              where: {
                id: reference.id,
              },
              data: {
                recentWatching: recent,
              },
            });
          }
        } else {
          const recent = reference.recentWatching as {
            movieId: string;
            episode: string;
            time: string;
            name: string;
            thumb_url: string;
            slug: string;
          }[];
          recent.push({
            movieId: movieInfor.movieId,
            episode: movieInfor.episode,
            time: movieInfor.time,
            name: movieInfor.name,
            thumb_url: movieInfor.thumb_url,
            slug: movieInfor.slug
          });
          await this.prisma.reference.update({
            where: {
              id: reference.id,
            },
            data: {
              recentWatching: recent,
            },
          });
        }
      }
      return true;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getRecentMovies(userId: string) {
    if (!userId) throw new BadRequestException("Login to access")
    try {
      const reference = await this.prisma.reference.findFirst({
        where: {
          userId: userId
        },
        select: { recentWatching: true },
      })

      if (reference && reference.recentWatching && Array.isArray(reference.recentWatching) && reference.recentWatching.length > 0) {
        // console.log("recentwatching: ", reference)
        return {
          movies: reference.recentWatching
        }
      } else {
        return {
          movies: []
        };
      }

    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async deleteRecentMovie(userId: string, movieId: string) {
    if (!userId) throw new BadRequestException("Login to access")
    try {
      const reference = await this.prisma.reference.findFirst({
        where: {
          userId: userId
        },
        
      })
      if (reference && reference.recentWatching && Array.isArray(reference.recentWatching) && reference.recentWatching.length > 0) {
        const recent = reference.recentWatching as {
          movieId: string;
          episode: string;
          time: string;
          name: string;
          thumb_url: string;
          slug: string;
        }[];
        const foundItem = recent.find(item => item.movieId === movieId);
        if(foundItem) {
          const final = recent.filter((ele: any) => {
            return ele.movieId !== movieId
          })
          await this.prisma.reference.update({
            where: {
              id: reference.id
            },
            data: {
              recentWatching: final
            }
          })
          return true
        }else {
           throw new BadRequestException("Cannot find this movie")
        }
      } else {
        throw new BadRequestException("Cannot find this item")
      }

    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
  // default query
  getMovie(): string {
    return 'Hello Movie!';
  }
}
