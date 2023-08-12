import React, { useEffect, useState } from "react";
import PageFrame from "../atoms/PageFrame";
import AppTopBar from "../organisms/AppTopBar";
import styled from "styled-components";
import EmblaCarousel from "../organisms/EmblaCarousel";
import { hScalePx } from "@/hooks/useHorizontalRatio";
import { useGetCafeQuery } from "@/services/gql-outputs/graphql";
import { useTypedSearchParams } from "react-router-typesafe-routes/dom";
import { ROUTES } from "@/router";
import useEmblaCarousel from "embla-carousel-react";
import isNotNull from "@/utils/isNotNull";
import CafeBriefInfoSection from "../organisms/CafeBriefInfoSection";
import CafeDetailedInfoSection from "../organisms/CafeDetailedInfoSection";
import { Navigate } from "react-router";
import openURL from "@/utils/openURL";
import useBottomSheet from "@/hooks/useBottomSheet";

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
    selected ? theme.colors.white : "rgba(255, 255, 255, 0.6)"};
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

const PriceRow = styled.div`
  display: flex;
  align-items: center;
`;

const Price = styled.div`
  ${({ theme }) => theme.fontFaces["body1/14-Medium"]};
  color: ${({ theme }) => theme.colors.black};
`;

const Unit = styled.div`
  ${({ theme }) => theme.fontFaces["caption/10-Regular"]};
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

const ContactButton = styled.button`
  cursor: pointer;
  padding: ${hScalePx(12)} ${hScalePx(46)};
  ${({ theme }) => theme.fontFaces["body1/14-Regular"]};
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
      select: (s) => s.cafe,
    }
  );

  const {
    show: showBottomSheet,
    setShow: setShowBottomSheet,
    register,
    BottomSheet,
  } = useBottomSheet(false);

  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0);

  const handleDotClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    emblaApi?.scrollTo(idx);
  };

  useEffect(() => {
    emblaApi?.on("select", (emblaApi) => {
      setSelectedImageIdx(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  const landscapeImages = cafe?.imageFileList
    .filter(isNotNull)
    .filter(({ category }) => category === "LANDSCAPE");

  return !code || !cafe ? (
    <Navigate to="/" replace />
  ) : (
    <PageFrame>
      <AppTopBar.LeftIcon />
      {/* Cafe Image Carousel */}
      <CafeCarousel ref={emblaRef}>
        <Container>
          {landscapeImages?.map((img) =>
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
                key={`${cafe.name || ""}_${idx}`}
                selected={idx === selectedImageIdx}
                onClick={(e) => handleDotClick(e, idx)}
              />
            );
          })}
        </CarouselDots>
      </CafeCarousel>
      {<CafeBriefInfoSection cafe={cafe} />}
      {<CafeDetailedInfoSection cafe={cafe} />}
      <Footer>
        <FooterInfo>
          <PriceRow>
            <Price>{cafe.feeInfo.dailyCharge.toLocaleString()}원~</Price>
            <Unit>/일</Unit>
          </PriceRow>
          <ShowInfoButton onClick={() => setShowBottomSheet(true)}>
            정보보기
          </ShowInfoButton>
        </FooterInfo>
        <ContactButton onClick={() => openURL(cafe.askingUrl)}>
          문의하기
        </ContactButton>
      </Footer>
      <BottomSheet {...register}>foo</BottomSheet>
    </PageFrame>
  );
};

export default CafeDetailPage;
