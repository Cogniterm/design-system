/* ============================================
   ai-prompt.js — 컴포넌트 하나를 AI에 바로 쓸 수 있는 프롬프트로
   ============================================
   문서 사이트의 "AI 프롬프트 복사" 버튼과
   scripts-gen-llms.mjs의 components/<id>.txt 생성이 이 한 곳을 씁니다.
*/
const strip = (h) => String(h).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()

/* 이 컴포넌트를 어느 배럴에서 가져오는가 — 문서·프롬프트·생성물이 모두 여기를 씁니다.
   대부분은 origin으로 갈리지만, Icon처럼 배럴이 따로인 것은 importFrom으로 못박습니다. */
export const importPath = (c) =>
  c.importFrom ?? (c.origin === 'wrapped' ? '~/design/vuetify' : '~/design')

/* 앱별로 쓸 수 있는가 — 관리자 콘솔엔 Vuetify 가 없습니다(data.js CONSOLE 머리말).
   부품 문서 · 색인 · index.json 이 같은 문장을 쓰도록 여기 한 곳에서 만듭니다 */
export function consoleLine(c, CONSOLE = {}) {
  const k = CONSOLE[c.id]
  if (k) return `${k.use} — ${k.note}`
  return c.origin === 'wrapped' ? '쓸 수 없음 (Vuetify 없음) — 대응 부품이 없으면 먼저 물어보세요' : `이 부품 그대로 (${importPath(c)} · html 문법)`
}

export function componentPrompt(c, { WHERE, VERSUS, A11Y, SITE, CONSOLE = {} }) {
  const imp = importPath(c)
  const needs = c.origin === 'wrapped'
    ? 'Vuetify 필요 · ds.css + ds-vuetify.css'
    : c.importFrom
      ? 'Vuetify 불필요 · ds.css만 · @lucide/vue 필요'
      : 'Vuetify 불필요 · ds.css만'

  const props = (c.props || []).map((p) =>
    `- ${p[0]}: ${strip(p[1])}${p[2] && p[2] !== '—' ? ` = ${strip(p[2])}` : ''} — ${strip(p[3])}`).join('\n')
  const events = (c.events || []).map((e) => `- @${e[0]}${e[1] && e[1] !== '—' ? ` (${strip(e[1])})` : ''} — ${strip(e[2])}`).join('\n')
  const slots = (c.slots || []).map((sl) => `- #${sl[0]} — ${strip(sl[1])}`).join('\n')

  const vs = (VERSUS[c.id] || []).map(([o, r]) => `- vs ${o}: ${r}`).join('\n')
  const a = A11Y[c.id]
  const a11y = a ? [
    a.keys?.length ? '키보드: ' + a.keys.map(([k, v]) => `${k}=${v}`).join(' · ') : '',
    a.yours?.length ? '직접 처리: ' + a.yours.join(' / ') : '',
  ].filter(Boolean).join('\n') : ''

  const guide = (c.guidelines || []).map(([t, x]) => `- [${t}] ${strip(x)}`).join('\n')

  return `# Ds${c.name} — Cogniterm Design System

import { Ds${c.name.replace(/^Ds/, '')} } from '${imp}'   // ${needs}

## 용도
${WHERE[c.id] || c.summary}

## Props
${props || '없음'}
${events ? `\n## Events\n${events}` : ''}${slots ? `\n## Slots\n${slots}` : ''}

## 사용 예
\`\`\`vue
${c.vue}
\`\`\`
${c.html ? `\n## HTML 문법 — Vue 없이 문자열로 그리는 화면\n\`\`\`html\n${c.html}\n\`\`\`\n` : ''}
## 앱별
- 이용자 화면 (Vuetify 있음): 이 부품 그대로
- 관리자 콘솔 (Vuetify 없음): ${consoleLine(c, CONSOLE)}
${vs ? `\n## 구분\n${vs}` : ''}${guide ? `\n\n## 지침\n${guide}` : ''}${a11y ? `\n\n## 접근성\n${a11y}` : ''}

## 시스템 규칙 (요약)
- 색·간격·모서리는 제품 토큰만 (var(--border), var(--primary), var(--r-el)) — hex 금지. --brand · --sel-bg 는 문서 사이트 전용이라 앱에 없습니다
- primary 버튼은 화면당 하나. 활성(탭·필터)은 --nav-active 선+글자, 목록 행 선택은 --selected-fill 회색 면
- 컨트롤 높이 32(기본) / 28(sm — 필터 바·툴바) / 40(lg — 로그인 제출 전용)
- 목록·테이블은 default/loading/empty/error/partial 5상태
- 전체 규칙: ${SITE}/llms.txt
`
}
