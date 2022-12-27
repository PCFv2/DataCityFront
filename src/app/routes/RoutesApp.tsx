import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import GameJoinPage from "../pages/GameJoinPage";
import GameHostPage from "../pages/GameHostPage";
import { routes } from "../../constants";

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path={routes.game.joinGame} element={<GameJoinPage />} />
      <Route path={routes.game.hostGame + "/:gameId"} element={<GameHostPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default RoutesApp;
