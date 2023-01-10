export const requestCreateGame = async (webSocket: WebSocket) => {
  console.log("deded");
  webSocket.send("99"); /* request create game server */
};
