import React from "react";

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestJoinGame } from "src/app/requestServer";
import { RootState } from "src/app/store";
import { ERRORS, SOCKET_CODE } from "src/constants/";

import { gameApi, usePutUserByGameIdMutation } from "src/services";
import { usePutUserByIdMutation, userApi } from "src/services/queries/user";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";

const GameJoin = (props: { webSocket: WebSocket }) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  //query
  const [gameInfos, { isLoading }] =
    gameApi.endpoints.getJoinGameById.useLazyQuery();
  const [userInfo, { isLoading: isLoadingUser }] =
    userApi.endpoints.getUserById.useLazyQuery();

  //mutation
  const [updateUser, result] = usePutUserByIdMutation();

  const { register, handleSubmit } = useForm<JoinGameForm>();

  const returnToHomePage = (errorsMessage: string) => {
    console.log(errorsMessage);
    navigate("/");
  };

  const onSubmit = async (data: JoinGameForm) => {
    const { data: isAvailable } = await gameInfos(data.gameId); // Envoie une demande au back contenant l'Id de la partie
    if (!isAvailable) returnToHomePage(ERRORS.gameJoin.badGameId);
    else {
      requestJoinGame(props.webSocket, data.gameId);
      await props.webSocket.addEventListener("message", (message) => {
        if (message.data === SOCKET_CODE.serverValidate.ok) {
          updateUser({
            userId: user.userId.replace("/", "-"),
            name: data.username,
            nbPoints: user.nbPoints,
          });
          if (result.isError) console.log("erreur");
        }
      });
    }
  };

  if (isLoading) return <OverlayLoader />;

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

export default GameJoin;
