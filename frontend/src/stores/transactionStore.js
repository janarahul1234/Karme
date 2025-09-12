import { create } from "zustand";
import { addTransaction, deleteTransaction } from "@/apis/transaction";

const useTransactionStore = create((set) => ({
  transactions: [],

  setTransactions: (data) => {
    set(() => ({ transactions: data }));
  },

  addTransaction: async (data) => {
    const response = await addTransaction(data);
    set((state) => ({ transactions: [response.data, ...state.transactions] }));
  },

  deleteTransaction: async (id) => {
    const response = await deleteTransaction(id);
    set((state) => ({
      transactions: state.transactions.filter(
        (transaction) => transaction._id !== response.data._id
      ),
    }));
  },
}));

export default useTransactionStore;
