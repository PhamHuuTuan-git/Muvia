"use client";
import { gql, DocumentNode } from "@apollo/client";

export const LOGOUT_USER: DocumentNode = gql`
mutation LogoutUser {
    logout 
}
`