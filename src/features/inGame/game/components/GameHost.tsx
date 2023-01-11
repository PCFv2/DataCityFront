import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  gameApi,
  useGetAllUsersByGameIdQuery,
  useGetGameByIdQuery,
  usePutGameByIdMutation,
} from "src/services";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "src/app/store";
import { useNavigate } from "react-router-dom";
import { SOCKET_CODE } from "src/constants";

const GameHost = (props: { webSocket: WebSocket }) => {
  const navigate = useNavigate();

  const { gameId } = useSelector((state: RootState) => state.gameSlice);

  //query
  const { data: gameInfos, isLoading } = useGetGameByIdQuery(gameId);

  const { register, handleSubmit } = useForm<PartialGame>();
  /* mutation */
  const [updateConfig, result] = usePutGameByIdMutation();

  /* query */
  const { data: userInGame } = useGetAllUsersByGameIdQuery(Number(gameId));

  const onSubmit = async (data: PartialGame) => {
    data.hostId = gameInfos?.hostId!;
    props.webSocket.send(`${SOCKET_CODE.client.modifyGame}${gameId}`);
    await props.webSocket.addEventListener("message", (message) => {
      if (message.data === SOCKET_CODE.serverValidate.modifyGame) {
        updateConfig({ gameId: gameId, ...data }); //Envoie des données saisies au back
        if (result.isError) console.log("message d'erreur");
        /* Une fois la réponse du back, envoie des données au serveur */
      }
    });
  };
  if (result.isLoading || isLoading) return <OverlayLoader />;
  return (
    <div>
      <div>
        Joueur dans la partie :
        {userInGame?.map((elm) => (
          <p key={elm.userId}>{elm.userId}</p>
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
      </div>
    </div>
  );
};

export default GameHost;
