/* ============================================
   scripts-sync-app.mjs — 앱에 DS 심기 · 어긋남 검사
   ============================================
   HANDOFF 2-2("파일 복사")를 사람 손에서 뗀 것입니다.

   ── 왜 만들었나 (2026-09-08)
   front-ux(이용자 인터페이스)는 이 저장소를 손으로 복사해 쓰고 있었습니다. 그 결과
   **사본이 08-19판에 멈춰 있는데 아무도 몰랐습니다** — version.ts의 스탬프는 복사할 때
   같이 안 옮겨졌고, 마지막 커밋 제목은 "디자인시스템 원본과 동기화"였습니다.
   그 아흐레 사이에 든 변경이 사본에 없었습니다:
     · DsSlider 손잡이 16 · 홈 6 + trackColor (없으면 홈 전체가 파랗게 칠해집니다)
     · DsBadge 분류 톤 개명 (violet · teal · pink → cat-3 · cat-2 · cat-5)
     · DsTimeline을 Vuetify 없는 부품으로 다시 만든 것
   `npm run live`가 문서 사이트에 같은 사고(2026-08-19~08-28 아흐레)를 막으려고 생긴 것처럼,
   이 스크립트는 **앱에** 같은 사고를 막습니다.

   ── 하는 일
   sync   vue/ · ds.css · ds-vuetify.css 를 앱의 design 폴더로 복사합니다.
          원본에 없는 파일은 지웁니다 — 안 지우면 옛 부품이 남아 배럴이 가리키지 않는
          유령 파일이 됩니다(실제로 사본에 옛 vuetify/DsTimeline.vue가 남아 있었습니다).
   check  복사 안 하고 **무엇이 다른지만** 알려줍니다. exit 1 이라 CI에도 걸 수 있습니다.

   ── 토큰은 복사하지 않습니다
   ds.css의 `:root`·`[data-theme="dark"]` 블록은 떼고 옮깁니다.
   앱의 토큰 파일이 단일 원본이고, 앱은 ds.css를 토큰 파일보다 **나중에** 부르기 때문에
   (front-ux main.ts: 토큰.css → … → ds.css) 통째로 옮기면 DS 값이 앱 값을 덮습니다.
   대신 --check가 **토큰 값을 대조**합니다. 기준은 앱이 아니라 ds.app.json의 tokenSource —
   지금은 관리자 콘솔입니다 (2026-08-26 결정, front-ux 토큰.css 머리말에도 적혀 있습니다).

   ── 쓰는 법
     node scripts-sync-app.mjs <앱 경로>            복사
     node scripts-sync-app.mjs <앱 경로> --check    검사만

   앱 쪽에서는 `npm run ds:sync` · `npm run ds:check` 로 부릅니다.
   앱 루트에 **ds.app.json** 이 있어야 합니다 (없으면 무엇을 적어야 하는지 알려줍니다).
   ============================================ */
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

/* 앱 폴더에서 부르므로 작업 디렉터리를 믿을 수 없습니다 — 원본 위치는 이 파일 자리에서 잽니다.
   (앱의 package.json: "ds:sync": "node ../design-system/scripts-sync-app.mjs .") */
const DS_ROOT = dirname(fileURLToPath(import.meta.url))

const [, , appArg, ...flags] = process.argv
const CHECK = flags.includes('--check')

if (!appArg) {
  console.error('앱 경로를 주세요:  node scripts-sync-app.mjs ../cogniterm-vue [--check]')
  process.exit(2)
}

/* 저장소 루트에서만 돕니다 — 다른 데서 돌리면 엉뚱한 폴더를 지웁니다 (live 스크립트와 같은 방어) */
if (!existsSync(join(DS_ROOT, 'ds.css')) || !existsSync(join(DS_ROOT, 'vue'))) {
  console.error(`design-system 저장소를 못 찾았습니다: ${DS_ROOT}`)
  process.exit(2)
}

