import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`;

const Button = styled.input`
  padding: 1em 0;
  font-family: ${(props) => props.theme.font.family.text}, "Roboto", "Helvetica",
    sans-serif;
  font-weight: bold;
  background-color: ${(props) => props.theme.colors.primary.blue};
  border-radius: ${(props) => props.theme.radius.small};
  color: ${(props) => props.theme.colors.primary.white};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, transform 0.2s,
    color 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
    background-color: ${(props) => props.theme.colors.primary.blue_hover};
  }

  &:active {
    background-color: ${(props) => props.theme.colors.primary.blue_pressed};
  }
`;

const Choices = styled.form`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

const Choice = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 25%;
  margin-top: auto;
`;

const ChoiceText = styled.label`
  text-align: center;
  margin-bottom: 1rem;
`;

const Question = (props: {
  question: Question;
  choices?: Day[];
  setChoices: Dispatch<SetStateAction<Day[] | undefined>>;
  questionNb: number;
  setQuestionNb: Dispatch<SetStateAction<number>>;
}) => {
  // For form
  const { handleSubmit } = useForm<UserConfigurationForm>();
  let state = 0;
  const onSubmit = () => {
    const day: Day = {
      userId: props.question.userId!,
      result: false,
    };

    switch (state) {
      case 0:
        day.result = props.question.choices.choice1.isTrue;
        break;
      case 1:
        day.result = props.question.choices.choice2.isTrue;
        break;
      case 2:
        day.result = props.question.choices.choice3.isTrue;
        break;
    }

    let days: Day[];
    if (!props.choices) {
      days = [day];
    } else {
      days = [day, ...props.choices!];
    }
    props.setChoices(days);
    props.setQuestionNb(props.questionNb + 1);
  };

  return (
    <QuestionContainer>
      <Title>{props.question.question}</Title>
      <Choices onSubmit={handleSubmit(onSubmit)}>
        <Choice>
          <ChoiceText>{props.question.choices.choice1.value}</ChoiceText>
          <Button
            onClick={() => (state = 0)}
            type={"submit"}
            value={"Choix 1"}
          />
        </Choice>
        <Choice>
          <ChoiceText>{props.question.choices.choice2.value}</ChoiceText>
          <Button
            onClick={() => (state = 1)}
            type={"submit"}
            value={"Choix 2"}
          />
        </Choice>
        <Choice>
          <ChoiceText>{props.question.choices.choice3.value}</ChoiceText>
          <Button
            onClick={() => (state = 2)}
            type={"submit"}
            value={"Choix 3"}
          />
        </Choice>
      </Choices>
    </QuestionContainer>
  );
};

export default Question;
