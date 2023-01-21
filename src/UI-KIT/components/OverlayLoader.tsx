import React from "react";

import {keyframes} from "@emotion/react";
import styled from "@emotion/styled";

type OverlayLoaderProps = {
    message?: string;
}

const jump = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  16% {
    transform: translate3d(0, -25px, 0);
  }
  33% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`;

const Overlay = styled.div`
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background: ${(props) => props.theme.colors.primary.blue};
`;

const Overlay__content = styled.div`
  margin: 20% auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Dots = styled.div`
  display: flex;
  column-gap: 30px;
  width: auto;
`

const Dot = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.theme.colors.primary.lightBlue};
  border-radius: 50%;
  
  &:nth-last-child(3) {
    animation: ${jump} 1s 0.1s ease-in-out infinite;
  }
  
  &:nth-last-child(2) {
    animation: ${jump} 1s 0.3s ease-in-out infinite;
  }

  &:nth-last-child(1) {
    animation: ${jump} 1s 0.5s ease-in-out infinite;
  }
`

const LoadingMessage = styled.p`
  color: ${(props) => props.theme.colors.primary.white};
  text-align: center;
  margin-top: 30px;
  width: 90%;
`

const OverlayLoader = (props: OverlayLoaderProps): JSX.Element => {
    return (
        <Overlay>
            <Overlay__content>
                <Dots>
                    <Dot></Dot>
                    <Dot></Dot>
                    <Dot></Dot>
                </Dots>
                <LoadingMessage>{props.message || "Chargement inconnu"}</LoadingMessage>
            </Overlay__content>
        </Overlay>
    );
};

export default OverlayLoader;
