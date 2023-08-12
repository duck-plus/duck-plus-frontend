import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import FadeInOut from "@/components/atoms/FadeInOut";
import Modal from "@/components/organisms/Modal";
import { hScalePx } from "@/hooks/useHorizontalRatio";

const Container = styled(Modal)`
  height: 100%;
  width: 100%;
`;

const FadeInKeyframes = keyframes`
  from{transform: translateY(100%);}
  to{transform: translateY(0);}
`;
const FadeOutKeyframes = keyframes`
  // instant
`;

const BackgroundFrame = styled(FadeInOut)`
  align-items: stretch;
  animation: ${({ show }) => (show ? FadeInKeyframes : FadeOutKeyframes)}
    ${({ show }) => (show ? "0.15s" : "0s")} ease-out forwards;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${hScalePx(20)} ${hScalePx(20)} 0 0;
  display: flex;
  flex-direction: column;
  bottom: 0;
  padding: 0 0 env(safe-area-inset-bottom, 0) 0;
  position: absolute;
  right: 0;
  width: 100%;
`;

interface IProps {
  hide: () => void;
  show: boolean;
  children: React.ReactNode;
}

function BottomSheet({ show, hide, children }: IProps) {
  return (
    <>
      {show && (
        <Container onEscapeKey={hide} onClickOutside={hide}>
          <BackgroundFrame show={show}>{children}</BackgroundFrame>
        </Container>
      )}
    </>
  );
}

function useBottomSheet(initialShowState: boolean): {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  register: IProps;
  BottomSheet: React.ComponentType<IProps>;
} {
  const [show, setShow] = useState<boolean>(initialShowState ?? false);
  const hide = () => setShow(false);

  return {
    show,
    setShow,
    register: {
      hide,
      show,
      children: null,
    },
    BottomSheet,
  };
}

export default useBottomSheet;
