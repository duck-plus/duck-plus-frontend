import React, { useState } from "react";
import { Cafe } from "@/services/gql-outputs/graphql";
import useHorizontalRatio, { hScalePx } from "@/hooks/useHorizontalRatio";
import styled, { useTheme } from "styled-components";
import AppTopBar from "./AppTopBar";
import { ReactComponent as DotSVGR } from "@/assets/svgr/ic/dot.svg";
import { ReactComponent as ZoomInSVGR } from "@/assets/svgr/ic/zoom-in.svg";
import { Magnifier, MagnifierContainer } from "react-image-magnifiers";

const CafeDetailedInfoSectionFrame = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailInfoNavBar = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0 ${hScalePx(20)};
  gap: ${hScalePx(20)};
  position: sticky;
  top: calc(${AppTopBar.CSSAppTopBarHeight} - 1px);
  display: flex;
  height: ${hScalePx(40)};
  z-index: 100;
`;

const DetailInfoNavBarItem = styled.div<{ selected: boolean }>`
  height: 100%;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.fontFaces["body2/12-Medium"]};
  color: ${({ theme, selected }) =>
    selected ? theme.colors.gray900 : theme.colors.gray500};
  cursor: pointer;
`;

const DetailedInfo = styled.div`
  padding: ${hScalePx(24)} ${hScalePx(20)};
  display: flex;
  flex-direction: column;
  gap: ${hScalePx(12)};
  white-space: pre-wrap;
`;

const HorSep = styled.div`
  margin: 0 ${hScalePx(20)};
  border-bottom: ${hScalePx(1)} solid ${({ theme }) => theme.colors.gray100};
`;

const Title = styled.div`
  ${({ theme }) => theme.fontFaces["body2/12-Regular"]};
  color: ${({ theme }) => theme.colors.gray500};
  height: ${hScalePx(20)};
`;

const Info = styled.div`
  ${({ theme }) => theme.fontFaces["body2/12-Regular"]};
  color: ${({ theme }) => theme.colors.gray900};
  display: flex;
  align-items: center;
`;

const InfoList = styled.div`
  ${({ theme }) => theme.fontFaces["body2/12-Regular"]};
  display: flex;
  flex-direction: column;
`;

const InfoListItemFrame = styled(Info)`
  display: flex;
  flex-direction: row;
`;

const InfoTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: ${hScalePx(4)};
  row-gap: ${hScalePx(6)};
`;

const InfoTag = styled.div`
  ${({ theme }) => theme.fontFaces["body2/12-Regular"]};
  color: ${({ theme }) => theme.colors.gray900};
  padding: 0 ${hScalePx(12)};
  min-height: ${hScalePx(28)};
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: ${hScalePx(100)};
  display: flex;
  align-items: center;
`;

const MenuInfo = styled.div`
  ${({ theme }) => theme.fontFaces["caption/10-Regular"]};
  color: ${({ theme }) => theme.colors.gray500};
  display: flex;
  flex-direction: column;
  gap: ${hScalePx(6)};
`;

const MenuImageFrame = styled.div`
  position: relative;

  img {
    cursor: pointer;
  }
`;

const MenuDisclaimer = styled.div`
  ${({ theme }) => theme.fontFaces["caption/10-Regular"]};
  color: ${({ theme }) => theme.colors.gray500};
`;

const ZoomInIcon = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  width: ${hScalePx(32)};
  height: ${hScalePx(32)};
  padding: ${hScalePx(4)};
  cursor: pointer;
