import axiosClient from "./axios";
import { API_ROUTES } from "./routes";

const appointmentApi = {
  getAll: () => axiosClient.get(API_ROUTES.appointments.all),
  create: (data) => axiosClient.post(API_ROUTES.appointments.all, data),
  getById: (id) => axiosClient.get(`${API_ROUTES.appointments.all}/${id}`),
};

export default appointmentApi;
