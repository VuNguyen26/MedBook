import { api } from "../store/api"
import { auth } from "../store/auth"
import dayjs from "dayjs"

export default function Patient() {
  const user = auth.getCurrentUser()   // ✅ thay vì useAuth
  const list = api.getAppointments({ patient_id: user?.id }) || []

  const doctorName = (id) => api.getDoctor(id)?.name || "—"
  const cancel = (id) => {
    api.cancelAppointment(id)
    location.reload()
  }

  if (!user) {
    return (
      <div className="container-page py-8 text-red-600 font-semibold">
        ❌ Bạn chưa đăng nhập.
      </div>
    )
  }

  return (
    <div className="container-page py-8 space-y-5">
      <div className="section-title">Lịch hẹn của tôi</div>
      <div className="card p-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-600">
              <th className="p-2">Mã</th>
              <th className="p-2">Bác sĩ</th>
              <th className="p-2">Thời gian</th>
              <th className="p-2">Trạng thái</th>
              <th className="p-2">Thanh toán</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {list.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-2">{a.code}</td>
                <td className="p-2">{doctorName(a.doctor_id)}</td>
                <td className="p-2">
                  {dayjs(a.start_at).format("DD/MM/YYYY HH:mm")}
                </td>
                <td className="p-2">
                  <span className="badge">{a.status}</span>
                </td>
                <td className="p-2">{a.payment_status}</td>
                <td className="p-2">
                  {a.status !== "cancelled" && (
                    <button
                      className="btn btn-outline"
                      onClick={() => cancel(a.id)}
                    >
                      Huỷ
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td
                  className="p-4 text-slate-500"
                  colSpan={6}
                >
                  Chưa có lịch hẹn nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
