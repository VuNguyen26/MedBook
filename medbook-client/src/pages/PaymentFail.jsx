import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { XCircle, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

export default function PaymentFail() {
  const { appointmentId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const bookingState = location.state || {};
  const { doctor, date, time, paymentFail } = bookingState;

  // Prevent duplicate toast
  const shownRef = useRef(false);

  // =========================
  // UPDATE BE → ĐÁNH DẤU PAYMENT FAILED
  // =========================
  useEffect(() => {
    async function updateFailStatus() {
      try {
        const token = localStorage.getItem("token");

        await fetch(`http://localhost:8080/api/appointments/${appointmentId}/fail`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

      } catch (err) {
        console.error("❌ Lỗi đánh dấu FAIL:", err);
      }
    }

    updateFailStatus();
  }, [appointmentId]);

  // =========================
  // Toast lỗi
  // =========================
  useEffect(() => {
    if (paymentFail && !shownRef.current) {
      shownRef.current = true;
      toast.error("❌ Thanh toán thất bại!");
    }
  }, [paymentFail]);

  // =========================
  // Retry thanh toán
  // =========================
  const handleRetry = () => {
    navigate(`/payment/${appointmentId}`, {
      state: {
        ...bookingState,
        retry: true,
      },
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-xl p-10 text-center">

        <XCircle className="mx-auto text-red-600 w-20 h-20 mb-6" />

        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Thanh toán thất bại!
        </h1>

        <p className="text-gray-600 mb-6">
          Giao dịch không thành công. Vui lòng thử lại hoặc chọn phương thức thanh toán khác.
        </p>

        <div className="bg-gray-50 rounded-xl p-6 text-left space-y-4 border border-gray-200">
          {doctor && <p><strong>Bác sĩ:</strong> {doctor.name}</p>}
          {date && <p><strong>Ngày khám:</strong> {date}</p>}
          {time && <p><strong>Giờ khám:</strong> {time}</p>}
          <p><strong>Mã lịch hẹn:</strong> #{appointmentId}</p>
        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={handleRetry}
            className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition"
          >
            Thử thanh toán lại
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gray-200 text-black rounded-xl hover:bg-gray-300 transition flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Về trang chủ
          </button>
        </div>

      </div>
    </div>
  );
}
