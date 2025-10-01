import { useState } from 'react'
import dayjs from 'dayjs'
import { api } from "../store/api.js"

export default function Staff(){
  const [phone, setPhone] = useState('')
  const [doctorId, setDoctorId] = useState('11')
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [time, setTime] = useState('09:00')
  const doctors = api.getDoctors()
  const make = ()=>{
    const start_at = dayjs(date + ' ' + time).toISOString()
    const ap = api.createAppointment({ doctor_id: doctorId, start_at })
    alert('Đã đặt: ' + ap.code)
  }

  const todayList = api.getAppointments({ date })
  return (
    <div className="container-page py-8 space-y-6">
      <div className="section-title">Quầy lễ tân — Đặt nhanh</div>
      <div className="card p-4 grid md:grid-cols-4 gap-3">
        <div>
          <label className="label">SĐT bệnh nhân</label>
          <input className="input" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="090x..." />
        </div>
        <div>
          <label className="label">Bác sĩ</label>
          <select className="input" value={doctorId} onChange={e=>setDoctorId(e.target.value)}>
            {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Ngày</label>
          <input type="date" className="input" value={date} onChange={e=>setDate(e.target.value)} />
        </div>
        <div>
          <label className="label">Giờ</label>
          <input className="input" value={time} onChange={e=>setTime(e.target.value)} placeholder="HH:mm" />
        </div>
        <div className="md:col-span-4">
          <button className="btn btn-primary" onClick={make}>Đặt lịch</button>
        </div>
      </div>

      <div className="section-title">Danh sách hôm nay ({dayjs(date).format('DD/MM/YYYY')})</div>
      <div className="card p-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-600">
              <th className="p-2">Mã</th><th className="p-2">Bệnh nhân</th><th className="p-2">Bác sĩ</th><th className="p-2">Giờ</th><th className="p-2">TT</th>
            </tr>
          </thead>
          <tbody>
            {todayList.map(a => (
              <tr key={a.id} className="border-t">
                <td className="p-2">{a.code}</td>
                <td className="p-2">#{a.patient_id}</td>
                <td className="p-2">{api.getDoctor(a.doctor_id)?.name}</td>
                <td className="p-2">{dayjs(a.start_at).format('HH:mm')}</td>
                <td className="p-2"><span className="badge">{a.status}</span></td>
              </tr>
            ))}
            {todayList.length===0 && <tr><td className="p-4 text-slate-500" colSpan={5}>Chưa có lịch.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
