import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";
import { usePostCreateGameMutation } from "../../services";
import { useDispatch } from "react-redux";
import { setHasCreateGame } from "./slice";

const GameCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createGame] = usePostCreateGameMutation();
  const handleClick = async () => {
    await createGame(); /* Envoie d'une demande de création d'une partie au Back */
    dispatch(setHasCreateGame(true));
    console.log("Création de la partie");
    /* Lors de la réponse du Back, création de la socket, 
et envoie des données au serveur. */
    navigate(
      routes.game.hostGame + `/1`
    ); /* Affichage de la page host avec l'id de la partie */
  };
  return <button onClick={handleClick}>Créer une partie</button>;
};

export default GameCreate;
