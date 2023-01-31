import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { finishRound } from "src/app/finishedRound/finishRound";
import { requestFinishRound, requestModifyGame } from "src/app/requestServer";
import { RootState } from "src/app/store";
import { DISPLAY_COMPONENT, SOCKET_CODE } from "src/constants";
import {
  gameApi,
  useGetAllUsersByGameIdQuery,
  useGetGameByIdQuery,
  usePutGameByIdMutation,
  useSetFinishedMutation,
} from "src/services";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";
import {
  setDisplayComponent,
  setIsLoading,
} from "src/app/redux/displayComponentSlice";
import { setNbPoints } from "src/app/redux/userSlice";
import { setGameData, setStartNbPoints } from "src/app/redux/gameSlice";
import { MESSAGE_LOADER } from "src/constants/messageLoader";
import styled from "@emotion/styled";
import background from "../../../assets/img/beforeGame/background.webp";
import {
  Primary2Button,
  SecondaryButton,
} from "../../../UI-KIT/components/Button";
import { useNavigate } from "react-router-dom";
import { loadBot, botSetFinished } from "src/features/bot/bot";
import { setBotIsActive } from "src/app/redux/botSlice";

const HostStyle = styled.main`
  background: url(${background}) no-repeat center center fixed;
  background-size: cover;
  padding: 0 10%;
  height: 100%;
  @media (max-width: 1100px) {
    height: auto;
  }
`;

const MainTitle = styled.h1`
  color: ${(props) => props.theme.colors.primary.white};
  font-family: ${(props) => props.theme.font.family.title};
  font-size: ${(props) => props.theme.font.size.page_title};
  margin: 0;
  padding: 30px 0;
`;

const MainWindow = styled.div`
  display: flex;
  height: 80%;
  align-items: center;
  @media (max-width: 1100px) {
    flex-wrap: wrap;
    padding: 10% 0;
  }
`;

// LeftPanel

const LeftPanel = styled.div`
  background-color: ${(props) => `${props.theme.colors.primary.white}E6`};
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90%;
  width: 20%;
  text-align: center;
  border-radius: ${(props) => props.theme.radius.small};
  padding: 0.5rem 1.5rem;
  @media (max-width: 1100px) {
    height: auto;
    width: 100%;
  }
`;

const LeftPanelTitle = styled.h2`
  font-weight: bold;
  border-bottom: solid 2px ${(props) => props.theme.colors.primary.blue};
`;

const Players = styled.div`
  margin-bottom: auto;
  text-align: center;
`;

// RightPanel

const RightPanel = styled.div`
  background-color: ${(props) => `${props.theme.colors.primary.blue}E6`};
  color: ${(props) => props.theme.colors.primary.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0 ${(props) => props.theme.radius.medium}
    ${(props) => props.theme.radius.medium} 0;
  width: 80%;
  @media (max-width: 1100px) {
    height: auto;
    width: 100%;
    border-radius: ${(props) => props.theme.radius.medium};
  }
  padding: 50px 0;
`;

const RightPanelContainer = styled.div`
  width: 70%;
`;

const RightPanelTitle = styled.h2`
  text-align: center;
  border-bottom: solid 2px ${(props) => props.theme.colors.primary.white};
`;

const ConfForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 2.5rem;
`;

const InputLine = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  button {
    height: 100%;
`;

const Input = styled.input`
  background-color: ${(props) => props.theme.colors.primary.grey};
  border-radius: ${(props) => props.theme.radius.small};
  border: solid 2px ${(props) => props.theme.colors.primary.lightBlue};
  padding: 0.3rem 0.7rem;
`;

