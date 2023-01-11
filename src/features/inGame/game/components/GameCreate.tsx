import React from "react";
import { useNavigate } from "react-router-dom";
import { DISPLAY_COMPONENT, ROUTES } from "src/constants";
import { usePostCreateGameMutation } from "src/services";
import { useDispatch } from "react-redux";
import {
  setDisplayComponent,
  setSocketCode,
} from "src/app/redux/displayComponentSlice";
import { setGameId } from "src/app/redux/gameSlice";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";
import { SOCKET_CODE } from "src/constants";

const GameCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createGame, { isLoading }] = usePostCreateGameMutation();

  const handleClick = async () => {
    dispatch(setDisplayComponent("noProblem"));
    dispatch(setSocketCode(SOCKET_CODE.client.gameCreate));
    const result =
      await createGame(); /* Envoie d'une demande de création d'une partie au Back */

    if (result) {
      const gameId: number = Number(
        Object.values(Object.entries(result)[0][1])[0]
      ); /* get gameId of response */

      console.log("Création de la partie");
      dispatch(setGameId(gameId));
    }
    navigate(
      ROUTES.game.inGame
    ); /* Affichage de la page host avec l'id de la partie */
  };
  if (isLoading) return <OverlayLoader />;
  return <button onClick={handleClick}>Créer une partie</button>;
};

export default GameCreate;
