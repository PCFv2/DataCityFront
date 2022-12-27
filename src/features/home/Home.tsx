import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";
import GameCreate from "../game/GameCreate";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate(routes.game.joinGame)}>
        Rejoindre une partie
      </button>
      <GameCreate /> {/* Button create game */}
    </div>
  );
};

export default Home;
