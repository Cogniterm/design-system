/* 섹션별 llms.txt 생성기 (Seed 방식).
   AI가 필요한 부분만 읽을 수 있게 쪼갭니다.
   서버 없이 정적 파일이므로 GitHub Pages 그대로 동작합니다. */
import { COMPONENTS, CATEGORIES, WHERE, A11Y, VERSUS, VUETIFY_COVERAGE } from './data.js'
import { PATTERNS, PATTERN_GROUPS } from './patterns.js'
import { FOUNDATION_PAGES } from './foundation.js'
import { ICON_NAMES } from './icons-svg.js'
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import { componentPrompt } from './ai-prompt.js'

const SITE = 'https://Cogniterm.github.io/design-system'
const strip = (h) => h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

/* ── /components/llms.txt ── */
const byCat = CATEGORIES.map((cat) => {
  const items = COMPONENTS.filter((c) => c.category === cat.id)
  if (!items.length) return ''
  return `\n### ${cat.name} (${cat.ko})\n` + items.map((c) => {
    const imp = c.origin === 'wrapped' ? '~/design/vuetify' : '~/design'
    const vs = VERSUS[c.id] ? `\n  vs: ${VERSUS[c.id].map(([o, r]) => `${o} — ${r}`).join(' / ')}` : ''
    return `- **Ds${c.name}** (${c.ko}) — ${c.summary}
  import: ${imp} | origin: ${c.origin}${c.vuetifyBase ? ` (${c.vuetifyBase})` : ''}
  where: ${WHERE[c.id]}
  props: ${(c.props || []).map((p) => `${p[0]}${p[2] !== '필수' && p[2] !== '—' ? `=${p[2]}` : ''}`).join(', ') || '없음'}${vs}
  usage:
${c.vue.split('\n').map((l) => '    ' + l).join('\n')}`
  }).join('\n')
}).join('')

writeFileSync('components/llms.txt', `# Components — Cogniterm Design System

> ${COMPONENTS.length} components. ${COMPONENTS.filter((c) => c.origin === 'custom').length} standalone
> (no Vuetify needed, import from \`~/design\`) and
> ${COMPONENTS.filter((c) => c.origin === 'wrapped').length} Vuetify-based
> (import from \`~/design/vuetify\`, also needs ds-vuetify.css).
> Docs: ${SITE}/#/components

## How to use these files when building a screen
Read in this order. Do not skip step 1 — picking the wrong component is the
most common failure, and the index below is what prevents it.

1. This file — scan the category list at the bottom and pick candidates.
2. ${SITE}/components/<id>.txt — the picked component, one file each
   (e.g. /components/button.txt). It carries when to use it, which variant to
   pick, what it is confused with, props, and keyboard behaviour.
3. ${SITE}/patterns/llms.txt — only when composing a whole screen or an agent flow.
4. ${SITE}/foundation/llms.txt — only when you need a colour, spacing or type token.

If two components look interchangeable, the "confused with" section of each
<id>.txt states the deciding question. Answer it before writing code.

## Rules
- Import from the correct barrel. Mixing them breaks builds in apps without Vuetify.
- Use CSS variables only — never hardcode hex, spacing or radius (--r-in 4 / --r-el 6 / --r-ct 10).
- One primary button per screen. Button labels are "대상 + 동사", verb last (사용자 추가, 권한 편집).
- Every list/table needs default, loading, empty, error and partial states.
- Async agent work shows PROGRESS (DsToolCallStep / DsThinkingIndicator), never a bare spinner.
- Icons come from \`~/design/icon\` by semantic name; components take them via an \`#icon\` slot.
${byCat}
`)

/* ── 컴포넌트별 프롬프트 파일 — 페이지의 "AI 프롬프트 복사"와 같은 내용 ── */
for (const c of COMPONENTS) {
  writeFileSync(`components/${c.id}.txt`, componentPrompt(c, { WHERE, VERSUS, A11Y, SITE }))
}

