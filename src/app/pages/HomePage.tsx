import React from "react";

import Home from "src/features/home/Home";

const HomePage = () => {
  return <Home serverUrl={process.env.REACT_APP_SERVER_URL_PROD!} />;
};

export default HomePage;
