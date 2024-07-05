import WebSocket from 'ws';
import { HumanMessage, AIMessage } from '@langchain/core/messages';

interface SessionData {
  chatHistory: (HumanMessage | AIMessage)[];
}

const chatHistory: (HumanMessage | AIMessage)[] = [];
const sessions = new Map<WebSocket, SessionData>();

export const initializeSession = (ws: WebSocket): void => {
  sessions.set(ws, { chatHistory: chatHistory });
};

export const getSession = (ws: WebSocket): SessionData | undefined => {
  return sessions.get(ws);
};

export const updateSession = (ws: WebSocket, session: SessionData): void => {
  sessions.set(ws, session);
};

export const deleteSession = (ws: WebSocket): void => {
  sessions.delete(ws);
};

export const appendToChatHistory = (
  ws: WebSocket,
  entry: HumanMessage | AIMessage
): void => {
  const session = getSession(ws);
  if (session) {
    session.chatHistory.push(entry);
    updateSession(ws, session);
  }
};

export const getChatHistory = (
  ws: WebSocket
): (HumanMessage | AIMessage)[] | undefined => {
  const session = getSession(ws);
  return session?.chatHistory;
};
