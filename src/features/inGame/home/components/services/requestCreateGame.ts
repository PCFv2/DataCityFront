export const requestCreateGame = (webSocket: WebSocket) => {
  webSocket.send("99"); /* request create game server */
};
