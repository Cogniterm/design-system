/* ============================================
   theme.ts — Vuetify 테마에 우리 토큰을 주입
   ============================================
   Vuetify 3의 모든 컴포넌트(96종)는 테마 색을 참조합니다.
   여기서 한 번 정의하면 <v-alert>, <v-stepper>, <v-timeline> 등
   우리가 감싸지 않은 컴포넌트까지 전부 우리 색으로 렌더됩니다.

   ⚠️ Vuetify 테마는 CSS 변수가 아닌 실제 hex 값을 요구합니다.
      **공용/스타일/토큰.css 와 같은 값을 유지하세요** (양쪽이 어긋나면 색이 갈립니다).
      그 파일이 두 앱의 단일 원본입니다(관리자 콘솔 기준) — 색을 바꿀 일이 생기면
      토큰.css → 여기 순서로 옮겨 심으세요(ds.css 토큰은 npm run tokens:pull 이 받아 옵니다).
*/

export const dsLight = {
  dark: false,
  colors: {
    // ── 앱 표면 ──
    'background':        '#ffffff',   // --background
    'surface':           '#ffffff',   // --card
    'surface-bright':    '#fcfcfc',   // --gray-1
    'surface-light':     '#f4f4f5',   // --muted
    'surface-variant':   '#707070',   // --muted-foreground
    'on-surface-variant': '#ffffff',

    // ── 브랜드 ──
    'primary':           '#1F7FF0',   // --primary
    'primary-darken-1':  '#1A6CCC',   // --primary-active
    'secondary':         '#707070',   // --muted-foreground
    'secondary-darken-1': '#1a1a1a',

    // ── 상태 ──
    // ⚠ 면 색(--error)이 아니라 **글자용(--error-text)** 값입니다. Vuetify 색은 언제나
    //   "채운 면 + 그 위의 on- 글자" 쌍이라, 면 색을 넣으면 흰 글자가 success 3.45 ·
    //   warning 2.50:1 이 됩니다. 면 색은 점·막대처럼 글자가 안 얹히는 곳에만. (2026-09-08)
    'error':             '#c92a2a',   // --error-text
    'info':              '#1F7FF0',
    'success':           '#17803d',   // --success-text
    'warning':           '#9a6700',   // --warning-text

    // ── 텍스트 ──
    'on-background':     '#1a1a1a',   // --foreground
    'on-surface':        '#1a1a1a',
    'on-primary':        '#ffffff',   // --primary-foreground
    'on-error':          '#ffffff',
    'on-success':        '#ffffff',
    'on-warning':        '#ffffff',
    'on-info':           '#ffffff',
  },
  variables: {
    // Vuetify 내부 계산에 쓰이는 값들 — 미니멀 기조에 맞게 낮춤
    // border-color × border-opacity 가 흰 면 위에서 --border(#e4e4e7)가 되도록 잡은 값입니다
    'border-color':          '#1a1a1a',
    'border-opacity':        0.11,
    'high-emphasis-opacity': 1,
    'medium-emphasis-opacity': 0.72,
    'disabled-opacity':      0.38,
    'idle-opacity':          0.04,
    'hover-opacity':         0.05,   // --overlay-hover = rgba(0,0,0,.05)
    'focus-opacity':         0.08,
    'selected-opacity':      0.06,   // --selected-fill = rgba(0,0,0,.06)
    'activated-opacity':     0.06,
    'pressed-opacity':       0.10,
    'dragged-opacity':       0.08,
    'theme-kbd':             '#1a1a1a',
    'theme-on-kbd':          '#ffffff',
    'theme-code':            '#f4f4f5',
    'theme-on-code':         '#1a1a1a',
  },
}

export const dsDark = {
  dark: true,
  colors: {
    'background':        '#0c0c0f',   // --background (dark)
    'surface':           '#101013',   // --card (dark)
    'surface-bright':    '#222327',   // --muted (dark)
    'surface-light':     '#171719',   // --gray-2 (dark)
    'surface-variant':   '#a3a3ac',   // --muted-foreground (dark)
    'on-surface-variant': '#131316',

    // 다크에서도 프라이머리 버튼 글자는 흰색 — 같은 버튼이 테마에 따라
    // 흰 글자/검은 글자로 갈리지 않게 콘솔이 정한 규격입니다.
    'primary':           '#4A97F5',   // --primary (dark)
    'primary-darken-1':  '#7AB5F8',   // --primary-active (dark)
    'secondary':         '#a3a3ac',
    'secondary-darken-1': '#f4f4f5',

    'error':             '#ff6b6b',   // --error (dark)
    'info':              '#4A97F5',
    'success':           '#51cf66',   // --success (dark)
    'warning':           '#ffd43b',   // --warning (dark)

    'on-background':     '#f4f4f5',   // --foreground (dark)
    'on-surface':        '#f4f4f5',
    'on-primary':        '#ffffff',   // --primary-foreground — 라이트와 동일
    'on-error':          '#131316',
    // 다크의 상태색은 밝은 계열(#51cf66·#ffd43b)이라 채운 면 위 글자는 어두워야 읽힙니다.
    // 프라이머리와 달리 여기서는 테마별로 갈리는 게 맞습니다.
    'on-success':        '#131316',
    'on-warning':        '#131316',
    'on-info':           '#ffffff',
  },
  variables: {
    // 어두운 면(#101013) 위에서 --border(#2c2d33)가 되도록 잡은 값입니다
    'border-color':          '#f4f4f5',
    'border-opacity':        0.10,
    'high-emphasis-opacity': 1,
    'medium-emphasis-opacity': 0.72,
    'disabled-opacity':      0.38,
    'idle-opacity':          0.06,
    'hover-opacity':         0.06,   // --overlay-hover = rgba(255,255,255,.06)
    'focus-opacity':         0.10,
    'selected-opacity':      0.09,   // --selected-fill = rgba(255,255,255,.09)
    'activated-opacity':     0.09,
    'pressed-opacity':       0.12,
    'dragged-opacity':       0.08,
    'theme-kbd':             '#f4f4f5',
    'theme-on-kbd':          '#131316',
    'theme-code':            '#222327',
    'theme-on-code':         '#f4f4f5',
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
  // CSS 토큰은 .dark 한 벌 — 콘솔과 같은 셀렉터입니다
  document.documentElement.classList.toggle('dark', dark)
}
*/
