import WebSocket from 'ws';

import { sendToClient } from 'utils/sendToClient';

export const handleError = (ws: WebSocket, error: Error): void => {
  if (ws.readyState === WebSocket.OPEN) {
    sendToClient(ws, { event: 'ERROR', message: error.message });
  }
  console.log(`Error processing message: ${error.message}`);
};
