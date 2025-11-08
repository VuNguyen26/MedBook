import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, FileText, Stethoscope } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex flex-col">
      {/* ===== Header với nút quay lại ===== */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo + Tên */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">MedBook</span>
            </div>

            {/* Nút quay lại trang đăng ký */}
            <Link
              to="/register"
              className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-full shadow-md hover:shadow-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Quay lại đăng ký</span>
              <span className="sm:hidden">Quay lại</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ===== Nội dung chính ===== */}
      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            {/* Tiêu đề + Icon */}
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-green-100 rounded-2xl">
                <Lock className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
                  Chính sách bảo mật
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Cam kết bảo vệ dữ liệu y tế của bạn
                </p>
              </div>
            </div>

            {/* Nội dung chính sách */}
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <section>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  Thông tin chúng tôi thu thập
                </h2>
                <p className="mt-3 pl-10">
                  Chúng tôi chỉ thu thập dữ liệu <strong>cần thiết</strong> để cung cấp dịch vụ:
                </p>
                <ul className="mt-2 pl-10 space-y-1 list-disc">
                  <li>Họ tên, email, số điện thoại</li>
                  <li>Lịch sử đặt khám, kết quả xét nghiệm (nếu có)</li>
                  <li>Thông tin thanh toán (được mã hóa, không lưu)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Mục đích sử dụng dữ liệu
                </h2>
                <p className="mt-3 pl-10">
                  Dữ liệu được sử dụng để:
                </p>
                <ul className="mt-2 pl-10 space-y-1 list-disc">
                  <li>Xác thực tài khoản & bảo mật</li>
                  <li>Gửi thông báo lịch khám, kết quả</li>
                  <li>Cải thiện trải nghiệm người dùng</li>
                  <li>Phân tích thống kê (ẩn danh)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  Bảo mật dữ liệu
                </h2>
                <p className="mt-3 pl-10">
                  Chúng tôi cam kết:
                </p>
                <ul className="mt-2 pl-10 space-y-1 list-disc">
                  <li>Mã hóa dữ liệu bằng <strong>SSL/TLS</strong></li>
                  <li>Lưu trữ trên server <strong>tuân thủ HIPAA</strong></li>
                  <li>Không lưu mật khẩu dạng văn bản</li>
                  <li>Giám sát 24/7, phát hiện xâm nhập</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  Chia sẻ dữ liệu
                </h2>
                <p className="mt-3 pl-10">
                  <strong>Chúng tôi KHÔNG bán dữ liệu.</strong> Chỉ chia sẻ khi:
                </p>
                <ul className="mt-2 pl-10 space-y-1 list-disc">
                  <li>Bạn đặt lịch → gửi cho bác sĩ/bệnh viện</li>
                  <li>Yêu cầu pháp lý từ cơ quan có thẩm quyền</li>
                  <li>Đối tác thanh toán (chỉ mã hóa)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  Quyền của bạn
                </h2>
                <p className="mt-3 pl-10">
                  Bạn có quyền:
                </p>
                <ul className="mt-2 pl-10 space-y-1 list-disc">
                  <li>Yêu cầu xem, sửa, xóa dữ liệu cá nhân</li>
                  <li>Hủy tài khoản → xóa dữ liệu sau 30 ngày</li>
                  <li>Từ chối nhận thông báo quảng cáo</li>
                  <li>Liên hệ <strong>support@medbook.vn</strong> để khiếu nại</li>
                </ul>
              </section>
            </div>

            {/* Ngày cập nhật + HIPAA Badge */}
            <div className="mt-10 pt-8 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
              <p>Cập nhật lần cuối: <strong>07/11/2025</strong></p>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span>Tuân thủ HIPAA</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ===== Footer nhỏ gọn ===== */}
      <footer className="bg-white border-t border-gray-100 py-6 px-4">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600">
          © 2025 <strong>MedBook</strong>. Nền tảng đặt lịch khám bệnh trực tuyến. Bảo mật theo tiêu chuẩn HIPAA.
        </div>
      </footer>
    </div>
  );
}