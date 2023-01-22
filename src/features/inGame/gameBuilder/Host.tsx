import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { finishRound } from "src/app/finishedRound/finishRound";
import { webSocketSlice } from "src/app/redux/websocketSlice";
import { requestFinishRound, requestModifyGame } from "src/app/requestServer";
import { RootState } from "src/app/store";
import { DISPLAY_COMPONENT, SOCKET_CODE } from "src/constants";
import {
  gameApi,
  useGetAllUsersByGameIdQuery,
  useGetGameByIdQuery,
  useGetLastroundQuery,
  usePutGameByIdMutation,
  useSetFinishedMutation,
} from "src/services";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";
import {
  setDisplayComponent,
  setIsLoading,
} from "src/app/redux/displayComponentSlice";
import { setGameData, setStartNbPoints } from "src/app/redux/gameSlice";
import { MESSAGE_LOADER } from "src/constants/messageLoader";

const Host = () => {
  // dipatch
  const dispatch = useDispatch();
  /* redux */
  const user = useSelector(
    (state: RootState) => state.userSlice
  ); /* user info */
  const game = useSelector(
    (state: RootState) => state.gameSlice
  ); /* game info */
  const round = useSelector(
    (state: RootState) => state.roundSlice
  ); /* round info */

  const webSocketState = useSelector(
    (state: RootState) => state.webSocket
  ); /* on récupére la webSocket */

  const [processingServer, setProcessingServer] = useState<boolean>(false);

  /* query */
  const {
    data: gameInfos,
    isLoading: gameInfosLoading,
    refetch: gameRefetch,
  } = useGetGameByIdQuery(game.gameId); /* API GET game/id */

  //query
  const [lastround] = gameApi.endpoints.getLastround.useLazyQuery();

  /* mutation */
  const [updateConfig, result] = usePutGameByIdMutation();
  const [setFinished, { isLoading: setFinishedIsLoading }] =
    useSetFinishedMutation();

  const {
    data: userInGame,
    isLoading: userLoading,
    refetch: userRefetch,
  } = useGetAllUsersByGameIdQuery(game.gameId); /* API GET game/id/user */

  const { register, handleSubmit } =
    useForm<PartialGame>(); /* init du formulaire */
  const onSubmit = (data: PartialGame) => {
    data.hostId = user.userId;
    setProcessingServer(true);
    requestModifyGame(webSocketState.webSocket!, game.gameId).then(() => {
      console.log("Vous avez bien modifier votre game");
      updateConfig({ gameId: game.gameId, ...data }).then(() =>
        requestModifyGame(webSocketState.webSocket!, game.gameId).then(() =>
          setProcessingServer(false)
        )
      );
    });
  }; /* traitement du formulaire */

  // Lancement de la partie, set finished for player
  const handleStartGame = () => {
    dispatch(setStartNbPoints(gameInfos?.startNbPoints!));
    setFinished({
      gameId: game.gameId,
      userId: user.userId,
    }).then(() => {
      requestFinishRound(webSocketState.webSocket!, game.gameId);
      dispatch(setIsLoading(true));
      dispatch(setGameData(gameInfos!));
    });
  };

  useEffect(() => {
    webSocketState.webSocket?.addEventListener("message", async (message) => {
      if (message.data === SOCKET_CODE.serverValidate.modifyGame) {
        userRefetch();
        gameRefetch();
      }
      /* on check si tout le monde a fini */
      if (message.data === SOCKET_CODE.serverValidate.finishRound) {
        const roundApi = await lastround(game.gameId);
        if (finishRound(roundApi.data!)) {
          dispatch(setDisplayComponent(DISPLAY_COMPONENT.renderStatusId));
          dispatch(setIsLoading(false));
        }
      }
    });
  }, []);

  if (
    gameInfosLoading ||
    userLoading ||
    processingServer ||
    setFinishedIsLoading
  )
    return <OverlayLoader message={MESSAGE_LOADER.partyLoading} />;

  return (
    <div>
      <div>
        Joueur dans la partie :
        {userInGame?.map((elm) => (
          <p key={elm.name}>{elm.name}</p>
        ))}
      </div>
      <div>
        <h2>Configuration de votre partie</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("maxPlayers")}
            defaultValue={gameInfos?.maxPlayers}
          />
          <input
            {...register("startNbPoints")}
            defaultValue={gameInfos?.startNbPoints}
          />
          <input
            {...register("difficulty")}
            defaultValue={gameInfos?.difficulty}
          />
          <button type="submit">Enregistrer</button>
        </form>
        <button onClick={handleStartGame}>Lancer la partie</button>
      </div>
    </div>
  );
};

export default Host;
