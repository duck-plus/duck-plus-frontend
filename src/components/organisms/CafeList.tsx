import { hScalePx } from "@/hooks/useHorizontalRatio";
import React from "react";
import SimpleBar from "simplebar-react";
import { styled } from "styled-components";
import useFilteredCafeList from "@/hooks/useFilteredCafeList";

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
`;

const CafeImg = styled.img`
  width: 100%;
  aspect-ratio: 40 / 23;
  background-color: ${({ theme }) => theme.colors.gray100};
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

interface IProps {
  feature: string | undefined;
  region: string;
}

const CafeList = ({ feature, region }: IProps) => {
  const { data: cafeList } = useFilteredCafeList(feature, region);

  return (
    <ScrollFrame>
      <CafeListContainer>
        {cafeList?.map((cafe) => {
          return (
            <CafeListItem>
              <CafeImg
                style={{ width: "100%", objectFit: "contain" }}
                alt={cafe.name}
                src={cafe.imageFileList[0]?.url}
              />
              <CafeDesc>
                <DescItem>
                  <Name>{cafe.name}</Name>
                  <Row>
                    <Sigungu>{cafe.address.sigungu}</Sigungu>
                    <VerticalSep />
                    <HashTags>{cafe.hashtag}</HashTags>
                  </Row>
                </DescItem>
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
