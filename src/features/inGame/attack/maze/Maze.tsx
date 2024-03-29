import styled from "@emotion/styled";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/app/store";
import { botSetFinished } from "src/features/bot/bot";
import { PrimaryButton } from "src/UI-KIT/components/Button";
import MazeDesktop from "./organims/MazeDesktop";
import { wallsDesktop } from "./organims/MazeDesktop";
import MazeMobile, { wallsMobile } from "./organims/MazeMobile";

const Content = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  & div {
    
  }
`;

const Container = styled.div<{ screenWidth: number }>`
  width: ${(props) => (props.screenWidth >= 1100 ? "1000px" : "500px")};
  height: 500px;
  background: rgb(9, 76, 54);
  background: linear-gradient(
    90deg,
    rgba(9, 76, 54, 1) 0%,
    rgba(9, 43, 31, 1) 100%
  );
  position: relative;
  display: block;
  border: 15px solid ${(props) => props.theme.colors.secondary.grey};
  border-radius: 10px;
`;

const Point = styled.span<Position>`
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  width: 20px;
  height: 20px;
  background-color: #3fb987;
  border-radius: 5px;
`;

const FinishPoint = styled.div<Position>`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: #595959;
  border-radius: 3px;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
`;

const Rule = styled.div`
  font-size: 1.1rem;
  background-color: ${(props) => `${props.theme.colors.primary.white}A6`};
  margin: 0 50% 0 0;
  padding: 5px;
  & p {
    dislay: none;
  }
`;

const AttackResponse = styled.div`
  padding: 1em;
  border-radius: 5px;
  background-color: ${(props) => `${props.theme.colors.primary.white}A6`};
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 1.1rem;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.primary.blue};
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
  const round: Round = useSelector((state: RootState) => state.roundSlice);
  const game: Game = useSelector((state: RootState) => state.gameSlice);
  const webSocketState = useSelector((state: RootState) => state.webSocket);
  const bot = useSelector((state: RootState) => state.botSlice);

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

    /* BOT */
    if (bot.botIsActive) {
      botSetFinished(game.gameId, webSocketState.webSocket!);
    }
  };

  if (hasWon === false)
    return (
      <Content>
        <AttackResponse>
          <p> Votre attaque a échoué !</p>
          <PrimaryButton onClick={handleFinish} content={"Enregistrer"} />
        </AttackResponse>
      </Content>
    );
  if (hasWon === true)
    return (
      <Content>
        <AttackResponse>
          <p> Vous avez réussi votre attaque !</p>
          <PrimaryButton onClick={handleFinish} content={"Enregistrer"} />
        </AttackResponse>
      </Content>
    );

  return (
    <Content>
      <div>
        <Rule>
          <p>Trouver le bon chemin vers le site web</p>
        </Rule>
        <Container screenWidth={width}>
          {width >= 1100 ? <MazeDesktop /> : <MazeMobile />}
          <Point x={position.x} y={position.y}></Point>
          <FinishPoint x={posFinishPoint.x} y={posFinishPoint.y} />
        </Container>
      </div>
    </Content>
  );
};

export default Maze;
