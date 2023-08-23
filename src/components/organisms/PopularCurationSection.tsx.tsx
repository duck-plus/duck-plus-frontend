import { useEffect, useState } from 'react';
import styled from 'styled-components';
import EmblaCarousel from './EmblaCarousel';
import { hScalePx } from '@/hooks/useHorizontalRatio';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import isNonNullable from '@/utils/isNonNullable';
import CurationHeader from '../molecule/CurationHeader';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/router';
import { useGetCafeCurationsQuery } from '@/services/gql-outputs/graphql';

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
  img {
    width: 100%;
    height: ${hScalePx(264)};
    object-fit: cover;
  }
  flex-direction: column;
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
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0);
  const navigate = useNavigate();
  const { data: CafeCurations } = useGetCafeCurationsQuery({ args: { isPopular: true } });

  const handleCafeClick = (cafeCode: string) => {
    navigate(ROUTES.CAFE.DETAILS.buildPath({}, { code: cafeCode }));
  };

  useEffect(() => {
    emblaApi?.on('select', emblaApi => {
      setSelectedImageIdx(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  return (
    <>
      <CurationHeader title={'마감임박, 놓치면 한 달 이상 대기'} />
      <CafeCarousel ref={emblaRef}>
        <Container>
          {CafeCurations?.cafeList?.filter(isNonNullable).map(cafe => (
            <Slide
              key={
                cafe.imageFileList
                  .filter(isNonNullable)
                  .filter(({ category }) => category === 'LANDSCAPE')[0].url
              }
              onClick={() => handleCafeClick(cafe.code)}
            >
              <img
                alt={cafe.name}
                src={
                  cafe.imageFileList
                    .filter(isNonNullable)
                    .filter(({ category }) => category === 'LANDSCAPE')[0].url
                }
              />
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
