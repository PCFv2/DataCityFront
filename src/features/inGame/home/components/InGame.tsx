import React, { useMemo, useState, useEffect } from "react";
import HomePage from "app/pages/main/HomePage";
import { setDisplayComponent } from "app/redux/displayComponentSlice";
import { RootState } from "app/store";
import { DISPLAY_COMPONENT } from "constants/";
import GameHost from "features/game/components/GameHost";
import { useDispatch, useSelector } from "react-redux";
import ConfigProfil from "../../configProfil/components/ConfigProfil";
import Morning from "../../morning/components/Morning";
import { requestCreateGame } from "./services/requestCreateGame";
import OverlayLoader from "UI-KIT/components/OverlayLoader";
import { Navigate, useNavigate } from "react-router-dom";

const InGame = () => {
  const navigate = useNavigate();
  const ws = useMemo(() => new WebSocket("ws://localhost:6969"), []);
  const [isAccess, setIsAccess] = useState<boolean>(false);
  const dispatch = useDispatch();
  const displayComponentState = useSelector(
    (state: RootState) => state.displayComponent
  );

  useEffect(() => {
    if (displayComponentState.socketCode === 21 && isAccess)
      requestCreateGame(ws);
  }, [isAccess]);

  useEffect(() => {
    ws.addEventListener("open", () => {
      console.log("Connected");
      setIsAccess(true);
    });
    ws.addEventListener("close", () => {
      console.log("Closed");
    });

    ws.addEventListener("message", (message) => {
      console.log(message);
      if (message.data === "pong") {
        dispatch(setDisplayComponent(DISPLAY_COMPONENT.inGameHost));
      }
    });
  }, []);

  if (!isAccess) return <OverlayLoader />;

  return (
    <>
      {displayComponentState.displayComponent ===
        DISPLAY_COMPONENT.inGameMorning && <Morning />}
      {displayComponentState.displayComponent ===
        DISPLAY_COMPONENT.inGameConfigProfil && <ConfigProfil />}
      {displayComponentState.displayComponent ===
        DISPLAY_COMPONENT.inGameHost && <GameHost webSocket={ws} />}
      {displayComponentState.displayComponent === "erreur" && <p>rien</p>}
    </>
  );
};

export default InGame;
