import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  /* styles: 'none' — 컴포넌트별 CSS 자동 주입을 끕니다.
     전체 스타일은 src/vuetify-layer.css가 레이어로 한 번에 불러옵니다. */
  plugins: [vue(), vuetify({ autoImport: true, styles: 'none' })],
  resolve: { alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) } },
})
