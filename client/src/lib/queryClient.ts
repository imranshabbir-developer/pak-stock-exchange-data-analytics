import { QueryClient } from "@tanstack/react-query";

// Simplified QueryClient for frontend-only app
// No API calls are currently used, but keeping QueryClient for potential future use
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
