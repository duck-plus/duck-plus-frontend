import { createContext, useContext, useState } from "react";
import { styled } from "styled-components";
import { useResizeDetector } from "react-resize-detector";

/**
 * Horizontal Ratio의 값을 component들에게 뿌려주는 context.
 */
const HorizontalRatioContext = createContext<number>(1);

/**
 * HorizontalRatioContext의 provider component.
 */
const HorizontalRatioProvider = HorizontalRatioContext.Provider;

const RatioContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`;

interface IProps extends React.PropsWithChildren {
  className?: string;
  designWidth?: number;
  style?: React.CSSProperties;
}

/** 디자인 상의 px => 100vw 비례한 값으로 변환하기 위한 값인 'hr'을 컨텍스트로 뿌려주는 HoC */
export function HorizontalRatioBoundary({
  className,
  style,
  designWidth = 360,
  children,
}: IProps) {
  const [ratio, setRatio] = useState<number>(1);

  // container 크기가 바뀔 때 마다, hr 재계산
  const { ref: containerRef } = useResizeDetector({
    onResize: (width) => {
      const nextRatio = (width || designWidth) / designWidth;
      // css 변수에 반영
      if (containerRef.current)
        containerRef.current.style.setProperty(
          "--horizontal-ratio",
          `${nextRatio}px`
        );
      // js 변수에 반영
      setRatio(nextRatio);
    },
  });

  return (
    <RatioContainer className={className} style={style} ref={containerRef}>
      <HorizontalRatioProvider value={ratio}>
        {children}
      </HorizontalRatioProvider>
    </RatioContainer>
  );
}

/**
 * js용 변수에 접근하기 위한 hook
 * ```
 * const hr = useHorizontalRatio();
 * ```
 */
const useHorizontalRatio = () => useContext(HorizontalRatioContext);
export default useHorizontalRatio;

/** css용 변수에 접근하기 위한 helper
 * ```
 * hScalePx(12); // 12px;
 * ```
 */
export const hScalePx = (value: number): string =>
  `calc(var(--horizontal-ratio, 1px) * ${value})`;
