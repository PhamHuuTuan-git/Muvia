import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
    @Field()
    id: String;
    
    @Field()
    name: String;

    @Field()
    email: String;

    @Field()
    password: String;

    @Field()
    role: String;
}