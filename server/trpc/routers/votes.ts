import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { submit } from 'server/services/votes/submit';
import { reveal } from 'server/services/votes/reveal';
import { reset } from 'server/services/votes/reset';

export const voteRouter = createTRPCRouter({
  vote: protectedProcedure
    .input(z.object({ roomId: z.string().uuid(), vote: z.number().optional() }))
    .mutation(({ ctx: { identity }, input: { roomId, vote } }) =>
      submit({ roomId, user: identity, vote })
    ),
  reveal: protectedProcedure
    .input(z.object({ roomId: z.string().uuid(), vote: z.number().optional() }))
    .mutation(({ ctx: { identity }, input: { roomId } }) =>
      reveal({ roomId, user: identity })
    ),
  reset: protectedProcedure
    .input(z.object({ roomId: z.string().uuid(), vote: z.number().optional() }))
    .mutation(({ ctx: { identity }, input: { roomId } }) =>
      reset({ roomId, user: identity })
    ),
});
