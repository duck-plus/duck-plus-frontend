import React, { useEffect, useState } from 'react';
import PageFrame from '../atoms/PageFrame';
import AppTopBar from '../organisms/AppTopBar';
import styled from 'styled-components';
import EmblaCarousel from '../organisms/EmblaCarousel';
import useHorizontalRatio, { hScalePx } from '@/hooks/useHorizontalRatio';
import { useGetCafeQuery } from '@/services/gql-outputs/graphql';
import { useTypedSearchParams } from 'react-router-typesafe-routes/dom';
import { ROUTES } from '@/router';
import useEmblaCarousel from 'embla-carousel-react';
import isNonNullable from '@/utils/isNonNullable';
import CafeBriefInfoSection from '../organisms/CafeBriefInfoSection';
import CafeDetailedInfoSection from '../organisms/CafeDetailedInfoSection';
import { Navigate } from 'react-router';
import openURL from '@/utils/openURL';
import useBottomSheet from '@/hooks/useBottomSheet';
import { ReactComponent as CloseSVGR } from '@/assets/svgr/ic/close.svg';
import ga from '@/utils/ga';

// carousel
const CafeCarousel = styled(EmblaCarousel.Embla)`
  position: relative;
  cursor: pointer;
`;

const Container = styled(EmblaCarousel.Container)`
  gap: ${hScalePx(20)};
`;

const Slide = styled(EmblaCarousel.Slide)`
  position: relative;
  background-color: ${({ theme }) => theme.colors.gray100};
  aspect-ratio: 20/21;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CarouselDots = styled.div`
  position: absolute;
  bottom: ${hScalePx(12)};
  display: flex;
  justify-content: center;
  width: 100%;
  gap: ${hScalePx(6)};
`;

const CarouselDot = styled.div<{ selected: boolean }>`
  width: ${hScalePx(6)};
  height: ${hScalePx(6)};
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.white : 'rgba(255, 255, 255, 0.6)'};
  border-radius: 100%;
  cursor: pointer;
`;

const Footer = styled.div`
  display: flex;
  width: 100%;
  padding: ${hScalePx(12)} ${hScalePx(21)};
  justify-content: space-between;
  align-items: center;
  gap: ${hScalePx(10)};
  position: sticky;
  z-index: 100;
  background: ${({ theme }) => theme.colors.white};
  border-top: ${hScalePx(1)} solid ${({ theme }) => theme.colors.gray100};
  bottom: 0;
`;

const FooterInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FeeRow = styled.div`
  display: flex;
  align-items: center;
`;

const Fee = styled.div`
  ${({ theme }) => theme.fontFaces['body1/14-Medium']};
  color: ${({ theme }) => theme.colors.black};
`;

const Unit = styled.div`
  ${({ theme }) => theme.fontFaces['caption/10-Regular']};
  color: ${({ theme }) => theme.colors.gray500};
`;

const ShowInfoButton = styled.button`
  outline: 0;
  border: 0;
  cursor: pointer;
  color: #000;
  font-family: SUIT;
  font-size: ${hScalePx(12)};
  font-style: normal;
  font-weight: 400;
  line-height: ${hScalePx(20)};
  letter-spacing: -0.4px;
  text-decoration-line: underline;
  background: none;
`;

const SheetContent = styled.div`
  padding: ${hScalePx(16)} 0 ${hScalePx(4)} 0;
`;
const SheetTitle = styled.div`
  ${({ theme }) => theme.fontFaces['body1/14-Medium']};
  color: ${({ theme }) => theme.colors.gray900};
  width: 100%;
  height: ${hScalePx(20)};
  padding: 0 ${hScalePx(20)};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FeeInfoContent = styled.div`
  padding: ${hScalePx(12)} ${hScalePx(20)} ${hScalePx(16)} ${hScalePx(20)};
`;
const HorSep = styled.div`
  border-bottom: ${hScalePx(1)} solid ${({ theme }) => theme.colors.gray100};
  width: 100%;
`;
const FeeInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${hScalePx(12)} 0;
`;
const FeeTitle = styled.div`
  ${({ theme }) => theme.fontFaces['body2/12-Medium']};
  color: ${({ theme }) => theme.colors.gray900};
  margin: 0 0 ${hScalePx(6)} 0;
`;
const FeeInfoDesc = styled.div`
  display: flex;
  gap: ${hScalePx(12)};
