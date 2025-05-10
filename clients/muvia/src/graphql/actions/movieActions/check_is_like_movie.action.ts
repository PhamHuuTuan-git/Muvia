"use client";
import { gql } from "@apollo/client";
export const CHECK_IS_LIKE_MOVIE = gql`
  query CheckIsLikeMovie(
    $id: String!
    $movieId: String!
  ) {
    getStatusLikedMovie(
        id: $id
        movieId: $movieId
    ) 
  }
`;