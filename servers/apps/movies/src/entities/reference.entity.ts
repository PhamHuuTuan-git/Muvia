import { Field, ID, ObjectType, Directive } from "@nestjs/graphql";
@ObjectType()
@Directive('@key(fields:"id")')
export class Reference {
    @Field(() => ID)
    id: string;

    @Field()
    userId: string

    @Field(() => [String])
    likedMovies: string[]

    @Field(() => [String])
    recentWatching: string[]
    
}