/* ============================================
   scripts-render.mjs — 문서 사이트가 실제로 그려지는지
   ============================================
   지금까지의 게이트는 "데이터가 맞는가"만 봤습니다.
   데이터가 멀쩡해도 렌더 코드가 터지면 화면은 비어 있고,
   그건 배포하고 브라우저로 열어봐야 알 수 있었습니다.

   여기서는 브라우저 없이 docs.js를 그대로 실행합니다.
   document·window를 최소한만 흉내 내면, 나머지는 문자열을 만드는
   순수 함수라서 그대로 돌아갑니다.

   잡는 것
     · 렌더 중 예외 (없는 필드 접근, 오타 난 함수 이름)
     · 화면에 새는 undefined / NaN
     · 카드 안에 카드 링크를 끊는 <a> 중첩
     · 컴포넌트 수가 데이터와 안 맞는 경우
*/
import { COMPONENTS } from './data.js'

const fail = (m) => { console.error(`  ✗ ${m}`); process.exitCode = 1 }
const ok = (m) => console.log(`  ✓ ${m}`)

/* ── 최소한의 브라우저 흉내 ── */
const captured = []
const stub = () => ({
  innerHTML: '', className: '', textContent: '', dataset: {}, style: {}, hidden: false,
  classList: { add() {}, remove() {}, toggle() {}, contains: () => false },
  addEventListener() {}, querySelectorAll: () => [], querySelector: () => null,
  appendChild() {}, insertBefore() {}, remove() {}, closest: () => null,
  get firstChild() { return null },
})

globalThis.document = {
  querySelector: (sel) => {
    const el = stub()
    // #content에 꽂히는 HTML을 모읍니다 — 이게 사용자가 보는 화면입니다
    if (sel === '#content') Object.defineProperty(el, 'innerHTML', {
      set(v) { captured.push(v) }, get() { return '' },
    })
    return el
  },
  querySelectorAll: () => [],
  getElementById: () => stub(),
  createElement: stub,
  documentElement: { setAttribute() {}, getAttribute: () => 'light' },
  body: stub(),
  addEventListener() {},
}
globalThis.location = { hash: '#/components', origin: 'http://localhost', pathname: '/', replace() {} }
globalThis.window = {
  addEventListener() {}, scrollTo() {}, innerWidth: 1800,
  matchMedia: () => ({ matches: false, addEventListener() {} }),
}
Object.defineProperty(globalThis, 'navigator', {
  value: { clipboard: { writeText: async () => {} } }, configurable: true,
})
globalThis.localStorage = { getItem: () => null, setItem() {} }

console.log('문서 사이트 렌더 검사')

try {
  await import('./docs.js')
} catch (e) {
  fail(`렌더 중 예외 — ${e.message}`)
  console.error(e.stack)
  process.exit(1)
}

const html = captured.join('\n')

if (!html.length) fail('#content에 아무것도 그려지지 않았습니다')
else ok(`화면 출력 ${(html.length / 1024).toFixed(0)} KB`)

/* ── 카탈로그가 전부 나오는가 ── */
const cards = [...html.matchAll(/<a class="cat-card" href="#\/components\/([a-z]+)">/g)].map((m) => m[1])
if (cards.length !== COMPONENTS.length)
  fail(`카탈로그 카드 ${cards.length}장 — 컴포넌트는 ${COMPONENTS.length}종입니다`)
else ok(`카탈로그 카드 ${cards.length}장 — 컴포넌트 수와 일치`)

/* ── 화면에 새는 값 ── */
const leaks = (html.match(/undefined|NaN|\[object Object\]/g) || [])
if (leaks.length) fail(`화면에 ${leaks.join(', ')}가 그대로 나옵니다`)
else ok('undefined · NaN 노출 없음')

/* ── 카드 안의 링크 중첩 ──
   <a> 안에 <a>는 HTML이 허용하지 않습니다. 브라우저가 바깥 링크를
   그 자리에서 끊어버려서, 카드 절반이 클릭되지 않고 데모를 누르면
   빈 "#"으로 튑니다. 실제로 SearchResult·Link 카드에서 났던 일입니다. */
const nested = (html.match(/<a class="cat-card"[^>]*>[\s\S]*?<\/a>/g) || [])
  .filter((c) => c.slice(20).includes('<a '))
if (nested.length) fail(`카드 ${nested.length}장 안에 <a>가 중첩돼 링크가 끊깁니다`)
else ok('카드 링크 중첩 없음')

/* ── 배지 문구가 한 어휘인가 ── */
const badges = new Set([...html.matchAll(/mini-badge \w+">([^<]*)</g)].map((m) => m[1]))
const allowed = new Set(['BASE', 'VUETIFY'])
const odd = [...badges].filter((b) => !allowed.has(b))
if (odd.length) fail(`배지에 예상 밖 문구 — ${odd.join(', ')}`)
else ok(`배지 문구 ${[...badges].join(' · ')}`)

console.log()
if (process.exitCode) console.log('실패 — 문서 사이트가 제대로 그려지지 않습니다')
else console.log('통과 — 문서 사이트 렌더 이상 없음')
