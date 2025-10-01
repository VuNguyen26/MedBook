import { useParams, useNavigate, Link } from 'react-router-dom'
import { api } from "../store/api.js"

export default function Payment(){
  const { appointmentId } = useParams()
  const nav = useNavigate()
  const appt = api.getAppointments({}).find(a => a.id === appointmentId)

  if (!appt) return <div className="container-page py-8">Không tìm thấy cuộc hẹn.</div>

  const pay = () => {
    api.payAppointment(appointmentId, 'vnpay')
    nav('/patient')
  }

  return (
    <div className="container-page py-8 space-y-6">
      <div className="section-title">Thanh toán</div>
      <div className="card p-6 space-y-3 max-w-xl">
        <div>Mã cuộc hẹn: <b>{appt.code}</b></div>
        <div>Thời gian: <b>{new Date(appt.start_at).toLocaleString()}</b></div>
        <div className="text-slate-600 text-sm">* Demo thanh toán: nhấn nút <b>Thanh toán</b> để xác nhận.</div>
        <div className="flex gap-2">
          <button className="btn btn-primary" onClick={pay}>Thanh toán</button>
          <Link to={`/doctors/${appt.doctor_id}`} className="btn btn-outline">Quay lại</Link>
        </div>
      </div>
    </div>
  )
}
