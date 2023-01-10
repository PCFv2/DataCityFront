import HomePage from "app/pages/main/HomePage";
import { setDisplayComponent } from "app/redux/displayComponentSlice";
import { RootState } from "app/store";
import { DISPLAY_COMPONENT } from "constants/";
import GameHost from "features/game/components/GameHost";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfigProfil from "../../configProfil/components/ConfigProfil";
import Morning from "../../morning/components/Morning";
import { requestCreateGame } from "./services/requestCreateGame";

const InGame = () => {
  const ws = useMemo(() => new WebSocket("ws://localhost:6969"), []);
  const dispatch = useDispatch();

  ws.addEventListener("open", () => {
    console.log("Connected");
    requestCreateGame(ws);
  });
  ws.addEventListener("close", () => {
    console.log("Closed");
  });

  ws.addEventListener("message", (message) => {
    console.log(message);
    if (message.data === "pong")
      dispatch(setDisplayComponent(DISPLAY_COMPONENT.inGameHost));
    else {
      dispatch(setDisplayComponent("erreur"));
    }
  });

  const displayComponentState = useSelector(
    (state: RootState) => state.displayComponent
  );
  return (
    <>
      {displayComponentState.displayComponent ===
        DISPLAY_COMPONENT.inGameMorning && <Morning />}
      {displayComponentState.displayComponent ===
        DISPLAY_COMPONENT.inGameConfigProfil && <ConfigProfil />}
      {displayComponentState.displayComponent ===
        DISPLAY_COMPONENT.inGameHost && <GameHost webSocket={ws} />}
      {displayComponentState.displayComponent === "erreur" && <HomePage />}
    </>
  );
};

export default InGame;
