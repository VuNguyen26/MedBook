import { Link } from "react-router-dom"
import { api } from "../store/api.js"

export default function Home() {
  const doctors = api.getDoctors().slice(0, 10)
  const allSpecs = api.getSpecialties()

  // 🔹 Mapping icon chuyên khoa
  const specIcons = {
    1: "/doctors/dk.png",
    2: "/doctors/pk.png",
    3: "/doctors/dl.png",
    4: "/doctors/nk.png",
    5: "/doctors/tk.png",
    6: "/doctors/th.png",
  }

  return (
    <div className="space-y-16">
      {/* ================= HERO ================= */}
      <section className="py-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl overflow-hidden px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row min-h-[400px] md:min-h-[500px]">
          {/* Left: Text */}
          <div className="flex-1 flex flex-col justify-center space-y-6 text-center lg:text-left z-10 py-10">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-snug">
              Đặt lịch khám bệnh <br />
              <span className="text-yellow-300">Nhanh chóng & Tin cậy</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-blue-100 max-w-lg mx-auto lg:mx-0">
              Kết nối ngay với bác sĩ uy tín hàng đầu. Chọn chuyên khoa phù hợp,
              xem lịch trống và đặt hẹn chỉ trong vài phút.
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Link
                to="/doctors"
                className="px-4 sm:px-6 py-2 sm:py-3 bg-yellow-400 text-blue-900 font-semibold rounded-xl shadow-lg hover:bg-yellow-300 transition"
              >
                Đặt lịch ngay
              </Link>
              <Link
                to="/specialties"
                className="px-4 sm:px-6 py-2 sm:py-3 border border-white rounded-xl hover:bg-white hover:text-blue-800 transition"
              >
                Xem chuyên khoa
              </Link>
            </div>
          </div>

          {/* Right: Image */}
          <div className="flex-1 flex items-end justify-center relative mt-6 lg:mt-0">
            <img
              src="/doctors/header_img.png"
              alt="Đội ngũ bác sĩ"
              className="max-w-[220px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-full h-auto object-contain
                        transition-transform duration-500 ease-out drop-shadow-xl
                        hover:scale-105 hover:-translate-y-2"
            />
          </div>
        </div>
      </section>

      {/* ================= SPECIALTIES ================= */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Tìm theo chuyên khoa
          </h2>
          <p className="text-slate-600 mt-2 mb-8 sm:mb-10 max-w-2xl mx-auto text-sm sm:text-base">
            Dễ dàng tìm đúng chuyên khoa, bác sĩ phù hợp – chăm sóc sức khỏe chưa bao giờ tiện lợi thế.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 justify-items-center">
            {allSpecs.map((s) => (
              <Link
                key={s.id}
                to={`/doctors?specialty_id=${s.id}`}
                className="flex flex-col items-center group transform transition duration-300 hover:-translate-y-2"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-blue-50 flex items-center justify-center shadow group-hover:bg-blue-100">
                  <img
                    src={specIcons[s.id] || "/icons/default.png"}
                    alt={s.name}
                    className="w-14 sm:w-20 h-14 sm:h-20 object-contain"
                  />
                </div>
                <span className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium text-slate-800 group-hover:text-blue-600">
                  {s.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 sm:mb-10">
            Vì sao chọn <span className="text-blue-600">MedBook?</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Đặt lịch dễ dàng",
                desc: "Hoàn tất lịch hẹn chỉ với vài bước.",
                icon: "https://cdn-icons-png.flaticon.com/512/747/747310.png",
              },
              {
                title: "Bác sĩ uy tín",
                desc: "Đội ngũ chuyên gia nhiều năm kinh nghiệm.",
                icon: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
              },
              {
                title: "Hỗ trợ 24/7",
                desc: "Luôn sẵn sàng tư vấn và hỗ trợ.",
                icon: "https://cdn-icons-png.flaticon.com/512/3059/3059444.png",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white shadow-md hover:shadow-xl p-6 sm:p-8 rounded-2xl transition hover:-translate-y-1"
              >
                <img src={f.icon} className="w-12 sm:w-16 mx-auto mb-4 sm:mb-6" />
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                  {f.title}
                </h3>
                <p className="text-slate-600 mt-2 text-sm sm:text-base">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DOCTORS ================= */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Danh sách bác sĩ hàng đầu
          </h2>
          <p className="text-slate-600 mt-2 mb-8 sm:mb-10 max-w-2xl mx-auto text-sm sm:text-base">
            Chỉ vài bước đơn giản để chọn bác sĩ tin cậy và đặt lịch hẹn thật dễ dàng.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {doctors.map((d) => (
              <div
                key={d.id}
                className="bg-white border rounded-xl shadow hover:shadow-xl transition overflow-hidden"
              >
                <div className="h-48 sm:h-56 flex items-center justify-center bg-slate-50">
                  <img
                    src={d.image || "/doctors/default.png"}
                    alt={d.name}
                    className="h-full object-contain"
                  />
                </div>
                <div className="p-4 text-left">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                    {d.name}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm">
                    {d.specialty || "Chuyên khoa"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:mt-8">
            <Link
              to="/doctors"
              className="px-5 sm:px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition text-sm sm:text-base"
            >
              Xem thêm
            </Link>
          </div>
        </div>
      </section>

      {/* ================= STEPS ================= */}
      <section className="bg-blue-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto text-center space-y-8 sm:space-y-12 px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Quy trình đặt lịch đơn giản
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative">
            {[
              { step: "Chọn chuyên khoa", img: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png" },
              { step: "Chọn bác sĩ", img: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png" },
              { step: "Xác nhận & Hoàn tất", img: "https://cdn-icons-png.flaticon.com/512/845/845646.png" },
            ].map((s, i, arr) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-blue-200 hover:scale-105 hover:shadow-2xl transition">
                  <img src={s.img} className="w-10 sm:w-12 h-10 sm:h-12" />
                </div>
                <div className="mt-3 sm:mt-4">
                  <div className="text-blue-600 font-semibold text-sm sm:text-lg">
                    Bước {i + 1}
                  </div>
                  <p className="text-slate-700 text-xs sm:text-sm mt-1">{s.step}</p>
                </div>

                {i < arr.length - 1 && (
                  <div className="hidden md:block absolute top-12 right-[-100px] w-[80px] h-[2px] bg-blue-300">
                    <div className="absolute right-0 -top-1 w-0 h-0 border-t-[6px] border-b-[6px] border-l-[10px] border-t-transparent border-b-transparent border-l-blue-400"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ================= CTA ================= */}
      <section className="py-12 sm:py-16 relative">
        <div className="relative max-w-6xl mx-auto">
          {/* Nền xanh */}
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl 
                          flex flex-col lg:flex-row items-center justify-between 
                          px-6 sm:px-8 lg:px-12 py-12 sm:py-16 relative z-10 overflow-hidden">
            {/* Text */}
            <div className="space-y-4 sm:space-y-6 text-center lg:text-left max-w-lg">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug">
                Đặt lịch hẹn <br />
                Với <span className="text-yellow-300">20+ bác sĩ tin cậy</span>
              </h2>
              <p className="text-indigo-100 text-sm sm:text-base md:text-lg">
                Tham gia ngay hôm nay để được hỗ trợ đặt lịch nhanh chóng, quản lý hồ sơ khám bệnh và kết nối trực tiếp với đội ngũ bác sĩ hàng đầu.
              </p>
              <Link
                to="/register"
                className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-white text-indigo-600 font-semibold rounded-full shadow hover:bg-gray-100 transition text-sm sm:text-base"
              >
                Tạo tài khoản
              </Link>
            </div>
          </div>
          {/* Ảnh bác sĩ */}
          <img
            src="/doctors/doctorCTA.png"
            alt="Doctor CTA"
            className="
              hidden lg:block   /* Ẩn trên mobile, chỉ hiện từ lg trở lên */
              absolute bottom-0 right-0 
              translate-x-[-80px]
              w-[380px] lg:w-[420px]
              object-contain drop-shadow-xl
              transition-transform duration-500 ease-out
              hover:scale-105 hover:-translate-y-2
              z-20
            "
          />
        </div>
      </section>
    </div>
  )
}
