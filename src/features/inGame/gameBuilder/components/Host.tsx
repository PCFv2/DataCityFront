import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import { webSocketSlice } from "src/app/redux/websocketSlice";
import { requestModifyGame } from "src/app/requestServer";
import { RootState } from "src/app/store";
import {DISPLAY_COMPONENT, SOCKET_CODE} from "src/constants";
import {
  useGetAllUsersByGameIdQuery,
  useGetGameByIdQuery,
  usePutGameByIdMutation,
} from "src/services";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";
import {setDisplayComponent} from "../../../../app/redux/displayComponentSlice";
import {setStartNbPoints} from "../../../../app/redux/gameSlice";

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

  const webSocketState = useSelector(
    (state: RootState) => state.webSocket
  ); /* on récupére la webSocket */

  const [processingServer, setProcessingServer] = useState<boolean>(false);

  /* query */
  const { data: gameInfos, isLoading: gameInfosLoading } = useGetGameByIdQuery(
    game.gameId
  ); /* API GET game/id */

  /* mutation */
  const [updateConfig, result] = usePutGameByIdMutation();

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

  // Lancement de la partie
  const handleStartGame = () => {
    dispatch(setStartNbPoints(gameInfos?.startNbPoints!));
    dispatch(setDisplayComponent(DISPLAY_COMPONENT.configProfile));
  }

  useEffect(() => {
    webSocketState.webSocket?.addEventListener("message", (message) => {
      if (message.data === SOCKET_CODE.serverValidate.modifyGame) {
        userRefetch();
      }
    });
  }, []);

  if (gameInfosLoading || userLoading || processingServer)
    return <OverlayLoader />;

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
