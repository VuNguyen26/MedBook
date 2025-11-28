import axiosClient from "./axios";
import { API_ROUTES } from "./routes";

const paymentApi = {
  getAll: () => axiosClient.get(API_ROUTES.payments.all),
  create: (data) => axiosClient.post(API_ROUTES.payments.all, data),
  verify: (id) => axiosClient.get(`${API_ROUTES.payments.all}/${id}/verify`),

  // Cập nhật trạng thái thanh toán (chỉ status)
  updateStatus: (id, status) =>
    axiosClient.patch(`${API_ROUTES.payments.all}/${id}/status`, { status }),
};

export default paymentApi;
