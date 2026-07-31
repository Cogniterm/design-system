import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
// Pretendard — 한글·영문·숫자가 한 벌로 어울리는 본문 글꼴
// dynamic-subset은 필요한 글자만 내려받아 초기 로딩이 가볍습니다.
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'
import { dsTheme } from '~/design/theme'
import { dsDefaults } from '~/design/defaults'
import '~/design/ds.css'
import '~/design/ds-vuetify.css'
import App from './App.vue'

createApp(App)
  .use(createVuetify({ theme: dsTheme, defaults: dsDefaults as any }))
  .mount('#app')
