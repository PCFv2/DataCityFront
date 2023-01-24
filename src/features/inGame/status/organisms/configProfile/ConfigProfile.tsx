import React, {useEffect, useState} from "react";
import {useGetAllConfigurationQuery} from "src/services";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";

import {useForm} from "react-hook-form";
import {getSumOfPoints} from "./service";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "src/app/store";
import {setNbPoints} from "src/app/redux/userSlice";
import userApi, {
    useGetUserConfigurationQuery,
    usePutUserConfigurationMutation,
    useUpdateUserByIdMutation,
} from "src/services/queries/user";
import styled from "@emotion/styled";

type ConfigProfileProps = {
    handleFinishRound?: (
        round: number,
        userConfiguration?: UserConfigurationForm,
        night?: Night
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
    const {data: allConfiguration, isLoading} = useGetAllConfigurationQuery(); // API /configuration
    const {data: userConfiguration, isLoading: isLoadingUserConfiguration} =
        useGetUserConfigurationQuery(user.userId); // API /user/{id}/configuration

    /* Mutations */
    const [updateUser, {isLoading: userLoading}] = useUpdateUserByIdMutation(); // API user/{userId}

    /* React hook form */
    const {register, handleSubmit, setValue, reset} =
        useForm<UserConfigurationForm>();

    /* Rendering condition useEffect */
    useEffect(() => {
        reset({configuration: userConfiguration}); // set default value when fetch of userConfiguration is success
    }, [userConfiguration]);

    useEffect(() => {
        setDisplayPlayerPoints(
            playerPoints - getSumOfPoints(playerSpentPoints)
        ); /* Manage display of point */
    }, [playerSpentPoints]);

    const onSubmit = (data: UserConfigurationForm) => {
        /* Envoie les informations au back */

        props.handleFinishRound!(round.statusId, data); /* set Finished round */

        updateUser({userId: user.userId, nbPoints: displayPlayerPoints}); // send to API user
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
                {index: index, point: nbPoint},
            ]);
        }
        setValue(`configuration.${index}.configurationId`, configurationId);
    };

    if (isLoading || isLoadingUserConfiguration || userLoading)
        return <OverlayLoader/>;

    const Window = styled.div`
      border-radius: ${(props) => props.theme.radius.medium};
      background-color: ${(props) => props.theme.colors.primary.white};
      display: flex;
      flex-direction: column;
    `

    const WindowTitle = styled.h1`
      color: ${(props) => props.theme.colors.primary.blue};
      font-size: 1.5rem;
      text-align: center;

    `

    const Points = styled.p`

    `

    const Table = styled.table`

    `

    const TableLine = styled.tr`
      border: white;
    `

    const TableHeader = styled.th`

    `

    const TableHeadersLine = styled.tr`

    `

    const TableElement = styled.td`

    `


    const SaveButton = styled.button`
      background-color: unset;
      border: none;
      cursor: pointer;
      border-radius: 50%;
      & span {
        color: ${(props) => props.theme.colors.primary.lightBlue};
        font-size: 48px;
      }
    `

    return (
        <Window>
            <WindowTitle>Configuration de votre profil de jeu</WindowTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Table>
                    <TableHeadersLine>
                        <TableHeader>0 points</TableHeader>
                        <TableHeader>1 points</TableHeader>
                        <TableHeader>2 points</TableHeader>
                        <TableHeader>3 points</TableHeader>
                    </TableHeadersLine>

                    {Object.values(allConfiguration!).map((elm: Configuration, index) => (
                        <TableLine key={elm.configurationId}>
                                <TableElement>
                                    <label htmlFor={elm.value1}>{elm.value1}</label>
                                    <input
                                        id={elm.value1}
                                        value={"value1"}
                                        disabled={displayPlayerPoints < 0 && true}
                                        type="radio"
                                        onClick={() => handleClick(index, elm.configurationId, 0)}
                                        {...register(`configuration.${index}.value`)}
                                    />
                                </TableElement>
                                <TableElement>
                                    <label htmlFor={elm.value2}>{elm.value2}</label>
                                    <input
                                        id={elm.value2}
                                        value={"value2"}
                                        disabled={displayPlayerPoints - 1 < 0 && true}
                                        type="radio"
                                        onClick={() => handleClick(index, elm.configurationId, 1)}
                                        {...register(`configuration.${index}.value`)}
                                    />
                                </TableElement>
                                <TableElement>
                                    <label htmlFor={elm.value3}>{elm.value3}</label>
                                    <input
                                        id={elm.value3}
                                        value={"value3"}
                                        disabled={displayPlayerPoints - 2 < 0 && true}
                                        type="radio"
                                        onClick={() => handleClick(index, elm.configurationId, 2)}
                                        {...register(`configuration.${index}.value`)}
                                    />
                                </TableElement>
                                {elm.value4 && (
                                    <>
                                        <TableElement>
                                            <label htmlFor={elm.value4}>{elm.value4}</label>
                                            <input
                                                id={elm.value4}
                                                value={"value4"}
                                                disabled={displayPlayerPoints - 3 < 0 && true}
                                                type="radio"
                                                onClick={() => handleClick(index, elm.configurationId, 3)}
                                                {...register(`configuration.${index}.value`)}
                                            />
                                        </TableElement>
                                    </>
                                )}
                        </TableLine>
                    ))}
                    <SaveButton type="submit"><span className="material-icons">check_circle</span></SaveButton>
                </Table>
            </form>
            <Points>Il vous reste {displayPlayerPoints} points</Points>
        </Window>
    );
};

export default ConfigProfile;
