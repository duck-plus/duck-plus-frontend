import React, { useEffect, useState } from "react";
import PageFrame from "../atoms/PageFrame";
import AppTopBar from "../organisms/AppTopBar";
import styled, { useTheme } from "styled-components";
import EmblaCarousel from "../organisms/EmblaCarousel";
import useHorizontalRatio, { hScalePx } from "@/hooks/useHorizontalRatio";
import {
  Day,
  useGetCafeListQuery,
  useGetCafeQuery,
} from "@/services/gql-outputs/graphql";
import { useTypedSearchParams } from "react-router-typesafe-routes/dom";
import { ROUTES } from "@/router";
import useEmblaCarousel from "embla-carousel-react";
import { ReactComponent as LocationSVGR } from "@/assets/svgr/ic/location.svg";
import { ReactComponent as TimeSVGR } from "@/assets/svgr/ic/time.svg";
import { ReactComponent as InstagramSVGR } from "@/assets/svgr/ic/instagram.svg";
// FIXME) 카카오 svg 나오면 교체 필요
import { ReactComponent as KakaoSVGR } from "@/assets/svgr/ic/instagram.svg";
// FIXME) 트위터 svg 나오면 교체 필요
import { ReactComponent as TwitterSVGR } from "@/assets/svgr/ic/instagram.svg";
import isNotNull from "@/utils/isNotNull";

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

const CafeDesc1 = styled.div`
  padding: ${hScalePx(16)} ${hScalePx(20)} ${hScalePx(12)} ${hScalePx(20)};
  display: flex;
  flex-direction: column;
  gap: ${hScalePx(2)};
`;
const CafeDesc2 = styled.div`
  padding: ${hScalePx(16)} ${hScalePx(20)};
  display: flex;
  flex-direction: column;
  gap: ${hScalePx(6)};
`;
const Desc2Item = styled.div`
  ${({ theme }) => theme.fontFaces["body2/12-Regular"]};
  color: ${({ theme }) => theme.colors.gray800};
  display: flex;
  height: ${hScalePx(20)};
  align-items: center;
  gap: ${hScalePx(6)};
`;

const Name = styled.div`
  ${({ theme }) => theme.fontFaces["title2/16-Regular"]};
  color: ${({ theme }) => theme.colors.gray900};
`;
const BriefInfo = styled.div`
  ${({ theme }) => theme.fontFaces["body2/12-Regular"]};
  color: ${({ theme }) => theme.colors.gray800};
`;

const HorSep = styled.div`
  width: ${hScalePx(320)};
  margin: 0 auto;
  border-bottom: ${hScalePx(1)} solid ${({ theme }) => theme.colors.gray100};
`;

const SNSChannelName = styled.div`
  text-decoration: underline;
  cursor: pointer;
`;

const dayToLocaleStringMap: Record<Day, string> = {
  FRI: "금",
  MON: "월",
  SAT: "토",
  SUN: "일",
  THU: "목",
  TUE: "화",
  WED: "수",
} as const;

const NoHolidayBadge = styled.div`
  ${({ theme }) => theme.fontFaces["overline/9-SemiBold"]};
  color: ${({ theme }) => theme.colors.gray700};
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: ${hScalePx(2)};
  padding: 0 ${hScalePx(4)};
  height: ${hScalePx(14)};
  display: flex;
  align-items: center;
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

  const hr = useHorizontalRatio();
  const theme = useTheme();

  if (!code) {
    alert("잘못된 접근입니다.");
    window.location.href = "/";
  }

  return (
    <PageFrame>
      <AppTopBar.LeftIcon />
      {/* Cafe Image Carousel */}
      <CafeCarousel ref={emblaRef}>
        <Container>
          {cafe?.imageFileList.map((img) =>
            img ? (
              <Slide>
                <img alt={cafe.name} src={img.url} />
              </Slide>
            ) : null
          )}
        </Container>
        {/* 캐로샐 탐색용 점들 */}
        <CarouselDots>
          {cafe?.imageFileList.map((_, idx) => {
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
      {cafe ? (
        <>
          {/* Cafe Description */}
          <CafeDesc1>
            <Name>{cafe.name}</Name>
            <BriefInfo>{cafe.briefInfo}</BriefInfo>
          </CafeDesc1>
          <HorSep></HorSep>
          <CafeDesc2>
            <Desc2Item>
              <LocationSVGR
                width={hr * 16}
                height={hr * 16}
                fill={theme.colors.gray800}
              />
              {cafe.address.briefAddress}
            </Desc2Item>
            {cafe.snsList
              .filter(isNotNull)
              .map(({ type, channelName, url }) => {
                const SNSIcon =
                  type === "KAKAO"
                    ? KakaoSVGR
                    : type === "INSTAGRAM"
                    ? InstagramSVGR
                    : TwitterSVGR;

                return (
                  <Desc2Item key={`${channelName}_${url}`}>
                    <SNSIcon
                      width={hr * 16}
                      height={hr * 16}
                      fill={theme.colors.gray800}
                    />
                    <SNSChannelName onClick={() => window.open(url)}>
                      {channelName}
                    </SNSChannelName>
                  </Desc2Item>
                );
              })}
            <Desc2Item>
              <TimeSVGR
                width={hr * 16}
                height={hr * 16}
                fill={theme.colors.gray800}
              />
              {/* 요일 */}
              {cafe.businessHour.businessDayList.length === 7
                ? "매일"
                : cafe.businessHour.businessDayList
                    .filter(isNotNull)
                    .reduce(
                      (prev, day, idx) =>
                        `${prev}${idx > 0 ? " " : ""}${
                          dayToLocaleStringMap[day]
                        }`,
                      ""
                    ) + " "}
              {/* 시간 */}
              {cafe.businessHour.openingTime}~{cafe.businessHour.closingTime}
              {/* 휴일에도 운영 하면 휴무없음 딱지*/}
              {cafe.businessHour.workingOnHoliday ? (
                <NoHolidayBadge>휴무없음</NoHolidayBadge>
              ) : null}
            </Desc2Item>
          </CafeDesc2>
        </>
      ) : null}
      {/* TODO) show CafeDetails.. */}
    </PageFrame>
  );
};

export default CafeDetailPage;
