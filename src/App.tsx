import React from "react";

import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./app/routes/RoutesApp";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import 'src/assets/styles/font.css';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <RoutesApp />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
