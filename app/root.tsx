import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import { TRPCReactProvider } from './react';
import { ClientOnly } from 'remix-utils/client-only';
import AuthProvider from './auth/AuthProvider';
import UserGuard from './components/auth/UserGuard';
import { CookiesProvider } from 'react-cookie';
import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import 'normalize.css';
import AppHeader from './components/header/AppHeader';
import './root.css';

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
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
                    <Layout style={{ minHeight: '100vh' }}>
                      <Header>
                        <AppHeader />
                      </Header>
                      <Content
                        style={{
                          padding: '20px',
                          minHeight: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Outlet />
                      </Content>
                    </Layout>
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
