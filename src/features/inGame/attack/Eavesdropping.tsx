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
  handleFinishRoud?: (
      round: number,
      userConfiguration?: UserConfigurationForm,
      night?: Night
  ) => void;
};

const EavesDropping = (props: AttackProps) => {
  const NUMBER_FILES = 6;
  /* hook */
  const [isWon, setIsWon] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [files, setFiles] = useState<FileType[]>(
    useMemo(() => generateFiles(NUMBER_FILES), [])
  );

  useEffect(() => {
    if (!verifyWin(files)) setIsWon(true);
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

  return (
    <div>
      {error && <p>Erreur</p>}
      {isWon && <p>gagné</p>}
      {files.map((elm, index) => (
        <Container
          key={index}
          onClick={() => handleClick(elm)}
          coordinatesTop={Math.random() * 80}
          coordinatesLeft={Math.random() * 80}
        >
          {elm.id}
        </Container>
      ))}
      <h2>Jeu: écoute clandestine</h2>
    </div>
  );
};

export default EavesDropping;
