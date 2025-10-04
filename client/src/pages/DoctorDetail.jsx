import { useState, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import { api } from "../store/api.js"
import { auth } from "../store/auth"

export default function DoctorDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = auth.getCurrentUser()

  // Lấy thông tin bác sĩ
  const doctor = api.getDoctors().find((d) => String(d.id) === String(id))
  if (!doctor) {
    return (
      <div className="container-page py-8 text-red-600 font-semibold">
        ❌ Không tìm thấy bác sĩ.
      </div>
    )
  }

  // Dịch vụ
  const services = api.getServices() || []
  const [serviceId, setServiceId] = useState(services[0]?.id || null)
  const service = useMemo(
    () => services.find((s) => String(s.id) === String(serviceId)),
    [serviceId, services]
  )

  // Tabs ngày
  const today = dayjs()
  const days = [
    { key: "today", label: "Hôm nay", date: today },
    { key: "tomorrow", label: "Ngày mai", date: today.add(1, "day") },
    { key: "d3", label: today.add(2, "day").format("DD/MM"), date: today.add(2, "day") },
    { key: "d4", label: today.add(3, "day").format("DD/MM"), date: today.add(3, "day") },
  ]
  const [tab, setTab] = useState("today")

  // Lịch theo ngày được chọn
  const [date, setDate] = useState(today.format("YYYY-MM-DD"))
  const slots =
    api.getDoctorSlots({
      doctor_id: id,
      date,
      service_duration: service?.duration_minutes || 20,
    }) || []

  const morningSlots = slots.filter((s) => dayjs(s.start_at).hour() < 12)
  const eveningSlots = slots.filter((s) => dayjs(s.start_at).hour() >= 12)

  // Slot đã chọn
  const [selectedSlot, setSelectedSlot] = useState(null)

  // Đặt lịch
  const handleBook = () => {
    if (!user || user.role !== "patient") {
      navigate("/login", { state: { from: `/doctors/${id}` } })
      return
    }
    if (!serviceId || !selectedSlot) {
      alert("❌ Vui lòng chọn dịch vụ và khung giờ.")
      return
    }

    // Tạo appointment
    const appt = api.createAppointment({
      patient_id: user.id,
      doctor_id: id,
      service_id: service?.id,
      start_at: selectedSlot.start_at,
    })

    if (appt?.id) {
      navigate(`/payment/${appt.id}`, {
        state: {
          doctor,
          service,
          date,
          time: dayjs(selectedSlot.start_at).format("HH:mm"),
          fee: service?.fee || doctor.fee || 0,
        },
      })
    } else {
      alert("❌ Không thể tạo lịch hẹn.")
    }
  }

  // Helper
  const specialty = api.getSpecialties().find((s) => s.id === doctor.specialty_id)?.name
  const clinic = api.getClinicLocations().find((c) => c.id === doctor.clinic_location_id)?.name

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Bên trái - thông tin bác sĩ */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col sm:flex-row gap-6">
          <img
            src={doctor.image || "/default-doctor.png"}
            alt={doctor.name}
            className="w-32 h-32 rounded-full object-cover border shadow"
          />
          <div className="flex-1 space-y-2 text-slate-800">
            <h1 className="text-2xl font-bold text-blue-800">
              {doctor.title} {doctor.name}
            </h1>
            <p>{doctor.bio}</p>
            <p>Kinh nghiệm: <b className="text-blue-800">{doctor.experience_years}+ năm</b></p>
            <p>Ngôn ngữ: <b className="text-blue-800">Tiếng Việt, Tiếng Anh</b></p>
            <p>Chuyên khoa: <b>{specialty}</b></p>
            <p>Địa điểm: <b>{clinic}</b></p>
            <p>Đánh giá Google: <b className="text-yellow-600">0.0 ⭐</b></p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b flex gap-6 font-medium text-slate-800">
          <button className="py-2 border-b-2 border-blue-800 text-blue-800">Tổng quan</button>
          <button className="py-2">Địa điểm</button>
          <button className="py-2">Đánh giá</button>
          <button className="py-2">Ưu đãi</button>
        </div>

        <div className="bg-white rounded-xl shadow p-6 text-slate-800">
          <h2 className="text-lg font-semibold mb-3">Giới thiệu</h2>
          <p>{doctor.bio || "Bác sĩ chưa có mô tả chi tiết."}</p>
        </div>
      </div>

      {/* Bên phải - Đặt lịch hẹn */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4 text-slate-800">
        <h2 className="text-lg font-bold text-blue-800">Đặt lịch khám</h2>
        <p>
          Phí khám:{" "}
          <b className="text-blue-800">
            {service?.fee?.toLocaleString() || doctor.fee?.toLocaleString()}đ
          </b>
        </p>

        {/* Chọn dịch vụ */}
        <select
          className="w-full border rounded-lg p-2 bg-white text-slate-800"
          value={serviceId || ""}
          onChange={(e) => setServiceId(e.target.value)}
        >
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} — {s.fee.toLocaleString()}đ ({s.duration_minutes}')
            </option>
          ))}
        </select>

        {/* Tabs ngày */}
        <div className="flex gap-2">
          {days.map((d) => (
            <button
              key={d.key}
              className={`px-3 py-1 rounded-lg border ${
                tab === d.key ? "bg-blue-800 text-white" : "text-slate-800"
              }`}
              onClick={() => {
                setTab(d.key)
                setDate(d.date.format("YYYY-MM-DD"))
                setSelectedSlot(null)
              }}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Buổi sáng */}
        <div>
          <h3 className="font-semibold mb-2">Buổi sáng ({morningSlots.length} khung giờ)</h3>
          {morningSlots.length === 0 ? (
            <p className="text-slate-600 text-sm">Không có lịch trống.</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {morningSlots.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSlot(s)}
                  className={`px-3 py-2 text-sm rounded-lg border transition ${
                    selectedSlot?.start_at === s.start_at
                      ? "bg-blue-800 text-white"
                      : "hover:bg-blue-800 hover:text-white"
                  }`}
                >
                  {dayjs(s.start_at).format("HH:mm")}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Buổi chiều */}
        <div>
          <h3 className="font-semibold mb-2">Buổi chiều ({eveningSlots.length} khung giờ)</h3>
          {eveningSlots.length === 0 ? (
            <p className="text-slate-600 text-sm">Không có lịch trống.</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {eveningSlots.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSlot(s)}
                  className={`px-3 py-2 text-sm rounded-lg border transition ${
                    selectedSlot?.start_at === s.start_at
                      ? "bg-blue-800 text-white"
                      : "hover:bg-blue-800 hover:text-white"
                  }`}
                >
                  {dayjs(s.start_at).format("HH:mm")}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Nút đặt lịch */}
        <button
          onClick={handleBook}
          disabled={!selectedSlot || !serviceId}
          className={`w-full py-2.5 rounded-lg font-medium transition ${
            selectedSlot && serviceId
              ? "bg-blue-800 text-white hover:bg-blue-900"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Đặt lịch
        </button>
      </div>
    </div>
  )
}
