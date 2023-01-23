import React, {useState, useMemo} from "react";
import { useGetUserAttacksQuery } from "src/services";
import { useSelector } from "react-redux";
import { RootState } from "src/app/store";
import OverlayLoader from "../../../../../UI-KIT/components/OverlayLoader";
import Question from "./question/Question";
import {QUESTIONS} from "../../../../../constants/question";
const Day = () => {
    // Get all redux needed information
    const user = useSelector((state: RootState) => state.userSlice);
    const game = useSelector((state: RootState) => state.gameSlice);
    const round = useSelector((state: RootState) => state.roundSlice);

    // To register globally choice
    const [choices, setChoices] = useState<Day[]>();
    const [questionNb, setQuestionNb] = useState<number>(0);

    const { data: userAttacks, isLoading } = useGetUserAttacksQuery({
        gameId: game.gameId,
        // To get attacks of previous round
        roundId: round.roundId - 1,
        userId: user.userId})

    console.log(isLoading)
    console.log(userAttacks)

    if (isLoading) {
        return <OverlayLoader/>
    }
    else {
        console.log(userAttacks!.length);

        if (userAttacks) {
            while (questionNb < userAttacks.length) {
                const randQuestion = Math.floor(Math.random() * 3)

                console.log("questionNb : " + questionNb);
                console.log(userAttacks[questionNb]);

                const category: string = userAttacks[questionNb].category;
                let question : Question;

                switch (category) {
                    case "Social" :
                        question = QUESTIONS.category1[randQuestion];
                        break;
                    case "Internet" :
                        question = QUESTIONS.category2[randQuestion]
                        break;
                    case "Physique" :
                        question = QUESTIONS.category3[randQuestion]
                        break;
                    default:
                        return (
                            <div>error</div>
                        )
                }

                question.userId = userAttacks[questionNb].userId;

                //TODO: construct question from constant

                return (<div>
                    <Question question={question} choices={choices} setChoices={setChoices} questionNb={questionNb}
                              setQuestionNb={setQuestionNb}/>
                </div> )
            }
        }
    }

    return (
        <div>
            Test

        </div>
    )
}

export default Day;