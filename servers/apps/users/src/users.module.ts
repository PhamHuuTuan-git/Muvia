import { Module } from '@nestjs/common';
// import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserResolver } from './users.resolver';
import { PrismaService } from 'apps/users/prisma/prisma.service';
import { MyJwtService } from './jwt.service';
import { EmailModule } from './email/email.module';
import { ConfigService } from '@nestjs/config';
// Đây là module Users, chúng ta cần ApolloFederationDriver để có thể tự tạo schema riêng
// cho service này, và nó có resolver, controller, service logic
@Module({
  imports: [

    ConfigModule.forRoot({
      envFilePath: './apps/users/.env',
      isGlobal: true
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2 // Sử dụng federation version 2, hỗ trợ các directive như là @key, @external, @requires, v.v 
      },
      context: ({ req, res }) => ({ req, res, authorization: req.headers.authorization, }), // dùng để truyền cookie về cho client
      playground: {
        settings: {
          "request.credentials": "include", // Otherwise cookies won't be sent
        }
      },
    }),
    EmailModule
  ],
  // controllers: [UsersController],
  controllers: [],
  providers: [UsersService, JwtService, UserResolver, PrismaService, MyJwtService, ConfigService],
})
export class UsersModule { }
