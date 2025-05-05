"use client";
import { gql } from "@apollo/client";

export const GET_NEW_MOVIES = gql`
  query GetTopNewMovies($limit: Int!) {
    getTopNewMovie(limit: $limit) {
      movies {
        id
        name
        origin_name
        poster_url
        content
        imdb
        thumb_url
        tmdb
        view
        slug
        episode_current
        episode_total
      }
    }
  }
`;