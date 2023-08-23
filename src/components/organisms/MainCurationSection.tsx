import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import EmblaCarousel from '../organisms/EmblaCarousel';
import useHorizontalRatio, { hScalePx } from '@/hooks/useHorizontalRatio';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import isNonNullable from '@/utils/isNonNullable';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/router';
import {
  useGetCafeCurationsQuery,
  useGetMainCafeBannerQuery,
} from '@/services/gql-outputs/graphql';
import { ReactComponent as ICArrowRightSVGR } from '@/assets/svgr/ic/arrow-line-right.svg';

// carousel
const CafeCarousel = styled(EmblaCarousel.Embla)`
  position: relative;
  cursor: pointer;
`;

const Container = styled(EmblaCarousel.Container)`
  align-items: center;
`;

const Slide = styled(EmblaCarousel.Slide)`
  position: relative;
  width: 100%;
  aspect-ratio: 20/21;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
  }
`;

const OverlayContainer = styled.div`
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const PaginationContainer = styled.div`
  position: absolute;
  flex-direction: row;
  display: inline-flex;
  padding: ${hScalePx(2)} ${hScalePx(4)} ${hScalePx(2)} ${hScalePx(8)};
  justify-content: center;
  align-items: center;
  gap: ${hScalePx(2)};
  right: ${hScalePx(20)};
  bottom: ${hScalePx(12)};
  border-radius: 100px;
  background: rgba(0, 0, 0, 0.4);
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fontFaces['body2/12-SemiBold']};
`;

const SlideIndex = styled.div<{ current?: boolean }>`
  color: ${({ theme, current }) => (current ? theme.colors.white : theme.colors.gray500)};
  ${({ theme }) => theme.fontFaces['caption/10-Medium']};
`;

const VerticalSep = styled.div`
  height: ${hScalePx(8)};
  margin: auto ${hScalePx(4)};
  border-right: ${hScalePx(1)} solid ${({ theme }) => theme.colors.gray600};
`;

const MainCurationSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0);
  const navigate = useNavigate();

  const handleCafeClick = (cafeCode: string) => {
    navigate(ROUTES.CAFE.DETAILS.buildPath({}, { code: cafeCode }));
  };

  const { data: mainBannerData } = useGetMainCafeBannerQuery({ args: { category: 'BANNER' } });

  useEffect(() => {
    emblaApi?.on('select', emblaApi => {
      setSelectedImageIdx(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  const hr = useHorizontalRatio();
  const theme = useTheme();

  return (
    <CafeCarousel ref={emblaRef}>
      <Container>
        {mainBannerData?.imageFileList?.filter(isNonNullable).map((item, index) => (
          <>
            <Slide onClick={() => handleCafeClick(item.cafeCode)} key={item.cafeCode}>
              <img alt={'main-cafe-banner'} src={item.url} />
              <OverlayContainer />
            </Slide>
          </>
        ))}
        <PaginationContainer className="slide-index">
          <SlideIndex current>{selectedImageIdx + 1}</SlideIndex>
          <VerticalSep />
          <SlideIndex>{mainBannerData?.imageFileList?.length}</SlideIndex>
          <ICArrowRightSVGR width={hr * 12} height={hr * 12} fill={theme.colors.white} />
        </PaginationContainer>
      </Container>
    </CafeCarousel>
  );
};

export default MainCurationSection;
