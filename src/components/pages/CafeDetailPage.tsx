import React, { useEffect, useState } from "react";
import PageFrame from "../atoms/PageFrame";
import AppTopBar from "../organisms/AppTopBar";
import styled from "styled-components";
import EmblaCarousel from "../organisms/EmblaCarousel";
import { hScalePx } from "@/hooks/useHorizontalRatio";
import {
  useGetCafeListQuery,
  useGetCafeQuery,
} from "@/services/gql-outputs/graphql";
import { useTypedSearchParams } from "react-router-typesafe-routes/dom";
import { ROUTES } from "@/router";
import useEmblaCarousel from "embla-carousel-react";
import isNotNull from "@/utils/isNotNull";
import CafeBreifInfoSection from "../organisms/CafeBriefInfoSection";
import CafeDetailInfoSection from "../organisms/CafeDetailedInfoSection";

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

const CafeDetailPage = () => {
  const [{ code }] = useTypedSearchParams(ROUTES.CAFE.DETAILS);

  // const { data: cafe } = useGetCafeQuery(
  //   {
  //     code,
  //   },
  //   {
  //     enabled: !!code,
  //     select: (s) => s.cafe,
  //   }
  // );
  // TODO, useGetCafeQuery가 정상 동작 하면, 윗 주석 코드로 변경
  const { data: cafe } = useGetCafeListQuery(
    {},
    {
      select: (s) => s.cafeList?.find((cafe) => cafe?.code === code),
      enabled: !!code,
    }
  );

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

  if (!code) {
    alert("잘못된 접근입니다.");
    window.location.href = "/";
  }

  const landscapeImages = cafe?.imageFileList
    .filter(isNotNull)
    .filter(({ category }) => category === "LANDSCAPE");

  return (
    <PageFrame>
      <AppTopBar.LeftIcon />
      {/* Cafe Image Carousel */}
      <CafeCarousel ref={emblaRef}>
        <Container>
          {landscapeImages?.map((img) =>
            img ? (
              <Slide key={img.url}>
                <img alt={cafe?.name} src={img.url} />
              </Slide>
            ) : null
          )}
        </Container>
        {/* 캐로샐 탐색용 점들 */}
        <CarouselDots>
          {landscapeImages?.map((_, idx) => {
            return (
              <CarouselDot
                key={`${cafe?.name || ""}_${idx}`}
                selected={idx === selectedImageIdx}
                onClick={(e) => handleDotClick(e, idx)}
              />
            );
          })}
        </CarouselDots>
      </CafeCarousel>
      <CafeBreifInfoSection cafe={cafe} />
      <CafeDetailInfoSection cafe={cafe} />
    </PageFrame>
  );
};

export default CafeDetailPage;