const APP = appArg
const CONF_PATH = join(APP, 'ds.app.json')
if (!existsSync(CONF_PATH)) {
  console.error(`${CONF_PATH} 가 없습니다. 이렇게 만드세요:

{
  "copyTo": "src/공용/디자인시스템",       // DS 파일이 들어갈 자리 (앱 루트 기준). 아직 안 심었으면 null
  "tokens": "src/공용/스타일/토큰.css",    // 앱의 토큰 파일
  "tokenSource": null,                     // 토큰 기준 저장소의 토큰 파일 (앱 자신이 기준이면 null)
  "keepLocal": ["theme.ts"]                // 일부러 원본과 다르게 두는 파일
}`)
  process.exit(2)
}
const conf = JSON.parse(readFileSync(CONF_PATH, 'utf8'))
const keepLocal = new Set(conf.keepLocal ?? [])

/* ── ds.css에서 토큰 블록 떼기 ────────────────────────
   `:root {` 와 `[data-theme="dark"], .dark {` 로 시작하는 최상위 블록만 지웁니다.
   중괄호를 세어 끝을 찾습니다 — 정규식으로는 안쪽 중괄호(color-mix 등)에서 일찍 끊깁니다. */
function stripTokens (css) {
  const heads = [/^:root\s*\{/m, /^\[data-theme="dark"\][^{]*\{/m]
  let out = css
  for (const head of heads) {
    for (;;) {
      const m = head.exec(out)
      if (!m) break
      let i = m.index + m[0].length, depth = 1
      while (i < out.length && depth > 0) {
        if (out[i] === '{') depth++
        else if (out[i] === '}') depth--
        i++
      }
      out = out.slice(0, m.index) + out.slice(i)
    }
  }
  return out.replace(/\n{3,}/g, '\n\n')
}

const HEADER = `/* ============================================
   Design System — 컴포넌트 규칙
   ⚠ 이 파일은 **자동 생성**입니다. 여기서 고치지 마세요 — 다음 동기화에 날아갑니다.
     원본: design-system 저장소의 ds.css. 고칠 것이 있으면 거기서 고치고 \`npm run ds:sync\`.
   ⚠ 토큰(색·라운드·타이포)은 여기 없습니다 — 앱의 토큰 파일이 단일 원본입니다.
     ds.css가 토큰 파일보다 나중에 로드되므로, 토큰을 여기 두면 앱 값을 덮어씁니다.
   ============================================ */

`

/* 문서 사이트 전용 — 앱에는 안 내려갑니다.
   meta.ts는 컴포넌트 출처 표기(자동 생성, 39KB)라 배럴이 내보내지도 않고 앱이 쓰지도 않습니다.
   앱에 두면 typecheck 대상만 늘고 아무 일도 하지 않습니다. */
const DOCS_ONLY = new Set(['meta.ts'])

/* ── 원본이 앱에 들어가야 할 모습 (경로 → 내용) ── */
function sourceFiles () {
  const files = new Map()
  const walk = (dir, base) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name)
      if (statSync(p).isDirectory()) walk(p, base)
      else {
        const rel = relative(base, p).replace(/\\/g, '/')
        if (!DOCS_ONLY.has(rel)) files.set(rel, readFileSync(p, 'utf8'))
      }
    }
  }
  walk(join(DS_ROOT, 'vue'), join(DS_ROOT, 'vue'))
  files.set('ds.css', HEADER + stripTokens(readFileSync(join(DS_ROOT, 'ds.css'), 'utf8')))
  files.set('ds-vuetify.css', readFileSync(join(DS_ROOT, 'ds-vuetify.css'), 'utf8'))
  return files
}

/* 줄 끝(CRLF/LF) 차이는 내용 차이가 아닙니다 — Windows에서 편집하면 늘 생깁니다 */
const norm = s => s.replace(/\r\n/g, '\n')

/* ── 토큰 대조 ──────────────────────────
   `:root` 와 html 로 시작하는 **밝은 테마 블록만** 봅니다.
   다크 블록은 같은 이름을 다른 값으로 다시 선언하므로 섞으면 전부 어긋난 것처럼 보입니다. */
function lightTokens (path) {
  const css = readFileSync(path, 'utf8')
  const out = new Map()
  for (const m of css.matchAll(/([^{}]*)\{([^{}]*)\}/g)) {
    const sel = m[1].trim().split('\n').pop().trim()
    if (/dark/i.test(sel)) continue
    if (!/^:root|^html/.test(sel)) continue
    for (const d of m[2].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) out.set(d[1], d[2].trim().replace(/\s+/g, ' '))
  }
  return out
}

