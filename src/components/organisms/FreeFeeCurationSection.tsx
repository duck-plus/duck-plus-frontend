import { useEffect, useState } from 'react';

import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import useHorizontalRatio, { hScalePx } from '@/hooks/useHorizontalRatio';
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
  padding-left: ${hScalePx(5)};
  gap: ${hScalePx(5)};
  align-items: center;
`;

// carousel slide item
const Slide = styled(EmblaCarousel.Slide)`
  width: ${hScalePx(256)};
  position: relative;
  flex: 0 0 auto; /* Adapt slide size to its content */
  min-width: 0;
  max-width: 100%; /* Prevent from growing larger than viewport */
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  flex-direction: column;
`;

const OverlayContainer = styled.div`
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const Badge = styled.div`
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.black};
  display: inline-flex;
  padding: ${hScalePx(16)} ${hScalePx(11)};
  justify-content: center;
  align-items: center;
  position: absolute;
  left: ${hScalePx(12)};
  top: ${hScalePx(12)};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fontFaces['body2/12-SemiBold']};
`;

const CafeName = styled.div`
  ${({ theme }) => theme.fontFaces['title2/16-Regular']};
  color: ${({ theme }) => theme.colors.white};
  position: absolute;
  bottom: ${hScalePx(32)};
  left: ${hScalePx(12)};
`;

const HashTags = styled.div`
  ${({ theme }) => theme.fontFaces['body2/12-Regular']};
  color: ${({ theme }) => theme.colors.white};
  position: absolute;
  bottom: ${hScalePx(12)};
  left: ${hScalePx(12)};
`;

const OPTIONS: EmblaOptionsType = {
  loop: true,
};

const FreeFeeCurationSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0);
  const navigate = useNavigate();
  const { data: CafeCurations } = useMockGetCafeCurations({ args: { feature: '무료대관' } });
  const hr = useHorizontalRatio();

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
      <CurationHeader title={'대관료 무료 카페'} />
      <CafeCarousel ref={emblaRef}>
        <Container>
          {CafeCurations?.cafeList?.filter(isNonNullable).map((cafe, index) => (
            <Slide key={cafe.code} onClick={() => handleCafeClick(cafe.code)}>
              <img
                alt={cafe.name}
                src={
                  cafe.imageFileList
                    .filter(isNonNullable)
                    .filter(({ category }) => category === 'LANDSCAPE')[0]?.url
                }
                style={{
                  height: index === selectedImageIdx ? hr * 328 : hr * 304,
                  width: 'auto',
                }}
              />
              <OverlayContainer />
              <Badge>FREE</Badge>
              <CafeName>{cafe.name}</CafeName>
              <HashTags>
                {cafe.hashtag
                  ?.split(' ')
                  .filter(tag => tag.startsWith('#'))
                  .slice(0, 3)
                  .join(' ')}
              </HashTags>
            </Slide>
          ))}
        </Container>
      </CafeCarousel>
    </>
  );
};

export default FreeFeeCurationSection;
