import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const whitelist = configService.get<string>('CORS_WHITELIST')?.split(',') || [];
  app.enableCors({
    origin: whitelist, // hoặc domain FE thật như https://myclient.com
    credentials: true, // Cho phép gửi cookie, header auth
    allowedHeaders: 'Content-Type, Authorization',  // Các header được phép
    exposedHeaders: 'Content-Length, X-Requested-With',  // Các header cho phép client truy cập
  });
  const port = configService.get<string>('GATEWAY_PORT') || 3000;
  await app.listen(port);
}
bootstrap();
