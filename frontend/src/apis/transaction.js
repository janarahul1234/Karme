import apiWrapper from "@/utils/apiWrapper";
import apiClient from "@/utils/apiClient";
import Apis from "@/utils/apiEndpoints";

export const getTransactions = apiWrapper(({ type, sort } = {}) => {
  const params = new URLSearchParams({ sort });

  if (type && type !== "all") {
    params.append("type", type);
  }

  return apiClient.get(`${Apis.TRANSACTION}?${params.toString()}`);
});

export const addTransaction = apiWrapper((data) => {
  return apiClient.post(Apis.TRANSACTION, data);
});

export const deleteTransaction = apiWrapper((id) => {
  return apiClient.delete(`${Apis.TRANSACTION}/${id}`);
});
