"use client";
import { gql, DocumentNode } from "@apollo/client";

export const UPDATE_LIKED_MOVIES: DocumentNode = gql`
mutation UpdateLikedMovies(
    $id: String!
    $movieId: String!

) {
    updateLikedMovies(
        id: $id,
        movieId: $movieId
    ) 
}
`