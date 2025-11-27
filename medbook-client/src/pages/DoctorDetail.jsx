import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import {
  Clock,
  MapPin,
  Star,
  Users,
  Award,
  CheckCircle,
  Send,
  ChevronDown,
  Calendar,
  User,
  Building2,
  Phone,
} from "lucide-react";

import { api } from "../store/api.js";
import { auth } from "../store/auth";

// ================================
// Booking Panel (component con)
// ================================
const BookingPanel = ({
  services,
  serviceId,
  setServiceId,
  selectedSlot,
  setSelectedSlot,
  date,
  setDate,
  selectedDateLabel,
  setSelectedDateLabel,
  currentTime,
  handleBook,
  doctor,
}) => {
  const today = dayjs();
  const [showDropdown, setShowDropdown] = useState(false);
  const [slots, setSlots] = useState([]); // slot lấy từ backend

  // Danh sách 7 ngày
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = today.add(i, "day");
    return {
      key: `d${i}`,
      label: i === 0 ? "Hôm nay" : i === 1 ? "Ngày mai" : d.format("DD/MM (dd)"),
      value: d.format("YYYY-MM-DD"),
      full: d,
    };
  });

  // Service đang chọn
  const selectedService = services.find(
    (s) => String(s.id) === String(serviceId)
  );

  // ================================
  // API thật: lấy slot từ backend
  // ================================
  const fetchSlots = async () => {
    if (!doctor?.id || !selectedService) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8080/api/appointments/slots",
        {
          params: {
            doctorId: doctor.id,
            date: date,
            duration: selectedService.duration_minutes,
          },
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      setSlots(res.data || []);
    } catch (err) {
      console.error("Lỗi tải slot:", err);
      setSlots([]);
    }
  };

  // Gọi API mỗi khi ngày hoặc dịch vụ thay đổi
  useEffect(() => {
    fetchSlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctor, date, serviceId]);

  // Lọc slot (ẩn slot đã qua nếu là hôm nay)
  const filteredSlots = useMemo(() => {
    return slots.filter((s) => {
      const slotTime = dayjs(s.start_at);
      const selectedDay = dayjs(date);
      const now = currentTime;

      if (selectedDay.isSame(now, "day")) {
        return slotTime.isAfter(now);
      }
      return true;
    });
  }, [slots, currentTime, date]);

  // Chia sáng / chiều
  const morning = filteredSlots.filter((s) => dayjs(s.start_at).hour() < 12);
  const afternoon = filteredSlots.filter((s) => dayjs(s.start_at).hour() >= 12);

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 p-8 sticky top-6 space-y-7">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Đặt lịch khám</h2>
        <div className="flex items-center gap-2 text-blue-600 text-sm font-medium mt-2">
          <Clock className="w-4 h-4" />
          {currentTime.format("HH:mm:ss")} • {currentTime.format("DD/MM/YYYY")}
        </div>
      </div>

      {/* Loại khám */}
      <div>
        <label className="text-sm font-bold text-gray-900">Loại dịch vụ</label>
        <div className="mt-3 space-y-3">
          {services.map((s) => (
            <button
              key={s.id}
              onClick={() => setServiceId(s.id)}
              className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                String(serviceId) === String(s.id)
                  ? "border-blue-600 bg-blue-50 text-blue-900 shadow-md"
                  : "border-gray-200 hover:border-blue-300 bg-gray-50"
              }`}
            >
              <div className="font-semibold">{s.name}</div>
              <div className="text-xs text-gray-600 mt-1">
                {s.duration_minutes} phút •{" "}
                {s.fee.toLocaleString("vi-VN")}₫
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Ngày khám */}
      <div>
        <label className="text-sm font-bold text-gray-900">Ngày khám</label>
        <div className="mt-3 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {days.slice(0, 2).map((d) => (
              <button
                key={d.key}
                onClick={() => {
                  setDate(d.value);
                  setSelectedDateLabel(d.label);
                }}
                className={`py-3 rounded-xl font-semibold text-sm transition-all ${
                  date === d.value
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-blue-50 text-blue-800 hover:bg-blue-100"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full px-5 py-3 rounded-xl bg-blue-50 border-2 border-blue-200 flex justify-between items-center font-medium hover:bg-blue-100 transition"
            >
              <span>{selectedDateLabel}</span>
              <ChevronDown
                className={`w-5 h-5 transition ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border-2 border-blue-200 overflow-hidden z-30">
                {days.slice(2).map((d) => (
                  <button
                    key={d.key}
                    onClick={() => {
                      setDate(d.value);
                      setSelectedDateLabel(d.label);
                      setShowDropdown(false);
                    }}
                    className={`w-full px-5 py-3 text-left hover:bg-blue-50 transition ${
                      date === d.value
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Khung giờ */}
      <div className="space-y-5">
        <label className="text-sm font-bold text-gray-900">Khung giờ trống</label>
        <div className="max-h-64 overflow-y-auto space-y-6 pr-1">
          {morning.length > 0 && (
            <div>
              <div className="text-xs font-bold text-blue-700 mb-3">Buổi sáng</div>
              <div className="grid grid-cols-3 gap-3">
                {morning.map((slot, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-3 rounded-lg text-sm font-bold transition-all ${
                      selectedSlot?.start_at === slot.start_at
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200"
                    }`}
                  >
                    {dayjs(slot.start_at).format("HH:mm")}
                  </button>
                ))}
              </div>
            </div>
          )}

          {afternoon.length > 0 && (
            <div>
              <div className="text-xs font-bold text-blue-700 mb-3">Buổi chiều</div>
              <div className="grid grid-cols-3 gap-3">
                {afternoon.map((slot, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-3 rounded-lg text-sm font-bold transition-all ${
                      selectedSlot?.start_at === slot.start_at
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200"
                    }`}
                  >
                    {dayjs(slot.start_at).format("HH:mm")}
                  </button>
                ))}
              </div>
            </div>
          )}

          {slots.length === 0 && (
            <p className="text-center text-gray-500 py-6">
              Không có lịch trống trong ngày này
            </p>
          )}
        </div>
      </div>

      {/* Thông tin đã chọn */}
      {selectedSlot && (
        <div className="bg-green-50 border-2 border-green-400 rounded-xl p-4">
          <p className="text-sm font-bold text-green-800 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Đã chọn: {dayjs(selectedSlot.start_at).format("HH:mm")} →{" "}
            {dayjs(selectedSlot.start_at)
              .add(selectedService?.duration_minutes || 30, "minute")
              .format("HH:mm")}
          </p>
        </div>
      )}

      {/* Nút đặt lịch */}
      <button
        onClick={handleBook}
        disabled={!selectedSlot || !serviceId}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${
          selectedSlot && serviceId
            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:scale-[1.02]"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {selectedSlot && serviceId
          ? "Xác nhận đặt lịch ngay"
          : "Vui lòng chọn dịch vụ & giờ khám"}
      </button>
    </div>
  );
};

// ================================
// Doctor Detail Page
// ================================
export default function DoctorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const user = auth.getCurrentUser();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [activeTab, setActiveTab] = useState("overview");

  // Review state (backend + fallback demo)
  const [reviews, setReviews] = useState([]);
  const fallbackReviews = [
    {
      id: 1,
      author: "Nguyễn Thị B",
      rating: 5,
      text: "Bác sĩ rất tận tình, khám chi tiết. Sẽ tái khám lần sau!",
      date: "2024-11-20",
    },
    {
      id: 2,
      author: "Trần Văn C",
      rating: 4,
      text: "Khám tốt, nhân viên thân thiện. Thời gian chờ hơi lâu.",
      date: "2024-11-18",
    },
    {
      id: 3,
      author: "Lê Thị D",
      rating: 5,
      text: "Rất hài lòng với dịch vụ. Bác sĩ giải thích rõ tình trạng bệnh.",
      date: "2024-11-15",
    },
  ];
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  // Booking state
  const services = api.getServices() || [];
  const [serviceId, setServiceId] = useState(services[0]?.id || "");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [selectedDateLabel, setSelectedDateLabel] = useState("Hôm nay");

  // Load doctor
  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/doctors/${id}`
        );
        setDoctor(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // Đảm bảo serviceId có giá trị khi services load xong
  useEffect(() => {
    if (services.length > 0 && !serviceId) {
      setServiceId(services[0].id);
    }
  }, [services, serviceId]);

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(dayjs()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Load reviews từ backend (nếu có)
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/appointments/doctor/${id}/reviews`
        );
        setReviews(res.data || []);
      } catch (err) {
        console.error("Lỗi tải reviews:", err);
        setReviews([]);
      }
    };
    loadReviews();
  }, [id]);

  // Submit review (hiện tại chỉ push local, không lưu backend)
  const handleSubmitReview = () => {
    if (!reviewText.trim()) return alert("Vui lòng nhập nội dung đánh giá");
    const newReview = {
      id: Date.now(),
      author: user?.name || "Khách",
      rating: reviewRating,
      text: reviewText,
      date: dayjs().format("YYYY-MM-DD"),
    };
    setReviews((prev) => [newReview, ...prev]);
    setReviewText("");
    setReviewRating(5);
  };

  // Book appointment
  const handleBook = async () => {
    if (!user)
      return navigate("/login", { state: { from: location.pathname } });
    if (!serviceId || !selectedSlot)
      return alert("Vui lòng chọn đầy đủ thông tin");

    try {
      const token = localStorage.getItem("token");

      const dateTime = dayjs(selectedSlot.start_at);
      // BE dùng LocalDate + LocalTime
      const appointmentDate = dateTime.format("YYYY-MM-DD");
      const appointmentTime = dateTime.format("HH:mm:ss");

      const res = await axios.post(
        "http://localhost:8080/api/appointments",
        {
          doctorId: Number(doctor?.id), // dùng chính id từ API doctor
          serviceId: Number(serviceId),
          appointmentDate,
          appointmentTime,
          status: "PENDING",
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      navigate(`/payment/${res.data.id}`, {
        state: {
          doctor,
          service: services.find((s) => s.id === Number(serviceId)),
          date,
          time: dateTime.format("HH:mm"),
          fee:
            services.find((s) => s.id === Number(serviceId))?.fee || 0,
        },
      });
    } catch (err) {
      console.error(err);
      alert("Đặt lịch thất bại. Vui lòng thử lại.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin bác sĩ...</p>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-600 text-xl font-medium">
        Không tìm thấy bác sĩ
      </div>
    );
  }

  const fallback = {
    clinic: "Phòng khám Đa khoa Quốc tế",
    address: "273 An Dương Vương, Quận 5, TP.HCM",
    phone: "1900 123 456",
    qualifications: [
      "Tiến sĩ Y khoa",
      "Chứng chỉ Tim mạch Quốc tế",
      "Hội viên Hội Tim mạch Việt Nam",
    ],
    rating: 4.9,
    reviewsCount: 312,
    experience: 15,
  };

  const listReviews = reviews.length > 0 ? reviews : fallbackReviews;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Back button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition"
          >
            ← Quay lại danh sách bác sĩ
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left: Info + Tabs */}
          <div className="lg:col-span-2 space-y-8">
            {/* Doctor Hero Card */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-blue-100">
              <div className="h-48 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
              <div className="px-10 pb-10 -mt-24">
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
                  <img
                    src={doctor.imageUrl || "/default-doctor.png"}
                    alt={doctor.name}
                    className="w-44 h-44 rounded-3xl border-8 border-white shadow-2xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h1 className="text-4xl font-bold text-gray-900">
                        {doctor.title || "BS"} {doctor.name}
                      </h1>
                      <CheckCircle className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-xl font-semibold text-blue-600 mb-6">
                      {doctor.specialty || "Chuyên khoa Tim mạch"}
                    </p>

                    <div className="grid grid-cols-3 gap-6">
                      <div className="flex items-center gap-3">
                        <Award className="w-6 h-6 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">Kinh nghiệm</p>
                          <p className="font-bold text-gray-900">
                            {doctor.experience || fallback.experience} năm
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                        <div>
                          <p className="text-sm text-gray-600">Đánh giá</p>
                          <p className="font-bold text-gray-900">
                            {(doctor.rating || fallback.rating).toFixed(1)} (
                            {doctor.reviewsCount || fallback.reviewsCount})
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-6 h-6 text-green-600" />
                        <div>
                          <p className="text-sm text-gray-600">Trạng thái</p>
                          <p className="font-bold text-green-600">
                            Đang nhận bệnh
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="flex border-b border-gray-200">
                {["overview", "location", "qualifications", "reviews"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-5 font-semibold transition ${
                        activeTab === tab
                          ? "text-blue-600 border-b-3 border-blue-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab === "overview" && "Tổng quan"}
                      {tab === "location" && "Địa điểm"}
                      {tab === "qualifications" && "Bằng cấp"}
                      {tab === "reviews" && "Đánh giá"}
                    </button>
                  )
                )}
              </div>

              <div className="p-10">
                {/* Nội dung tab */}
                {activeTab === "overview" && (
                  <div className="prose max-w-none">
                    <h3 className="text-2xl font-bold mb-4">Giới thiệu</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {doctor.bio ||
                        "Bác sĩ là chuyên gia hàng đầu trong lĩnh vực tim mạch với nhiều năm kinh nghiệm điều trị các bệnh lý phức tạp."}
                    </p>
                  </div>
                )}

                {activeTab === "location" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <Building2 className="w-7 h-7 text-blue-600" />
                        Phòng khám
                      </h3>
                      <p className="text-lg font-semibold text-gray-800">
                        {doctor.clinic || fallback.clinic}
                      </p>
                    </div>
                    <div className="flex gap-4 text-gray-700">
                      <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium">
                          {doctor.address || fallback.address}
                        </p>
                        <p className="flex items-center gap-2 mt-3">
                          <Phone className="w-5 h-5" />
                          {doctor.phone || fallback.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "qualifications" && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6">
                      Bằng cấp & Chứng chỉ
                    </h3>
                    <ul className="space-y-4">
                      {(doctor.qualifications || fallback.qualifications).map(
                        (q, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-4"
                          >
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                            <span className="text-lg text-gray-800 font-medium">
                              {q}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-10">
                    {/* Form review */}
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
                      <h4 className="text-xl font-bold mb-6">
                        Viết đánh giá của bạn
                      </h4>
                      <div className="space-y-5">
                        <div>
                          <label className="block font-semibold mb-3">
                            Đánh giá sao
                          </label>
                          <div className="flex gap-3">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <button
                                key={n}
                                type="button"
                                onClick={() => setReviewRating(n)}
                              >
                                <Star
                                  className={`w-10 h-10 transition ${
                                    reviewRating >= n
                                      ? "text-amber-500 fill-amber-500"
                                      : "text-gray-300"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <textarea
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="Chia sẻ trải nghiệm của bạn..."
                          rows={4}
                          className="w-full rounded-xl border-2 border-blue-200 px-5 py-4 focus:border-blue-500 focus:outline-none resize-none"
                        />
                        <button
                          type="button"
                          onClick={handleSubmitReview}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition"
                        >
                          <Send className="w-5 h-5" /> Gửi đánh giá
                        </button>
                      </div>
                    </div>

                    {/* List reviews */}
                    <div className="space-y-6">
                      {listReviews.map((r) => (
                        <div
                          key={r.id}
                          className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <p className="font-bold text-gray-900 flex items-center gap-2">
                                <User className="w-5 h-5" />{" "}
                                {r.author || r.patientEmail || "Bệnh nhân"}
                              </p>
                              <p className="text-sm text-gray-500">
                                {dayjs(r.date || r.ratedAt).format(
                                  "DD/MM/YYYY"
                                )}
                              </p>
                            </div>
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-5 h-5 ${
                                    i < (r.rating || 0)
                                      ? "text-amber-500 fill-amber-500"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            {r.text || r.ratingComment || "Không có nhận xét"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Booking Panel */}
          <div className="lg:col-span-1">
            <BookingPanel
              services={services}
              serviceId={serviceId}
              setServiceId={setServiceId}
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
              date={date}
              setDate={setDate}
              selectedDateLabel={selectedDateLabel}
              setSelectedDateLabel={setSelectedDateLabel}
              currentTime={currentTime}
              handleBook={handleBook}
              doctor={doctor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
