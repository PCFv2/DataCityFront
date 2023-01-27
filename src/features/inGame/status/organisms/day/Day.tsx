import React, { useState, useMemo, useEffect } from "react";
import { useGetUserAttacksQuery } from "src/services";
import { useSelector } from "react-redux";
import { RootState } from "src/app/store";
import OverlayLoader from "../../../../../UI-KIT/components/OverlayLoader";
import Question from "./question/Question";
import { QUESTIONS } from "../../../../../constants/question";
import { useNavigate } from "react-router-dom";

const Day = (props: AttackProps) => {
  const navigate = useNavigate();

  // Get all redux needed information
  const user = useSelector((state: RootState) => state.userSlice);
  const game = useSelector((state: RootState) => state.gameSlice);
  const round = useSelector((state: RootState) => state.roundSlice);

  // To register globally choice
  const [choices, setChoices] = useState<Day[]>();
  const [questionNb, setQuestionNb] = useState<number>(0);

  const {
    data: userAttacks,
    isLoading,
    isError: userAttacksIsError,
  } = useGetUserAttacksQuery({
    gameId: game.gameId,
    // To get attacks of previous round
    roundId: round.roundId - 1,
    userId: user.userId,
  });

  /* manage error */
  useEffect(() => {
    if (userAttacksIsError) navigate("/error:api");
  }, [userAttacksIsError]);

  // Send to API
  const handleClick = (): void => {
    if (userAttacks?.length === choices?.length) {
      const dayForm: DayForm = {
        day: choices!,
      };
      props.handleFinishRound!(round.statusId, undefined, undefined, dayForm);
    }
  };

  const randQuestion = useMemo(() => Math.floor(Math.random() * 3), []);

  if (isLoading) {
    return <OverlayLoader />;
  } else {
    if (userAttacks) {
      while (questionNb < userAttacks.length) {
        const category: string = userAttacks[questionNb].category;
        let question: Question;

        switch (category) {
          case "Social":
            question = QUESTIONS.category1[randQuestion];
            break;
          case "Internet":
            question = QUESTIONS.category2[randQuestion];
            break;
          case "Physique":
            question = QUESTIONS.category3[randQuestion];
            break;
          default:
            return <div>error</div>;
        }

        question.userId = userAttacks[questionNb].userId;

        return (
          <div>
            <Question
              question={question}
              choices={choices}
              setChoices={setChoices}
              questionNb={questionNb}
              setQuestionNb={setQuestionNb}
            />
          </div>
        );
      }
    }
  }

  return (
    <div>
      <p>Votre réponse a été validé</p>
      <button onClick={handleClick}>Suivant</button>
    </div>
  );
};

export default Day;
