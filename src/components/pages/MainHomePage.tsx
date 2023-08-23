import React from 'react';
import { hScalePx } from '@/hooks/useHorizontalRatio';
import PageFrame from '../atoms/PageFrame';
import AppTopBar from '../organisms/AppTopBar';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/router';
import { ReactComponent as ICArrowRightSVGR } from '@/assets/svgr/ic/arrow-line-right.svg';
import MainCurationSection from '../organisms/MainCurationSection';
import CafeSortButtonList from '../organisms/CafeSortButtonList';
import CustomGoodsSection from '../organisms/CustomGoodsSection';
import ConceptCurationSection from '../organisms/ConceptCurationSection';
import FreeFeeCurationSection from '../organisms/FreeFeeCurationSection';
import PopularCurationSection from '../organisms/PopularCurationSection.tsx';

const CalcNaviBarHeight = hScalePx(44);

const CalcNaviContainer = styled.div`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: black;
  display: flex;
  height: ${CalcNaviBarHeight};
  padding: ${hScalePx(12)} ${hScalePx(20)} ${hScalePx(12)} ${hScalePx(16)};
  cursor: pointer;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const CalcNaviText = styled.div<{ $emphasis?: boolean }>`
  white-space: pre-wrap;
  ${({ theme }) => theme.fontFaces['body2/12-Regular']}
  color: ${({ theme, $emphasis }) => ($emphasis ? theme.colors.orange500 : theme.colors.white)};
`;

const IconConatiner = styled.div`
  width: ${hScalePx(16)};
  height: ${hScalePx(16)};
`;

const CalcNaviBar = () => {
  const navigate = useNavigate();
  const handleCalNaviBarClick = () => {
    navigate(ROUTES.CALC.buildPath({}));
  };

  return (
    <>
      <CalcNaviContainer
        onClick={() => {
          handleCalNaviBarClick();
        }}
      >
        <Row>
          <CalcNaviText>기간+예산 조건에 맞는 </CalcNaviText>
          <CalcNaviText $emphasis>카페추천 및 견적 받기</CalcNaviText>
        </Row>
        <IconConatiner>
          <ICArrowRightSVGR width="100%" height="100%" />
        </IconConatiner>
      </CalcNaviContainer>
    </>
  );
};

const MainHomePage = () => {
  return (
    <PageFrame>
      <AppTopBar.LogoLeft />
      <CalcNaviBar />
      <MainCurationSection />
      <CafeSortButtonList />
      <CustomGoodsSection />
      <ConceptCurationSection />
      <FreeFeeCurationSection />
      <PopularCurationSection />
    </PageFrame>
  );
};

export default MainHomePage;
