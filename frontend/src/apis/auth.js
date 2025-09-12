import apiWrapper from "@/utils/apiWrapper";
import apiClient from "@/utils/apiClient";
import Apis from "@/utils/apiEndpoints";

export const uploadAvatar = apiWrapper((imageFile) => {
  const formDate = new FormData();
  formDate.append("image", imageFile);

  return apiClient.post(Apis.AUTH.AVATAR, formDate, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
});

export const registerUser = apiWrapper((data) => {
  return apiClient.post(Apis.AUTH.REGISTER, data);
});

export const loginUser = apiWrapper((data) => {
  return apiClient.post(Apis.AUTH.LOGIN, data);
});

export const googleAuth = apiWrapper((code) => {
  return apiClient.get(`${Apis.AUTH.GOOGLE}?code=${code}`);
});
