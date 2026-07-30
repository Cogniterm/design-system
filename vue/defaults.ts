// Vuetify A그룹(동작이 어려운 컴포넌트) 기본값 — createVuetify({ defaults })에 연결
// <v-menu>만 써도 우리 스타일이 나오게 하는 강제 층 1번 (브리프 11장)
export const dsDefaults = {
  global: { ripple: false },                     // 미니멀 — 리플 효과 제거
  VMenu: { transition: 'fade-transition' },
  VDialog: { transition: 'fade-transition' },
  VTooltip: { transition: 'fade-transition' },
  VDataTable: {
    density: 'comfortable',
    hover: true,
  },
  VSelect: { variant: 'outlined', density: 'comfortable', hideDetails: 'auto' },
  VAutocomplete: { variant: 'outlined', density: 'comfortable', hideDetails: 'auto' },
  VNavigationDrawer: { elevation: 0 },
} as const

/* 사용법 (nuxt plugin 또는 main.ts):
import { createVuetify } from 'vuetify'
import { dsDefaults } from './design/defaults'
createVuetify({ defaults: dsDefaults })
*/
