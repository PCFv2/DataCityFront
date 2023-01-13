import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DISPLAY_COMPONENT, ROUTES } from "src/constants";
import { usePostCreateGameMutation } from "src/services";
import { useDispatch, useSelector } from "react-redux";
import {
  setDisplayComponent,
  setSocketCode,
} from "src/app/redux/displayComponentSlice";
import { setGameId, setHostId } from "src/app/redux/gameSlice";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";
import { SOCKET_CODE } from "src/constants";
import { requestCreateGame } from "src/app/requestServer";
import { RootState } from "src/app/store";

const GameCreate = () => {
  const [processingServer, setProcessingServer] = useState<boolean>(false);
  const webSocketState = useSelector(
    (state: RootState) => state.webSocket
  ); /* on récupére la webSocket */
  const dispatch = useDispatch();
  const [createGame, { isLoading, isError }] = usePostCreateGameMutation();

  const handleClick = async () => {
    setProcessingServer(true);
    dispatch(setSocketCode(SOCKET_CODE.client.gameCreate));
    const result =
      await createGame(); /* Envoie d'une demande de création d'une partie au Back */

    if (!isError) {
      /* si ok pour le back */
      const gameId: number = Number(
        Object.values(Object.entries(result)[0][1])[0]
      ); /* on récupère le gameId */

      requestCreateGame(webSocketState.webSocket!, gameId).then(() => {
        console.log("création de la partie réussi");
        dispatch(setGameId(gameId)); /* on set le gameId dans redux */
        dispatch(
          setDisplayComponent(DISPLAY_COMPONENT.hostComponent)
        ); /* on affiche le composent host */
        setProcessingServer(false); /* on arrete le chargement */
      });
    }
  };
  if (isLoading || processingServer) return <OverlayLoader />;
  return <button onClick={handleClick}>Créer une partie</button>;
};

export default GameCreate;
