import { startWebSocketServer } from './handlers/websocketHandler';

const PORT = Number(process.env.WS_PORT) || 8080;
startWebSocketServer(PORT);
