import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDisplayComponent } from "src/app/redux/displayComponentSlice";
import { setGameId } from "src/app/redux/gameSlice";
import { setRound } from "src/app/redux/roundSlice";
import { requestJoinGame } from "src/app/requestServer";
import { RootState } from "src/app/store";
import { DISPLAY_COMPONENT } from "src/constants";
import { MESSAGE_LOADER } from "src/constants/messageLoader";
import { gameApi } from "src/services";
import { useUpdateUserByIdMutation } from "src/services/queries/user";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";

const Join = (): JSX.Element => {
  const navigate = useNavigate();

  /* redux */
  const dispatch = useDispatch();
  const user: User = useSelector(
    (state: RootState) => state.userSlice
  ); /* user info */

  const [processingServer, setProcessingServer] = useState<boolean>(false);
  const webSocketState = useSelector(
    (state: RootState) => state.webSocket
  ); /* on récupére la webSocket */

  //query
  const [joinGame, { isLoading: gameLoading }] =
    gameApi.endpoints.getJoinGameById.useLazyQuery();

  const [lastRound, { isLoading: roundIsLoading }] =
    gameApi.endpoints.getLastround.useLazyQuery();

  //mutation
  const [updateUser, { isLoading: isLoadingUser, isError: isErrorUpdateUser }] =
    useUpdateUserByIdMutation();

  const { register, handleSubmit } =
    useForm<JoinGameForm>(); /* init formulaire */

  const onSubmit = async (data: JoinGameForm) => {
    setProcessingServer(true);

    joinGame(data.gameId)
      .unwrap()
      .then((isAvailable) => {
        if (isAvailable) {
          requestJoinGame(webSocketState.webSocket!, data.gameId)
            .then(() => {
              dispatch(setGameId(Number(data.gameId)));
              updateUser({
                userId: user.userId.split("/").join("-"),
                name: data.username,
              })
                .unwrap()
                .then(() => {
                  requestJoinGame(webSocketState.webSocket!, data.gameId)
                    .then(() => {
                      dispatch(
                        setDisplayComponent(DISPLAY_COMPONENT.waitRoomComponent)
                      );
                      setProcessingServer(false); /* on arrete le chargement */
                      lastRound(data.gameId)
                        .unwrap()
                        .then((round) => dispatch(setRound(round)))
                        .catch(() => navigate("/error:api")); // error
                    })
                    .catch(() => navigate("/error:server")); // error
                })
                .catch(() => navigate("/error:api")); // error
            })
            .catch(() => navigate("/error:server")); // error
        }
      })
      .catch(() => navigate("/error:api")); // error
  }; /* traitement du formulaire */

  if (processingServer || isLoadingUser || gameLoading || roundIsLoading)
    return <OverlayLoader message={MESSAGE_LOADER.partyLoading} />;

  return (
    <div>
      <h1>Rejoindre une partie</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type={"number"} {...register("gameId")} />
        <input type={"text"} {...register("username")} />
        <button type="submit">Rejoindre la partie</button>
      </form>
    </div>
  );
};

export default Join;
