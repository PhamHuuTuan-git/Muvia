import { Field, ObjectType, ID, Directive } from "@nestjs/graphql";
import { GraphQLJSON } from 'graphql-type-json';
import { Episode } from "./episo.entity";
import { Category } from "./category.entity";
import { Country } from "./country.entity";
@ObjectType()
@Directive('@key(fields:"id")')
export class Movie {

    @Field(() => ID)
    id: string;
    @Field(() => GraphQLJSON)
    tmdb: {
        type: string,
        id: string,
        season: number,
        vote_average: number,
        vote_count: number
    } | null;
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
    @Field(() => String, { nullable: true })
    thumb_url?: string;
    @Field(() => String, { nullable: true })
    poster_url?: string;
    @Field()
    is_copyright: boolean;
    @Field()
    sub_docquyen: boolean;
    @Field()
    chieurap: boolean;
    @Field(() => String, { nullable: true })
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
    @Field(() => String, { nullable: true })
    notify?: string;
    @Field(() => String, { nullable: true })
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

    @Field(() => [Episode])
    episodes: Episode[]
}

@ObjectType()
@Directive('@key(fields:"id")')
export class MovieDetail {
    @Field(() => ID)
    id: string;
    @Field(() => GraphQLJSON)
    tmdb: {
        type: string,
        id: string,
        season: number,
        vote_average: number,
        vote_count: number
    } | null;
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
    @Field(() => String, { nullable: true })
    thumb_url?: string;
    @Field(() => String, { nullable: true })
    poster_url?: string;
    @Field()
    is_copyright: boolean;
    @Field()
    sub_docquyen: boolean;
    @Field()
    chieurap: boolean;
    @Field(() => String, { nullable: true })
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
    @Field(() => String, { nullable: true })
    notify?: string;
    @Field(() => String, { nullable: true })
    showtimes?: string;
    @Field()
    year: number;
    @Field()
    view: number;
    @Field(() => [String])
    actor: string[];
    @Field(() => [String])
    director: string[];
    @Field(() => [Category])
    category: Category[];
    @Field(() => [Country])
    country: Country[];

    @Field(() => [Episode])
    episodes: Episode[]
}