/* ── /patterns/llms.txt ── */
writeFileSync('patterns/llms.txt', `# Patterns — Cogniterm Design System

> How to COMBINE components. Solving the same problem differently on each screen
> makes the product inconsistent even when the components match.
> (내부 사이트에는 패턴 페이지가 없습니다 — 이 파일이 원본입니다)

${PATTERN_GROUPS.map((g) => {
  const items = PATTERNS.filter((p) => p.group === g.id)
  if (!items.length) return ''
  return `## ${g.name} (${g.ko})\n\n` + items.map((p) =>
    `### ${p.name} — ${p.ko}\n${p.summary}\n\n${strip(p.body()).slice(0, 4000)}\n`
  ).join('\n')
}).join('\n')}`)

/* ── /foundation/llms.txt ── */
const ds = readFileSync('ds.css', 'utf8')
const tokens = ds.slice(ds.indexOf(':root'), ds.indexOf('* { box-sizing'))
writeFileSync('foundation/llms.txt', `# Foundation — Cogniterm Design System

> Decisions made before components: tokens, color, type, spacing, shape, elevation,
> density, icons, motion, state, accessibility, writing, i18n.
> Docs: ${SITE}/#/foundation

## Pages
${FOUNDATION_PAGES.map(([id, ko, en]) => `- ${en} (${ko}) — ${SITE}/#/foundation/${id}`).join('\n')}

