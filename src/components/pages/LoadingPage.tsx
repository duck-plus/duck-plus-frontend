import React from "react";
import Lottie from "react-lottie-player";
import { styled } from "styled-components";
import Loading1Lottie from "@/assets/lotties/loading1.json";
import Loading2Lottie from "@/assets/lotties/loading2.json";
import { hScalePx } from "@/hooks/useHorizontalRatio";

const LoadingPageFrame = styled.div`
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${hScalePx(12)};

  ${({ theme }) => theme.fontFaces["body2/12-Medium"]};
`;

const Lotties = styled.div`
  display: flex;
  justify-content: center;
  gap: ${hScalePx(8)};
  > * {
    width: ${hScalePx(24)};
    aspect-ratio: 1/1;
  }
`;

interface IProps {
  message?: string;
}

const LoadingPage = ({ message = "Finding your idol's place" }: IProps) => {
  return (
    <LoadingPageFrame>
      <Lotties>
        <Lottie animationData={Loading1Lottie} loop play></Lottie>
        <Lottie animationData={Loading2Lottie} loop play></Lottie>
      </Lotties>
      {message}
    </LoadingPageFrame>
  );
};

export default LoadingPage;
