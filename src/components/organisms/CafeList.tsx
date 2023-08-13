import { hScalePx } from "@/hooks/useHorizontalRatio";
import React, { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";
import { styled } from "styled-components";
import useFilteredCafeList from "@/hooks/useFilteredCafeList";
import useEmblaCarousel from "embla-carousel-react";
import EmblaCarousel from "./EmblaCarousel";
import { useNavigate } from "react-router";
import { ROUTES } from "@/router";
import isNotNull from "@/utils/isNotNull";

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

const CafeListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${hScalePx(32)};
`;

const CafeListItemFrame = styled.div`
  padding: 0 ${hScalePx(20)};
  display: flex;
  flex-direction: column;
  gap: ${hScalePx(8)};
`;

const CafeDesc = styled.div`
  gap: ${hScalePx(8)};
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const DescItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${hScalePx(2)};
`;

const Name = styled.div`
  ${({ theme }) => theme.fontFaces["body1/14-Regular"]};
  color: ${({ theme }) => theme.colors.gray900};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Sigungu = styled.div`
  ${({ theme }) => theme.fontFaces["caption/10-Medium"]};
  color: ${({ theme }) => theme.colors.gray800};
`;

const HashTags = styled.div`
  ${({ theme }) => theme.fontFaces["caption/10-Regular"]};
  color: ${({ theme }) => theme.colors.gray600};
`;

const Price = styled.div`
  ${({ theme }) => theme.fontFaces["body1/14-Medium"]};
  color: ${({ theme }) => theme.colors.gray900};
`;

const Disclaimer = styled.div`
  ${({ theme }) => theme.fontFaces["overline/9-Regular"]};
  color: ${({ theme }) => theme.colors.gray600};
  display: flex;
`;
const VerticalSep = styled.div`
  height: ${hScalePx(8)};
  margin: auto ${hScalePx(4)};
  border-right: ${hScalePx(1)} solid ${({ theme }) => theme.colors.gray200};
`;

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
  aspect-ratio: 40/23;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HotBadge = styled.div`
  background: rgba(0, 0, 0, 0.4);
  display: inline-flex;
  padding: ${hScalePx(2)} ${hScalePx(6)};
  justify-content: center;
  align-items: center;
  gap: ${hScalePx(2)};
  position: absolute;
  left: 0;
  top: 0;
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fontFaces["caption/10-SemiBold"]};
`;

const CarouselDots = styled.div`
  position: absolute;
  bottom: ${hScalePx(12)};
  display: flex;
  justify-content: center;
  width: 100%;
  gap: ${hScalePx(4)};
`;

const CarouselDot = styled.div<{ selected: boolean }>`
  width: ${hScalePx(4)};
  height: ${hScalePx(4)};
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.white : "rgba(255, 255, 255, 0.6)"};
  border-radius: 100%;
  cursor: pointer;
`;

interface ICafeListItemProps {
  cafe: NonNullable<ReturnType<typeof useFilteredCafeList>["data"]>[number];
}

// 카페 목록 내 개별 항목
const CafeListItem = ({ cafe }: ICafeListItemProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0);
  const isHot = cafe.featureList.some((feat) => feat === "생카성지");
  const navigate = useNavigate();

  const handleCafeClick = (cafeCode: string) => {
    navigate(ROUTES.CAFE.DETAILS.buildPath({}, { code: cafeCode }));
  };

  const handleDotClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    emblaApi?.scrollTo(idx);
  };

  useEffect(() => {
    emblaApi?.on("select", (emblaApi) => {
      setSelectedImageIdx(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  const landscapeImages = cafe.imageFileList
    .filter(isNotNull)
    .filter(({ category }) => category === "LANDSCAPE");

  return (
    <CafeListItemFrame key={cafe.name}>
      {/* 캐로샐 */}
      <CafeCarousel ref={emblaRef} onClick={() => handleCafeClick(cafe.code)}>
        <Container>
          {landscapeImages.map((img) =>
            img ? (
              <Slide key={img.filename}>
                {/* 생카성지는 인기 딱지 노출 */}
                {isHot ? <HotBadge>인기</HotBadge> : null}
                <img alt={cafe.name} src={img.url} />
              </Slide>
            ) : null
          )}
        </Container>
        {/* 캐로샐 탐색용 점들 */}
        <CarouselDots>
          {landscapeImages.map((_, idx) => {
            return (
              <CarouselDot
                key={`${cafe.name}_${idx}`}
                selected={idx === selectedImageIdx}
                onClick={(e) => handleDotClick(e, idx)}
              />
            );
          })}
        </CarouselDots>
      </CafeCarousel>
      {/* 설명 */}
      <CafeDesc onClick={() => handleCafeClick(cafe.code)}>
        {/* 이름 주소 등 */}
        <DescItem>
          <Name>{cafe.name}</Name>
          <Row>
            <Sigungu>{cafe.address.sigungu}</Sigungu>
            <VerticalSep />
            <HashTags>{cafe.hashtag}</HashTags>
          </Row>
        </DescItem>
        {/* 금액 관련 */}
        <DescItem>
          <Price>{cafe.feeInfo.dailyCharge.toLocaleString()}원~</Price>
          <Disclaimer>
            /일 기준
            <VerticalSep />
            정확한 가격정보 문의 필요
          </Disclaimer>
        </DescItem>
      </CafeDesc>
    </CafeListItemFrame>
  );
};

interface IProps {
  feature: string | undefined;
  region: string;
}
// 카페 목록
const CafeList = ({ feature, region }: IProps) => {
  const { data: cafeList } = useFilteredCafeList(feature, region);

  return (
    <ScrollFrame>
      <CafeListContainer>
        {cafeList?.map((cafe) => (
          <CafeListItem key={cafe.name} cafe={cafe} />
        ))}
        {/* For Last Gap(Padding) */}
        <div />
      </CafeListContainer>
    </ScrollFrame>
  );
};

export default CafeList;
