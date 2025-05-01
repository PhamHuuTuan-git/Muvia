import { Field, ObjectType, ID, Directive } from "@nestjs/graphql";

@ObjectType()
export class Country {
    
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    slug: string;
}