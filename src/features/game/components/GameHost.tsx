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
  usePutGameByIdMutation,
} from "../../../services";
import OverlayLoader from "../../../UI-KIT/components/OverlayLoader";
import io from "socket.io-client";
import useWebSocket from "react-use-websocket";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import { useNavigate } from "react-router-dom";

const requestCreateGame = async (
  webSocket: WebSocket,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setIsVisible: Dispatch<SetStateAction<boolean>>
) => {
  webSocket.send("99"); /* request create game server */
  webSocket.addEventListener("message", async (message) => {
    return new Promise((resolve, rejected) => {
      if (message.data === "gpong") {
        setIsLoading(false);
      } else setIsVisible(false);
    });
  });
};

const GameHost = (props: { webSocket: WebSocket }) => {
  const { webSocket } = props;
  const navigate = useNavigate();

  const { gameId } = useSelector((state: RootState) => state.gameSlice);
  //query
  const [gameInfos, { data: data, isLoading: isLoadingGame }] =
    gameApi.endpoints.getGameById.useLazyQuery();
  // const [isVisible, setIsVisible] = useState<boolean>(true);

  // if (isLoading)
  //   requestCreateGame(webSocket, setIsLoading, setIsVisible).then(() =>
  //     console.log("ok")
  //   );

  // if (!isVisible) navigate("/");
  const { register, handleSubmit } = useForm<HosterGameForm>();
  /* mutation */
  const [updateConfig, result] = usePutGameByIdMutation();

  /* query */
  const { data: userInGame } = useGetAllUsersByGameIdQuery(Number(gameId));

  const onSubmit = async (data: HosterGameForm) => {
    await updateConfig({ gameId: Number(gameId), ...data }); //Envoie des données saisies au back
    if (!result.isError) console.log("message d'erreur");
    /* Une fois la réponse du back, envoie des données au serveur */
  };
  console.log(gameId);
  if (result.isLoading || isLoadingGame) return <OverlayLoader />;
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
          <input placeholder="maxPlayers" {...register("maxPlayers")} />
          <input placeholder="startNbPoints" {...register("startNbPoints")} />
          <input placeholder="difficulty" {...register("difficulty")} />
          <button type="submit">Enregistrer</button>
        </form>
        <button>ded</button>
      </div>
    </div>
  );
};

export default GameHost;
