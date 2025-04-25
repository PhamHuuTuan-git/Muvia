import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Avatar {
    // @Field()
    // id: string;
    
    @Field()
    url: string;

    @Field(() => String, {nullable: true})
    imgId: string;
}