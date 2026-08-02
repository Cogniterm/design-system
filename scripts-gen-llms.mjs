/* 섹션별 llms.txt 생성기 (Seed 방식).
   AI가 필요한 부분만 읽을 수 있게 쪼갭니다.
   서버 없이 정적 파일이므로 GitHub Pages 그대로 동작합니다. */
import { COMPONENTS, CATEGORIES, WHERE, A11Y, VERSUS, VUETIFY_COVERAGE } from './data.js'
import { PATTERNS, PATTERN_GROUPS } from './patterns.js'
import { FOUNDATION_PAGES } from './foundation.js'
import { ICON_NAMES } from './icons-svg.js'
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs'

const SITE = 'https://kimjiyong995-coder.github.io/design-system'
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

writeFileSync('components/llms.txt', `# Components — Design System

> ${COMPONENTS.length} components. ${COMPONENTS.filter((c) => c.origin === 'custom').length} standalone
> (no Vuetify needed, import from \`~/design\`) and
> ${COMPONENTS.filter((c) => c.origin === 'wrapped').length} Vuetify-based
> (import from \`~/design/vuetify\`, also needs ds-vuetify.css).
> Docs: ${SITE}/#/components

## Rules
- Import from the correct barrel. Mixing them breaks builds in apps without Vuetify.
- Use CSS variables only — never hardcode hex, spacing or radius.
- One primary button per screen.
- Every list/table needs default, loading, empty, error and partial states.
- Async agent work shows PROGRESS (DsToolCallStep / DsThinkingIndicator), never a bare spinner.
- Icons come from \`~/design/icon\` by semantic name; components take them via an \`#icon\` slot.
${byCat}
`)

/* ── /patterns/llms.txt ── */
writeFileSync('patterns/llms.txt', `# Patterns — Design System

> How to COMBINE components. Solving the same problem differently on each screen
> makes the product inconsistent even when the components match.
> Docs: ${SITE}/#/patterns

${PATTERN_GROUPS.map((g) => {
  const items = PATTERNS.filter((p) => p.group === g.id)
  if (!items.length) return ''
  return `## ${g.name} (${g.ko})\n\n` + items.map((p) =>
    `### ${p.name} — ${p.ko}\n${p.summary}\n\n${strip(p.body()).slice(0, 1400)}\n\n${SITE}/#/patterns/${p.id}\n`
  ).join('\n')
}).join('\n')}`)

/* ── /foundation/llms.txt ── */
const ds = readFileSync('ds.css', 'utf8')
const tokens = ds.slice(ds.indexOf(':root'), ds.indexOf('* { box-sizing'))
writeFileSync('foundation/llms.txt', `# Foundation — Design System

> Decisions made before components: tokens, color, type, spacing, shape, elevation,
> density, icons, motion, state, accessibility, writing, i18n.
> Docs: ${SITE}/#/foundation

## Pages
${FOUNDATION_PAGES.map(([id, ko, en]) => `- ${en} (${ko}) — ${SITE}/#/foundation/${id}`).join('\n')}

## Hard rules for generating screens
- Color: brand ONLY for actions, selection, focus, links. Gray does 95% of the work.
  Gray roles — 1-2 background, 3 hover, 4-5 soft border, 6 default border,
  8 hover border, 9 faint text, 11 secondary text, 12 body text.
- Type: Pretendard, 9 steps only — 11/12/13/14/15/16/20/24/30 via var(--text-*).
  UI surfaces (buttons, tables, sidebars) use 13-14px; reading surfaces (explanations,
  agent responses) use 15px with line-height 1.8. Using one size for both makes both
  mediocre. Weights 400/500/600 — never 700+.
  Hierarchy comes from weight and color, not size.
  No uppercase and no positive letter-spacing (both break Korean). word-break: keep-all.
  Line-height tokens: tight 1.3 (headings), ui 1.5 (dense), normal 1.62, prose 1.8.
  Reading measure max 68ch (var(--measure)).
- Spacing: multiples of 4 only (0 4 8 12 16 24 32 48 64). Grouping is proximity.
  Reading width max 720px; data screens 1080-1280px.
- Shape: radius sm=4 md=6 lg=8 xl=12. Controls use lg, large surfaces use xl.
  Border always 1px. Nested radius must be <= parent radius.
