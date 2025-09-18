import { create } from "zustand";

const useFinancesStore = create((set) => ({
  finances: {},

  setFinances: (data) => {
    set(() => ({ finances: data }));
  },
}));

export default useFinancesStore;
