import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-gradient-to-r from-blue-900 to-slate-900 text-slate-300 pt-12"
    >
      <div className="max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-3">

        {/* About */}
        <section aria-labelledby="footer-about" className="text-center md:text-left">
          <h3 id="footer-about" className="text-2xl font-bold text-white mb-4">MedBook</h3>
          <p className="text-slate-400 leading-relaxed">
            MedBook là nền tảng đặt lịch khám bệnh trực tuyến hiện đại, mang đến giải pháp
            nhanh chóng, an toàn và tiện lợi cho mọi người. Chúng tôi giúp bệnh nhân dễ dàng
            lựa chọn chuyên khoa phù hợp, kết nối trực tiếp với đội ngũ bác sĩ uy tín, giàu
            kinh nghiệm và tận tâm. Với MedBook, hành trình chăm sóc sức khỏe của bạn trở nên
            đơn giản hơn, minh bạch hơn và đáng tin cậy hơn bao giờ hết.
          </p>
        </section>

        {/* Links */}
        <nav aria-labelledby="footer-links" className="text-center md:text-left md:pl-12">
          <h4 id="footer-links" className="font-semibold text-white text-lg mb-4">Liên kết</h4>
          <ul className="space-y-2">
            <li><Link to="/doctors" className="hover:text-white transition">Bác sĩ</Link></li>
            <li><Link to="/specialties" className="hover:text-white transition">Chuyên khoa</Link></li>
            <li><Link to="/about" className="hover:text-white transition">Về chúng tôi</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Liên hệ</Link></li>
          </ul>
        </nav>

        {/* Contact */}
        <section aria-labelledby="footer-contact" className="text-center md:text-left">
          <h4 id="footer-contact" className="font-semibold text-white text-lg mb-4">Liên hệ</h4>

          <div className="space-y-1">
            <p className="text-slate-400">
              Hotline:{" "}
              <a href="tel:1900000111" className="hover:underline">
                1900-000-111
              </a>
            </p>
            <p className="text-slate-400">
              Email:{" "}
              <a href="mailto:support@medbook.vn" className="hover:underline">
                support@medbook.vn
              </a>
            </p>
            <p className="text-slate-400">
              Địa chỉ: 273 An Dương Vương, phường Chợ Quán, TP.HCM
            </p>
          </div>

          {/* Social contact icons */}
          <div className="flex justify-center md:justify-start gap-3 my-4">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition"
              title="Facebook"
            >
              <i className="fa-brands fa-facebook-f text-lg"></i>
              <span className="sr-only">Facebook</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/84901234567"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition"
              title="WhatsApp"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i>
              <span className="sr-only">WhatsApp</span>
            </a>

            {/* Email */}
            <a
              href="mailto:support@medbook.vn"
              aria-label="Email"
              className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition"
              title="Email"
            >
              <i className="fa-solid fa-envelope text-lg"></i>
              <span className="sr-only">Email</span>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition"
              title="Instagram"
            >
              <i className="fa-brands fa-instagram text-lg"></i>
              <span className="sr-only">Instagram</span>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/username"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition"
              title="Telegram"
            >
              <i className="fa-brands fa-telegram text-lg"></i>
              <span className="sr-only">Telegram</span>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition"
              title="X (Twitter)"
            >
              <i className="fa-brands fa-x-twitter text-lg"></i>
              <span className="sr-only">X (Twitter)</span>
            </a>
          </div>

          {/* Map */}
          <div className="w-full h-32 rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Bản đồ Trường Đại học Sài Gòn"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.690037308927!2d106.68006917573694!3d10.759917159437154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b7c3ed289%3A0xa06651894598e488!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTw6BpIEfDsm4!5e0!3m2!1svi!2s!4v1727710000000!5m2!1svi!2s"
              width="100%"
              height="100%"
              loading="lazy"
              style={{ border: 0 }}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </div>

      <div className="border-t border-slate-700 mt-10 py-4 text-center text-slate-500 text-sm">
        © 2025 MedBook.All rights reserved.
      </div>
    </footer>
  );
}
