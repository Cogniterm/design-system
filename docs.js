/* 캐시 무효화 — index.html이 docs.js에 붙인 ?v=를 아래 모듈에도 그대로 넘깁니다.
   넘기지 않으면 docs.js만 새것이고 data.js는 브라우저가 캐시해 둔 옛것이 와서,
   새 코드가 없는 데이터를 찾다가 화면이 통째로 비어버립니다. */
const V = new URL(import.meta.url).search
const { CATEGORIES, COMPONENTS, TEMPLATES, VUETIFY_COVERAGE, WHERE, A11Y, VERSUS } = await import('./data.js' + V)
const { FOUNDATION_PAGES, FD_RENDERERS } = await import('./foundation.js' + V)
const { ic, ICON_NAMES } = await import('./icons-svg.js' + V)
const { componentPrompt, importPath } = await import('./ai-prompt.js' + V)

/* ═══════════ 유틸 ═══════════ */
const $ = (s) => document.querySelector(s)
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const byId = (id) => COMPONENTS.find((c) => c.id === id)

const ORIGIN_LABEL = {
  custom:  { tag: 'STANDALONE', badge: 'Standalone — Vuetify 불필요' },
  wrapped: { tag: 'VUETIFY',    badge: 'Vuetify 기반 — VDataTable 등을 감쌈' },
}
function originBadge(c) {
  const o = ORIGIN_LABEL[c.origin]
  const text = c.origin === 'wrapped'
    ? `Vuetify 기반 · <code style="font-family:var(--mono)">${c.vuetifyBase}</code>`
    : c.importFrom
      ? `Standalone · Vuetify 불필요 · <code style="font-family:var(--mono)">${c.importFrom}</code>`
      : 'Standalone · Vuetify 불필요'
  return `<span class="origin-badge ${c.origin}">${text}</span>`
}

/* ═══════════ 테마 ═══════════ */
function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  $('#theme-icon').innerHTML = ic(dark ? 'light' : 'dark', 'sm')
  localStorage.setItem('theme', dark ? 'dark' : 'light')
  document.querySelectorAll('.play-frame').forEach((f) =>
    f.contentWindow?.postMessage({ t: 'ds-theme' }, '*'))
}
// 상단 바 아이콘 주입
{
  const gh = $('#ghBtn')
  if (gh) gh.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/></svg>'
  const si = $('#searchIcon'); if (si) si.innerHTML = ic('search', 'sm')
  document.querySelectorAll('.nav-ext').forEach((e) => { e.innerHTML = ic('externalLink', 12) })
}

applyTheme(localStorage.getItem('theme') === 'dark')
$('#themeBtn').addEventListener('click', () =>
  applyTheme(document.documentElement.getAttribute('data-theme') !== 'dark'))

/* ═══════════ 라우터 ═══════════ */
function parseHash() {
  const raw = location.hash.slice(1) || '/docs/start'
  const [path, query] = raw.split('?')
  const parts = path.split('/').filter(Boolean)
  const params = new URLSearchParams(query || '')
  return { parts, tab: params.get('tab') || 'overview' }
}

function render() {
  const { parts, tab } = parseHash()
  const [section, id] = parts

  let navKey = 'components'
  if (section === 'docs') navKey = 'docs'
  else if (!section) navKey = 'docs'
  else if (section === 'foundation') navKey = 'foundation'
  else if (section === 'templates') navKey = 'templates'
  document.querySelectorAll('.topnav-links a').forEach((a) =>
    a.classList.toggle('on', a.dataset.nav === navKey))

  if (section === 'foundation') renderFoundation(id || 'overview')
  else if (section === 'patterns') { location.replace('#/templates'); return }
  else if (section === 'docs') renderDocsPage(id || 'start')
  else if (section === 'templates') renderTemplates()
  else if (id) renderComponent(id, tab)
  else renderCatalog()

  renderSidebar(section, id)
  enhance()
  document.body.classList.remove('drawer-open')
  window.scrollTo(0, 0)
}

/* ═══════════ 시인성 보강 — 렌더 후 공통 처리 ═══════════
   ① 표를 가로 스크롤 래퍼에 넣습니다 (좁은 화면에서 표가 터지지 않게)
   ② h2가 3개 이상인 페이지에 "이 페이지" 목차 레일을 답니다 (≥1280px)     */
function enhance() {
  const content = $('#content')

  // 토큰 견본 — 클릭하면 이름 복사
  content.querySelectorAll('[data-tok]').forEach((b) => {
    b.addEventListener('click', () => {
      navigator.clipboard.writeText(b.dataset.tok).then(() => {
        b.classList.add('copied')
        setTimeout(() => b.classList.remove('copied'), 1200)
      })
    })
  })

  // 표 가로 스크롤
  content.querySelectorAll('table').forEach((t) => {
    if (t.closest('.table-scroll, .thumb, .demo, .table-wrap')) return
    const w = document.createElement('div')
    w.className = 'table-scroll'
    t.parentNode.insertBefore(w, t)
    w.appendChild(t)
  })

  // 목차
  const hs = [...content.querySelectorAll('h2')]
    .filter((h) => !h.closest('.cat-head, .demo, .thumb, .state-box'))
  const main = document.createElement('div')
  main.className = 'page-main'
  while (content.firstChild) main.appendChild(content.firstChild)
  content.appendChild(main)

  if (hs.length >= 3) {
    hs.forEach((h, i) => { if (!h.id) h.id = 'sec-' + i })
    const toc = document.createElement('aside')
    toc.className = 'toc'
    toc.innerHTML = hs.map((h) => `<a href="#${h.id}" data-toc="${h.id}">${h.textContent}</a>`).join('')
    content.appendChild(toc)

    // 해시 라우터와 충돌하지 않게 — 목차 링크는 scrollIntoView로 처리
    toc.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault()
        document.getElementById(a.dataset.toc)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    })

    const links = toc.querySelectorAll('a')
    const obs = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((l) => l.classList.toggle('on', l.dataset.toc === e.target.id))
        }
      })
    }, { rootMargin: '-10% 0px -80% 0px' })
    hs.forEach((h) => obs.observe(h))
  }
}

/* ═══════════ 모바일 드로어 ═══════════ */
$('#menuBtn')?.addEventListener('click', () => document.body.classList.toggle('drawer-open'))
$('#scrim')?.addEventListener('click', () => document.body.classList.remove('drawer-open'))
window.addEventListener('hashchange', render)

/* ═══════════ LNB — 섹션 내비게이션 ═══════════ */
const DOCS_LINKS = [
  ['start', '시작하기'], ['install', '설치 · 사용법'], ['vuetify', 'Vuetify와의 관계'],
  ['coverage', 'Vuetify 커버리지'], ['principles', '디자인 원칙'],
]

