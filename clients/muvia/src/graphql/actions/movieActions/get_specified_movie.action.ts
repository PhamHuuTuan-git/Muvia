"use client";
import { gql } from "@apollo/client";

export const GET_SPECIFIED_MOVIE = gql`
  query GetSpecifiedMovie($slug: String!) {
    getSpecifiedMovie(slug: $slug) {
        movie {
            id
            episodes {
                server_name
                server_data {
                name
                slug
                filename
                link_embed
                link_m3u8
                }
            }
            actor
            category {
              id
              name
              slug
            }
            chieurap
            content
            country {
              id
              name
              slug
            }
            created
            director
            episode_current
            episode_total
            imdb
            is_copyright
            lang
            modified
            name
            notify
            origin_name
            poster_url
            quality
            showtimes
            slug
            status
            sub_docquyen
            thumb_url
            time
            tmdb
            trailer_url
            type
            view
            year
        }
    }
  }
`;