import { api } from "../store/api.js"
import { Link } from "react-router-dom"

export default function Specialties() {
  const list = api.getSpecialties()

  // Gán icon theo chuyên khoa
  const icons = {
    "Bác sĩ đa khoa": "🩺",
    "Bác sĩ phụ khoa": "👩‍🍼",
    "Bác sĩ da liễu": "🌸",
    "Bác sĩ nhi khoa": "🧒",
    "Bác sĩ thần kinh": "🧠",
    "Bác sĩ chuyên khoa tiêu hóa": "🍎",
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 space-y-10">
      {/* Title */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold text-slate-900">
          Danh sách <span className="text-blue-600">Chuyên khoa</span>
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Chọn chuyên khoa phù hợp để kết nối nhanh chóng với bác sĩ uy tín.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {list.map((s) => (
          <Link
            key={s.id}
            to={`/doctors?specialty_id=${s.id}`}
            className="group bg-white border rounded-2xl p-6 shadow hover:shadow-2xl transition transform hover:-translate-y-1 flex flex-col items-center text-center"
          >
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition text-2xl">
              {icons[s.name] || "🩺"}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-slate-900">{s.name}</h3>
            <p className="text-sm text-slate-600 mt-2">Bác sĩ hàng đầu</p>

            {/* Button */}
            <div className="mt-4">
              <span className="inline-block px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition">
                Xem bác sĩ
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
