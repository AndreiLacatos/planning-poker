import { createRoom } from 'server/services/rooms/create';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import z from 'zod';
import { getRoom } from 'server/services/rooms/get';
import { joinRoom } from 'server/services/rooms/join';

export const roomRouter = createTRPCRouter({
  fetch: protectedProcedure
    .input(z.object({ roomId: z.string().uuid() }))
    .query(({ input: { roomId } }) => getRoom(roomId)),
  create: protectedProcedure
    .input(
      z.object({
        name: z
          .string()
          .min(3, 'Room name must be at least 3 characters long!')
          .max(45, 'Room name must not exceed 45 characters!'),
      })
    )
    .mutation(({ ctx, input }) => {
      return createRoom({ name: input.name, user: ctx.identity });
    }),
  join: protectedProcedure
    .input(z.object({ roomId: z.string().uuid() }))
    .mutation(({ input: { roomId }, ctx: { identity } }) =>
      joinRoom({ roomId, user: identity })
    ),
});
