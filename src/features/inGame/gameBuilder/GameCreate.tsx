import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { DISPLAY_COMPONENT, ROUTES } from "src/constants";
import {
  gameApi,
  useGetLastroundQuery,
  usePostCreateGameMutation,
} from "src/services";
import { useDispatch, useSelector } from "react-redux";
import {
  setDisplayComponent,
  setSocketCode,
} from "src/app/redux/displayComponentSlice";
import { setGameId } from "src/app/redux/gameSlice";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";
import { SOCKET_CODE } from "src/constants";
import { requestCreateGame } from "src/app/requestServer";
import { RootState } from "src/app/store";
import { setRound } from "src/app/redux/roundSlice";
import { SecondaryButton } from "../../../UI-KIT/components/Button";
import { MESSAGE_LOADER } from "src/constants/messageLoader";

const GameCreate = (): JSX.Element => {
  const navigate = useNavigate();
  /* hook */
  const [processingServer, setProcessingServer] = useState<boolean>(false);

  /* redux */
  const webSocketState = useSelector(
    (state: RootState) => state.webSocket
  ); /* on récupére la webSocket */
  const dispatch = useDispatch();

  /* mutation */
  const [createGame, { isLoading }] = usePostCreateGameMutation();

  //query
  const [lastround, { isLoading: roundIsLoading }] =
    gameApi.endpoints.getLastround.useLazyQuery();

  const handleClick = async () => {
    setProcessingServer(true);
    dispatch(setSocketCode(SOCKET_CODE.client.gameCreate));

    createGame() /* Envoie d'une demande de création d'une partie au Back */
      .unwrap()
      .then((gameId) => {
        requestCreateGame(webSocketState.webSocket!, Object.values(gameId)[0])
          .then(() => {
            dispatch(
              setGameId(Object.values(gameId)[0])
            ); /* on set le gameId dans redux */
            dispatch(
              setDisplayComponent(DISPLAY_COMPONENT.hostComponent)
            ); /* on affiche le composent host */
            setProcessingServer(false); /* on arrete le chargement */
            lastround(Object.values(gameId)[0])
              .unwrap()
              .then((round) => dispatch(setRound(round)))
              .catch(() => navigate("/error:api")); // error
          })
          .catch(() => navigate("/error:server")); // error
      })
      .catch(() => navigate("/error:api")); // error
  };

  if (isLoading || processingServer || roundIsLoading)
    return <OverlayLoader message={MESSAGE_LOADER.gameCreate} />;

  return <SecondaryButton onClick={handleClick} content={"Créer une partie"} />;
};

export default GameCreate;
