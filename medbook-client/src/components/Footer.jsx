import { memo } from "react";
import { Link } from "react-router-dom";

const QUICK_LINKS = [
  { to: "/doctors", label: "Bác sĩ" },
  { to: "/specialties", label: "Chuyên khoa" },
  { to: "/about", label: "Về chúng tôi" },
  { to: "/contact", label: "Liên hệ" },
];

const CONTACT_INFO = [
  {
    label: "Hotline",
    value: "1900-000-111",
    href: "tel:1900000111",
  },
  {
    label: "Email",
    value: "support@medbook.vn",
    href: "mailto:support@medbook.vn",
  },
  {
    label: "Địa chỉ",
    value: "273 An Dương Vương, phường Chợ Quán, TP.HCM",
  },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: "fa-brands fa-facebook-f",
    external: true,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/84901234567",
    icon: "fa-brands fa-whatsapp",
    external: true,
  },
  {
    label: "Email",
    href: "mailto:support@medbook.vn",
    icon: "fa-solid fa-envelope",
    external: false,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: "fa-brands fa-instagram",
    external: true,
  },
  {
    label: "Telegram",
    href: "https://t.me/username",
    icon: "fa-brands fa-telegram",
    external: true,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com",
    icon: "fa-brands fa-x-twitter",
    external: true,
  },
];

function Footer() {
  const socialBtnClass =
    "inline-flex w-9 h-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition";

  const linkClass = "hover:text-white transition";

  return (
    <footer
      role="contentinfo"
      className="bg-gradient-to-r from-blue-900 to-slate-900 text-slate-300 pt-12"
    >
      <div className="max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-3">
        {/* About */}
        <section
          aria-labelledby="footer-about"
          className="text-center md:text-left"
        >
          <h3
            id="footer-about"
            className="text-2xl font-bold text-white mb-4"
          >
            MedBook
          </h3>

          <p className="text-slate-400 leading-relaxed">
            MedBook là nền tảng đặt lịch khám bệnh trực tuyến hiện đại, mang đến
            giải pháp nhanh chóng, an toàn và tiện lợi cho mọi người. Chúng tôi
            giúp bệnh nhân dễ dàng lựa chọn chuyên khoa phù hợp, kết nối trực
            tiếp với đội ngũ bác sĩ uy tín, giàu kinh nghiệm và tận tâm. Với
            MedBook, hành trình chăm sóc sức khỏe của bạn trở nên đơn giản hơn,
            minh bạch hơn và đáng tin cậy hơn bao giờ hết.
          </p>
        </section>

        {/* Links */}
        <nav
          aria-labelledby="footer-links"
          className="text-center md:text-left md:pl-12"
        >
          <h4
            id="footer-links"
            className="font-semibold text-white text-lg mb-4"
          >
            Liên kết
          </h4>

          <ul className="space-y-2">
            {QUICK_LINKS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <section
          aria-labelledby="footer-contact"
          className="text-center md:text-left"
        >
          <h4
            id="footer-contact"
            className="font-semibold text-white text-lg mb-4"
          >
            Liên hệ
          </h4>

          <div className="space-y-1">
            {CONTACT_INFO.map((item) => (
              <p key={item.label} className="text-slate-400">
                {item.label}:{" "}
                {item.href ? (
                  <a href={item.href} className="hover:underline">
                    {item.value}
                  </a>
                ) : (
                  <span>{item.value}</span>
                )}
              </p>
            ))}
          </div>

          {/* Social contact icons */}
          <div className="flex justify-center md:justify-start gap-3 my-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className={socialBtnClass}
                title={s.label}
                target={s.external ? "_blank" : undefined}
                rel={s.external ? "noopener noreferrer" : undefined}
              >
                <i className={`${s.icon} text-lg`} />
                <span className="sr-only">{s.label}</span>
              </a>
            ))}
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
        © 2025 MedBook. All rights reserved.
      </div>
    </footer>
  );
}

export default memo(Footer);
