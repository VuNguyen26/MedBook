import axiosClient from "./axios";
import { API_ROUTES } from "./routes";

const patientApi = {
  getAll: () => axiosClient.get(API_ROUTES.patients.all),
  getById: (id) => axiosClient.get(`${API_ROUTES.patients.all}/${id}`),
};

export default patientApi;
