import { startWebSocketServer } from './wss';

const PORT = Number(process.env.PORT) || 8080;
startWebSocketServer(PORT);
