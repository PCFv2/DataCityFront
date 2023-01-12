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
  const game = useSelector((state: RootState) => state.gameSlice);
  const user = useSelector((state: RootState) => state.userSlice);
  const [modifyGame, setModifyGame] = useState<boolean>(false);

  //query
  const {
    data: gameInfos,
    isLoading,
    refetch: refetchGame,
  } = useGetGameByIdQuery(game.gameId);
  const {
    data: userInGame,
    refetch: refetchUsers,
    isLoading: userLoading,
  } = useGetAllUsersByGameIdQuery(Number(game.gameId));

  /* mutation */
  const [updateConfig, result] = usePutGameByIdMutation();

  const { register, handleSubmit, reset } = useForm<PartialGame>();

  const onSubmit = async (data: PartialGame) => {
    setModifyGame(true);
    data.hostId = gameInfos?.hostId!;
    props.webSocket.send(`${SOCKET_CODE.client.modifyGame}${game.gameId}`);
    props.webSocket.addEventListener("message", (message) => {
      if (
        message.data === SOCKET_CODE.serverValidate.modifyGame &&
        modifyGame
      ) {
        updateConfig({ gameId: game.gameId, ...data }).then(() =>
          setModifyGame(false)
        ); //Envoie des données saisies au back
      }
    });
  };

  if (result.isLoading || isLoading || userLoading) return <OverlayLoader />;
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
      </div>
    </div>
  );
};

export default GameHost;