`;
const FeeDesc = styled.div`
  ${({ theme }) => theme.fontFaces['body2/12-Regular']};
  color: ${({ theme }) => theme.colors.gray800};
`;
const FeeDisclaimer = styled.div`
  ${({ theme }) => theme.fontFaces['caption/10-Regular']};
  color: ${({ theme }) => theme.colors.gray500};
  margin: ${hScalePx(12)} 0 0 0;
`;

const ContactButton = styled.button`
  cursor: pointer;
  padding: ${hScalePx(12)} ${hScalePx(46)};
  ${({ theme }) => theme.fontFaces['body1/14-Regular']};
  color: ${({ theme }) => theme.colors.white};
  outline: 0;
  border: 0;
  background-color: ${({ theme }) => theme.colors.black};
`;

const CafeDetailPage = () => {
  const [{ code }] = useTypedSearchParams(ROUTES.CAFE.DETAILS);

  const { data: cafe } = useGetCafeQuery(
    {
      code,
    },
    {
      enabled: !!code,
      select: s => s.cafe,
    }
  );

  const { setShow: setShowFeeInfo, register, BottomSheet } = useBottomSheet(false);

  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0);

  const handleDotClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    emblaApi?.scrollTo(idx);
  };

  useEffect(() => {
    emblaApi?.on('select', emblaApi => {
      setSelectedImageIdx(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  const hr = useHorizontalRatio();

  const landscapeImages = cafe?.imageFileList
    .filter(isNonNullable)
    .filter(({ category }) => category === 'LANDSCAPE');

  return !code || !cafe ? (
    <Navigate to="/" replace />
  ) : (
    <PageFrame>
      <AppTopBar.LeftIcon />
      {/* Cafe Image Carousel */}
      <CafeCarousel ref={emblaRef}>
        <Container>
          {landscapeImages?.map(img =>
            img ? (
              <Slide key={img.url}>
                <img alt={cafe.name} src={img.url} />
              </Slide>
            ) : null
          )}
        </Container>
        {/* 캐로샐 탐색용 점들 */}
        <CarouselDots>
          {landscapeImages?.map((_, idx) => {
            return (
              <CarouselDot
                key={`${cafe.name || ''}_${idx}`}
                selected={idx === selectedImageIdx}
                onClick={e => handleDotClick(e, idx)}
              />
            );
          })}
        </CarouselDots>
      </CafeCarousel>
      {<CafeBriefInfoSection cafe={cafe} />}
      {<CafeDetailedInfoSection cafe={cafe} />}
      <Footer>
        <FooterInfo>
          <FeeRow>
            <Fee>{cafe.feeInfo.dailyCharge.toLocaleString()}원~</Fee>
            <Unit>/일</Unit>
          </FeeRow>
          <ShowInfoButton onClick={() => setShowFeeInfo(true)}>정보보기</ShowInfoButton>
        </FooterInfo>
        <ContactButton
          onClick={() => {
            ga.send('contact_btn', { cafeName: cafe.name });
            openURL(cafe.askingUrl);
          }}
        >
          문의하기
        </ContactButton>
      </Footer>
      <BottomSheet {...register}>
        <SheetContent>
          <SheetTitle>
            대관료 정보
            <CloseSVGR
              style={{ cursor: 'pointer' }}
              width={hr * 18}
              height={hr * 18}
              onClick={() => setShowFeeInfo(false)}
            />
          </SheetTitle>
          <FeeInfoContent>
            <HorSep />
            <FeeInfo>
              <FeeTitle>평균 대관료</FeeTitle>
              <FeeInfoDesc>
                <FeeDesc>1일 평균 가격</FeeDesc>
                <FeeDesc>{cafe.feeInfo.dailyCharge.toLocaleString()}원</FeeDesc>
              </FeeInfoDesc>
              <FeeDisclaimer>
                *가격은 카페마다 상이하며 정확한 가격은 문의를 통해 확인해주세요
              </FeeDisclaimer>
            </FeeInfo>
            <HorSep />
            <FeeInfo>
              <FeeTitle>최소 보증인원</FeeTitle>
              <FeeInfoDesc>
                <FeeDesc>{cafe.feeInfo.guaranteeCount}명</FeeDesc>
              </FeeInfoDesc>
            </FeeInfo>
          </FeeInfoContent>
        </SheetContent>
      </BottomSheet>
    </PageFrame>
  );
};

export default CafeDetailPage;
