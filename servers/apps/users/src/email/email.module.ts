import { Module, Global } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailResolver } from './email.resolver';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Global()
@Module({
  imports: [
    //Khởi tạo module bất đồng bộ
    MailerModule.forRootAsync({
      // useFactory dùng để custome 1 module dựa vào biến môi trường, vì chúng
      // ta sử dụng ConfigService để lấy dữ liệu từ biến môi trường
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('SMTP_HOST'), //Máy chủ SMTP
          secure: true, // Dùng SSL, port 465
          auth: {
            user: config.get('SMTP_MAIL'), // Email dùng để gửi
            pass: config.get('SMTP_PASSWORD') // Password của email gửi
          }
        },
        defaults: {
          from: 'Muvia movie', // Tên của email gửi đi
        },
        template: {
          // Thư mục chứa template EJS
          dir: join(__dirname, "../../../../servers/email-templates"),
          // Sử dụng EJS để render nội dung email
          adapter: new EjsAdapter(),

          // Cho phép EJS linh hoạt render, ví dụ như là <%= name %>
          options: {
            strict: false
          }
        }
      }),
      // Chỉ định các phụ thuộc mà module này cần từ DI Container, cụ thể là
      // ConfigService, vì chúng ta có sử dụng ConfigService ở trên useFactory
      inject: [ConfigService]
    })
  ],
  providers: [EmailResolver, EmailService],
  exports: [EmailService]
})
export class EmailModule { }
