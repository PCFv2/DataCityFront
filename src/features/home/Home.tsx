import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";
import { DISPLAY_COMPONENT, SOCKET_CODE } from "../../constants";
import GameCreate from "../inGame/gameBuilder/GameCreate";
import { useDispatch, useSelector } from "react-redux";
import { setDisplayComponent } from "src/app/redux/displayComponentSlice";
import { setUserId } from "src/app/redux/userSlice";
import { setWebSocket } from "src/app/redux/websocketSlice";
import { RootState } from "src/app/store";
import ConfigProfile from "../inGame/status/organisms/configProfile/ConfigProfile";
import RenderStatusId from "../inGame/status/RenderStatusId";
import Maze from "../inGame/attack/maze/Maze";

/* COMPONENT */
const Host = React.lazy(() => import("../inGame/gameBuilder/Host"));
const Join = React.lazy(() => import("../inGame/gameBuilder/Join"));
const WaitRoom = React.lazy(() => import("../inGame/gameBuilder/WaitRoom"));

const Home = () => {
  const [websocketIsAccess, setWebSocketIsAccess] = useState<boolean>(false);
  /* Create websocket */
  const ws = useMemo(() => new WebSocket("ws://localhost:6969"), []); //ws://localhost:6969

  const dispatch = useDispatch(); // pousser des données dans redux
  const displayComponentState = useSelector(
    (state: RootState) => state.displayComponent
  ); // on récupère les infos du slice displayComponent redux

  const navigate = useNavigate();

  useEffect(() => {
    ws.addEventListener("open", () => {
      console.log("Connected");
      setWebSocketIsAccess(true);
      /* connection ok */
      dispatch(setWebSocket(ws)); /* on définit le websocket dans redux */
      dispatch(setDisplayComponent(DISPLAY_COMPONENT.home));
    });
    ws.addEventListener("close", () => {
      console.log("Closed");
    });
    ws.addEventListener("message", (message) => {
      if (message.data.slice(0, 2) === SOCKET_CODE.serverValidate.getToken) {
        dispatch(
          setUserId(message.data.slice(2).split("/").join("-"))
        ); /* on set le userId dans le state */
      }
      if (message.data === SOCKET_CODE.serverError.unknownError) {
        dispatch(setDisplayComponent(DISPLAY_COMPONENT.error));
        ws.close();
      }
    });
  });

  const handleClick = (): void => {
    dispatch(setDisplayComponent(DISPLAY_COMPONENT.joinComponent));
  };

  if (!websocketIsAccess || displayComponentState.isLoading)
    return (
      <OverlayLoader />
    ); /* si le websocket n'est pas encore créer en loading */

  if (displayComponentState.displayComponent === DISPLAY_COMPONENT.error)
    navigate("/error"); /* en cas d'erreur on redirige vers /erreur */

  // Affichage
  switch (displayComponentState.displayComponent) {
    case DISPLAY_COMPONENT.home:
      return (
        <div>
          <button onClick={handleClick}>Rejoindre la partie</button>
          <GameCreate /> {/* Button create game */}
        </div>
      );
    case DISPLAY_COMPONENT.hostComponent:
      return (
        <Suspense fallback={<OverlayLoader />}>
          <Host />
        </Suspense>
      );
    case DISPLAY_COMPONENT.joinComponent:
      return (
        <Suspense fallback={<OverlayLoader />}>
          <Join />
        </Suspense>
      );
    case DISPLAY_COMPONENT.waitRoomComponent:
      return (
        <Suspense fallback={<OverlayLoader />}>
          <WaitRoom />
        </Suspense>
      );
    case DISPLAY_COMPONENT.configProfile:
      return (
        <Suspense fallback={<OverlayLoader />}>
          <ConfigProfile />
        </Suspense>
      );
    case DISPLAY_COMPONENT.renderStatusId:
      return (
        <Suspense fallback={<OverlayLoader />}>
          <RenderStatusId />
        </Suspense>
      );
  }
  return <div>Le serveur ne réponds pas</div>;
};

export default Home;
