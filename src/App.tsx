import React from "react";
import { useGetGamesQuery } from "./services/queries/game";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoutesApp from "./app/routes/RoutesApp";

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <RoutesApp />
    </BrowserRouter>
  );
};

export default App;
