import React, { useEffect } from "react";
import GameHost from "../../features/game/GameHost";

const GameHostPage = () => {
  useEffect(() => {
    console.log("test2");
    return () => {
      console.log("test");
    };
  }, []);
  return (
    <div>
      <GameHost />
    </div>
  );
};

export default GameHostPage;
