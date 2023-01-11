import { SOCKET_CODE } from "src/constants";

export const requestCreateGame = (webSocket: WebSocket, gameId: number) => {
  webSocket.send(`${SOCKET_CODE.client.gameCreate}${gameId}`);
};

export const requestJoinGame = (webSocket: WebSocket, gameId: number) => {
  webSocket.send(`${SOCKET_CODE.client.joinGame}${gameId}`);
};
