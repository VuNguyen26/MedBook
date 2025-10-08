import { Bell, Search, Settings, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import * as React from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "@/store/auth"
import { toast } from "react-toastify"

export default function AdminHeader() {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()

  // 🔹 Hàm đăng xuất có thông báo
  const handleLogout = () => {
    auth.logout() // Xóa user trong localStorage
    toast.info("Đã đăng xuất khỏi hệ thống")
    navigate("/login") // Chuyển về trang login
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
      {/* 🔍 Search box */}
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="search"
            placeholder="Tìm kiếm bác sĩ, bệnh nhân, lịch hẹn..."
            className="pl-10 bg-slate-50 focus-visible:ring-1 focus-visible:ring-teal-600"
          />
        </div>
      </div>

      {/* ⚙️ Actions */}
      <div className="flex items-center gap-3">
        {/* Thông báo */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-slate-600 hover:text-teal-700"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        {/* Cài đặt */}
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-600 hover:text-teal-700"
        >
          <Settings className="h-5 w-5" />
        </Button>

        {/* 👤 Dropdown User */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={() => setOpen(!open)}>
            <button
              type="button"
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-slate-100 transition"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatar.jpg" alt="Admin Avatar" />
                <AvatarFallback>MB</AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col items-start text-left">
                <span className="text-sm font-medium text-slate-800">
                  Admin User
                </span>
                <span className="text-xs text-slate-500">
                  admin@medbook.com
                </span>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            side="bottom"
            sideOffset={8}
            open={open}
            onClose={() => setOpen(false)}
            className="w-52"
          >
            <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem className="flex items-center gap-2">
              <User className="h-4 w-4 text-slate-500" /> Hồ sơ cá nhân
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-slate-500" /> Cài đặt
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* 🔴 Nút Đăng xuất */}
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 cursor-pointer"
            >
              <LogOut className="h-4 w-4" /> Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
