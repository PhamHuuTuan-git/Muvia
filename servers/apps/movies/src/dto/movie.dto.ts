import { InputType, Field, Int } from "@nestjs/graphql";
import { isNotEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class QueryPagingDto {
    @Field(() => Int, { nullable: true })
    @IsNumber({}, { message: "Limit must be a number" })
    limit: number

    @Field(() => Int, { nullable: true })
    @IsNumber({}, { message: "Page must be a number" })
    page: number
}

@InputType()
export class MoviesQueryDto {
    @Field(() => String, { nullable: true })
    @IsString({ message: "Type must be string" })
    type: string

    @Field(() => String, { nullable: true })
    @IsString({ message: "Category must be string" })
    category: string

    @Field(() => String, { nullable: true })
    @IsString({ message: "Country must be string" })
    country: string

    @Field(() => String, { nullable: true })
    @IsString({ message: "Year must be string" })
    year: string
}

@InputType()
export class MovieSortDto {
    @Field(() => String, { nullable: true })
    @IsString({ message: "Sorting must be string" })
    sort: string
}

@InputType()
export class CommentDto {
    @Field()
    @IsString({ message: "Type must be string" })
    @IsNotEmpty({ message: "Type is required" })
    type: string;

    @Field()
    @IsString({ message: "Content must be string" })
    @IsNotEmpty({ message: "Content is required" })
    content: string;

    @Field()
    @IsString({ message: "UserId must be string" })
    @IsNotEmpty({ message: "UserId is required" })
    userId: string;

    @Field()
    @IsString({ message: "MovieId must be string" })
    @IsNotEmpty({ message: "MovieId is required" })
    movieId: string;
}

@InputType()
export class QueryDto {
    @Field(() => Int, { nullable: true })
    @IsNumber({}, { message: "Limit must be a number" })
    page: number;

    @Field(() => Int, { nullable: true })
    @IsNumber({}, { message: "Limit must be a number" })
    limit: number
} 

@InputType()
export class RecentMovieDto {
    @Field()
    @IsNotEmpty({message: "Id is required"})
    movieId: string

    @Field()
    @IsNotEmpty({message: "Episode is required"})
    episode: string

    @Field()
    @IsNotEmpty({message: "Time is required"})
    time: string

    @Field()
    @IsNotEmpty({message: "Name is required"})
    name: string

    @Field()
    @IsNotEmpty({message: "Thumb image is required"})
    thumb_url: string

}