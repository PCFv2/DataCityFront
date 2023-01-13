import React, { useEffect, useState } from "react";
import { useGetAllConfigurationQuery } from "../../../../services";
import OverlayLoader from "../../../../UI-KIT/components/OverlayLoader";

import { useForm } from "react-hook-form";
import { getSumOfPoints } from "../service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { setNbPoints } from "../../../../app/redux/userSlice";

// TODO performance du composant !

const ConfigProfil = () => {
  /* Queries */
  const { data: allConfiguration, isLoading } = useGetAllConfigurationQuery();

  /* redux */
  const dispatch = useDispatch();
  const user = useSelector(
    (state: RootState) => state.userSlice
  ); /* get user info */

  /* Hook */
  const playerPoints: number = 9; /* TODO here get current points of user in the redux store */
  const [displayPlayerPoints, setDisplayPlayerPoints] =
    useState<number>(playerPoints); /* just to display point of player */
  const [playerSpentPoints, setPlayerSpentPoints] = useState<ChoiceOfUser[]>(
    []
  ); /* list of points spent of each category by the player */

  /* React hook form */
  const { register, handleSubmit, setValue } = useForm<UserConfigurationForm>({
    defaultValues: {
      configuration: [
        { name: "Mail" },
        { name: "Sécurité téléphone" },
        { name: "Application de discussion" },
        { name: "Navigateur" },
        { name: "Stockage de photo" },
        { name: "Cookies" },
        { name: "Moteur de recherche" },
        { name: "OS" },
      ],
    },
  });

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
    name: string,
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
    setValue(`configuration.${index}.name`, name);
  };

  const generateInput = (
    value: string,
    index: number,
    name: string,
    nbPoint: number
  ) => {
    return (
      <React.Fragment key={name + value}>
        <label htmlFor={value}>{value}</label>
        <input
          id={value}
          value={value}
          disabled={displayPlayerPoints - nbPoint < 0 && true}
          type="radio"
          onClick={(e) => handleClick(e, index, name, nbPoint)}
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
          <div key={index}>
            {Object.values(elm)
              .slice(1, 5)
              .map((value, nbPoint) => (
                <React.Fragment key={`${value} + ${nbPoint}`}>
                  {value &&
                    generateInput(value.toString(), index, elm.name, nbPoint)}
                </React.Fragment>
              ))}
          </div>
        ))}
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default ConfigProfil;
