import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreditCard, Lock } from "lucide-react";

const DEFAULT_PAYMENT_ID = "N/A";

function safeParseState(encoded) {
  if (!encoded) return null;
  try {
    return JSON.parse(decodeURIComponent(encoded));
  } catch {
    return null;
  }
}

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function FakeGateway() {
  const navigate = useNavigate();
  const { search } = useLocation();

  const { paymentId, bookingState, total, appointmentId } = useMemo(() => {
    const params = new URLSearchParams(search);

    const paymentId = params.get("paymentId") ?? DEFAULT_PAYMENT_ID;
    const bookingState = safeParseState(params.get("state"));

    const total = bookingState?.total ?? 0;
    const appointmentId = bookingState?.appointmentId ?? "";

    return { paymentId, bookingState, total, appointmentId };
  }, [search]);

  useEffect(() => {
    if (!paymentId || paymentId === DEFAULT_PAYMENT_ID) navigate("/", { replace: true });
  }, [paymentId, navigate]);

  const [form, setForm] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const [isCvvFocused, setIsCvvFocused] = useState(false);

  const updateForm = useCallback((key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  }, []);

  const handleCardNumberChange = useCallback((e) => {
    // Lưu digits-only để dễ xử lý; hiển thị sẽ format
    const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
    setForm((prev) => ({ ...prev, cardNumber: digits }));
  }, []);

  const handleExpiryChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, expiry: formatExpiry(e.target.value) }));
  }, []);

  const handleCvvChange = useCallback((e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
    setForm((prev) => ({ ...prev, cvv: digits }));
  }, []);

  const goResult = useCallback(
    (type) => {
      const path = type === "success" ? "payment-success" : "payment-fail";
      const flag = type === "success" ? { paymentSuccess: true } : { paymentFail: true };

      navigate(`/${path}/${appointmentId}`, {
        state: { ...bookingState, ...flag },
      });
    },
    [navigate, appointmentId, bookingState]
  );

  const canPay = useMemo(() => {
    const hasNumber = form.cardNumber.length === 16;
    const hasName = form.cardName.trim().length >= 3;
    const hasExpiry = form.expiry.length === 5; // MM/YY
    const hasCvv = form.cvv.length >= 3;
    return hasNumber && hasName && hasExpiry && hasCvv && total > 0;
  }, [form, total]);

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

          <p className="text-lg font-semibold text-blue-600 mt-2">
            {total.toLocaleString()} ₫
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-b-2xl shadow-lg p-6 -mt-1 space-y-5">
          {/* Card number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Số thẻ</label>

            <div className="relative">
              <CreditCard className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <input
                type="text"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="1234 5678 9012 3456"
                className="w-full pl-12 pr-4 py-4 bg-gray-800 text-white text-lg font-mono rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formatCardNumber(form.cardNumber)}
                onChange={handleCardNumberChange}
              />
            </div>
          </div>

          {/* Card holder */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tên chủ thẻ</label>
            <input
              type="text"
              autoComplete="cc-name"
              placeholder="NGUYEN VAN A"
              className="w-full px-4 py-4 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
              value={form.cardName}
              onChange={updateForm("cardName")}
            />
          </div>

          {/* Expiry + CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hết hạn</label>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM/YY"
                maxLength={5}
                className="w-full px-4 py-4 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.expiry}
                onChange={handleExpiryChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
              <input
                type="password"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="•••"
                maxLength={4}
                className="w-full px-4 py-4 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                value={form.cvv}
                onChange={handleCvvChange}
                onFocus={() => setIsCvvFocused(true)}
                onBlur={() => setIsCvvFocused(false)}
              />
            </div>
          </div>

          {/* Primary action */}
          <button
            onClick={() => goResult("success")}
            disabled={!canPay}
            className={[
              "w-full py-4 text-white font-bold text-lg rounded-xl transition shadow-lg",
              canPay
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                : "bg-gray-300 cursor-not-allowed",
            ].join(" ")}
          >
            Thanh toán {total.toLocaleString()} ₫
          </button>

          {/* Secondary action */}
          <button
            onClick={() => goResult("fail")}
            className="w-full py-3 text-gray-500 hover:text-red-600 text-sm font-medium"
          >
            Hủy thanh toán
          </button>

          {/* (Optional) just to keep your previous flipped logic meaningfully used */}
          {isCvvFocused ? (
            <p className="text-xs text-gray-500 text-center">Đang nhập CVV…</p>
          ) : null}

          {/* Footer */}
          <div className="pt-4 text-center text-xs text-gray-500 space-y-1">
            <p>Được bảo mật bởi mã hóa SSL 256-bit</p>
            <div className="flex justify-center gap-6 mt-3 opacity-70">
              <span className="font-bold text-blue-600 text-lg">VISA</span>
              <span className="font-bold text-red-600 text-lg">Mastercard</span>
              <span className="font-bold text-green-600">NAPAS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
