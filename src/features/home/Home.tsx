import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";
import { DISPLAY_COMPONENT, ROUTES, SOCKET_CODE } from "../../constants";
import GameCreate from "../inGame/gameBuilder/components/GameCreate";
import { useDispatch, useSelector } from "react-redux";
import { setDisplayComponent } from "src/app/redux/displayComponentSlice";
import { setUserId } from "src/app/redux/userSlice";
import { setWebSocket } from "src/app/redux/websocketSlice";
import { RootState } from "src/app/store";
import ConfigProfile from "../inGame/configProfile/components/ConfigProfile";

/* COMPONENT */
const Host = React.lazy(() => import("../inGame/gameBuilder/components/Host"));
const Join = React.lazy(() => import("../inGame/gameBuilder/components/Join"));
const WaitRoom = React.lazy(
  () => import("../inGame/gameBuilder/components/WaitRoom")
);

const Home = () => {
  const [websocketIsAccess, setWebSocketIsAccess] = useState<boolean>(false);
  /* Create websocket */
  const ws = useMemo(() => new WebSocket("ws://localhost:6969"), []);

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
      navigate(
        "/"
      ); /* si problème avec la connexion du websocket on redirige vers une page notFound */
      //dispatch(clear());
    });
    ws.addEventListener("message", (message) => {
      if (message.data.slice(0, 2) === SOCKET_CODE.serverValidate.getToken) {
        dispatch(
          setUserId(message.data.slice(2))
        ); /* on set le userId dans le state */
      }
    });
  });

  const handleClick = (): void => {
    dispatch(setDisplayComponent(DISPLAY_COMPONENT.joinComponent));
  };

  if (!websocketIsAccess)
    return (
      <OverlayLoader />
    ); /* si le websocket n'est pas encore créer en loading */

  // Affichage
  if (displayComponentState.displayComponent === DISPLAY_COMPONENT.home)
    return (
      <div>
        <button onClick={handleClick}>Rejoindre la partie</button>
        <GameCreate /> {/* Button create game */}
      </div>
    );

  // host
  if (
    displayComponentState.displayComponent === DISPLAY_COMPONENT.hostComponent
  )
    return (
      <Suspense fallback={<OverlayLoader />}>
        <Host />
      </Suspense>
    );

  // join
  if (
    displayComponentState.displayComponent === DISPLAY_COMPONENT.joinComponent
  )
    return (
      <Suspense fallback={<OverlayLoader />}>
        <Join />
      </Suspense>
    );

  // waitRoom
  if (
    displayComponentState.displayComponent ===
    DISPLAY_COMPONENT.waitRoomComponent
  )
    return (
      <Suspense fallback={<OverlayLoader />}>
        <WaitRoom />
      </Suspense>
    );

  if (
      displayComponentState.displayComponent === DISPLAY_COMPONENT.configProfile
  )
    return (
      <Suspense fallback={<OverlayLoader />}>
        <ConfigProfile />
      </Suspense>
    );
  return <div>en jeu</div>;
};

export default Home;
