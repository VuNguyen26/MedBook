import { Link } from "react-router-dom";
import { ArrowLeft, Shield, FileText, Stethoscope } from "lucide-react";

export default function TermsOfService() {
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
              <div className="p-3 bg-blue-100 rounded-2xl">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
                  Điều khoản sử dụng
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Quy định sử dụng nền tảng MedBook
                </p>
              </div>
            </div>

            {/* Nội dung điều khoản */}
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <section>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  Chấp nhận điều khoản
                </h2>
                <p className="mt-3 pl-10">
                  Bằng việc truy cập hoặc sử dụng <strong>MedBook</strong>, bạn xác nhận đã đọc, hiểu và đồng ý bị ràng buộc bởi các Điều khoản sử dụng này. Nếu bạn không đồng ý, vui lòng không sử dụng dịch vụ.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Dịch vụ cung cấp
                </h2>
                <p className="mt-3 pl-10">
                  MedBook là nền tảng <strong>đặt lịch khám bệnh trực tuyến</strong>. Chúng tôi kết nối bệnh nhân với bác sĩ, hỗ trợ đặt lịch, thanh toán và nhận kết quả. Dịch vụ <strong>không thay thế tư vấn y tế trực tiếp</strong>.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  Tài khoản người dùng
                </h2>
                <p className="mt-3 pl-10">
                  Bạn chịu trách nhiệm:
                </p>
                <ul className="mt-2 pl-10 space-y-1 list-disc">
                  <li>Bảo mật mật khẩu và thông tin tài khoản</li>
                  <li>Cung cấp thông tin <strong>chính xác, đầy đủ</strong></li>
                  <li>Thông báo ngay nếu tài khoản bị xâm phạm</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  Bảo mật & HIPAA
                </h2>
                <p className="mt-3 pl-10">
                  Dữ liệu y tế được:
                </p>
                <ul className="mt-2 pl-10 space-y-1 list-disc">
                  <li>Mã hóa end-to-end (SSL/TLS)</li>
                  <li>Lưu trữ trên server tuân thủ <strong>HIPAA</strong></li>
                  <li>Chỉ chia sẻ với bác sĩ khi bạn đặt khám</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  Hủy dịch vụ
                </h2>
                <p className="mt-3 pl-10">
                  Bạn có thể <strong>xóa tài khoản bất kỳ lúc nào</strong> trong phần cài đặt. Dữ liệu sẽ được xóa vĩnh viễn sau 30 ngày.
                </p>
              </section>
            </div>

            {/* Ngày cập nhật */}
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