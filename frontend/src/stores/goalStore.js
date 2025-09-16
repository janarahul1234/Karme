import { create } from "zustand";
import { addGoal, editGoal, deleteGoal, addGoalTransaction } from "@/apis/goal";

const useGoalStore = create((set) => ({
  goals: [],

  setGoals: (data = []) => {
    set(() => ({ goals: data }));
  },

  addGoal: async (data = {}) => {
    const response = await addGoal(data);
    set((state) => ({ goals: [response.data, ...state.goals] }));
    return response.data;
  },

  editGoal: async (id, data = {}) => {
    const response = await editGoal(id, data);
    set((state) => ({
      goals: state.goals.map((goal) =>
        goal._id === response.data._id ? response.data : goal
      ),
    }));
    return response.data;
  },

  deleteGoal: async (id) => {
    const response = await deleteGoal(id);
    set((state) => ({
      goals: state.goals.filter((goal) => goal._id !== response.data._id),
    }));
    return response.data;
  },

  addGoalTransaction: async (id, data = {}) => {
    const response = await addGoalTransaction(id, data);
    set((state) => ({
      goals: state.goals.map((goal) =>
        goal._id === response.data._id ? response.data : goal
      ),
    }));
    return response.data;
  },
}));

export default useGoalStore;