`;

const detailInfoItems = ["카페정보", "특전안내", "메뉴", "지도"] as const;

const splitToArray = (s: string | undefined | null) =>
  s && s.split(/\r\n|\r|\n/).map((s) => s.trim());

const InfoListItem = ({ children }: React.PropsWithChildren) => {
  const hr = useHorizontalRatio();
  const theme = useTheme();

  return (
    <InfoListItemFrame>
      <DotSVGR width={hr * 16} height={hr * 16} fill={theme.colors.gray900} />
      {children}
    </InfoListItemFrame>
  );
};

interface IProps {
  cafe: Cafe | null | undefined;
}

/** 카페 상세 페이지 > 상세 정보들 */
const CafeDetailedInfoSection = ({ cafe }: IProps) => {
  const [showMagnifier, setShowMagnifier] = useState<boolean>(false);
  const theme = useTheme();

  const facilityList = splitToArray(cafe?.specialBenefit);

  const specialBenefitList = splitToArray(cafe?.specialBenefit);

  const menuImage = cafe?.imageFileList?.find((s) => s?.category === "MENU");

  return !cafe ? null : (
    <CafeDetailedInfoSectionFrame>
      <HorSep
        style={{
          margin: "0",
          borderBottom: `${hScalePx(8)} solid ${theme.colors.gray50}`,
        }}
      />
      <DetailInfoNavBar>
        {detailInfoItems.map((item) => (
          // TODO) inView 활용해서, selected 컨트롤
          <DetailInfoNavBarItem selected>{item}</DetailInfoNavBarItem>
        ))}
      </DetailInfoNavBar>
      <HorSep style={{ margin: "0" }} />

      {/* 카페정보 */}
      <DetailedInfo>
        <Title>카페정보</Title>
        <Info>{cafe.detailedInfo}</Info>
      </DetailedInfo>
      <HorSep />

      {/* 시설안내 */}
      {!facilityList ? null : (
        <>
          <DetailedInfo>
            <Title>시설안내</Title>
            <InfoList>
              {facilityList.map((facility) => (
                <InfoListItem>{facility}</InfoListItem>
              ))}
            </InfoList>
          </DetailedInfo>
          <HorSep />
        </>
      )}

      {/* 특이사항 */}
      {!cafe?.remarkList ? null : (
        <>
          <DetailedInfo>
            <Title>특이사항</Title>
            <InfoTags>
              {cafe?.remarkList.map((benefit) => (
                <InfoTag>{benefit}</InfoTag>
              ))}
            </InfoTags>
          </DetailedInfo>
          <HorSep />
        </>
      )}

      {/* 지원 특전 목록 */}
      <DetailedInfo>
        <Title>지원특전목록</Title>
        <InfoList>
          {!specialBenefitList ? (
            <InfoListItem>정보 없음</InfoListItem>
          ) : (
            specialBenefitList.map((benefit) => (
              <InfoListItem>{benefit}</InfoListItem>
            ))
          )}
        </InfoList>
      </DetailedInfo>
      <HorSep />

      {/* 음료 및 디저트 메뉴판 */}
      {!menuImage ? null : (
        <>
          <DetailedInfo>
            <Title>음료 및 디저트 메뉴판</Title>
            <MenuInfo>
              {/* 이미지 */}
              <MagnifierContainer>
                <MenuImageFrame>
                  <Magnifier imageSrc={menuImage.url} />
                  {/* 돋보기 */}
                  <ZoomInIcon onClick={() => setShowMagnifier(!showMagnifier)}>
                    <ZoomInSVGR width="100%" height="100%" />
                  </ZoomInIcon>
                </MenuImageFrame>
              </MagnifierContainer>

              {/* 면책 조항 */}
              <MenuDisclaimer>
                *이벤트 메뉴와는 상이하며 구성 및 금액은 문의를 통해
                확인해주세요
              </MenuDisclaimer>
            </MenuInfo>
          </DetailedInfo>
          <HorSep />
        </>
      )}

      {/* 상세위치 */}
      <DetailedInfo>
        <Title>상세위치</Title>
        <Info>🚧🚧🚧</Info>
      </DetailedInfo>

      {/* TODO) TBD */}
      {/* ?? */}
      {/* 환불규정 */}
    </CafeDetailedInfoSectionFrame>
  );
};

export default CafeDetailedInfoSection;
