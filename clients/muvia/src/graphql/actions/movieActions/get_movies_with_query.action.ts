"use client";
import { gql } from "@apollo/client";

export const GET_MOVIES_WITH_QUERY = gql`
  query GetMovies($paging: QueryPagingDto!, $query: MoviesQueryDto!, $sort: MovieSortDto!) {
    getMovies(paging: $paging, query: $query, sort: $sort) {
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
      meta {
        page
        totalPages
        total
      }
    }
  }
`;