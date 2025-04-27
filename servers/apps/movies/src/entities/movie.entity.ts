import { Field, ObjectType, ID, Directive } from "@nestjs/graphql";
import { DetailMovie } from "./detail_movie.entity";
import { Episo } from "./episo.entity";
@ObjectType()
@Directive('@key(fields:"id")')
export class Movie {

    @Field(() => ID)
    id: string;

    @Field(() => DetailMovie)
    movie: DetailMovie;

    @Field(() => Episo)
    episodes: Episo
}