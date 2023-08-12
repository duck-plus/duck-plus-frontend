import React, { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LoadingPage from "./pages/LoadingPage";
import { HorizontalRatioBoundary } from "../hooks/useHorizontalRatio";
import { ThemeProvider } from "styled-components";
import { theme } from "@/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const App = () => {
  const location = useLocation();

  useEffect(() => {
    if (process.env.REACT_APP_GA_ID) {
      gtag("event", "page_view", {
        send_to: process.env.REACT_APP_GA_ID,
      });
    }
  }, [location.pathname]);

  return (
    <HorizontalRatioBoundary
      style={{
        maxWidth: "768px",
        margin: "0 auto",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<LoadingPage />}>
            <Outlet />
          </Suspense>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} position="top-right" />
      </QueryClientProvider>
    </HorizontalRatioBoundary>
  );
};

export default App;
