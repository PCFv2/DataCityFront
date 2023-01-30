import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/app/store";
import { MESSAGE_LOADER } from "src/constants/messageLoader";
import userApi, { useGetUserOpponentQuery } from "src/services/queries/user";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";

import { ReactComponent as Face } from "src/assets/img/face.svg";
import background from "src/assets/img/inGame/backgrounds/night.webp";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "@emotion/styled";
import { PrimaryButton } from "src/UI-KIT/components/Button";
import { useNavigate } from "react-router-dom";
import { requestFinishGame } from "src/app/requestServer";
import { SOCKET_CODE } from "src/constants";
import { botSetFinished } from "src/features/bot/bot";

const Container = styled.div`
  background: url(${background}) no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  background-color: ${(props) => `${props.theme.colors.primary.white}CC`};
  border-radius: ${(props) => props.theme.radius.big};
  padding: 20px 50px;
`;

const Profil = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  text-align: center;
`;

const OppenentStatus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5em;
`;
const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Opponent = styled.div`
  display: flex;
  gap: 30px;
`;

const Evening = (
  props: AttackProps & { setHasFinishedGame: Dispatch<SetStateAction<boolean>> }
) => {
  /* redux */
  const round = useSelector((state: RootState) => state.roundSlice);
  const user = useSelector((state: RootState) => state.userSlice);
  const game = useSelector((state: RootState) => state.gameSlice);
  const bot = useSelector((state: RootState) => state.botSlice);
  const webSocketState = useSelector(
    (state: RootState) => state.webSocket
  ); /* on récupére la webSocket */

  const navigate = useNavigate();

  const {
    data: oppenent,
    isLoading,
    isError: oppenentIsError,
  } = useGetUserOpponentQuery(user.userId);

  const [getUser, { isLoading: getNameOfUserIsLoading }] =
    userApi.endpoints.getUserById.useLazyQuery();

  /* dead */
  useEffect(() => {
    getUser(user.userId)
      .unwrap()
      .then((data) => {
        if (!data?.isAlive) {
          requestFinishGame(webSocketState.webSocket!, game.gameId);
          props.setHasFinishedGame(true);
        }
      })
      .catch(() => navigate("/error:api"));
  }, []);

  /* manage error */
  useEffect(() => {
    if (oppenentIsError) navigate("/error:api");
  }, [oppenentIsError]);

  const handleFinish = async (): Promise<void> => {
    props.handleFinishRound!(round.statusId);

    /* BOT */
    if (bot.botIsActive) {
      botSetFinished(game.gameId, webSocketState.webSocket!);
    }
  };

  if (isLoading || getNameOfUserIsLoading)
    return <OverlayLoader message={MESSAGE_LOADER.loading} />;
  return (
    <Container>
      <Content>
        <Title>Résumer de l'avancée</Title>
        <OppenentStatus>
          {Object.entries(oppenent!).length ? (
            Object.entries(oppenent!).map((elm) => (
              <Opponent key={elm[0]}>
                <Profil>
                  <Face />
                  <span>{elm[0]}</span>
                </Profil>
                <Status>
                  <h2>Social</h2>
                  <div style={{ width: 109, height: 109 }}>
                    <CircularProgressbar
                      value={Object.values(elm[1][0])[0]}
                      text={`${Object.values(elm[1][0])[0].toString()}%`}
                    />
                  </div>
                </Status>
                <Status>
                  <h2>Internet</h2>
                  <div style={{ width: 109, height: 109 }}>
                    <CircularProgressbar
                      value={Object.values(elm[1][1])[0]}
                      text={`${Object.values(elm[1][1])[0].toString()}%`}
                    />
                  </div>
                </Status>
                <Status>
                  <h2>Physique</h2>
                  <div style={{ width: 109, height: 109 }}>
                    <CircularProgressbar
                      value={Object.values(elm[1][2])[0]}
                      text={`${Object.values(elm[1][2])[0].toString()}%`}
                    />
                  </div>
                </Status>
              </Opponent>
            ))
          ) : (
            <div>Pas d'information</div>
          )}
        </OppenentStatus>
      </Content>
      <PrimaryButton content="Continuer" onClick={handleFinish} />
    </Container>
  );
};

export default Evening;
