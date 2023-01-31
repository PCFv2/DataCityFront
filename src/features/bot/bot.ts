import {
  requestFinishGame,
  requestFinishRound,
  requestJoinGame,
} from "src/app/requestServer";
import { SOCKET_CODE } from "src/constants";

let botUserId: string = "";

const startBotWebSocket = (): WebSocket => {
  return new WebSocket(process.env.REACT_APP_SERVER_URL!); // create socket bot
};

const listener = (ws: WebSocket): Promise<string | boolean> => {
  return new Promise<string | boolean>((resolve, reject) => {
    ws.addEventListener("message", (message) => {
      if (message.data.slice(0, 2) === SOCKET_CODE.serverValidate.getToken) {
        resolve(message.data.slice(2).split("/").join("-"));
      } else {
        reject(false);
      }
    });
  });
};

const createBotConfiguration = (): UserConfigurationForm => {
  const botConfiguration: UserConfigurationForm = {
    configuration: [
      {
        configurationId: 1,
        nom: "Mail",
        value: `value${Math.floor(Math.random() * (4 - 1) + 1)}`,
      },
      {
        configurationId: 2,
        nom: "Sécurité téléphone",
        value: `value${Math.floor(Math.random() * (4 - 1) + 1)}`,
      },
      {
        configurationId: 3,
        nom: "Application de discussion",
        value: `value${Math.floor(Math.random() * (4 - 1) + 1)}`,
      },
      {
        configurationId: 4,
        nom: "Navigateur",
        value: `value${Math.floor(Math.random() * (4 - 1) + 1)}`,
      },
      {
        configurationId: 5,
        nom: "Stockage de photo",
        value: `value${Math.floor(Math.random() * (4 - 1) + 1)}`,
      },
      {
        configurationId: 6,
        nom: "Cookies",
        value: `value${Math.floor(Math.random() * (4 - 1) + 1)}`,
      },
      {
        configurationId: 7,
        nom: "Moteur de recherche",
        value: `value${Math.floor(Math.random() * (4 - 1) + 1)}`,
      },
      {
        configurationId: 8,
        nom: "OS",
        value: `value${Math.floor(Math.random() * (4 - 1) + 1)}`,
      },
    ],
  };

  return botConfiguration;
};

export const botSetFinished = (
  gameId: number,
  ws: WebSocket,
  opponentUserId?: string
) => {
  fetch(process.env.REACT_APP_API_URL + `/game/${gameId}/lastround`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      switch (data.statusId) {
        case 1:
          fetch(
            process.env.REACT_APP_API_URL +
              `/game/${gameId}/user/${botUserId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({}),
            }
          ).then(() => requestFinishRound(ws, gameId));
          break;
        case 2:
          fetch(
            process.env.REACT_APP_API_URL +
              `/game/${gameId}/user/${botUserId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(createBotConfiguration()),
            }
          ).then(() => requestFinishRound(ws, gameId));
          break;
        case 3:
          fetch(
            process.env.REACT_APP_API_URL +
              `/game/${gameId}/user/${botUserId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(createBotConfiguration()),
            }
          ).then(() => requestFinishRound(ws, gameId));
          break;
        case 4:
          fetch(
            process.env.REACT_APP_API_URL +
              `/game/${gameId}/user/${botUserId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                day: [
                  {
                    userId: opponentUserId,
                    result: Math.round(Math.random() * 2) % 2 ? true : false,
                  },
                ],
              }),
            }
          ).then(() => requestFinishRound(ws, gameId));
          break;
        case 5:
          fetch(process.env.REACT_APP_API_URL + `/user/${botUserId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              if (!data.isAlive) {
                requestFinishGame(ws, gameId);
              } else {
                fetch(
                  process.env.REACT_APP_API_URL +
                    `/game/${gameId}/user/${botUserId}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({}),
                  }
                ).then(() => requestFinishRound(ws, gameId));
              }
            });

          break;
        case 6:
          fetch(
            process.env.REACT_APP_API_URL +
              `/game/${gameId}/user/${botUserId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                night: {
                  attackId: Math.floor(Math.random() * (4 - 1) + 1),
                  effectiveness: Math.random() * 100,
                },
              }),
            }
          ).then(() => requestFinishRound(ws, gameId));
          break;
      }
    });
};

export const loadBot = (gameId: number): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    const ws = startBotWebSocket(); // websocket

    // join
    listener(ws).then((userId) => {
      botUserId = userId.toString();
      fetch(process.env.REACT_APP_API_URL + `/game/${gameId}/join`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            requestJoinGame(ws, gameId).then(() => {
              fetch(
                process.env.REACT_APP_API_URL +
                  `/user/${userId.toString()}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ name: "BOT", nbPoints: 5 }),
                }
              ).then(() =>
                requestJoinGame(ws, gameId)
                  .then(() => {
                    resolve(true);
                  })
                  .catch(() => reject(false))
              );
            });
          } else {
            reject(false);
          }
        })
        .catch(() => console.log("error"));
    });
  });
};
