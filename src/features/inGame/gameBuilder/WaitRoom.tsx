import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {finishRound} from "src/app/finishedRound/finishRound";
import {
  setDisplayComponent,
  setIsLoading,
} from "src/app/redux/displayComponentSlice";
import {setGameData} from "src/app/redux/gameSlice";
import {setNbPoints} from "src/app/redux/userSlice";
import {requestFinishRound} from "src/app/requestServer";
import {RootState} from "src/app/store";
import {DISPLAY_COMPONENT, SOCKET_CODE} from "src/constants";
import {MESSAGE_LOADER} from "src/constants/messageLoader";
import {
  gameApi,
  useGetAllUsersByGameIdQuery,
  useGetGameByIdQuery,
  useSetFinishedMutation,
} from "src/services";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";
import styled from "@emotion/styled";
import background from "../../../assets/img/beforeGame/background.webp";
import {Primary2Button, SecondaryButton} from "../../../UI-KIT/components/Button";


const HostStyle = styled.main`
  background: url(${background}) no-repeat center center fixed;
  background-size: cover;
`;

const MainTitle = styled.h1`
  color: ${(props) => props.theme.colors.primary.white};
  font-family: ${(props) => props.theme.font.family.title};
  font-size: ${(props) => props.theme.font.size.page_title};
  margin: 0;
`;

const MainWindow = styled.div`
  display: flex;
  height: 90%;
  align-items: center;
  justify-content: center;
`;

// LeftPanel

const LeftPanel = styled.div`
  background-color: ${(props) => `${props.theme.colors.primary.white}E6`};
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90%;
  border-radius: ${(props) => props.theme.radius.small};
  padding: 0.5rem 1.5rem;
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
  padding: 1rem 3rem 2rem 3rem;
  color: ${(props) => props.theme.colors.primary.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0 ${(props) => props.theme.radius.medium} ${(props) => props.theme.radius.medium} 0;
  height: 65%;
  width: 65%;
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
  margin: auto;
`;

const Input = styled.input`
  background-color: ${(props) => props.theme.colors.primary.grey};
  border-radius: ${(props) => props.theme.radius.small};
  border: solid 2px ${(props) => props.theme.colors.primary.lightBlue};
  padding: 0.3rem 0.7rem;
`;

const WaitRoom = (): JSX.Element => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  /* redux */
  const game = useSelector(
    (state: RootState) => state.gameSlice
  ); /* game info */

  const user = useSelector(
    (state: RootState) => state.userSlice
  ); /* user info */

  const webSocketState = useSelector(
    (state: RootState) => state.webSocket
  ); /* on récupére la webSocket */

  // query
  const {
    data: userInGame,
    isLoading: userLoading,
    refetch: userRefetch,
    isError: userInGameIsError,
  } = useGetAllUsersByGameIdQuery(game.gameId); /* API GET game/id/user */

  const {
    data: gameInfos,
    isLoading: gameLoading,
    refetch: refetchGame,
    isError: gameInfosIsError,
  } = useGetGameByIdQuery(game.gameId);

  const [setFinished, {isLoading: setFinishedIsLoading}] =
    useSetFinishedMutation();

  const [lastround, {isLoading: isLoadingLastround}] =
    gameApi.endpoints.getLastround.useLazyQuery();

  /* manage error */
  useEffect(() => {
    if (userInGameIsError || gameInfosIsError) navigate("/error:api");
  }, [gameInfosIsError, userInGameIsError]);

  useEffect(() => {
    webSocketState.webSocket?.addEventListener("message", async (message) => {
      if (message.data === SOCKET_CODE.serverValidate.modifyGame) {
        refetchGame()
          .unwrap()
          .catch(() => navigate("/error:api")); // error
        userRefetch()
          .unwrap()
          .catch(() => navigate("/error:api")); // error
      }
      if (message.data === SOCKET_CODE.serverValidate.finishRound) {
        console.log(message);
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

  const handleReady = () => {
    setFinished({
      gameId: game.gameId,
      userId: user.userId,
    })
      .unwrap()
      .then(() => {
        requestFinishRound(webSocketState.webSocket!, game.gameId);

        /* set all redux */
        dispatch(setIsLoading(true));
        dispatch(setGameData(gameInfos!));
        dispatch(setNbPoints(gameInfos!.startNbPoints));
      })
      .catch(() => navigate("/error:api")); // error
  };

  if (userLoading || gameLoading || isLoadingLastround || setFinishedIsLoading)
    return <OverlayLoader message={MESSAGE_LOADER.partyLoading}/>;

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
              Patie {game.gameId}
            </RightPanelTitle>
            <ConfForm>
              <InputLine>
                <label>Nombre de joueurs maximum</label>
                <Input defaultValue={gameInfos?.maxPlayers.toString()} disabled/>
              </InputLine>
              <InputLine>
                <label>Nombre de points de départ</label>
                <Input defaultValue={gameInfos?.startNbPoints.toString()} disabled/>
              </InputLine>
              <InputLine>
                <label>Difficultée de la partie (0 à 100)</label>
                <Input defaultValue={gameInfos?.difficulty.toString()} disabled/>
              </InputLine>
              <ButtonLine>
                <SecondaryButton content={"Prêt"} onClick={handleReady}/>
              </ButtonLine>
            </ConfForm>
          </RightPanelContainer>
        </RightPanel>
      </MainWindow>
    </HostStyle>
  );
};

export default WaitRoom;
