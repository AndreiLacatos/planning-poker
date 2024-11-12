import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { UserIdentity } from 'server/http/types';
import { useCookies } from 'react-cookie';

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
  const [{ identity: identityCookie }] = useCookies(['identity']);
  const [user, setUser] = useState<UserIdentity | undefined>(undefined);
  useEffect(() => {
    if (identityCookie) {
      setUser(JSON.parse(atob(identityCookie)) as UserIdentity);
    }
  }, [identityCookie]);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
