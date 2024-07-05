import { processAIResponse } from 'services/ollamaService';
import { appendToChatHistory } from 'services/sessionService';
import { HumanMessage } from '@langchain/core/messages';
import { sendToClient } from 'utils/sendToClient';
import WebSocket from 'ws';
import { handleError } from './errorHandler';

export const handleMessage = async (
  ws: WebSocket,
  message: string
): Promise<void> => {
  console.log(`Received message from client: ${message}`);
  sendToClient(ws, { event: 'LOADING' });

  appendToChatHistory(ws, new HumanMessage(message.toString()));
  try {
    await processAIResponse(ws, message.toString());
  } catch (error) {
    handleError(ws, error as Error);
  }
};
