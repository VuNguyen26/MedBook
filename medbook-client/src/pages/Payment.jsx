import { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  User,
  Phone,
  Calendar,
  MapPin,
  Mail,
  Stethoscope,
  Clock,
  CreditCard,
  ShieldCheck,
  ChevronRight,
  HeartPulse,
} from "lucide-react";

export default function Payment() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  let { doctor, service, date, time, fee, total: totalFromState } =
    location.state || {};

  if (!location.state) {
    navigate("/");
    return null;
  }

  const serviceFee = 20000;
  const discount = 50000;

  if (!fee && totalFromState !== undefined) {
    fee = totalFromState + discount - serviceFee;
  }

  const total = (fee || 0) + serviceFee - discount;

  const [agree, setAgree] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!agree) {
      toast.error("Bạn cần đồng ý với điều khoản trước khi thanh toán");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const payload = {
        appointmentId: Number(appointmentId),
        amount: total,
        success: true,
      };

      const res = await axios.post(
        "http://localhost:8080/api/payments/fake",
        payload,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );

      const data = res.data;
      if (!data || !data.payUrl) {
        toast.error("Không tạo được giao dịch thanh toán");
        return;
      }

      const bookingState = { appointmentId: Number(appointmentId), doctor, service, date, time, fee, total };
      const encoded = encodeURIComponent(JSON.stringify(bookingState));
      window.location.href = `${data.payUrl}&state=${encoded}`;
    } catch (err) {
      toast.error("Thanh toán thất bại, vui lòng thử lại!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-8 shadow-lg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4">
            <HeartPulse className="w-10 h-10" />
            <div>
              <h1 className="text-3xl font-bold">Thanh toán đặt lịch khám bệnh</h1>
              <p className="text-cyan-100 mt-1">Vui lòng kiểm tra thông tin và hoàn tất thanh toán an toàn</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <form onSubmit={handlePayment} className="grid lg:grid-cols-3 gap-8">

          {/* ==================== LEFT COLUMN ==================== */}
          <div className="lg:col-span-2 space-y-8">

            {/* 1. Thông tin bệnh nhân */}
            <div className="bg-white rounded-2xl shadow-lg border border-cyan-100 overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 flex items-center gap-3">
                <div className="bg-white/20 rounded-full p-2">
                  <User className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold">Thông tin bệnh nhân</h2>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="relative">
                    <User className="absolute left-4 top-4 text-cyan-600 w-5 h-5" />
                    <input
                      defaultValue="Nguyễn Văn A"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                      placeholder="Họ và tên"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-4 top-4 text-cyan-600 w-5 h-5" />
                    <input
                      defaultValue="0912345678"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                      placeholder="Số điện thoại"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-4 text-cyan-600 w-5 h-5" />
                    <input
                      type="email"
                      placeholder="email@example.com"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                    />
                  </div>

                  <div className="relative">
                    <Calendar className="absolute left-4 top-4 text-cyan-600 w-5 h-5" />
                    <input
                      type="date"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>

                  <div className="relative md:col-span-2">
                    <MapPin className="absolute left-4 top-12 text-cyan-600 w-5 h-5" />
                    <textarea
                      rows={2}
                      placeholder="Địa chỉ (không bắt buộc)"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Chi tiết lịch hẹn */}
            <div className="bg-white rounded-2xl shadow-lg border border-cyan-100 overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-4 flex items-center gap-3">
                <Stethoscope className="w-7 h-7 bg-white/20 p-1 rounded" />
                <h2 className="text-xl font-semibold">Chi tiết lịch hẹn</h2>
              </div>
              <div className="p-8">
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 space-y-4 border border-cyan-200">
                  <div className="flex justify-between"><strong>Mã lịch hẹn:</strong> <span className="text-cyan-700 font-mono">#{appointmentId}</span></div>
                  <div className="flex justify-between"><strong>Bác sĩ:</strong> <span className="text-blue-700">{doctor?.name}</span></div>
                  <div className="flex justify-between"><strong>Chuyên khoa:</strong> <span>{service?.name}</span></div>
                  <div className="flex items-center justify-between">
                    <strong>Ngày khám:</strong>
                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-cyan-600" /> {date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <strong>Giờ khám:</strong>
                    <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-cyan-600" /> {time}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Phương thức thanh toán */}
            <div className="bg-white rounded-2xl shadow-lg border border-cyan-100 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 flex items-center gap-3">
                <CreditCard className="w-7 h-7" />
                <h2 className="text-xl font-semibold">Phương thức thanh toán</h2>
              </div>
              <div className="p-8">
                <div className="border-2 border-dashed border-cyan-300 rounded-xl p-6 text-center bg-cyan-50">
                  <div className="flex flex-col items-center gap-4">
                    <div className="bg-gradient-to-br from-emerald-500 to-cyan-600 text-white p-4 rounded-full">
                      <ShieldCheck className="w-12 h-12" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-cyan-800">Thanh toán giả lập (Demo)</p>
                      <p className="text-sm text-gray-600 mt-1">Mô phỏng thanh toán an toàn trong môi trường thử nghiệm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Đồng ý điều khoản & Nút thanh toán */}
            <div className="bg-white rounded-2xl shadow-lg border border-cyan-100 p-8">
              <label className="flex items-start gap-4 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="w-6 h-6 text-cyan-600 rounded focus:ring-cyan-500 border-gray-300 mt-1"
                />
                <span className="text-gray-700 leading-relaxed">
                  Tôi đã đọc và đồng ý với <span className="text-cyan-600 font-medium underline">Điều khoản dịch vụ</span> và <span className="text-cyan-600 font-medium underline">Chính sách bảo mật</span> của phòng khám.
                </span>
              </label>

              <button
                type="submit"
                disabled={!agree}
                className="mt-8 w-full py-5 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold text-xl rounded-xl shadow-lg transform transition hover:scale-[1.02] disabled:scale-100 flex items-center justify-center gap-3"
              >
                <ShieldCheck className="w-6 h-6" />
                Xác nhận thanh toán • {total.toLocaleString()}₫
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* ==================== RIGHT SUMMARY ==================== */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-cyan-100 overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white px-8 py-5">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <HeartPulse className="w-7 h-7" />
                  Tóm tắt đơn hàng
                </h3>
              </div>

              <div className="p-8 space-y-5 text-gray-800">
                <div>
                  <p className="text-2xl font-bold text-cyan-700">{doctor?.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{service?.name}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mt-2">
                    <Calendar className="w-4 h-4" /> {date} • <Clock className="w-4 h-4" /> {time}
                  </p>
                </div>

                <div className="border-t pt-5 space-y-4">
                  <div className="flex justify-between text-lg">
                    <span>Phí khám bệnh</span>
                    <span className="font-semibold">{fee?.toLocaleString()}₫</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí dịch vụ</span>
                    <span>{serviceFee.toLocaleString()}₫</span>
                  </div>
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Khuyến mãi</span>
                    <span>-{discount.toLocaleString()}₫</span>
                  </div>
                </div>

                <div className="border-t-2 border-dashed border-cyan-200 pt-5">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">Tổng cộng</span>
                    <span className="text-3xl font-extrabold text-cyan-600">
                      {total.toLocaleString()}₫
                    </span>
                  </div>
                </div>

                <div className="bg-cyan-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-cyan-800 font-medium flex items-center justify-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    Thanh toán an toàn • Bảo mật 100%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}