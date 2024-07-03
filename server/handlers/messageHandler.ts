import { processAIResponse } from 'services/ollamaService';
import { getSession } from 'services/sessionManager';
import { createFullPrompt } from 'utils/createFullPrompt';
import { sendToClient } from 'utils/sendToClient';
import WebSocket from 'ws';
import { handleError } from './errorHandler';

export const handleMessage = async (
  ws: WebSocket,
  message: string
): Promise<void> => {
  console.log(`Received message from client: ${message}`);
  sendToClient(ws, { event: 'LOADING' });

  const session = getSession(ws);
  if (!session) {
    sendToClient(ws, { event: 'ERROR', message: 'Session not found' });
    return;
  }

  session.sessionHistory.push(`User: ${message}`);
  const fullPrompt = createFullPrompt(session.sessionHistory);

  try {
    await processAIResponse(ws, fullPrompt);
  } catch (error) {
    handleError(ws, error as Error);
  }
};
