import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { CreateWSSContextFnOptions } from '@trpc/server/adapters/ws';
import { parse } from 'cookie';
import { AUTH_COOKIE, UserIdentity } from 'server/http/types';
import * as trpcExpress from '@trpc/server/adapters/express';
import { RoomNotFoundError } from 'server/services/rooms/errors/RoomNotFound';

export const createTrpcHttpContext = (
  opts: trpcExpress.CreateExpressContextOptions
) => {
  return { identity: getIdentity(opts.req.cookies) };
};

export const createTrpcWsContext = (opts: CreateWSSContextFnOptions) => {
  const cookieString = opts.req.headers.cookie;
  return { identity: getIdentity(parse(cookieString || '')) };
};

const getIdentity = (
  cookies: Record<string, string | undefined>
): UserIdentity | undefined => {
  let identity: UserIdentity | undefined = undefined;
  if (cookies && cookies[AUTH_COOKIE]) {
    identity = JSON.parse(
      Buffer.from(cookies[AUTH_COOKIE], 'base64').toString('utf-8')
    ) as UserIdentity;
  }
  return identity;
};

const t = initTRPC.context<typeof createTrpcWsContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;

const procedure = t.procedure.use(async ({ next, ctx }) => {
  const result = await next({ ctx });
  if (!result.ok) {
    if (result.error.cause instanceof RoomNotFoundError) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        cause: result.error,
        message: result.error.message,
      });
    }
  }
  return result;
});

export const publicProcedure = procedure;

export const protectedProcedure = procedure.use(({ next, ctx }) => {
  if (!ctx.identity) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
  }
  return next({ ctx: { identity: ctx.identity } });
});
