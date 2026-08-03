/* ============================================
   scripts-stamp.mjs — 문서 사이트 캐시 무효화 스탬프
   ============================================
   index.html이 부르는 CSS·JS에 ?v=<해시>를 붙입니다.

   왜 필요한가
     GitHub Pages는 파일을 브라우저에 캐시시킵니다. 내용을 고쳐도
     주소가 그대로면 방문자는 옛날 파일을 계속 봅니다. 더 나쁜 경우는
     docs.js만 새것이고 data.js는 옛것이 와서 화면이 통째로 비는 것입니다.

   어떻게
     문서 사이트를 이루는 파일 전부의 내용을 합쳐 해시를 냅니다.
     내용이 한 글자라도 바뀌면 해시가 바뀌고, 주소가 바뀌고,
     브라우저가 새로 받습니다. 안 바뀌면 캐시를 그대로 씁니다.

   쓰는 법
     node scripts-stamp.mjs         스탬프를 갱신합니다
     node scripts-stamp.mjs --check 낡았으면 실패합니다 (CI용)
*/
import { readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

/* index.html이 직접 부르는 것 + 그것들이 불러오는 것 전부.
   하나라도 빠지면 그 파일만 낡은 채로 남습니다. */
const ASSETS = [
  'ds.css', 'ds-vuetify.css', 'docs.css',
  'docs.js', 'data.js', 'foundation.js', 'icons-svg.js', 'ai-prompt.js',
]

const hash = createHash('sha256')
for (const f of ASSETS) hash.update(readFileSync(f))
const stamp = hash.digest('hex').slice(0, 8)

const html = readFileSync('index.html', 'utf8')
const stamped = html.replace(/(\?v=)[A-Za-z0-9]+/g, `$1${stamp}`)

const check = process.argv.includes('--check')

/* 스탬프가 붙어야 할 자리에 실제로 붙어 있는지 — 새 파일을 추가하고
   ?v=를 빼먹는 실수를 여기서 잡습니다. */
const missing = ASSETS.filter((f) => {
  const re = new RegExp(`(src|href)="${f.replace('.', '\\.')}(\\?|")`)
  const m = html.match(re)
  return m && !m[0].includes('?')
})

if (missing.length) {
  console.error(`실패 — ?v= 없이 불리는 파일: ${missing.join(', ')}`)
  process.exit(1)
}

if (check) {
  if (stamped !== html) {
    console.error(`실패 — 캐시 스탬프가 낡았습니다 (있어야 할 값: ${stamp})`)
    console.error('  node scripts-stamp.mjs 를 돌리고 커밋하세요.')
    process.exit(1)
  }
  console.log(`통과 — 캐시 스탬프 최신 (${stamp})`)
} else {
  if (stamped === html) console.log(`변경 없음 — 스탬프 그대로 (${stamp})`)
  else {
    writeFileSync('index.html', stamped)
    console.log(`스탬프 갱신 → ${stamp}`)
  }
}
