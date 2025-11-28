import axiosClient from "./axios";
import { API_ROUTES } from "./routes";

const userApi = {
  register: (data) => axiosClient.post(API_ROUTES.auth.register, data),
  login: (data) => axiosClient.post(API_ROUTES.auth.login, data),
  getProfile: () => axiosClient.get(API_ROUTES.users.profile),
  getAll: () => axiosClient.get(API_ROUTES.users.all),
};

export default userApi;
