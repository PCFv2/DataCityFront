type AttackProps = {
  handleFinishRound?: (
    round: number,
    userConfiguration?: UserConfigurationForm,
    night?: Night,
    day?: DayForm,
  ) => void;
};
