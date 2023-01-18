import React, { useEffect, useState } from "react";
import { useGetAllConfigurationQuery } from "../../../../../services";
import OverlayLoader from "../../../../../UI-KIT/components/OverlayLoader";

import { useForm } from "react-hook-form";
import { getSumOfPoints } from "./service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../app/store";
import { setNbPoints } from "../../../../../app/redux/userSlice";
import userApi, {
  useGetUserConfigurationQuery,
} from "src/services/queries/user";

// TODO performance du composant !

const ConfigProfile = () => {
  /* redux */
  const dispatch = useDispatch();
  const user = useSelector(
    (state: RootState) => state.userSlice
  ); /* get user info */

  /* Hook */
  const playerPoints: number = useSelector(
    (state: RootState) => state.gameSlice.startNbPoints
  );
  const [displayPlayerPoints, setDisplayPlayerPoints] =
    useState<number>(playerPoints); /* just to display point of player */
  const [playerSpentPoints, setPlayerSpentPoints] = useState<ChoiceOfUser[]>(
    []
  ); /* list of points spent of each category by the player */

  /* Queries */
  const { data: allConfiguration, isLoading } = useGetAllConfigurationQuery();

  const { data: userConfiguration, isLoading: isLoadingUserConfiguration } =
    useGetUserConfigurationQuery(user.userId);

  /* React hook form */
  const { register, handleSubmit, setValue, reset } =
    useForm<UserConfigurationForm>({});

  useEffect(() => {
    reset({ configuration: userConfiguration });
  }, [userConfiguration]);

  const onSubmit = (data: UserConfigurationForm) => {
    console.log({ ...data });
    dispatch(setNbPoints(displayPlayerPoints)); /* set nbPoints of user */
    /* Envoie les informations au back */
  };

  useEffect(() => {
    setDisplayPlayerPoints(
      playerPoints - getSumOfPoints(playerSpentPoints)
    ); /* Manage display of point */
  }, [playerSpentPoints]);

  const handleClick = (
    index: number,
    configurationId: number,
    nbPoint: number
  ) => {
    const data = [...playerSpentPoints];
    if (data.find((elm) => elm.index === index)) {
      const findOne = data.findIndex((elm) => elm.index === index);
      data[findOne].point = nbPoint;
      setPlayerSpentPoints(data);
    } else {
      setPlayerSpentPoints((oldPoints) => [
        ...oldPoints,
        { index: index, point: nbPoint },
      ]);
    }
    setValue(`configuration.${index}.configurationId`, configurationId);
  };

  if (isLoading || isLoadingUserConfiguration) return <OverlayLoader />;

  return (
    <div>
      <p>Vos points : {displayPlayerPoints}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.values(allConfiguration!).map((elm: Configuration, index) => (
          <div key={elm.configurationId}>
            <label htmlFor={elm.value1}>{elm.value1}</label>
            <input
              id={elm.value1}
              value={"value1"}
              disabled={displayPlayerPoints < 0 && true}
              type="radio"
              onClick={() => handleClick(index, elm.configurationId, 0)}
              {...register(`configuration.${index}.value`)}
            />
            <label htmlFor={elm.value2}>{elm.value2}</label>
            <input
              id={elm.value2}
              value={"value2"}
              disabled={displayPlayerPoints - 1 < 0 && true}
              type="radio"
              onClick={() => handleClick(index, elm.configurationId, 1)}
              {...register(`configuration.${index}.value`)}
            />
            <label htmlFor={elm.value3}>{elm.value3}</label>
            <input
              id={elm.name}
              value={"value3"}
              disabled={displayPlayerPoints - 2 < 0 && true}
              type="radio"
              onClick={() => handleClick(index, elm.configurationId, 2)}
              {...register(`configuration.${index}.value`)}
            />
            <label htmlFor={elm.value3}>{elm.value3}</label>
            <input
              id={elm.name}
              value={"value4"}
              disabled={displayPlayerPoints - 3 < 0 && true}
              type="radio"
              onClick={() => handleClick(index, elm.configurationId, 3)}
              {...register(`configuration.${index}.value`)}
            />
          </div>
        ))}
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default ConfigProfile;
