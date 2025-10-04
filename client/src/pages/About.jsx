import { Shield, Heart, Zap, Users } from "lucide-react";

export default function About() {
  return (
    <div className="bg-slate-50">
      {/* Hero */}
      <section className="relative isolate text-white">
        <img
          src="/doctors/nenabout.jpg"
          alt="Background y tế"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 -z-10 bg-blue-900/70"></div>

        <div className="max-w-6xl mx-auto px-6 py-28 md:py-40 text-center">
          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-7xl leading-tight">
            Chăm sóc sức khỏe của
            <br className="hidden md:block" /> bạn là ưu tiên hàng đầu
          </h1>
          <p className="mt-6 text-base sm:text-lg md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Chúng tôi kết nối bạn với các bác sĩ và cơ sở y tế uy tín, giúp việc
            đặt lịch khám bệnh trở nên dễ dàng và thuận tiện hơn bao giờ hết.
          </p>
        </div>
      </section>

      {/* About Us */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">
            Sứ mệnh của <span className="text-blue-600">chúng tôi</span>
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            Chúng tôi tin rằng mọi người đều xứng đáng được tiếp cận dịch vụ
            chăm sóc sức khỏe chất lượng cao một cách dễ dàng và thuận tiện.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            Với nền tảng đặt lịch khám bệnh trực tuyến, chúng tôi đang thay đổi
            cách mọi người tương tác với hệ thống y tế, giúp tiết kiệm thời gian
            và mang lại trải nghiệm tốt nhất cho bệnh nhân.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            Từ việc tìm kiếm bác sĩ phù hợp đến đặt lịch hẹn chỉ trong vài phút,
            chúng tôi cam kết{" "}
            <span className="font-medium text-blue-600">đồng hành cùng bạn</span>{" "}
            trên hành trình chăm sóc sức khỏe.
          </p>
        </div>

        <div className="relative">
          <img
            src="/doctors/about.jpg"
            alt="Sứ mệnh MedBook"
            className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-slate-200/50 pointer-events-none"></div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-indigo-200 py-24">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-4">
          <h2 className="text-4xl font-extrabold text-slate-900">
            Giá trị cốt lõi
          </h2>
          <p className="text-slate-600 text-lg">
            Những nguyên tắc định hướng mọi hoạt động của chúng tôi
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
          {[
            {
              icon: <Heart className="w-6 h-6 text-blue-600" />,
              title: "Tận tâm",
              desc: "Chúng tôi đặt sức khỏe và trải nghiệm của bệnh nhân lên hàng đầu trong mọi quyết định.",
            },
            {
              icon: <Shield className="w-6 h-6 text-blue-600" />,
              title: "Đáng tin cậy",
              desc: "Bảo mật thông tin và chất lượng dịch vụ là cam kết không thể thiếu của chúng tôi.",
            },
            {
              icon: <Zap className="w-6 h-6 text-blue-600" />,
              title: "Hiện đại",
              desc: "Ứng dụng công nghệ tiên tiến để mang đến giải pháp y tế thông minh và tiện lợi.",
            },
            {
              icon: <Users className="w-6 h-6 text-blue-600" />,
              title: "Kết nối",
              desc: "Xây dựng cầu nối vững chắc giữa bệnh nhân và đội ngũ y tế chuyên nghiệp.",
            },
          ].map((v, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition text-left"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                {v.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {v.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-blue-50 py-24">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-4">
          <h2 className="text-4xl font-extrabold text-slate-900">
            Đội ngũ lãnh đạo
          </h2>
          <p className="text-slate-600 text-lg">
            Những người đứng sau sứ mệnh của chúng tôi
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
          {[
            {
              name: "BS. Nguyễn Văn An",
              role: "Giám đốc Y khoa",
              desc: "Hơn 15 năm kinh nghiệm trong lĩnh vực y tế và quản lý bệnh viện.",
              img: "/doctors/nguyenvanan.jpg",
            },
            {
              name: "Trần Thị Bình",
              role: "Giám đốc Công nghệ",
              desc: "Chuyên gia công nghệ với đam mê cải thiện trải nghiệm người dùng.",
              img: "/doctors/tranthibinh.jpg",
            },
            {
              name: "Lê Minh Châu",
              role: "Giám đốc Vận hành",
              desc: "Dẫn dắt đội ngũ vận hành để đảm bảo dịch vụ hoàn hảo mỗi ngày.",
              img: "/doctors/leminhchau.jpg",
            },
            {
              name: "BS. Phạm Quốc Dũng",
              role: "Trưởng phòng Chăm sóc Khách hàng",
              desc: "Cam kết mang đến trải nghiệm tốt nhất cho mỗi bệnh nhân.",
              img: "/doctors/phamquocdung.jpg",
            },
          ].map((m, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition text-left overflow-hidden"
            >
              <img
                src={m.img}
                alt={m.name}
                className="w-full h-60 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  {m.name}
                </h3>
                <p className="text-blue-600 font-medium">{m.role}</p>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-blue-600 text-center rounded-3xl px-10 py-20 shadow-xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Sẵn sàng bắt đầu chăm sóc sức khỏe của bạn?
            </h2>
            <p className="mt-6 text-blue-100 text-lg max-w-2xl mx-auto">
              Đặt lịch khám với bác sĩ chuyên khoa ngay hôm nay. Nhanh chóng,
              tiện lợi và hoàn toàn miễn phí.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/doctors"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-teal-500 text-white font-semibold hover:bg-teal-400 transition text-lg"
              >
                Đặt lịch ngay →
              </a>
              <a
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-white text-white font-semibold hover:bg-white hover:text-blue-700 transition text-lg"
              >
                Tìm hiểu thêm
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
