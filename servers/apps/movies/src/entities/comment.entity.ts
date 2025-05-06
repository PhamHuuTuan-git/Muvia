import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Comment {
    @Field(() => ID)
    id: string;

    @Field()
    type: string

    @Field()
    content: string

    @Field()
    userId: string

    @Field()
    movieId: string

}