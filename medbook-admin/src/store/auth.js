// src/store/auth.js
export const auth = {
  login(email, password) {
    // 🔹 Danh sách tài khoản demo
    const accounts = [
      { id: 1, name: "Admin Test", email: "admin@example.com", password: "123", role: "admin" },
      { id: 2, name: "Doctor Test", email: "doctor@example.com", password: "123", role: "doctor" }
    ]

    // 🔹 Kiểm tra đăng nhập
    const user = accounts.find(
      (acc) => acc.email === email && acc.password === password
    )

    if (!user) throw new Error("❌ Sai email hoặc mật khẩu")

    // 🔹 Lưu thông tin user (cho cả admin / doctor)
    localStorage.setItem("user", JSON.stringify(user))
    return user
  },

  // 🔹 Lấy user hiện tại (nếu có)
  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem("user")) || null
    } catch {
      return null
    }
  },

  // 🔹 Đăng xuất
  logout() {
    localStorage.removeItem("user")
  }
}
