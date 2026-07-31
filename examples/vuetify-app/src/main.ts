import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'                      // ← Vuetify 전역 스타일 (충돌 위험 지점)
import { dsDefaults } from '~/design/defaults'
import '~/design/ds.css'
import '~/design/ds-vuetify.css'
import App from './App.vue'

createApp(App).use(createVuetify({ defaults: dsDefaults as any })).mount('#app')
