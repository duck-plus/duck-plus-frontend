import React from "react";
import { Cafe, Day } from "@/services/gql-outputs/graphql";
import useHorizontalRatio, { hScalePx } from "@/hooks/useHorizontalRatio";
import { ReactComponent as LocationSVGR } from "@/assets/svgr/ic/location.svg";
import { ReactComponent as TimeSVGR } from "@/assets/svgr/ic/time.svg";
import { ReactComponent as InstagramSVGR } from "@/assets/svgr/ic/instagram.svg";
import { ReactComponent as KakaoSVGR } from "@/assets/svgr/ic/kakao.svg";
import { ReactComponent as TwitterSVGR } from "@/assets/svgr/ic/twitter.svg";
import styled, { useTheme } from "styled-components";
import isNonNullable from "@/utils/isNonNullable";
import openURL from "@/utils/openURL";
import ga from "@/utils/ga";

const BreifIntro = styled.div`
  padding: ${hScalePx(16)} ${hScalePx(20)} ${hScalePx(12)} ${hScalePx(20)};
  display: flex;
  flex-direction: column;
  gap: ${hScalePx(2)};
`;
const CafeBriefInfo = styled.div`
  padding: ${hScalePx(16)} ${hScalePx(20)};
  display: flex;
  flex-direction: column;
  gap: ${hScalePx(6)};
`;
const DetailItem = styled.div`
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
const BriefIntro = styled.div`
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

interface IProps {
  cafe: Cafe;
}

const CafeBriefInfoSection = ({ cafe }: IProps) => {
  const hr = useHorizontalRatio();
  const theme = useTheme();
  return (
    <div>
      <BreifIntro>
        <Name>{cafe.name}</Name>
        <BriefIntro>{cafe.briefInfo}</BriefIntro>
      </BreifIntro>
      <HorSep></HorSep>
      <CafeBriefInfo>
        {/* 간략 주소 */}
        <DetailItem>
          <LocationSVGR
            width={hr * 16}
            height={hr * 16}
            fill={theme.colors.gray800}
          />
          {cafe.address.briefAddress}
        </DetailItem>
        {/* SNS */}
        {cafe.snsList
          .filter(isNonNullable)
          .map(({ type, channelName, url }) => {
            const SNSIcon =
              type === "KAKAO"
                ? KakaoSVGR
                : type === "INSTAGRAM"
                ? InstagramSVGR
                : TwitterSVGR;

            return (
              <DetailItem key={`${channelName}_${url}`}>
                <SNSIcon
                  width={hr * 16}
                  height={hr * 16}
                  fill={theme.colors.gray800}
                />
                <SNSChannelName
                  onClick={() => {
                    ga.send("sns_btn", {
                      type,
                      cafeName: cafe.name,
                      channelName,
                      url,
                    });
                    openURL(url);
                  }}
                >
                  {channelName}
                </SNSChannelName>
              </DetailItem>
            );
          })}
        {/* 운영 시간 */}
        <DetailItem>
          <TimeSVGR
            width={hr * 16}
            height={hr * 16}
            fill={theme.colors.gray800}
          />
          {/* 요일 */}
          {cafe.businessHour.businessDayList.length === 7
            ? "매일"
            : cafe.businessHour.businessDayList
                .filter(isNonNullable)
                .reduce(
                  (prev, day, idx) =>
                    `${prev}${idx > 0 ? " " : ""}${dayToLocaleStringMap[day]}`,
                  ""
                ) + " "}
          {/* 시간 */}
          {cafe.businessHour.openingTime}~{cafe.businessHour.closingTime}
          {/* 휴일에도 운영 하면 휴무없음 딱지*/}
          {cafe.businessHour.workingOnHoliday ? (
            <NoHolidayBadge>휴무없음</NoHolidayBadge>
          ) : null}
        </DetailItem>
      </CafeBriefInfo>
    </div>
  );
};

export default CafeBriefInfoSection;