## Hard rules for generating screens
- The PRODUCT (admin console + user app) is the reference. Where docs and product
  disagree, the product wins. Products switch dark mode with the \`.dark\` class
  (this doc site alone uses [data-theme="dark"]; ds.css accepts both).
- Color: brand #1F7FF0 (dark #4A97F5, white label in both) ONLY for primary
  actions, links (--primary-text), focus, progress and ACTIVE marks. Gray does 95%.
  ACTIVE (tabs, segmented, filter trigger with a value, condition chips) = brand
  stroke + brand text via --nav-active / --nav-active-fg, NO fill.
  SELECTED rows (list rows, nav/GNB current item) = neutral gray fill
  var(--selected-fill). Never fill a selected/active item with brand or black.
  Gray is a NEUTRAL scale built from the product tokens (not Radix Slate):
  --muted #f4f4f5, --border #e4e4e7, --input #d6d6da, --border-emphasized #c9c9cd,
  --muted-foreground #707070, --foreground #1a1a1a.
  BORDERS are SOLID tokens: --border (cards, tables, buttons, inputs) /
  --input (one step stronger) / --border-emphasized (hover, checkbox).
  Only --border-subtle (row dividers in lists) is translucent. Never pick gray numbers.
  Status tokens are --success/--warning/--error (+ -text for TEXT, -subtle, -border);
  --danger-* is a legacy alias. Solid status colors fail AA as text — use -text.
  Shell: --canvas #F4F4F5 with a white --card panel inset 8px. Dark: the content
  surface --card #101013 is DARKER than the canvas #181818 (reversed relation).
  Tokens that reference other tokens with var() must be redeclared in the .dark
  block too — var() resolves where it is declared.
  Charts: axes are --border 1px like the grid, never thicker/darker; re-render on
  theme change; size from the container width, not the window.
- Tables (console list tables): header 40px, 13px/600 --muted-foreground, sticky,
  1px bottom line; rows 52px, 14px, 1px --border line. No zebra.
  Row hover ONLY on rows that open something (.rowlink). Status/result column at the
  right end, just before the action column. Empty cell = "—", never 0.
  Detail key-value card tables (.jt): rows 46, header 38, key column 188px.
- Type: Pretendard, 8 steps only — 11/12/13/14/15/16/20/24 via var(--text-*).
  20 = screen titles, 24 = card (KPI) numbers. No half pixels. --text-3xl/4xl
  exist but are not used in product screens.
  UI surfaces use 13-14px; reading surfaces (agent responses) use 15px with
  line-height 1.8. Weights 400/500/600 — never 700+.
  Hierarchy comes from weight and color, not size.
  No uppercase and no positive letter-spacing. word-break: keep-all.
  --mono only for values read column-wise (time, IP, size, IDs, code);
  keycaps (.kbd) use --font (Pretendard), not mono.
  Tabular numerals (font-variant-numeric) on timestamps, sizes and counts.
  Icons: Lucide at stroke-width 2, addressed by semantic name.
  Focus — three styles exist today: buttons & native checkbox/radio = outline 2px
  brand, offset 1px; inputs/segmented/search = brand border + 3px brand-22% ring;
  DS checkbox/radio parts, tree rows, links = var(--focus-ring) double ring.
  Line-height tokens: tight 1.3 (headings), ui 1.5 (dense), normal 1.62, prose 1.8.
  Reading measure max 720px (var(--measure)) — px, not ch (Korean is full-width).
- Spacing: multiples of 4 inside components. Grouping is proximity.
  Page side padding is 20px everywhere. Exception — document-style screens
  (reports) express layers by gap: 44 (section↔section, 20px/600 titles) /
  32 (doc head→first section) / 28 (block↔block, 16px/600 titles) /
  18 (section→first block) / 10 (block title→content). Dashboard card:
  padding 16, title 16px/600, 10 below the title.
- Layout grid: role columns, not a forced 12-col — docs shell is LNB 264px /
  main minmax(0,720px) / TOC rail 192px, gap 48px. Card lists use
  repeat(auto-fill, minmax(232px,1fr)). Breakpoints 1280/1080/900/640; at 900 the
  LNB becomes a drawer (never just disappears); tables scroll horizontally
  instead of dropping columns; long pages get an on-this-page TOC rail.
- Grouping: sections are separated by WHITESPACE and heading weight (64px above
  an h2), never by horizontal rules. Borders belong to components (cards, tables,
  controls) and shell edges only.
- Shape: --r-in 4 (inside elements: checkbox, small chip, kbd) / --r-el 6
  (elements: buttons, inputs, menu items) / --r-ct 10 (containers: cards, panels,
  dialogs) / --r-full. --r-sm/md/lg/xl are legacy aliases. Never write px radius.
  Border always 1px. Nested radius must be <= parent radius.
- Elevation: things placed IN the page get no shadow, only a 1px --border.
  Floating things use the shadow tokens: --shadow-sm (slider thumb, small control),
  --shadow-md (card hover, small pop), --shadow-lg (popovers, toast),
  --shadow-xl (dialogs, advanced-search panel), --shadow-overlay (menus,
  notification panel, file picker), --shadow-drawer (slide-over panels).
  Never write raw rgba shadows. Scrim: var(--scrim).
- Heights: controls 32 (default) / 28 (sm) / 40 (lg — login submit and the big
  search field on user-app list screens only). Tabs 40. Menu items 32.
  No 34/42/50 density steps — list tables are always 52 rows / 40 header.
- Motion: 160ms default, 240ms max, ease only, fade for overlays, no ripple.
  Honor prefers-reduced-motion.
- Accessibility: WCAG 2.2 AA. Never rely on color alone. Never remove focus outline.
  Icon-only buttons get BOTH title and aria-label — but never title and data-tip
  on the same element (two tooltips appear).
  Known exception: white label on --primary is 3.9:1 light / 3.0:1 dark.
- Writing: errors never apologize. Formula = what happened + why + what you can do.
  Button labels are "대상 + 동사" with the verb LAST (사용자 추가, 권한 편집);
  verb alone when the object is obvious (저장, 삭제). Dialog buttons repeat the
  action ("삭제", not "확인"). No instruction text like "행을 누르면 …합니다".
  Korean particles follow the preceding word; never write 을(를).
  Dates YYYY-MM-DD (hyphens only), datetime MM-DD HH:MM (this year), ranges with ~.
  Empty value "—", not 0.
- Korean UI vocabulary is FIXED — see the word list. Key ones:
  에이전트 (not AI/봇), 실행 (not 수행/구동), 실행 중 (not 진행 중/처리 중),
  추가 for new things (existing console screens still mix 생성/추가 — known,
  don't rename), 편집 (not 수정), 저장 (not 적용/확인), 구성원 (not 멤버),
  내보내기 = table→file, 내려받기 = original file (permission name 다운로드 stays),
  search placeholder "<대상> 검색". No dev words on screen (테넌트, 바인딩, 축).
  STATUS vs RESULT are two axes: 상태 (지금) 정상 · 일시정지 / 활성 · 비활성;
  결과 (한 번) 완료 · 확인 필요 · 오류; a file result is 완료 / 실패.
  Never "정상" for a run.
  Sentences end 합니다; instructions 하세요; dialog titles 할까요? (never 하시겠습니까?).
  Units are spaced from numbers: 2.1 MB, 128건, 12.4초.
  Full list: ${SITE}/#/foundation/wordlist

## Tokens (ds.css — names match the product; product values live in the apps' 토큰.css and win on conflict)
\`\`\`css
${tokens.trim()}
\`\`\`

## Icons (${ICON_NAMES.length} registered, Lucide)
Addressed by MEANING, not Lucide's name. \`delete\` not \`Trash2\`, \`agent\` not \`Bot\`.
${ICON_NAMES.join(' ')}
`)

