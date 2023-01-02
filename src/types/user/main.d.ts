type PutUser = {
  userId: string;
  username: string;
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
