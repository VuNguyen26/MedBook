import { Link } from 'react-router-dom'
export default function NotFound(){
  return (
    <div className="container-page py-16 text-center space-y-4">
      <div className="text-6xl">404</div>
      <div className="text-slate-600">Trang không tồn tại.</div>
      <Link to="/" className="btn btn-primary">Về trang chủ</Link>
    </div>
  )
}
