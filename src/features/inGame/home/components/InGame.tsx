import React, { useState } from "react";
import ConfigProfil from "../../configProfil/components/ConfigProfil";
import Morning from "../../morning/components/Morning";

const InGame = () => {
  const [displayComponent, setDisplayComponent] = useState<string>("Morning");
  return (
    <>
      {displayComponent === "Morning" && (
        <Morning setDisplayComponent={setDisplayComponent} />
      )}
      {displayComponent === "ConfigProfil" && (
        <ConfigProfil setDisplayComponent={setDisplayComponent} />
      )}
    </>
  );
};

export default InGame;
