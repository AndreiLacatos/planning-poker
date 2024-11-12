import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import { TRPCReactProvider } from './react';
import { ClientOnly } from 'remix-utils/client-only';
import AuthProvider from './auth/AuthProvider';
import UserGuard from './components/auth/UserGuard';
import { CookiesProvider } from 'react-cookie';

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
            <CookiesProvider>
              <AuthProvider>
                <TRPCReactProvider>
                  <UserGuard>
                    <Outlet />
                  </UserGuard>
                </TRPCReactProvider>
              </AuthProvider>
            </CookiesProvider>
          )}
        </ClientOnly>
        <Scripts />
      </body>
    </html>
  );
}
