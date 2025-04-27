import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class DetailMovie {
    
    @Field()
    tmdb: {
        type: string,
        id: string,
        season: number,
    };

    @Field()
    imdb: {
        id: string | null
    }
}