import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
// Đây là module Users, chúng ta cần ApolloFederationDriver để có thể tự tạo schema riêng
// cho service này, và nó có resolver, controller, service logic
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Cho phép sử dụng ở mọi nơi mà không cần import lại
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2 // Sử dụng federation version 2, hỗ trợ các directive như là @key, @external, @requires, v.v 
      }
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
})
export class UsersModule {}