/* 섹션 머리표 — 지금 어느 섹션에 있는지 LNB 최상단에 고정합니다 */
const LNB_HEAD = {
  docs:       ['Docs', '문서', '설치부터 Vuetify 연동까지'],
  foundation: ['Foundation', '파운데이션', '컴포넌트 이전의 결정들'],
  components: ['Components', '컴포넌트', `${COMPONENTS.length}종 · Standalone ${COMPONENTS.filter((c) => c.origin === 'custom').length} · Vuetify ${COMPONENTS.filter((c) => c.origin === 'wrapped').length}`],
  templates:  ['Templates', '템플릿', '페이지 템플릿과 라이브 예제'],
}

function renderSidebar(section, activeId) {
  const sec = LNB_HEAD[section] ? section : 'docs'
  const [en, ko, sub] = LNB_HEAD[sec]

  let body = ''

  if (sec === 'docs') {
    body = DOCS_LINKS.map(([id, label]) =>
      `<a href="#/docs/${id}" class="${activeId === id ? 'on' : ''}">${label}</a>`).join('')
  }

  else if (sec === 'foundation') {
    body = FOUNDATION_PAGES.map(([id, k, e]) =>
      `<a href="#/foundation/${id}" class="${activeId === id ? 'on' : ''}">${k}<span class="nav-en">${e}</span></a>`).join('')
  }

  else if (sec === 'components') {
    body = `<a href="#/components" class="${!activeId ? 'on' : ''}">전체 보기</a>`
    for (const cat of CATEGORIES) {
      const items = COMPONENTS.filter((c) => c.category === cat.id)
      if (!items.length) continue
      body += `<div class="nav-title">${cat.name} · ${cat.ko}</div>` + items.map((c) => {
        const tag = c.origin === 'wrapped' ? '<span class="vtag">V</span>' : ''
        return `<a href="#/components/${c.id}" class="${activeId === c.id ? 'on' : ''}">${c.name}${tag}</a>`
      }).join('')
    }
  }

  else if (sec === 'templates') {
    body = `<a href="#/templates" class="on">전체 보기</a>` +
      `<div class="nav-title">라이브</div>` +
      `<a href="live/" target="_blank" rel="noopener">컴포넌트 갤러리<span class="nav-en">↗</span></a>` +
      `<a href="live/#audit" target="_blank" rel="noopener">감사 로그<span class="nav-en">↗</span></a>` +
      `<div class="nav-title">HTML 시안</div>` +
      TEMPLATES.map((t) => `<a href="${t.file}" target="_blank" rel="noopener">${t.ko}<span class="nav-en">↗</span></a>`).join('')
  }

  $('#sidebar').innerHTML = `
    <div class="lnb-head">
      <div class="lnb-eyebrow">${en}</div>
      <b class="lnb-title">${ko}</b>
      <div class="lnb-sub">${sub}</div>
    </div>
    <div class="sidebar-body">${body}</div>`
}

/* 빵부스러기 — 본문 상단에서 위치를 한 번 더 알립니다 */
function crumb(...parts) {
  if (parts.length < 3) return ''   // 3뎁스 미만에서는 경로가 정보를 더하지 않습니다
  return `<div class="crumb">` + parts.map((p, i) =>
    (i ? `<span class="sep">/</span>` : '') +
    (p.href ? `<a href="${p.href}">${p.label}</a>` : `<span>${p.label}</span>`)).join('') + `</div>`
}

/* ═══════════ 카탈로그 ═══════════ */

/* 썸네일 안의 링크를 span으로 바꿉니다.
   카드 전체가 이미 <a>인데 그 안에 또 <a>가 들어가면 HTML 규칙상 중첩이 안 돼서,
   브라우저가 카드 링크를 그 자리에서 끊어버립니다 — 카드 절반이 클릭이 안 되고
   데모를 누르면 빈 "#"으로 튀어 홈으로 돌아갑니다. 클래스는 그대로 두어 모양은 유지합니다. */
const unlinkDemo = (html) => String(html)
  .replace(/<a\b([^>]*)>/gi, (_, attrs) => `<span${attrs.replace(/\s*href="[^"]*"/gi, '')}>`)
  .replace(/<\/a>/gi, '</span>')

function catCard(c) {
  return `
    <a class="cat-card" href="#/components/${c.id}">
      <div class="thumb" inert><div class="thumb-inner">${unlinkDemo(c.demo)}</div></div>
      <div class="cat-body">
        <div class="cc-top">
          <h3>${c.name}</h3><span class="cc-ko">${c.ko}</span>
          <span class="mini-badge ${c.origin}">${c.origin === 'wrapped' ? 'VUETIFY' : 'BASE'}</span>
        </div>
        <p>${c.summary}</p>
      </div>
    </a>`
}

function renderCatalog() {
  const total = COMPONENTS.length
  const wrapped = COMPONENTS.filter((c) => c.origin === 'wrapped').length
  let html = crumb({ label: 'Components' }) + `
    <div class="page-head"><h1>Components</h1><span class="page-ko">컴포넌트</span></div>
    <p class="page-lead">
      ${total}종 — Standalone ${total - wrapped} · Vuetify 기반 ${wrapped}.
      Standalone은 Vuetify 없이 돕니다.
    </p>`

  for (const cat of CATEGORIES) {
    const items = COMPONENTS.filter((c) => c.category === cat.id)
    if (!items.length) continue
    html += `<div class="cat-group">
      <div class="cat-head"><h2>${cat.name}</h2><span>${cat.ko} · ${items.length}종</span></div>
      <div class="cat-grid">${items.map(catCard).join('')}</div>
    </div>`
  }
  $('#content').innerHTML = html
}

