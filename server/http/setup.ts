import express from 'express';
import { createRequestHandler } from '@remix-run/express';
import { type ServerBuild } from '@remix-run/node';

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
