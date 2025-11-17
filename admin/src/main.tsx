import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import AdminContextProvider from "./context/AdminContextProvider.tsx";
import "@/styles/index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AdminContextProvider>
        <App />
      </AdminContextProvider>
    </BrowserRouter>
  </StrictMode>
);
