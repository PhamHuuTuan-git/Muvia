import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
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
  
  app.use(cookieParser());

  // app.use((req: any, res: any, next: any) => {
  //   // res.on('finish', () => {
  //   //   console.log('Gateway response headers:', res.getHeaders());
  //   // });
  //   // req.on('finish', () => {
  //   //   console.log('Gateway request headers:', req.getHeaders());
  //   // })
  //   next();
  // });
  const port = configService.get<string>('GATEWAY_PORT') || 3000;

  await app.listen(port);
}
bootstrap();
