import { useState } from 'react'
import dayjs from 'dayjs'
import { api } from '../store/api'
import { useAuth } from '../store/auth'
import DateField from '../components/DateField'

export default function DoctorBoard(){
  const { user } = useAuth()
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  const myDoctor = api.getDoctors().find(d => d.user_id === (user?.id || -1))
  const myDoctorId = myDoctor?.id
  const list = myDoctorId ? api.getAppointments({ doctor_id: myDoctorId, date }) : []

  const checkin = (id)=> { api.checkinAppointment(id); location.reload() }

  return (
    <div className="container-page py-8 space-y-5">
      <div className="flex items-center justify-between">
        <div className="section-title">Lịch bác sĩ {myDoctor ? `(${myDoctor.name})` : ''}</div>
        <div className="w-64"><DateField label="Ngày" value={date} onChange={setDate} /></div>
      </div>
      {!myDoctorId && <div className="text-slate-600">Tài khoản này chưa được gán vào hồ sơ bác sĩ.</div>}
      {myDoctorId && (
        <div className="card p-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead><tr className="text-left text-slate-600">
              <th className="p-2">Mã</th><th className="p-2">Bệnh nhân</th><th className="p-2">Giờ</th><th className="p-2">TT</th><th></th>
            </tr></thead>
            <tbody>
              {list.map(a => (
                <tr key={a.id} className="border-t">
                  <td className="p-2">{a.code}</td>
                  <td className="p-2">BN #{a.patient_id}</td>
                  <td className="p-2">{dayjs(a.start_at).format('HH:mm')}</td>
                  <td className="p-2"><span className="badge">{a.status}</span></td>
                  <td className="p-2">{a.status!=='checked_in' && <button className="btn btn-primary" onClick={()=>checkin(a.id)}>Check-in</button>}</td>
                </tr>
              ))}
              {list.length===0 && <tr><td className="p-4 text-slate-500" colSpan={5}>Không có ca nào.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
