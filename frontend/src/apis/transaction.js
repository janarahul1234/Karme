import apiWrapper from "@/utils/apiWrapper";
import apiClient from "@/utils/apiClient";
import Apis from "@/utils/apiEndpoints";

export const getTransactions = apiWrapper(() => {
  return apiClient.get(Apis.TRANSACTION);
});

export const addTransaction = apiWrapper((data) => {
  return apiClient.post(Apis.TRANSACTION, data);
});

export const deleteTransaction = apiWrapper((id) => {
  return apiClient.delete(`${Apis.TRANSACTION}/${id}`);
});
