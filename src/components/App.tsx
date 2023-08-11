import React, { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LoadingPage from "./pages/LoadingPage";
import { HorizontalRatioBoundary } from "../hooks/useHorizontalRatio";
import { ThemeProvider } from "styled-components";
import { theme } from "@/theme";

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
    <HorizontalRatioBoundary>
      <Suspense fallback={<LoadingPage />}>
        <ThemeProvider theme={theme}>
          <Outlet />
        </ThemeProvider>
      </Suspense>
    </HorizontalRatioBoundary>
  );
};

export default App;
