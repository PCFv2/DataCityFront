import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";
import GameCreate from "../game/components/GameCreate";
import ConfigProfil from "../inGame/configProfil/components/ConfigProfil";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate(ROUTES.game.joinGame)}>
        Rejoindre une partie
      </button>
      <GameCreate /> {/* Button create game */}
      <ConfigProfil />
    </div>
  );
};

export default Home;
