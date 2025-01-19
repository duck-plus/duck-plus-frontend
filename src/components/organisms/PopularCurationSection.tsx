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
  gap: ${hScalePx(6)};
`;

// carousel slide item
const Slide = styled(EmblaCarousel.Slide)`
  width: ${hScalePx(264)};
  position: relative;
  flex: 0 0 auto; /* Adapt slide size to its content */
  min-width: 0;
  max-width: 100%; /* Prevent from growing larger than viewport */
  flex-direction: column;
`;

const SlideImgFrame = styled.div`
  position: relative;
  width: 100%;
  img {
    width: 100%;
    height: ${hScalePx(264)};
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

const PopularCurationSection = () => {
  const [emblaRef] = useEmblaCarousel(OPTIONS);
  const navigate = useNavigate();
  const { data: CafeCurations } = useMockGetCafeCurations({ args: { isPopular: true } });

  const handleCafeClick = (cafeCode: string) => {
    navigate(ROUTES.CAFE.DETAILS.buildPath({}, { code: cafeCode }));
  };

  return (
    <>
      <CurationHeader title={'마감임박, 놓치면 한 달 이상 대기'} />
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

export default PopularCurationSection;
