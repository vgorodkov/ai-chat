import WebSocket from 'ws';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { MessagesPlaceholder } from '@langchain/core/prompts';
import { AIMessage } from '@langchain/core/messages';
import { sendToClient } from 'utils/sendToClient';
import { appendToChatHistory, getChatHistory } from './sessionService';

const chatModel = new ChatOllama({
  baseUrl: 'http://localhost:11434',
  model: 'llama3',
});
const outputParser = new StringOutputParser();

const historyAwarePrompt = ChatPromptTemplate.fromMessages([
  new MessagesPlaceholder('chat_history'),
  ['user', '{input}'],
]);

const llmChain = historyAwarePrompt.pipe(chatModel).pipe(outputParser);

export const processAIResponse = async (
  ws: WebSocket,
  prompt: string
): Promise<void> => {
  const chatHistory = getChatHistory(ws);
  const responseChunks = [];
  const stream = await llmChain.stream({
    input: prompt,
    chat_history: chatHistory,
  });

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

  appendToChatHistory(ws, new AIMessage(responseChunks.join('')));
};
