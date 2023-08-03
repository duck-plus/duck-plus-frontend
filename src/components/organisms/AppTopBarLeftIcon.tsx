import React from "react";
import { hScalePx } from "@/hooks/useHorizontalRatio";
import { styled } from "styled-components";
import { ReactComponent as ICArrowBackSVGR } from "@/assets/svgr/ic/arrow-back.svg";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  ${({ theme }) => theme.fontFaces["body1/14-Medium"]}
  color: ${({ theme }) => theme.colors.gray900};
  height: ${hScalePx(50)};
  width: 100%;
  background-color: white;
  display: flex;
  padding: 0;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
`;

const BackButton = styled.button`
  position: absolute;
  left: ${hScalePx(16)};
  height: ${hScalePx(24)};
  aspect-ratio: 1/1;
  cursor: pointer;
  outline: 0;
  border: 0;
  background-color: transparent;
`;

/** [<-]  */
const AppTopBarLeftIcon = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <ICArrowBackSVGR width="100%" height="100%" />
      </BackButton>
    </Container>
  );
};

export default AppTopBarLeftIcon;
