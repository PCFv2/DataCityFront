import EavesDropping from "features/inGame/attack/components/Eavesdropping";
import Phishing from "features/inGame/attack/components/Phishing";
import React from "react";
import { useNavigate } from "react-router-dom";
import OverlayLoader from "UI-KIT/components/OverlayLoader";
import { ROUTES } from "../../constants";
import GameCreate from "../game/components/GameCreate";
import ConfigProfil from "../inGame/configProfil/components/ConfigProfil";
import Morning from "../inGame/morning/components/Morning";

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
