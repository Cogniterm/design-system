/* ============================================
   scripts-build-live.mjs — 라이브 갤러리(live/) 빌드
   ============================================
   문서 사이트 Overview 탭의 데모는 정적 HTML이 아니라 **live/를 iframe으로** 띄웁니다
   (docs.js의 `src="live/?v=…#play/<id>"`). 그래서 컴포넌트를 고쳐도 live/를 다시 만들지
   않으면 문서 사이트에서는 옛 모양이 그대로 보입니다.

   ── 왜 스크립트로 만들었나 (2026-08-28)
   전에는 HANDOFF 4장에 bash 다섯 줄로 적어 두고 사람이 손으로 돌렸습니다. 그 결과
   2026-08-19부터 08-28까지 아흐레 동안 아무도 안 돌렸고, 그 사이 모든 변경이 문서
   사이트에서만 안 보였습니다. 게다가 그 bash 줄은 Windows PowerShell에서 안 돕니다 —
   이 시스템을 쓰는 사람 대부분이 Windows입니다.
   이제 `npm run live` 한 줄이고, 배포(deploy.yml)가 올리기 직전에 같은 스크립트를
   돌립니다. **공개 사이트는 이제 낡을 수 없습니다.**

   ── 하는 일 다섯
   1. vue/ · ds.css · ds-vuetify.css를 예제 앱 안으로 복사 (예제는 사본으로 돕니다)
   2. 의존성 설치 (node_modules가 없을 때만 — CI에서는 늘 없습니다)
   3. vite build --base=./
      ⚠ 상대 경로여야 배포 주소(/design-system/live/)와 로컬(/live/) 양쪽에서 뜹니다
   4. dist/ → live/ 교체
   5. 스탬프 갱신 — live/index.html이 해시 대상이라, 안 돌리면 방문자 브라우저가
      옛 번들을 계속 씁니다 (고쳤는데도 안 고쳐진 것처럼 보입니다)

   사용법: 저장소 루트에서 `npm run live`
*/
import { cpSync, existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { join } from 'node:path'

const APP = join('examples', 'vuetify-app')
const DESIGN = join(APP, 'src', 'design')

/* 루트에서만 돕니다 — 다른 데서 돌리면 엉뚱한 폴더를 지웁니다 */
if (!existsSync('ds.css') || !existsSync(APP)) {
  console.error('저장소 루트에서 실행하세요 (ds.css와 examples/vuetify-app이 보이는 자리).')
  process.exit(1)
}

/** npm·vite는 Windows에서 .cmd라 shell을 켜야 찾습니다 */
function run(cmd, cwd) {
  console.log(`  $ ${cmd}${cwd ? `   (${cwd})` : ''}`)
  const r = spawnSync(cmd, { cwd, shell: true, stdio: 'inherit' })
  if (r.status !== 0) {
    console.error(`\n실패: ${cmd}`)
    process.exit(r.status ?? 1)
  }
}

console.log('1/5 디자인 시스템 복사 → ' + DESIGN)
rmSync(DESIGN, { recursive: true, force: true })
cpSync('vue', DESIGN, { recursive: true })
for (const f of ['ds.css', 'ds-vuetify.css']) cpSync(f, join(DESIGN, f))

console.log('2/5 의존성')
if (existsSync(join(APP, 'node_modules'))) console.log('  (이미 설치됨 — 건너뜀)')
else run('npm install --no-audit --no-fund', APP)

console.log('3/5 빌드')
run('npx vite build --base=./', APP)

console.log('4/5 dist → live/')
rmSync('live', { recursive: true, force: true })
cpSync(join(APP, 'dist'), 'live', { recursive: true })

/* ⚠ 줄 끝을 LF로 맞춥니다 — 빼면 Windows에서 빌드한 사람의 CI가 반드시 깨집니다.
   vite가 Windows에서 CRLF로 쓰는데 `.gitattributes`가 커밋할 때 LF로 되돌립니다.
   그러면 **로컬에서 찍은 스탬프(CRLF 기준)와 CI가 다시 재는 값(LF 기준)이 달라서**
   `scripts-stamp.mjs --check`가 "스탬프가 낡았다"며 실패합니다 — 고칠 게 없는데도요.
   여기서 미리 맞춰 두면 작업 트리 · 저장소 · CI가 전부 같은 바이트를 봅니다. */
for (const f of readdirSync('live', { recursive: true, withFileTypes: true })) {
  if (!f.isFile() || !/\.(html|css|js|map|json|txt)$/.test(f.name)) continue
  const p = join(f.parentPath ?? f.path, f.name)
  const s = readFileSync(p, 'utf8')
  if (s.includes('\r\n')) writeFileSync(p, s.replace(/\r\n/g, '\n'))
}

console.log('5/5 스탬프')
run('node scripts-stamp.mjs')

console.log('\nlive/ 갱신 완료 — 바뀌었으면 index.html · version.json · vue/version.ts도 함께 커밋하세요.')
