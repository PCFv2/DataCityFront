import React from "react";
import { useGetUserAttacksQuery } from "src/services";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/app/store";
import OverlayLoader from "../../../../../UI-KIT/components/OverlayLoader";
const Day = () => {
    // Get all redux needed information
    const user = useSelector((state: RootState) => state.userSlice);
    const game = useSelector((state: RootState) => state.gameSlice);
    const round = useSelector((state: RootState) => state.roundSlice);

    const { data: userAttacks, isLoading } = useGetUserAttacksQuery({
        gameId: game.gameId,
        // To get attacks of previous round
        roundId: round.roundId - 1,
        userId: user.userId})
    // TODO: Render questions for each attacks

    console.log(userAttacks);
    // TODO: Finished round

    if (isLoading) {
        return <OverlayLoader/>
    }

    return (
        <div>
            {Object.values(userAttacks!).map((elm: UserAttacks) => (
                <div key={elm.userId}>
                    Attack {elm.attackId} of {elm.userId}, cheh!
                </div>
            ))}
        </div>
    )
}

export default Day;