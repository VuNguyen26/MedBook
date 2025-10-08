import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import RootLayout from "./layouts/RootLayout"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootLayout>
      <App />
    </RootLayout>
  </React.StrictMode>
)
