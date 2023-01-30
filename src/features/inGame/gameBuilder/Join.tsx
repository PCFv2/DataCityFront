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
import styled from "@emotion/styled";
import background from "src/assets/img/beforeGame/background.webp";
import { SecondaryButton } from "../../../UI-KIT/components/Button";

const JoinStyle = styled.main`
  background: url(${background}) no-repeat center center fixed;
  background-size: cover;
  padding: 0 10%;
  height: 100%;
`;

const MainTitle = styled.h1`
  color: ${(props) => props.theme.colors.primary.white};
  font-family: ${(props) => props.theme.font.family.title};
  font-size: ${(props) => props.theme.font.size.page_title};
  margin: 0;
  padding: 30px 0;
`;

const MainWindow = styled.div`
    margin-top: 10%;
    align-items: center;
    justify-content: space-between;
    background-color: ${(props) => `${props.theme.colors.primary.blue}E6`};
    color: ${(props) => props.theme.colors.primary.white};
    display: flex;
    flex-direction: column;
    border-radius: ${(props) => props.theme.radius.medium};
    padding: 30px;
`;

const MainWindowTitle = styled.h1`
  text-align: center;
`;

const InputLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3rem;
`;

const SingleInput = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  background-color: ${(props) => props.theme.colors.primary.grey};
  border-radius: ${(props) => props.theme.radius.small};
  border: solid 2px ${(props) => props.theme.colors.primary.lightBlue};
  padding: 0.3rem 0.7rem;
`;

const Content = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3em;
  & button {
    margin: 30px 0;
  }
`;

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
    <JoinStyle>
      <MainTitle>Data City</MainTitle>
      <MainWindow>
        <MainWindowTitle>Rejoindre une partie</MainWindowTitle>
        <Content onSubmit={handleSubmit(onSubmit)}>
          <InputLine>
            <SingleInput>
              <label>Numéro de partie</label>
              <Input type={"number"} {...register("gameId")} />
            </SingleInput>
            <SingleInput>
              <label>Nom</label>
              <Input type={"text"} {...register("username")} />
            </SingleInput>
          </InputLine>
          <SecondaryButton
            type="submit"
            content={"Rejoindre la partie"}
          ></SecondaryButton>
        </Content>
      </MainWindow>
    </JoinStyle>
  );
};

export default Join;
