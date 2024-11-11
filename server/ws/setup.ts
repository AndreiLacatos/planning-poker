import { appRouter } from 'server/trpc/root';
import { createTRPCContext } from 'server/trpc/trpc';
import { WebSocketServer } from 'ws';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { Server } from 'http';

export function setupWsServer(httpServer: Server) {
  const wss = new WebSocketServer({
    noServer: true,
  });

  httpServer.on('upgrade', (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req);
    });
  });

  const handler = applyWSSHandler({
    wss,
    router: appRouter,
    createContext: createTRPCContext,
  });

  wss.on('connection', (ws) => {
    console.log(`Connection opened (${wss.clients.size})`);
    ws.once('close', () => {
      console.log(`Connection closed (${wss.clients.size})`);
    });
  });

  console.log('✅ WebSocket server listening');

  process.on('SIGTERM', () => {
    handler.broadcastReconnectNotification();
    wss.close();
  });
}
