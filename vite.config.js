import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://airbnbnew.cybersoft.edu.vn",
        changeOrigin: true,
        secure: false
      }
    }
  }
});
