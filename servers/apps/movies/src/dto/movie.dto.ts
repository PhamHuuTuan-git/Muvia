import { InputType, Field, Int } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";

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