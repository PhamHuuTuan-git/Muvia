"use client";
import { gql, DocumentNode } from "@apollo/client";

export const CREATE_COMMENT: DocumentNode = gql`
mutation CreateComment(
    $id: String!
    $comment: CommentDto!

) {
    addComment(
        id: $id,
        comment: $comment
    ) {
        comment {
            id
            type
            content
            userId
            movieId
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
`