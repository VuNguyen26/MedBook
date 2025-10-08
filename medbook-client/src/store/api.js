import dayjs from 'dayjs'
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

const LS_KEY = 'medbook-db-v1'

const defaultDB = {
  users: [
    { id: 1, role: 'patient', name: 'Nguyễn An', phone: '0900000001', password: '123456' },
    { id: 2, role: 'doctor',  name: 'BS. Trần Minh', phone: '0900000002', password: '123456' },
    { id: 3, role: 'staff',   name: 'Lễ tân 1', phone: '0900000003', password: '123456' },
    { id: 4, role: 'admin',   name: 'Quản trị', phone: '0900000004', password: '123456' },
  ],

  specialties: [
    { id: 1, name: 'Bác sĩ đa khoa' },
    { id: 2, name: 'Bác sĩ phụ khoa' },
    { id: 3, name: 'Bác sĩ da liễu' },
    { id: 4, name: 'Bác sĩ nhi khoa' },
    { id: 5, name: 'Bác sĩ thần kinh' },
    { id: 6, name: 'Bác sĩ chuyên khoa tiêu hóa' },
  ],

  clinic_locations: [
    { id: 1, name: 'Cơ sở 1', address: '273 An Dương Vương, phường Chợ Quán, TP.HCM', hotline: '1900-000-111' },
  ],

  doctors: [
    { id: 11, user_id: 2, name: 'Nguyễn Trương Khương', title: 'ThS.BS.CKII', specialty_id: 5, clinic_location_id: 1, bio: 'Giám đốc chuyên môn - 26 năm kinh nghiệm', fee: 300000, duration_minutes: 30, active: true, experience_years: 26, image: '/doctors/A.jpg' },
    { id: 12, user_id: 2, name: 'Nguyễn Kim Chung', title: 'TS.BS', specialty_id: 5, clinic_location_id: 1, bio: 'Chuyên gia Ngoại Thần kinh – Sọ não – Cột sống (30 năm kinh nghiệm)', fee: 350000, duration_minutes: 30, active: true, experience_years: 30, image: '/doctors/B.jpg' },
    { id: 13, user_id: 2, name: 'Nguyễn Mỹ Bảo Anh', title: 'PGS.TS.BS', specialty_id: 1, clinic_location_id: 2, bio: 'Trưởng khoa Ngoại Lồng ngực – 40 năm kinh nghiệm', fee: 400000, duration_minutes: 40, active: true, experience_years: 40, image: '/doctors/C.jpg' },
    { id: 14, user_id: 2, name: 'Lê Khâm Tuấn', title: 'TS.BS', specialty_id: 5, clinic_location_id: 2, bio: 'Trưởng khoa Ngoại Thần kinh – Cột sống – 19 năm kinh nghiệm', fee: 350000, duration_minutes: 30, active: true, experience_years: 19, image: '/doctors/D.jpg' },
    { id: 15, user_id: 2, name: 'Võ Văn Mẫn', title: 'BS.CKII', specialty_id: 1, clinic_location_id: 1, bio: 'Trưởng khoa Chấn thương Chỉnh hình – 30 năm kinh nghiệm', fee: 320000, duration_minutes: 30, active: true, experience_years: 30, image: '/doctors/E.jpg' },
    { id: 16, user_id: 2, name: 'Nguyễn Quốc Vinh', title: 'TS.BS', specialty_id: 1, clinic_location_id: 1, bio: 'Trưởng khoa Ngoại Tổng hợp – 20 năm kinh nghiệm', fee: 280000, duration_minutes: 25, active: true, experience_years: 20, image: '/doctors/G.jpg' },
    { id: 17, user_id: 2, name: 'Vũ Hữu Vĩnh', title: 'BS.CKII', specialty_id: 1, clinic_location_id: 2, bio: 'Trưởng khoa Khám bệnh – 28 năm kinh nghiệm', fee: 250000, duration_minutes: 20, active: true, experience_years: 28, image: '/doctors/H.jpg' },
    { id: 18, user_id: 2, name: 'Lê Hoa Hiếu Nhân', title: 'BS.CKII', specialty_id: 1, clinic_location_id: 2, bio: 'Ngoại tổng hợp – 26 năm kinh nghiệm', fee: 270000, duration_minutes: 20, active: true, experience_years: 26, image: '/doctors/I.jpg' },
    { id: 19, user_id: 2, name: 'Nguyễn Lan Chi', title: 'TS.BS', specialty_id: 6, clinic_location_id: 1, bio: 'Chuyên khoa Tiêu hóa – Gan mật – 22 năm kinh nghiệm', fee: 300000, duration_minutes: 30, active: true, experience_years: 22, image: '/doctors/K.jpg' },
    { id: 20, user_id: 2, name: 'Trần Thị Lan', title: 'BS.CKII', specialty_id: 3, clinic_location_id: 1, bio: 'Chuyên khoa Tai Mũi Họng – 18 năm kinh nghiệm', fee: 250000, duration_minutes: 25, active: true, experience_years: 18, image: '/doctors/L.jpg' },
    { id: 21, user_id: 2, name: 'Phạm Thị Thanh Tuyền', title: 'PGS.TS.BS', specialty_id: 1, clinic_location_id: 2, bio: 'Chuyên gia Đa khoa – 35 năm kinh nghiệm', fee: 400000, duration_minutes: 40, active: true, experience_years: 35, image: '/doctors/M.jpg' },
    { id: 22, user_id: 2, name: 'Lê Thị Hồng Nhung', title: 'BS.CKII', specialty_id: 6, clinic_location_id: 2, bio: 'Chuyên khoa Tiêu hóa – 15 năm kinh nghiệm', fee: 280000, duration_minutes: 25, active: true, experience_years: 15, image: '/doctors/N.jpg' },
    { id: 23, user_id: 2, name: 'Đặng Như Bình', title: 'TS.BS', specialty_id: 1, clinic_location_id: 1, bio: 'Chuyên khoa Đa khoa – 20 năm kinh nghiệm', fee: 300000, duration_minutes: 30, active: true, experience_years: 20, image: '/doctors/O.jpg' },
    { id: 24, user_id: 2, name: 'Nguyễn Văn Long', title: 'BS', specialty_id: 2, clinic_location_id: 1, bio: 'Chuyên khoa Phụ khoa – 12 năm kinh nghiệm', fee: 260000, duration_minutes: 25, active: true, experience_years: 12, image: '/doctors/T.jpg' },
    { id: 25, user_id: 2, name: 'Phạm Văn Minh', title: 'ThS', specialty_id: 3, clinic_location_id: 2, bio: 'Chuyên khoa Da liễu – 15 năm kinh nghiệm', fee: 270000, duration_minutes: 20, active: true, experience_years: 15, image: '/doctors/Q.jpg' },
    { id: 26, user_id: 2, name: 'Trần Thị Thu', title: 'BS.CKI', specialty_id: 4, clinic_location_id: 1, bio: 'Chuyên khoa Nhi – 10 năm kinh nghiệm', fee: 240000, duration_minutes: 20, active: true, experience_years: 10, image: '/doctors/P.jpg' },
    { id: 27, user_id: 2, name: 'Hoàng Văn Tâm', title: 'BS.CKII', specialty_id: 5, clinic_location_id: 2, bio: 'Chuyên khoa Thần kinh – 18 năm kinh nghiệm', fee: 290000, duration_minutes: 30, active: true, experience_years: 18, image: '/doctors/R.jpg' },
    { id: 28, user_id: 2, name: 'Ngô Thị Hạnh', title: 'ThS', specialty_id: 6, clinic_location_id: 1, bio: 'Chuyên khoa Tiêu hóa – 14 năm kinh nghiệm', fee: 250000, duration_minutes: 25, active: true, experience_years: 14, image: '/doctors/S.jpg' },
    { id: 29, user_id: 2, name: 'Phạm Thị Mai', title: 'BS.CKI', specialty_id: 2, clinic_location_id: 2, bio: 'Chuyên khoa Phụ khoa – 17 năm kinh nghiệm', fee: 270000, duration_minutes: 25, active: true, experience_years: 17, image: '/doctors/U.jpg' },
    { id: 30, user_id: 2, name: 'Nguyễn Thị Hoa', title: 'BS', specialty_id: 4, clinic_location_id: 2, bio: 'Chuyên khoa Nhi – 8 năm kinh nghiệm', fee: 230000, duration_minutes: 20, active: true, experience_years: 8, image: '/doctors/V.jpg' },
  ],

  services: [
    { id: 101, name: 'Khám chuyên khoa', code: 'KS-CK', fee: 200000, duration_minutes: 20, active: true },
  ],

  // 🔹 Tự sinh lịch làm việc: tất cả bác sĩ, 7 ngày/tuần, sáng + chiều
  doctor_schedules: [
    ...Array.from({ length: 30 - 11 + 1 }, (_, i) => {
      const doctorId = 11 + i
      return Array.from({ length: 7 }, (_, dow) => ([
        { id: `sch_${doctorId}_${dow}_am`, doctor_id: doctorId, day_of_week: dow, start_time: "08:00", end_time: "11:40" },
        { id: `sch_${doctorId}_${dow}_pm`, doctor_id: doctorId, day_of_week: dow, start_time: "13:00", end_time: "17:00" },
      ])).flat()
    }).flat()
  ],

  doctor_time_off: [],
  ratings: [],
  appointments: [],
  payments: []
}

