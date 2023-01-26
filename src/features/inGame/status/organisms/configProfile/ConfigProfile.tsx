import React, { useEffect, useState } from "react";
import { useGetAllConfigurationQuery } from "src/services";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";

import { useForm } from "react-hook-form";
import { initPlayerPoints } from "./service";
import { useSelector } from "react-redux";
import { RootState } from "src/app/store";
import userApi, {
  useGetUserByIdQuery,
  useGetUserConfigurationQuery,
  useUpdateUserByIdMutation,
} from "src/services/queries/user";
import { useNavigate } from "react-router-dom";

type ConfigProfileProps = {
  handleFinishRound?: (
    round: number,
    userConfiguration?: UserConfigurationForm,
    night?: Night
  ) => void;
};

const ConfigProfile = (props: ConfigProfileProps) => {
  const navigate = useNavigate();
  /* redux */
  const user = useSelector((state: RootState) => state.userSlice);
  const round = useSelector((state: RootState) => state.roundSlice);

  /* Queries */
  const {
    data: allConfiguration,
    isLoading,
    isError: allConfigurationIsError,
  } = useGetAllConfigurationQuery(); // API /configuration
  const {
    data: userConfiguration,
    isLoading: isLoadingUserConfiguration,
    isError: userConfigurationIsError,
  } = useGetUserConfigurationQuery(user.userId); // API /user/{id}/configuration
  const {
    data: userAPI,
    isLoading: userApiIsLoading,
    isError: userAPIIsError,
  } = useGetUserByIdQuery(user.userId);

  /* manage error */
  useEffect(() => {
    if (allConfigurationIsError || userConfigurationIsError || userAPIIsError)
      navigate("/error:api");
  }, [allConfigurationIsError, userAPIIsError, userConfigurationIsError]);

  /* Mutations */
  const [updateUser, { isLoading: userLoading }] = useUpdateUserByIdMutation(); // API user/{userId}

  /* Hook */
  const [playerSpentPoints, setPlayerSpentPoints] = useState<ChoiceOfUser[]>(
    []
  ); /* list of points spent of each category by the player */
  const [playerPoints, setPlayerPoints] = useState<number>(
    userAPI?.nbPoints!
  ); /* just to display point of player */
  /* React hook form */
  const { register, handleSubmit, setValue, reset } =
    useForm<UserConfigurationForm>();

  /* Rendering condition useEffect */
  useEffect(() => {
    reset({ configuration: userConfiguration }); // set default value when fetch of userConfiguration is success
    setPlayerPoints(userAPI?.nbPoints!);
    setPlayerSpentPoints(initPlayerPoints(userConfiguration!));
  }, [userConfiguration, userAPI]);

  const handleClick = (
    index: number,
    configurationId: number,
    nbPoint: number
  ) => {
    const data = [...playerSpentPoints];
    if (nbPoint > data[index].point) {
      setPlayerPoints(playerPoints - (nbPoint - data[index].point));
      data[index].point = nbPoint;
      setPlayerSpentPoints(data);
    } else if (nbPoint < data[index].point) {
      setPlayerPoints(playerPoints + (data[index].point - nbPoint));
      data[index].point = nbPoint;
      setPlayerSpentPoints(data);
    }

    setValue(`configuration.${index}.configurationId`, configurationId);
  };

  const onSubmit = (data: UserConfigurationForm) => {
    /* Envoie les informations au back */
    props.handleFinishRound!(round.statusId, data); /* set Finished round */
    updateUser({ userId: user.userId, nbPoints: playerPoints })
      .unwrap()
      .catch(() => navigate("/error:api")); // send to API user
  };

  if (
    isLoading ||
    isLoadingUserConfiguration ||
    userLoading ||
    userApiIsLoading
  )
    return <OverlayLoader />;

  return (
    <div>
      <p>Vos points : {playerPoints}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.values(allConfiguration!).map((elm: Configuration, index) => (
          <div key={elm.configurationId}>
            <label htmlFor={elm.value1}>{elm.value1}</label>
            <input
              id={elm.value1}
              value={"value1"}
              disabled={playerPoints < 0 && true}
              type="radio"
              onClick={() => handleClick(index, elm.configurationId, 0)}
              {...register(`configuration.${index}.value`)}
            />
            <label htmlFor={elm.value2}>{elm.value2}</label>
            <input
              id={elm.value2}
              value={"value2"}
              disabled={playerPoints - 1 < 0 && true}
              type="radio"
              onClick={() => handleClick(index, elm.configurationId, 1)}
              {...register(`configuration.${index}.value`)}
            />
            <label htmlFor={elm.value3}>{elm.value3}</label>
            <input
              id={elm.value3}
              value={"value3"}
              disabled={playerPoints - 2 < 0 && true}
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
                  disabled={playerPoints - 3 < 0 && true}
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
