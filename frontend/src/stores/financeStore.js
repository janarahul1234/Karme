import { create } from "zustand";

const useFinanceStore = create((set) => ({
  finance: {},

  setFinance: (data) => {
    set(() => ({ finance: data }));
  },
}));

export default useFinanceStore;
