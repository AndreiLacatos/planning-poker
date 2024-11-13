import { eventRouter } from './routers/events';
import { roomRouter } from './routers/rooms';
import { voteRouter } from './routers/votes';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  rooms: roomRouter,
  votes: voteRouter,
  events: eventRouter,
});

export type AppRouter = typeof appRouter;