/* ═══════════ 컴포넌트 페이지 ═══════════ */
function renderComponent(id, tab) {
  const c = byId(id)
  if (!c) return renderCatalog()

  const tabs = [['overview', 'Overview'], ['properties', 'Properties'],
                ['guidelines', 'Guidelines'], ['a11y', 'Accessibility']]
  const tabsHtml = tabs.map(([t, label]) =>
    `<a href="#/components/${id}?tab=${t}" class="${tab === t ? 'on' : ''}">${label}</a>`).join('')

  let pane = ''
  if (tab === 'properties') pane = propsPane(c)
  else if (tab === 'a11y') pane = a11yPane(c)
  else if (tab === 'guidelines') pane = guidelinesPane(c)
  else pane = overviewPane(c)

  const cat = CATEGORIES.find((x) => x.id === c.category)
  $('#content').innerHTML =
    crumb({ label: 'Components', href: '#/components' }, { label: cat ? cat.ko : '' }, { label: c.name }) + `
    <div class="page-head">
      <h1>${c.name}</h1><span class="page-ko">${c.ko}</span>
      ${originBadge(c)}
      <button class="btn btn-secondary btn-sm ai-copy" id="aiCopy">${ic('ai', 'sm')} AI 프롬프트 복사</button>
    </div>
    <p class="page-lead">${c.summary}</p>
    <div class="tabs">${tabsHtml}</div>
    <div class="tabpane">${pane}</div>`

  // AI 프롬프트 — 이 페이지 전체를 프롬프트 하나로 (components/<id>.txt와 동일)
  $('#aiCopy')?.addEventListener('click', function () {
    const SITE = location.origin + location.pathname.replace(/index\.html$/, '').replace(/\/$/, '')
    navigator.clipboard.writeText(componentPrompt(c, { WHERE, VERSUS, A11Y, SITE })).then(() => {
      this.innerHTML = `${ic('confirm', 'sm')} 복사됨`
      setTimeout(() => { this.innerHTML = `${ic('ai', 'sm')} AI 프롬프트 복사` }, 1600)
    })
  })

  wireCodeTabs()
}

function overviewPane(c) {
  const imp = importPath(c)
  // 실제 Vue + Vuetify로 도는 데모 — 같은 오리진의 라이브 앱을 임베드합니다
  return `<div class="play-wrap">
      <iframe class="play-frame" src="live/#play/${c.id}" title="${c.name} 라이브 데모" loading="lazy"></iframe>
    </div>` + codeBlock(c) +
    `<div class="imp" style="margin:20px 0 0"><code>import { Ds${c.name.replace(/^Ds/, '')} } from '${imp}'</code></div>`
}

/* 플레이그라운드 높이 동기화 */
window.addEventListener('message', (e) => {
  if (e.data?.t !== 'ds-play-h') return
  document.querySelectorAll('.play-frame').forEach((f) => {
    if (f.contentWindow === e.source) f.style.height = e.data.h + 'px'
  })
})

function codeBlock(c, standalone) {
  const hasHtml = !!c.html
  const cls = standalone ? 'codewrap' : 'codewrap'
  return `
    <div class="${cls}">
      <div class="codetabs">
        <button data-code="vue" class="on">Vue</button>
        ${hasHtml ? `<button data-code="html">HTML</button>` : ''}
        <span class="spacer"></span>
        <button class="copy">Copy</button>
      </div>
      <div class="codebody">
        <pre data-pane="vue"><code>${esc(c.vue)}</code></pre>
        ${hasHtml ? `<pre data-pane="html" hidden><code>${esc(c.html)}</code></pre>` : ''}
      </div>
    </div>`
}

function propsPane(c) {
  const rows = (arr, cols) => arr.map((r) =>
    `<tr>${r.map((v, i) => `<td class="${cols[i]}">${esc(v)}</td>`).join('')}</tr>`).join('')

  let html = ''
  if (c.props?.length) {
    html += `<div class="tbl-title">Props</div>
      <table class="ptable">
        <thead><tr><th>이름</th><th>타입</th><th>기본값</th><th>설명</th></tr></thead>
        <tbody>${rows(c.props, ['pname', 'ptype', 'pdef', 'pdesc'])}</tbody>
      </table>`
  }
  if (c.events?.length) {
    html += `<div class="tbl-title">Events</div>
      <table class="ptable">
        <thead><tr><th>이름</th><th>페이로드</th><th>설명</th></tr></thead>
        <tbody>${rows(c.events, ['pname', 'ptype', 'pdesc'])}</tbody>
      </table>`
  }
  if (c.slots?.length) {
    html += `<div class="tbl-title">Slots</div>
      <table class="ptable">
        <thead><tr><th>이름</th><th>설명</th></tr></thead>
        <tbody>${rows(c.slots, ['pname', 'pdesc'])}</tbody>
      </table>`
  }
  if (!html) html = `<div class="callout">이 컴포넌트는 props가 없습니다.</div>`
  return html
}

function a11yPane(c) {
  const a = A11Y[c.id]
  const level = `<p class="a11y-std">WCAG 2.2 AA · <a href="#/foundation/a11y">전체 기준</a></p>`

  if (!a) {
    return level + `<div class="callout warn">
      이 컴포넌트의 접근성 문서가 아직 없습니다.
      <code>data.js</code>의 <code>A11Y</code>에 추가해주세요 —
      키보드 표, 컴포넌트가 해주는 것, 쓰는 사람이 해야 할 것.
    </div>`
  }

  const keys = a.keys?.length ? `
    <div class="tbl-title">키보드</div>
    <table class="ptable">
      <thead><tr><th style="width:220px">키</th><th>동작</th></tr></thead>
      <tbody>${a.keys.map(([k, v]) =>
        `<tr><td class="pname">${k.split(' · ').map((x) => `<kbd class="kbd">${x}</kbd>`).join(' 또는 ')}</td><td class="pdesc">${v}</td></tr>`).join('')}</tbody>
    </table>` : ''

  const split = `
    <div class="tbl-title">역할 분담</div>
    <div class="a11y-split">
      <div class="a11-col free">
        <span class="a11-tag">컴포넌트가 해줍니다</span>
        <ul>${(a.free.length ? a.free : ['—']).map((x) => `<li>${x}</li>`).join('')}</ul>
      </div>
      <div class="a11-col yours">
        <span class="a11-tag">직접 해야 합니다</span>
        <ul>${a.yours.map((x) => `<li>${x}</li>`).join('')}</ul>
      </div>
    </div>`

  return level + keys + split
}

function guidelinesPane(c) {
  const tagClass = (t) =>
    t === '해야 할 것' ? 'do' : t === '하지 말 것' ? 'dont' : t === '접근성' ? 'a11y' : 'note'
  const items = (c.guidelines || []).map(([tag, text]) =>
    `<div class="gl-item"><span class="gl-tag ${tagClass(tag)}">${tag}</span><span class="gl-text">${text}</span></div>`).join('')

  const vs = VERSUS[c.id] ? `
    <div class="vsbox">
      <div class="vs-head">비슷한 것과의 구분</div>
      ${VERSUS[c.id].map(([other, rule]) => {
        const t = COMPONENTS.find((x) => x.name === other)
        const link = t ? `<a href="#/components/${t.id}">${other}</a>` : `<b>${other}</b>`
        return `<div class="vs-row"><span class="vs-name">vs ${link}</span><span>${rule}</span></div>`
      }).join('')}
    </div>` : ''

  return vs + (items ? `<div class="tbl-title">사용 지침</div><div class="gl">${items}</div>` : '')
}

