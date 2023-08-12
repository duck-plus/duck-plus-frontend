import React, { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LoadingPage from "./pages/LoadingPage";
import { HorizontalRatioBoundary } from "../hooks/useHorizontalRatio";
import { ThemeProvider } from "styled-components";
import { theme } from "@/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

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
        <Suspense fallback={<LoadingPage />}>
          <ThemeProvider theme={theme}>
            <Outlet />
          </ThemeProvider>
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HorizontalRatioBoundary>
  );
};

export default App;
