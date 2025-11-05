import axiosClient from "./axios";
import { API_ROUTES } from "./routes";

const doctorApi = {
  getAll: () => axiosClient.get(API_ROUTES.doctor.all),
  getById: (id) => axiosClient.get(`${API_ROUTES.doctor.all}/${id}`),
};

export default doctorApi;