function wireCodeTabs() {
  document.querySelectorAll('.codewrap').forEach((wrap) => {
    wrap.querySelectorAll('[data-code]').forEach((btn) => {
      btn.addEventListener('click', () => {
        wrap.querySelectorAll('[data-code]').forEach((b) => b.classList.toggle('on', b === btn))
        wrap.querySelectorAll('[data-pane]').forEach((p) => { p.hidden = p.dataset.pane !== btn.dataset.code })
      })
    })
    const copy = wrap.querySelector('.copy')
    if (copy) copy.addEventListener('click', () => {
      const visible = [...wrap.querySelectorAll('[data-pane]')].find((p) => !p.hidden)
      navigator.clipboard.writeText(visible.innerText).then(() => {
        copy.textContent = 'Copied ✓'
        setTimeout(() => { copy.textContent = 'Copy' }, 1500)
      })
    })
  })
}

/* ═══════════ 템플릿 ═══════════ */
function renderTemplates() {
  $('#content').innerHTML = crumb({ label: 'Templates' }) + `
    <div class="page-head"><h1>Templates</h1><span class="page-ko">페이지 템플릿</span></div>
    <p class="page-lead">완성 화면. 새 화면은 여기서 복제해 시작합니다.</p>
    <div class="tpl-grid">
      <a class="tpl-card live" href="live/" target="_blank" rel="noopener">
        <h3>Live Gallery ${ic('externalLink', 'sm')}</h3>
        <p>실제 Vuetify 3.11.6 위에서 렌더된 컴포넌트 ${COMPONENTS.length}종 전부</p>
        <div class="covers"><span>왜 필요한가</span><span>어디에 쓰나</span><span>실제 동작</span><span>다크 모드</span></div>
        <div class="go">새 탭에서 열기 ${ic('forward','sm')}</div>
      </a>
      <a class="tpl-card live" href="live/#audit" target="_blank" rel="noopener">
        <h3>Audit Log ${ic('externalLink', 'sm')}</h3>
        <p>테이블 · 필터 · 다이얼로그 · 로딩/빈 상태가 동작하는 실제 화면</p>
        <div class="covers"><span>DataTable</span><span>Menu</span><span>Dialog</span><span>EmptyState</span></div>
        <div class="go">새 탭에서 열기 ${ic('forward','sm')}</div>
      </a>` +
    TEMPLATES.map((t) => `
      <a class="tpl-card" href="${t.file}">
        <h3>${t.name}</h3>
        <p>${t.desc}</p>
        <div class="covers">${t.covers.map((x) => `<span>${x}</span>`).join('')}</div>
        <div class="go">열어보기 ${ic('forward','sm')}</div>
      </a>`).join('') + `</div>`
}

/* ═══════════ Foundation ═══════════ */
function renderFoundation(id) {
  const fn = FD_RENDERERS[id] || FD_RENDERERS.overview
  const idx = FOUNDATION_PAGES.findIndex((p) => p[0] === id)
  const prev = idx > 0 ? FOUNDATION_PAGES[idx - 1] : null
  const next = idx >= 0 && idx < FOUNDATION_PAGES.length - 1 ? FOUNDATION_PAGES[idx + 1] : null

  const nav = (prev || next) ? `
    <div class="pagenav">
      ${prev ? `<a href="#/foundation/${prev[0]}"><span>${ic('back', 12)} 이전</span><b>${prev[1]}</b></a>` : '<span></span>'}
      ${next ? `<a class="nx" href="#/foundation/${next[0]}"><span>다음 ${ic('forward', 12)}</span><b>${next[1]}</b></a>` : '<span></span>'}
    </div>` : ''

  const page = FOUNDATION_PAGES[idx]
  $('#content').innerHTML =
    crumb({ label: 'Foundation', href: '#/foundation/overview' }, { label: page ? page[1] : '' }) +
    fn() + nav
  wireCodeTabs()
}

/* ═══════════ Docs 페이지 ═══════════ */
function renderDocsPage(id) {
  const pages = { start: pageStart, install: pageInstall, vuetify: pageVuetify,
                  coverage: pageCoverage, principles: pagePrinciples, tokens: pageTokens }
  $('#content').innerHTML = (pages[id] || pageStart)()
  wireCodeTabs()
}

function pageStart() {
  const total = COMPONENTS.length
  const wrapped = COMPONENTS.filter((c) => c.origin === 'wrapped').length
  const entry = (href, icon, title, desc) => `
    <a class="entry" href="${href}">
      <span class="en-ic">${ic(icon, 'lg')}</span>
      <h3>${title}</h3><p>${desc}</p>
    </a>`

  return `
    <div class="hero">
      <h1>Cogniterm Design System</h1>
      <p>AI 에이전트 제품을 위한 미니멀 디자인 시스템. Vue 3 · Vuetify 3.11.</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#/docs/install">${ic('forward', 'sm')} 설치하기</a>
        <a class="btn btn-secondary" href="#/components">컴포넌트 ${total}종 보기</a>
        <a class="btn btn-ghost" href="live/" target="_blank" rel="noopener">라이브 갤러리 ${ic('externalLink', 'sm')}</a>
      </div>
      <div class="hero-stats">
        <div class="hero-stat"><b>${total}</b><span>컴포넌트</span></div>
        <div class="hero-stat"><b>${FOUNDATION_PAGES.length}</b><span>Foundation</span></div>
        <div class="hero-stat"><b>${VUETIFY_COVERAGE.length}</b><span>Vuetify 커버리지</span></div>
        <div class="hero-stat"><b>2</b><span>외부 의존성</span></div>
      </div>
    </div>

    <div class="prose">
      <h2>어디서 시작하나</h2>
    </div>
    <div class="entry-grid">
      ${entry('#/docs/install', 'download', '설치 · 사용법', '파일 복사 → CSS 등록 → 끝. 개발자 기준 10분.')}
      ${entry('#/foundation/overview', 'settings', 'Foundation', '색 · 타이포 · 여백 · 밀도 — 컴포넌트 이전의 결정 ' + FOUNDATION_PAGES.length + '가지')}
      ${entry('#/components', 'gridView', 'Components', total + '종. props · 접근성 · 비슷한 것과의 구분')}
      ${entry('#/docs/vuetify', 'link', 'Vuetify와의 관계', '무엇이 Vuetify 기반이고 무엇이 아닌지')}
      ${entry('#/foundation/wordlist', 'chat', '용어집', '한국어 UI 문안 통일표')}
    </div>

    <div class="prose">
      <h2>AI에게 시킬 때</h2>
      <table>
        <thead><tr><th>파일</th><th>언제 쓰나</th></tr></thead>
        <tbody>
          <tr><td><a href="llms.txt" target="_blank"><code>/llms.txt</code></a></td><td>색인 — 항상 먼저</td></tr>
          <tr><td><a href="components/llms.txt" target="_blank"><code>/components/llms.txt</code></a></td><td>UI를 만들 때</td></tr>
          <tr><td><a href="patterns/llms.txt" target="_blank"><code>/patterns/llms.txt</code></a></td><td>화면 전체 · 에이전트 흐름</td></tr>
          <tr><td><a href="foundation/llms.txt" target="_blank"><code>/foundation/llms.txt</code></a></td><td>색 · 여백 · 타이포 · 토큰</td></tr>
          <tr><td><a href="vuetify/llms.txt" target="_blank"><code>/vuetify/llms.txt</code></a></td><td>설치와 연동</td></tr>
          <tr><td><a href="a11y/llms.txt" target="_blank"><code>/a11y/llms.txt</code></a></td><td>접근성 — 키보드 표</td></tr>
        </tbody>
      </table>
    </div>`
}

