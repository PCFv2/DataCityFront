import { SOCKET_CODE } from "src/constants";

export const requestCreateGame = (webSocket: WebSocket, gameId: number) => {
  webSocket.send(`21${gameId}`); /* request create game server */
};
