import React, { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import LoadingPage from "./components/pages/LoadingPage";
import { HorizontalRatioBoundary } from "./hooks/useHorizontalRatio";

const App = () => {
  // 첫 렌더 후, App loading 모달 제거
  useEffect(() => {
    document.querySelector<HTMLDivElement>("#JSLoading")!.style.display =
      "none";
  }, []);
  return (
    <HorizontalRatioBoundary>
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    </HorizontalRatioBoundary>
  );
};

export default App;
