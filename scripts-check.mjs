/* 문서 데이터 무결성 검사 — CI 게이트.
   기계가 막아야 사람이 빠져도 유지됩니다 (브리프 11장). */
import { COMPONENTS, CATEGORIES, WHERE, VUETIFY_COVERAGE, A11Y, VERSUS } from './data.js'
import { FOUNDATION_PAGES, FD_RENDERERS } from './foundation.js'
import { PATTERNS, PATTERN_GROUPS } from './patterns.js'
import { ICON_NAMES } from './icons-svg.js'
import { readFileSync } from 'node:fs'

const errors = []
const warn = []
const ok = (m) => console.log(`  ✓ ${m}`)

/* ── 1. 컴포넌트 레지스트리 ── */
const ids = COMPONENTS.map((c) => c.id)
const dup = ids.filter((x, i) => ids.indexOf(x) !== i)
if (dup.length) errors.push(`컴포넌트 id 중복: ${dup.join(', ')}`)

for (let i = 0; i < COMPONENTS.length; i++) {
  if (!COMPONENTS[i]) { errors.push(`COMPONENTS[${i}]가 빈 슬롯입니다 (쉼표 오타)`); continue }
  const c = COMPONENTS[i]
  const req = ['id', 'name', 'ko', 'category', 'origin', 'summary', 'reason', 'demo', 'vue']
  for (const k of req) if (!c[k]) errors.push(`${c.name || i}: '${k}' 누락`)
  if (c.reason && (!c.reason.ko || !c.reason.en)) errors.push(`${c.name}: reason.ko/en을 비워둘 수 없습니다 (브리프 15장)`)
  if (!WHERE[c.id]) errors.push(`${c.name}: WHERE(어디에 쓰나) 누락`)
  if (c.origin === 'wrapped' && !c.vuetifyBase) errors.push(`${c.name}: wrapped인데 vuetifyBase 없음`)
  if (c.origin === 'custom' && c.vuetifyBase && c.vuetifyBase !== 'Lucide')
    errors.push(`${c.name}: custom인데 vuetifyBase가 있습니다. 대안을 표기하려면 vuetifyAlt를 쓰세요`)
  if (!CATEGORIES.some((x) => x.id === c.category)) errors.push(`${c.name}: 알 수 없는 카테고리 '${c.category}'`)
  if (!c.guidelines?.length) warn.push(`${c.name}: guidelines 없음`)
}
if (!errors.length) ok(`컴포넌트 ${COMPONENTS.length}종 — 필수 항목 완비`)

/* ── 1b. 접근성 · 구분 문서 ── */
const ids2 = new Set(ids)
for (const k of Object.keys(A11Y)) if (!ids2.has(k)) errors.push(`A11Y '${k}': 그런 컴포넌트가 없습니다`)
for (const k of Object.keys(VERSUS)) if (!ids2.has(k)) errors.push(`VERSUS '${k}': 그런 컴포넌트가 없습니다`)
for (const [k, a] of Object.entries(A11Y)) {
  if (!a.yours?.length) errors.push(`A11Y '${k}': yours(직접 해야 할 것)가 비었습니다`)
}
const noA11y = COMPONENTS.filter((c) => !A11Y[c.id]).map((c) => c.name)
if (noA11y.length) warn.push(`접근성 문서 없음 ${noA11y.length}종: ${noA11y.slice(0, 8).join(', ')}${noA11y.length > 8 ? ' …' : ''}`)
ok(`접근성 문서 ${Object.keys(A11Y).length}종 · 구분 문서 ${Object.keys(VERSUS).length}종`)

