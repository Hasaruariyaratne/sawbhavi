import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    base: '/my-family-nurse-app/',
    resolve: {
        alias: {
            "@": path.resolve(process.cwd(), "./src"),
        },
    },
    build: {
        minify: false,
    },
})