function loadDB(){
  saveDB(defaultDB)
  return defaultDB
}

function saveDB(db){ localStorage.setItem(LS_KEY, JSON.stringify(db)) }
function uid(prefix=''){ return prefix + Math.random().toString(36).slice(2,10) }

export const api = {
  reset(){ saveDB(defaultDB); return true },
  authenticate(phone, password){
    const u = loadDB().users.find(x => x.phone===phone && x.password===password)
    return u || null
  },

  getSpecialties(){ return loadDB().specialties },
  getDoctors(params = {}){
    const db = loadDB()
    let docs = db.doctors
    if (params.specialty_id) docs = docs.filter(d => String(d.specialty_id) === String(params.specialty_id))
    if (params.q){
      const q = params.q.toLowerCase()
      docs = docs.filter(d => d.name.toLowerCase().includes(q) || (d.bio||'').toLowerCase().includes(q))
    }
    return docs
  },
  getDoctor(id){ return this.getDoctors().find(d => String(d.id) === String(id)) },
  getServices(){ return loadDB().services },
  getClinicLocations(){ return loadDB().clinic_locations },

  addRating({ doctor_id, patient_id, stars, comment }){
    const db = loadDB()
    db.ratings.push({ id: uid('r_'), doctor_id: Number(doctor_id), patient_id: Number(patient_id), stars, comment, created_at: new Date().toISOString() })
    saveDB(db); return true
  },
  getRatingsByDoctor(doctor_id){
    return loadDB().ratings.filter(r => r.doctor_id === Number(doctor_id))
  },

  getDoctorSchedules(doctor_id){
    return loadDB().doctor_schedules.filter(s=> String(s.doctor_id)===String(doctor_id))
  },
  addDoctorSchedule(s){
    const db = loadDB()
    s.id = uid('sch_')
    db.doctor_schedules.push(s)
    saveDB(db); return s
  },
  addDoctorTimeOff(off){
    const db = loadDB()
    off.id = uid('off_')
    db.doctor_time_off.push(off)
    saveDB(db); return off
  },

  getAppointments(params={}){
    const db = loadDB()
    let apps = db.appointments
    if (params.patient_id) apps = apps.filter(a => String(a.patient_id) === String(params.patient_id))
    if (params.doctor_id) apps = apps.filter(a => String(a.doctor_id) === String(params.doctor_id))
    if (params.date){
      const day = dayjs(params.date).format('YYYY-MM-DD')
      apps = apps.filter(a => a.start_at.startsWith(day))
    }
    return apps.sort((a,b)=> dayjs(a.start_at).valueOf() - dayjs(b.start_at).valueOf())
  },
  cancelAppointment(id){
    const db = loadDB()
    const appt = db.appointments.find(a=> String(a.id)===String(id))
    if (appt){ appt.status = 'cancelled'; saveDB(db); }
    return appt
  },
  checkinAppointment(id){
    const db = loadDB()
    const appt = db.appointments.find(a=> String(a.id)===String(id))
    if (appt){ appt.status = 'checked_in'; saveDB(db); }
    return appt
  },
  getDoctorSlots({ doctor_id, date, service_duration }){
    const db = loadDB()
    const dow = dayjs(date).day()
    const schedules = db.doctor_schedules.filter(s => s.doctor_id === Number(doctor_id) && s.day_of_week === dow)
    if (!schedules.length) return []
    const appts = db.appointments.filter(a =>
      a.doctor_id === Number(doctor_id) &&
      a.start_at.startsWith(dayjs(date).format('YYYY-MM-DD')) &&
      ['pending','confirmed','checked_in'].includes(a.status)
    )
    const offs = db.doctor_time_off.filter(o => o.doctor_id === Number(doctor_id) && o.off_date === dayjs(date).format('YYYY-MM-DD'))
    const slots = []
    const dur = service_duration || 20
    for (const s of schedules){
      let cursor = dayjs(dayjs(date).format('YYYY-MM-DD') + ' ' + s.start_time)
      const end = dayjs(dayjs(date).format('YYYY-MM-DD') + ' ' + s.end_time)
      while (cursor.add(dur, 'minute').isSameOrBefore(end)){
        const start = cursor
        const finish = cursor.add(dur, 'minute')
        const overlapAppt = appts.find(a => !(dayjs(a.end_at).isSameOrBefore(start) || dayjs(a.start_at).isSameOrAfter(finish)))
        const overlapOff = offs.find(o => {
          const offStart = dayjs(dayjs(date).format('YYYY-MM-DD') + ' ' + o.start_time)
          const offEnd = dayjs(dayjs(date).format('YYYY-MM-DD') + ' ' + o.end_time)
          return !(offEnd.isSameOrBefore(start) || offStart.isSameOrAfter(finish))
        })
        if (!overlapAppt && !overlapOff){
          slots.push({ start_at: start.toISOString(), end_at: finish.toISOString() })
        }
        cursor = cursor.add(dur, 'minute')
      }
    }
    return slots
  },
  createAppointment({ patient_id=1, doctor_id, service_id, clinic_location_id, start_at }){
    const db = loadDB()
    const doctor = db.doctors.find(d=> d.id === Number(doctor_id))
    const service = service_id ? db.services.find(s=> s.id === Number(service_id)) : null
    const duration = service?.duration_minutes || doctor?.duration_minutes || 20
    const end_at = dayjs(start_at).add(duration, 'minute').toISOString()
    const id = uid('apt_')
    const code = uid('AP')
    const item = {
      id, code, patient_id, doctor_id: Number(doctor_id), service_id: service?.id || null,
      clinic_location_id: clinic_location_id || doctor?.clinic_location_id || 1,
      start_at, end_at, status: 'pending', channel: 'web', note: '', payment_status: 'unpaid',
      created_at: new Date().toISOString()
    }
    db.appointments.push(item); saveDB(db)
    return item
  },
  payAppointment(appointment_id, method='cash'){
    const db = loadDB()
    const ap = db.appointments.find(a=> a.id === appointment_id)
    if (!ap) return null
    ap.payment_status = 'paid'
    ap.status = 'confirmed'
    db.payments.push({ id: uid('pay_'), appointment_id, amount: 100000, method, status: 'paid', paid_at: new Date().toISOString() })
    saveDB(db)
    return ap
  },

  addSpecialty(name){
    const db = loadDB()
    const id = db.specialties.reduce((m, s)=> Math.max(m, s.id), 0) + 1
    const item = { id, name }
    db.specialties.push(item); saveDB(db); return item
  },
  addDoctor(doc){
    const db = loadDB()
    const id = db.doctors.reduce((m, s)=> Math.max(m, s.id), 10) + 1
    doc.id = id; db.doctors.push(doc); saveDB(db); return doc
  }
}
