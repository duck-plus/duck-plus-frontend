import React from "react";
import { hScalePx } from "@/hooks/useHorizontalRatio";
import { styled } from "styled-components";
import { ReactComponent as LogoSVGR } from "@/assets/svgr/logo.svg";

const Container = styled.div`
  height: ${hScalePx(50)};
  background-color: white;
  width: 100%;
  display: flex;
  padding: 0 ${hScalePx(20)};
  align-items: center;
  position: sticky;
  top: 0;
`;

const LogoFrame = styled.div`
  height: ${hScalePx(18)};
`;

/** [<-] {children} */
const AppTopBarLogoLeft = () => {
  return (
    <Container>
      <LogoFrame>
        <LogoSVGR width="100%" height="100%" />
      </LogoFrame>
    </Container>
  );
};

export default AppTopBarLogoLeft;
