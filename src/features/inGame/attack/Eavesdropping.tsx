import styled from "@emotion/styled";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/app/store";
import { generateFiles, verifyWin } from "./services/eavesDropping";

const Container = styled.span<{
  coordinatesTop: number;
  coordinatesLeft: number;
}>`
  position: absolute;
  background-color: red;
  top: ${(props) => `${props.coordinatesTop}%`};
  left: ${(props) => `${props.coordinatesLeft}%`};
  padding: 50px;
`;

type AttackProps = {
  handleFinishRound?: (
    round: number,
    userConfiguration?: UserConfigurationForm,
    night?: Night
  ) => void;
};

const EavesDropping = (props: AttackProps) => {
  const NUMBER_FILES = 6;
  /* hook */
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [files, setFiles] = useState<FileType[]>(
    useMemo(() => generateFiles(NUMBER_FILES), [])
  );

  /* redux */
  const round = useSelector((state: RootState) => state.roundSlice);

  useEffect(() => {
    if (!verifyWin(files)) setHasWon(true);
  }, [files]);

  const handleClick = (elm: FileType): void => {
    if (!elm.isWrong) {
      const oldFiles = [...files.filter((element) => element.id !== elm.id)];
      setFiles(oldFiles);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleFinish = (): void => {
    const resultAttack: Night = {
      night: {
        attackId: 3, //hameconnage
        effectiveness: hasWon ? 100 : 0,
      },
    };
    props.handleFinishRound!(round.statusId, undefined, resultAttack);
  };

  /* a gagné */
  if (hasWon)
    return (
      <div>
        <button onClick={handleFinish}>Enregistrer</button>Vous avez trouvé la
        bonne phrase bravo !
      </div>
    );

  return (
    <div>
      {files.map((elm, index) => (
        <Container
          key={index}
          onClick={() => handleClick(elm)}
          coordinatesTop={elm.cordinateX}
          coordinatesLeft={elm.cordinateY}
        >
          {elm.id}
        </Container>
      ))}
      <h2>Jeu: écoute clandestine</h2>
      <button onClick={handleFinish}>Enregistrer</button>
    </div>
  );
};

export default React.memo(EavesDropping);
