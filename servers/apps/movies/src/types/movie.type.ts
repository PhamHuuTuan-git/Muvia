import { ObjectType, Field, Directive } from "@nestjs/graphql";
import { Movie, MovieDetail } from "../entities/movie.entity";

@ObjectType()
@Directive('@shareable')
export class ErrorType {
    @Field()
    message: string;

    @Field({ nullable: true })
    // kiểu dữ liệu là string, nếu ko có thì là undefined
    code?: string;
}

@ObjectType()
export class MoviesResposne {
    @Field(() => [Movie])
    movies: Movie[] | any;

    @Field(() => ErrorType, { nullable: true })
    error?: ErrorType
}

@ObjectType()
export class MovieResponse {
    @Field(() => MovieDetail)
    movie: MovieDetail | any;

    @Field(() => ErrorType, { nullable: true })
    error?: ErrorType

}

@ObjectType()
export class MetaData {
    @Field()
    total: number;

    @Field()
    page: number;

    @Field()
    totalPages: number
}

@ObjectType()
export class MoviesResponseWithMetaData {

    @Field(() => [Movie])
    movies: Movie[] | any;

    @Field(() => MetaData)
    meta: MetaData

    @Field(() => ErrorType, { nullable: true })
    error?: ErrorType;

   
}