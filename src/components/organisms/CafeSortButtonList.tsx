import styled from 'styled-components';
import Lottie from 'react-lottie-player';
import CategoryLottie from '@/assets/lotties/categori.json';
import useHorizontalRatio, { hScalePx } from '@/hooks/useHorizontalRatio';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/router';
import useCafeFeatureList from '@/hooks/useCafeFeatureList';

const Container = styled.div`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  height: ${hScalePx(120)};
  padding: ${hScalePx(24)} ${hScalePx(20)};
  display: flex;
  gap: ${hScalePx(15)};
  cursor: pointer;
`;

const ButtonContainer = styled.button`
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  border-width: 0;
`;

const ButtonImgContianer = styled.div`
  display: flex;
  /* padding: ${hScalePx(16)} ${hScalePx(14)}; */
  justify-content: center;
  align-items: center;
  width: ${hScalePx(52)};
  height: ${hScalePx(52)};
  margin-bottom: ${hScalePx(6)};
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: ${hScalePx(12)};
  ${({ theme }) => theme.fontFaces['body2/12-SemiBold']};
  color: ${({ theme }) => theme.colors.black};
`;

const Title = styled.div`
  ${({ theme }) => theme.fontFaces['caption/10-Regular']};
  color: ${({ theme }) => theme.colors.black};
`;

const buttons = [
  { id: 1, buttonTitle: 'ALL', title: '전체보기', lottie: false },
  { id: 2, title: '생카성지', lottie: true },
  { id: 3, buttonTitle: 'FREE', title: '무료대관', lottie: false },
  { id: 4, buttonTitle: 'EVENT', title: '특전맛집', lottie: false },
  { id: 5, buttonTitle: 'BIG', title: '대형카페', lottie: false },
];

const CafeSortButtonList = () => {
  const navigate = useNavigate();
  const hr = useHorizontalRatio();
  const handleButtonClick = (feature: string | undefined) => {
    navigate(ROUTES.CAFE.LIST.buildPath({}, { initFeat: feature }));
  };

  const { data: features } = useCafeFeatureList();

  return (
    <Container>
      {buttons.map(button => (
        <ButtonContainer
          onClick={() => handleButtonClick(features?.find(feature => feature === button.title))}
        >
          {button.lottie ? (
            <>
              <ButtonImgContianer>
                <Lottie
                  animationData={CategoryLottie}
                  loop
                  play
                  style={{
                    width: hr * 52,
                    height: hr * 52,
                    zIndex: 20,
                  }}
                ></Lottie>
              </ButtonImgContianer>
              <Title>{button.title}</Title>
            </>
          ) : (
            <>
              <ButtonImgContianer>{button.buttonTitle}</ButtonImgContianer>
              <Title>{button.title}</Title>
            </>
          )}
        </ButtonContainer>
      ))}
    </Container>
  );
};

export default CafeSortButtonList;
