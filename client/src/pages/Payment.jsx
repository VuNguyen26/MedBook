import { useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { CreditCard, Smartphone, Wallet, Globe } from "lucide-react"

export default function Payment() {
  const { appointmentId } = useParams()
  const location = useLocation()
  const { doctor, service, date, time, fee } = location.state || {}

  const [agree, setAgree] = useState(false)
  const [method, setMethod] = useState("momo")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!agree) {
      toast.error("❌ Bạn cần đồng ý với điều khoản trước khi thanh toán")
      return
    }
    toast.success(`✅ Thanh toán thành công cho lịch hẹn #${appointmentId}`)
  }

  // phí dịch vụ và giảm giá mẫu
  const serviceFee = 20000
  const discount = 50000
  const total = (fee || 0) + serviceFee - discount

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2 text-black">
          Thanh toán đặt lịch khám
        </h1>
        <p className="text-gray-600 mb-6">
          Hoàn tất thanh toán để xác nhận lịch hẹn của bạn
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-3 gap-6 items-start"
        >
          {/* Cột trái */}
          <div className="md:col-span-2 space-y-6">
            {/* 1. Thông tin bệnh nhân */}
            <div className="bg-white rounded-xl shadow p-6 space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-black">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-white text-sm">
                  1
                </span>
                Thông tin bệnh nhân
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    defaultValue="Nguyễn Văn A"
                    required
                    className="mt-1 w-full border border-gray-300 bg-white text-black rounded-lg px-3 py-2 
                               focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Số điện thoại *
                  </label>
                  <input
                    type="text"
                    defaultValue="0912345678"
                    required
                    className="mt-1 w-full border border-gray-300 bg-white text-black rounded-lg px-3 py-2 
                               focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="mt-1 w-full border border-gray-300 bg-white text-black rounded-lg px-3 py-2 
                               focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ngày sinh *
                  </label>
                  <input
                    type="date"
                    required
                    className="mt-1 w-full border border-gray-300 bg-white text-black rounded-lg px-3 py-2 
                               focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                    className="mt-1 w-full border border-gray-300 bg-white text-black rounded-lg px-3 py-2 
                               focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>

            {/* 2. Chi tiết lịch hẹn */}
            <div className="bg-white rounded-xl shadow p-6 space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-black">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-white text-sm">
                  2
                </span>
                Chi tiết lịch hẹn
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-black">
                <p>
                  <span className="font-medium">Mã lịch hẹn:</span>{" "}
                  #{appointmentId}
                </p>
                <p>
                  <span className="font-medium">Bác sĩ:</span>{" "}
                  {doctor?.name || "Chưa chọn"}
                </p>
                <p>
                  <span className="font-medium">Chuyên khoa:</span>{" "}
                  {service?.name || "Chưa chọn"}
                </p>
                <p>
                  <span className="font-medium">Ngày khám:</span>{" "}
                  {date || "Chưa chọn"}
                </p>
                <p>
                  <span className="font-medium">Giờ khám:</span>{" "}
                  {time || "Chưa chọn"}
                </p>
              </div>
            </div>

            {/* 3. Phương thức thanh toán */}
            <div className="bg-white rounded-xl shadow p-6 space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-black">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-white text-sm">
                  3
                </span>
                Phương thức thanh toán
              </h2>
              <div className="space-y-3">
                {/* MoMo */}
                <div
                  onClick={() => setMethod("momo")}
                  className="flex items-center gap-3 border border-gray-300 rounded-lg p-3 cursor-pointer transition hover:border-green-500"
                >
                  <img src="/doctors/momo.png" alt="MoMo" className="w-8 h-8" />
                  <span className="text-black">Ví MoMo (phổ biến)</span>
                </div>

                {/* VNPay */}
                <div
                  onClick={() => setMethod("vnpay")}
                  className="flex items-center gap-3 border border-gray-300 rounded-lg p-3 cursor-pointer transition hover:border-green-500"
                >
                  <img src="/doctors/VNpay.png" alt="VNPay" className="w-8 h-8" />
                  <span className="text-black">VNPay (QR Code)</span>
                </div>

                {/* PayPal */}
                <div
                  onClick={() => setMethod("paypal")}
                  className="flex items-center gap-3 border border-gray-300 rounded-lg p-3 cursor-pointer transition hover:border-green-500"
                >
                  <img src="/doctors/paypal.png" alt="PayPal" className="w-8 h-8" />
                  <span className="text-black">PayPal (thanh toán quốc tế)</span>
                </div>

                {/* Thẻ tín dụng */}
                <div
                  onClick={() => setMethod("card")}
                  className="flex items-center gap-3 border border-gray-300 rounded-lg p-3 cursor-pointer transition hover:border-green-500"
                >
                  <img src="/doctors/visa.png" alt="Visa Mastercard" className="w-12 h-8" />
                  <span className="text-black">
                    Thẻ tín dụng/ghi nợ (Visa, Mastercard, JCB)
                  </span>
                </div>
              </div>
            </div>

            {/* Điều khoản */}
            <div className="bg-white rounded-xl shadow p-6 space-y-4">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm text-gray-700">
                  Tôi đồng ý với{" "}
                  <a href="#" className="text-teal-700 hover:underline">
                    điều khoản sử dụng
                  </a>{" "}
                  và{" "}
                  <a href="#" className="text-teal-700 hover:underline">
                    chính sách bảo mật
                  </a>{" "}
                  của MediCare. Tôi xác nhận rằng thông tin đã cung cấp là chính
                  xác.
                </span>
              </label>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                🔒 Thông tin thanh toán của bạn được mã hóa và bảo mật tuyệt đối
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-900 transition"
              >
                Xác nhận thanh toán
              </button>
            </div>
          </div>

          {/* Cột phải */}
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-lg font-semibold text-black">
              Tóm tắt đơn hàng
            </h2>
            <p className="flex justify-between text-black">
              <span>Khám chuyên khoa {service?.name || "..."}</span>
              <span className="font-medium">
                {fee?.toLocaleString() || "0"}đ
              </span>
            </p>
            <p className="text-sm text-gray-600">{doctor?.name || "BS ..."}</p>
            <p className="text-sm text-gray-600">
              {date || "..."} • {time || "..."}
            </p>
            <hr />
            <p className="flex justify-between text-black">
              <span>Phí khám</span>
              <span>{fee?.toLocaleString() || "0"}đ</span>
            </p>
            <p className="flex justify-between text-black">
              <span>Phí dịch vụ</span>
              <span>{serviceFee.toLocaleString()}đ</span>
            </p>
            <p className="flex justify-between text-green-600 font-medium">
              <span>Giảm giá (Khách hàng mới)</span>
              <span>-{discount.toLocaleString()}đ</span>
            </p>
            <hr />
            <p className="flex justify-between font-semibold text-lg text-black">
              <span>Tổng cộng</span>
              <span>{total.toLocaleString()}đ</span>
            </p>

            <div className="bg-gray-50 p-3 rounded-lg text-sm text-black">
              <p className="font-medium text-teal-700">Đặt lịch thành công!</p>
              <p>
                Bạn sẽ nhận được xác nhận qua SMS và email sau khi thanh toán
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg text-sm text-black">
              <p className="font-medium">Chính sách hủy lịch</p>
              <ul className="list-disc ml-5">
                <li>Miễn phí hủy trước 24 giờ</li>
                <li>Hoàn 50% trong vòng 12 giờ</li>
                <li>Không hoàn tiền trong 6 giờ</li>
              </ul>
            </div>

            <p className="text-sm text-gray-500">📞 Hỗ trợ 24/7: 1900-0009</p>
          </div>
        </form>
      </div>
    </div>
  )
}
