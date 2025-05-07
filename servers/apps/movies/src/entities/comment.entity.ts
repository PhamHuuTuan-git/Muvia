import { Field, ID, ObjectType, Directive } from "@nestjs/graphql";

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
    @Field(() => ID)
    @Directive('@external')
    id: string;

    // @Field()
    // @Directive('@external')
    // @Directive('@requires(fields: "id")')
    // name: string;
}

@ObjectType()
@Directive('@key(fields:"id")')
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

    @Field()
    date: Date;


    @Field(() => User)
    user: User;
    

}