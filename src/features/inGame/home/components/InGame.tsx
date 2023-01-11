import React, { useMemo, useState, useEffect } from "react";
import {
  clear,
  setDisplayComponent,
} from "src/app/redux/displayComponentSlice";
import { RootState } from "src/app/store";
import { DISPLAY_COMPONENT } from "src/constants/";
import GameHost from "../../game/components/GameHost";
import { useDispatch, useSelector } from "react-redux";
import ConfigProfil from "../../configProfil/components/ConfigProfil";
import Morning from "../../morning/components/Morning";
import { requestCreateGame, requestJoinGame } from "src/app/requestServer";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";
import { Navigate, useNavigate } from "react-router-dom";
import { SOCKET_CODE } from "src/constants";
import GameJoin from "../../game/components/GameJoin";
import { setUserId } from "src/app/redux/userSlice";

const InGame = () => {
  const { gameId } = useSelector((state: RootState) => state.gameSlice);
  const navigate = useNavigate();
  const ws = useMemo(() => new WebSocket("ws://localhost:6969"), []);
  const [isAccess, setIsAccess] = useState<boolean>(false);
  const [isLoadingServer, setIsLoadingServer] = useState<boolean>(false);
  const dispatch = useDispatch();
  const displayComponentState = useSelector(
    (state: RootState) => state.displayComponent
  );

  useEffect(() => {
    if (
      displayComponentState.socketCode === SOCKET_CODE.client.gameCreate &&
      isAccess
    ) {
      requestCreateGame(ws, gameId);
      setIsLoadingServer(true);
    }
  }, [isAccess]);

  useEffect(() => {
    ws.addEventListener("open", () => {
      console.log("Connected");
      setIsAccess(true);
    });
    ws.addEventListener("close", () => {
      console.log("Closed");
      navigate("/");
      dispatch(clear());
    });

    ws.addEventListener("message", (message: MessageEvent<string>) => {
      if (message.data === SOCKET_CODE.serverValidate.ok) {
        switch (displayComponentState.socketCode) {
          case SOCKET_CODE.client.gameCreate:
            setIsLoadingServer(false);
            dispatch(setDisplayComponent(DISPLAY_COMPONENT.inGameHost));
            break;
          case SOCKET_CODE.client.joinGame:
            dispatch(setDisplayComponent(DISPLAY_COMPONENT.inGameJoin));
            break;
          default:
            break;
        }
      }
      if (message.data.slice(0, 2) === SOCKET_CODE.serverValidate.getToken) {
        dispatch(setUserId(message.data.slice(2)));
      }
      if (!displayComponentState.displayComponent) {
        navigate("/");
        ws.close();
      }
    });
  }, []);

  if (!isAccess || isLoadingServer) return <OverlayLoader />;

  return (
    <>
      {displayComponentState.displayComponent ===
        DISPLAY_COMPONENT.inGameMorning && <Morning />}
      {displayComponentState.displayComponent ===
        DISPLAY_COMPONENT.inGameConfigProfil && <ConfigProfil />}
      {displayComponentState.displayComponent ===
        DISPLAY_COMPONENT.inGameHost && <GameHost webSocket={ws} />}
      {displayComponentState.displayComponent ===
        DISPLAY_COMPONENT.inGameJoin && <GameJoin webSocket={ws} />}
      {displayComponentState.displayComponent === "erreur" && <p>rien</p>}
      {}
    </>
  );
};

export default InGame;