function pageInstall() {
  return `
    <div class="page-head"><h1>설치 · 사용법</h1></div>
    <p class="page-lead">파일 복사 방식 — 개발자 기준 10분.</p>
    <div class="prose">
      <h2>1. 파일 복사</h2>
      <p>
        프로젝트의 <b>소스 루트</b> 아래 <code>design/</code>에 넣습니다.
        Vite는 <code>src/</code>, Nuxt 3는 프로젝트 루트, Nuxt 4는 <code>app/</code>가 소스 루트입니다.
      </p>
      <pre><code># &lt;소스루트&gt; = src/ (Vite) · ./ (Nuxt 3) · app/ (Nuxt 4)
cp -r design-system/vue/          &lt;소스루트&gt;/design/
cp    design-system/ds.css        &lt;소스루트&gt;/design/
cp    design-system/ds-vuetify.css &lt;소스루트&gt;/design/   # Vuetify 기반을 쓸 때만

# vue 뒤의 슬래시가 중요합니다 — 빼면 design/vue/ 로 한 단계 더 들어갑니다.</code></pre>
      <p>
        이렇게 두면 어느 프레임워크든 <code>~/design</code> 하나로 부를 수 있습니다.
        Nuxt는 <code>~</code>가 소스 루트를 가리키므로 그대로 되고, Vite는 한 줄을 더합니다.
      </p>
      <pre><code>// ① vite.config.ts — 실행할 때 쓰는 별칭 (Nuxt는 필요 없습니다)
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  resolve: { alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) } },
})</code></pre>
      <pre><code>// ② tsconfig.app.json — 타입 검사·에디터가 쓰는 별칭
{ "compilerOptions": { "paths": { "~/*": ["./src/*"] } } }</code></pre>
      <div class="callout warn">
        <b>둘 다 넣어야 합니다.</b> Vite와 TypeScript는 서로의 설정을 읽지 않아서
        한쪽만 넣으면 <code>npm run build</code>가
        <code>Cannot find module '~/design'</code>으로 멈춥니다.
        <code>baseUrl</code>은 넣지 마세요 — TypeScript 6에서 막힙니다.
      </div>

      <h2>2. 폰트 · 아이콘 설치</h2>
      <pre><code>npm install pretendard lucide-vue-next</code></pre>
      <table>
        <thead><tr><th>패키지</th><th>용도</th><th>라이선스</th></tr></thead>
        <tbody>
          <tr><td><code>pretendard</code></td><td>본문 글꼴</td><td>SIL OFL 1.1</td></tr>
          <tr><td><code>lucide-vue-next</code></td><td>아이콘</td><td>ISC</td></tr>
        </tbody>
      </table>


      <h2>3. 스타일 등록</h2>
      <pre><code>// nuxt.config.ts
export default defineNuxtConfig({
  css: [
    // Pretendard — dynamic-subset은 필요한 글자만 내려받습니다
    'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css',
    '~/design/ds.css',
    '~/design/ds-vuetify.css',   // Vuetify 기반 컴포넌트를 쓸 때만
  ],
})</code></pre>
      <div class="callout warn"><b>폰트를 빠뜨리면 에러 없이 시스템 글꼴로 렌더됩니다.</b></div>

      <h2>4. Vuetify defaults · theme 연결</h2>
      <p>
        직접 쓰는 <code>&lt;v-menu&gt;</code>·<code>&lt;v-dialog&gt;</code>에도 우리 기본값이 적용되게 합니다.
        이 시스템의 컴포넌트를 안 쓰는 화면에서도 스타일이 유지되는 <b>강제 층</b>입니다.
      </p>
      <div class="callout warn">
        <b><code>createVuetify</code>는 컴포넌트를 등록하지 않습니다.</b>
        손으로 쓴 <code>&lt;v-btn&gt;</code>이 <code>Failed to resolve component</code>로 비어 나온다면
        <code>vite-plugin-vuetify</code>(<code>autoImport: true</code>)를 넣거나
        <code>createVuetify({ components, directives })</code>로 직접 등록해야 합니다.
        우리 <code>Ds*</code> 컴포넌트는 각자 필요한 것을 직접 import하므로 이 설정 없이도 돕니다.
      </div>
      <pre><code>import { createVuetify } from 'vuetify'
import { dsTheme } from '~/design/theme'
import { dsDefaults } from '~/design/defaults'
import { lucideIconSet } from '~/design/vuetify-icons'

import { ko } from 'vuetify/locale'

createVuetify({
  theme: dsTheme,
  defaults: dsDefaults,
  icons: lucideIconSet,   // 내부 아이콘도 Lucide로 — @mdi/font 불필요
  locale: { locale: 'ko', messages: { ko } },   // VDataTable 등 내장 문구 한국어
})</code></pre>
      <div class="callout warn"><b><code>icons</code>를 빠뜨리면 체크박스·화살표 등 내부 아이콘이 전부 빈 글자로 나옵니다.</b></div>

      <h2>5. 사용</h2>
      <pre><code>&lt;script setup&gt;
// Vuetify 불필요한 컴포넌트
import { DsButton, DsChatMessage, DsToolCallStep } from '~/design'

// Vuetify 기반 컴포넌트 — 배럴이 다릅니다
import { DsDataTable, DsDialog } from '~/design/vuetify'

// 아이콘 — Lucide가 필요해 배럴이 또 다릅니다
import { DsIcon } from '~/design/icon'
&lt;/script&gt;

&lt;template&gt;
  &lt;DsChatMessage role="agent" name="Agent" :streaming="true"&gt;
    응답 텍스트
    &lt;template #tools&gt;
      &lt;DsToolCallStep status="done"&gt;search_drive("계약서")&lt;/DsToolCallStep&gt;
    &lt;/template&gt;
  &lt;/DsChatMessage&gt;

  &lt;DsButton variant="primary" @click="run"&gt;New agent&lt;/DsButton&gt;
&lt;/template&gt;</code></pre>

      <h2>다크 모드</h2>
      <p>
        <b>두 곳을 함께 전환해야 합니다.</b> <code>data-theme</code>는 우리 CSS 변수만 바꾸고,
        Vuetify가 자기 테마로 칠하는 부분(데이터 테이블 하단, 알림 색 등)은 그대로 남습니다.
      </p>
      <pre><code>import { useTheme } from 'vuetify'
const theme = useTheme()

function setDark(dark: boolean) {
  theme.change(dark ? 'dsDark' : 'dsLight')                                  // Vuetify 쪽
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')  // 우리 쪽
}</code></pre>

      <h2>기존 화면</h2>
      <p>바뀌지 않습니다. <code>src/design/</code> 밖은 건드리지 않습니다.</p>
    </div>`
}