/* ── /vuetify/llms.txt ── */
const byStatus = (s) => VUETIFY_COVERAGE.filter((r) => r[1] === s)
writeFileSync('vuetify/llms.txt', `# Vuetify integration — Cogniterm Design System

> This system lives ALONGSIDE Vuetify 3.11, it does not replace it.
> No migration. Existing screens are unchanged. Vuetify stays at 3.11 — v4 is not planned.
> Docs: ${SITE}/#/docs/vuetify

## Setup
\`\`\`ts
import { createVuetify } from 'vuetify'
import { dsTheme } from '~/design/theme'       // colors — applies to ALL Vuetify components
import { dsDefaults } from '~/design/defaults' // per-component defaults (77 components)

createVuetify({ theme: dsTheme, defaults: dsDefaults, icons: lucideIconSet })
// icons is REQUIRED: import { lucideIconSet } from '~/design/vuetify-icons'.
// It maps every internal Vuetify alias (checkbox glyphs, select chevrons, sort
// arrows, alert icons...) to Lucide. Without it they render as blank glyphs,
// since the default is the uninstalled @mdi webfont. String icons resolve via
// the semantic registry: <v-icon icon="agent" />.
\`\`\`
Load \`ds.css\` and \`ds-vuetify.css\`. Install \`pretendard\` and \`@lucide/vue\`.
Omitting the Pretendard CSS silently falls back to the system font with no error.

## Why some components need Vuetify and others don't
Behavior that is hard to rebuild correctly (focus trap, viewport-aware positioning,
scroll lock, keyboard navigation, sorting, pagination, IME-safe filtering) stays
Vuetify. Purely visual components and agent-specific ones are built from scratch.
"Standalone" means "does not REQUIRE Vuetify" — those components still work perfectly
inside a Vuetify app and are unaffected by Vuetify version changes.

## Isolation guarantees (verified in CI)
- 0 vuetify imports in standalone components
- 0 !important in ds.css
- 0 .v-* class definitions in ds.css
- all:unset on every component root

## Coverage — all ${VUETIFY_COVERAGE.length} Vuetify components are styled
### Wrapped as Ds* (${byStatus('wrapped').length}) — import from ~/design/vuetify
${byStatus('wrapped').map((r) => `- ${r[0]} -> ${r[2]} (${r[3]})`).join('\n')}

### Styled by theme + defaults (${byStatus('themed').length}) — use plain <v-*>, no setup needed
${byStatus('themed').map((r) => r[0]).join(', ')}

### Styled by CSS only (${byStatus('css').length}) — internal primitives
${byStatus('css').map((r) => r[0]).join(', ')}

### No visual surface (${byStatus('structural').length})
${byStatus('structural').map((r) => r[0]).join(', ')}
`)

/* ── /a11y/llms.txt ── */
writeFileSync('a11y/llms.txt', `# Accessibility — Cogniterm Design System

> Target: WCAG 2.2 AA. Docs: ${SITE}/#/foundation/a11y

## Universal rules
- Contrast: 4.5:1 body text, 3:1 borders and icons. Never put meaning in anything
  lighter than gray-9.
- Never \`outline: none\`. Use \`:focus-visible\` so the ring appears for keyboard only.
- Never rely on colour alone — always pair with text or an icon.
- \`aria-label\` on icon-only buttons; \`aria-hidden\` on decorative icons.
- \`aria-live="polite"\` on streaming agent output.
- Honor \`prefers-reduced-motion\`.
- Don't skip heading levels.

## Per component
${Object.entries(A11Y).map(([id, a]) => {
  const c = COMPONENTS.find((x) => x.id === id)
  return `### Ds${c.name} (${c.ko})
${a.keys.length ? 'Keyboard: ' + a.keys.map(([k, v]) => `${k} = ${v}`).join(' | ') : 'Keyboard: n/a'}
Component handles: ${a.free.join('; ') || '—'}
YOU must handle: ${a.yours.join('; ')}`
}).join('\n\n')}
`)

