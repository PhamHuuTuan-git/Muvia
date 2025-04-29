"use client";
import { gql, DocumentNode } from "@apollo/client";

export const CHECK_TOKEN: DocumentNode = gql`
mutation CheckToken {
    checkToken {
        user {
            id,
            name,
            email,
            role,
            state,
            avatar {
                url,
                imgId
            }
        }  
    }
}
`