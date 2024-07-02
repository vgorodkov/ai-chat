import WebSocket, { WebSocketServer } from 'ws';
import { getAIResponseStream } from '../services/ollamaService';

const sessions = new Map<WebSocket, { sessionHistory: string[] }>();

const handleConnection = (ws: WebSocket) => {
  console.log('Client connected');
  sessions.set(ws, { sessionHistory: [] });

  ws.on('message', (message: string) => handleMessage(ws, message));
  ws.on('close', () => handleClose(ws));
};

const handleMessage = async (ws: WebSocket, message: string) => {
  console.log(`Received message from client: ${message}`);
  const session = sessions.get(ws);
  if (!session) {
    sendToClient(ws, { event: 'ERROR', message: 'Session not found' });
    return;
  }

  session.sessionHistory.push(`User: ${message}`);
  const fullPrompt = session.sessionHistory.join('\n') + '\nAI:';

  try {
    const stream = await getAIResponseStream(fullPrompt);
    let responseChunks: string[] = [];

    for await (const chunk of stream) {
      responseChunks.push(chunk);
      if (ws.readyState === WebSocket.OPEN) {
        sendToClient(ws, { message: chunk, event: 'TYPING' });
      } else {
        break;
      }
    }
    if (ws.readyState === WebSocket.OPEN) {
      sendToClient(ws, { event: 'DONE' });
    }

    session.sessionHistory.push(`AI: ${responseChunks.join('')}`);
  } catch (e) {
    if (ws.readyState === WebSocket.OPEN) {
      sendToClient(ws, { event: 'ERROR', message: (e as Error).message });
    }
    console.log(`Error processing message: ${(e as Error).message}`);
  }
};

const handleClose = (ws: WebSocket) => {
  console.log('Client disconnected');
  sessions.delete(ws);
};

const sendToClient = (ws: WebSocket, message: object) => {
  ws.send(JSON.stringify(message));
};

export const startWebSocketServer = (port: number) => {
  const wss = new WebSocketServer({ port });
  wss.on('connection', handleConnection);
  console.log(`WebSocket server is running on ws://localhost:${port}`);
};
