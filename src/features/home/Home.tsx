import React from "react";
import { useNavigate } from "react-router-dom";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";
import { ROUTES } from "../../constants";
import GameCreate from "../inGame/game/components/GameCreate";
import ConfigProfil from "../inGame/configProfil/components/ConfigProfil";
import Morning from "../inGame/morning/components/Morning";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button>Rejoindre une partie</button>
      <GameCreate /> {/* Button create game */}
    </div>
  );
};

export default Home;
