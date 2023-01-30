import React, { useEffect, useState } from "react";
import { useGetAllConfigurationQuery } from "src/services";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";

import styled from "@emotion/styled";
import background from "src/assets/img/inGame/backgrounds/night.webp";
import RenderIcon from "./molecules/RenderIcon";
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
import { botSetFinished } from "src/features/bot/bot";

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
  const game = useSelector((state: RootState) => state.gameSlice);
  const bot = useSelector((state: RootState) => state.botSlice);
  const webSocketState = useSelector((state: RootState) => state.webSocket);

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

    /* BOT */
    if (bot.botIsActive) {
      botSetFinished(game.gameId, webSocketState.webSocket!);
    }
  };

  if (
    isLoading ||
    isLoadingUserConfiguration ||
    userLoading ||
    userApiIsLoading
  )
    return <OverlayLoader />;

  const ConfigPage = styled.main`
    background: url(${background}) no-repeat center center fixed;
    background-size: cover;
    padding-bottom: 5rem;
  `;

  const Window = styled.div`
    margin: auto;
    border-radius: ${(props) => props.theme.radius.medium};
    background-color: ${(props) => props.theme.colors.primary.white};
    display: flex;
    flex-direction: column;
    width: 65%;
    box-shadow: ${(props) => props.theme.colors.primary.black} 0px 7px 29px 0px;
  `;

  const WindowTitle = styled.h1`
    color: ${(props) => props.theme.colors.primary.blue};
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 0;
  `;

  const Points = styled.p`
    text-align: center;
  `;

  const Table = styled.table`
    background-color: ${(props) => props.theme.colors.primary.blue};
    color: ${(props) => props.theme.colors.primary.white};
    border-radius: 0 0 ${(props) => props.theme.radius.medium}
      ${(props) => props.theme.radius.medium};
    border-collapse: collapse;
    text-align: center;
    vertical-align: center;
    width: 100%;
    overflow: scroll;
  `;

  const TableLine = styled.tr`
    border: #fff;
  `;

  const TableHeader = styled.th`
    border-bottom: ${(props) => props.theme.border.regular}
      ${(props) => props.theme.colors.primary.white};
    padding: 1rem;

    &:nth-child(1) {
      border-right: ${(props) => props.theme.border.regular}
        ${(props) => props.theme.colors.primary.white};
      border-bottom: none;
    }
  `;

  const TableHeadersLine = styled.tr``;

  const TableElement = styled.td<{ isDisabled?: boolean }>`
    padding: 0.5rem;

    & svg {
      width: 48px;
      height: 48px;
      padding: 4px;
      cursor: pointer;
      filter: grayscale(${(props) => (props.isDisabled ? "1" : "0")});
    }

    & input {
      display: none;

      &:checked + label {
        & svg {
          border-radius: 50%;
          border: solid 3px ${(props) => props.theme.colors.primary.white};
        }
      }
    }
  `;

  const TableElementName = styled.td`
    border-right: ${(props) => props.theme.border.regular}
      ${(props) => props.theme.colors.primary.white};
  `;

  const SaveButton = styled.button`
    background-color: unset;
    border: none;
    cursor: pointer;
    border-radius: 50%;

    & span {
      color: ${(props) => props.theme.colors.primary.lightBlue};
      font-size: 64px;
    }
  `;

  return (
    <ConfigPage>
      <Window>
        <WindowTitle>Configuration de votre profil de jeu</WindowTitle>
        <Points>
          Il vous reste <b>{playerPoints} points</b>
        </Points>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Table>
            <TableHeadersLine>
              <TableHeader></TableHeader>
              <TableHeader>0 points</TableHeader>
              <TableHeader>1 points</TableHeader>
              <TableHeader>2 points</TableHeader>
              <TableHeader>3 points</TableHeader>
            </TableHeadersLine>

            {Object.values(allConfiguration!).map(
              (elm: Configuration, index) => (
                <TableLine key={elm.configurationId}>
                  <TableElementName>{elm.name}</TableElementName>
                  <TableElement isDisabled={playerPoints < 0}>
                    <input
                      id={elm.value1}
                      value={"value1"}
                      disabled={playerPoints < 0 && true}
                      type="radio"
                      onClick={() => handleClick(index, elm.configurationId, 0)}
                      {...register(`configuration.${index}.value`)}
                    />
                    <label htmlFor={elm.value1} title={elm.value1}>
                      <RenderIcon name={elm.value1}></RenderIcon>
                    </label>
                  </TableElement>
                  <TableElement isDisabled={playerPoints - 1 < 0}>
                    <input
                      id={elm.value2}
                      value={"value2"}
                      disabled={playerPoints - 1 < 0 && true}
                      type="radio"
                      onClick={() => handleClick(index, elm.configurationId, 1)}
                      {...register(`configuration.${index}.value`)}
                    />
                    <label htmlFor={elm.value2} title={elm.value2}>
                      <RenderIcon name={elm.value2}></RenderIcon>
                    </label>
                  </TableElement>
                  <TableElement isDisabled={playerPoints - 2 < 0}>
                    <input
                      id={elm.value3}
                      value={"value3"}
                      disabled={playerPoints - 2 < 0 && true}
                      type="radio"
                      onClick={() => handleClick(index, elm.configurationId, 2)}
                      {...register(`configuration.${index}.value`)}
                    />
                    <label htmlFor={elm.value3} title={elm.value3}>
                      <RenderIcon name={elm.value3}></RenderIcon>
                    </label>
                  </TableElement>
                  {elm.value4 && (
                    <>
                      <TableElement isDisabled={playerPoints - 3 < 0}>
                        <input
                          id={elm.value4}
                          value={"value4"}
                          disabled={playerPoints - 3 < 0 && true}
                          type="radio"
                          onClick={() =>
                            handleClick(index, elm.configurationId, 3)
                          }
                          {...register(`configuration.${index}.value`)}
                        />
                        <label htmlFor={elm.value4} title={elm.value4}>
                          <RenderIcon name={elm.value4}></RenderIcon>
                        </label>
                      </TableElement>
                    </>
                  )}
                </TableLine>
              )
            )}
            <TableElement></TableElement>
            <TableElement></TableElement>
            <TableElement></TableElement>
            <TableElement></TableElement>
            <TableElement>
              <SaveButton type="submit">
                <span className="material-icons">check_circle</span>
              </SaveButton>
            </TableElement>
          </Table>
        </form>
      </Window>
    </ConfigPage>
  );
};

export default ConfigProfile;
