import apiWrapper from "@/utils/apiWrapper";
import apiClient from "@/utils/apiClient";
import Apis from "@/utils/apiEndpoints";

export const getDashboard = apiWrapper(() => {
  return apiClient.get(Apis.DASHBOARD);
});
