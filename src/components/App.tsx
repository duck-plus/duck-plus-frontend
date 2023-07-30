import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import LoadingPage from "./pages/LoadingPage";
import { HorizontalRatioBoundary } from "../hooks/useHorizontalRatio";
import { ThemeProvider } from "styled-components";
import { theme } from "@/theme";

const App = () => {
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
