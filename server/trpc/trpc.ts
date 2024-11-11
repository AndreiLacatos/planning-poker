import { initTRPC, TRPCError } from '@trpc/server';
import { FetchCreateContextFnOptions } from 'node_modules/@trpc/server/dist/adapters/fetch/types';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { CreateWSSContextFnOptions } from '@trpc/server/adapters/ws';
import { parse } from 'cookie';
import { AUTH_COOKIE, UserIdentity } from 'server/http/types';

export const createTRPCContext = (
  opts: FetchCreateContextFnOptions | CreateWSSContextFnOptions
) => {
  let identity: UserIdentity | undefined = undefined;
  if (typeof opts.req.headers.get === 'function') {
    const cookieString = opts.req.headers.get('cookie');
    if (cookieString) {
      const cookies = parse(cookieString);
      if (cookies[AUTH_COOKIE]) {
        identity = JSON.parse(
          Buffer.from(cookies[AUTH_COOKIE], 'base64').toString('utf-8')
        ) as UserIdentity;
      }
    }
  }
  return { identity };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
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

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ next, ctx }) => {
  if (!ctx.identity) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
  }
  return next({ ctx: { identity: ctx.identity } });
});
