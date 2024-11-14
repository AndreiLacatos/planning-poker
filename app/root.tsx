import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import { TRPCReactProvider } from './react';
import { ClientOnly } from 'remix-utils/client-only';
import AuthProvider from './auth/AuthProvider';
import UserGuard from './components/auth/UserGuard';
import { CookiesProvider } from 'react-cookie';
import 'normalize.css';
import AppHeader from './components/header/AppHeader';
import './root.css';
import { Provider as ChakraProvider } from '@/components/ui/provider';
import { Box, Center, Stack } from '@chakra-ui/react';
import { Toaster } from '@/components/ui/toaster';
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
                  <ChakraProvider>
                    <UserGuard>
                      <Box background="whiteAlpha.950">
                        <Stack minHeight="100vh">
                          <AppHeader />
                          <Center flexGrow="1">
                            <Outlet />
                            <Toaster />
                          </Center>
                        </Stack>
                      </Box>
                    </UserGuard>
                  </ChakraProvider>
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
