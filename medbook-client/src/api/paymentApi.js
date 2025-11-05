import axiosClient from "./axios";
import { API_ROUTES } from "./routes";

const paymentApi = {
  getAll: () => axiosClient.get(API_ROUTES.payment.all),
  create: (data) => axiosClient.post(API_ROUTES.payment.all, data),
  verify: (id) => axiosClient.get(`${API_ROUTES.payment.all}/${id}/verify`),
};

export default paymentApi;
