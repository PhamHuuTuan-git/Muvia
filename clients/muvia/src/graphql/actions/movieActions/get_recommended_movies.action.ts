"use client";
import { gql } from "@apollo/client";

export const GET_RECOMMENDED_MOVIES = gql`
  query GetRecommendedNewMovies($limit: Int!) {
    getRecommendedMovies(limit: $limit) {
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