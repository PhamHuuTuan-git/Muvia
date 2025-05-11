"use client";
import { gql, DocumentNode } from "@apollo/client";

export const ADD_RECENT_MOVIE: DocumentNode = gql`
mutation AddRecentMovie(
    $id: String!
    $movieInfo: RecentMovieDto!

) {
    addRecentMovie(
        id: $id,
        movieInfo: $movieInfo
    ) 
}
`