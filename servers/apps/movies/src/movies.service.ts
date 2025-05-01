import { Injectable } from '@nestjs/common';
import { PrismaMovieService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class MoviesService {
  constructor(
    private readonly prisma: PrismaMovieService,
    private readonly configService: ConfigService
  ) { }
  // get top new movie
  async getTopNewMovie(limit: number) {
    try {
      const movies = await this.prisma.movie.findMany({
        
      });
    }catch(err) {

    }
  }

  // default query
  getMovie(): string {
    return 'Hello Movie!';
  }
}