function pageVuetify() {
  const custom = COMPONENTS.filter((c) => c.origin === 'custom')
  const wrapped = COMPONENTS.filter((c) => c.origin === 'wrapped')
  const row = (c) => `<tr>
    <td class="pname">${c.name}</td>
    <td class="ptype">${c.vuetifyBase || '—'}</td>
    <td class="pdesc">${c.reason.ko}</td></tr>`

  return `
    <div class="page-head"><h1>Vuetify와의 관계</h1></div>
    <p class="page-lead">
      무엇이 Vuetify 기반이고 무엇이 아닌지, 그리고 왜 그렇게 나눴는지.
    </p>
    <div class="prose">
      <h2>"Vuetify 없이 동작한다"의 뜻</h2>
      <p>"필요로 하지 않는다"는 뜻입니다. Vuetify 앱 안에서도 그대로 동작합니다.</p>
      <table>
        <thead><tr><th></th><th>Standalone 컴포넌트</th><th>Vuetify 기반 컴포넌트</th></tr></thead>
        <tbody>
          <tr><td><b>Vuetify 앱에서</b></td><td>정상 동작 ✓</td><td>정상 동작 ✓</td></tr>
          <tr><td><b>Vuetify 없는 앱에서</b></td><td>정상 동작 ✓</td><td>동작하지 않음</td></tr>
          <tr><td><b>Vuetify 버전 올릴 때</b></td><td>영향 없음</td><td>확인 필요</td></tr>
        </tbody>
      </table>
      <h2>검증</h2>
      <p><code>examples/vuetify-app</code> — Vuetify 3.11.6 실제 앱에서 전 컴포넌트 렌더 확인.</p>
      <table>
        <thead><tr><th>검증 항목</th><th>결과</th></tr></thead>
        <tbody>
          <tr><td><code>vite build</code> · <code>vue-tsc --noEmit</code></td><td>통과 · 에러 0</td></tr>
          <tr><td>Vuetify 원본(<code>VBtn</code>·<code>VChip</code>)과 나란히 배치</td><td>상호 침범 없음</td></tr>
          <tr><td><code>VCard</code> 안에 우리 컴포넌트 중첩</td><td>스타일 유지됨</td></tr>
          <tr><td>Standalone ${COMPONENTS.filter((c) => c.origin === 'custom').length}종 중 <code>vuetify</code> import</td><td>0개</td></tr>
          <tr><td><code>ds.css</code>의 <code>!important</code></td><td>0개</td></tr>
          <tr><td><code>ds.css</code>가 정의하는 <code>.v-*</code> 클래스</td><td>0개</td></tr>
        </tbody>
      </table>

      <h2>두 종류로 나눈 기준</h2>
      <p>
        기준은 딱 하나입니다 — <b>"동작이 어려운가, 시각이 전부인가."</b>
        포커스 트랩·포지셔닝·스크롤 락·키보드 네비게이션처럼 직접 만들면 버그가 나는 것은 Vuetify에 맡기고,
        생김새가 전부인 것은 직접 만듭니다.
      </p>

      <h2 style="margin-top:36px">① Standalone — Vuetify 불필요 (${custom.length}종)</h2>
      <p>
        <code>ds.css</code>만 있으면 동작합니다. Vuetify가 없는 프로젝트에도 그대로 쓸 수 있습니다.
        시각이 전부인 컴포넌트와, Vuetify에 아예 없는 에이전트 전용 컴포넌트가 여기 속합니다.
      </p>
      <table class="ptable">
        <thead><tr><th>컴포넌트</th><th>Vuetify 대응</th><th>직접 만든 이유</th></tr></thead>
        <tbody>${custom.map(row).join('')}</tbody>
      </table>

      <h2 style="margin-top:36px">② Vuetify 기반 — Vuetify 필요 (${wrapped.length}종)</h2>
      <p>
        Vuetify 컴포넌트를 <code>import</code>해서 감싼 것입니다.
        동작은 Vuetify가, 생김새는 우리가 담당합니다.
        <code>ds-vuetify.css</code>와 함께 써야 하고, <code>~/design/vuetify</code>에서 import 합니다.
      </p>
      <table class="ptable">
        <thead><tr><th>컴포넌트</th><th>기반</th><th>Vuetify를 유지한 이유</th></tr></thead>
        <tbody>${wrapped.map(row).join('')}</tbody>
      </table>

      <h2 style="margin-top:36px">충돌하지 않는 이유</h2>
      <p>Vuetify 3에는 CSS 캐스케이드 레이어가 없어 특이도 싸움이 날 수 있습니다. 세 가지 규칙으로 회피합니다.</p>
      <ol>
        <li><b>버튼·입력 등 조작 요소에 <code>all: unset</code></b> — Vuetify와 브라우저 기본 스타일의 영향을 끊습니다.</li>
        <li><b><code>.v-*</code>를 정의하지 않습니다</b> — <code>ds.css</code>에 Vuetify 클래스 정의가 0개라 Vuetify 쪽을 덮어쓰지 않습니다. Vuetify 조정은 <code>ds-vuetify.css</code>에만 있습니다.</li>
        <li><b><code>!important</code>는 Vuetify 기반 컴포넌트에서만</b> — Standalone 컴포넌트에 <code>!important</code>가 필요해지면 구조가 잘못됐다는 신호입니다.</li>
      </ol>
      <div class="callout warn">
        <b>알려진 한계 — 도입 전에 한 번 확인하세요.</b>
        <code>ds.css</code>의 클래스 이름 상당수가 <code>ds-</code> 없이 짧습니다
        (<code>.btn</code> <code>.card</code> <code>.input</code> <code>.chip</code> <code>.badge</code> 등).
        Vuetify와는 겹치지 않지만, <b>기존 앱에 같은 이름이 있으면 서로 영향을 줍니다.</b>
        넣기 전에 앱에서 같은 이름을 쓰는지 확인하세요.
      </div>
      <pre><code>grep -rEo 'class="[^"]*\b(btn|card|input|field|chip|badge|check|hint|empty|chat|msg|toast|spinner|skeleton|divider)\b' src/ | sort -u</code></pre>
      <p>하나라도 나오면 그 화면부터 확인합니다. <code>ds-</code> 접두로 전면 개명하는 것이 근본 해결입니다.</p>

      <h2>Vuetify 4로 가야 하나</h2>
      <p>
        가지 않습니다. v4의 주된 이점인 CSS 레이어는 <b>Vuetify 컴포넌트를 덮어쓸 때</b> 도움이 되는데,
        우리는 시각 컴포넌트를 직접 만들기로 했습니다. 직접 만든 버튼은 Vuetify와 부딪힐 상대가 없습니다.
        마이그레이션 비용은 3~5주인데 우리 계획의 버전 의존도는 약 20%입니다.
      </p>
    </div>`
}

