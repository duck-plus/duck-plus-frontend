import { hScalePx } from "@/hooks/useHorizontalRatio";
import React from "react";
import SimpleBar from "simplebar-react";
import { styled } from "styled-components";
import useFilteredCafeList from "@/hooks/useFilteredCafeList";
import useEmblaCarousel from "embla-carousel-react";
import EmblaCarousel from "./EmblaCarousel";
import { useNavigate } from "react-router";
import { ROUTES } from "@/router";

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

const CafeListItem = styled.div`
  padding: 0 ${hScalePx(20)};
  display: flex;
  flex-direction: column;
  gap: ${hScalePx(8)};
  cursor: pointer;
`;

const CafeDesc = styled.div`
  gap: ${hScalePx(8)};
  display: flex;
  flex-direction: column;
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
  ${({ theme }) => theme.fontFaces["outline/9-Regular"]};
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
  aspect-ratio: 40/23;
`;

const Container = styled(EmblaCarousel.Container)`
  gap: ${hScalePx(20)};
`;

const Slide = styled(EmblaCarousel.Slide)`
  position: relative;
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

interface IProps {
  feature: string | undefined;
  region: string;
}

const CafeList = ({ feature, region }: IProps) => {
  const { data: cafeList } = useFilteredCafeList(feature, region);
  const [emblaRef] = useEmblaCarousel();
  const navigate = useNavigate();

  const handleCafeClick = (cafeCode: string) => {
    navigate(ROUTES.CAFE.DETAILS.buildPath({ code: cafeCode }));
  };

  return (
    <ScrollFrame>
      <CafeListContainer>
        {cafeList?.map((cafe) => {
          const isHot = cafe.featureList.some((feat) => feat === "생카성지");
          return (
            <CafeListItem
              key={cafe.name}
              onClick={() => handleCafeClick(cafe.code)}
            >
              {/* 캐로샐 */}
              <CafeCarousel ref={emblaRef}>
                <Container>
                  {cafe.imageFileList.map((img) =>
                    img ? (
                      <Slide key={img.filename}>
                        {/* 생카성지는 인기 딱지 노출 */}
                        {isHot ? <HotBadge>인기</HotBadge> : null}
                        <img alt={cafe.name} src={img.url} />
                      </Slide>
                    ) : null
                  )}
                </Container>
              </CafeCarousel>
              {/* 설명 */}
              <CafeDesc>
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
                  <Price>{cafe.feeInfo.dailyCharge}원~</Price>
                  <Disclaimer>
                    /일 기준
                    <VerticalSep />
                    정확한 가격정보 문의 필요
                  </Disclaimer>
                </DescItem>
              </CafeDesc>
            </CafeListItem>
          );
        })}
        {/* For Last Gap(Padding) */}
        <div />
      </CafeListContainer>
    </ScrollFrame>
  );
};

export default CafeList;
