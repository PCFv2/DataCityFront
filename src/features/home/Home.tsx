import React from "react";
import { useNavigate } from "react-router-dom";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";
import { DISPLAY_COMPONENT, ROUTES } from "../../constants";
import GameCreate from "../inGame/game/components/GameCreate";
import ConfigProfil from "../inGame/configProfil/components/ConfigProfil";
import Morning from "../inGame/morning/components/Morning";
import GameJoin from "../inGame/game/components/GameJoin";
import { useDispatch } from "react-redux";
import { setDisplayComponent } from "src/app/redux/displayComponentSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (): void => {
    dispatch(setDisplayComponent(DISPLAY_COMPONENT.inGameJoin));
    navigate(ROUTES.game.inGame);
  };

  return (
    <div>
      <button onClick={handleClick}>Rejoindre la partie</button>
      <GameCreate /> {/* Button create game */}
    </div>
  );
};

export default Home;
