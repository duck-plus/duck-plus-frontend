import { useState } from 'react';

import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { hScalePx } from '@/hooks/useHorizontalRatio';
import { ROUTES } from '@/router';
import isNonNullable from '@/utils/isNonNullable';

import { useMockGetCafeCurations } from '../../services/gql/gql-outputs-mock/useMockGetCafeCurations';
import CurationHeader from '../molecule/CurationHeader';
import EmblaCarousel from './EmblaCarousel';

// carousel
const CafeCarousel = styled(EmblaCarousel.Embla)`
  position: relative;
  cursor: pointer;
  margin-bottom: ${hScalePx(40)};
`;

// carousel container
const Container = styled(EmblaCarousel.Container)`
  padding-left: ${hScalePx(20)};
  gap: ${hScalePx(4)};
`;

const ButtonContainer = styled.div`
  flex-direction: row;
  gap: ${hScalePx(6)};
  display: flex;
  width: 100%;
  padding-left: ${hScalePx(20)};
  margin-bottom: ${hScalePx(16)};
`;

const ConceptButton = styled.button<{ $selected?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${hScalePx(4)} ${hScalePx(12)};
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.black : theme.colors.white};
  border-radius: ${hScalePx(100)};
  ${({ theme }) => theme.fontFaces['body2/12-Regular']};
  color: ${({ theme, $selected }) => ($selected ? theme.colors.white : theme.colors.gray800)};
  border: ${hScalePx(1)} solid
    ${({ theme, $selected }) => ($selected ? theme.colors.white : theme.colors.gray100)};
`;

// carousel slide item
const Slide = styled(EmblaCarousel.Slide)`
  width: ${hScalePx(152)};
  position: relative;
  flex: 0 0 auto; /* Adapt slide size to its content */
  min-width: 0;
  max-width: 100%; /* Prevent from growing larger than viewport */
  flex-direction: column;
`;

const SlideImgFrame = styled.div`
  position: relative;
  width: 100%;
  height: ${hScalePx(152)};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &::after {
    background-color: #000000;
    opacity: 0.1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
  }
`;

const CafeName = styled.div`
  margin-top: ${hScalePx(6)};
  ${({ theme }) => theme.fontFaces['body2/12-Medium']};
  color: ${({ theme }) => theme.colors.gray900};
`;

const HashTags = styled.div`
  ${({ theme }) => theme.fontFaces['caption/10-Regular']};
  color: ${({ theme }) => theme.colors.gray600};
`;

const OPTIONS: EmblaOptionsType = {
  slidesToScroll: 'auto',
  containScroll: 'trimSnaps',
};

const concepts = [
  {
    id: 0,
    text: '모던',
  },
  {
    id: 1,
    text: '아기자기',
  },
  {
    id: 2,
    text: '코지',
  },
  {
    id: 3,
    text: '내추럴',
  },
];

const ConceptCurationSection = () => {
  const [emblaRef] = useEmblaCarousel(OPTIONS);
  const [selectedButtonIdx, setSelectedButtonIdx] = useState<number>(0);
  const navigate = useNavigate();
  const { data: CafeCurations } = useMockGetCafeCurations({
    args: { concept: concepts.find(concept => concept.id === selectedButtonIdx)?.text },
  });

  const handleCafeClick = (cafeCode: string) => {
    navigate(ROUTES.CAFE.DETAILS.buildPath({}, { code: cafeCode }));
  };

  return (
    <>
      <CurationHeader title={'내 아이돌과 어울리는 컨셉 카페'} />
      <ButtonContainer>
        {concepts.map((item, idx) => (
          <ConceptButton
            key={item.id}
            onClick={() => setSelectedButtonIdx(idx)}
            $selected={idx === selectedButtonIdx}
          >
            {item.text}
          </ConceptButton>
        ))}
      </ButtonContainer>
      <CafeCarousel ref={emblaRef}>
        <Container>
          {CafeCurations?.cafeList?.filter(isNonNullable).map(cafe => (
            <Slide key={cafe.code} onClick={() => handleCafeClick(cafe.code)}>
              <SlideImgFrame>
                <img
                  alt={cafe.name}
                  src={
                    cafe.imageFileList
                      .filter(isNonNullable)
                      .filter(({ category }) => category === 'LANDSCAPE')[0]?.url
                  }
                />
              </SlideImgFrame>
              <CafeName>{cafe.name}</CafeName>
              <HashTags>{cafe.hashtag}</HashTags>
            </Slide>
          ))}
        </Container>
      </CafeCarousel>
    </>
  );
};

export default ConceptCurationSection;
