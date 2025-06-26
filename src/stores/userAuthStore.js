import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      clearAuth: () => set({ user: null, token: null }),
    }),
    {
      name: "user-auth-storage",
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);