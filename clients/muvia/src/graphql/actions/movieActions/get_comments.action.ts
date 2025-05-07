"use client";
import { gql } from "@apollo/client";
export const GET_COMMENTS = gql`
  query GetComments($movieId: String!) {
    getComments(movieId: $movieId) {
      comments {
        id
        content
        movieId
        date
        type
        userId
    	    user {
                id
                name
                avatar {
                    url
                    imgId
                }
        
            }
        }
    }
  }
`;