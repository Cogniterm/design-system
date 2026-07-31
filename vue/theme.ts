/* ============================================
   theme.ts — Vuetify 테마에 우리 토큰을 주입
   ============================================
   Vuetify 3의 모든 컴포넌트(96종)는 테마 색을 참조합니다.
   여기서 한 번 정의하면 <v-alert>, <v-stepper>, <v-timeline> 등
   우리가 감싸지 않은 컴포넌트까지 전부 우리 색으로 렌더됩니다.

   ⚠️ Vuetify 테마는 CSS 변수가 아닌 실제 hex 값을 요구합니다.
      ds.css의 값과 동일하게 유지하세요 (양쪽이 어긋나면 색이 갈립니다).
*/

export const dsLight = {
  dark: false,
  colors: {
    // ── 앱 표면 ──
    'background':        '#ffffff',   // --bg
    'surface':           '#ffffff',   // --surface
    'surface-bright':    '#fcfcfd',   // --gray-1
    'surface-light':     '#f9f9fb',   // --gray-2
    'surface-variant':   '#60646c',   // --gray-11
    'on-surface-variant': '#ffffff',

    // ── 브랜드 ──
    'primary':           '#1F7FF0',   // --brand
    'primary-darken-1':  '#155eb8',   // --brand-active
    'secondary':         '#60646c',   // --gray-11
    'secondary-darken-1': '#1c2024',

    // ── 상태 ──
    'error':             '#d93036',
    'info':              '#1F7FF0',
    'success':           '#17803d',
    'warning':           '#ab6400',

    // ── 텍스트 ──
    'on-background':     '#1c2024',   // --gray-12
    'on-surface':        '#1c2024',
    'on-primary':        '#ffffff',   // --on-brand
    'on-error':          '#ffffff',
    'on-success':        '#ffffff',
    'on-warning':        '#ffffff',
    'on-info':           '#ffffff',
  },
  variables: {
    // Vuetify 내부 계산에 쓰이는 값들 — 미니멀 기조에 맞게 낮춤
    'border-color':          '#1c2024',
    'border-opacity':        0.12,
    'high-emphasis-opacity': 1,
    'medium-emphasis-opacity': 0.72,
    'disabled-opacity':      0.38,
    'idle-opacity':          0.04,
    'hover-opacity':         0.04,
    'focus-opacity':         0.08,
    'selected-opacity':      0.06,
    'activated-opacity':     0.06,
    'pressed-opacity':       0.10,
    'dragged-opacity':       0.08,
    'theme-kbd':             '#1c2024',
    'theme-on-kbd':          '#ffffff',
    'theme-code':            '#f0f0f3',
    'theme-on-code':         '#1c2024',
  },
}

export const dsDark = {
  dark: true,
  colors: {
    'background':        '#111113',   // --bg (dark)
    'surface':           '#18191b',   // --surface (dark)
    'surface-bright':    '#212225',   // --gray-3
    'surface-light':     '#18191b',   // --gray-2
    'surface-variant':   '#b0b4ba',   // --gray-11
    'on-surface-variant': '#111113',

    'primary':           '#4593F5',   // --brand (dark)
    'primary-darken-1':  '#77B1F9',   // --brand-active (dark)
    'secondary':         '#b0b4ba',
    'secondary-darken-1': '#edeef0',

    'error':             '#e5484d',
    'info':              '#4593F5',
    'success':           '#46a758',
    'warning':           '#f0b429',

    'on-background':     '#edeef0',   // --gray-12 (dark)
    'on-surface':        '#edeef0',
    'on-primary':        '#0b1220',   // --on-brand (dark)
    'on-error':          '#ffffff',
    'on-success':        '#0b1220',
    'on-warning':        '#0b1220',
    'on-info':           '#0b1220',
  },
  variables: {
    'border-color':          '#edeef0',
    'border-opacity':        0.14,
    'high-emphasis-opacity': 1,
    'medium-emphasis-opacity': 0.72,
    'disabled-opacity':      0.38,
    'idle-opacity':          0.05,
    'hover-opacity':         0.05,
    'focus-opacity':         0.10,
    'selected-opacity':      0.08,
    'activated-opacity':     0.08,
    'pressed-opacity':       0.12,
    'dragged-opacity':       0.08,
    'theme-kbd':             '#edeef0',
    'theme-on-kbd':          '#111113',
    'theme-code':            '#212225',
    'theme-on-code':         '#edeef0',
  },
}

export const dsTheme = {
  defaultTheme: 'dsLight',
  themes: { dsLight, dsDark },
}

/* 사용법:
import { createVuetify } from 'vuetify'
import { dsTheme } from '~/design/theme'
import { dsDefaults } from '~/design/defaults'

createVuetify({ theme: dsTheme, defaults: dsDefaults })

// 다크 전환 (Vuetify + 우리 CSS를 함께 전환해야 합니다)
import { useTheme } from 'vuetify'
const theme = useTheme()
function toggle(dark: boolean) {
  theme.change(dark ? 'dsDark' : 'dsLight')
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
}
*/
