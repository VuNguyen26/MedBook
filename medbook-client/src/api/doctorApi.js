import axiosClient from "./axios";
import { API_ROUTES } from "./routes";

const doctorApi = {
  getAll: () => axiosClient.get(API_ROUTES.doctors.all),
  getById: (id) => axiosClient.get(`${API_ROUTES.doctors.all}/${id}`),
};

export default doctorApi;