- Elevation: NO elevation scale. Shadow only on Menu, Dialog, Tooltip, Snackbar.
- Density: compact 34px / comfortable 42px (default) / spacious 50px row height.
  Never mix densities within one screen.
- Motion: 160ms default, 240ms max, ease only, fade for overlays, no ripple.
  Honor prefers-reduced-motion.
- Accessibility: WCAG 2.2 AA. Never rely on color alone. Never remove focus outline.
  aria-label on icon-only buttons.
- Writing: errors never apologize. Formula = what happened + why + what you can do.
  Buttons start with a verb; dialog buttons repeat the action ("삭제", not "확인").
- Korean UI vocabulary is FIXED — see the word list. Key ones:
  에이전트 (not AI/봇), 실행 (not 수행/구동), 실행 기록 (not 히스토리),
  실행 중 (not 진행 중/처리 중), 실패 (not 오류/에러), 부분 완료,
  만들기 (not 생성/추가), 저장 (not 적용/확인), 되돌리기 (not 언두).
  Sentences end 합니다; instructions 하세요; dialog titles 할까요? (never 하시겠습니까?).
  Units are spaced from numbers: 2.1 MB, 128건, 12.4초.
  Full list: ${SITE}/#/foundation/wordlist

## Tokens (source of truth: ds.css)
\`\`\`css
${tokens.trim()}
\`\`\`

## Icons (${ICON_NAMES.length} registered, Lucide)
Addressed by MEANING, not Lucide's name. \`delete\` not \`Trash2\`, \`agent\` not \`Bot\`.
${ICON_NAMES.join(' ')}
`)

/* ── /vuetify/llms.txt ── */
const byStatus = (s) => VUETIFY_COVERAGE.filter((r) => r[1] === s)
writeFileSync('vuetify/llms.txt', `# Vuetify integration — Design System

> This system lives ALONGSIDE Vuetify 3.11, it does not replace it.
> No migration. Existing screens are unchanged. Vuetify stays at 3.11 — v4 is not planned.
> Docs: ${SITE}/#/docs/vuetify

## Setup
\`\`\`ts
import { createVuetify } from 'vuetify'
import { dsTheme } from '~/design/theme'       // colors — applies to ALL Vuetify components
import { dsDefaults } from '~/design/defaults' // per-component defaults (77 components)

createVuetify({ theme: dsTheme, defaults: dsDefaults })
\`\`\`
Load \`ds.css\` and \`ds-vuetify.css\`. Install \`pretendard\` and \`lucide-vue-next\`.
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
writeFileSync('a11y/llms.txt', `# Accessibility — Design System

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
writeFileSync('llms.txt', `# Design System (AI SaaS Agent)

> Extreme-minimal design system for AI agent products, built for Vue 3 + Vuetify 3.11.
> No shadows, 1px borders, radius 4/6/8/12, Pretendard, brand blue #1F7FF0
> (#4593F5 in dark), Radix Slate gray 1-12. Light + dark via [data-theme="dark"].
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
3. Gray does 95% of the work. Brand color only for actions, selection, focus, links.
4. Spacing is multiples of 4. Radius: controls 8px, large surfaces 12px. Borders 1px.
5. No shadows except Menu, Dialog, Tooltip, Snackbar.
6. One primary button per screen. Buttons start with a verb.
7. Every list/table ships default, loading, empty, error AND partial states.
8. Agent work shows PROGRESS — DsToolCallStep / DsThinkingIndicator, never a bare
   spinner. Tool calls render ABOVE the answer.
9. Errors never apologize: what happened + why + what you can do.
10. Never remove the focus outline. Never rely on colour alone.

## Component names are English, UI copy is Korean
\`DsChatMessage\`, \`variant\`, \`@send\` stay English. User-facing text is Korean.

## Live examples
${SITE}/live/        every component rendered on real Vuetify 3.11.6
${SITE}/live/#audit  an audit-log screen: table, filters, dialog, loading/empty states
`)

console.log('생성 완료:')
for (const f of ['', 'components/', 'patterns/', 'foundation/', 'vuetify/', 'a11y/']) {
  const n = readFileSync(`${f}llms.txt`, 'utf8')
  console.log(`  /${f}llms.txt — ${(n.length / 1024).toFixed(1)} KB, ${n.split('\n').length}줄`)
}
