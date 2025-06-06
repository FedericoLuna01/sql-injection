import { createContext } from "react";
import { type User } from "./auth-context-provider";

interface AuthContextType {
  token: string | null;
  user: User;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  login: () => { },
  logout: () => { },
});