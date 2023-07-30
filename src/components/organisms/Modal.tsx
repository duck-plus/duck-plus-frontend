import React from "react";

import ReactDOM from "react-dom";
import { FocusOn } from "react-focus-on";
import styled from "styled-components";

const ModalBackground = styled.div`
  background-color: rgba(51, 51, 51, 0.4);
  bottom: 0;
  height: 100%;
  position: absolute;
  right: 0;
  z-index: 99999;
`;

function Modal({
  className,
  children,
  style,
  onEscapeKey,
  onClickOutside,
}: {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onEscapeKey?: () => void;
  onClickOutside?: () => void;
}) {
  const modalRoot = document.querySelector("#ModalRoot");
  return modalRoot
    ? ReactDOM.createPortal(
        <ModalBackground className={className} style={style}>
          <FocusOn
            onClickOutside={(e) => {
              if (onClickOutside && e instanceof MouseEvent) {
                onClickOutside();
              }
            }}
            onEscapeKey={onEscapeKey}
            scrollLock={false}
            autoFocus={false}
            returnFocus={false}
          >
            {children}
          </FocusOn>
        </ModalBackground>,
        modalRoot
      )
    : null;
}

export default Modal;
