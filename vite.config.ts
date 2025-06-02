import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Detecta o ambiente de build (GitHub Pages ou Netlify)
const isNetlify = process.env.NETLIFY === 'true';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuração do base path
  base: '/',
  
  // Otimizações para o Netlify
  build: {
    // Melhorar manseamento de chunks para evitar problemas com SSR
    rollupOptions: {
      output: {
        manualChunks: {
          // Separa as bibliotecas de PDF em chunks diferentes
          'pdf-libs': ['pdfjs-dist', 'react-pdf'],
          // Separa as dependências principais em um chunk separado
          vendor: ['react', 'react-dom'],
          // Separa componentes de UI
          ui: ['lucide-react']
        },
      },
    },
    // Gera fonte de source maps para facilitar depuração
    sourcemap: true,
  },
  
  // Otimizações de SSR
  ssr: {
    // Externalizar módulos que não funcionam bem com SSR
    noExternal: ['react-pdf', 'pdfjs-dist'],
  },
  
  // Permite importações absolutas a partir da pasta src
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})