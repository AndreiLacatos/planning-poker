import { createRoom } from 'server/services/rooms/create';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import z from 'zod';

export const roomRouter = createTRPCRouter({
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
});
