import styled from "@emotion/styled";
import React, { Suspense, useEffect, useRef, useState } from "react";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/app/store";
import { useGetEndGameQuery } from "src/services";
import {
  useGetUserByIdQuery,
  useGetUserOpponentQuery,
} from "src/services/queries/user";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";

import { ReactComponent as Face } from "src/assets/img/face.svg";
import InternetNavigation from "./organism/InternetNavigation";
import OnlineBuy from "./organism/OnlineBuy";
import PublicNetwork from "./organism/PublicNetwork";
import Usb from "./organism/Usb";
import SoftwareInstall from "./organism/SoftwareInstall";
import VirtuelCommunication from "./organism/VirtuelCommunication";
import MailConsultation2 from "./organism/MailConsultation2";
import MailTransmission from "./organism/MailTransmission";
import { PrimaryButton } from "src/UI-KIT/components/Button";
import { useNavigate } from "react-router-dom";
import MailConsultation from "./organism/MailConsultation";
import { setDisplayComponent } from "src/app/redux/displayComponentSlice";
import { DISPLAY_COMPONENT } from "src/constants";

const OppenentStatus = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5em;
  border-top: 2px solid ${(props) => props.theme.colors.primary.blue};
  border-bottom: 2px solid ${(props) => props.theme.colors.primary.blue};
  padding: 30px 0;
`;
const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Profil = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  background-color: ${(props) => props.theme.colors.primary.white};
  border-radius: ${(props) => props.theme.radius.big};
  & button {
    margin: 30px 0;
  }
`;

const Opponent = styled.div`
  display: flex;
  gap: 30px;
`;

const Win = styled.p`
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary.blue};
  font-size: 1.1rem;
`;

const Icon = styled.span`
  font-size: 50px;
`;

