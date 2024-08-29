import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    preview: {
      port: 7124,
      strictPort: true,
    },
    server: {
      port: 7124,
      strictPort: true,
      host: true,
      origin: "http://0.0.0.0:7124",
    },
  },
})