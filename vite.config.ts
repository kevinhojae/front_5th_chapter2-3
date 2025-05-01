import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // target: 'https://jsonplaceholder.typicode.com',
        target: "https://dummyjson.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
      "@app": "/src/app",
      "@pages": "/src/pages",
      "@shared": "/src/shared",
      "@widgets": "/src/widgets",
      "@features": "/src/features",
      "@entities": "/src/entities",
    },
  },
})
