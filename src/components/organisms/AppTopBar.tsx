import React from 'react';

import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { ReactComponent as ICArrowBackSVGR } from '@/assets/svgr/ic/arrow-back.svg';
import { ReactComponent as LogoSVGR } from '@/assets/svgr/logo.svg';
import { hScalePx } from '@/hooks/useHorizontalRatio';

const CSSAppTopBarHeight = hScalePx(50);

const Container = styled.div`
  ${({ theme }) => theme.fontFaces['body1/14-Medium']}
  color: ${({ theme }) => theme.colors.gray900};
  height: ${CSSAppTopBarHeight};
  width: 100%;
  background-color: white;
  display: flex;
  padding: 0;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const LogoFrame = styled.div`
  margin-left: ${hScalePx(20)};
  height: ${hScalePx(18)};
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

/** [Duck+] */
const LogoLeft = (props: React.ComponentProps<typeof Container>) => {
  return (
    <Container {...props} style={{ justifyContent: 'flex-start' }}>
      <LogoFrame>
        <LogoSVGR height={18} />
      </LogoFrame>
    </Container>
  );
};

/** [<-] {children} */
const Center = ({
  children,
  ...leftOver
}: React.PropsWithChildren<React.ComponentProps<typeof Container>>) => {
  const navigate = useNavigate();
  return (
    <Container {...leftOver}>
      <BackButton onClick={() => navigate(-1)}>
        <ICArrowBackSVGR width="100%" height="100%" />
      </BackButton>
      {children}
    </Container>
  );
};

/** [<-]  */
const LeftIcon = (props: React.ComponentProps<typeof Container>) => {
  const navigate = useNavigate();
  return (
    <Container {...props}>
      <BackButton onClick={() => navigate(-1)}>
        <ICArrowBackSVGR width="100%" height="100%" />
      </BackButton>
    </Container>
  );
};

const AppTopBar = {
  Center,
  LeftIcon,
  LogoLeft,
  CSSAppTopBarHeight,
} as const;

export default AppTopBar;
