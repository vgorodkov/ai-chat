import WebSocket from 'ws';

import { SessionData } from 'types/session';

const sessions = new Map<WebSocket, SessionData>();

export const initializeSession = (ws: WebSocket): void => {
  sessions.set(ws, { sessionHistory: [] });
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

export const appendToSessionHistory = (ws: WebSocket, entry: string): void => {
  const session = getSession(ws);
  if (session) {
    session.sessionHistory.push(entry);
    updateSession(ws, session);
  }
};
