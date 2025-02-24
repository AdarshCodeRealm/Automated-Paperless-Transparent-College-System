import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { AuthProvider, AuthContext } from "./context/AuthContext.jsx" // Import context

import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <ToastContainer />
    </AuthProvider>
  </React.StrictMode>
)
