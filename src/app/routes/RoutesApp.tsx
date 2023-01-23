import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/main/HomePage";
import ErrorPage from "../pages/main/ErrorPage";
import EndGamePage from "../pages/main/EndGamePage";

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/*" element={<HomePage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/end-game" element={<EndGamePage />} />
    </Routes>
  );
};

export default RoutesApp;
