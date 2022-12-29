import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/main/HomePage";
import GameJoinPage from "../pages/main/GameJoinPage";
import GameHostPage from "../pages/main/GameHostPage";
import { ROUTES } from "../../constants";

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path={ROUTES.game.joinGame} element={<GameJoinPage />} />
      <Route path={ROUTES.game.hostGame + "/:gameId"} element={<GameHostPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default RoutesApp;
