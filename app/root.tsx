import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import { TRPCReactProvider } from './react';
import Mock from './components/Mock';
import { ClientOnly } from 'remix-utils/client-only';
import Name from './components/Name';
import AuthProvider from './auth/AuthProvider';

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
              <AuthProvider>
                <Outlet />
                <Mock />
                <Name />
              </AuthProvider>
            </TRPCReactProvider>
          )}
        </ClientOnly>
        <Scripts />
      </body>
    </html>
  );
}
