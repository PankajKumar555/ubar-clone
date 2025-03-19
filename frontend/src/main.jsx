import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Toast from "./components/Toast.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toast />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