const Title = styled.span<{ isSelected: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  & > span {
    transition: 0.4s;
    transform: ${(props) =>
      props.isSelected ? "rotate(0deg)" : "rotate(-90deg)"};
    font-size: 50px;
  }
  & h2 {
    margin: 0;
  }
`;

const DISPLAY_CONSTANT = {
  mailConsultation: "consultationDeMail",
  mailConsultation2: "consultationDeMail2",
  internetNavigation: "internetNavigation",
  buyOnline: "buyOnline",
  networkPublic: "networkPublic",
  usb: "usb",
  softwareInstall: "softwareInstall",
  virtuelCommication: "virtuelCommication",
  mailTransmission: "mailTransmission",
};

const EndGame = () => {
  const dispatch = useDispatch();
  /* redux */
  const game: Game = useSelector((state: RootState) => state.gameSlice);
  const user: User = useSelector((state: RootState) => state.userSlice);

  const navigate = useNavigate();

  const [display, setDisplay] = useState<string>();

  const {
    data: userApi,
    isLoading: userApiIsLoading,
    isError: userApiIsError,
  } = useGetUserByIdQuery(user.userId);

  const {
    data: oppenent,
    isLoading,
    isError: oponnentIsError,
  } = useGetUserOpponentQuery(user.userId);

  const {
    data: endGameUser,
    isLoading: endGameIsLoading,
    isError: endGameUserIsError,
  } = useGetEndGameQuery({
    gameId: game.gameId,
    userId: user.userId,
  });

  useEffect(() => {
    if (oponnentIsError || userApiIsError) {
      navigate("/error:api");
    }
  }, [oponnentIsError, endGameUserIsError, userApiIsError]);

  const handleClick = (value: string) => {
    if (display === value) {
      setDisplay(undefined);
    } else {
      setDisplay(value);
    }
  };

  if (isLoading || endGameIsLoading || userApiIsLoading)
    return <OverlayLoader />;
  if (!oppenent) return <div>pas de data</div>;
  return (
    <Suspense fallback={<OverlayLoader />}>
      <Container>
        <h2>Fin de partie</h2>
        <Icon className="material-icons">waving_hand</Icon>

        {!userApi?.isAlive ? (
          <p>{endGameUser} vous a tué</p>
        ) : (
          <Win>Bienjoué ! Vous avez gagné la partie</Win>
        )}

        <OppenentStatus>
          {Object.entries(oppenent!).length ? (
            Object.entries(oppenent!).map((elm) => (
              <Opponent key={elm[0]}>
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
              </Opponent>
            ))
          ) : (
            <div>Pas d'information</div>
          )}
        </OppenentStatus>
        <Title isSelected={display === DISPLAY_CONSTANT.mailConsultation}>
          <span className="material-icons">arrow_drop_down</span>
          <h2 onClick={() => handleClick(DISPLAY_CONSTANT.mailConsultation)}>
            Consultation de mail
          </h2>
        </Title>
        {display === DISPLAY_CONSTANT.mailConsultation && <MailConsultation />}
        <Title isSelected={display === DISPLAY_CONSTANT.internetNavigation}>
          <span className="material-icons">arrow_drop_down</span>
          <h2 onClick={() => handleClick(DISPLAY_CONSTANT.internetNavigation)}>
            Navigation sur internet
          </h2>
        </Title>
        {display === DISPLAY_CONSTANT.internetNavigation && (
          <InternetNavigation />
        )}
        <Title isSelected={display === DISPLAY_CONSTANT.buyOnline}>
          <span className="material-icons">arrow_drop_down</span>
          <h2 onClick={() => handleClick(DISPLAY_CONSTANT.buyOnline)}>
            Achat en ligne
          </h2>
        </Title>
        {display === DISPLAY_CONSTANT.buyOnline && <OnlineBuy />}
        <Title isSelected={display === DISPLAY_CONSTANT.networkPublic}>
          <span className="material-icons">arrow_drop_down</span>
          <h2 onClick={() => handleClick(DISPLAY_CONSTANT.networkPublic)}>
            Réseau wifi public
          </h2>
        </Title>
        {display === DISPLAY_CONSTANT.networkPublic && <PublicNetwork />}
        <Title isSelected={display === DISPLAY_CONSTANT.usb}>
          <span className="material-icons">arrow_drop_down</span>
          <h2 onClick={() => handleClick(DISPLAY_CONSTANT.usb)}>Clé USB</h2>
        </Title>
        {display === DISPLAY_CONSTANT.usb && <Usb />}
        <Title isSelected={display === DISPLAY_CONSTANT.softwareInstall}>
          <span className="material-icons">arrow_drop_down</span>
          <h2 onClick={() => handleClick(DISPLAY_CONSTANT.softwareInstall)}>
            Installation logiciel
          </h2>
        </Title>
        {display === DISPLAY_CONSTANT.softwareInstall && <SoftwareInstall />}
        <Title isSelected={display === DISPLAY_CONSTANT.virtuelCommication}>
          <span className="material-icons">arrow_drop_down</span>
          <h2 onClick={() => handleClick(DISPLAY_CONSTANT.virtuelCommication)}>
            Communication virtuel
          </h2>
        </Title>
        {display === DISPLAY_CONSTANT.virtuelCommication && (
          <VirtuelCommunication />
        )}
        <Title isSelected={display === DISPLAY_CONSTANT.mailConsultation2}>
          <span className="material-icons">arrow_drop_down</span>
          <h2 onClick={() => handleClick(DISPLAY_CONSTANT.mailConsultation2)}>
            Consultation de mail 2
          </h2>
        </Title>
        {display === DISPLAY_CONSTANT.mailConsultation2 && (
          <MailConsultation2 />
        )}
        <Title isSelected={display === DISPLAY_CONSTANT.mailTransmission}>
          <span className="material-icons">arrow_drop_down</span>
          <h2 onClick={() => handleClick(DISPLAY_CONSTANT.mailTransmission)}>
            Transmission de mail
          </h2>
        </Title>
        {display === DISPLAY_CONSTANT.mailTransmission && <MailTransmission />}
        <PrimaryButton
          onClick={() => {
            dispatch(setDisplayComponent(DISPLAY_COMPONENT.home));
            window.scrollTo(0, 0);
          }}
          content={"Revenir à l'accueil"}
        />
      </Container>
    </Suspense>
  );
};

export default EndGame;
