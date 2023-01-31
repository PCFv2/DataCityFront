import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { finishRound } from "src/app/finishedRound/finishRound";
import {
  setDisplayComponent,
  setIsLoading,
} from "src/app/redux/displayComponentSlice";
import { setRoundStatus } from "src/app/redux/roundSlice";
import { requestFinishRound } from "src/app/requestServer";
import { RootState } from "src/app/store";
import { DISPLAY_COMPONENT, SOCKET_CODE } from "src/constants";
import EndGame from "src/features/endGame/EndGame";
import { gameApi, useSetFinishedMutation } from "src/services";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";
import { ConfigProfile } from "./organisms";
import Attack from "./organisms/attack/Attack";
import Day from "./organisms/day/Day";
import Evening from "./organisms/evening/Evening";
import styled from "@emotion/styled";
import dayBackground from "src/assets/img/inGame/backgrounds/day.webp";
import nightBackground from "src/assets/img/inGame/backgrounds/night.webp";

const DayContainer = styled.div`
  background: url(${dayBackground}) no-repeat center center fixed;
  background-size: cover;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  @media (max-width: 800px) {
    padding: 0;
  }
`;

const ConfigProfileContainer = styled.div`
  background: url(${dayBackground}) no-repeat center center fixed;
  background-size: cover;
  padding: 1rem 10rem 1rem 10rem;
  @media (max-width: 800px) {
    padding: 0;
  }
`;

const MainTitle = styled.h1`
  color: ${(props) => props.theme.colors.primary.white};
  font-family: ${(props) => props.theme.font.family.title};
  font-size: ${(props) => props.theme.font.size.page_title};
  margin: 0;
  padding: 30px 30px;
`;

const EveningContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  background: url(${nightBackground}) no-repeat center center fixed;
  background-size: cover;
  height: 100%;
  @media (max-width: 800px) {
    height: auto;
  }
`;

const BackgroundNight = styled.div`
  background: url(${nightBackground}) no-repeat center center fixed;
  background-size: cover;
  height: 100%;
`;

const EndGameContainer = styled.div`
  background: url(${nightBackground}) no-repeat center center fixed;
  background-size: cover;
  padding: 0 10%;
`;

const RenderStatusId = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [setFinished, { isLoading: setFinishedIsLoading }] =
    useSetFinishedMutation();

  const user: User = useSelector((state: RootState) => state.userSlice);
  const game: Game = useSelector((state: RootState) => state.gameSlice);
  const round: Round = useSelector((state: RootState) => state.roundSlice);

  const [hasFinishedGame, setHasFinishedGame] = useState<boolean>(false);

  const webSocketState = useSelector(
    (state: RootState) => state.webSocket
  ); /* on récupére la webSocket */

  //query
  const [lastround] = gameApi.endpoints.getLastround.useLazyQuery();

  useEffect(() => {
    webSocketState.webSocket?.addEventListener("message", async (message) => {
      if (message.data === SOCKET_CODE.serverValidate.finishRound) {
        if (!hasFinishedGame) {
          lastround(game.gameId)
            .unwrap()
            .then((round) => {
              if (finishRound(round)) {
                dispatch(setDisplayComponent(DISPLAY_COMPONENT.renderStatusId));
                dispatch(setIsLoading(false));
              }
            })
            .catch(() => navigate("/error:api")); // error
        }
      }
      if (message.data === SOCKET_CODE.serverValidate.finishGame) {
        setHasFinishedGame(true); // fin de partie
      }
    });
  });

  const handleClick = (
    round: number,
    userConfiguration?: UserConfigurationForm,
    night?: Night,
    day?: DayForm
  ) => {
    switch (round) {
      case 2:
        setFinished({
          gameId: game.gameId,
          userId: user.userId,
          ...userConfiguration,
        })
          .unwrap()
          .then(() => {
            requestFinishRound(webSocketState.webSocket!, game.gameId);
            dispatch(setIsLoading(true));
          })
          .catch(() => navigate("/error:api"));
        break;

      case 3:
        setFinished({
          gameId: game.gameId,
          userId: user.userId,
          ...userConfiguration,
        })
          .unwrap()
          .then(() => {
            requestFinishRound(webSocketState.webSocket!, game.gameId);
            dispatch(setIsLoading(true));
          })
          .catch(() => navigate("/error:api"));
        break;

      case 4:
        setFinished({
          gameId: game.gameId,
          userId: user.userId,
          ...day,
        })
          .unwrap()
          .then(() => {
            requestFinishRound(webSocketState.webSocket!, game.gameId);
            dispatch(setIsLoading(true));
          })
          .catch(() => navigate("/error:api"));
        break;
      case 5:
        setFinished({
          gameId: game.gameId,
          userId: user.userId,
        })
          .unwrap()
          .then(() => {
            requestFinishRound(webSocketState.webSocket!, game.gameId);
            dispatch(setIsLoading(true));
          })
          .catch(() => navigate("/error:api"));
        //TODO soirée
        break;
      case 6:
        setFinished({
          gameId: game.gameId,
          userId: user.userId,
          ...night,
        })
          .unwrap()
          .then(() => {
            requestFinishRound(webSocketState.webSocket!, game.gameId);
            dispatch(setIsLoading(true));
          })
          .catch(() => navigate("/error:api"));
        break;
    }
  };

  if (setFinishedIsLoading) return <OverlayLoader />;

  if (hasFinishedGame)
    return (
      <EndGameContainer>
        <MainTitle>Data City</MainTitle>
        <EndGame />
      </EndGameContainer>
    );

  switch (round.statusId) {
    case 2:
      return (
        <ConfigProfileContainer>
          <MainTitle>Data City</MainTitle>
          <ConfigProfile handleFinishRound={handleClick} />
        </ConfigProfileContainer>
      );
    case 3:
      return (
        <ConfigProfileContainer>
          <MainTitle>Data City</MainTitle>
          <ConfigProfile handleFinishRound={handleClick} />
        </ConfigProfileContainer>
      );
    case 4:
      return (
        <DayContainer>
          <MainTitle>Data City</MainTitle>
          <Day handleFinishRound={handleClick} />
        </DayContainer>
      );
    case 5:
      return (
        <EveningContainer>
          <MainTitle>Data City</MainTitle>
          <Evening
            handleFinishRound={handleClick}
            setHasFinishedGame={setHasFinishedGame}
          />
        </EveningContainer>
      );
    case 6:
      return (
        <BackgroundNight>
          <Attack handleFinishRound={handleClick} />
        </BackgroundNight>
      );
    default:
      return <></>;
  }
};

export default RenderStatusId;
