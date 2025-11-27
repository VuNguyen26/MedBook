import { useState, useEffect } from "react";
import axios from "axios";
import {
  Users,
  Mail,
  Phone,
  Calendar,
  Search,
  FileText,
  History,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DoctorPatients() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  // ========================= Load doctor =========================
  useEffect(() => {
    async function loadDoctor() {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/doctors/email/${user.email}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setDoctor(res.data);
      } catch (err) {
        console.error("❌ Lỗi load doctor:", err);
      }
    }

    if (user?.email) loadDoctor();
  }, []);

  // ========================= Load patients =========================
  useEffect(() => {
    async function loadPatients() {
      if (!doctor?.id) return;

      try {
        setLoading(true);

        // Lấy thống kê từ appointment-service
        const res = await axios.get(
          `http://localhost:8080/api/appointments/doctor/${doctor.id}/patients`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const stats = res.data;
        console.log("🔥 Stats từ appointment-service:", stats);

        const fullList = await Promise.all(
          stats.map(async (p) => {
            if (!p.patientId) {
              console.warn("⚠️ Bỏ qua record không có patientId:", p);
              return null;
            }

            try {
              const info = await axios.get(
                `http://localhost:8080/api/patients/${p.patientId}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );

              return {
                id: info.data.id,
                full_name: info.data.full_name,
                email: info.data.email,
                phone: info.data.phone,
                count: p.count,
                lastVisit: p.lastVisit,
              };
            } catch (err) {
              console.error("❌ Lỗi load thông tin bệnh nhân:", err);
              return null;
            }
          })
        );

        const cleanList = fullList.filter(Boolean);
        setPatients(cleanList);
        setFiltered(cleanList);
      } catch (err) {
        console.error("❌ Lỗi load patients:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPatients();
  }, [doctor]);

  // ========================= Search =========================
  useEffect(() => {
    const s = search.toLowerCase();

    const result = patients.filter((p) => {
      const fullName = p.full_name?.toLowerCase() || "";
      const email = p.email?.toLowerCase() || "";
      const phone = p.phone || "";

      return (
        fullName.includes(s) ||
        email.includes(s) ||
        phone.includes(s)
      );
    });

    setFiltered(result);
    setPage(1);
  }, [search, patients]);

  // ========================= Avatar Component =========================
  const Avatar = ({ name }) => {
    const letter = name?.charAt(0)?.toUpperCase() || "?";

    return (
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-100 text-teal-700 font-bold">
        {letter}
      </div>
    );
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="text-teal-600" />
        <h1 className="text-2xl font-bold text-teal-700">Bệnh nhân</h1>
      </div>

      {/* Search */}
      <div className="mb-5 flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
        <Search className="text-gray-500" size={18} />
        <input
          type="text"
          placeholder="Tìm theo tên, email, số điện thoại..."
          className="bg-transparent outline-none w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="animate-spin" /> Đang tải danh sách bệnh nhân...
        </div>
      )}

      {/* Empty */}
      {!loading && filtered.length === 0 && (
        <p className="text-gray-600">Không tìm thấy bệnh nhân phù hợp.</p>
      )}

      {/* Patient list */}
      {!loading && filtered.length > 0 && (
        <div className="space-y-4">
          {paginated.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition"
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                <Avatar name={p.full_name} />

                <div>
                  <h2 className="font-bold text-lg">{p.full_name}</h2>

                  <div className="text-gray-600 flex items-center gap-2 text-sm">
                    <Mail size={16} /> {p.email}
                  </div>

                  <div className="text-gray-600 flex items-center gap-2 text-sm">
                    <Phone size={16} /> {p.phone}
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="text-right">
                <div className="font-semibold text-teal-700">
                  {p.count} lần khám
                </div>

                <div className="text-gray-500 flex justify-end items-center gap-1 text-sm">
                  <Calendar size={16} /> {p.lastVisit}
                </div>

                <div className="flex justify-end gap-2 mt-2">
                  <button
                    className="flex items-center gap-1 bg-teal-100 text-teal-700 px-3 py-1 rounded-md hover:bg-teal-200"
                    onClick={() => navigate(`/doctor/patient/${p.id}/records`)}
                  >
                    <FileText size={16} />
                    Hồ sơ
                  </button>

                  <button
                    className="flex items-center gap-1 bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300"
                    onClick={() => navigate(`/doctor/patient/${p.id}/history`)}
                  >
                    <History size={16} />
                    Lịch sử
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filtered.length > pageSize && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            disabled={page === 1}
            className={`px-3 py-1 rounded ${
              page === 1 ? "bg-gray-200" : "bg-teal-100 hover:bg-teal-200"
            }`}
            onClick={() => setPage(page - 1)}
          >
            ← Trước
          </button>

          <span className="px-3 py-1 font-semibold">
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            className={`px-3 py-1 rounded ${
              page === totalPages
                ? "bg-gray-200"
                : "bg-teal-100 hover:bg-teal-200"
            }`}
            onClick={() => setPage(page + 1)}
          >
            Sau →
          </button>
        </div>
      )}
    </div>
  );
}
