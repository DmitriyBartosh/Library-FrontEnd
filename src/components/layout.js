import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContextProvider } from "../context/ContextProvider";

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
        <main>{children}</main>
      </ContextProvider>
    </QueryClientProvider>
  );
}

export default Layout;
