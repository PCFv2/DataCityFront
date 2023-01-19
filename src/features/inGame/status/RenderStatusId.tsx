import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { finishRound } from "src/app/finishedRound/finishRound";
import {
  setDisplayComponent,
  setIsLoading,
} from "src/app/redux/displayComponentSlice";
import { requestFinishRound } from "src/app/requestServer";
import { RootState } from "src/app/store";
import { DISPLAY_COMPONENT, SOCKET_CODE } from "src/constants";
import { gameApi, useSetFinishedMutation } from "src/services";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";
import { ConfigProfile } from "./organisms";
import Attack from "./organisms/attack/Attack";

const RenderStatusId = () => {
  const dispatch = useDispatch();
  const [setFinished, { isLoading: setFinishedIsLoading }] =
    useSetFinishedMutation();

  const user = useSelector((state: RootState) => state.userSlice);
  const game = useSelector((state: RootState) => state.gameSlice);
  const round = useSelector((state: RootState) => state.roundSlice);

  const webSocketState = useSelector(
    (state: RootState) => state.webSocket
  ); /* on récupére la webSocket */

  /* fake value */
  const userConfigaration: UserConfigurationForm = {
    configuration: [{ configurationId: 1, value: "1" }],
  };
  const night: Night = {
    night: {
      attackId: 1,
      effectiveness: 50
    }
  }

  //query
  const [lastround] = gameApi.endpoints.getLastround.useLazyQuery();

  useEffect(() => {
    webSocketState.webSocket?.addEventListener("message", async (message) => {
      if (message.data === SOCKET_CODE.serverValidate.finishRound) {
        const roundApi = await lastround(game.gameId);
        if (finishRound(roundApi.data!)) {
          dispatch(setDisplayComponent(DISPLAY_COMPONENT.renderStatusId));
          dispatch(setIsLoading(false));
        }
      }
    });
  });

  const handleClick = (round: number) => {
    switch (round) {
      case 2:
        setFinished({
          gameId: game.gameId,
          userId: user.userId,
          ...userConfigaration,
        }).then(() => {
          requestFinishRound(webSocketState.webSocket!, game.gameId);
          dispatch(setIsLoading(true));
        });
        break;

      case 3:
        setFinished({
          gameId: game.gameId,
          userId: user.userId,
          ...userConfigaration,
        }).then(() => {
          requestFinishRound(webSocketState.webSocket!, game.gameId);
          dispatch(setIsLoading(true));
        });
        break;

      case 4:
        setFinished({
          gameId: game.gameId,
          userId: user.userId,
          ...userConfigaration,
        }).then(() => {
          requestFinishRound(webSocketState.webSocket!, game.gameId);
          dispatch(setIsLoading(true));
        });
        //TODO Journée
        break;
      case 5:
        //TODO Soirée
        break;
      case 6:
        setFinished({
          gameId: game.gameId,
          userId: user.userId,
          ...night,
        }).then(() => {
          requestFinishRound(webSocketState.webSocket!, game.gameId);
          dispatch(setIsLoading(true));
        });
        break;
    }
  };

  if (setFinishedIsLoading) return <OverlayLoader />;

  switch (round.statusId) {
    case 2:
      return (
        <div>
          <button onClick={() => handleClick(round.statusId)}>Suivant</button>
          <ConfigProfile />
        </div>
      );
    case 3:
      return (
        <div>
          <button onClick={() => handleClick(round.statusId)}>Suivant</button>
          matinée
        </div>
      );
    case 4:
      return (
        <div>
          <button onClick={() => handleClick(round.statusId)}>Suivant</button>
          jour
        </div>
      );
    case 5:
      return (
        <div>
          <button onClick={() => handleClick(round.statusId)}>Suivant</button>
          soirée
        </div>
      );
    case 6:
      return (
        <div>
          <button onClick={() => handleClick(round.statusId)}>Suivant</button>
          <Attack/>
        </div>
      );
    default:
      return <div>rien</div>;
  }
};

export default RenderStatusId;
