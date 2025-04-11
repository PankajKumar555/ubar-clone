import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Toast from "./components/Toast.jsx";
import SocketProvider from "./context/SocketProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toast />
    <SocketProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SocketProvider>
  </StrictMode>
);
