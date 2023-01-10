import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

const animation = keyframes`
0% {
  transform: scale(1);
}
20% {
  transform: scale(1, 2.5);
}
40% {
  transform: scale(1);
}
`;

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingBar = styled.div`
  width: 4px;
  height: 18px;
  margin: 0 8px;
  border-radius: 4px;
  animation: ${animation} 1s ease-in-out infinite;
`;

const OverlayLoader = () => {
  return (
    <Loader>
      <LoadingBar />
      <LoadingBar />
      <LoadingBar />
      <LoadingBar />
    </Loader>
  );
};

export default OverlayLoader;
