import React, {useState, useMemo, useEffect} from "react";
import {useGetUserAttacksQuery} from "src/services";
import {useSelector} from "react-redux";
import {RootState} from "src/app/store";
import OverlayLoader from "../../../../../UI-KIT/components/OverlayLoader";
import Question from "./question/Question";
import {QUESTIONS} from "../../../../../constants/question";
import {useNavigate} from "react-router-dom";
import {botSetFinished} from "src/features/bot/bot";
import styled from "@emotion/styled";
import background from "src/assets/img/inGame/backgrounds/day.webp";
import {PrimaryButton} from "../../../../../UI-KIT/components/Button";

const QuestionContainer = styled.div`
  background-color: ${(props) => `${props.theme.colors.primary.white}E6`};
  border-radius: ${(props) => props.theme.radius.big};
  padding: 1rem 3rem 2rem 3rem;
  height: 60%;
`

const ResponseContainer = styled.div`
  background-color: ${(props) => `${props.theme.colors.primary.white}E6`};
  border-radius: ${(props) => props.theme.radius.big};
  padding: 1rem 3rem 2rem 3rem;
`

const Response = styled.div`
  width: 30%;
  margin: auto;
  display: flex;
  flex-direction: column;
`

const ResponseText = styled.p`
  text-align: center;
`

const Day = (props: AttackProps) => {
  const navigate = useNavigate();

  // Get all redux needed information
  const user = useSelector((state: RootState) => state.userSlice);
  const game = useSelector((state: RootState) => state.gameSlice);
  const round = useSelector((state: RootState) => state.roundSlice);
  const webSocketState = useSelector((state: RootState) => state.webSocket);
  const bot = useSelector((state: RootState) => state.botSlice);

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
    roundId: round.roundId,
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

      /* BOT */
      if (bot.botIsActive) {
        botSetFinished(game.gameId, webSocketState.webSocket!, user.userId);
      }
    }
  };

  const randQuestion = useMemo(() => Math.floor(Math.random() * 3), []);

  if (isLoading) {
    return <OverlayLoader/>;
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
            <QuestionContainer>
              <Question
                question={question}
                choices={choices}
                setChoices={setChoices}
                questionNb={questionNb}
                setQuestionNb={setQuestionNb}
              />
            </QuestionContainer>
        );
      }
    }
  }

  return (
    <ResponseContainer>
      <Response>
        <ResponseText>Votre réponse a été validé</ResponseText>
        <PrimaryButton onClick={handleClick} content={"Suivant"}></PrimaryButton>
      </Response>
    </ResponseContainer>
  );
};

export default Day;