function pageCoverage() {
  const STATUS = {
    wrapped:    ['Ds 컴포넌트', 'wrapped', 'Ds*로 감싸서 제공합니다. 슬롯·props가 그대로 전달됩니다.'],
    themed:     ['defaults + CSS', 'themed', 'defaults.ts가 기본값을 고정하고 ds-vuetify.css가 시각을 맞춥니다. 그냥 <v-alert>를 써도 우리 스타일이 나옵니다.'],
    css:        ['CSS만', 'css', '내부 프리미티브라 직접 쓸 일이 드뭅니다. CSS로 시각만 맞춥니다.'],
    structural: ['스타일 불필요', 'structural', '시각 표면이 없는 레이아웃·프로바이더입니다.'],
  }
  const count = (s) => VUETIFY_COVERAGE.filter((r) => r[1] === s).length
  const total = VUETIFY_COVERAGE.length

  const section = (s) => {
    const rows = VUETIFY_COVERAGE.filter((r) => r[1] === s)
    const [label, cls, desc] = STATUS[s]
    return `
      <h2 style="margin-top:36px">${label} <span style="font-size:13px;font-weight:500;color:var(--gray-9)">${rows.length}종</span></h2>
      <p>${desc}</p>
      <table class="ptable">
        <thead><tr><th>Vuetify</th>${s === 'wrapped' ? '<th>제공 이름</th>' : ''}<th>적용 내용</th></tr></thead>
        <tbody>${rows.map((r) => `<tr>
          <td class="pname">${r[0]}</td>
          ${s === 'wrapped' ? `<td class="ptype">${r[2]}</td>` : ''}
          <td class="pdesc">${r[3]}</td></tr>`).join('')}</tbody>
      </table>`
  }

  return `
    <div class="page-head"><h1>Vuetify 커버리지</h1></div>
    <p class="page-lead">
      Vuetify 3.11이 제공하는 컴포넌트 <b>${total}종 전부</b>가 이 디자인 시스템의 스타일을 받습니다.
      우리가 감싼 것은 5종뿐이지만, 나머지도 <code>theme.ts</code>와 <code>defaults.ts</code>를 통해
      자동으로 우리 색·모서리·밀도로 렌더됩니다.
    </p>
    <div class="prose">
      <div class="callout">
        <b>핵심 — 96종을 전부 감쌀 필요가 없습니다.</b><br>
        Vuetify의 모든 컴포넌트는 <b>테마 색</b>과 <b>defaults</b>를 참조합니다.
        <code>theme.ts</code>에 우리 토큰을 한 번 주입하면
        <code>&lt;v-alert&gt;</code>·<code>&lt;v-stepper&gt;</code>·<code>&lt;v-timeline&gt;</code>처럼
        우리가 만지지 않은 컴포넌트도 같은 파랑, 같은 회색, 같은 모서리로 나옵니다.
        감싸는 것은 <b>동작을 우리 API로 단순화할 필요가 있을 때만</b> 합니다.
      </div>

      <table>
        <thead><tr><th>분류</th><th>개수</th><th>개발자가 쓰는 법</th></tr></thead>
        <tbody>
          <tr><td><b>Ds 컴포넌트</b></td><td>${count('wrapped')}</td><td><code>import { DsDataTable } from '~/design/vuetify'</code></td></tr>
          <tr><td><b>defaults + CSS</b></td><td>${count('themed')}</td><td><code>&lt;v-alert&gt;</code> 그대로 — 설정 불필요</td></tr>
          <tr><td><b>CSS만</b></td><td>${count('css')}</td><td>내부 프리미티브 — 직접 쓸 일 드묾</td></tr>
          <tr><td><b>스타일 불필요</b></td><td>${count('structural')}</td><td>레이아웃·프로바이더</td></tr>
        </tbody>
      </table>

      <h2>연결 방법</h2>
      <p>이 한 번의 설정이 ${total}종 전부에 적용됩니다.</p>
      <pre><code>import { createVuetify } from 'vuetify'
import { dsTheme } from '~/design/theme'       // 색 — 96종 전부에 적용
import { dsDefaults } from '~/design/defaults' // 기본값 — 77종에 지정

createVuetify({
  theme: dsTheme,
  defaults: dsDefaults,
})</code></pre>
      <p>
        <code>ds-vuetify.css</code>도 함께 로드해야 테마가 제어하지 못하는
        폰트·모서리·보더 두께까지 맞춰집니다.
      </p>
    </div>
    <div class="prose">
      ${section('wrapped')}
      ${section('themed')}
      ${section('css')}
      ${section('structural')}
    </div>`
}

