import apiWrapper from "@/utils/apiWrapper";
import apiClient from "@/utils/apiClient";
import Apis from "@/utils/apiEndpoints";

export const getGoals = apiWrapper(() => {
  return apiClient.get(Apis.GOAL);
});

export const addGoal = apiWrapper((data) => {
  return apiClient.post(Apis.GOAL, { name: data.goalName, ...data });
});

export const addSaving = apiWrapper((id, data) => {
  return apiClient.post(`${Apis.GOAL}/${id}/savings`, data);
});

export const editGoal = apiWrapper((id, data) => {
  return apiClient.put(`${Apis.GOAL}/${id}`, { name: data.goalName, ...data });
});

export const deleteGoal = apiWrapper((id) => {
  return apiClient.delete(`${Apis.GOAL}/${id}`);
});
