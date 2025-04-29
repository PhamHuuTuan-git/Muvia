import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class DetailMovie {  
    @Field(() => GraphQLJSON)
    tmdb: {
        type: string,
        id: string,
        season: number,
    };
    @Field(() => GraphQLJSON)
    imdb: {
        id: string | null
    };
    @Field(() => GraphQLJSON)
    created: {
        time: string 
    };
    @Field(() => GraphQLJSON)
    modified: {
        time: string
    };
    @Field()
    name: string;
    @Field()
    slug: string;
    @Field()
    origin_name: string;
    @Field()
    content: string;
    @Field()
    type: string;
    @Field()
    status: string;
    @Field(() => String, {nullable: true})
    thumb_url?: string;
    @Field(() => String, {nullable: true})
    poster_url?: string;
    @Field()
    is_copyRight: boolean;
    @Field()
    sub_docquyen: boolean;
    @Field()
    chieurap: boolean;
    @Field( () => String, {nullable: true})
    trailer_url?: string
    @Field()
    time: string;
    @Field()
    episode_current: string;
    @Field()
    episode_total: string;
    @Field()
    quality: string;
    @Field()
    lang: string;
    @Field(() => String, {nullable: true})
    notify?: string;
    @Field( () => String, {nullable: true})
    showtimes?: string;
    @Field()
    year: number;
    @Field()
    view: number;
    @Field(() => [String])
    actor: string[];
    @Field(() => [String])
    director: string[];
    @Field(() => [String])
    category: string[];
    @Field(() => [String])
    country: string[];

}