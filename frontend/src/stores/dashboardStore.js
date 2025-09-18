import { create } from "zustand";

const useDashboardStore = create((set) => ({
  dashboard: {},

  setDashboard: (data) => {
    set(() => ({ dashboard: data }));
  },
}));

export default useDashboardStore;
