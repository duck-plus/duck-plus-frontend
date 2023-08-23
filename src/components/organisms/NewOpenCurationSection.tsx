import { useEffect, useState } from 'react';
import styled from 'styled-components';
import EmblaCarousel from '../organisms/EmblaCarousel';
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
  img {
    width: 100%;
    height: ${hScalePx(152)};
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

const NewOpenCuraionSection = () => {
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
      <CurationHeader title={'[NEW] 신상 이벤트 카페'} />
      <CafeCarousel ref={emblaRef}>
        <Container>
          {CafeCurations?.cafeList?.filter(isNonNullable).map(cafe => (
            <Slide key={cafe.code} onClick={() => handleCafeClick(cafe.code)}>
              <img
                alt={cafe.name}
                src={
                  cafe.imageFileList
                    .filter(isNonNullable)
                    .filter(({ category }) => category === 'LANDSCAPE')[0]?.url
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

export default NewOpenCuraionSection;
