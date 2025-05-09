import { Args, Mutation, Resolver, Query, Int, ResolveField, Parent } from "@nestjs/graphql";
import { MoviesService } from "./movies.service";
import { MoviesResposne, MovieResponse, MoviesResponseWithMetaData, CommentResponse, CommentsResponse } from "./types/movie.type";
import { MovieSortDto, MoviesQueryDto, QueryPagingDto, CommentDto, QueryDto } from "./dto/movie.dto";
import { GraphQLClient, gql } from 'graphql-request';
import { UseGuards } from "@nestjs/common";
import { AuthenGuardMovie } from "./guards/authen.guards";
import { User, Comment } from "./entities/comment.entity";
import { Movie } from "./entities/movie.entity";
import { Reference } from "./entities/reference.entity";

@Resolver(() => Movie)
export class MovieResolver {

    constructor(
        private readonly movieService: MoviesService
    ) { }


    // get top new movies
    @Query(() => MoviesResposne)
    async getTopNewMovie(
        @Args("limit", { type: () => Int }) limit: number,

    ): Promise<MoviesResposne> {
        const result = await this.movieService.getTopNewMovie(limit)
        return { movies: result };
    }

    // get specified movie
    @Query(() => MovieResponse)
    async getSpecifiedMovie(
        @Args("slug") slug: string
    ): Promise<MovieResponse> {
        const result = await this.movieService.getSpecifiedMovie(slug);
        return { movie: result }
    }

    // get movies with query
    @Query(() => MoviesResponseWithMetaData)
    async getMovies(
        @Args("paging", { nullable: true }) paging?: QueryPagingDto,
        @Args("query", { nullable: true }) query?: MoviesQueryDto,
        @Args("sort", { nullable: true }) sorting?: MovieSortDto
    ): Promise<MoviesResponseWithMetaData> {
        const { limit = 10, page = 1 } = paging ?? {};
        const { type = "tat-ca", category = "tat-ca", country = "tat-ca", year = "tat-ca" } = query ?? {};
        const { sort = "mac-dinh" } = sorting ?? {};
        const result = await this.movieService.getMovies(
            { limit, page },
            { type, category, country, year },
            { sort }
        )
        return result
    }

    // get default recommend movies
    @Query(() => MoviesResposne)
    async getRecommendedMovies(
        @Args("limit", { type: () => Int }) limit: number,

    ): Promise<MoviesResposne> {
        if (!limit) limit = 20;
        const result = await this.movieService.getRecommendedMovies(limit)
        return { movies: result };
    }

    // test with guard
    @Query(() => MoviesResposne)
    @UseGuards(AuthenGuardMovie)
    async getPrivateMovies(
        @Args("id") userId: string,
    ): Promise<MoviesResposne> {
        const result = await this.movieService.getPrivateMovies();
        return { movies: result };
    }

    // Get Movies with name
    @Query(() => MoviesResponseWithMetaData)
    async getMoviesWithName(
        @Args("content") content: string,
        @Args("query") query: QueryDto
    ): Promise<MoviesResponseWithMetaData> {
        const { page = 1, limit = 10 } = query
        const result = await this.movieService.getMoviesWithName(content, { page, limit });

        return result
    }

    // default query
    @Query(() => String)
    getMovie() {
        return this.movieService.getMovie();
    }
}

@Resolver(() => Comment)
export class CommentResolver {
    constructor(
        private readonly movieService: MoviesService
    ) { }

    // add comment
    @Mutation(() => CommentResponse)
    @UseGuards(AuthenGuardMovie)
    async addComment(
        @Args("id") userId: string,
        @Args("comment") comment: CommentDto
    ): Promise<CommentResponse> {
        const result = await this.movieService.addComment(comment)
        return { comment: result };
    }

    // get comments
    @Query(() => CommentsResponse)
    async getComments(
        @Args("movieId") movieId: string
    ): Promise<CommentsResponse> {
        const result = await this.movieService.getComments(movieId);

        return {
            comments: result
        }
    }

    // resolver tham chiếu đến user của comment, lấy thông tin user
    @ResolveField(() => User)
    user(@Parent() comment: Comment): User {
        return {
            __typename: 'User',
            id: comment.userId,
        } as any; // bypass TypeScript check
    }
}

@Resolver(() => Reference)
export class ReferenceResolver {
    constructor(
        private readonly movieService: MoviesService
    ) { }

    @Mutation(() => Boolean)
    @UseGuards(AuthenGuardMovie)
    async updateLikedMovies(
        @Args("id") userId: string,
        @Args("movieId") movieId: string,
    ): Promise<Boolean> {
        return  await this.movieService.updateLikedMovies(userId, movieId)
    }

    @Query(() => Boolean)
    @UseGuards(AuthenGuardMovie)
    async getStatusLikedMovie(
        @Args("id") userId: string,
        @Args("movieId") movieId: string,
    )
}