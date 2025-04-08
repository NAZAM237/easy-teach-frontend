import {UserConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "@tailwindcss/vite";

export default {
  plugins: [
      react(),
      tailwindcss()
  ],
} satisfies UserConfig
