import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";
import { DISPLAY_COMPONENT, SOCKET_CODE } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { setDisplayComponent } from "src/app/redux/displayComponentSlice";
import { setUserId } from "src/app/redux/userSlice";
import { setWebSocket } from "src/app/redux/websocketSlice";
import { RootState } from "src/app/store";
import ConfigProfile from "../inGame/status/organisms/configProfile/ConfigProfile";
import RenderStatusId from "../inGame/status/RenderStatusId";
import { MESSAGE_LOADER } from "src/constants/messageLoader";

/* COMPONENT */
const Host = React.lazy(() => import("../inGame/gameBuilder/Host"));
const Join = React.lazy(() => import("../inGame/gameBuilder/Join"));
const WaitRoom = React.lazy(() => import("../inGame/gameBuilder/WaitRoom"));
const Homepage = React.lazy(() => import("./Homepage"));

const Home = (props: { serverUrl: string }) => {
  const navigate = useNavigate();

  /* hook */
  const [websocketIsAccess, setWebSocketIsAccess] = useState<boolean>(false);

  /* Create websocket */
  const ws = useMemo(() => new WebSocket(props.serverUrl), []);

  /* redux */
  const dispatch = useDispatch(); // pousser des données dans redux
  const displayComponentState = useSelector(
    (state: RootState) => state.displayComponent
  ); // on récupère les infos du slice displayComponent redux

  useEffect(() => {
    ws.addEventListener("open", () => {
      setWebSocketIsAccess(true);
      /* connection ok */
      dispatch(setWebSocket(ws)); /* on définit le websocket dans redux */
      dispatch(setDisplayComponent(DISPLAY_COMPONENT.home));
    });
    ws.addEventListener("error", () => {
      navigate("/error:server");
      ws.close();
    });
    ws.addEventListener("message", (message) => {
      if (message.data.slice(0, 2) === SOCKET_CODE.serverValidate.getToken) {
        dispatch(
          setUserId(message.data.slice(2).split("/").join("-"))
        ); /* on set le userId dans le state */
      }
      if (message.data === SOCKET_CODE.serverError.unknownError) {
        navigate("/error:server"); /* error page */
        ws.close();
      }
    });
  });

  if (!websocketIsAccess || displayComponentState.isLoading)
    return <OverlayLoader message={MESSAGE_LOADER.loading} />;

  // Affichage
  switch (displayComponentState.displayComponent) {
    case DISPLAY_COMPONENT.home:
      return (
        <Suspense fallback={<OverlayLoader />}>
          <Homepage />
        </Suspense>
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
