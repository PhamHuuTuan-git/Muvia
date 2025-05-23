import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MovieResolver,CommentResolver, ReferenceResolver } from './movies.resolver';
import { PrismaMovieService } from '../prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
          envFilePath: './apps/movies/.env',
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
  ],
  controllers: [],
  providers: [MoviesService, MovieResolver, ConfigService, PrismaMovieService,CommentResolver, ReferenceResolver],
})
export class MoviesModule {}
