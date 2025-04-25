import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { Avatar } from "./avatar.entity";


@ObjectType()
@Directive('@key(fields:"id")')
export class User {
    @Field(() => ID)
    id: string;
    
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    role: string;

    @Field(() => Avatar, { nullable: true })
    avatar?: Avatar

    @Field()
    state: boolean
}