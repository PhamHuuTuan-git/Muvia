"use client";
import { gql } from "@apollo/client";
export const GET_LIKED_MOVIES = gql`
  query GetLikedMovies(
    $id: String!
  ) {
    getLikedMovies(
        id: $id
    ) {
        movies {
            id
            name
            slug
            thumb_url
        }    
    }
  }
`;