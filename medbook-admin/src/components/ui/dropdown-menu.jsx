import { useRef, useEffect, useState, useContext, createContext } from "react"
import { createPortal } from "react-dom"

const DropdownCtx = createContext(null)

// Wrapper cho mỗi dropdown (có context riêng)
export function DropdownMenu({ children }) {
  const triggerRef = useRef(null)
  return (
    <DropdownCtx.Provider value={{ triggerRef }}>
      <div className="relative inline-block">{children}</div>
    </DropdownCtx.Provider>
  )
}

// Nút mở: gắn ref vào chính phần tử trigger của menu hiện tại
export function DropdownMenuTrigger({ children, asChild, onClick }) {
  const { triggerRef } = useContext(DropdownCtx)
  const handle = (e) => onClick?.(e)

  // để đơn giản & tránh cloneRef phức tạp, bọc 1 div giữ layout inline-flex
  return (
    <div ref={triggerRef} onClick={handle} className="inline-flex">
      {asChild ? children : <button type="button">{children}</button>}
    </div>
  )
}

// Nội dung menu: Portal + fixed + định vị theo triggerRef của context
export function DropdownMenuContent({
  children,
  align = "start",       // "start" | "end"
  side = "bottom",       // hỗ trợ bottom, tự "flip" nếu chạm đáy
  sideOffset = 6,
  open,
  onClose,
  className = "",
}) {
  const { triggerRef } = useContext(DropdownCtx)
  const ref = useRef(null)
  const [mounted, setMounted] = useState(false)
  const [style, setStyle] = useState({})

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open || !triggerRef.current) return

    const compute = () => {
      const r = triggerRef.current.getBoundingClientRect()
      const menuH = ref.current?.offsetHeight || 0
      const vwH = window.innerHeight

      // mặc định mở xuống
      let top = r.bottom + sideOffset
      if (side === "bottom" && top + menuH > vwH - 8) {
        // thiếu chỗ: mở lên
        top = Math.max(8, r.top - sideOffset - menuH)
      }

      const left = align === "end" ? r.right : r.left
      setStyle({
        position: "fixed",
        top,
        left,
        transform: align === "end" ? "translateX(-100%)" : "none",
        zIndex: 70,
        minWidth: Math.max(176, r.width),
      })
    }

    const outside = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        onClose?.()
      }
    }

    compute()
    document.addEventListener("mousedown", outside)
    window.addEventListener("resize", compute)
    window.addEventListener("scroll", compute, true)
    return () => {
      document.removeEventListener("mousedown", outside)
      window.removeEventListener("resize", compute)
      window.removeEventListener("scroll", compute, true)
    }
  }, [open, align, side, sideOffset, onClose, triggerRef])

  if (!mounted || !open) return null

  return createPortal(
    <div
      ref={ref}
      style={style}
      className={`rounded-md border border-gray-200 bg-white shadow-lg p-1
                  data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 ${className}`}
      data-state={open ? "open" : "closed"}
    >
      {children}
    </div>,
    document.body
  )
}

export function DropdownMenuLabel({ children }) {
  return (
    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
      {children}
    </div>
  )
}

export function DropdownMenuItem({ children, className = "", onClick, ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left rounded-sm
                  hover:bg-gray-100 focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function DropdownMenuSeparator() {
  return <div className="my-1 border-t border-gray-200" />
}
