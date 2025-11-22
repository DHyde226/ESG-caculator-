import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // So Docker can access the dev server
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true, // Needed in Docker for file change detection
    },
    proxy: {
      "/api": {
        target: "http://backend:5000", // "backend" is your Docker service name
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
