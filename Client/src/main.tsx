import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "@/styles/index.css";
import App from "./App.tsx";
import PublicContextProvider from "@/context/PublicContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <PublicContextProvider>
        <App />
      </PublicContextProvider>
    </BrowserRouter>
  </StrictMode>
);
