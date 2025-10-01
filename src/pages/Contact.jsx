import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-teal-500 to-blue-600 text-white py-28">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Box bên trái */}
          <div className="flex justify-center md:justify-start">
            <div className="bg-white text-slate-800 p-8 rounded-2xl shadow-xl w-72 hover:shadow-2xl transition">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-teal-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-7 h-7 text-teal-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21c-4.97-3.582-8-7.582-8-11a8 8 0 0116 0c0 3.418-3.03 7.418-8 11z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Phản hồi nhanh</p>
                  <p className="text-2xl font-bold text-teal-600">+95%</p>
                </div>
              </div>
              <ul className="space-y-3 text-slate-700 text-base">
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">🕑</span> Hỗ trợ 24/7
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">📞</span> Tư vấn miễn phí
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-600">📍</span> Nhiều chi nhánh
                </li>
              </ul>
            </div>
          </div>

          {/* Text bên phải */}
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-extrabold leading-tight">
              Kết nối với chúng tôi
            </h1>
            <p className="mt-4 text-lg text-blue-100 max-w-xl">
              Đặt câu hỏi, nhận tư vấn hoặc đặt lịch khám – chúng tôi luôn sẵn
              sàng lắng nghe và hỗ trợ bạn.
            </p>
            <button
              onClick={() =>
                document
                  .getElementById("contact-form")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="mt-6 px-7 py-3 bg-white text-teal-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
            >
              Bắt đầu ngay
            </button>
          </div>
        </div>
      </section>

      {/* Info + Form */}
      <section
        id="contact-form"
        className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12"
      >
        {/* Thông tin liên hệ */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Thông tin liên hệ
          </h2>
          <p className="text-slate-600">
            Đội ngũ y bác sĩ chuyên nghiệp của chúng tôi luôn sẵn sàng phục vụ
            bạn với tất cả sự tận tâm và chuyên môn cao.
          </p>

          <div className="space-y-6">
            {[
              {
                icon: <Phone className="w-6 h-6 text-teal-600" />,
                title: "Điện thoại",
                desc: [
                  "Tổng đài đặt lịch: 1900 1234",
                  "Hotline khẩn cấp: 0912 345 678",
                ],
              },
              {
                icon: <Mail className="w-6 h-6 text-teal-600" />,
                title: "Email",
                desc: [
                  "Đặt lịch khám: datlich@phongkham.vn",
                  "Hỗ trợ khách hàng: hotro@phongkham.vn",
                ],
              },
              {
                icon: <MapPin className="w-6 h-6 text-teal-600" />,
                title: "Địa chỉ",
                desc: [
                  "Phòng khám đa khoa, 123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
                ],
              },
              {
                icon: <Clock className="w-6 h-6 text-teal-600" />,
                title: "Giờ làm việc",
                desc: [
                  "Thứ 2 - Thứ 6: 7:00 - 20:00",
                  "Thứ 7 - Chủ nhật: 8:00 - 17:00",
                ],
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-xl border border-slate-200 hover:border-teal-500 transition duration-300"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-teal-50 rounded-full mb-3">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  {item.title}
                </h3>
                {item.desc.map((d, idx) => (
                  <p key={idx} className="text-slate-600">
                    {d}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Form liên hệ */}
        <div className="p-8 bg-white rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Gửi tin nhắn cho chúng tôi
          </h2>
          <p className="text-slate-600 mb-6">
            Điền thông tin vào form bên dưới và chúng tôi sẽ phản hồi trong vòng
            24 giờ.
          </p>

          <form className="space-y-4">
            {/* Họ & Tên */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Họ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nguyễn Văn"
                  required
                  className="w-full p-3 border border-slate-300 rounded-lg bg-white text-slate-800 
                           placeholder-slate-400 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="An"
                  required
                  className="w-full p-3 border border-slate-300 rounded-lg bg-white text-slate-800 
                           placeholder-slate-400 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                required
                className="w-full p-3 border border-slate-300 rounded-lg bg-white text-slate-800 
                         placeholder-slate-400 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none"
              />
            </div>

            {/* Số điện thoại */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="0912 345 678"
                required
                className="w-full p-3 border border-slate-300 rounded-lg bg-white text-slate-800 
                         placeholder-slate-400 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none"
              />
            </div>

            {/* Chủ đề */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Chủ đề
              </label>
              <input
                type="text"
                placeholder="Đặt lịch khám bệnh"
                className="w-full p-3 border border-slate-300 rounded-lg bg-white text-slate-800 
                         placeholder-slate-400 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none"
              />
            </div>

            {/* Nội dung */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Nội dung <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="4"
                placeholder="Vui lòng mô tả chi tiết yêu cầu của bạn..."
                required
                className="w-full p-3 border border-slate-300 rounded-lg bg-white text-slate-800 
                         placeholder-slate-400 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none"
              ></textarea>
            </div>

            {/* Nút gửi */}
            <button
              type="submit"
              className="w-full bg-teal-700 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition"
            >
              Gửi tin nhắn
            </button>
          </form>
        </div>
      </section>

      {/* Map */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Vị trí phòng khám
          </h2>
          <p className="text-slate-600 mb-8">
            Chúng tôi nằm ở vị trí thuận tiện, dễ dàng tiếp cận bằng nhiều
            phương tiện giao thông công cộng.
          </p>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.705529994171!2d106.67997737586807!3d10.75533305959857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa06651894598e488!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTw6FpIEfDsm4!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          <div className="mt-8 grid sm:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-xl shadow">
              <p className="text-slate-600">Khoảng cách từ trung tâm</p>
              <p className="text-xl font-bold text-slate-900">2.5 km</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow">
              <p className="text-slate-600">Bãi đỗ xe</p>
              <p className="text-xl font-bold text-slate-900">Miễn phí</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow">
              <p className="text-slate-600">Giao thông công cộng</p>
              <p className="text-xl font-bold text-slate-900">Xe buýt 03, 19</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
