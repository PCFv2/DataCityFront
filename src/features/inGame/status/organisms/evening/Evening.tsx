import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/app/store";
import { useGetUserOpponentQuery } from "src/services/queries/user";

const Evening = () => {
  const user = useSelector((state: RootState) => state.userSlice);
  return (
    <div>
      <h1>Résumer de l'avancée</h1>
    </div>
  );
};

export default Evening;
