import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/app/store";
import { SOCKET_CODE } from "src/constants";
import { useGetAllUsersByGameIdQuery, useGetGameByIdQuery } from "src/services";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";

const WaitRoom = () => {
  /* redux */
  const game = useSelector(
    (state: RootState) => state.gameSlice
  ); /* game info */

  const webSocketState = useSelector(
    (state: RootState) => state.webSocket
  ); /* on récupére la webSocket */

  // query
  const {
    data: userInGame,
    isLoading: userLoading,
    refetch: userRefetch,
  } = useGetAllUsersByGameIdQuery(game.gameId); /* API GET game/id/user */

  //query
  const {
    data: gameInfos,
    isLoading: gameLoading,
    refetch: refetchGame,
  } = useGetGameByIdQuery(game.gameId);

  useEffect(() => {
    webSocketState.webSocket?.addEventListener("message", (message) => {
      if (message.data === SOCKET_CODE.serverValidate.modifyGame) {
        refetchGame();
        userRefetch();
      }
    });
  }, [webSocketState.webSocket]);

  if (userLoading || gameLoading) return <OverlayLoader />;

  return (
    <div>
      <div>
        Joueur dans la partie :
        {userInGame?.map((elm) => (
          <p key={elm.name}>{elm.name}</p>
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
    </div>
  );
};

export default WaitRoom;
