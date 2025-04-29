import { Args, Mutation, Resolver, Query, Context } from "@nestjs/graphql";
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

    ): Promise<MoviesResposne> {
         this.movieService.getTopNewMovie()
         return {
            movies: [
                
            ]
         }
    }

    // default query
    @Query(() => String)
    getMovie() {
        return this.movieService.getMovie();
    }
}