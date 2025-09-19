export const BASE_URL = "https://karme-backend.onrender.com/api";

const Apis = {
  AUTH: {
    AVATAR: "/auth/avatar",
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    GOOGLE: "/auth/google",
    ME: "/auth/me",
  },
  GOAL: "/goals",
  TRANSACTION: "/transactions",
  DASHBOARD: "/dashboard",
  FINANCES: "/finances",
};

Object.freeze(Apis);

export default Apis;
