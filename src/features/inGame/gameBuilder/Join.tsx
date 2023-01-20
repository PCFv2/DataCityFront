import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  setDisplayComponent,
} from "src/app/redux/displayComponentSlice";
import { setGameId } from "src/app/redux/gameSlice";
import { setRound } from "src/app/redux/roundSlice";
import { requestJoinGame } from "src/app/requestServer";
import { RootState } from "src/app/store";
import { DISPLAY_COMPONENT } from "src/constants";
import { gameApi } from "src/services";
import { useUpdateUserByIdMutation } from "src/services/queries/user";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";

const Join = () => {
  /* redux */
  const dispatch = useDispatch();
  const user = useSelector(
    (state: RootState) => state.userSlice
  ); /* user info */

  const [processingServer, setProcessingServer] = useState<boolean>(false);
  const webSocketState = useSelector(
    (state: RootState) => state.webSocket
  ); /* on récupére la webSocket */
  //query
  const [joinGame, { isLoading: gameLoading }] =
    gameApi.endpoints.getJoinGameById.useLazyQuery();

  const [lastRound, { isLoading: roundIsLoading }] =
    gameApi.endpoints.getLastround.useLazyQuery();

  //mutation
  const [updateUser, result] = useUpdateUserByIdMutation();

  const { register, handleSubmit } =
    useForm<JoinGameForm>(); /* init formulaire */

  const onSubmit = async (data: JoinGameForm) => {
    setProcessingServer(true);
    const isAvailable = await joinGame(data.gameId);
    if (isAvailable.data) {
      requestJoinGame(webSocketState.webSocket!, data.gameId).then(() => {
        console.log("Vous avez bien rejoins la partie");
        dispatch(setGameId(data.gameId));
        updateUser({
          userId: user.userId.split("/").join("-"),
          name: data.username,
        }) /* ENVOIE a l'API */
          .then(() => {
            requestJoinGame(webSocketState.webSocket!, data.gameId).then(
              async () => {
                dispatch(
                  setDisplayComponent(DISPLAY_COMPONENT.waitRoomComponent)
                );
                setProcessingServer(false); /* on arrete le chargement */
                const round = await lastRound(data.gameId);
                dispatch(
                  setRound(round.data!)
                ); /* On rentre les infos du round dans le state */
              }
            );
          });
      });
    } else {
      console.log("erreur");
    }
  }; /* traitement du formulaire */

  if (processingServer || result.isLoading || gameLoading)
    return <OverlayLoader />;

  return (
    <div>
      <h1>Rejoindre une partie</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type={"number"} {...register("gameId")} />
        <input type={"text"} {...register("username")} />
        <button type="submit">Rejoindre la partie</button>
      </form>
    </div>
  );
};

export default Join;
