import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import { TRPCReactProvider } from './react';
import Mock from './components/Mock';
import { ClientOnly } from 'remix-utils/client-only';

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Hello world!</h1>
        <ClientOnly>
          {() => (
            <TRPCReactProvider>
              <Outlet />
              <Mock />
            </TRPCReactProvider>
          )}
        </ClientOnly>
        <Scripts />
      </body>
    </html>
  );
}
