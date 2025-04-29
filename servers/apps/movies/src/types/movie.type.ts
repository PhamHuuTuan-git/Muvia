import { ObjectType, Field } from "@nestjs/graphql";
import { Movie } from "../entities/movie.entity";

@ObjectType()
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
    movies: Movie[];

    @Field(() => ErrorType, {nullable: true})
    error?: ErrorType
}