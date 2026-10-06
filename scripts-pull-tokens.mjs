#!/usr/bin/env node
/* 토큰 받아 오기 — 앱의 토큰 파일(단일 원본)을 이 저장소 ds.css 의 토큰 두 덩이(:root · 다크)에 그대로 옮깁니다.

   왜: 토큰의 원본은 앱 쪽 `공용/스타일/토큰.css` 입니다(관리자 콘솔 · 이용자 화면이 한 파일을 씀 — "값이 갈리면 콘솔이 정답").
   ds:sync 는 ds.css 에서 토큰 덩이를 **떼고** 앱에 내려보내므로 앱 화면은 늘 앱 토큰으로 그려지지만, 이 저장소의
   문서 사이트는 ds.css 의 토큰으로 그려집니다. 그래서 둘이 갈리면 **문서 사이트만 실제 화면과 다른 색**이 됩니다
   (2026-10-06 실측: 다크 프라이머리 · 테두리 · 회색 · 다크 면이 달랐음). 방향은 늘 앱 → DS 입니다.

   쓰는 법:  npm run tokens:pull            (기본 경로 ../admin-console/frontend/공용/스타일/토큰.css)
            node scripts-pull-tokens.mjs <토큰 파일> [--check]
   --check 는 고치지 않고 다른지만 봅니다(다르면 exit 1).

   규칙:
   · 앱 토큰 덩이(:root · .dark)의 선언을 주석까지 그대로 옮깁니다.
   · ds.css 에만 있는 이름은 지우지 않고 그 덩이 끝에 'DS 사이트 전용' 으로 남깁니다 — 문서 사이트의 데모가 쓸 수 있어서입니다.
   · 셀렉터는 ds.css 것 그대로(:root / [data-theme="dark"], .dark) — 문서 사이트는 data-theme 으로 테마를 바꿉니다. */
import {readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const CHECK = args.includes('--check');
const SRC = resolve(args.find((a) => !a.startsWith('--')) ?? join(ROOT, '..', 'admin-console', 'frontend', '공용', '스타일', '토큰.css'));
const DS = join(ROOT, 'ds.css');

/* 머리 정규식으로 찾은 최상위 덩이의 [여는 중괄호 다음, 닫는 중괄호] 구간 — 중괄호를 셉니다(color-mix 안쪽 괄호 때문) */
function block(css, head) {
  const m = head.exec(css);
  if (!m) return null;
  const start = m.index + m[0].length;
  let i = start, depth = 1;
  while (i < css.length && depth > 0) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}') depth--;
    i++;
  }
  return {start, end: i - 1, body: css.slice(start, i - 1)};
}
/* 덩이 안의 선언 이름 → 선언 한 줄(들). 주석은 빼고 셉니다 */
function decls(body) {
  const map = new Map();
  const clean = body.replace(/\/\*[\s\S]*?\*\//g, '');
  for (const m of clean.matchAll(/(--[\w-]+)\s*:\s*([^;]*);/g)) map.set(m[1], m[2].replace(/\s+/g, ' ').trim());
  return map;
}

const app = readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');
const raw = readFileSync(DS, 'utf8');
const crlf = raw.includes('\r\n');
let ds = raw.replace(/\r\n/g, '\n');

const pairs = [
  {name: 'light', app: /^:root\s*\{/m, ds: /^:root\s*\{/m},
  {name: 'dark', app: /^\.dark\s*\{/m, ds: /^\[data-theme="dark"\][^{]*\{/m},
];

const report = [];
for (const p of pairs) {
  const a = block(app, p.app);
  const d = block(ds, p.ds);
  if (!a || !d) { console.error(`토큰 덩이를 못 찾았습니다(${p.name}) — ${!a ? SRC : DS}`); process.exit(2); }
  const ad = decls(a.body);
  const dd = decls(d.body);
  const diff = [...ad].filter(([k, v]) => dd.get(k) !== v).map(([k]) => k);
  const dsOnly = [...dd.keys()].filter((k) => !ad.has(k));
  report.push(`${p.name}: 다른 값 ${diff.length}개${diff.length ? ` (${diff.slice(0, 8).join(' ')}${diff.length > 8 ? ' …' : ''})` : ''} · DS 사이트 전용 ${dsOnly.length}개`);
  if (CHECK) continue;
  const tail = dsOnly.length
    ? `\n  /* ── DS 사이트 전용 — 앱 토큰(${'공용/스타일/토큰.css'})에 없는 이름. 값은 그대로 둡니다(scripts-pull-tokens.mjs) ── */\n` +
      dsOnly.map((k) => `  ${k}: ${dd.get(k)};`).join('\n') + '\n'
    : '';
  const body = `\n  /* ⚠ 이 덩이는 앱 토큰 파일에서 받아 온 것입니다 — 여기서 고치지 말고 앱 토큰.css 를 고친 뒤 npm run tokens:pull (2026-10-06) */` +
    a.body.replace(/\s+$/, '\n') + tail;
  ds = ds.slice(0, d.start) + body + ds.slice(d.end);
}

if (CHECK) {
  const same = report.every((r) => r.includes('다른 값 0개'));
  console.log(`토큰 ${same ? '같음' : '다름'} — ${SRC}\n  ${report.join('\n  ')}`);
  process.exit(same ? 0 : 1);
}
writeFileSync(DS, crlf ? ds.replace(/\n/g, '\r\n') : ds);
console.log(`ds.css 토큰을 앱 토큰으로 맞췄습니다 — ${SRC}\n  ${report.join('\n  ')}`);
