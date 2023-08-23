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
  gap: ${hScalePx(4)};
`;

// carousel slide item
const Slide = styled(EmblaCarousel.Slide)`
  width: ${hScalePx(152)};
  position: relative;
  flex: 0 0 auto; /* Adapt slide size to its content */
  min-width: 0;
  max-width: 100%; /* Prevent from growing larger than viewport */

  flex-direction: column;
  img {
    width: 100%;
    height: ${hScalePx(152)};
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

const ConceptCurationSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0);
  const navigate = useNavigate();
  const { data: CafeCurations } = useGetCafeCurationsQuery({ args: { feature: '무료대관' } });

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
      <CurationHeader title={'내 아이돌과 어울리는 컨셉 카페'} />
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

export default ConceptCurationSection;
