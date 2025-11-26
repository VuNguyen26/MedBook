import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CheckCircle, Calendar, Clock, User, ArrowLeft } from "lucide-react";

export default function PaymentSuccess() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { doctor, service, date, time, total, paymentSuccess } =
    location.state || {};
  const [qrCode, setQrCode] = useState(null);

  // Nếu F5 → không có state → quay về home
  useEffect(() => {
    if (!location.state) navigate("/");
  }, [location.state, navigate]);

  // Toast anti-duplicate
  useEffect(() => {
    if (paymentSuccess) {
      toast.success("🎉 Thanh toán thành công!", {
        toastId: "payment-success",
      });
    }
  }, []);

  // Cập nhật trạng thái PAID
  useEffect(() => {
    async function updatePayment() {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://localhost:8080/api/appointments/${appointmentId}/paid`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({}),
          }
        );

        if (!res.ok) {
          console.error("❌ API trả lỗi:", res.status);
        } else {
          console.log("✔ Đã cập nhật trạng thái PAID thành công");
        }
      } catch (err) {
        console.error("❌ Lỗi cập nhật thanh toán:", err);
      }
    }

    if (paymentSuccess) updatePayment();
  }, [appointmentId, paymentSuccess]);

  // Lấy QR
  useEffect(() => {
    async function fetchQR() {
      try {
        const res = await fetch(
          `http://localhost:8080/api/appointments/${appointmentId}/qr`
        );
        const base64 = await res.text();
        setQrCode(`data:image/png;base64,${base64}`);
      } catch (err) {
        console.error("QR load failed:", err);
      }
    }
    fetchQR();
  }, [appointmentId]);

  if (!location.state) return null;

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-xl p-10 text-center">

        <CheckCircle className="mx-auto text-green-600 w-20 h-20 mb-6" />

        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Thanh toán thành công!
        </h1>
        <p className="text-gray-600 mb-6">
          Lịch hẹn của bạn đã được xác nhận. Chúng tôi sẽ gửi thông báo qua SMS và email.
        </p>

        <div className="bg-gray-50 rounded-xl p-6 text-left space-y-4 border border-gray-200">

          <p className="flex items-center gap-3 text-gray-800">
            <User className="w-5 h-5 text-green-600" />
            <span>
              <strong>Bác sĩ:</strong> {doctor?.name}
            </span>
          </p>

          <p className="flex items-center gap-3 text-gray-800">
            <Calendar className="w-5 h-5 text-green-600" />
            <span>
              <strong>Ngày khám:</strong> {date}
            </span>
          </p>

          <p className="flex items-center gap-3 text-gray-800">
            <Clock className="w-5 h-5 text-green-600" />
            <span>
              <strong>Giờ khám:</strong> {time}
            </span>
          </p>

          <p className="flex items-center gap-3 text-gray-800">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span>
              <strong>Dịch vụ:</strong> {service?.name}
            </span>
          </p>

          <p className="text-gray-800">
            <strong>Mã lịch hẹn:</strong> #{appointmentId}
          </p>

          {/* QR CHECK-IN */}
          <div className="text-center mt-6">
            <p className="font-semibold text-gray-700 mb-3">Mã QR Check-in:</p>

            {qrCode ? (
              <img
                src={qrCode}
                alt="QR Code"
                className="mx-auto w-48 h-48 border rounded-xl shadow"
              />
            ) : (
              <p className="text-gray-500">Đang tải mã QR...</p>
            )}
          </div>

          <hr />

          <p className="text-lg font-semibold text-green-700 flex justify-between">
            <span>Tổng thanh toán:</span>
            <span>{total?.toLocaleString()}đ</span>
          </p>
        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Về trang chủ
          </button>

          <button
            onClick={() => navigate("/patient")}
            className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            Xem lịch đã đặt
          </button>
        </div>
      </div>
    </div>
  );
}
