import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      error: null,
      loading: false,

      login: async ({ username, password }) => {
        set({ loading: true, error: null });
        try {
          const res = await fetch('http://localhost:8000/series/api/v1/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          });

          if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.detail || 'Error al iniciar sesión');
          }

          const data = await res.json();
          set({
            user: data.user || { username }, // ajusta si el backend retorna user
            token: data.token || data.access_token, // depende de tu backend
            loading: false,
          });
        } catch (err) {
          set({ error: err.message, loading: false });
        }
      },

      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: 'auth', // localStorage key
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);