/* ── 2. 배럴과 문서 일치 ── */
const std = readFileSync('vue/index.ts', 'utf8')
const vue = readFileSync('vue/vuetify.ts', 'utf8')
const exported = new Set([...std.matchAll(/export \{ default as (Ds\w+)/g),
                          ...vue.matchAll(/export \{ default as (Ds\w+)/g)].map((m) => m[1]))
exported.add('DsIcon')
for (const c of COMPONENTS) {
  const n = `Ds${c.name}`
  if (!exported.has(n)) errors.push(`${n}: 문서에 있으나 배럴(index.ts/vuetify.ts)에서 export되지 않음`)
}
if (exported.size !== COMPONENTS.length)
  warn.push(`배럴 ${exported.size}개 vs 문서 ${COMPONENTS.length}개 — 문서 없는 컴포넌트가 있을 수 있습니다`)
ok(`배럴 export ${exported.size}개`)

/* ── 3. meta.ts 동기화 ── */
const metaSrc = readFileSync('vue/meta.ts', 'utf8')
const metaCount = (metaSrc.match(/name: 'Ds/g) || []).length
if (metaCount !== COMPONENTS.length)
  errors.push(`meta.ts가 ${metaCount}종인데 data.js는 ${COMPONENTS.length}종 — 'npm run gen:meta'를 실행하세요`)
else ok(`meta.ts 동기화 (${metaCount}종)`)

/* ── 4. Foundation ── */
for (const [id] of FOUNDATION_PAGES) {
  if (!FD_RENDERERS[id]) errors.push(`Foundation '${id}': 렌더러 없음`)
  else if (FD_RENDERERS[id]().length < 400) errors.push(`Foundation '${id}': 내용이 비었습니다`)
}
ok(`Foundation ${FOUNDATION_PAGES.length}페이지`)

/* ── 4b. 패턴 ── */
const pIds = PATTERNS.map((p) => p.id)
const pDup = pIds.filter((x, i) => pIds.indexOf(x) !== i)
if (pDup.length) errors.push(`패턴 id 중복: ${pDup.join(', ')}`)
for (const p of PATTERNS) {
  if (!PATTERN_GROUPS.some((g) => g.id === p.group)) errors.push(`패턴 '${p.id}': 알 수 없는 그룹 '${p.group}'`)
  if (p.body().length < 400) errors.push(`패턴 '${p.id}': 내용이 비었습니다`)
}
ok(`패턴 ${PATTERNS.length}종 (${PATTERN_GROUPS.map((g) => `${g.ko} ${PATTERNS.filter((p) => p.group === g.id).length}`).join(' · ')})`)

/* ── 5. Vuetify 커버리지 ── */
const covIds = VUETIFY_COVERAGE.map((r) => r[0])
const covDup = covIds.filter((x, i) => covIds.indexOf(x) !== i)
if (covDup.length) errors.push(`Vuetify 커버리지 중복: ${covDup.join(', ')}`)
ok(`Vuetify 커버리지 ${VUETIFY_COVERAGE.length}종`)

/* ── 6. 아이콘 — 두 레지스트리 일치 ── */
const iconsTs = readFileSync('vue/icons.ts', 'utf8')
const tsNames = [...iconsTs.matchAll(/^\s{2}([a-zA-Z]+):\s*[A-Z]/gm)].map((m) => m[1])
const onlyTs = tsNames.filter((n) => !ICON_NAMES.includes(n))
const onlySvg = ICON_NAMES.filter((n) => !tsNames.includes(n))
if (onlyTs.length) errors.push(`icons.ts에만 있는 아이콘: ${onlyTs.join(', ')} — icons-svg.js에도 추가하세요`)
if (onlySvg.length) errors.push(`icons-svg.js에만 있는 아이콘: ${onlySvg.join(', ')} — vue/icons.ts에도 추가하세요`)
if (!onlyTs.length && !onlySvg.length) ok(`아이콘 ${ICON_NAMES.length}개 — 앱/문서 레지스트리 일치`)

/* ── 7. 토큰 동기화 (ds.css ↔ theme.ts) ── */
const dsCss = readFileSync('ds.css', 'utf8')
const themeTs = readFileSync('vue/theme.ts', 'utf8')
const pairs = [
  ['--brand:', "'primary':", 'brand'],
  ['--gray-12:', "'on-surface':", 'gray-12'],
]
for (const [cssKey, tsKey, label] of pairs) {
  const cssVal = dsCss.match(new RegExp(cssKey + '\\s*(#[0-9a-fA-F]{6})'))?.[1]?.toLowerCase()
  const tsVal = themeTs.match(new RegExp(tsKey + "\\s*'(#[0-9a-fA-F]{6})'"))?.[1]?.toLowerCase()
  if (cssVal && tsVal && cssVal !== tsVal)
    errors.push(`토큰 불일치 (${label}): ds.css=${cssVal} vs theme.ts=${tsVal}`)
}
ok('ds.css ↔ theme.ts 토큰 일치')

/* ── 8. 컴포넌트 격리 규칙 ── */
import { readdirSync } from 'node:fs'
for (const f of readdirSync('vue/components').filter((f) => f.endsWith('.vue'))) {
  const src = readFileSync(`vue/components/${f}`, 'utf8')
  if (/from ['"]vuetify/.test(src))
    errors.push(`vue/components/${f}: Standalone인데 vuetify를 import합니다`)
  if (f !== 'DsIcon.vue' && /from ['"]lucide/.test(src))
    errors.push(`vue/components/${f}: Standalone인데 lucide를 import합니다 (#icon 슬롯을 쓰세요)`)
}
ok('Standalone 컴포넌트 — 외부 의존 없음')

/* ── 9. 타입 스케일 준수 (문서 사이트 + 템플릿) ── */
const ALLOWED_PX = ['10', '11', '12', '13', '14', '15', '16', '20', '24', '30']
let scaleOk = true
for (const f of ['docs.css', 'templates/audit.html', 'templates/chat.html', 'templates/search.html']) {
  const src = readFileSync(f, 'utf8')
  const bad = [...src.matchAll(/font-size:\s*(\d+(?:\.\d+)?)px/g)]
    .map((m) => m[1]).filter((v) => !ALLOWED_PX.includes(v))
  if (bad.length) {
    scaleOk = false
    errors.push(`${f}에 스케일 밖 글자 크기: ${[...new Set(bad)].join(', ')}px — var(--text-*)를 쓰세요`)
  }
}
if (scaleOk) {
  const varUse = (readFileSync('docs.css', 'utf8').match(/font-size:\s*var\(--text-/g) || []).length
  ok(`타입 스케일 준수 — docs.css + 템플릿 3종 (토큰 ${varUse}회)`)
}

/* ── 10. 아이콘 기준선 일관성 — -0.125em 하나만 ── */
{
  const files = ['ds.css', 'docs.css', 'ds-vuetify.css',
    'templates/audit.html', 'templates/chat.html', 'templates/search.html']
  const badVA = []
  for (const f of files) {
    const src = readFileSync(f, 'utf8')
    for (const m of src.matchAll(/vertical-align:\s*(-?[\d.]+em)/g)) {
      const v = m[1]
      if (!['-0.125em', '-.125em'].includes(v) && v !== '1px') badVA.push(`${f}: ${v}`)
    }
  }
  if (badVA.length) errors.push(`아이콘 기준선이 -0.125em이 아닌 곳: ${[...new Set(badVA)].join(' · ')}`)
  else ok('아이콘 기준선 -0.125em 통일')
}

/* ── 결과 ── */
console.log()
if (warn.length) {
  console.log('경고:')
  for (const w of warn) console.log(`  ! ${w}`)
  console.log()
}
if (errors.length) {
  console.log(`실패 — ${errors.length}건`)
  for (const e of errors) console.log(`  ✗ ${e}`)
  process.exit(1)
}
console.log('통과 — 문서 데이터 무결성 이상 없음')
