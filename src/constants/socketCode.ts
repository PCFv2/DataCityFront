export const SOCKET_CODE = {
  serverValidate: {
    ok: "00",
    modifyGame: "01",
    finishRound: "02",
  },
  serverError: {
    unknownError: "10",
    changeNotAgree: "11",
    idOfGameIncorrect: "12",
    gameJoinImpossible: "13",
  },
  client: {
    gameCreate: "21",
    modifyGame: "22",
    joinGame: "23",
    finishRound: "24",
    finishGame: "25",
  },
};
