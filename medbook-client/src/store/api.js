import dayjs from 'dayjs'
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

const LS_KEY = 'medbook-db-v1'

// Backend Gateway
const API_GATEWAY = "http://localhost:8080";

// ================================
// DB DEFAULT
// ================================
const defaultDB = {
  users: [
    { id: 1, role: 'patient', name: 'Nguyễn An', phone: '0900000001', password: '123456' },
    { id: 2, role: 'doctor', name: 'BS. Trần Minh', phone: '0900000002', password: '123456' },
    { id: 3, role: 'staff', name: 'Lễ tân 1', phone: '0900000003', password: '123456' },
    { id: 4, role: 'admin', name: 'Quản trị', phone: '0900000004', password: '123456' },
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

  doctors: [], // dùng backend
  services: [
    { id: 101, name: 'Khám chuyên khoa', code: 'KS-CK', fee: 200000, duration_minutes: 20, active: true },
  ],

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

// =====================
// LOAD REAL DB
// =====================
function loadDB() {
  const saved = localStorage.getItem(LS_KEY)
  if (!saved) {
    saveDB(defaultDB)
    return defaultDB
  }
  return JSON.parse(saved)
}

function saveDB(db) { localStorage.setItem(LS_KEY, JSON.stringify(db)) }
function uid(prefix = '') { return prefix + Math.random().toString(36).slice(2, 10) }

// ================================
// ⭐ API EXPORT
// ================================
export const api = {

  reset() { saveDB(defaultDB); return true },

  authenticate(phone, password) {
    const u = loadDB().users.find(x => x.phone === phone && x.password === password)
    return u || null
  },

  getSpecialties() { return loadDB().specialties },

  // ================================================
  // ⭐ GET DOCTORS TỪ BACKEND — FIX FULL
  // ================================================
  async getDoctors(params = {}) {
    try {
      let url = `${API_GATEWAY}/api/doctors`;

      const searchParams = new URLSearchParams();

      if (params.specialty_id !== undefined && params.specialty_id !== null && params.specialty_id !== "") {
        searchParams.append("specialty_id", params.specialty_id);
      }

      if (searchParams.toString().length > 0) {
        url += `?${searchParams.toString()}`;
      }

      console.log("[Fetching doctors]:", url);

      const res = await fetch(url);
      if (!res.ok) {
        console.error("❌ Backend error:", res.status);
        return [];
      }

      let docs = await res.json();
      console.log("Doctors from backend:", docs);

      // LOCAL SEARCH FILTER
      if (params.q) {
        const q = params.q.toLowerCase()
        docs = docs.filter(d =>
          (d.name || "").toLowerCase().includes(q) ||
          (d.title || "").toLowerCase().includes(q)
        );
      }

      return docs;

    } catch (error) {
      console.error("❌ Lỗi load doctors từ backend:", error);
      return [];
    }
  },

  async getDoctor(id) {
    try {
      const res = await fetch(`${API_GATEWAY}/api/doctors/${id}`);
      return await res.json();
    } catch {
      return null;
    }
  },

  getServices() { return loadDB().services },
  getClinicLocations() { return loadDB().clinic_locations },

  addRating({ doctor_id, patient_id, stars, comment }) {
    const db = loadDB()
    db.ratings.push({
      id: uid('r_'),
      doctor_id: Number(doctor_id),
      patient_id: Number(patient_id),
      stars,
      comment,
      created_at: new Date().toISOString()
    })
    saveDB(db)
    return true
  },

  getRatingsByDoctor(doctor_id) {
    return loadDB().ratings.filter(r => r.doctor_id === Number(doctor_id))
  },

  getDoctorSchedules(doctor_id) {
    return loadDB().doctor_schedules.filter(s => String(s.doctor_id) === String(doctor_id))
  },

  addDoctorSchedule(s) {
    const db = loadDB()
    s.id = uid('sch_')
    db.doctor_schedules.push(s)
    saveDB(db); return s
  },

  addDoctorTimeOff(off) {
    const db = loadDB()
    off.id = uid('off_')
    db.doctor_time_off.push(off)
    saveDB(db); return off
  },

  getAppointments(params = {}) {
    const db = loadDB()
    let apps = db.appointments
    if (params.patient_id) apps = apps.filter(a => String(a.patient_id) === String(params.patient_id))
    if (params.doctor_id) apps = apps.filter(a => String(a.doctor_id) === String(params.doctor_id))
    if (params.date) {
      const day = dayjs(params.date).format('YYYY-MM-DD')
      apps = apps.filter(a => a.start_at.startsWith(day))
    }
    return apps.sort((a, b) => dayjs(a.start_at).valueOf() - dayjs(b.start_at).valueOf())
  },

  cancelAppointment(id) {
    const db = loadDB()
    const appt = db.appointments.find(a => String(a.id) === String(id))
    if (appt) { appt.status = 'cancelled'; saveDB(db); }
    return appt
  },

  checkinAppointment(id) {
    const db = loadDB()
    const appt = db.appointments.find(a => String(a.id) === String(id))
    if (appt) { appt.status = 'checked_in'; saveDB(db); }
    return appt
  },

  // ================================
  // ⭐ GET SLOTS (KHÔNG ĐỤNG)
  // ================================
  getDoctorSlots({ doctor_id, date, service_duration }) {
    const db = loadDB()
    const dow = dayjs(date).day()
    const schedules = db.doctor_schedules.filter(s => s.doctor_id === Number(doctor_id) && s.day_of_week === dow)
    if (!schedules.length) return []

    const appts = db.appointments.filter(a =>
      a.doctor_id === Number(doctor_id) &&
      a.start_at.startsWith(dayjs(date).format('YYYY-MM-DD')) &&
      ['pending', 'confirmed', 'checked_in'].includes(a.status)
    )

    const offs = db.doctor_time_off.filter(o =>
      o.doctor_id === Number(doctor_id) &&
      o.off_date === dayjs(date).format('YYYY-MM-DD')
    )

    const slots = []
    const dur = service_duration || 20

    for (const s of schedules) {
      let cursor = dayjs(`${dayjs(date).format('YYYY-MM-DD')} ${s.start_time}`)
      const end = dayjs(`${dayjs(date).format('YYYY-MM-DD')} ${s.end_time}`)

      while (cursor.add(dur, "minute").isSameOrBefore(end)) {
        const start = cursor
        const finish = cursor.add(dur, "minute")

        const overlapAppt = appts.find(a =>
          !(dayjs(a.end_at).isSameOrBefore(start) || dayjs(a.start_at).isSameOrAfter(finish))
        )

        const overlapOff = offs.find(o => {
          const offStart = dayjs(`${dayjs(date).format('YYYY-MM-DD')} ${o.start_time}`)
          const offEnd = dayjs(`${dayjs(date).format('YYYY-MM-DD')} ${o.end_time}`)
          return !(offEnd.isSameOrBefore(start) || offStart.isSameOrAfter(finish))
        })

        if (!overlapAppt && !overlapOff) {
          slots.push({ start_at: start.toISOString(), end_at: finish.toISOString() })
        }

        cursor = cursor.add(dur, "minute")
      }
    }
    return slots
  },

  createAppointment({ patient_id = 1, doctor_id, service_id, clinic_location_id, start_at }) {
    const db = loadDB()
    const service = service_id ? db.services.find(s => s.id === Number(service_id)) : null
    const duration = service?.duration_minutes || 20
    const end_at = dayjs(start_at).add(duration, 'minute').toISOString()

    const id = uid('apt_')
    const code = uid('AP')

    const item = {
      id, code,
      patient_id,
      doctor_id: Number(doctor_id),
      service_id: service?.id || null,
      clinic_location_id: clinic_location_id || 1,
      start_at, end_at,
      status: 'pending',
      channel: 'web',
      note: '',
      payment_status: 'unpaid',
      created_at: new Date().toISOString()
    }

    db.appointments.push(item)
    saveDB(db)
    return item
  },

  payAppointment(appointment_id, method = 'cash') {
    const db = loadDB()
    const ap = db.appointments.find(a => a.id === appointment_id)
    if (!ap) return null
    ap.payment_status = 'paid'
    ap.status = 'confirmed'
    db.payments.push({
      id: uid('pay_'),
      appointment_id,
      amount: 100000,
      method,
      status: 'paid',
      paid_at: new Date().toISOString()
    })
    saveDB(db)
    return ap
  },

  addSpecialty(name) {
    const db = loadDB()
    const id = db.specialties.reduce((m, s) => Math.max(m, s.id), 0) + 1
    const item = { id, name }
    db.specialties.push(item)
    saveDB(db)
    return item
  },

  addDoctor(doc) {
    const db = loadDB()
    const id = db.doctors.reduce((m, s) => Math.max(m, s.id), 10) + 1
    doc.id = id
    db.doctors.push(doc)
    saveDB(db)
    return doc
  }
}
