import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create()(
  persist(
    (set) => ({
      user: {},

      login: (data) => {
        set(() => ({ user: data }));
      },

      logout: () => {
        set(() => ({ user: {} }));
      },
    }),
    { name: "karma-user" }
  )
);

export default useAuthStore;