function pagePrinciples() {
  const P = [
    ['정적인 UI가 아니라 진행 중인 작업을 보여준다',
     '에이전트는 10~30초씩 걸립니다. 빈 스피너는 "느린 제품", 진행 중인 추론과 도구 실행이 보이면 "일하는 제품"이 됩니다. 모든 비동기 컴포넌트는 로딩 상태가 아니라 진행 상태를 가집니다.',
     'ThinkingIndicator · ToolCallStep · StreamingText'],
    ['실패는 예외가 아니라 기본 상태 중 하나다',
     '모든 컴포넌트는 error 상태를 필수로 갖습니다. 에러는 사과하지 않고, 무엇이 일어났고 무엇을 할 수 있는지 말합니다.',
     'Input · Toast · ToolCallStep'],
    ['밀도는 선택이지 기본값이 아니다',
     '같은 시스템으로 챗(여유롭게)과 드라이브 목록(조밀하게)을 다 만듭니다. 밀도는 토큰으로 제어하고 컴포넌트에 하드코딩하지 않습니다.',
     'DataTable density · FileRow'],
    ['근거를 숨기지 않는다',
     '접어둘 수는 있어도 없애지 않습니다. 툴콜과 인용은 항상 열어볼 수 있습니다.',
     'CitationChip · ToolCallStep'],
    ['미니멀은 적게 보여주는 게 아니라 위계가 분명한 것이다',
     '장식은 없앱니다. 위계는 여백과 타입 웨이트로 만들고 색은 마지막에 씁니다.',
     '전 컴포넌트'],
    ['조용한 기본값, 명확한 강조',
     '브랜드 컬러는 액션과 상태에만. 배경과 보더는 중립으로 둡니다.',
     'Button · Badge · Chip'],
  ]
  return `
    <div class="page-head"><h1>디자인 원칙</h1></div>
    <p class="page-lead">
      원칙이 없으면 컴포넌트는 취향의 모음이 됩니다.
      새 컴포넌트를 만들 때 이 여섯 개로 판단합니다.
    </p>
    <div class="prose">` +
    P.map(([t, d, c], i) => `
      <h2 style="margin-top:${i === 0 ? 28 : 36}px">${i + 1}. ${t}</h2>
      <p>${d}</p>
      <p style="font-size:12.5px;color:var(--gray-9)">적용: ${c}</p>`).join('') +
    `</div>`
}

function pageTokens() {
  const sw = (n) => `<div class="swatch" style="background:var(--gray-${n})"><span>${n}</span></div>`
  return `
    <div class="page-head"><h1>Tokens</h1><span class="page-ko">토큰</span></div>
    <p class="page-lead">
      모든 색·간격·모서리 값의 단일 원본입니다.
      컴포넌트는 반드시 CSS 변수로만 참조하고 값을 하드코딩하지 않습니다.
    </p>
    <div class="prose">
      <h2>Brand</h2>
      <div class="brand-row" style="margin-bottom:20px">
        <div class="brand-chip" style="background:var(--brand);color:var(--on-brand)">base</div>
        <div class="brand-chip" style="background:var(--brand-hover);color:var(--on-brand)">hover</div>
        <div class="brand-chip" style="background:var(--brand-active);color:var(--on-brand)">active</div>
        <div class="brand-chip" style="background:var(--brand-subtle);color:var(--brand)">subtle</div>
      </div>
      <p>
        라이트 <code>#1B72D9</code> / 다크 <code>#4593F5</code>.
        어두운 배경에서는 원색이 가라앉아 보여 한 톤 밝은 변형을 씁니다.
        글자·링크에는 한 단계 더 어두운 <code>--brand-text</code>(<code>#0F62C4</code>)를 씁니다 —
        원색을 흰 배경 위 글자로 쓰면 대비가 AA에 못 미칩니다.
        테마 전환 시 자동으로 바뀌므로 컴포넌트는 <code>var(--brand)</code> 하나만 참조하면 됩니다.
      </p>

      <h2>Gray — Radix Slate 1–12</h2>
      <div class="swatch-wrap"><div class="swatches">${[1,2,3,4,5,6,7,8,9,10,11,12].map(sw).join('')}</div></div>
      <table>
        <thead><tr><th>단계</th><th>역할</th></tr></thead>
        <tbody>
          <tr><td><code>1–2</code></td><td>페이지·패널 배경</td></tr>
          <tr><td><code>3–5</code></td><td>호버 배경, 비활성 요소</td></tr>
          <tr><td><code>6–8</code></td><td>보더 (기본 6, 호버 8)</td></tr>
          <tr><td><code>9–11</code></td><td>보조 텍스트 (약함 9, 기본 11)</td></tr>
          <tr><td><code>12</code></td><td>본문 텍스트, 제목</td></tr>
        </tbody>
      </table>
      <p>
        회색 스케일은 뿌리라 유일하게 되돌리기가 비쌉니다.
        직접 만들지 않고 검증된 Radix Slate를 씁니다 — 브랜드 블루와 온도가 맞는 차가운 회색이고,
        라이트/다크 쌍이 이미 대비 검증돼 있습니다.
      </p>

      <h2>Shape · Type</h2>
      <table>
        <thead><tr><th>토큰</th><th>값</th><th>용도</th></tr></thead>
        <tbody>
          <tr><td><code>--r-sm</code></td><td>2px</td><td>작은 표식</td></tr>
          <tr><td><code>--r-md</code></td><td>4px</td><td>메뉴 항목, 툴콜</td></tr>
          <tr><td><code>--r-lg</code></td><td>6px</td><td>버튼, 인풋, 카드</td></tr>
          <tr><td><code>--r-full</code></td><td>9999px</td><td>배지, 칩, 아바타</td></tr>
          <tr><td><code>--font</code></td><td>Pretendard</td><td>본문 전체</td></tr>
          <tr><td><code>--mono</code></td><td>SF Mono 계열</td><td>코드, 툴콜, 메타 정보</td></tr>
        </tbody>
      </table>

      <h2>사용 규칙</h2>
      <ul>
        <li>컴포넌트는 <code>var(--gray-3)</code> 형태로만 참조합니다. hex를 직접 쓰지 않습니다.</li>
        <li>한 방향만 흐릅니다: <code>ds.css</code> → CSS 변수 → 컴포넌트.</li>
        <li>브랜드 컬러는 액션·선택·포커스·링크에만. 배경과 보더는 중립으로 둡니다.</li>
      </ul>
    </div>`
}

/* ═══════════ 검색 ═══════════ */
$('#search').addEventListener('input', (e) => {
  const q = e.target.value.trim().toLowerCase()
  if (!q) { render(); return }
  const hits = COMPONENTS.filter((c) =>
    c.name.toLowerCase().includes(q) || c.ko.includes(q) || c.summary.toLowerCase().includes(q))
  $('#content').innerHTML = `
    <div class="page-head"><h1>Search</h1></div>
    <p class="page-lead">"${esc(e.target.value)}" — ${hits.length}개</p>
    <div class="cat-grid" style="margin-top:24px">` +
    (hits.length ? hits.map((c) => `
      <a class="cat-card" href="#/components/${c.id}">
        <div class="cc-top"><h3>${c.name}</h3><span class="cc-ko">${c.ko}</span>
          <span class="mini-badge ${c.origin}">${c.origin === 'wrapped' ? 'VUETIFY' : 'STANDALONE'}</span></div>
        <p>${c.summary}</p></a>`).join('')
      : `<div class="callout">일치하는 컴포넌트가 없습니다.</div>`) + `</div>`
})

render()
