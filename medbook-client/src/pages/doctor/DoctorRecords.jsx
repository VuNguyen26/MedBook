import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { FileText, Star } from "lucide-react";

const API_BASE_URL = "http://localhost:8080/api";

export default function DoctorRecords() {
  const token = localStorage.getItem("token");
  const user = useMemo(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  }, []);

  const authHeaders = useMemo(() => {
    if (!token) return {};
    return { Authorization: `Bearer ${token}` };
  }, [token]);

  const [doctor, setDoctor] = useState(null);
  const [records, setRecords] = useState([]);

  const [loadingDoctor, setLoadingDoctor] = useState(false);
  const [loadingRecords, setLoadingRecords] = useState(false);
  const [errorDoctor, setErrorDoctor] = useState("");
  const [errorRecords, setErrorRecords] = useState("");

  // Bước 1: email -> doctor
  useEffect(() => {
    if (!user?.email) return;

    const controller = new AbortController();

    async function fetchDoctor() {
      setLoadingDoctor(true);
      setErrorDoctor("");

      try {
        const res = await axios.get(
          `${API_BASE_URL}/doctors/email/${encodeURIComponent(user.email)}`,
          { headers: authHeaders, signal: controller.signal }
        );
        setDoctor(res.data ?? null);
      } catch (err) {
        if (axios.isCancel?.(err)) return;
        setDoctor(null);
        setErrorDoctor("Không tìm thấy thông tin bác sĩ gắn với tài khoản.");
        // console.error(err);
      } finally {
        setLoadingDoctor(false);
      }
    }

    fetchDoctor();
    return () => controller.abort();
  }, [user?.email, authHeaders]);

  // Bước 2: doctor.id -> reviews -> map patientName
  useEffect(() => {
    if (!doctor?.id) return;

    const controller = new AbortController();

    async function fetchRecords() {
      setLoadingRecords(true);
      setErrorRecords("");

      try {
        const res = await axios.get(
          `${API_BASE_URL}/appointments/doctor/${doctor.id}/reviews`,
          { headers: authHeaders, signal: controller.signal }
        );

        const reviews = Array.isArray(res.data) ? res.data : [];

        // Cache patient theo patientId để không gọi trùng nếu nhiều review cùng 1 bệnh nhân
        const patientCache = new Map();

        const withPatientName = await Promise.all(
          reviews.map(async (review) => {
            const patientId = review?.patientId;
            if (!patientId) return { ...review, patientName: "Ẩn Danh" };

            if (patientCache.has(patientId)) {
              return { ...review, patientName: patientCache.get(patientId) };
            }

            try {
              const p = await axios.get(`${API_BASE_URL}/patients/${patientId}`, {
                headers: authHeaders,
                signal: controller.signal,
              });

              const name = p?.data?.full_name || "Ẩn Danh";
              patientCache.set(patientId, name);

              return { ...review, patientName: name };
            } catch (err) {
              if (axios.isCancel?.(err)) return review;
              return { ...review, patientName: "Ẩn Danh" };
            }
          })
        );

        setRecords(withPatientName);
      } catch (err) {
        if (axios.isCancel?.(err)) return;
        setRecords([]);
        setErrorRecords("Lỗi tải danh sách đánh giá.");
        // console.error(err);
      } finally {
        setLoadingRecords(false);
      }
    }

    fetchRecords();
    return () => controller.abort();
  }, [doctor?.id, authHeaders]);

  const isLoading = loadingDoctor || loadingRecords;

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="text-teal-600" />
        <h1 className="text-2xl font-bold text-teal-700">
          Đánh giá của khách hàng
        </h1>
      </div>

      {isLoading && (
        <p className="text-sm text-gray-500">Đang tải dữ liệu...</p>
      )}

      {!isLoading && (errorDoctor || !doctor) && (
        <p className="text-sm text-gray-500">
          {errorDoctor || "Không tìm thấy thông tin bác sĩ gắn với tài khoản."}
        </p>
      )}

      {!isLoading && doctor && errorRecords && (
        <p className="text-sm text-red-600">{errorRecords}</p>
      )}

      {!isLoading && doctor && !errorRecords && records.length === 0 && (
        <p className="text-gray-600 mt-3">Chưa có đánh giá nào.</p>
      )}

      {!isLoading && doctor && !errorRecords && records.length > 0 && (
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="p-3 text-left">Bệnh nhân</th>
              <th className="p-3 text-left">Ngày</th>
              <th className="p-3 text-left">Giờ</th>
              <th className="p-3 text-left">Đánh giá</th>
              <th className="p-3 text-left">Nhận xét</th>
            </tr>
          </thead>

          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-semibold">
                  {r.patientName || "Ẩn Danh"}
                </td>

                <td className="p-3">
                  {r.appointmentDate
                    ? dayjs(r.appointmentDate).format("DD/MM/YYYY")
                    : "-"}
                </td>

                <td className="p-3">
                  {r.appointmentTime ? r.appointmentTime.slice(0, 5) : "--:--"}
                </td>

                <td className="p-3">
                  <div className="flex gap-1">
                    {Array.from({ length: r.rating || 0 }).map((_, i) => (
                      <Star
                        key={i}
                        className="text-amber-400 fill-amber-400 w-4 h-4"
                      />
                    ))}
                  </div>
                </td>

                <td className="p-3 text-gray-700">
                  {r.ratingComment || "Không có nhận xét"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
