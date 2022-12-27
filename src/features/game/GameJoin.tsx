import React from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { errors } from "../../constants/errors";

import { gameApi, usePutUserByGameIdMutation } from "../../services";
import OverlayLoader from "../../UI-KIT/OverlayLoader";

const GameJoin = () => {
  const navigate = useNavigate();
  //query
  const [gameInfos, { isLoading }] =
    gameApi.endpoints.getJoinGameById.useLazyQuery();
  //mutation
  const [updateUser] = usePutUserByGameIdMutation();

  const { register, handleSubmit } = useForm<JoinGameForm>();

  const returnToHomePage = (errorsMessage: string) => {
    console.log(errorsMessage);
    navigate("/home");
  };

  const onSubmit = async (data: JoinGameForm) => {
    const { data: isAvailable } = await gameInfos(data.gameId); // Envoie une demande au back contenant l'Id de la partie
    if (!isAvailable) returnToHomePage(errors.gameJoin.badGameId);
    else {
      /* Lors de la réponse du Back, création de la socket et envoie des données au serveur */
      const fakeUserId = "EEFOEJOFE"; /* Récupérer le sec-web-socket-key */
      updateUser({
        gameId: data.gameId,
        userId: fakeUserId,
        username: data.username,
      }); /* Envoie des données saisies au back */
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
