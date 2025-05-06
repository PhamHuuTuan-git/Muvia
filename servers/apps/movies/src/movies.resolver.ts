import { Args, Mutation, Resolver, Query, Int } from "@nestjs/graphql";
import { MoviesService } from "./movies.service";
import { MoviesResposne, MovieResponse, MoviesResponseWithMetaData,CommentResponse } from "./types/movie.type";
import { MovieSortDto, MoviesQueryDto, QueryPagingDto, CommentDto } from "./dto/movie.dto";
import { GraphQLClient, gql } from 'graphql-request';
import { UseGuards } from "@nestjs/common";
import { AuthenGuardMovie } from "./guards/authen.guards";

@Resolver()
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
        if(!limit) limit = 20;
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

    @Mutation(() => CommentResponse)
    @UseGuards(AuthenGuardMovie)
    async addComment(
        @Args("id") userId: string,
        @Args("comment") comment: CommentDto
    ): Promise<CommentResponse> {
        const result = await this.movieService.addComment(comment)
        return {comment: result};
    }

    // default query
    @Query(() => String)
    getMovie() {
        return this.movieService.getMovie();
    }
}