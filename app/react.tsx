import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import SuperJSON from 'superjson';
import { createTRPCReact } from '@trpc/react-query';
import { AppRouter } from 'server/trpc/root';
import { useState } from 'react';
import {
  createWSClient,
  loggerLink,
  splitLink,
  unstable_httpBatchStreamLink,
  wsLink,
} from '@trpc/client';
import { useAuth } from './auth/AuthProvider';

function getBaseUrl() {
  if (!window) {
    throw new Error('TRPC not available on server side!');
  }
  return window.location.origin;
}

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
    },
  });

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
  return (clientQueryClientSingleton ??= createQueryClient());
};

export const api = createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer: SuperJSON,
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === 'development' ||
            (op.direction === 'down' && op.result instanceof Error),
        }),
        splitLink({
          condition: (op) => op.type === 'subscription',
          true: wsLink({
            client: createWSClient({
              url: getBaseUrl(),
            }),
          }),
          false: unstable_httpBatchStreamLink({
            url: getBaseUrl() + '/api/trpc',
          }),
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}
