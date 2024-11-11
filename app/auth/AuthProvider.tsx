import { createContext, ReactNode, useContext } from 'react';
import { parse } from 'cookie';
import { AUTH_COOKIE, UserIdentity } from 'server/http/types';

interface AuthContextType {
  user: UserIdentity | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  let user: UserIdentity | undefined = undefined;
  const cookies = parse(document.cookie);
  if (cookies[AUTH_COOKIE]) {
    user = JSON.parse(atob(cookies[AUTH_COOKIE])) as UserIdentity;
  }
  console.log(user);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
