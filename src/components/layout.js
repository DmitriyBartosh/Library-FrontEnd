import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContextProvider } from "../context/ContextProvider";
import Review from "./reviewing/adding/review";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function Layout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <main>
          <Review />
          {children}
        </main>
      </ContextProvider>
    </QueryClientProvider>
  );
}

export default Layout;
