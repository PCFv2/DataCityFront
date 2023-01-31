import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import { useLocation, useNavigate } from "react-router-dom";
import LegalMention from "src/features/legalMention/legalMention";
import TermUse from "src/features/termUse/termUse";

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/*" element={<HomePage />} />
      <Route path="/error:type" element={<ErrorPage />} /> {/* Error page */}
      <Route path="/mentions-legales" element={<LegalMention />} />
      <Route path="/cgu" element={<TermUse />} />
    </Routes>
  );
};

export default RoutesApp;
