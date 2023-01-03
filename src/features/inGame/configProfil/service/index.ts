export const getSumOfPoints = (data: ChoiceOfUser[]): number => {
  let sumPoints = 0;
  data.map((choice) => (sumPoints += choice.point));
  return sumPoints;
};
