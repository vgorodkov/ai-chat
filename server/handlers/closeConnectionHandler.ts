import WebSocket from 'ws';

import { deleteSession } from 'services/sessionService';

export const handleClose = (ws: WebSocket): void => {
  console.log('Client disconnected');
  deleteSession(ws);
};
