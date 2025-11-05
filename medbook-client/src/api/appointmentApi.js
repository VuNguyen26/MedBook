import axiosClient from "./axios";
import { API_ROUTES } from "./routes";

const appointmentApi = {
  getAll: () => axiosClient.get(API_ROUTES.appointment.all),
  create: (data) => axiosClient.post(API_ROUTES.appointment.all, data),
  getById: (id) => axiosClient.get(`${API_ROUTES.appointment.all}/${id}`),
};

export default appointmentApi;
