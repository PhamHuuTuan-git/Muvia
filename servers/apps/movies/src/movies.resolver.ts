import { Args, Mutation, Resolver, Query, Context } from "@nestjs/graphql";
import { MoviesService } from "./movies.service";
@Resolver()
export class MovieResolver {
    constructor(
        private readonly movieService: MoviesService
      ) { }

    @Query(() => String)
    getMovie() {
        return this.movieService.getMovie();
    }
}