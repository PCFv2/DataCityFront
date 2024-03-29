import styled from "@emotion/styled";
import React from "react";

const Wall = styled.div<Wall>`
  width: ${(props) =>
    props.type === "horizontale" ? `${props.width}%` : "10px"};
  height: ${(props) =>
    props.type === "verticale" ? `${props.height}%` : "10px"};
  background: rgb(9, 76, 54);
  background: linear-gradient(
    90deg,
    rgba(9, 76, 54, 1) 0%,
    rgba(9, 43, 31, 1) 100%
  );
  position: absolute;
  top: ${(props) => props.position.y}px;
  left: ${(props) => props.position.x}px;
  -webkit-box-shadow: 1px 1px 15px 1px #000000;
  box-shadow: 1px 1px 15px 1px #000000;
`;

/* walls for maze */
export const wallsMobile: Wall[] = [
  { type: "horizontale", position: { x: 0, y: 100 }, width: 10 },
  { type: "horizontale", position: { x: 0, y: 200 }, width: 20 },
  { type: "horizontale", position: { x: 100, y: 400 }, width: 20 },
  { type: "horizontale", position: { x: 300, y: 100 }, width: 20 },
  { type: "horizontale", position: { x: 200, y: 200 }, width: 30 },
  { type: "horizontale", position: { x: 300, y: 300 }, width: 40 },
  { type: "verticale", position: { x: 50, y: 300 }, height: 40 },
  { type: "verticale", position: { x: 150, y: 0 }, height: 40 },
  { type: "verticale", position: { x: 200, y: 0 }, height: 20 },
  { type: "verticale", position: { x: 450, y: 0 }, height: 40 },
  { type: "verticale", position: { x: 250, y: 200 }, height: 40 },
];

const MazeMobile = () => {
  return (
    <React.Fragment>
      <Wall
        type={"horizontale"}
        position={{
          x: 0,
          y: 100,
        }}
        width={10}
      />
      <Wall
        type={"horizontale"}
        position={{
          x: 0,
          y: 200,
        }}
        width={20}
      />
      <Wall
        type={"horizontale"}
        position={{
          x: 100,
          y: 400,
        }}
        width={20}
      />
      <Wall
        type={"horizontale"}
        position={{
          x: 300,
          y: 100,
        }}
        width={20}
      />
      <Wall
        type={"horizontale"}
        position={{
          x: 200,
          y: 200,
        }}
        width={30}
      />
      <Wall
        type={"horizontale"}
        position={{
          x: 300,
          y: 300,
        }}
        width={40}
      />
      <Wall
        type={"verticale"}
        position={{
          x: 50,
          y: 300,
        }}
        height={40}
      />
      <Wall
        type={"verticale"}
        position={{
          x: 150,
          y: 0,
        }}
        height={40}
      />
      <Wall
        type={"verticale"}
        position={{
          x: 200,
          y: 0,
        }}
        height={20}
      />
      <Wall
        type={"verticale"}
        position={{
          x: 450,
          y: 0,
        }}
        height={40}
      />
      <Wall
        type={"verticale"}
        position={{
          x: 250,
          y: 200,
        }}
        height={40}
      />
    </React.Fragment>
  );
};

export default MazeMobile;
