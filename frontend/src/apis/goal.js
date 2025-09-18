import apiWrapper from "@/utils/apiWrapper";
import apiClient from "@/utils/apiClient";
import Apis from "@/utils/apiEndpoints";

export const getGoals = apiWrapper(
  ({ search, category, sort, status } = {}) => {
    const params = new URLSearchParams({ sort });

    if (search) {
      params.append("search", search);
    }

    if (category && category !== "all") {
      params.append("category", category);
    }

    if (status) {
      params.append("status", status);
    }

    return apiClient.get(`${Apis.GOAL}?${params.toString()}`);
  }
);

export const addGoal = apiWrapper((data) => {
  return apiClient.post(Apis.GOAL, { name: data.goalName, ...data });
});

export const editGoal = apiWrapper((id, data) => {
  return apiClient.put(`${Apis.GOAL}/${id}`, { name: data.goalName, ...data });
});

export const deleteGoal = apiWrapper((id) => {
  return apiClient.delete(`${Apis.GOAL}/${id}`);
});

export const addGoalTransaction = apiWrapper((id, data) => {
  return apiClient.post(`${Apis.GOAL}/${id}/transactions`, data);
});