/* ── /llms.txt — 색인 ── */
writeFileSync('llms.txt', `# Cogniterm Design System

> Minimal design system for AI agent products, built for Vue 3 + Vuetify 3.11.
> Hierarchy comes from spacing, type weight and 1px borders — not shadows or decoration.
> 1px solid borders (#E4E4E7), radius 4/6/10 (--r-in/--r-el/--r-ct), Pretendard,
> brand blue #1F7FF0 (#4A97F5 in dark), neutral gray, --canvas #F4F4F5 shell with a
> white panel inset 8px. Shadows only on floating things. Light + dark via the
> \`.dark\` class in the products (this doc site uses [data-theme="dark"]).
> The product (admin console + user app) is the reference — where they differ, it wins.
> ${COMPONENTS.length} components, ${PATTERNS.length} patterns, ${FOUNDATION_PAGES.length} foundation pages.
> Docs: ${SITE}

## Read the section you need — not everything

| Section | File | Use it when |
|---|---|---|
| Components | ${SITE}/components/llms.txt | Building UI. Props, imports, usage, disambiguation. |
| Patterns | ${SITE}/patterns/llms.txt | Composing a whole screen or an agent flow. |
| Foundation | ${SITE}/foundation/llms.txt | Choosing colors, spacing, type, density. Full token list. |
| Vuetify | ${SITE}/vuetify/llms.txt | Setup, and which components need Vuetify. |
| Accessibility | ${SITE}/a11y/llms.txt | Keyboard tables and per-component a11y duties. |

For a whole screen you usually need **Foundation + Components + Patterns**.

## The ten rules that matter most

1. Import from the right barrel — \`~/design\` (standalone) or \`~/design/vuetify\`
   (needs Vuetify). Mixing them breaks builds.
2. CSS variables only. Never hardcode hex, spacing or radius.
3. Gray does 95% of the work. Brand only for primary actions, links, focus and
   ACTIVE marks — tabs, segmented, filter-with-value and chips get brand stroke +
   brand text with NO fill (--nav-active); selected list/nav rows get a neutral
   gray fill (--selected-fill).
4. Spacing is multiples of 4 (page side padding 20). Radius: --r-el 6 for
   controls, --r-ct 10 for containers, --r-in 4 inside. Borders 1px solid tokens.
5. Things in the page have no shadow; floating things use --shadow-* tokens only.
6. One primary button per screen, on the title bar right. Labels are
   "대상 + 동사" with the verb last (사용자 추가, 권한 편집). Controls are 32px.
7. Every list/table ships default, loading, empty, error AND partial states.
   List tables: 52px rows, 40px 13px/600 sticky header, 20 rows per page.
8. Agent work shows PROGRESS — DsToolCallStep / DsThinkingIndicator, never a bare
   spinner. Tool calls render ABOVE the answer.
9. Errors never apologize: what happened + why + what you can do.
10. Never remove the focus outline. Never rely on colour alone.

## Component names are English, UI copy is Korean
\`DsChatMessage\`, \`variant\`, \`@send\` stay English. User-facing text is Korean.

## Templates — clone these to start a screen
${SITE}/templates/audit.html   admin audit log: LNB shell, stat cards, filter bar,
                               sortable table with selection, detail panel, all 5 states
${SITE}/templates/chat.html    agent chat: message stream, tool calls, citations, composer
${SITE}/templates/search.html  search: query bar, filter chips, highlighted results

## Live examples
${SITE}/live/        every component rendered on real Vuetify 3.11.6
${SITE}/live/#audit  the audit-log screen as a working Vue app
`)

console.log('생성 완료:')
for (const f of ['', 'components/', 'patterns/', 'foundation/', 'vuetify/', 'a11y/']) {
  const n = readFileSync(`${f}llms.txt`, 'utf8')
  console.log(`  /${f}llms.txt — ${(n.length / 1024).toFixed(1)} KB, ${n.split('\n').length}줄`)
}
