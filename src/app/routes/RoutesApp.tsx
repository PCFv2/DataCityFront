import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/main/HomePage";
import { ROUTES } from "../../constants";

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/*" element={<HomePage />} />
    </Routes>
  );
};

export default RoutesApp;
