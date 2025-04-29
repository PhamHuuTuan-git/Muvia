import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class MoviesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
  ) { }
  // get top new movie
  getTopNewMovie() {

  }

  // default query
  getMovie(): string {
    return 'Hello Movie!';
  }
}
