import styled from "@emotion/styled";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/app/store";
import { useGetUserOpponentQuery } from "src/services/queries/user";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { ReactComponent as Face } from "src/assets/img/face.svg";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";

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
    font-size: 50px
  }
`;

const EndGamePage = () => {
  /* redux */
  const user = useSelector((state: RootState) => state.userSlice);

  const { data: oppenent, isLoading } = useGetUserOpponentQuery(
    "qvd3xOWHWv1MR9kxg0lWSQ=="
  );
  console.log(oppenent);

  if (isLoading) return <OverlayLoader />;
  if (!oppenent) return <div>pas de data</div>;
  return (
    <Container>
      <h2>Fin de partie</h2>
      <span className="material-icons">waving_hand</span>
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
    </Container>
  );
};

export default EndGamePage;
