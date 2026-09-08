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
    'primary-darken-1':  '#1A6CCC',   // --brand-active
    'secondary':         '#60646c',   // --gray-11
    'secondary-darken-1': '#1c2024',

    // ── 상태 ──
    // ⚠ ds.css의 `--error` 가 아니라 **`--error-text`(어두운 쪽)** 와 같은 값입니다.
    //   Vuetify의 색은 언제나 "채운 면 + 그 위의 on- 글자" 쌍으로 쓰입니다(v-chip · v-alert ·
    //   v-btn). 면 색(--error #d6362a · --success #2f9e44 · --warning #e69100)을 여기 넣으면
    //   흰 글자가 각각 4.75 · 3.45 · 2.50:1 이 되어 뒤 둘이 AA에 한참 못 미칩니다.
    //   면 색은 글자가 안 얹히는 곳(점 · 막대 · 옅은 배경)에만 씁니다. (2026-09-08)
    'error':             '#c92a2a',   // --error-text
    'info':              '#1F7FF0',
    'success':           '#17803d',   // --success-text
    'warning':           '#9a6700',   // --warning-text

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
    'border-opacity':        0.08,
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

    // 다크는 콘솔 값 그대로입니다 — 어두운 면 위에서는 밝은 채움이 맞고,
    // 글자를 어둡게 얹으면 셋 다 6.7:1 이상이라 라이트처럼 따로 고를 필요가 없습니다.
    'error':             '#ff6b6b',
    'info':              '#4593F5',
    'success':           '#51cf66',
    'warning':           '#ffd43b',

    'on-background':     '#edeef0',   // --gray-12 (dark)
    'on-surface':        '#edeef0',
    'on-primary':        '#0b1220',   // --on-brand (dark)
    // 셋 다 어두운 글자입니다 — 전에는 on-error 만 흰색이었는데, 다크 error 가
    // #ff6b6b(밝은 산호)로 바뀌면서 흰 글자면 2.78:1 이 됩니다. (2026-09-08)
    'on-error':          '#0b1220',
    'on-success':        '#0b1220',
    'on-warning':        '#0b1220',
    'on-info':           '#0b1220',
  },
  variables: {
    'border-color':          '#edeef0',
    'border-opacity':        0.11,
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
