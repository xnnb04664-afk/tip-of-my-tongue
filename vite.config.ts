import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 支持相对路径部署，适应 GitHub Pages / 各种子路径及静态托管平台
});
