import { DISPLAY_COMPONENT } from "constants/";
import React, { useState } from "react";
import ConfigProfil from "../../configProfil/components/ConfigProfil";
import Morning from "../../morning/components/Morning";

const InGame = () => {
  const [displayComponent, setDisplayComponent] = useState<string>("Morning");
  return (
    <>
      {displayComponent === DISPLAY_COMPONENT.inGameMorning && (
        <Morning setDisplayComponent={setDisplayComponent} />
      )}
      {displayComponent === DISPLAY_COMPONENT.inGameConfigProfil && (
        <ConfigProfil setDisplayComponent={setDisplayComponent} />
      )}
    </>
  );
};

export default InGame;
