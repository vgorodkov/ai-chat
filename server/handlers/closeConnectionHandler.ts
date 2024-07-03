import WebSocket from 'ws';

import { deleteSession } from 'services/sessionManager';

export const handleClose = (ws: WebSocket): void => {
  console.log('Client disconnected');
  deleteSession(ws);
};
