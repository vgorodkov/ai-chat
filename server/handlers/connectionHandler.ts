import WebSocket from 'ws';

import { initializeSession } from 'services/sessionManager';
import { handleMessage } from './messageHandler';
import { handleClose } from './closeConnectionHandler';

export const handleConnection = (ws: WebSocket): void => {
  console.log('Client connected');
  initializeSession(ws);

  ws.on('message', (message: string) => handleMessage(ws, message));
  ws.on('close', () => handleClose(ws));
};
