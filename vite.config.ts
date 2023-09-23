import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    port: 10000,
  },
  plugins: [react()],
})
