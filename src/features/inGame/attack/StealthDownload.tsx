import React from "react";
import Maze from "./maze/Maze";

const StealthDownload = (props: AttackProps) => {
  return <Maze handleFinishRound={props.handleFinishRound} />;
};

export default StealthDownload;
