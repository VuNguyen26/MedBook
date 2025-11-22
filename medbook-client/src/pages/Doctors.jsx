import { useEffect, useMemo, useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { api } from "../store/api.js"
import {
  Stethoscope as SpecIcon,
  GraduationCap,
  Building2,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const PAGE_SIZE = 6

export default function Doctors() {
  const [params, setParams] = useSearchParams()

  // ❗ KHÔNG dùng || "" vì "0" bị false
  const specialty_id = params.get("specialty_id") ?? ""
  const page = Math.max(1, Number(params.get("page") || 1))

  const [q] = useState(params.get("q") || "")
  const specs = api.getSpecialties()

  // -----------------------------
  // 🔥 State: doctors từ backend
  // -----------------------------
  const [all, setAll] = useState([])

  useEffect(() => {
    const load = async () => {
      const data = await api.getDoctors({
        specialty_id: specialty_id === "" ? undefined : specialty_id,
        q
      })
      setAll(data)
    }
    load()
  }, [specialty_id, q])

  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE))

  const list = useMemo(
    () => all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [all, page]
  )

  // ⭐ FIX QUAN TRỌNG NHẤT
  const handleSpecChange = (e) => {
    const val = e.target.value
    const next = {}

    // Gửi specialty_id lên backend nếu không rỗng
    if (val !== null && val !== undefined && val !== "") {
      next.specialty_id = val
    }

    if (q) next.q = q
    next.page = "1"

    setParams(next)
  }

  const gotoPage = (p) => {
    const next = {}
    if (specialty_id !== "" && specialty_id !== null) next.specialty_id = specialty_id
    if (params.get("q")) next.q = params.get("q")
    if (p > 1) next.page = String(p)
    setParams(next)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      
      {/* Banner */}
      <div
        className="relative bg-cover bg-center h-[400px] md:h-[480px]"
        style={{ backgroundImage: "url('/doctors/doctorbanner.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/10"></div>

        <div className="relative z-10 max-w-5xl mx-auto h-full flex flex-col justify-center px-6">
          <p className="text-base md:text-lg text-slate-700 font-medium mb-3">
            <Link
              to="/"
              className="relative inline-block text-slate-700 hover:text-blue-600 transition"
            >
              Trang chủ
            </Link>
            &nbsp;&gt;&nbsp; 
            <span className="font-semibold text-slate-800">Bác sĩ</span>
          </p>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-800 drop-shadow">
            Đội ngũ bác sĩ
          </h1>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 rounded-t-xl overflow-hidden shadow-lg">
            <button className="flex items-center justify-center gap-2 py-4 px-6 font-medium bg-blue-700 text-white hover:bg-blue-800 transition">
              📞 Gọi tổng đài
            </button>
            <button className="flex items-center justify-center gap-2 py-4 px-6 font-medium bg-yellow-500 text-white hover:bg-yellow-600 transition">
              📅 Đặt lịch hẹn
            </button>
            <button className="flex items-center justify-center gap-2 py-4 px-6 font-medium bg-cyan-500 text-white hover:bg-cyan-600 transition">
              👨‍⚕️ Tìm bác sĩ
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Sidebar */}
          <aside className="md:col-span-1 space-y-3">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Duyệt qua các bác sĩ chuyên khoa
            </h2>

            <button
              onClick={() => handleSpecChange({ target: { value: "" } })}
              className={`w-full text-left px-4 py-2 rounded border transition ${
                specialty_id === ""
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              Tất cả
            </button>

            {specs.map((s) => {
              const active = String(specialty_id) === String(s.id)
              return (
                <button
                  key={s.id}
                  onClick={() => handleSpecChange({ target: { value: String(s.id) } })}
                  className={`w-full text-left px-4 py-2 rounded border transition ${
                    active
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {s.name}
                </button>
              )
            })}
          </aside>

          {/* Danh sách bác sĩ */}
          <section className="md:col-span-3 space-y-10">
            <div className="grid md:grid-cols-2 gap-6">
              {list.map((d) => (
                <div
                  key={d.id}
                  className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition p-4 md:p-5 flex gap-4"
                >
                  <img
                    src={d.imageUrl || "/default-doctor.png"}
                    alt={d.name}
                    className="w-28 h-36 md:w-32 md:h-40 object-cover rounded-lg shadow"
                  />

                  <div className="flex-1 flex flex-col">

                    <h3 className="text-blue-800 font-extrabold uppercase leading-snug text-base md:text-lg">
                      {d.title ? `${d.title} ${d.name}` : d.name}
                    </h3>

                    {d.title && (
                      <div className="mt-1 text-[13px] text-slate-500 flex items-center gap-2">
                        <GraduationCap size={16} className="text-slate-400" />
                        <span>{d.title}</span>
                      </div>
                    )}

                    <div className="mt-1 text-[13px] text-slate-600">
                      {d.experience ? `${d.experience} năm kinh nghiệm` : ""}
                    </div>

                    <div className="mt-1 text-[13px] text-slate-600 flex items-start gap-2">
                      <SpecIcon size={16} className="text-slate-400 shrink-0 mt-0.5" />
                      <span>{d.specialty || "Chưa cập nhật"}</span>
                    </div>

                    <div className="mt-1 text-[13px] text-slate-600 flex items-start gap-2">
                      <Building2 size={16} className="text-slate-400 shrink-0 mt-0.5" />
                      <span>Cơ sở 1</span>
                    </div>

                    <div className="mt-3">
                      <Link
                        to={`/doctors/${d.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
                      >
                        <CalendarCheck size={16} />
                        Đặt lịch hẹn
                      </Link>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {list.length === 0 && (
              <div className="text-center py-20 text-slate-500 text-lg">
                Không tìm thấy bác sĩ phù hợp.
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-1 pt-2">
                <button
                  onClick={() => gotoPage(Math.max(1, page - 1))}
                  className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  <ChevronLeft />
                </button>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const n = i + 1
                  const active = n === page
                  return (
                    <button
                      key={n}
                      onClick={() => gotoPage(n)}
                      className={
                        "min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium " +
                        (active
                          ? "bg-blue-600 text-white"
                          : "text-slate-700 hover:bg-slate-100")
                      }
                    >
                      {n}
                    </button>
                  )
                })}

                <button
                  onClick={() => gotoPage(Math.min(totalPages, page + 1))}
                  className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  <ChevronRight />
                </button>
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  )
}
