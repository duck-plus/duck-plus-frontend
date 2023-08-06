import { hScalePx } from "@/hooks/useHorizontalRatio";
import React from "react";
import SimpleBar from "simplebar-react";
import { styled } from "styled-components";
import SamplePNG from "@/assets/images/sample.png";

const ScrollFrame = styled(SimpleBar)`
  width: ${hScalePx(360)};
  height: 100%;
  flex-shrink: 0;
  margin: 0 auto;
  background-color: white;
  .simplebar-content {
    height: 100%;
  }
`;

interface IProps {
  category: string;
  region: string;
}

const CafeList = ({ category, region }: IProps) => {
  return (
    <ScrollFrame>
      {category}, {region}
      <img
        style={{ width: "100%", objectFit: "contain" }}
        alt="SamplePNG"
        src={SamplePNG}
      ></img>
    </ScrollFrame>
  );
};

export default CafeList;
