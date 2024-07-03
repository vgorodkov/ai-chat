import WebSocket from 'ws';
import { Ollama } from '@langchain/community/llms/ollama';
import { sendToClient } from 'utils/sendToClient';
import { appendToSessionHistory } from './sessionService';

const ollama = new Ollama({
  baseUrl: 'http://localhost:11434',
  model: 'llama3',
  temperature: 0.3,
  stop: ['User:'],
});

export const getAIResponseStream = async (fullPrompt: string) => {
  return await ollama.stream(fullPrompt);
};

export const processAIResponse = async (
  ws: WebSocket,
  prompt: string
): Promise<void> => {
  const stream = await getAIResponseStream(prompt);
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

  appendToSessionHistory(ws, `AI: ${responseChunks.join('')}`);
};
