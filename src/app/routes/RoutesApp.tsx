import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import EndGamePage from "../pages/EndGamePage";
import { useLocation, useNavigate } from "react-router-dom";

const RoutesApp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      location.pathname !== "/" &&
      location.pathname !== "/end-game" &&
      location.pathname !== "/error:api" &&
      location.pathname !== "/error:server"
    ) {
      navigate("/");
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/*" element={<HomePage />} />
      <Route path="/end-game" element={<EndGamePage />} />
      <Route path="/error:type" element={<ErrorPage />} /> {/* Error page */}
    </Routes>
  );
};

export default RoutesApp;
