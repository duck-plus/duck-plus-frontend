import React from "react";
import { styled } from "styled-components";
import { hScalePx } from "@/hooks/useHorizontalRatio";
import AppTopBarCenter from "../organisms/AppTopBarCenter";

const CalcPage = styled.div`
  background: ${({ theme }) => theme.colors.orange50};
  width: ${hScalePx(360)};
  height: 100%;
  flex-shrink: 0;
  margin: 0 auto;
`;

const Calc = () => {
  return (
    <CalcPage>
      <AppTopBarCenter>{"카페라리"}</AppTopBarCenter>
    </CalcPage>
  );
};

export default Calc;
