import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, CreditCard } from "lucide-react";

export default function FakeGateway() {
  const navigate = useNavigate();
  const url = new URL(window.location.href);

  const paymentId = url.searchParams.get("paymentId") || "N/A";

  const stateEncoded = url.searchParams.get("state");
  let bookingState = null;

  if (stateEncoded) {
    try {
      bookingState = JSON.parse(decodeURIComponent(stateEncoded));
    } catch (e) {
      bookingState = null;
    }
  }

  // Tổng tiền từ bookingState (đúng như Payment.jsx)
  const total = bookingState?.total ?? 0;

  useEffect(() => {
    if (!paymentId || paymentId === "N/A") navigate("/");
  }, []);

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [flipped, setFlipped] = useState(false);

  // Format số thẻ: 1234567890123456 → 1234 5678 9012 3456
  const formatCard = (v) => {
    v = v.replace(/\D/g, "").substring(0, 16);
    return v.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleSuccess = () => {
    const id = bookingState?.appointmentId ?? "";
    navigate("/payment-success/" + id, {
      state: {
        ...bookingState,
        paymentSuccess: true,
      },
    });
  };

  const handleFail = () => {
    const id = bookingState?.appointmentId ?? "";
    navigate("/payment-fail/" + id, {
      state: {
        ...bookingState,
        paymentFail: true,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-lg p-6 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-full mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-xl font-bold text-gray-800">Thanh toán an toàn</h1>
          <p className="text-sm text-gray-600 mt-1">Mã giao dịch: #{paymentId}</p>

          {/* Hiển thị đúng tổng tiền từ bookingState */}
          <p className="text-lg font-semibold text-blue-600 mt-2">
            {total.toLocaleString()} ₫
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-b-2xl shadow-lg p-6 -mt-1 space-y-5">
          {/* Số thẻ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số thẻ
            </label>
            <div className="relative">
              <CreditCard className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full pl-12 pr-4 py-4 bg-gray-800 text-white text-lg font-mono rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formatCard(cardNumber)}
                onChange={(e) =>
                  setCardNumber(e.target.value.replace(/\s/g, ""))
                }
              />
            </div>
          </div>

          {/* Tên chủ thẻ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên chủ thẻ
            </label>
            <input
              type="text"
              placeholder="NGUYEN VAN A"
              className="w-full px-4 py-4 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
          </div>

          {/* Hết hạn + CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hết hạn
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                maxLength={5}
                className="w-full px-4 py-4 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={expiry}
                onChange={(e) => {
                  let v = e.target.value.replace(/\D/g, "").substring(0, 4);
                  if (v.length > 2) v = v.substring(0, 2) + "/" + v.substring(2);
                  setExpiry(v);
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>
              <input
                type="password"
                placeholder="•••"
                maxLength={4}
                className="w-full px-4 py-4 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                value={cvv}
                onChange={(e) =>
                  setCvv(e.target.value.replace(/\D/g, "").substring(0, 4))
                }
                onFocus={() => setFlipped(true)}
                onBlur={() => setFlipped(false)}
              />
            </div>
          </div>

          {/* Nút thanh toán đúng giá */}
          <button
            onClick={handleSuccess}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-purple-700 transition shadow-lg"
          >
            Thanh toán {total.toLocaleString()} ₫
          </button>

          <button
            onClick={handleFail}
            className="w-full py-3 text-gray-500 hover:text-red-600 text-sm font-medium"
          >
            Hủy thanh toán
          </button>

          {/* Footer */}
          <div className="pt-4 text-center text-xs text-gray-500 space-y-1">
            <p>Được bảo mật bởi mã hóa SSL 256-bit</p>
            <div className="flex justify-center gap-6 mt-3 opacity-70">
              <span className="font-bold text-blue-600 text-lg">VISA</span>
              <span className="font-bold text-red-600 text-lg">
                Mastercard
              </span>
              <span className="font-bold text-green-600">NAPAS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
