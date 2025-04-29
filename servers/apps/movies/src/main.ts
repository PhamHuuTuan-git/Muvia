import { NestFactory } from '@nestjs/core';
import { MoviesModule } from './movies.module';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(MoviesModule);
  const configService = app.get(ConfigService);
  const port = process.env.PORT || configService.get<string>('MOVIE_PORT') || 3000;
  await app.listen(port);
}
bootstrap();
