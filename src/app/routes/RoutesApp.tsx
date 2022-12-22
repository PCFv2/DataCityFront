import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Party from "../pages/Party";

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/party" element={<Party />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default RoutesApp;
