import { roomRouter } from './routers/rooms';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  rooms: roomRouter,
});

export type AppRouter = typeof appRouter;
