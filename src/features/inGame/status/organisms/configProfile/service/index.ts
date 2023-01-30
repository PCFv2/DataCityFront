import { Dispatch, SetStateAction } from "react";

export const getSumOfPoints = (data: ChoiceOfUser[]): number => {
  let sumPoints = 0;
  data.map((choice) => (sumPoints += choice.point));
  return sumPoints;
};

export const initPlayerPoints = (data: UserConfiguration[]): ChoiceOfUser[] => {
  if (!data) return [];
  const choicesOfUser: ChoiceOfUser[] = [];
  data.map((elm, index) => {
    const choiceOfUser: ChoiceOfUser = {
      index: index,
      point: Number(elm.value.charAt(elm.value.length - 1)) - 1,
    };
    choicesOfUser.push(choiceOfUser);
  });
  return choicesOfUser;
};
