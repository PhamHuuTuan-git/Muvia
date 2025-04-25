import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, BadRequestException  } from '@nestjs/common';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(UsersModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe(
      {
        // whitelist: true, // Loại bỏ field không có decorator
        // forbidNonWhitelisted: true, // Báo lỗi nếu có field thừa
        transform: true, // Chuyển đổi input về đúng kiểu
        exceptionFactory: (errors) => {
          const messages = errors.map(
            (err) =>
              Object.values(err.constraints || {}).join(', ')
          );
          return new BadRequestException(messages);
        },
      }
    ),
  );

  // Giusp phục vụ file tĩnh từ thư mục public, giả sử trong thư mục /public/images/logo.png
  // thì chúng ta có thể truy cập thông qua http://localhost:3001/images/logo.png
  app.useStaticAssets(join(__dirname, '..', 'public'));
  //  Đặt thư mục chứa template để render giao diện hoặc email, trong lần này giúp chúng ta
  // render được template mail khi gửi ở trong thư mục chỉ định
  app.setBaseViewsDir(join(__dirname, '..', 'servers/email-templates'));
  // Thiết lập ejs làm view engine trong NestJS để render giao diện 
  app.setViewEngine('ejs')
  const port = process.env.PORT || configService.get<string>('USER_PORT') || 3000;
  await app.listen(port);
}
bootstrap();
