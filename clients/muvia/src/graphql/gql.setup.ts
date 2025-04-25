import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const graphqlClient = new ApolloClient({
    link: new HttpLink( {
        uri: process.env.NEXT_PUBLIC_SERVER_URI,
        credentials: 'include', // Dùng để nhận cookie
    }),
    cache: new InMemoryCache(),
    
})