import { Link } from "react-router-dom"
import { api } from "../store/api.js"

export default function Home() {
  const doctors = api.getDoctors().slice(0, 10)
  const allSpecs = api.getSpecialties()

  // 🔹 Mapping icon chuyên khoa
  const specIcons = {
    1: "/doctors/dk.png", // Đa khoa
    2: "/doctors/pk.png", // Phụ khoa
    3: "/doctors/dl.png", // Da liễu
    4: "/doctors/nk.png", // Nhi khoa
    5: "/doctors/tk.png", // Thần kinh
    6: "/doctors/th.png", // Tiêu hóa
  }

  return (
    <div className="space-y-16">
      {/* ================= HERO ================= */}
      <section className="py-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl relative overflow-hidden px-6 lg:px-12 flex flex-col lg:flex-row min-h-[500px]">
          
          {/* Left: Text */}
          <div className="flex-1 flex flex-col justify-center space-y-6 text-center lg:text-left z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-snug">
              Đặt lịch khám bệnh <br />
              <span className="text-yellow-300">Nhanh chóng & Tin cậy</span>
            </h1>
            <p className="text-lg text-blue-100 max-w-lg mx-auto lg:mx-0">
              Kết nối ngay với bác sĩ uy tín hàng đầu. Chọn chuyên khoa phù hợp, 
              xem lịch trống và đặt hẹn chỉ trong vài phút.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <Link
                to="/doctors"
                className="px-6 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-xl shadow-lg hover:bg-yellow-300 transition"
              >
                Đặt lịch ngay
              </Link>
              <Link
                to="/specialties"
                className="px-6 py-3 border border-white rounded-xl hover:bg-white hover:text-blue-800 transition"
              >
                Xem chuyên khoa
              </Link>
            </div>
          </div>

          {/* Right: Image */}
          <div className="flex-1 relative">
            <img
              src="/doctors/header_img.png"
              alt="Đội ngũ bác sĩ"
              className="absolute bottom-0 right-0 max-h-full object-contain 
                        transition-transform duration-500 ease-out 
                        drop-shadow-xl hover:scale-105 hover:-translate-y-2"
            />
          </div>
        </div>
      </section>

      {/* ================= SPECIALTIES ================= */}
      <section className="bg-white py-0">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Tìm theo chuyên khoa</h2>
          <p className="text-slate-600 mt-2 mb-10 max-w-2xl mx-auto">
            Dễ dàng tìm đúng chuyên khoa, bác sĩ phù hợp – chăm sóc sức khỏe chưa bao giờ tiện lợi thế.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 justify-items-center">
            {allSpecs.map((s) => (
              <Link
                key={s.id}
                to={`/doctors?specialty_id=${s.id}`}
                className="flex flex-col items-center group transform transition duration-300 hover:-translate-y-2"
              >
                <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center shadow group-hover:bg-blue-100">
                  <img
                    src={specIcons[s.id] || "/icons/default.png"}
                    alt={s.name}
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <span className="mt-3 text-sm font-medium text-slate-800 group-hover:text-blue-600">
                  {s.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">
            Vì sao chọn <span className="text-blue-600">MedBook?</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
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
                className="card bg-white shadow-xl hover:shadow-2xl p-8 rounded-2xl transition hover:-translate-y-1"
              >
                <img src={f.icon} className="w-16 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-slate-900">{f.title}</h3>
                <p className="text-slate-600 mt-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DOCTORS ================= */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Danh sách bác sĩ hàng đầu</h2>
          <p className="text-slate-600 mt-2 mb-10 max-w-2xl mx-auto">
            Chỉ vài bước đơn giản để chọn bác sĩ tin cậy và đặt lịch hẹn thật dễ dàng.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {doctors.map((d) => (
              <div
                key={d.id}
                className="bg-white border rounded-xl shadow hover:shadow-xl transition overflow-hidden"
              >
                {/* Doctor image */}
                <div className="h-56 flex items-center justify-center bg-slate-50">
                  <img
                    src={d.image || "/doctors/default.png"}
                    alt={d.name}
                    className="h-full object-contain"
                  />
                </div>

                {/* Doctor info */}
                <div className="p-4 text-left">
                  <h3 className="text-lg font-semibold text-slate-900">{d.name}</h3>
                  <p className="text-slate-600 text-sm">{d.specialty || "Chuyên khoa"}</p>
                </div>
              </div>
            ))}
          </div>

          {/* More button */}
          <div className="mt-8">
            <Link
              to="/doctors"
              className="px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
            >
              Xem thêm
            </Link>
          </div>
        </div>
      </section>

      {/* ================= STEPS ================= */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-6xl mx-auto text-center space-y-12 px-4">
          <h2 className="text-3xl font-bold text-slate-900">Quy trình đặt lịch đơn giản</h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative">
            {[
              { step: "Chọn chuyên khoa", img: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png" },
              { step: "Chọn bác sĩ", img: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png" },
              { step: "Xác nhận & Hoàn tất", img: "https://cdn-icons-png.flaticon.com/512/845/845646.png" },
            ].map((s, i, arr) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                {/* Step circle */}
                <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-blue-200 relative z-10 hover:scale-105 hover:shadow-2xl transition">
                  <img src={s.img} className="w-12 h-12" />
                </div>

                {/* Step text */}
                <div className="mt-4">
                  <div className="text-lg font-semibold text-blue-600">Bước {i + 1}</div>
                  <p className="text-slate-700 mt-1">{s.step}</p>
                </div>

                {/* Arrow connector */}
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
      <section className="py-16">
        <div className="relative max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl flex flex-col lg:flex-row items-center justify-between px-8 lg:px-16 py-20 relative overflow-visible">
            
            {/* Text */}
            <div className="space-y-6 text-center lg:text-left max-w-xl z-10">
              <h2 className="text-4xl font-extrabold leading-snug">
                Đặt lịch hẹn <br />
                Với <span className="text-yellow-300">20+ bác sĩ tin cậy</span>
              </h2>
              <p className="text-indigo-100 text-lg">
                Tham gia ngay hôm nay để được hỗ trợ đặt lịch nhanh chóng, quản lý hồ sơ khám bệnh và kết nối trực tiếp với đội ngũ bác sĩ hàng đầu.
              </p>
              <Link
                to="/register"
                className="inline-block px-8 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow hover:bg-gray-100 transition"
              >
                Tạo tài khoản
              </Link>
            </div>

            {/* Doctor image */}
            <div className="flex-1 relative">
              <img
                src="/doctors/doctorCTA.png"
                alt="Doctor CTA"
                className="absolute -top-64 right-0 w-[350px] lg:w-[420px] object-contain 
                          transition-transform duration-500 ease-out 
                          drop-shadow-xl hover:scale-105 hover:-translate-y-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gradient-to-r from-blue-900 to-slate-900 text-slate-300 pt-12">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">MedBook</h3>
            <p className="text-slate-400 leading-relaxed mb-4">
              MedBook là nền tảng đặt lịch khám bệnh trực tuyến hiện đại, mang đến giải pháp 
              nhanh chóng, an toàn và tiện lợi cho mọi người. Chúng tôi giúp bệnh nhân dễ dàng 
              lựa chọn chuyên khoa phù hợp, kết nối trực tiếp với đội ngũ bác sĩ uy tín, giàu 
              kinh nghiệm và tận tâm. Với MedBook, hành trình chăm sóc sức khỏe của bạn trở nên 
              đơn giản hơn, minh bạch hơn và đáng tin cậy hơn bao giờ hết.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition"><i className="fab fa-facebook text-xl"></i></a>
              <a href="#" className="hover:text-sky-400 transition"><i className="fab fa-twitter text-xl"></i></a>
              <a href="#" className="hover:text-pink-400 transition"><i className="fab fa-instagram text-xl"></i></a>
            </div>
          </div>

          {/* Links */}
          <div className="pl-20">
            <h4 className="font-semibold text-white text-lg mb-4">Liên kết</h4>
            <ul className="space-y-2">
              <li><Link to="/doctors" className="hover:text-white transition">Bác sĩ</Link></li>
              <li><Link to="/specialties" className="hover:text-white transition">Chuyên khoa</Link></li>
              <li><Link to="/about" className="hover:text-white transition">Về chúng tôi</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white text-lg mb-4">Liên hệ</h4>
            <p className="text-slate-400">Hotline: <span className="text-white">1900-000-111</span></p>
            <p className="text-slate-400">Email: <span className="text-white">support@medbook.vn</span></p>
            <p className="text-slate-400 mb-3">Địa chỉ: Trường Đại học Sài Gòn, P.3, Q.5, TP.HCM</p>
            <div className="w-full h-32 rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.690037308927!2d106.68006917573694!3d10.759917159437154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b7c3ed289%3A0xa06651894598e488!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTw6BpIEfDsm4!5e0!3m2!1svi!2s!4v1727710000000!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-10 py-4 text-center text-slate-500 text-sm">
          © 2025 <span>MedBook</span>. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
