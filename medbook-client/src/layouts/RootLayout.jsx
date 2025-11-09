import { Suspense } from "react"

export default function RootLayout({ children }) {
  return (
    <div className="font-sans antialiased bg-slate-50 text-slate-900 min-h-screen">
      <Suspense fallback={<div>Đang tải...</div>}>{children}</Suspense>
    </div>
  )
}