export default function DateField({label, value, onChange}){
  return (
    <div>
      {label && <label className="label">{label}</label>}
      <input className="input" type="date" value={value} onChange={e=>onChange(e.target.value)} />
    </div>
  )
}
