type Game = {
  gameId: number;
  hostId: number;
  maxPlayers: number;
  startNbPoints: number;
  difficulty: string;
};

type Round = {
  roundId: number;
  roundNumber: number;
  gameId: number;
  currentlyAlive: string;
  statusId: number;
  realAttacksNb: number;
};

type GameIdAndRoundId = {
  gameId: number;
  roundId: number;
};

type JoinGameForm = {
  gameId: number;
  username: string;
};

type UserInGame = {
  userId: string;
  username: string;
};
