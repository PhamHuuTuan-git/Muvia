import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import {ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  const configService = app.get(ConfigService);
  const port = process.env.PORT || configService.get<string>('USER_PORT') || 3000;
  await app.listen(port);
}
bootstrap();
