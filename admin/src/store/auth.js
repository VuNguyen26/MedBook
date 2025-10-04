// src/store/auth.js
export const auth = {
  login(email, password) {
    // danh sách tài khoản demo
    const accounts = [
      { id: 1, name: "Admin Test", email: "admin@example.com", password: "123", role: "admin" },
      { id: 2, name: "Doctor Test", email: "doctor@example.com", password: "123", role: "doctor" }
    ]

    const user = accounts.find(
      acc => acc.email === email && acc.password === password
    )

    if (!user) throw new Error("❌ Sai email hoặc mật khẩu")

    // lưu thông tin user chung (admin/doctor)
    localStorage.setItem("user", JSON.stringify(user))
    return user
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user") || "null")
  },

  logout() {
    localStorage.removeItem("user")
  }
}
