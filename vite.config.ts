import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // This repository is deployed as the root username.github.io site.
  // Root-relative assets keep nested routes refreshable.
  base: '/',
})
