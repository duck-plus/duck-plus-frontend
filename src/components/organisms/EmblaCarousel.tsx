import styled from 'styled-components';

const Embla = styled.div.attrs(props => ({
  className: `${props.className || 'default'} emlba`,
}))`
  width: 100%;
`;

const Container = styled.div.attrs(props => ({
  className: `${props.className || 'default'} emlba__container`,
}))`
  display: flex;
`;

const Slide = styled.div.attrs(props => ({
  className: `${props.className || 'default'} embla__slide`,
}))`
  display: flex;
  width: 100%;
  min-width: 0;
  flex-shrink: 0;
`;

const EmblaCarousel = {
  /** must be used with 'useEmblaCarousel'
   * ```
   * const [emblaRef] = useEmblaCarousel();
      return <EmblaCarousel.Embla ref={emblaRef}>
        <EmblaCarousel.Container>
          <EmblaCarousel.Slide>
          1
          </EmblaCarousel.Slide>
          <EmblaCarousel.Slide>2
          2
          </EmblaCarousel.Slide>
          <EmblaCarousel.Slide>
          3
          </EmblaCarousel.Slide>
        </EmblaCarousel.Container>      </EmblaCarousel.Embla>
   * ```
   */
  Embla,
  Container,
  Slide,
};

export default EmblaCarousel;
