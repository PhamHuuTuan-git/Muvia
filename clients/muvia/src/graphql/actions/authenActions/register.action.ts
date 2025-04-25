"use client";
import { gql, DocumentNode } from "@apollo/client";

export const REGISTER_USER: DocumentNode = gql`
mutation RegisterUser(
    $name: String!
    $email: String!
    $password: String!
    $rePassword: String!
) {
    register(
        registerInput: {
            name: $name,
            email: $email,
            password: $password,
            rePassword: $rePassword
        }
    ) {
        activation_token    
    }
}
`