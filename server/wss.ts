import { handleConnection } from 'handlers/connectionHandler';
import { WebSocketServer } from 'ws';

export const startWebSocketServer = (port: number): void => {
  const wss = new WebSocketServer({ port });
  wss.on('connection', handleConnection);
  console.log(`WebSocket server is running on ws://localhost:${port}`);
};
