type PutUser = {
  name?: string;
  nbPoints?: number;
};

interface User {
  userId: string;
  name: string;
  gameId: number;
  nbPoints: number;
  isAlive: boolean;
}

interface FullUserData extends User {
  configuration: UserConfiguration[];
  opponents: string[];
}

type UserOpponent = {
  opponent: {
    1: number;
    2: number;
    3: number;
  };
};
