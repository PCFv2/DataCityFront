import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {finishRound} from "src/app/finishedRound/finishRound";
import {requestFinishRound, requestModifyGame} from "src/app/requestServer";
import {RootState} from "src/app/store";
import {DISPLAY_COMPONENT, SOCKET_CODE} from "src/constants";
import {
    gameApi,
    useGetAllUsersByGameIdQuery,
    useGetGameByIdQuery,
    usePutGameByIdMutation,
    useSetFinishedMutation,
} from "src/services";
import OverlayLoader from "src/UI-KIT/components/OverlayLoader";
import {
    setDisplayComponent,
    setIsLoading,
} from "src/app/redux/displayComponentSlice";
import {setGameData, setStartNbPoints} from "src/app/redux/gameSlice";
import {MESSAGE_LOADER} from "src/constants/messageLoader";
import styled from "@emotion/styled";
import background from "../../../assets/img/beforeGame/background.webp";
import {Primary2Button, PrimaryButton, SecondaryButton} from "../../../UI-KIT/components/Button";


const Host = () => {
    // dipatch
    const dispatch = useDispatch();
    /* redux */
    const user = useSelector(
        (state: RootState) => state.userSlice
    ); /* user info */
    const game = useSelector(
        (state: RootState) => state.gameSlice
    ); /* game info */
    const round = useSelector(
        (state: RootState) => state.roundSlice
    ); /* round info */

    const webSocketState = useSelector(
        (state: RootState) => state.webSocket
    ); /* on récupére la webSocket */

    const [processingServer, setProcessingServer] = useState<boolean>(false);

    /* query */
    const {
        data: gameInfos,
        isLoading: gameInfosLoading,
        refetch: gameRefetch,
    } = useGetGameByIdQuery(game.gameId); /* API GET game/id */

    //query
    const [lastround] = gameApi.endpoints.getLastround.useLazyQuery();

    /* mutation */
    const [updateConfig, result] = usePutGameByIdMutation();
    const [setFinished, {isLoading: setFinishedIsLoading}] =
        useSetFinishedMutation();

    const {
        data: userInGame,
        isLoading: userLoading,
        refetch: userRefetch,
    } = useGetAllUsersByGameIdQuery(game.gameId); /* API GET game/id/user */

    const {register, handleSubmit} =
        useForm<PartialGame>(); /* init du formulaire */
    const onSubmit = (data: PartialGame) => {
        data.hostId = user.userId;
        setProcessingServer(true);
        requestModifyGame(webSocketState.webSocket!, game.gameId).then(() => {
            console.log("Vous avez bien modifier votre game");
            updateConfig({gameId: game.gameId, ...data}).then(() =>
                requestModifyGame(webSocketState.webSocket!, game.gameId).then(() =>
                    setProcessingServer(false)
                )
            );
        });
    }; /* traitement du formulaire */

    // Lancement de la partie, set finished for player
    const handleStartGame = () => {
        dispatch(setStartNbPoints(gameInfos?.startNbPoints!));
        setFinished({
            gameId: game.gameId,
            userId: user.userId,
        }).then(() => {
            requestFinishRound(webSocketState.webSocket!, game.gameId);
            dispatch(setIsLoading(true));
        });
    };

    useEffect(() => {
        webSocketState.webSocket?.addEventListener("message", async (message) => {
            if (message.data === SOCKET_CODE.serverValidate.modifyGame) {
                userRefetch();
                gameRefetch();
            }
            /* on check si tout le monde a fini */
            if (message.data === SOCKET_CODE.serverValidate.finishRound) {
                const roundApi = await lastround(game.gameId);
                if (finishRound(roundApi.data!)) {
                    dispatch(setDisplayComponent(DISPLAY_COMPONENT.renderStatusId));
                    dispatch(setIsLoading(false));
                }
            }
        });
    }, []);

    if (
        gameInfosLoading ||
        userLoading ||
        processingServer ||
        setFinishedIsLoading
    )
        return <OverlayLoader message={MESSAGE_LOADER.partyLoading}/>;


    const HostStyle = styled.main`
      background: url(${background}) no-repeat center center fixed;
      background-size: cover;
      height: 97.8%;
      padding: 1rem 10rem 0 10rem;
    `

    const MainTitle = styled.h1`
      color: ${(props) => props.theme.colors.primary.white};
      font-family: ${(props) => props.theme.font.family.title};
      font-size: ${(props) => props.theme.font.size.page_title};
      margin: 0;
    `

    const MainWindow = styled.div`
      display: flex;
      height: 90%;
      align-items: center;
      justify-content: center;
    `

    // LeftPanel

    const LeftPanel = styled.div`
      background-color: ${(props) => `${props.theme.colors.primary.white}E6`};
      display: flex;
      flex-direction: column;
      align-items: center;
      height:90%;
      border-radius: ${(props) => props.theme.radius.small};
      padding: 0.5rem 1.5rem;
    `

    const LeftPanelTitle = styled.h2`
      font-weight: bold;
      border-bottom: solid 2px ${(props) => props.theme.colors.primary.blue};
    `

    const Players = styled.div`
      margin-bottom: auto;
      text-align: center;
    `

    // RightPanel

    const RightPanel = styled.div`
      background-color: ${(props) => `${props.theme.colors.primary.blue}E6`};;
      padding: 1rem 3rem 2rem 3rem;
      color: ${(props) => props.theme.colors.primary.white};
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 0 ${(props) => props.theme.radius.medium} ${(props) => props.theme.radius.medium} 0;
      height:65%;
      width: 65%;
    `

    const RightPanelContainer = styled.div`
      width: 70%;
    `

    const RightPanelTitle = styled.h2`
      text-align: center;
      border-bottom: solid 2px ${(props) => props.theme.colors.primary.white};
    `

    const ConfForm = styled.form`
      display: flex;
      flex-direction: column;
      row-gap: 2.5rem;
    `

    const InputLine = styled.div`
      display: flex;
      flex-direction: column;
    `

    const ButtonLine = styled.div`
      display: flex;
      justify-content: space-between;
      align-items: center;

      button {
        height: 100%;
      }
    `

    const Input = styled.input`
      background-color: ${(props) => props.theme.colors.primary.grey};
      border-radius: ${(props) => props.theme.radius.small};
      border: solid 2px ${(props) => props.theme.colors.primary.lightBlue};
      padding: 0.3rem 0.7rem;
    `

    return (
        <HostStyle>
            <MainTitle>Data City</MainTitle>
            <MainWindow>
                <LeftPanel>
                    <LeftPanelTitle>Joueurs dans la partie</LeftPanelTitle>
                    <Players>
                        {userInGame?.map((elm) => (
                            <p key={elm.name}>{elm.name}</p>
                        ))}
                    </Players>
                </LeftPanel>
                <RightPanel>
                    <RightPanelContainer>
                        <RightPanelTitle>Configuration de votre partie</RightPanelTitle>
                        <ConfForm onSubmit={handleSubmit(onSubmit)}>
                            <InputLine>
                                <label>Nombre de joueurs maximum</label>
                                <Input
                                    {...register("maxPlayers")}
                                    defaultValue={gameInfos?.maxPlayers}
                                />
                            </InputLine>
                            <InputLine>
                                <label>Difficultée de la partie (0 à 100)</label>
                                <Input
                                    {...register("startNbPoints")}
                                    defaultValue={gameInfos?.startNbPoints}
                                />
                            </InputLine>
                            <InputLine>
                                <label>Nombre de points de départ</label>
                                <Input
                                    {...register("difficulty")}
                                    defaultValue={gameInfos?.difficulty}
                                />
                            </InputLine>
                            <ButtonLine>
                                <SecondaryButton type="submit" content={"Enregistrer"}></SecondaryButton>
                                <Primary2Button onClick={handleStartGame} content={"Lancer la partie"}></Primary2Button>
                            </ButtonLine>
                        </ConfForm>
                    </RightPanelContainer>
                </RightPanel>
            </MainWindow>
        </HostStyle>
    );
};

export default Host;
