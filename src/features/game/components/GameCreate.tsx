import React from "react";
import { useNavigate } from "react-router-dom";
import { DISPLAY_COMPONENT, ROUTES } from "../../../constants";
import { usePostCreateGameMutation } from "../../../services";
import { useDispatch } from "react-redux";
import { setHasCreateGame } from "../slice";
import useWebSocket from "react-use-websocket";
import { setDisplayComponent } from "app/redux/displayComponentSlice";
import { setGameId } from "app/redux/gameSlice";

const GameCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createGame, { isLoading }] = usePostCreateGameMutation();

  const handleClick = async () => {
    dispatch(setDisplayComponent(DISPLAY_COMPONENT.inGameHost));
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
  if (isLoading) return <p>Loading</p>;
  return <button onClick={handleClick}>Créer une partie</button>;
};

export default GameCreate;
