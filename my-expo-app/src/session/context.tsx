import { createContext, use, useState, type PropsWithChildren } from 'react';
import * as api from '../api/auth';
import { setToken } from '../api/client';
import type { Role, User } from '../types';

interface Session {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const SessionContext = createContext<Session | null>(null);

export function useSession(): Session {
  const value = use(SessionContext);
  if (!value) throw new Error('useSession debe usarse dentro de <SessionProvider />');
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    const session = await api.login(email.trim().toLowerCase(), password);
    setToken(session.token);
    setUser({ name: email.trim().toLowerCase(), email: email.trim().toLowerCase(), roles: session.roles });
  };

  return (
    <SessionContext
      value={{
        user,
        signIn,
        signUp: async (name, email, password) => {
          const session = await api.register(name.trim(), email.trim().toLowerCase(), password);
          setToken(session.token);
          setUser({ name: name.trim(), email: email.trim().toLowerCase(), roles: session.roles });
        },
        signOut: () => {
          setToken(null);
          setUser(null);
        },
      }}>
      {children}
    </SessionContext>
  );
}
