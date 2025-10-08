export function Avatar({ children, className = "", ...props }) {
  return (
    <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`} {...props}>
      {children}
    </div>
  )
}

export function AvatarImage({ src, alt }) {
  return <img src={src} alt={alt} className="h-full w-full object-cover" />
}

export function AvatarFallback({ children }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-600 text-sm font-medium">
      {children}
    </div>
  )
}
