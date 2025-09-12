export const BASE_URL = "http://localhost:3000/api";

const Apis = {
  AUTH: {
    AVATAR: "/auth/avatar",
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    GOOGLE: "/auth/google",
  },
  GOAL: "/goals",
  TRANSACTION: "/transactions",
};

Object.freeze(Apis);

export default Apis;
