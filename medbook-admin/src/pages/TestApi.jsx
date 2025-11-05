import { useEffect, useState } from "react";
import api from "../api/axios";
import { API_ROUTES } from "../api/routes";

export default function TestApi() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(API_ROUTES.doctor.all)
      .then((res) => {
        console.log("✅ API Response:", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.error("❌ API Error:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-pink-500">🧠 Test API Gateway</h2>

      {loading && <p className="text-gray-600">⏳ Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">❌ Lỗi: {error}</p>}

      {data.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((doctor) => (
            <div key={doctor.id} className="p-4 bg-white rounded-xl shadow-md">
              <h3 className="font-semibold text-lg text-blue-600">{doctor.name}</h3>
              <p className="text-sm text-gray-700">{doctor.title}</p>
              <p className="text-sm text-gray-500">{doctor.email}</p>
              <p className="text-sm text-gray-500">{doctor.phone}</p>
              <p className="mt-2 text-green-600 font-medium">
                💰 {doctor.fee?.toLocaleString()} VND
              </p>
              <p className="text-yellow-600">⭐ {doctor.rating}</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-gray-500">Không có dữ liệu bác sĩ nào!</p>
      )}

      <pre className="bg-gray-900 text-green-300 p-3 rounded mt-6 overflow-x-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
