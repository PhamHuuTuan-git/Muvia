"use client";
import { gql, DocumentNode } from "@apollo/client";

export const GET_NEW_MOVIES: DocumentNode = gql`
query GetNewMovies(
   $limit
) {
    getTopNewMovie(
        limit: $limit
    ) {
        movies {
            id,
            name,
            poster_url,
            content,
            imdb,
            thumb_url,
            tmdb,
            view,
            slug
        }     
    }
}
`