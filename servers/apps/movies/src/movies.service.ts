import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesService {

  getMovie(): string {
    return 'Hello Movie!';
  }
}
