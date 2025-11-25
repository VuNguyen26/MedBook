import { Link } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { Send, X, MessageCircle, Minimize2 } from "lucide-react"

// ========================================
// CHATBOT WIDGET COMPONENT (COPY NGUYÊN BẢN)
// ========================================
function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Xin chào! 👋 Tôi là trợ lý y tế MedBook. Tôi có thể giúp bạn đặt lịch khám, tìm bác sĩ, hoặc trả lời các câu hỏi về sức khỏe.",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMsg = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInputValue("")
    setIsLoading(true)

    setTimeout(() => {
      const botReplies = [
        "Tôi hiểu rồi. Bạn có muốn tôi giúp bạn tìm bác sĩ phù hợp không?",
        "Tuyệt vời! Hãy để tôi tìm những bác sĩ tốt nhất cho bạn.",
        "Bạn có thể cho tôi biết thêm về tình trạng sức khỏe của bạn không?",
        "Tôi cũng có thể giúp bạn xem lịch khám trống.",
      ]

      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: botReplies[Math.floor(Math.random() * botReplies.length)],
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsLoading(false)
    }, 600)
  }

  // Nút mở chatbot
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-full p-4 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-50 flex items-center gap-2"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="text-sm font-semibold hidden sm:inline">Trợ lý AI</span>
      </button>
    )
  }

  return (
    <div
      className={`fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-300 z-50 ${
        isMinimized ? "w-80 h-16" : "w-80 h-96"
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-full p-2">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Trợ lý MedBook</h3>
            <p className="text-xs text-blue-100">Sẵn sàng giúp bạn 24/7</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
          >
            <Minimize2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      {!isMinimized && (
        <>
          <div className="h-56 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-xl text-sm ${
                    m.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white border border-slate-200 text-slate-900 rounded-bl-none"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef}></div>
          </div>

          {/* Input */}
          <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-slate-200 bg-white flex items-center gap-3"
            >
              <div className="flex-1 relative">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Nhập câu hỏi của bạn..."
                  className="
                    w-full px-4 py-2.5 
                    rounded-xl 
                    bg-white 
                    text-slate-900 
                    placeholder:text-slate-400
                    border border-slate-300 
                    shadow-sm
                    transition-all
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  "
                />

                {/* Icon ở trong input (optional, cho đẹp) */}
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  💬
                </span>
              </div>

              <button
                type="submit"
                className="
                  flex items-center justify-center
                  bg-blue-600 text-white
                  p-3 rounded-xl 
                  hover:bg-blue-700 
                  transition shadow-md hover:shadow-lg
                  disabled:opacity-50
                "
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
        </>
      )}
    </div>
  )
}

// ================================
// HOME PAGE CHÍNH
// ================================
export default function Home() {
  const [doctors, setDoctors] = useState([])

  const allSpecs = [
    { id: 1, name: "Đa Khoa" },
    { id: 2, name: "Phụ Khoa" },
    { id: 3, name: "Da Liễu" },
    { id: 4, name: "Nhi Khoa" },
    { id: 5, name: "Thần Kinh" },
    { id: 6, name: "Tiêu Hóa" },
  ]

  const specIcons = {
    1: "/doctors/dk.png",
    2: "/doctors/pk.png",
    3: "/doctors/dl.png",
    4: "/doctors/nk.png",
    5: "/doctors/tk.png",
    6: "/doctors/th.png",
  }

  const specColors = {
    1: "from-[#2563eb] to-[#1d4ed8]",
    2: "from-[#ec4899] to-[#db2777]",
    3: "from-[#22c55e] to-[#16a34a]",
    4: "from-[#facc15] to-[#eab308]",
    5: "from-[#a855f7] to-[#7c3aed]",
    6: "from-[#f97316] to-[#ef4444]",
  }

  const articles = [
    {
      id: 1,
      tag: "Sức khỏe tim mạch",
      title: "Ăn uống thế nào để giảm nguy cơ bệnh tim mạch?",
      desc: "Chuyên gia khuyến cáo chế độ ăn nhiều chất xơ, giảm muối và hạn chế thực phẩm chế biến sẵn giúp giảm nguy cơ đau tim và đột quỵ.",
      date: "Feb 2025",
      url: "https://vnexpress.net/an-uong-the-nao-de-giam-nguy-co-benh-tim-mach-4789479.html",
      image: "https://i1-suckhoe.vnecdn.net/2025/02/12/benh-tim-mach-6232-1739348574.jpg?w=680&h=408&q=100&dpr=1&fit=crop&s=cAXU6L4OZq7YXrWi1BFEyg"
    },
    {
      id: 2,
      tag: "Sức khỏe tinh thần",
      title: "Ngủ ít hơn 6 tiếng mỗi ngày làm tăng nguy cơ trầm cảm",
      desc: "Các nhà khoa học cho biết thiếu ngủ kéo dài gây rối loạn hormone và tăng mức độ căng thẳng, ảnh hưởng trực tiếp đến sức khỏe tinh thần.",
      date: "Feb 2025",
      url: "https://suckhoedoisong.vn/ngu-it-hon-6-tieng-moi-ngay-lam-tang-nguy-co-tram-cam-169250206092509566.htm",
      image: "https://media.suckhoedoisong.vn/Images/phuongnhi/2025/02/06/ngu-it.jpg"
    },
    {
      id: 3,
      tag: "Dinh dưỡng",
      title: "Những thực phẩm giúp tăng miễn dịch mùa lạnh",
      desc: "Chuyên gia dinh dưỡng khuyến cáo bổ sung vitamin C, kẽm và chất chống oxy hóa để tăng sức đề kháng trong mùa lạnh.",
      date: "Feb 2025",
      url: "https://nld.com.vn/suc-khoe/nhung-thuc-pham-giup-tang-mien-dich-20250208111921294.htm",
      image: "https://photo-baomoi.bmcdn.me/w700_r16x9_sm/2025_02_08_83_49715252/aea80fe16b5f45c2432bccfa5a8b3210.jpg"
    }
  ];


  useEffect(() => {
    axios.get("http://localhost:8080/api/doctors")
      .then((res) => setDoctors(res.data || []))
      .catch(console.error)
  }, [])

      return (
    <div className="bg-slate-50 min-h-screen relative">
      <div className="space-y-24 pb-20">

        {/* ================= HERO ================= */}
        <section className="bg-gradient-to-r from-[#050b26] via-[#0b2161] to-[#0056ff] text-white">
          <div className="max-w-6xl mx-auto px-4 lg:px-2 py-14 lg:py-20 flex flex-col lg:flex-row items-center gap-10">
            {/* Left */}
            <div className="flex-1 space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm">
                <span className="text-lg">🏥</span>
                <span className="font-medium">Nền tảng y tế hàng đầu</span>
              </div>

              {/* Heading */}
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight">
                  Khám bệnh{" "}
                  <span className="text-sky-300">Thông minh, Nhanh chóng</span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-blue-100 max-w-xl">
                  Kết nối với bác sĩ chuyên khoa, xem lịch khám thực tế và đặt
                  hẹn trong vài phút. Chăm sóc sức khỏe thích ứng với cuộc sống
                  của bạn.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/doctors"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded-full bg-sky-400 hover:bg-sky-300 text-blue-950 font-semibold shadow-lg shadow-sky-900/30 transition"
                >
                  Đặt lịch ngay
                  <span className="ml-2 text-xl">➜</span>
                </Link>
                <Link
                  to="/specialties"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded-full border border-white/60 hover:bg-white hover:text-blue-800 font-semibold transition"
                >
                  Khám phá chuyên khoa
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4 border-t border-white/10 mt-2">
                <div>
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-blue-100">Bác sĩ chuyên khoa</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-sm text-blue-100">Bệnh nhân hài lòng</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-blue-100">Hỗ trợ không ngừng</div>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex-1 flex items-center justify-center">
              <div
                className="
                  relative w-full max-w-md aspect-[4/3]
                  rounded-3xl overflow-hidden
                  shadow-[0_20px_40px_rgba(0,0,0,0.4)]
                  bg-white/10 backdrop-blur-xl border border-white/20
                  transition-all duration-500
                  hover:scale-105 hover:shadow-[0_25px_45px_rgba(0,0,0,0.55)]
                "
              >

                {/* Subtle blue glow */}
                <div className="absolute inset-0 rounded-3xl shadow-[0_0_50px_15px_rgba(56,189,248,0.25)] pointer-events-none"></div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>

                {/* Doctor image */}
                <img
                  src="/doctors/header_img.png"
                  alt="Bác sĩ đang tư vấn cho bệnh nhân"
                  className="
                    w-full h-full object-cover
                    transition-all duration-500
                    hover:scale-110
                  "
                />
              </div>
            </div>

          </div>
        </section>

        {/* ================= SPECIALTIES ================= */}
        <section className="bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 text-center space-y-8">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Tìm kiếm theo chuyên khoa
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
                Chọn lĩnh vực chuyên khoa bạn cần. Dễ dàng, nhanh chóng và tin cậy.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
              {allSpecs.map((s) => (
                <Link
                  key={s.id}
                  to={`/doctors?specialty_id=${s.id}`}
                  className={`group rounded-3xl bg-gradient-to-br ${specColors[s.id]} text-white p-4 sm:p-5 flex flex-col items-center justify-between shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 flex items-center justify-center">
                      <img
                        src={specIcons[s.id]}
                        alt={s.name}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <span className="text-sm sm:text-base font-semibold">
                      {s.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 text-center space-y-10">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Tại sao chọn <span className="text-blue-600">MedBook?</span>
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
                Những lợi thế cạnh tranh giúp bạn yên tâm chăm sóc sức khỏe.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  title: "Đặt lịch chỉ trong vài phút",
                  desc: "Giao diện thân thiện, quy trình đơn giản giúp bạn nhanh chóng hoàn tất đặt lịch.",
                  icon: "⚡",
                },
                {
                  title: "Bác sĩ uy tín & chuyên nghiệp",
                  desc: "Đội ngũ bác sĩ có chứng chỉ, nhiều năm kinh nghiệm trong các chuyên khoa.",
                  icon: "👨‍⚕️",
                },
                {
                  title: "Hỗ trợ 24/7 - Luôn sẵn sàng",
                  desc: "Đội hỗ trợ khách hàng chuyên nghiệp sẵn sàng tư vấn bất cứ lúc nào.",
                  icon: "💬",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl shadow-md hover:shadow-2xl p-6 sm:p-8 text-left flex flex-col gap-4 transition transform hover:-translate-y-1"
                >
                  <div className="text-3xl">{f.icon}</div>

                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                      {f.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base">{f.desc}</p>
                  </div>

                  <div className="pt-2 text-xs sm:text-sm text-blue-600 font-semibold flex items-center gap-2">
                    <span className="inline-flex w-5 h-5 items-center justify-center rounded-full border border-blue-500">
                      ✓
                    </span>
                    Đã xác minh
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= NEWS ================= */}
        <section className="bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 space-y-10">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center px-4 py-1 rounded-full bg-blue-50 text-blue-700 text-sm border border-blue-100">
                📰 Tin tức y tế
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Cập nhật kiến thức y tế hằng ngày
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
                Những bài viết, mẹo sức khỏe từ các chuyên gia hàng đầu.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articles.map((a) => (
                <article
                  key={a.id}
                  className="bg-white rounded-3xl shadow-md hover:shadow-2xl overflow-hidden flex flex-col transition transform hover:-translate-y-1"
                >
                  <div className="h-44 md:h-48 overflow-hidden">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-5 sm:p-6 flex-1 flex flex-col gap-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                      {a.tag}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                      {a.title}
                    </h3>
                    <p className="text-slate-600 text-sm flex-1">{a.desc}</p>
                    <div className="flex items-center justify-between pt-2 text-xs sm:text-sm text-slate-500">
                      <span>{a.date}</span>
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        Xem chi tiết →
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center">
              <button className="inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded-full bg-blue-600 text-white text-sm sm:text-base font-semibold hover:bg-blue-700 shadow-md transition">
                Xem thêm tin tức
                <span className="ml-2 text-lg">➜</span>
              </button>
            </div>
          </div>
        </section>

        {/* ================= DOCTORS ================= */}
        <section className="bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 text-center space-y-10">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Danh sách bác sĩ hàng đầu
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
                Chuyên gia khoa học y tế với kinh nghiệm và chứng chỉ quốc tế.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
              {doctors.slice(0, 6).map((d) => (
                <div
                  key={d.id}
                  className="relative bg-white rounded-3xl shadow-md hover:shadow-2xl overflow-hidden flex flex-col transition transform hover:-translate-y-1"
                >
                  {/* Rating */}
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-400 text-xs font-semibold text-slate-900 shadow">
                    <span>⭐</span>
                    <span>{(d.rating ?? 4.9).toFixed(1)}</span>
                  </div>

                  <div className="h-44 sm:h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={d.imageUrl || "/doctors/default.png"}
                      alt={d.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4 sm:p-5 flex flex-col gap-2 text-left">
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-1">
                      {d.title ? `${d.title} ${d.name}` : d.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-600 font-medium">
                      {d.specialty || "Chuyên khoa"}
                    </p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <span>📍</span>
                      <span>Hà Nội</span>
                    </p>

                    <div className="pt-2">
                      <Link
                        to="/doctors"
                        className="inline-flex items-center justify-center w-full px-3 py-2 rounded-full bg-blue-500 text-white text-xs sm:text-sm font-semibold hover:bg-blue-600 transition"
                      >
                        Đặt lịch
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/doctors"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded-full bg-blue-600 text-white text-sm sm:text-base font-semibold hover:bg-blue-700 shadow-md transition"
              >
                Xem toàn bộ bác sĩ →
              </Link>
            </div>
          </div>
        </section>
        {/* ================= CTA ================= */}
        <section className="bg-gradient-to-r from-[#050b26] via-[#0b2161] to-[#0056ff] text-white">
          <div className="max-w-6xl mx-auto px-4 lg:px-6 py-14 lg:py-20 flex flex-col lg:flex-row items-center gap-10">
            
            {/* Left */}
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm">
                <span className="text-lg">✨</span>
                <span className="font-medium">Tạo tài khoản ngay</span>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                  Chăm sóc sức khỏe{" "}
                  <span className="text-sky-300">thông minh hôm nay</span>
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-blue-100 max-w-xl">
                  Tham gia ngay để được ưu tiên đặt lịch, quản lý hồ sơ khám bệnh và tận hưởng những ưu đãi đặc biệt từ hệ thống y tế uy tín.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded-full bg-white text-blue-800 font-semibold shadow-lg hover:bg-slate-100 transition text-sm sm:text-base"
                >
                  Đăng ký miễn phí
                  <span className="ml-2 text-lg">➜</span>
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded-full border border-white/70 text-white font-semibold hover:bg-white/10 transition text-sm sm:text-base"
                >
                  Đăng nhập
                </Link>
              </div>
            </div>

            {/* Right – optimized doctor image */}
            {/* Right */}
            <div className="flex-1 flex items-center justify-center">
              <div
                className="
                  relative w-full max-w-md p-4
                  rounded-3xl bg-white/5 overflow-visible
                  backdrop-blur-xl border border-white/20
                  shadow-[0_20px_40px_rgba(0,0,0,0.4)]
                  transition-all duration-300
                "
              >
                {/* Glow */}
                <div className="absolute inset-0 rounded-3xl shadow-[0_0_50px_15px_rgba(56,189,248,0.25)] pointer-events-none"></div>

                {/* Image wrapper */}
                <div className="relative w-full h-full flex items-center justify-center overflow-visible">
                  <img
                    src="/doctors/doctorCTA.png"
                    alt="Bác sĩ"
                    className="
                      w-[95%] h-auto object-contain
                      transition-all duration-500 ease-out
                      hover:scale-110 hover:translate-y-[-6px]
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* ================= CHATBOT WIDGET ================= */}
      <ChatbotWidget />
    </div>
  )
}
