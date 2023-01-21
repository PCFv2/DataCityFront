import styled from "@emotion/styled";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/app/store";
import MazeDesktop from "./organims/MazeDesktop";
import { wallsDesktop } from "./organims/MazeDesktop";
import MazeMobile, { wallsMobile } from "./organims/MazeMobile";

const Container = styled.div<{ screenWidth: number }>`
  width: ${(props) => (props.screenWidth >= 1100 ? "1000px" : "500px")};
  height: 500px;
  background-color: grey;
  position: relative;
  display: block;
  border: 10px solid black;
  margin: 0 auto;
  border-radius: 10px;
`;

const Point = styled.span<Position>`
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.theme.colors.primary.lightBlue};
  border-radius: 5px;
`;

const FinishPoint = styled.div<Position>`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.primary.blue};
  border-radius: 3px;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
`;

type AttackProps = {
  handleFinishRound?: (
    round: number,
    userConfiguration?: UserConfigurationForm,
    night?: Night
  ) => void;
};

const Maze = (props: AttackProps) => {
  /* redux */
  const round = useSelector((state: RootState) => state.roundSlice);

  /* responsive */
  const [width, setWindowWidth] = useState(0);

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  /* maze data */
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [hasWon, setHasWon] = useState<boolean>();
  const walls: Wall[] = width >= 1100 ? wallsDesktop : wallsMobile;

  /* Finish point */
  const xFinishPoint: number = useMemo(
    () =>
      Math.floor(
        Math.random() * (width >= 1100 ? 960 - 600 : 460 - 200) +
          (width >= 1100 ? 600 : 200)
      ),
    []
  );
  const yFinishPoint: number = useMemo(
    () => Math.floor(Math.random() * 460),
    []
  );
  const posFinishPoint: Position = { x: xFinishPoint, y: yFinishPoint };

  useEffect(() => {
    /* test colision */
    const wallTest = (newPos: { x: number; y: number }) => {
      walls.map((elm) => {
        if (
          posFinishPoint.x <= newPos.x &&
          newPos.x <= posFinishPoint.x + 40 &&
          posFinishPoint.y <= newPos.y &&
          newPos.y <= posFinishPoint.y + 40
        )
          setHasWon(true);
        else if (elm.type === "horizontale") {
          if (
            elm.position.x - 10 <= newPos.x &&
            newPos.x <=
              elm.position.x +
                ((elm.width! * (width >= 1100 ? 1000 : 500)) / 100 - 10) &&
            elm.position.y - 10 <= newPos.y &&
            elm.position.y >= newPos.y
          )
            setHasWon(false);
        } else if (elm.type === "verticale") {
          if (
            elm.position.y - 10 <= newPos.y &&
            newPos.y <= elm.position.y + (elm.height! * 500) / 100 - 10 &&
            elm.position.x - 10 <= newPos.x &&
            elm.position.x >= newPos.x
          )
            setHasWon(false);
        }
      });
    };

    const handleKeyDown = (e: any): void => {
      let newPos = { x: position.x, y: position.y };
      switch (e.code) {
        case "ArrowUp":
          newPos.y = Math.max(0, position.y - 10);
          break;
        case "ArrowDown":
          newPos.y = Math.min(500 - 20, position.y + 10);
          break;
        case "ArrowLeft":
          newPos.x = Math.max(0, position.x - 10);
          break;
        case "ArrowRight":
          newPos.x = Math.min(1000 - 20, position.x + 10);
          break;
        default:
          break;
      }
      wallTest(newPos);
      setPosition(newPos);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [position]);

  const handleFinish = (): void => {
    const resultAttack: Night = {
      night: {
        attackId: 2, //Téléchargement furtif
        effectiveness: hasWon ? 100 : 0,
      },
    };
    props.handleFinishRound!(round.statusId, undefined, resultAttack);
  };

  if (hasWon === false)
    return (
      <div>
        <button onClick={handleFinish}>Enregistrer</button>
        perdu
      </div>
    );
  if (hasWon === true)
    return (
      <div>
        <button onClick={handleFinish}>Enregistrer</button>
        gagné
      </div>
    );

  return (
    <Container screenWidth={width}>
      {width >= 1100 ? <MazeDesktop /> : <MazeMobile />}
      <Point x={position.x} y={position.y} />
      <FinishPoint x={posFinishPoint.x} y={posFinishPoint.y} />
    </Container>
  );
};

export default Maze;
