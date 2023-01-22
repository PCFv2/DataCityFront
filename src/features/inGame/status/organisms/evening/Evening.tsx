import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/app/store";
import { MESSAGE_LOADER } from "src/constants/messageLoader";
import userApi, { useGetUserOpponentQuery } from "src/services/queries/user";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";

import { ReactComponent as Face } from "src/assets/img/face.svg";

const Evening = () => {
  const user = useSelector((state: RootState) => state.userSlice);
  const { data: oppenent, isLoading } = useGetUserOpponentQuery(
    "qvd3xOWHWv1MR9kxg0lWSQ=="
  );

  const [getUsername, { isLoading: getNameOfUserIsLoading }] =
    userApi.endpoints.getUserById.useLazyQuery();

  if (isLoading || getNameOfUserIsLoading)
    return <OverlayLoader message={MESSAGE_LOADER.loading} />;
  return (
    <div>
      <h1>Résumer de l'avancée</h1>
      <div>
        {Object.entries(oppenent!).map((elm) => (
          <React.Fragment key={elm[0]}>
            <div>
              <Face />
              <span>{elm[0]}</span>
            </div>
            <h2>Physique</h2>
            <h2>Social</h2>
            <h2>Internet</h2>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Evening;
