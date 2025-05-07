"use client";
import { gql } from "@apollo/client";
export const FIND_MOVIES = gql`
  query FindMovies(
    $content: String!,
    $query: QueryDto!
  ) {
    getMoviesWithName(
        content: $content,
        query: $query
    ) {
        movies {
            id
            name
            origin_name
            poster_url
            content
            imdb
            thumb_url
            tmdb
            year
            view
            slug
            episode_current
            episode_total
        }
        meta {
            total
            totalPages
            page
        }
    }
  }
`;