import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"

export function Select({ children, value, onValueChange }) {
  return (
    <div className="relative inline-block w-full">
      {children}
    </div>
  )
}

// Trigger (nút mở danh sách)
export function SelectTrigger({ children, className = "", onClick, ...props }) {
  const triggerRef = useRef(null)
  return (
    <button
      ref={triggerRef}
      onClick={onClick}
      type="button"
      {...props}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 text-sm shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {children}
    </button>
  )
}

// Hiển thị giá trị hoặc placeholder
export function SelectValue({ placeholder, value }) {
  return (
    <span className="truncate text-gray-700">
      {value || placeholder || "Select..."}
    </span>
  )
}

// Danh sách item (render qua Portal)
export function SelectContent({
  children,
  align = "start",
  side = "bottom",
  sideOffset = 6,
  open,
  onClose,
  triggerRef,
}) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})
  const [mounted, setMounted] = useState(false)

  // Mount portal
  useEffect(() => setMounted(true), [])

  // Định vị so với trigger
  useEffect(() => {
    if (!open || !triggerRef?.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const top = side === "bottom" ? rect.bottom + sideOffset : rect.top - sideOffset
    const left = align === "end" ? rect.right : rect.left
    setStyle({
      position: "fixed",
      top,
      left,
      transform: align === "end" ? "translateX(-100%)" : "none",
      zIndex: 80,
      minWidth: rect.width,
    })
  }, [open, align, side, sideOffset, triggerRef])

  // Đóng khi click ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        !triggerRef?.current?.contains(e.target)
      ) {
        onClose?.()
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open, onClose, triggerRef])

  // Đóng khi scroll hoặc resize
  useEffect(() => {
    const handleScroll = () => onClose?.()
    if (open) {
      window.addEventListener("scroll", handleScroll, true)
      window.addEventListener("resize", handleScroll)
    }
    return () => {
      window.removeEventListener("scroll", handleScroll, true)
      window.removeEventListener("resize", handleScroll)
    }
  }, [open, onClose])

  if (!mounted || !open) return null

  return createPortal(
    <div
      ref={ref}
      style={style}
      className="max-h-[320px] overflow-auto rounded-md border border-gray-200 bg-white shadow-lg animate-in fade-in-0 zoom-in-95"
    >
      {children}
    </div>,
    document.body
  )
}

// Item — chọn giá trị
export function SelectItem({ children, value, onSelect, setValue }) {
  const handleClick = () => {
    setValue?.(value)
    onSelect?.()
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer select-none rounded-sm px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      {children}
    </div>
  )
}