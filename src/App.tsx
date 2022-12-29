import React from "react";

import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./app/routes/RoutesApp";
import { store } from "./app/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <RoutesApp />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
