import react from "@vitejs/plugin-react";

import path from "path";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgrPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
