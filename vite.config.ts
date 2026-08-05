import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
        // .vs 폴더(Visual Studio 내부 파일)는 감시 대상에서 제외 - 파일 잠금 충돌 방지
        watch: process.env.DISABLE_HMR === 'true' ? null : {
            ignored: ['**/.vs/**', '**/node_modules/**', '**/public/**'],
        },
    },
  };
});
