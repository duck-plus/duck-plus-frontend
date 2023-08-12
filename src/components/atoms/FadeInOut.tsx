import React, { HTMLAttributes, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const SlideInKeyframes = keyframes`
  from{opacity: 0;transform: translateY(-10px);}
  to{opacity: 1;transform: translateY(0);}
`;
const SlideOutKeyframes = keyframes`
  from{opacity: 1;transform: translateY(0);}
  to{opacity: 0;transform: translateY(-5px);}
`;

const FadeInOutFrame = styled.div<{ $show: boolean }>`
  animation: ${({ $show }) => ($show ? SlideInKeyframes : SlideOutKeyframes)}
    ease-in 0.3s forwards;
`;

interface IFadeInOut extends HTMLAttributes<HTMLDivElement> {
  show: boolean;
  children: React.ReactNode;
  className?: string;
  onUnmounted?: () => void | Promise<void>;
}

/**
 * *show* props를 이용해 fade-in / fade-out 구현을 쉽게 해주는 *styled-component HoC*
 *
 * e.g)
 * ```
 * const foo = styled(FadeInOut)`
 *   animation: ${({show}) => show ? FadeInKeyframes : FadeOutKeyframes} 0.3s ease-out forwards;
 * `;
 * ```
 * */

const FadeInOut = React.forwardRef<HTMLDivElement, IFadeInOut>(
  (
    {
      show,
      className,
      onUnmounted,
      ...leftOver
    }: Omit<IFadeInOut, "$show"> & { show: boolean },
    ref
  ) => {
    const [shouldRender, setShouldRender] = useState(show);

    // mount
    useEffect(() => {
      if (show) {
        setShouldRender(show);
      }
    }, [show]);

    // unmount
    const handleAnimationEnd = async () => {
      if (!show) {
        if (onUnmounted) {
          await onUnmounted();
        }
        setShouldRender(false);
      }
    };

    return shouldRender ? (
      <FadeInOutFrame
        ref={ref}
        className={className}
        $show={show}
        onAnimationEnd={handleAnimationEnd}
        {...leftOver}
      />
    ) : null;
  }
);

export default FadeInOut;