/* ══ 실행 ══ */
const problems = []

/* 1. 부품 파일 */
if (conf.copyTo) {
  const dest = join(APP, conf.copyTo)
  const src = sourceFiles()

  const have = new Map()
  if (existsSync(dest)) {
    const walk = (dir) => {
      for (const name of readdirSync(dir)) {
        const p = join(dir, name)
        if (statSync(p).isDirectory()) walk(p)
        else have.set(relative(dest, p).replace(/\\/g, '/'), readFileSync(p, 'utf8'))
      }
    }
    walk(dest)
  }

  for (const [rel, body] of src) {
    if (keepLocal.has(rel)) continue
    const now = have.get(rel)
    if (now === undefined) problems.push(`  없음    ${conf.copyTo}/${rel}`)
    else if (norm(now) !== norm(body)) problems.push(`  낡음    ${conf.copyTo}/${rel}`)
  }
  for (const rel of have.keys()) {
    if (keepLocal.has(rel) || src.has(rel)) continue
    problems.push(`  남은 것 ${conf.copyTo}/${rel}  (원본에 없습니다)`)
  }

  if (!CHECK) {
    for (const [rel, body] of src) {
      if (keepLocal.has(rel)) continue
      const p = join(dest, rel)
      mkdirSync(dirname(p), { recursive: true })
      writeFileSync(p, body)
    }
    for (const rel of have.keys()) {
      if (keepLocal.has(rel) || src.has(rel)) continue
      rmSync(join(dest, rel))
    }
  }
}

/* 2. 토큰 */
if (conf.tokens && conf.tokenSource) {
  const mine = lightTokens(join(APP, conf.tokens))
  const theirs = lightTokens(join(APP, conf.tokenSource))
  for (const [k, v] of theirs) {
    if (!mine.has(k)) problems.push(`  토큰 없음  ${k}: ${v}`)
    else if (mine.get(k).replace(/\s/g, '') !== v.replace(/\s/g, '')) {
      problems.push(`  토큰 다름  ${k}\n              기준: ${v}\n              사본: ${mine.get(k)}`)
    }
  }
}

/* ══ 보고 ══ */
const stamp = readFileSync(join(DS_ROOT, 'vue', 'version.ts'), 'utf8').match(/DS_VERSION = '([^']+)'/)?.[1] ?? '?'

/* copyTo가 비어 있으면 아직 DS를 안 심은 앱입니다. "정상"이라고 말하면 거짓말이 됩니다 —
   검사할 게 없다는 것과 어긋난 게 없다는 것은 다릅니다. */
if (!conf.copyTo) {
  console.log(`DS 미도입 — ${APP}`)
  console.log(`ds.app.json의 copyTo가 비어 있습니다. 부품을 심으면 그 경로를 적으세요 (HANDOFF 2-2).`)
  if (problems.length) { console.log(''); console.log(problems.join('\n')) }
  process.exit(0)
}

if (CHECK) {
  if (problems.length === 0) {
    console.log(`DS 동기화 정상 — ${APP} (원본 ${stamp})`)
    if (keepLocal.size) console.log(`일부러 다르게 둔 파일: ${[...keepLocal].join(' · ')}`)
  } else {
    console.error(`DS가 원본과 어긋났습니다 — ${APP} (원본 ${stamp})\n`)
    console.error(problems.join('\n'))
    console.error(`\n고치려면:  npm run ds:sync`)
    if (conf.tokenSource) console.error(`토큰은 복사되지 않습니다 — 기준(${conf.tokenSource})을 보고 손으로 맞추세요.`)
    process.exit(1)
  }
} else {
  console.log(`DS를 심었습니다 — ${APP} (원본 ${stamp})`)
  if (keepLocal.size) console.log(`건드리지 않은 파일: ${[...keepLocal].join(' · ')}`)
  const tokenProblems = problems.filter(p => p.includes('토큰'))
  if (tokenProblems.length) {
    console.log(`\n⚠ 토큰은 복사하지 않습니다. 기준과 다른 것이 있습니다:`)
    console.log(tokenProblems.join('\n'))
  }
}
