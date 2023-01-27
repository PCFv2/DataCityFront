import styled from "@emotion/styled";
import React, { Suspense, useEffect, useRef, useState } from "react";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";
import { RootState } from "src/app/store";
import { useGetEndGameQuery } from "src/services";
import { useGetUserOpponentQuery } from "src/services/queries/user";
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

const OppenentStatus = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5em;
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
  & > span {
    font-size: 50px;
  }
`;

const Opponent = styled.div`
  display: flex;
  gap: 30px;
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
  const navigate = useNavigate();

  /* redux */
  const user = useSelector((state: RootState) => state.userSlice);
  const game = useSelector((state: RootState) => state.userSlice);

  const [display, setDisplay] = useState<string>();

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
    if (oponnentIsError || endGameUserIsError) navigate("/error:api");
  }, [oponnentIsError, endGameUserIsError]);

  const handleClick = (value: string) => {
    if (display === value) {
      setDisplay(undefined);
    } else {
      setDisplay(value);
    }
  };

  if (isLoading || endGameIsLoading) return <OverlayLoader />;
  if (!oppenent) return <div>pas de data</div>;
  return (
    <Suspense fallback={<OverlayLoader />}>
      <Container>
        <h2>Fin de partie</h2>
        <span className="material-icons">waving_hand</span>
        <p>{endGameUser} vous a tué</p>
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
        <h2 onClick={() => handleClick(DISPLAY_CONSTANT.mailConsultation)}>
          Consultation de mail
        </h2>
        {display === DISPLAY_CONSTANT.mailConsultation && <MailConsultation />}
        <h2 onClick={() => handleClick(DISPLAY_CONSTANT.internetNavigation)}>
          Navigation sur internet
        </h2>
        {display === DISPLAY_CONSTANT.internetNavigation && (
          <InternetNavigation />
        )}
        <h2 onClick={() => handleClick(DISPLAY_CONSTANT.buyOnline)}>
          Achat en ligne
        </h2>
        {display === DISPLAY_CONSTANT.buyOnline && <OnlineBuy />}
        <h2 onClick={() => handleClick(DISPLAY_CONSTANT.networkPublic)}>
          Réseau wifi public
        </h2>
        {display === DISPLAY_CONSTANT.networkPublic && <PublicNetwork />}
        <h2 onClick={() => handleClick(DISPLAY_CONSTANT.usb)}>Clé USB</h2>
        {display === DISPLAY_CONSTANT.usb && <Usb />}
        <h2 onClick={() => handleClick(DISPLAY_CONSTANT.softwareInstall)}>
          Installation logiciel
        </h2>
        {display === DISPLAY_CONSTANT.softwareInstall && <SoftwareInstall />}
        <h2 onClick={() => handleClick(DISPLAY_CONSTANT.virtuelCommication)}>
          Communication virtuel
        </h2>
        {display === DISPLAY_CONSTANT.virtuelCommication && (
          <VirtuelCommunication />
        )}
        <h2 onClick={() => handleClick(DISPLAY_CONSTANT.mailConsultation2)}>
          Consultation de mail 2
        </h2>
        {display === DISPLAY_CONSTANT.mailConsultation2 && (
          <MailConsultation2 />
        )}
        <h2
          onClick={() => handleClick(DISPLAY_CONSTANT.mailTransmission)}
        >
          Transmission de mail
        </h2>
        {display === DISPLAY_CONSTANT.mailTransmission && <MailTransmission />}
        <PrimaryButton
          onClick={() => navigate("/")}
          content={"Revenir à l'accueil"}
        />
      </Container>
    </Suspense>
  );
};

export default EndGame;
