import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  // GitHub Pages 하위 경로(live/)에 배포되므로 상대 경로 필수 — 절대 /assets는 404가 납니다.
  base: './',
  plugins: [vue(), // styles:'none' — 컴포넌트별 CSS 자동 주입을 끕니다.
    // 전체 스타일은 src/vuetify-layer.css가 layer로 한 번에 불러옵니다.
    vuetify({ autoImport: true, styles: 'none' })],
  resolve: { alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) } },
})
