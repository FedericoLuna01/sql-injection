import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./auth-context";

export type User = {
  created_at: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  role: string;
  updated_at: string;
} | null;

export type JwtPayload = {
  exp: number;
  iat: number;
  user: User | User[];
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  const user = token
    ? (() => {
      const decoded = jwtDecode<JwtPayload>(token).user;
      return Array.isArray(decoded) ? decoded[0] : decoded;
    })()
    : null;

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}