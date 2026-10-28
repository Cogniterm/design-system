#!/usr/bin/env node
/* ============================================
   ds.mjs — 에이전트용 디자인 시스템 조회 명령
   ============================================
   ── 왜 (2026-10-27)
   Astryx(Meta)는 에이전트에게 "문서 페이지를 훑지 말고 CLI 로 필요한 것만 꺼내라"고 합니다.
   우리 문서 사이트도 브라우저에서 그려지는 화면이라 받아 가면 껍데기만 옵니다.
   콘솔 · 이용자 화면 저장소에서 일하는 AI 는 옆 폴더의 이 파일을 돌려 **고를 것 → 그것 하나**만 읽습니다.

   ── 쓰는 법 (앱 저장소에서)
     node ../design-system/ds.mjs search 날짜 고르기     부품 · 패턴 · 토큰을 한 번에 찾기
     node ../design-system/ds.mjs component button        부품 하나 — props · 예제 · 지침 · 접근성
     node ../design-system/ds.mjs pattern forms           패턴 하나
     node ../design-system/ds.mjs tokens border           토큰 (이름에 border 가 든 것) — 라이트 · 다크
     node ../design-system/ds.mjs list                    전체 목록
   어느 명령이든 --json 을 붙이면 JSON 으로 냅니다.

   ── 읽는 것
   npm run gen:llms 가 만든 파일만 읽습니다(components/ · patterns/ · foundation/tokens.json).
   여기서 값을 따로 들고 있지 않으므로 문서와 갈릴 일이 없습니다 — 생성을 빼먹으면 옛 값이 나옵니다.
   ============================================ */
import { readFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = dirname(fileURLToPath(import.meta.url))
const read = (p) => readFileSync(join(ROOT, p), 'utf8')
const json = (p) => JSON.parse(read(p))

const argv = process.argv.slice(2)
const JSON_OUT = argv.includes('--json')
const [cmd, ...rest] = argv.filter((a) => a !== '--json')
const q = rest.join(' ').trim()

const C = json('components/index.json').components
const P = json('patterns/index.json').patterns
const T = json('foundation/tokens.json')

const out = (data, text) => console.log(JSON_OUT ? JSON.stringify(data, null, 1) : text)
const fail = (msg) => { console.error(msg); process.exit(1) }

/* 부품 찾기 — id · DsName · Name · 한글 이름 어느 것으로 불러도 */
const findComp = (k) => {
  const n = k.toLowerCase().replace(/^ds/, '')
  return C.find((c) => c.id === n || c.name.toLowerCase() === `ds${n}` || c.ko === k)
}

function search(query) {
  if (!query) fail('찾을 낱말을 주세요 — 예: node ds.mjs search 날짜 고르기')
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  /* 필드마다 무게가 다릅니다 — 이름에 걸리면 용도 문장에 걸린 것보다 훨씬 그럴듯합니다 */
  const score = (fields) => terms.reduce((sum, t) =>
    sum + fields.reduce((a, [text, w]) => a + (String(text || '').toLowerCase().includes(t) ? w : 0), 0), 0)
  const hits = [
    ...C.map((c) => ({ kind: 'component', id: c.id, name: c.name, ko: c.ko, summary: c.summary,
      score: score([[c.id, 6], [c.name, 6], [c.ko, 6], [c.summary, 3], [c.where, 2],
        [c.props.map((p) => p.name).join(' '), 1], [c.confusedWith.map((v) => `${v.other} ${v.decide}`).join(' '), 1],
        [c.guidelines.map((g) => g.text).join(' '), 1]]) })),
    ...P.map((p) => ({ kind: 'pattern', id: p.id, name: p.name, ko: p.ko, summary: p.summary,
      score: score([[p.id, 6], [p.name, 6], [p.ko, 6], [p.summary, 3], [p.sections.join(' '), 2]]) })),
    ...T.tokens.map((t) => ({ kind: 'token', id: t.name, name: t.name, ko: '', summary: `${t.light} / ${t.dark ?? 'same'}`,
      score: score([[t.name, 4]]) })),
  ].filter((h) => h.score > 0).sort((a, b) => b.score - a.score).slice(0, 12)
  const next = { component: 'component', pattern: 'pattern', token: 'tokens' }
  out(hits, hits.length
    ? hits.map((h) => `${h.kind.padEnd(9)} ${h.name}${h.ko ? ` (${h.ko})` : ''} — ${h.summary}\n          → node ds.mjs ${next[h.kind]} ${h.id}`).join('\n')
    : `"${query}" 에 걸린 것이 없습니다 — 낱말을 바꾸거나 node ds.mjs list`)
}

function component(k) {
  const c = k && findComp(k)
  if (!c) fail(`부품을 못 찾았습니다: ${k || '(이름 없음)'} — node ds.mjs list`)
  out(c, read(`components/${c.id}.txt`))
}

function pattern(k) {
  const p = P.find((x) => x.id === k || x.name.toLowerCase() === k.toLowerCase() || x.ko === k)
  if (!p) fail(`패턴을 못 찾았습니다: ${k || '(이름 없음)'} — node ds.mjs list`)
  const body = read(`patterns/${p.id}.txt`)
  out({ ...p, body }, body)
}

function tokens(filter) {
  const f = filter.toLowerCase().replace(/^--/, '')
  const rows = T.tokens.filter((t) => !f || t.name.includes(f))
  const siteOnly = T.docsSiteOnly.filter((t) => f && t.name.includes(f))
  const w = Math.max(...rows.map((t) => t.name.length), 6)
  const lines = rows.map((t) => `${t.name.padEnd(w)}  ${t.light}  │  ${t.dark ?? 'same'}`)
  if (siteOnly.length) lines.push(...(rows.length ? [''] : []), '문서 사이트 전용 — 앱에 없음. 화살표 뒤 이름을 쓰세요:',
    ...siteOnly.map((t) => `  ${t.name}${t.use ? ` → ${t.use}` : '  (앱에 대응하는 토큰 없음)'}`))
  if (!lines.length) lines.push(`"${filter}" 이 든 토큰이 없습니다`)
  out({ tokens: rows, docsSiteOnly: siteOnly }, lines.join('\n'))
}

function list() {
  const byCat = {}
  for (const c of C) (byCat[c.category] ||= []).push(c)
  out({ components: C.map(({ id, name, ko, category, import: imp }) => ({ id, name, ko, category, import: imp })),
    patterns: P.map(({ id, name, ko, group }) => ({ id, name, ko, group })) },
  Object.entries(byCat).map(([cat, cs]) => `[${cat}] ${cs.map((c) => `${c.id}(${c.ko})`).join(' · ')}`).join('\n') +
    `\n\n[patterns] ${P.map((p) => `${p.id}(${p.ko})`).join(' · ')}`)
}

if (!existsSync(join(ROOT, 'components/index.json'))) fail('생성물이 없습니다 — design-system 에서 npm run gen:llms 를 먼저 돌리세요')

switch (cmd) {
  case 'search': search(q); break
  case 'component': component(q); break
  case 'pattern': pattern(q); break
  case 'tokens': tokens(q); break
  case 'list': list(); break
  default:
    console.log(`쓰는 법:
  node ds.mjs search <낱말…>     부품 · 패턴 · 토큰 찾기
  node ds.mjs component <id>     부품 하나 (button · DsButton · 버튼 모두 됨)
  node ds.mjs pattern <id>       패턴 하나
  node ds.mjs tokens [필터]      토큰 라이트 · 다크
  node ds.mjs list               전체 목록
  --json                         JSON 으로`)
}
