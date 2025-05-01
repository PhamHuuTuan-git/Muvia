import { Args, Mutation, Resolver, Query, Int } from "@nestjs/graphql";
import { MoviesService } from "./movies.service";
import { MoviesResposne } from "./types/movie.type";
@Resolver()
export class MovieResolver {
    constructor(
        private readonly movieService: MoviesService
    ) { }

    // get top new movie
    @Query(() => MoviesResposne)
    async getTopNewMovie(
        @Args("limit", { type: () => Int }) limit: number,

    ): Promise<MoviesResposne> {
        const result = await this.movieService.getTopNewMovie(limit)
        return { movies: result };
    }

    // default query
    @Query(() => String)
    getMovie() {
        return this.movieService.getMovie();
    }
}