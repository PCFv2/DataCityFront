import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
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
    <div>
      <h2>{props.question.question}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>{props.question.choices.choice1.value}</label>
        <input onClick={() => (state = 0)} type={"submit"} value={"Choix 1"} />

        <label>{props.question.choices.choice2.value}</label>
        <input onClick={() => (state = 1)} type={"submit"} value={"Choix 2"} />

        <label>{props.question.choices.choice3.value}</label>
        <input onClick={() => (state = 2)} type={"submit"} value={"Choix 3"} />
      </form>
    </div>
  );
};

export default Question;
