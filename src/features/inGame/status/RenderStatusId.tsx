import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import Day from "./organisms/day/Day";
import Evening from "./organisms/evening/Evening";

const RenderStatusId = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [setFinished, { isLoading: setFinishedIsLoading }] =
    useSetFinishedMutation();

  const user: User = useSelector((state: RootState) => state.userSlice);
  const game: Game = useSelector((state: RootState) => state.gameSlice);
  const round: Round = useSelector((state: RootState) => state.roundSlice);

  const [hasFinishedGame, setHasFinishedGame] = useState<boolean>(false);

  const webSocketState = useSelector(
    (state: RootState) => state.webSocket
  ); /* on récupére la webSocket */

  //query
  const [lastround] = gameApi.endpoints.getLastround.useLazyQuery();

  useEffect(() => {
    webSocketState.webSocket?.addEventListener("message", async (message) => {
      if (message.data === SOCKET_CODE.serverValidate.finishRound) {
        if (hasFinishedGame) {
          navigate("/end-game");
        } else {
          lastround(game.gameId)
            .unwrap()
            .then((round) => {
              if (finishRound(round)) {
                dispatch(setDisplayComponent(DISPLAY_COMPONENT.renderStatusId));
                dispatch(setIsLoading(false));
              }
            })
            .catch(() => navigate("/error:api")); // error
        }
      }
    });
  });

  const handleClick = (
    round: number,
    userConfiguration?: UserConfigurationForm,
    night?: Night,
    day?: DayForm
  ) => {
    switch (round) {
      case 2:
        setFinished({
          gameId: game.gameId,
          userId: user.userId,
          ...userConfiguration,
        })
          .unwrap()
          .then(() => {
            requestFinishRound(webSocketState.webSocket!, game.gameId);
            dispatch(setIsLoading(true));
          })
          .catch(() => navigate("/error:api"));
        break;

      case 3:
        setFinished({
          gameId: game.gameId,
          userId: user.userId,
          ...userConfiguration,
        })
          .unwrap()
          .then(() => {
            requestFinishRound(webSocketState.webSocket!, game.gameId);
            dispatch(setIsLoading(true));
          })
          .catch(() => navigate("/error:api"));
        break;

      case 4:
        setFinished({
          gameId: game.gameId,
          userId: user.userId,
          ...day,
        })
          .unwrap()
          .then(() => {
            requestFinishRound(webSocketState.webSocket!, game.gameId);
            dispatch(setIsLoading(true));
          })
          .catch(() => navigate("/error:api"));
        break;
      case 5:
        setFinished({
          gameId: game.gameId,
          userId: user.userId,
        })
          .unwrap()
          .then(() => {
            requestFinishRound(webSocketState.webSocket!, game.gameId);
            dispatch(setIsLoading(true));
          })
          .catch(() => navigate("/error:api"));
        //TODO soirée
        break;
      case 6:
        setFinished({
          gameId: game.gameId,
          userId: user.userId,
          ...night,
        })
          .unwrap()
          .then(() => {
            requestFinishRound(webSocketState.webSocket!, game.gameId);
            dispatch(setIsLoading(true));
          })
          .catch(() => navigate("/error:api"));
        break;
    }
  };

  if (setFinishedIsLoading) return <OverlayLoader />;

  switch (round.statusId) {
    case 2:
      return (
        <div>
          <ConfigProfile handleFinishRound={handleClick} />
        </div>
      );
    case 3:
      return (
        <div>
          <ConfigProfile handleFinishRound={handleClick} />
        </div>
      );
    case 4:
      return (
        <div>
          <Day handleFinishRound={handleClick} />
        </div>
      );
    case 5:
      return (
        <div>
          <Evening
            handleFinishRound={handleClick}
            setHasFinishedGame={setHasFinishedGame}
          />
        </div>
      );
    case 6:
      return (
        <div>
          <Attack handleFinishRound={handleClick} />
        </div>
      );
    default:
      return <div>rien</div>;
  }
};

export default RenderStatusId;
