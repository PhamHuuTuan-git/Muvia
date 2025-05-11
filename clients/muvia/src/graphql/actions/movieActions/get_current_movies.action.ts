"use client";
import { gql } from "@apollo/client";
export const GET_CURRENT_MOVIES = gql`
  query GetCurrentMovies(
    $id: String!
  ) {
    getRecentMovies(
        id: $id
    ) {
        movies {
            movieId
            episode
            time
            name
            slug
            thumb_url
        }    
    }
  }
`;