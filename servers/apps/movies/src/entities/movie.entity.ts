import { Field, ObjectType, ID, Directive } from "@nestjs/graphql";
import { DetailMovie } from "./detail_movie.entity";
import { Episode } from "./episo.entity";
@ObjectType()
@Directive('@key(fields:"id")')
export class Movie {

    @Field(() => ID)
    id: string;

    @Field(() => DetailMovie)
    movie: DetailMovie;

    @Field(() => [Episode])
    episodes: Episode[]
}