import React from "react";
import PageFrame from "../atoms/PageFrame";
import AppTopBar from "../organisms/AppTopBar";
import CafeList from "../organisms/CafeList";
import { useTypedSearchParams } from "react-router-typesafe-routes/dom";
import { ROUTES } from "@/router";
import { styled } from "styled-components";
import { hScalePx } from "@/hooks/useHorizontalRatio";

const Padding = styled.div`
  height: ${hScalePx(12)};
`;

const CalcResultPage = () => {
  const [{ dailyCharge }] = useTypedSearchParams(ROUTES.CALC.RESULT);
  return (
    <PageFrame>
      <AppTopBar.Center>견적내기</AppTopBar.Center>
      <Padding />
      <CafeList filter={{ dailyCharge }}></CafeList>
    </PageFrame>
  );
};

export default CalcResultPage;
