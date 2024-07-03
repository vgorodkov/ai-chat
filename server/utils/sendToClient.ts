import WebSocket from 'ws';

export const sendToClient = (ws: WebSocket, message: object): void => {
  ws.send(JSON.stringify(message));
};
