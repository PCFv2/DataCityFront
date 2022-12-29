import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";
import GameCreate from "../game/components/GameCreate";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate(ROUTES.game.joinGame)}>
        Rejoindre une partie
      </button>
      <GameCreate /> {/* Button create game */}
    </div>
  );
};

export default Home;
