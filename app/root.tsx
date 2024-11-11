import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import { TRPCReactProvider } from './react';
import { ClientOnly } from 'remix-utils/client-only';
import AuthProvider from './auth/AuthProvider';
import UserGuard from './components/auth/UserGuard';

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <ClientOnly>
          {() => (
            <AuthProvider>
              <TRPCReactProvider>
                <UserGuard>
                  <Outlet />
                </UserGuard>
              </TRPCReactProvider>
            </AuthProvider>
          )}
        </ClientOnly>
        <Scripts />
      </body>
    </html>
  );
}
