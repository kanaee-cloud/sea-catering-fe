import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAdminAuthStore = create(
  persist(
    (set) => ({
      admin: null,
      token: null,
      setAdmin: (admin) => set({ admin }),
      setToken: (token) => set({ token }),
      clearAuth: () => set({ admin: null, token: null }),
    }),
    {
      name: "admin-auth-storage",
      partialize: (state) => ({ token: state.token }),
    }
  )
);