import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, //muda o padrao vite(5173) para o padrao react(3000)
    open: true, //Abra o navegador automaticamente
    host: true, // permite que tenha acesso via IP na rede local
  },
});

