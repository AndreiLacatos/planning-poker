import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { appRouter } from 'server/trpc/root';
import { createTRPCContext } from 'server/trpc/trpc';

export const loader = async (args: LoaderFunctionArgs) => {
  return handleRequest(args);
};

export const action = async (args: ActionFunctionArgs) => {
  return handleRequest(args);
};

function handleRequest(args: LoaderFunctionArgs | ActionFunctionArgs) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: args.request,
    router: appRouter,
    createContext: createTRPCContext,
    onError({ path, error }) {
      console.error(
        `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
      );
    },
  });
}
