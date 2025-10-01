import { useState } from 'react'
import { api } from "../store/api.js"

export default function Admin(){
  const [specName, setSpecName] = useState('')
  const [doc, setDoc] = useState({ name:'', specialty_id:'', clinic_location_id:1, fee:200000, duration_minutes:20, bio:'' })
  const specs = api.getSpecialties()
  const locs = api.getClinicLocations()
  const docs = api.getDoctors()

  const addSpec = ()=>{ if(!specName) return; api.addSpecialty(specName); setSpecName(''); location.reload() }
  const addDoc = ()=>{
    if(!doc.name || !doc.specialty_id) return alert('Điền tên và chuyên khoa')
    api.addDoctor({ ...doc, specialty_id: Number(doc.specialty_id), fee: Number(doc.fee), duration_minutes: Number(doc.duration_minutes), active: true, user_id: 2 })
    location.reload()
  }

  return (
    <div className="container-page py-8 space-y-8">
      <div className="section-title">Quản trị</div>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="card p-4 space-y-3">
          <div className="font-semibold">Thêm chuyên khoa</div>
          <input className="input" placeholder="VD: Da liễu" value={specName} onChange={e=>setSpecName(e.target.value)} />
          <button className="btn btn-primary" onClick={addSpec}>Lưu</button>
          <div className="text-sm text-slate-600">Hiện có: {specs.length} chuyên khoa</div>
        </div>

        <div className="card p-4 space-y-3">
          <div className="font-semibold">Thêm bác sĩ</div>
          <input className="input" placeholder="Tên bác sĩ" value={doc.name} onChange={e=>setDoc({...doc, name:e.target.value})} />
          <select className="input" value={doc.specialty_id} onChange={e=>setDoc({...doc, specialty_id:e.target.value})}>
            <option value="">— Chọn chuyên khoa —</option>
            {specs.map(s=> <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <select className="input" value={doc.clinic_location_id} onChange={e=>setDoc({...doc, clinic_location_id:e.target.value})}>
            {locs.map(l=> <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
          <div className="grid grid-cols-2 gap-3">
            <input className="input" placeholder="Phí" value={doc.fee} onChange={e=>setDoc({...doc, fee:e.target.value})} />
            <input className="input" placeholder="Thời lượng (phút)" value={doc.duration_minutes} onChange={e=>setDoc({...doc, duration_minutes:e.target.value})} />
          </div>
          <textarea className="input" rows={4} placeholder="Giới thiệu" value={doc.bio} onChange={e=>setDoc({...doc, bio:e.target.value})}></textarea>
          <button className="btn btn-primary" onClick={addDoc}>Lưu</button>
          <div className="text-sm text-slate-600">Hiện có: {docs.length} bác sĩ</div>
        </div>
      </section>

      <section className="card p-4">
        <div className="font-semibold mb-2">Danh sách bác sĩ</div>
        <div className="grid-autofill">
          {docs.map(d => (
            <div key={d.id} className="border rounded-xl p-3">
              <div className="font-medium">{d.name}</div>
              <div className="text-sm text-slate-600">Chuyên khoa #{d.specialty_id} • Phí: {d.fee.toLocaleString()}đ • {d.duration_minutes}'</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
