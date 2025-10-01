export default function TimeSlot({slot, onPick}){
  const t = (s)=> new Date(s).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
  return (
    <button onClick={()=>onPick(slot)} className="btn btn-outline w-full">
      {t(slot.start_at)} — {t(slot.end_at)}
    </button>
  )
}
