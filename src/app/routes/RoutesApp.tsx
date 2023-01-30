import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import { useLocation, useNavigate } from "react-router-dom";

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/*" element={<HomePage />} />
      <Route path="/error:type" element={<ErrorPage />} /> {/* Error page */}
    </Routes>
  );
};

export default RoutesApp;
