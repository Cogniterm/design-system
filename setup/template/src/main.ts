import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import './vuetify-layer.css'
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'
import { dsTheme } from '~/design/theme'
import { dsDefaults } from '~/design/defaults'
import { lucideIconSet } from '~/design/vuetify-icons'
import { dsLocale, dsDate } from '~/design/locale'
import '~/design/ds.css'
import '~/design/ds-vuetify.css'
import App from './App.vue'

createApp(App)
  .use(createVuetify({
    theme: dsTheme,
    defaults: dsDefaults as any,
    icons: lucideIconSet as any,   // 빠뜨리면 내부 아이콘이 전부 빈 네모가 됩니다
    locale: dsLocale as any,       // 빠뜨리면 달력 요일이 S M T W T F S로 남습니다
    date: dsDate as any,
  }))
  .mount('#app')
