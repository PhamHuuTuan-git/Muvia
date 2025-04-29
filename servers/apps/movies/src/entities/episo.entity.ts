import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SpecifiedEpiso {
    @Field()
    name: string;

    @Field()
    slug: string;

    @Field()
    filename: string;

    @Field()
    link_embed: string;

    @Field()
    link_m3u8: string;
}

@ObjectType()
export class Episode {
    
    @Field()
    server_name: string;

    @Field(() => [SpecifiedEpiso])
    server_data: SpecifiedEpiso[]
}