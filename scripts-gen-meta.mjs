/* data.js → vue/meta.ts 생성기.
   손으로 적으면 3개월 뒤 어긋납니다 (브리프 15장). */
import { COMPONENTS, WHERE } from './data.js'
import { writeFileSync } from 'node:fs'

const esc = (s) => String(s).replace(/'/g, "\\'").replace(/\n/g, ' ')

const entries = COMPONENTS.map((c) => `  {
    name: 'Ds${c.name}',
    ko: '${esc(c.ko)}',
    category: '${c.category}',
    origin: '${c.origin}',
    vuetifyBase: ${c.vuetifyBase ? `'${c.vuetifyBase}'` : 'null'},
    summary: { ko: '${esc(c.summary)}', en: '' },
    reason: {
      ko: '${esc(c.reason.ko)}',
      en: '${esc(c.reason.en)}',
    },
    where: '${esc(WHERE[c.id] || '')}',
    since: '0.1.0',
  },`).join('\n')

const out = `/* ============================================
   meta.ts — 컴포넌트 출처 표기 (자동 생성)
   ============================================
   ⚠️ 이 파일은 \`node scripts-gen-meta.mjs\`로 생성됩니다. 직접 고치지 마세요.
      원본은 data.js입니다. 손으로 적으면 3개월 뒤 문서와 어긋납니다.

   origin
     'custom'  — Vuetify 없이 직접 만듦
     'wrapped' — Vuetify 컴포넌트를 감쌈
*/

export type Origin = 'custom' | 'wrapped'

export interface ComponentMeta {
  name: string
  ko: string
  category: string
  origin: Origin
  vuetifyBase: string | null
  summary: { ko: string; en: string }
  reason: { ko: string; en: string }
  where: string
  since: string
}

export const meta: ComponentMeta[] = [
${entries}
]

/** 이름으로 찾기 — 문서 배지 자동 렌더용 */
export const metaByName = Object.fromEntries(meta.map((m) => [m.name, m]))

/** 통계 */
export const metaStats = {
  total: meta.length,
  standalone: meta.filter((m) => m.origin === 'custom').length,
  vuetifyBased: meta.filter((m) => m.origin === 'wrapped').length,
}
`
writeFileSync('vue/meta.ts', out)
console.log(`meta.ts 생성: ${COMPONENTS.length}종 (custom ${COMPONENTS.filter(c=>c.origin==='custom').length} / wrapped ${COMPONENTS.filter(c=>c.origin==='wrapped').length})`)
