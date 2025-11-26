// store/auth.js

export const auth = {
  // ============================
  // 1) Local demo (optional)
  // ============================
  initDefaultUsers() {

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.length === 0) {
      users = [
        {
          id: 1,
          name: "Doctor Test",
          email: "doctor@example.com",
          phone: "111",
          password: "123",
          role: "doctor",
        },
        {
          id: 2,
          name: "Patient Test",
          email: "user@example.com",
          phone: "222",
          password: "123",
          role: "patient",
        },
      ];
      localStorage.setItem("users", JSON.stringify(users));
    }
  },

  // ============================
  // 2) Local login (DEMO ONLY)
  // ============================
  register({ name, email, phone, password, role = "patient" }) {
    let users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u) => u.email === email)) {
      throw new Error("❌ Email đã tồn tại");
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      phone,
      password,
      role,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    return newUser;
  },

  login(email, password) {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) throw new Error("❌ Sai email hoặc mật khẩu");

    localStorage.setItem("currentUser", JSON.stringify(user));
    return user;
  },

  // ============================
  // 3) JWT Login (REAL BACKEND)
  // ============================
  getCurrentUser() {
    // Nếu còn currentUser cũ thì ưu tiên (chỉ để demo, không dùng production)
    const current = localStorage.getItem("currentUser");
    if (current) {
      try {
        return JSON.parse(current);
      } catch {}
    }

    // Flow mới: JWT từ backend
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // decode JWT

      return {
        id: payload.id,                                // id thật từ backend
        name: payload.sub || payload.email || "User",
        email: payload.sub || "",
        role: payload.role || "PATIENT",
      };
    } catch (err) {
      console.error("Lỗi decode JWT:", err);
      return null;
    }
  },

  isLoggedIn() {
    return (
      !!localStorage.getItem("currentUser") || !!localStorage.getItem("token")
    );
  },

  logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
  },
};

// Gọi init local demo
auth.initDefaultUsers();
