import { ObjectType, Field, Directive } from "@nestjs/graphql";
import { Movie, MovieDetail } from "../entities/movie.entity";
import { Comment } from "../entities/comment.entity";

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

@ObjectType()
export class AuthorizeUserPolicyResult {
    @Field(() => [Movie])
    authorizeUserPolicy: boolean;
}

@ObjectType()
export class CommentResponse {
    @Field(() => Comment)
    comment: Comment | any

    @Field(() => ErrorType, { nullable: true })
    error?: ErrorType;
}

@ObjectType()
export class CommentsResponse {
    @Field(() => [Comment])
    comments: Comment[] | any

    @Field(() => ErrorType, { nullable: true })
    error?: ErrorType;
}

@ObjectType()
export class LikedMoviesResponse {
    @Field(() => [Movie])
    movies: Movie[] | any
    @Field(() => ErrorType, { nullable: true })
    error?: ErrorType;
}

@ObjectType()
export class RecentMovie {
    @Field()
    movieId: string

    @Field()
    slug: string;

    @Field()
    name: string;

    @Field()
    episode: string;

    @Field()
    time: string;

    @Field()
    thumb_url: string

}

@ObjectType()
export class RecentMoviesResponse {
    @Field(() => [RecentMovie])
    movies: RecentMovie[] | any;

    @Field(() => ErrorType, { nullable: true })
    error?: ErrorType;
}