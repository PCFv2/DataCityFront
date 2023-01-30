import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { finishRound } from "src/app/finishedRound/finishRound";
import {
  setDisplayComponent,
  setIsLoading,
} from "src/app/redux/displayComponentSlice";
import { setGameData } from "src/app/redux/gameSlice";
import { setNbPoints } from "src/app/redux/userSlice";
import { requestFinishRound } from "src/app/requestServer";
import { RootState } from "src/app/store";
import { DISPLAY_COMPONENT, SOCKET_CODE } from "src/constants";
import { MESSAGE_LOADER } from "src/constants/messageLoader";
import {
  gameApi,
  useGetAllUsersByGameIdQuery,
  useGetGameByIdQuery,
  useSetFinishedMutation,
} from "src/services";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";

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
    isUninitialized,
  } = useGetAllUsersByGameIdQuery(game.gameId); /* API GET game/id/user */

  const {
    data: gameInfos,
    isLoading: gameLoading,
    refetch: refetchGame,
    isError: gameInfosIsError,
  } = useGetGameByIdQuery(game.gameId);

  const [setFinished, { isLoading: setFinishedIsLoading }] =
    useSetFinishedMutation();

  const [lastround, { isLoading: isLoadingLastround }] =
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
    return <OverlayLoader message={MESSAGE_LOADER.partyLoading} />;

  return (
    <div>
      <div>
        Joueur dans la partie :
        {userInGame?.map((elm) => (
          <p key={elm.userId}>{elm.name}</p>
        ))}
      </div>
      <div>
        <h2>Configuration de la partie</h2>
        <form>
          <input placeholder={gameInfos?.maxPlayers.toString()} />
          <input placeholder={gameInfos?.startNbPoints.toString()} />
          <input placeholder={gameInfos?.difficulty.toString()} />
        </form>
      </div>
      <button onClick={handleReady}>Pret</button>
    </div>
  );
};

export default WaitRoom;
