import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/app/store";
import { MESSAGE_LOADER } from "src/constants/messageLoader";
import userApi, { useGetUserOpponentQuery } from "src/services/queries/user";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";

import { ReactComponent as Face } from "src/assets/img/face.svg";
import background from "src/assets/img/phishing/background.jpg";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "@emotion/styled";
import { PrimaryButton } from "src/UI-KIT/components/Button";
import { useNavigate } from "react-router-dom";

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

const Opponent = styled.div`
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

const Evening = (props: AttackProps) => {
  /* redux */
  const round = useSelector((state: RootState) => state.roundSlice);
  const user = useSelector((state: RootState) => state.userSlice);
  const webSocketState = useSelector((state: RootState) => state.webSocket);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { data: oppenent, isLoading } = useGetUserOpponentQuery(user.userId);

  const [getUser, { isLoading: getNameOfUserIsLoading }] =
    userApi.endpoints.getUserById.useLazyQuery();

  const handleFinish = async (): Promise<void> => {
    const { data } = await getUser(user.userId);
    /* si le joueur est mort */
    if (!data?.isAlive) {
      webSocketState.webSocket?.close();
      navigate("/end-game"); /* on envoie sur la page fin du jeu */
    }
    props.handleFinishRound!(round.statusId);
  };

  if (isLoading || getNameOfUserIsLoading)
    return <OverlayLoader message={MESSAGE_LOADER.loading} />;
  return (
    <Container>
      <Opponent>
        <Title>Résumer de l'avancée</Title>
        <OppenentStatus>
          {Object.entries(oppenent!).length ? (
            Object.entries(oppenent!).map((elm) => (
              <React.Fragment key={elm[0]}>
                <Profil>
                  <Face />
                  <span>{elm[0]}</span>
                </Profil>
                <Status>
                  <h2>Physique</h2>
                  <div style={{ width: 109, height: 109 }}>
                    <CircularProgressbar
                      value={Object.values(elm[1][0])[0]}
                      text={`${Object.values(elm[1][0])[0].toString()}%`}
                    />
                  </div>
                </Status>
                <Status>
                  <h2>Social</h2>
                  <div style={{ width: 109, height: 109 }}>
                    <CircularProgressbar
                      value={Object.values(elm[1][1])[0]}
                      text={`${Object.values(elm[1][1])[0].toString()}%`}
                    />
                  </div>
                </Status>
                <Status>
                  <h2>Internet</h2>
                  <div style={{ width: 109, height: 109 }}>
                    <CircularProgressbar
                      value={Object.values(elm[1][2])[0]}
                      text={`${Object.values(elm[1][2])[0].toString()}%`}
                    />
                  </div>
                </Status>
              </React.Fragment>
            ))
          ) : (
            <div>Pas d'information</div>
          )}
        </OppenentStatus>
      </Opponent>
      <PrimaryButton content="Continuer" onClick={handleFinish} />
    </Container>
  );
};

export default Evening;
