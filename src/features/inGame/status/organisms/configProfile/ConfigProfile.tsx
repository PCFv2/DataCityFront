import React, { useEffect, useState } from "react";
import { useGetAllConfigurationQuery } from "src/services";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";

import { useForm } from "react-hook-form";
import { getSumOfPoints } from "./service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/app/store";
import { setNbPoints } from "src/app/redux/userSlice";
import userApi, {
  useGetUserConfigurationQuery,
  usePutUserConfigurationMutation,
  useUpdateUserByIdMutation,
} from "src/services/queries/user";

type ConfigProfileProps = {
  handleClick?: (
    round: number,
    userConfiguration: UserConfigurationForm
  ) => void;
};

const ConfigProfile = (props: ConfigProfileProps) => {
  /* redux */
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userSlice);
  const round = useSelector((state: RootState) => state.roundSlice);

  const playerPoints: number = useSelector(
    (state: RootState) => state.gameSlice.startNbPoints
  );

  /* Hook */
  const [displayPlayerPoints, setDisplayPlayerPoints] =
    useState<number>(playerPoints); /* just to display point of player */
  const [playerSpentPoints, setPlayerSpentPoints] = useState<ChoiceOfUser[]>(
    []
  ); /* list of points spent of each category by the player */

  /* Queries */
  const { data: allConfiguration, isLoading } = useGetAllConfigurationQuery(); // API /configuration
  const { data: userConfiguration, isLoading: isLoadingUserConfiguration } =
    useGetUserConfigurationQuery(user.userId); // API /user/{id}/configuration

  /* Mutations */
  const [updateUserConfiguration, { isLoading: userConfigurationIsLoading }] =
    usePutUserConfigurationMutation(); // API user/{userId}/configuration
  const [updateUser, { isLoading: userLoading }] = useUpdateUserByIdMutation(); // API user/{userId}

  /* React hook form */
  const { register, handleSubmit, setValue, reset } =
    useForm<UserConfigurationForm>();

  /* Rendering condition useEffect */
  useEffect(() => {
    reset({ configuration: userConfiguration }); // set default value when fetch of userConfiguration is success
  }, [userConfiguration]);

  useEffect(() => {
    setDisplayPlayerPoints(
      playerPoints - getSumOfPoints(playerSpentPoints)
    ); /* Manage display of point */
  }, [playerSpentPoints]);

  const onSubmit = (data: UserConfigurationForm) => {
    /* Envoie les informations au back */

    props.handleClick!(round.statusId, data); /* set Finished round */

    // updateUserConfiguration({ userId: user.userId, ...data }); // send to API userConfiguration
    // updateUser({ userId: user.userId, nbPoints: displayPlayerPoints }); // send to API user
    dispatch(setNbPoints(displayPlayerPoints)); /* set nbPoints of user */
  };

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

  if (
    isLoading ||
    isLoadingUserConfiguration ||
    userConfigurationIsLoading ||
    userLoading
  )
    return <OverlayLoader />;

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
              id={elm.value3}
              value={"value3"}
              disabled={displayPlayerPoints - 2 < 0 && true}
              type="radio"
              onClick={() => handleClick(index, elm.configurationId, 2)}
              {...register(`configuration.${index}.value`)}
            />
            {elm.value4 && (
              <>
                <label htmlFor={elm.value4}>{elm.value4}</label>
                <input
                  id={elm.value4}
                  value={"value4"}
                  disabled={displayPlayerPoints - 3 < 0 && true}
                  type="radio"
                  onClick={() => handleClick(index, elm.configurationId, 3)}
                  {...register(`configuration.${index}.value`)}
                />
              </>
            )}
          </div>
        ))}
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default ConfigProfile;
