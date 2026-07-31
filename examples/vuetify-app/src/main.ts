import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { dsTheme } from '~/design/theme'
import { dsDefaults } from '~/design/defaults'
import '~/design/ds.css'
import '~/design/ds-vuetify.css'
import App from './App.vue'

createApp(App)
  .use(createVuetify({ theme: dsTheme, defaults: dsDefaults as any }))
  .mount('#app')
