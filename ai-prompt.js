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

export function componentPrompt(c, { WHERE, VERSUS, A11Y, SITE }) {
  const imp = importPath(c)
  const needs = c.origin === 'wrapped'
    ? 'Vuetify 필요 · ds.css + ds-vuetify.css'
    : c.importFrom
      ? 'Vuetify 불필요 · ds.css만 · lucide-vue-next 필요'
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
${vs ? `\n## 구분\n${vs}` : ''}${guide ? `\n\n## 지침\n${guide}` : ''}${a11y ? `\n\n## 접근성\n${a11y}` : ''}

## 시스템 규칙 (요약)
- 색·간격·모서리는 CSS 변수만 (var(--gray-6), var(--brand)) — hex 금지
- primary 버튼은 화면당 하나. 선택·활성 상태는 중립(--sel-bg/--sel-fg)
- 컨트롤 높이 32(sm)/40/48 — 필터 바·툴바는 sm
- 목록·테이블은 default/loading/empty/error/partial 5상태
- 전체 규칙: ${SITE}/llms.txt
`
}
