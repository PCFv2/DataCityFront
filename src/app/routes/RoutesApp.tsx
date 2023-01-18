import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/main/HomePage";
import ErrorPage from "../pages/main/ErrorPage";

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/*" element={<HomePage />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
};

export default RoutesApp;
