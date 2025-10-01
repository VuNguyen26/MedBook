/** @type {import('tailwindcss').Config} */ 
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 4px 24px rgba(0,0,0,0.08)"
      }
    },
  },
  plugins: [require("daisyui")],   // ✅ thêm dòng này
  daisyui: {
    themes: ["light", "corporate"], // bạn có thể thử: "cupcake", "emerald", "business", "dark"...
  },
}
