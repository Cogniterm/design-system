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
const ALLOWED_PX = ['10', '11', '12', '13', '14', '15', '16', '20', '24', '30', '36']
let scaleOk = true
for (const f of ['ds.css', 'ds-vuetify.css', 'docs.css', 'templates/audit.html', 'templates/chat.html', 'templates/search.html']) {
  const src = readFileSync(f, 'utf8')
  // Vuetify는 아이콘 크기를 font-size로 지정합니다 — 아이콘 규칙은 아이콘 스케일을 허용
  const ICON_PX = ['16', '18', '20', '24']
  const bad = []
  for (const line of src.split('\n')) {
    const isIcon = /\.v-icon|\.lic|icon/i.test(line)
    for (const m of line.matchAll(/font-size:\s*(\d+(?:\.\d+)?)px/g)) {
      const v = m[1]
      if (ALLOWED_PX.includes(v)) continue
      if (isIcon && ICON_PX.includes(v)) continue
      bad.push(v)
    }
  }
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

/* ── 11. Vuetify 아이콘 별칭 — 필수 별칭 누락 검사 ── */
{
  const src = readFileSync('vue/vuetify-icons.ts', 'utf8')
  const REQUIRED = ['checkboxOn', 'checkboxOff', 'checkboxIndeterminate', 'radioOn',
    'radioOff', 'dropdown', 'sortAsc', 'sortDesc', 'expand', 'collapse', 'clear',
    'prev', 'next', 'first', 'last', 'success', 'info', 'warning', 'error',
    'loading', 'calendar', 'close', 'complete', 'menu', 'unfold']
  const missing = REQUIRED.filter((a) => !new RegExp(`^\\s*${a}:`, 'm').test(src))
  if (missing.length) errors.push(`vuetify-icons.ts 별칭 누락: ${missing.join(', ')}`)
  else ok(`Vuetify 아이콘 별칭 ${REQUIRED.length}종 확인`)
}

/* ── 12. 보더는 시맨틱 토큰만 — 불투명 회색 직접 사용 금지 ── */
{
  const files = ['ds.css', 'docs.css', 'ds-vuetify.css',
    'templates/audit.html', 'templates/chat.html', 'templates/search.html']
  const bad = []
  for (const f of files) {
    const src = readFileSync(f, 'utf8')
    for (const m of src.matchAll(/1px (?:solid|dashed) var\(--gray-(\d+)\)/g)) bad.push(`${f}: gray-${m[1]}`)
  }
  if (bad.length) errors.push(`보더에 불투명 회색 직접 사용: ${[...new Set(bad)].join(' · ')} — var(--border*)를 쓰세요`)
  else ok('보더 시맨틱 토큰 준수')
}

/* ── 15. 자기 참조 토큰 — --x: var(--x) 는 값이 없습니다 ── */
{
  const src = readFileSync('ds.css', 'utf8')
  const self = [...src.matchAll(/(--[a-z0-9-]+)\s*:\s*var\(\1\)/g)].map((m) => m[1])
  if (self.length) errors.push(`자기 참조 토큰(값 없음): ${self.join(', ')}`)
  else ok('토큰 자기 참조 없음')
}

/* ── 16. 정의되지 않은 토큰 사용 ── */
{
  const all = ['ds.css', 'ds-vuetify.css', 'docs.css'].map((f) => readFileSync(f, 'utf8')).join('\n')
  const defined = new Set([...all.matchAll(/(--[a-z0-9-]+)\s*:\s*[^;}]/g)].map((m) => m[1]))
  const used = new Set([...all.matchAll(/var\((--[a-z0-9-]+)/g)].map((m) => m[1]))
  const undef = [...used].filter((u) => !defined.has(u) && !u.startsWith('--v-'))
  if (undef.length) errors.push(`정의되지 않은 토큰 사용: ${undef.join(', ')}`)
  else ok(`토큰 정의 ${defined.size}종 · 미정의 사용 없음`)
}

/* ── 17. 색 대비 — WCAG 2.2 AA 실측 ── */
{
  const css = readFileSync('ds.css', 'utf8')
  const hex = (name, block) => {
    const scope = block === 'dark'
      ? css.slice(css.indexOf('[data-theme="dark"]'))
      : css.slice(0, css.indexOf('[data-theme="dark"]'))
    const m = scope.match(new RegExp(`${name}\\s*:\\s*(#[0-9a-fA-F]{6})`))
    return m ? m[1] : null
  }
  const lum = (h) => {
    const c = h.match(/\w\w/g).map((x) => {
      const v = parseInt(x, 16) / 255
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
  }
  const ratio = (a, b) => {
    const l1 = lum(a), l2 = lum(b)
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
  }
  // [설명, 앞색, 뒷색, 최소비] — 본문 4.5, UI 3
  const PAIRS = [
    ['본문 gray-12', '--gray-12', '--bg', 4.5],
    ['보조 gray-11', '--gray-11', '--bg', 4.5],
    ['링크 brand-text', '--brand-text', '--bg', 4.5],
    ['버튼 라벨 on-brand', '--on-brand', '--brand', 4.5],
    ['상태 success', '--success', '--bg', 4.5],
    ['상태 warning', '--warning', '--bg', 4.5],
    ['상태 danger', '--danger', '--bg', 4.5],
  ]
  const fails = []
  for (const theme of ['light', 'dark']) {
    for (const [label, fg, bg, min] of PAIRS) {
      const a = hex(fg, theme) || hex(fg, 'light')
      const b = hex(bg, theme) || hex(bg, 'light')
      if (!a || !b) continue
      const r = ratio(a, b)
      if (r < min) fails.push(`${theme} ${label}: ${r.toFixed(2)}:1 (최소 ${min})`)
    }
  }
  if (fails.length) errors.push(`대비 미달 — ${fails.join(' · ')}`)
  else ok('색 대비 WCAG 2.2 AA — 라이트·다크 14조합 통과')
}

/* ── 18. 아이콘 이름이 글자로 새는 폴백 ──
   <slot name="icon">{{ icon }}</slot> 처럼 두면, 슬롯을 안 넘긴 화면에서
   아이콘 대신 "agent" 같은 이름이 그대로 찍힙니다. 실제로 한 번 났던 버그입니다. */
{
  const leaky = []
  const scan = (dir, prefix) => {
    for (const f of readdirSync(dir).filter((f) => f.endsWith('.vue'))) {
      const src = readFileSync(`${dir}/${f}`, 'utf8')
      // 슬롯 이름이 icon이고 폴백이 {{ … }} 하나로만 이뤄진 경우
      if (/<slot[^>]*name="icon"[^>]*>\s*\{\{[^}]*\}\}\s*<\/slot>/.test(src))
        leaky.push(`${prefix}${f}`)
    }
  }
  scan('vue/components', 'vue/components/')
  scan('vue/components/vuetify', 'vue/components/vuetify/')
  if (leaky.length)
    errors.push(`아이콘 이름이 글자로 렌더됩니다 — ${leaky.join(', ')} (폴백을 비우거나 <DsIcon>을 쓰세요)`)
  else ok('아이콘 슬롯 — 이름이 글자로 새지 않음')
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
