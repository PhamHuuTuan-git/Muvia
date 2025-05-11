"use client";
import { gql, DocumentNode } from "@apollo/client";

export const DELETE_RECENT_MOVIE: DocumentNode = gql`
mutation UpdateLikedMovies(
    $id: String!
    $movieId: String!

) {
    deleteRecentMovie(
        id: $id,
        movieId: $movieId
    ) 
}
`