const Host = (): JSX.Element => {
  const navigate = useNavigate();

  /* redux */
  const dispatch = useDispatch();
  const user: User = useSelector(
    (state: RootState) => state.userSlice
  ); /* user info */
  const game: Game = useSelector(
    (state: RootState) => state.gameSlice
  ); /* game info */

  const bot = useSelector((state: RootState) => state.botSlice); /* game info */

  const webSocketState = useSelector(
    (state: RootState) => state.webSocket
  ); /* on récupére la webSocket */

  /* hook */
  const [processingServer, setProcessingServer] = useState<boolean>(false);

  /* query */
  const {
    data: gameInfos,
    isLoading: gameInfosLoading,
    refetch: gameRefetch,
    isError: gameInfosIsError,
  } = useGetGameByIdQuery(game.gameId); /* API GET game/id */

  const [lastround, { isLoading: isLoadingLastround }] =
    gameApi.endpoints.getLastround.useLazyQuery();

  const {
    data: userInGame,
    isLoading: userLoading,
    refetch: userRefetch,
    isError: userInGameIsError,
  } = useGetAllUsersByGameIdQuery(game.gameId); /* API GET game/id/user */

  /* bot */
  const handleLoadBot = (): void => {
    if (userInGame?.length === 1) {
      setProcessingServer(true);
      loadBot(game.gameId).then(() => {
        setProcessingServer(false);
        dispatch(setBotIsActive(true)); // bot activé
        handleStartGame(true);
        return;
      });
    }
    return;
  };

  /* manage error */
  useEffect(() => {
    if (userInGameIsError || gameInfosIsError) navigate("/error:api");
  }, [gameInfosIsError, userInGameIsError]);

  /* mutation */
  const [updateConfig] = usePutGameByIdMutation();
  const [setFinished, { isLoading: setFinishedIsLoading }] =
    useSetFinishedMutation();

  const { register, handleSubmit } =
    useForm<PartialGame>(); /* init du formulaire */

  const onSubmit = (data: PartialGame) => {
    data.hostId = user.userId;
    setProcessingServer(true);
    requestModifyGame(webSocketState.webSocket!, game.gameId)
      .then(() => {
        updateConfig({ gameId: game.gameId, ...data })
          .unwrap()
          .then(
            () =>
              requestModifyGame(webSocketState.webSocket!, game.gameId)
                .then(() => setProcessingServer(false))
                .catch(() => navigate("/error:server")) // error
          )
          .catch(() => navigate("/error:api")); // error
      })
      .catch(() => navigate("/error:server")); // error
  }; /* traitement du formulaire */

  // Lancement de la partie, set finished for player
  const handleStartGame = (botIsActive?: boolean) => {
    /* BOT */
    dispatch(setStartNbPoints(gameInfos?.startNbPoints!));
    setFinished({
      gameId: game.gameId,
      userId: user.userId,
    })
      .unwrap()
      .then(() => {
        requestFinishRound(webSocketState.webSocket!, game.gameId);
        dispatch(setIsLoading(true));
        dispatch(setGameData(gameInfos!));
      })
      .catch(() => navigate("/error:api")); // error

    if (botIsActive) {
      botSetFinished(game.gameId, webSocketState.webSocket!);
    }
  };

  useEffect(() => {
    webSocketState.webSocket?.addEventListener("message", async (message) => {
      if (message.data === SOCKET_CODE.serverValidate.modifyGame) {
        userRefetch()
          .unwrap()
          .catch(() => navigate("/error:api")); // error
        gameRefetch()
          .unwrap()
          .catch(() => navigate("/error:api")); // error
      }
      /* on check si tout le monde a fini */
      if (message.data === SOCKET_CODE.serverValidate.finishRound) {
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
    });
  }, []);

  if (
    gameInfosLoading ||
    userLoading ||
    processingServer ||
    setFinishedIsLoading ||
    isLoadingLastround
  )
    return <OverlayLoader message={MESSAGE_LOADER.partyLoading} />;

  return (
    <HostStyle>
      <MainTitle>Data City</MainTitle>
      <MainWindow>
        <LeftPanel>
          <LeftPanelTitle>Joueurs dans la partie</LeftPanelTitle>
          <Players>
            {userInGame?.map((elm) => (
              <p key={elm.name}>{elm.name}</p>
            ))}
          </Players>
        </LeftPanel>
        <RightPanel>
          <RightPanelContainer>
            <RightPanelTitle>
              Configuration de la partie | id : {game.gameId}
            </RightPanelTitle>
            <ConfForm onSubmit={handleSubmit(onSubmit)}>
              <InputLine>
                <label>Nombre de joueurs maximum</label>
                <Input
                  {...register("maxPlayers")}
                  defaultValue={gameInfos?.maxPlayers}
                />
              </InputLine>
              <InputLine>
                <label>Nombre de points de départ</label>
                <Input
                  {...register("startNbPoints")}
                  defaultValue={gameInfos?.startNbPoints}
                />
              </InputLine>
              <InputLine>
                <label>Difficultée de la partie (0 à 100)</label>
                <Input
                  {...register("difficulty")}
                  defaultValue={gameInfos?.difficulty}
                />
              </InputLine>
              <ButtonLine>
                <SecondaryButton
                  type="submit"
                  content={"Enregistrer"}
                ></SecondaryButton>
                {userInGame!.length > 1 && (
                  <Primary2Button
                    onClick={handleStartGame}
                    content={"Lancer la partie"}
                  ></Primary2Button>
                )}

                {!bot.botIsActive && userInGame?.length === 1 && (
                  <SecondaryButton
                    onClick={handleLoadBot}
                    content={"Lancer la partie avec un bot"}
                  />
                )}
              </ButtonLine>
            </ConfForm>
          </RightPanelContainer>
        </RightPanel>
      </MainWindow>
    </HostStyle>
  );
};

export default Host;
