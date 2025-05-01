import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "../src/generated/client"; // Giusp giao tiếp với DB

// Kết nối tới DB thông qua Prisma ORM trong NestJS
@Injectable()

// Kế thừa PrismaClient để có thể dùng method của Prisma (findMany, create, update,...)
// Sử dụng lifecycle hook onModuleInit, giúp tự động kết nối DB khi module khởi động
export class PrismaMovieService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }
}