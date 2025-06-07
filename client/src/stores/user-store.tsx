import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

interface User {
  created_at: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  role: string;
  updated_at: string;
}

interface JwtPayload {
  exp: number;
  iat: number;
  user: User | User[];
}

interface UserState {
  token: string | null;
  user: User | null;
  login: (newToken: string) => void;
  logout: () => void;
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      token: null,
      user: null,
      login: (newToken: string) => {
        const decoded = jwtDecode<JwtPayload>(newToken).user;
        const user = Array.isArray(decoded) ? decoded[0] : decoded;
        set({ token: newToken, user });
      },
      logout: () => {
        set({ token: null, user: null });
      },
    }),
    {
      name: 'user-storage',
    }
  )
);

export default useUserStore;