import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setDisplayComponent } from "src/app/redux/displayComponentSlice";
import { setGameId } from "src/app/redux/gameSlice";
import { requestJoinGame } from "src/app/requestServer";
import { RootState } from "src/app/store";
import { DISPLAY_COMPONENT } from "src/constants";
import { gameApi } from "src/services";
import { usePutUserByIdMutation } from "src/services/queries/user";
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

  //mutation
  const [updateUser, result] = usePutUserByIdMutation();

  const { register, handleSubmit } =
    useForm<JoinGameForm>(); /* init formulaire */

  const onSubmit = (data: JoinGameForm) => {
    setProcessingServer(true);
    joinGame(data.gameId).then(() => {
      requestJoinGame(webSocketState.webSocket!, data.gameId).then(() => {
        console.log("Vous avez bien rejoins la partie");
        dispatch(setGameId(data.gameId));
        updateUser({
          userId: user.userId.split("/").join("-"),
          name: data.username,
          nbPoints: user.nbPoints,
        }).then(() => {
          dispatch(setDisplayComponent(DISPLAY_COMPONENT.waitRoomComponent));
          setProcessingServer(false);
        });
      });
    });
  }; /* traitement du formulaire */

  if (processingServer) return <OverlayLoader />;
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
