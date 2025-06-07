import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LogEntry {
  query: string;
  timestamp: string;
}

export const useDevModeStore = create(
  persist<{
    devMode: boolean;
    toggleDevMode: () => void;
    tab: string;
    setTab: (tab: string) => void;
    redirectToAdmin: boolean;
    setRedirectToAdmin: () => void;
    logs: LogEntry[];
    addLog: (log: LogEntry) => void;
  }>(
    (set) => ({
      devMode: false,
      toggleDevMode: () => {
        set((state) => ({ devMode: !state.devMode }));
      },
      tab: 'settings',
      setTab: (tab: string) => {
        set({ tab });
      },
      redirectToAdmin: true,
      setRedirectToAdmin: () => {
        set((state => ({ redirectToAdmin: !state.redirectToAdmin })));
      },
      logs: [],
      addLog: (log: LogEntry) => {
        set((state) => ({ logs: [log, ...state.logs] }));
      },
    }),
    {
      name: 'devMode',
      partialize: (state) => ({
        ...state,
        logs: [],
      }),
    }
  )
);