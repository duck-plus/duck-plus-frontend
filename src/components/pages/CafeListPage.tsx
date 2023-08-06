import React from "react";
import PageFrame from "@/components/atoms/PageFrame";
import CafeListTabBar from "@/components/organisms/CafeListTabBar";
import AppTopBar from "../organisms/AppTopBar";

const CafeListPage = () => {
  return (
    <PageFrame>
      <AppTopBar.LeftIcon />
      <CafeListTabBar />
    </PageFrame>
  );
};

export default CafeListPage;
