import { SOCKET_CODE } from "src/constants";

export const responseOfServer = (webSocket: WebSocket) =>
  new Promise<boolean>((resolve, reject) => {
    webSocket.addEventListener("message", (message) => {
      if (
        message.data === SOCKET_CODE.serverValidate.ok ||
        message.data ===
          SOCKET_CODE.serverValidate.modifyGame /* a voir avec marius */
      ) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });

export const requestCreateGame = (webSocket: WebSocket, gameId: number) =>
  new Promise<boolean>((resolve, reject) => {
    webSocket.send(`${SOCKET_CODE.client.gameCreate}${gameId}`);
    responseOfServer(webSocket)
      .then(() => resolve(true))
      .catch(() => reject(false));
  });

export const requestJoinGame = (webSocket: WebSocket, gameId: number) =>
  new Promise<boolean>((resolve, reject) => {
    webSocket.send(`${SOCKET_CODE.client.joinGame}${gameId}`);
    responseOfServer(webSocket)
      .then(() => resolve(true))
      .catch(() => reject(false));
  });

export const requestModifyGame = (webSocket: WebSocket, gameId: number) =>
  new Promise<boolean>((resolve, reject) => {
    webSocket.send(`${SOCKET_CODE.client.modifyGame}${gameId}`);
    responseOfServer(webSocket)
      .then(() => resolve(true))
      .catch(() => reject(false));
  });
