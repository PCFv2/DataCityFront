import React from "react";

import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;
const Overlay = styled.div`
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background: #44444430;
`;
const Overlay__inner = styled.div`
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
`;
const Overlay__content = styled.div`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const Spinner = styled.span`
  width: 75px;
  height: 75px;
  display: inline-block;
  border-width: 2px;
  border-color: rgba(13, 55, 86, 0.05);
  border-top-color: blue;
  animation: ${spin} 1s infinite linear;
  border-radius: 100%;
  border-style: solid;
`;

const OverlayLoader = (): JSX.Element => {
  return (
    <Overlay>
      <Overlay__inner>
        <Overlay__content>
          <Spinner></Spinner>
        </Overlay__content>
      </Overlay__inner>
    </Overlay>
  );
};

export default OverlayLoader;
