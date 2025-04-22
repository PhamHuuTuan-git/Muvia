"use client";
import React from "react";
import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { StrictMode } from "react";
import { ApolloProvider } from "@apollo/client";
import { graphqlClient } from "@/graphql/gql.setup";
import { Provider } from "react-redux";
import store from "@/redux-toolkit/store";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={graphqlClient}>
      <Provider store={store}>
        {/* <StrictMode> */}
        <HeroUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            {children}
          </NextThemesProvider>
        </HeroUIProvider>
        {/* </StrictMode> */}
      </Provider>
    </ApolloProvider>
  )
}