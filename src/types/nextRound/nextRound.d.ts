type NextRound = {
  configuration?: {
    configurationId: number;
    value: string;
  }[];
  day?: {
    userId: string;
    result: boolean;
  }[];
  evening?: void;
  night?: {
    attackId: number;
    effectiveness: number;
  };
};
