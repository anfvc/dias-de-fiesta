import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  appType: "spa", //ensures all routes fall back to index.html
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "src/components"),
      "@/pages": path.resolve(__dirname, "src/pages"),
      "@/styles": path.resolve(__dirname, "src/styles"),
      "@/types": path.resolve(__dirname, "src/types"),
      "@/assets": path.resolve(__dirname, "src/assets"),
      "@/consts": path.resolve(__dirname, "src/consts"),
      "@/hooks": path.resolve(__dirname, "src/hooks"),
      "@/layouts": path.resolve(__dirname, "src/layouts"),
      "@/context": path.resolve(__dirname, "src/context"),
      "@/data": path.resolve(__dirname, "src/data"),
    },
  },
});
