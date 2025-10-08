export const auth = {

  initDefaultUsers() {
    let users = JSON.parse(localStorage.getItem("users") || "[]")

    if (users.length === 0) {
      users = [
        { id: 1, name: "Doctor Test", email: "doctor@example.com", phone: "111", password: "123", role: "doctor" },
        { id: 2, name: "Patient Test", email: "user@example.com", phone: "222", password: "123", role: "patient" }
      ]
      localStorage.setItem("users", JSON.stringify(users))
    }
  },

  // Đăng ký tài khoản mới
  register({ name, email, phone, password, role = "patient" }) {
    let users = JSON.parse(localStorage.getItem("users") || "[]")

    // Kiểm tra trùng email
    if (users.find(u => u.email === email)) {
      throw new Error("❌ Email đã tồn tại")
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      phone,
      password, // demo chưa mã hoá
      role
    }

    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("currentUser", JSON.stringify(newUser))

    return newUser
  },

  // Đăng nhập
  login(email, password) {
    let users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find(
      u => u.email === email && u.password === password
    )
    if (!user) {
      throw new Error("❌ Sai email hoặc mật khẩu")
    }
    localStorage.setItem("currentUser", JSON.stringify(user))
    return user
  },

  // Lấy user hiện tại
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser") || "null")
  },

  // Kiểm tra có đăng nhập hay chưa
  isLoggedIn() {
    return !!localStorage.getItem("currentUser")
  },

  // Đăng xuất
  logout() {
    localStorage.removeItem("currentUser")
  }
}

// ⚡ Gọi init mặc định khi load app
auth.initDefaultUsers()
