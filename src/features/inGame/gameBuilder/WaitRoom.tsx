import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { finishRound } from "src/app/finishedRound/finishRound";
import {
  setDisplayComponent,
  setIsLoading,
} from "src/app/redux/displayComponentSlice";
import { setGameData } from "src/app/redux/gameSlice";
import { requestFinishRound } from "src/app/requestServer";
import { RootState } from "src/app/store";
import { DISPLAY_COMPONENT, SOCKET_CODE } from "src/constants";
import {
  gameApi,
  useGetAllUsersByGameIdQuery,
  useGetGameByIdQuery,
  useGetLastroundQuery,
  useSetFinishedMutation,
} from "src/services";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";

const WaitRoom = () => {
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
    isFetching: userIsFetching,
  } = useGetAllUsersByGameIdQuery(game.gameId); /* API GET game/id/user */

  const {
    data: gameInfos,
    isLoading: gameLoading,
    refetch: refetchGame,
  } = useGetGameByIdQuery(game.gameId);

  const {
    data: currentRound,
    isLoading: roundLoading,
    isFetching: roundIsFetching,
  } = useGetLastroundQuery(game.gameId);

  const [setFinished, { isLoading: setFinishedIsLoading }] =
    useSetFinishedMutation();

  const [lastround] = gameApi.endpoints.getLastround.useLazyQuery();

  useEffect(() => {
    webSocketState.webSocket?.addEventListener("message", async (message) => {
      if (message.data === SOCKET_CODE.serverValidate.modifyGame) {
        refetchGame();
        userRefetch();
      }
      if (message.data === SOCKET_CODE.serverValidate.finishRound) {
        const roundApi = await lastround(game.gameId);
        if (finishRound(roundApi.data!)) {
          dispatch(setDisplayComponent(DISPLAY_COMPONENT.renderStatusId));
          dispatch(setIsLoading(false));
        }
      }
    });
  }, []);

  const handleReady = () => {
    setFinished({
      gameId: game.gameId,
      userId: user.userId,
    }).then(() => {
      requestFinishRound(webSocketState.webSocket!, game.gameId);

      /* set all redux */
      dispatch(setIsLoading(true));
      dispatch(setGameData(gameInfos!));
    });
  };

  if (userLoading || gameLoading || roundLoading || setFinishedIsLoading)
    return <OverlayLoader />;

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
