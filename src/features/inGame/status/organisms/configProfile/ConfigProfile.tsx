import React, { useEffect, useState } from "react";
import { useGetAllConfigurationQuery } from "../../../../../services";
import OverlayLoader from "../../../../../UI-KIT/components/OverlayLoader";

import { useForm } from "react-hook-form";
import { getSumOfPoints } from "./service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../app/store";
import { setNbPoints } from "../../../../../app/redux/userSlice";

// TODO performance du composant !

const ConfigProfile = () => {
  /* Queries */
  const { data: allConfiguration, isLoading } = useGetAllConfigurationQuery();

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

  /* React hook form */
  const { register, handleSubmit, setValue } = useForm<UserConfigurationForm>();

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
    e: any,
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

  const generateInput = (
    value: string,
    index: number,
    configurationId: number,
    nbPoint: number
  ) => {
    return (
      <React.Fragment key={configurationId + value}>
        <label htmlFor={value}>{value}</label>
        <input
          id={value}
          value={nbPoint}
          disabled={displayPlayerPoints - nbPoint < 0 && true}
          type="radio"
          onClick={(e) => handleClick(e, index, configurationId, nbPoint)}
          {...register(`configuration.${index}.value`)}
        />
      </React.Fragment>
    );
  };

  if (isLoading) return <OverlayLoader />;

  return (
    <div>
      <p>Vos points : {displayPlayerPoints}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.values(allConfiguration!).map((elm: Configuration, index) => (
          <div key={elm.configurationId}>
            {Object.values(elm)
              .slice(2, 6)
              .map((value, nbPoint) => (
                <React.Fragment key={`${value} + ${nbPoint}`}>
                  {value &&
                    generateInput(
                      value.toString(),
                      index,
                      elm.configurationId,
                      nbPoint
                    )}
                </React.Fragment>
              ))}
          </div>
        ))}
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default ConfigProfile;
