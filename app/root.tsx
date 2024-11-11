import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import { TRPCReactProvider } from './react';
import Mock from './components/Mock';
import { ClientOnly } from 'remix-utils/client-only';
import Auth from './auth/Auth';
import Name from './components/Name';

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
              <Name />
              <Auth />
            </TRPCReactProvider>
          )}
        </ClientOnly>
        <Scripts />
      </body>
    </html>
  );
}
