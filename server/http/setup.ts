import express from 'express';
import { createRequestHandler } from '@remix-run/express';
import { type ServerBuild } from '@remix-run/node';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from 'server/trpc/root.js';
import { createTrpcHttpContext } from 'server/trpc/trpc.js';

export async function setupRemixServer(app: express.Express) {
  const viteDevServer =
    process.env.NODE_ENV === 'production'
      ? undefined
      : await import('vite').then((vite) =>
          vite.createServer({
            server: { middlewareMode: true },
          })
        );
  if (viteDevServer) {
    app.use(viteDevServer.middlewares);
  } else {
    app.use(
      '/assets',
      express.static('build/client/assets', { immutable: true, maxAge: '1y' })
    );
  }

  app.use(express.static('build/client', { maxAge: '1h' }));

  app.use(
    '/api/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext: createTrpcHttpContext,
      onError({ path, error }) {
        console.error(
          `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
        );
      },
    })
  );

  async function getBuild() {
    try {
      const build = viteDevServer
        ? await viteDevServer.ssrLoadModule('virtual:remix/server-build')
        : await import('../../build/server/remix.js');

      return { build: build as unknown as ServerBuild, error: null };
    } catch (error) {
      console.error('Error creating build:', error);
      return { error: error, build: null as unknown as ServerBuild };
    }
  }

  app.all(
    '*',
    createRequestHandler({
      build: async () => {
        const { error, build } = await getBuild();
        if (error) {
          throw error;
        }
        return build;
      },
    })
  );
}
