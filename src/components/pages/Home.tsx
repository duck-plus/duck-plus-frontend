import React from "react";
import { styled } from "styled-components";
import useBottomSheet from "@/hooks/useBottomSheet";
import { hScalePx } from "@/hooks/useHorizontalRatio";

const HomePage = styled.div`
  background: ${({ theme }) => theme.colors.orange50};
  width: ${hScalePx(130)};
  height: 100%;
  flex-shrink: 0;
  margin: 0 auto;
`;

const BottomSheetContent = styled.div`
  margin: ${hScalePx(20)};
`;

const Home = () => {
  const { BottomSheet, register } = useBottomSheet(true);
  return (
    <HomePage>
      Hi, I'm Home.
      <BottomSheet {...register}>
        <BottomSheetContent>Hi, I'm BottomSheet.</BottomSheetContent>
      </BottomSheet>
    </HomePage>
  );
};

export default Home;
