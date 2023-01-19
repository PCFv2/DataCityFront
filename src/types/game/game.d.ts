type Game = {
  gameId: number;
  hostId: string;
  maxPlayers: number;
  startNbPoints: number;
  difficulty: number;
};

type PartialGame = {
  hostId: string;
  maxPlayers: number;
  startNbPoints: number;
  difficulty: number;
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

type HosterGameForm = {
  maxPlayers: number;
  startNbPoints: number;
  difficulty: string;
};

type UserAttacks = {
  userId: string,
  attackId: number,
  effectiveness: number,
  category: string
}
