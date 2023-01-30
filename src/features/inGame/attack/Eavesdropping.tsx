import styled from "@emotion/styled";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/app/store";
import { generateFiles, verifyWin } from "./services/eavesDropping";

import background from "src/assets/img/inGame/backgrounds/night.webp";
import desktop from "src/assets/img/eavesDropping/desktop.jpg";
import { botSetFinished } from "src/features/bot/bot";
import { PrimaryButton } from "src/UI-KIT/components/Button";

const Rule = styled.div`
  font-size: 1.1rem;
  background-color: ${(props) => `${props.theme.colors.primary.white}A6`};
  margin: 0 50% 0 10%;
  padding: 5px;
  & p {
    dislay: none;
  }
`;

const Content = styled.span<{
  coordinatesTop: number;
  coordinatesLeft: number;
  isWrong: boolean;
}>`
  position: absolute;
  top: ${(props) => `${props.coordinatesTop}px`};
  left: ${(props) => `${props.coordinatesLeft}px`};
  transform: translateY(100%);
  & span {
    color: ${(props) => (props.isWrong ? "red" : "green")};
    font-size: 50px;
  }
`;

const Container = styled.div`
  background: url(${background}) no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  padding-top: 2%;

  & p {
    margin: 0;
  }
  & button {
    margin: 50px auto;
  }
`;

const SubContainer = styled.div`
  height: 70%;
  background: url(${desktop}) no-repeat;
  background-size: cover;
  border-radius: 10px;
  margin: 40px 10%;
  border: 15px solid ${(props) => props.theme.colors.secondary.grey};
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

const EavesDropping = (props: AttackProps) => {
  const NUMBER_FILES = 6;
  /* hook */
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [files, setFiles] = useState<FileType[]>(
    useMemo(() => generateFiles(NUMBER_FILES), [])
  );

  /* redux */
  const round = useSelector((state: RootState) => state.roundSlice);
  const game = useSelector((state: RootState) => state.gameSlice);
  const webSocketState = useSelector((state: RootState) => state.webSocket);
  const bot = useSelector((state: RootState) => state.botSlice);

  useEffect(() => {
    if (!verifyWin(files)) setHasWon(true);
  }, [files]);

  const handleClick = (elm: FileType): void => {
    if (!elm.isWrong) {
      const oldFiles = [...files.filter((element) => element.id !== elm.id)];
      setFiles(oldFiles);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleFinish = (): void => {
    const resultAttack: Night = {
      night: {
        attackId: 3, //hameconnage
        effectiveness: hasWon ? 100 : 0,
      },
    };
    props.handleFinishRound!(round.statusId, undefined, resultAttack);

    /* BOT */
    if (bot.botIsActive) {
      botSetFinished(game.gameId, webSocketState.webSocket!);
    }
  };

  /* a gagné */
  if (hasWon)
    return (
      <AttackResponse>
        <p>Vous avez réussi votre attaque !</p>
        <PrimaryButton onClick={handleFinish} content={"Enregistrer"} />
      </AttackResponse>
    );

  return (
    <Container>
      <Rule>
        <p>Mettez les bons fichier dans le dossier</p>
      </Rule>
      <SubContainer>
        {files.map((elm, index) => (
          <Content
            key={index}
            onClick={() => handleClick(elm)}
            isWrong={elm.isWrong}
            coordinatesTop={elm.cordinateY}
            coordinatesLeft={elm.cordinateX}
          >
            <span className="material-icons">description</span>
          </Content>
        ))}
      </SubContainer>
    </Container>
  );
};

export default React.memo(EavesDropping);
