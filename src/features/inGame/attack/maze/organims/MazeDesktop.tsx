import styled from "@emotion/styled";
import React from "react";

const Wall = styled.div<Wall>`
  width: ${(props) =>
    props.type === "horizontale" ? `${props.width}%` : "10px"};
  height: ${(props) =>
    props.type === "verticale" ? `${props.height}%` : "10px"};
  background-color: black;
  position: absolute;
  top: ${(props) => props.position.y}px;
  left: ${(props) => props.position.x}px;
`;

/* walls for maze */
export const wallsDesktop: Wall[] = [
  { type: "horizontale", position: { x: 0, y: 100 }, width: 10 },
  { type: "horizontale", position: { x: 0, y: 200 }, width: 20 },
  { type: "horizontale", position: { x: 200, y: 400 }, width: 20 },
  { type: "horizontale", position: { x: 600, y: 100 }, width: 20 },
  { type: "horizontale", position: { x: 400, y: 200 }, width: 30 },
  { type: "horizontale", position: { x: 600, y: 300 }, width: 40 },
  { type: "verticale", position: { x: 100, y: 300 }, height: 40 },
  { type: "verticale", position: { x: 300, y: 0 }, height: 40 },
  { type: "verticale", position: { x: 400, y: 0 }, height: 20 },
  { type: "verticale", position: { x: 900, y: 0 }, height: 40 },
  { type: "verticale", position: { x: 500, y: 200 }, height: 40 },
];

const MazeDesktop = () => {
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
          x: 200,
          y: 400,
        }}
        width={20}
      />
      <Wall
        type={"horizontale"}
        position={{
          x: 600,
          y: 100,
        }}
        width={20}
      />
      <Wall
        type={"horizontale"}
        position={{
          x: 400,
          y: 200,
        }}
        width={30}
      />
      <Wall
        type={"horizontale"}
        position={{
          x: 600,
          y: 300,
        }}
        width={40}
      />
      <Wall
        type={"verticale"}
        position={{
          x: 100,
          y: 300,
        }}
        height={40}
      />
      <Wall
        type={"verticale"}
        position={{
          x: 300,
          y: 0,
        }}
        height={40}
      />
      <Wall
        type={"verticale"}
        position={{
          x: 400,
          y: 0,
        }}
        height={20}
      />
      <Wall
        type={"verticale"}
        position={{
          x: 900,
          y: 0,
        }}
        height={40}
      />
      <Wall
        type={"verticale"}
        position={{
          x: 500,
          y: 200,
        }}
        height={40}
      />
    </React.Fragment>
  );
};

export default MazeDesktop;
