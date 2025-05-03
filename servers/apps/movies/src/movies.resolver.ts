import { Args, Mutation, Resolver, Query, Int } from "@nestjs/graphql";
import { MoviesService } from "./movies.service";
import { MoviesResposne, MovieResponse } from "./types/movie.type";
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


    // default query
    @Query(() => String)
    getMovie() {
        return this.movieService.getMovie();
    }
}