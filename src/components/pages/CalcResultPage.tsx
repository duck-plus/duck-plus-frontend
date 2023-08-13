import React from "react";
import PageFrame from "../atoms/PageFrame";
import AppTopBar from "../organisms/AppTopBar";
import CafeList from "../organisms/CafeList";
import { useTypedSearchParams } from "react-router-typesafe-routes/dom";
import { ROUTES } from "@/router";
import { styled } from "styled-components";
import { hScalePx } from "@/hooks/useHorizontalRatio";
import LoadingPage from "./LoadingPage";

const Padding = styled.div`
  height: ${hScalePx(12)};
`;

const loadingMessage = `조금만 기다려주세요
열심히 조건에 맞는 카페를 찾고 있어요`;

const CalcResultPage = () => {
  const [{ dailyCharge }] = useTypedSearchParams(ROUTES.CALC.RESULT);
  return (
    <PageFrame>
      <React.Suspense fallback={<LoadingPage message={loadingMessage} />}>
        <AppTopBar.Center>견적내기</AppTopBar.Center>
        <Padding />
        <CafeList filter={{ dailyCharge }}></CafeList>
      </React.Suspense>
    </PageFrame>
  );
};

export default CalcResultPage;
