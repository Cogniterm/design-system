import { CATEGORIES, COMPONENTS, TEMPLATES, VUETIFY_COVERAGE, WHERE } from './data.js'

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
    : 'Standalone · Vuetify 불필요'
  return `<span class="origin-badge ${c.origin}">${text}</span>`
}

/* ═══════════ 테마 ═══════════ */
function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  $('#theme-icon').textContent = dark ? '☀' : '☾'
  localStorage.setItem('theme', dark ? 'dark' : 'light')
}
applyTheme(localStorage.getItem('theme') === 'dark')
$('#themeBtn').addEventListener('click', () =>
  applyTheme(document.documentElement.getAttribute('data-theme') !== 'dark'))

/* ═══════════ 라우터 ═══════════ */
function parseHash() {
  const raw = location.hash.slice(1) || '/components'
  const [path, query] = raw.split('?')
  const parts = path.split('/').filter(Boolean)
  const params = new URLSearchParams(query || '')
  return { parts, tab: params.get('tab') || 'overview' }
}

function render() {
  const { parts, tab } = parseHash()
  const [section, id] = parts

  let navKey = 'components'
  if (section === 'docs') navKey = id === 'tokens' ? 'tokens' : 'docs'
  else if (section === 'templates') navKey = 'templates'
  document.querySelectorAll('.topnav-links a').forEach((a) =>
    a.classList.toggle('on', a.dataset.nav === navKey))

  if (section === 'docs') renderDocsPage(id || 'start')
  else if (section === 'templates') renderTemplates()
  else if (id) renderComponent(id, tab)
  else renderCatalog()

  renderSidebar(section, id)
  window.scrollTo(0, 0)
}
window.addEventListener('hashchange', render)

/* ═══════════ 사이드바 ═══════════ */
function renderSidebar(section, activeId) {
  const docsLinks = [
    ['start', '시작하기'], ['install', '설치 · 사용법'], ['vuetify', 'Vuetify와의 관계'],
    ['coverage', 'Vuetify 커버리지'], ['principles', '디자인 원칙'], ['tokens', '토큰'],
  ]
  let html = `<div class="nav-title">Docs</div>` +
    docsLinks.map(([id, ko]) =>
      `<a href="#/docs/${id}" class="${section === 'docs' && activeId === id ? 'on' : ''}">${ko}</a>`).join('')

  for (const cat of CATEGORIES) {
    const items = COMPONENTS.filter((c) => c.category === cat.id)
    if (!items.length) continue
    html += `<div class="nav-title">${cat.name}</div>`
    html += items.map((c) => {
      const on = section === 'components' && activeId === c.id ? 'on' : ''
      const tag = c.origin === 'wrapped' ? `<span class="vtag">V</span>` : ''
      return `<a href="#/components/${c.id}" class="${on}">${c.name}${tag}</a>`
    }).join('')
  }

  html += `<div class="nav-title">Templates</div>` +
    TEMPLATES.map((t) => `<a href="#/templates">${t.name}</a>`).join('')

  $('#sidebar').innerHTML = html
}

/* ═══════════ 카탈로그 ═══════════ */
function renderCatalog() {
  const total = COMPONENTS.length
  const wrapped = COMPONENTS.filter((c) => c.origin === 'wrapped').length
  let html = `
    <div class="page-head"><h1>Components</h1></div>
    <p class="page-lead">
      컴포넌트 ${total}종. 이 중 <b>${total - wrapped}종은 Vuetify 없이 단독으로</b> 동작하고,
      <b>${wrapped}종은 Vuetify 컴포넌트를 감싼 것</b>입니다.
      사이드바의 <span class="vtag" style="display:inline-block;background:var(--gray-4);color:var(--gray-10);font-size:9px;padding:1px 4px;border-radius:3px;font-weight:600">V</span>
      표시가 Vuetify가 필요한 컴포넌트입니다.
    </p>`

  for (const cat of CATEGORIES) {
    const items = COMPONENTS.filter((c) => c.category === cat.id)
    if (!items.length) continue
    html += `<div class="cat-group">
      <div class="cat-head"><h2>${cat.name}</h2><span>${cat.ko} · ${items.length}</span></div>
      <div class="cat-grid">` +
      items.map((c) => `
        <a class="cat-card" href="#/components/${c.id}">
          <div class="cc-top">
            <h3>${c.name}</h3><span class="cc-ko">${c.ko}</span>
            <span class="mini-badge ${c.origin}">${c.origin === 'wrapped' ? 'VUETIFY' : 'STANDALONE'}</span>
          </div>
          <p>${c.summary}</p>
        </a>`).join('') +
      `</div></div>`
  }
  $('#content').innerHTML = html
}

/* ═══════════ 컴포넌트 페이지 ═══════════ */
function renderComponent(id, tab) {
  const c = byId(id)
  if (!c) return renderCatalog()

  const tabs = [['overview', 'Overview'], ['properties', 'Properties'], ['guidelines', 'Guidelines'], ['code', 'Code']]
  const tabsHtml = tabs.map(([t, label]) =>
    `<a href="#/components/${id}?tab=${t}" class="${tab === t ? 'on' : ''}">${label}</a>`).join('')

  let pane = ''
  if (tab === 'properties') pane = propsPane(c)
  else if (tab === 'guidelines') pane = guidelinesPane(c)
  else if (tab === 'code') pane = codePane(c, true)
  else pane = overviewPane(c)

  $('#content').innerHTML = `
    <div class="page-head">
      <h1>${c.name}</h1><span class="page-ko">${c.ko}</span>
      ${originBadge(c)}
    </div>
    <p class="page-lead">${c.summary}</p>
    <div class="tabs">${tabsHtml}</div>
    <div class="tabpane">${pane}</div>`

  wireCodeTabs()
}

function overviewPane(c) {
  const need = c.origin === 'wrapped'
    ? `<div class="callout warn" style="margin-bottom:20px">
         <b>Vuetify 기반</b> — 내부적으로 <code>${c.vuetifyBase}</code>를 사용합니다.
         <code>~/design/vuetify</code>에서 import 하세요.
       </div>`
    : `<div class="callout" style="margin-bottom:20px">
         <b>Standalone</b> — Vuetify 없이 동작합니다. <code>~/design</code>에서 import 하세요.
       </div>`

  const wherebox = WHERE[c.id] ? `
    <div class="whybox">
      <div class="wb-row"><span class="wb-tag why">왜 필요한가</span><span>${c.reason.ko}</span></div>
      <div class="wb-row"><span class="wb-tag where">어디에 쓰나</span><span>${WHERE[c.id]}</span></div>
    </div>` : ''

  return need + wherebox + `<div class="demo">${c.demo}</div>` + codeBlock(c) + `
    <div class="livehint">
      위 예시는 문서용 정적 렌더입니다.
      실제 Vuetify 위에서 동작하는 화면은 <b>examples/vuetify-app</b>의 라이브 갤러리에서 확인하세요.
    </div>`
}

function codePane(c) {
  const install = c.origin === 'wrapped'
    ? `<div class="callout warn" style="margin-bottom:22px">
         <b>import 경로:</b> <code>~/design/vuetify</code> (Vuetify 의존 배럴)<br>
         <b>필요한 CSS:</b> <code>ds.css</code> + <code>ds-vuetify.css</code>
       </div>`
    : `<div class="callout" style="margin-bottom:22px">
         <b>import 경로:</b> <code>~/design</code><br>
         <b>필요한 CSS:</b> <code>ds.css</code> 하나
       </div>`
  const imp = c.origin === 'wrapped'
    ? `import { Ds${c.name.replace(/^Ds/, '')} } from '~/design/vuetify'`
    : `import { Ds${c.name.replace(/^Ds/, '')} } from '~/design'`
  return install +
    `<div class="tbl-title">Import</div>
     <div class="codewrap"><div class="codebody"><pre><code>${esc(imp)}</code></pre></div></div>
     <div class="tbl-title">Usage</div>` + codeBlock(c, true)
}

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

function guidelinesPane(c) {
  const tagClass = (t) =>
    t === '해야 할 것' ? 'do' : t === '하지 말 것' ? 'dont' : t === '접근성' ? 'a11y' : 'note'
  const items = (c.guidelines || []).map(([tag, text]) =>
    `<div class="gl-item"><span class="gl-tag ${tagClass(tag)}">${tag}</span><span class="gl-text">${text}</span></div>`).join('')

  const why = `
    <div class="tbl-title">왜 이렇게 만들었나</div>
    <div class="callout" style="margin-bottom:28px">
      ${c.origin === 'wrapped'
        ? `<b>origin: wrapped</b> — Vuetify의 <code>${c.vuetifyBase}</code>를 감쌉니다.<br>`
        : `<b>origin: custom</b> — Vuetify 없이 직접 만들었습니다.<br>`}
      ${c.reason.ko}
      <div style="margin-top:8px;color:var(--gray-9);font-size:12.5px">${c.reason.en}</div>
    </div>`

  return why + (items ? `<div class="tbl-title">사용 지침</div><div class="gl">${items}</div>` : '')
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
  $('#content').innerHTML = `
    <div class="page-head"><h1>Templates</h1><span class="page-ko">골든 스크린</span></div>
    <p class="page-lead">
      컴포넌트를 조합한 완성 화면입니다. 새 화면은 여기서 복제해 시작하고,
      AI에게는 "이 템플릿처럼 만들어줘"라고 넘깁니다.
    </p>
    <div class="tpl-grid">` +
    TEMPLATES.map((t) => `
      <a class="tpl-card" href="${t.file}">
        <h3>${t.name}</h3>
        <p>${t.desc}</p>
        <div class="covers">${t.covers.map((x) => `<span>${x}</span>`).join('')}</div>
        <div class="go">열어보기 →</div>
      </a>`).join('') + `</div>`
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
  return `
    <div class="page-head"><h1>Design System</h1></div>
    <p class="page-lead">
      AI SaaS Agent 제품군을 위한 극한 미니멀 디자인 시스템.
      Vue 3 · Vuetify 3.11 환경에서 그대로 쓸 수 있습니다.
    </p>
    <div class="prose">
      <h2>무엇인가</h2>
      <p>
        그림자를 쓰지 않고 1px 보더와 여백만으로 위계를 만드는 시스템입니다.
        색은 회색 12단계와 브랜드 블루 하나로 제한합니다.
        Geist(Vercel)와 Radix Themes의 절제를 기준으로 삼았습니다.
      </p>
      <table>
        <thead><tr><th>항목</th><th>값</th></tr></thead>
        <tbody>
          <tr><td>브랜드</td><td><code>#1F7FF0</code> · 다크 <code>#4593F5</code></td></tr>
          <tr><td>회색</td><td>Radix Slate 1–12 (라이트/다크 쌍)</td></tr>
          <tr><td>폰트</td><td>Pretendard</td></tr>
          <tr><td>모서리</td><td>2 / 4 / 6px</td></tr>
          <tr><td>그림자</td><td>없음 (Toast·Menu·Dialog 등 떠 있는 요소만 예외)</td></tr>
          <tr><td>컴포넌트</td><td>${total}종 — Standalone ${total - wrapped} · Vuetify 기반 ${wrapped}</td></tr>
        </tbody>
      </table>

      <h2>어디서 시작하나</h2>
      <ul>
        <li><b><a href="#/docs/install">설치 · 사용법</a></b> — 개발자가 앱에 넣는 법 (10분)</li>
        <li><b><a href="#/docs/vuetify">Vuetify와의 관계</a></b> — 무엇이 Vuetify 기반이고 무엇이 아닌지</li>
        <li><b><a href="#/components">Components</a></b> — 컴포넌트 ${total}종 카탈로그</li>
        <li><b><a href="#/templates">Templates</a></b> — 골든 스크린</li>
      </ul>
    </div>`
}

function pageInstall() {
  return `
    <div class="page-head"><h1>설치 · 사용법</h1></div>
    <p class="page-lead">개발자 기준 10분. npm 설치가 필요 없습니다.</p>
    <div class="prose">
      <div class="callout">
        <b>새로 설치할 패키지는 없습니다.</b> Vuetify는 이미 앱에 있고, 이 디자인 시스템은
        <b>파일을 복사해 넣는 방식</b>입니다. 버전 충돌이 생길 수 없습니다.
      </div>

      <h2>1. 파일 복사</h2>
      <pre><code>design-system/
  ds.css              →  app/src/design/ds.css
  ds-vuetify.css      →  app/src/design/ds-vuetify.css   (Vuetify 기반 컴포넌트를 쓸 때만)
  vue/                →  app/src/design/</code></pre>

      <h2>2. 스타일 등록</h2>
      <pre><code>// nuxt.config.ts
export default defineNuxtConfig({
  css: [
    '~/src/design/ds.css',
    '~/src/design/ds-vuetify.css',   // Vuetify 기반 컴포넌트를 쓸 때만
  ],
})</code></pre>

      <h2>3. Vuetify defaults 연결 (선택)</h2>
      <p>
        직접 쓰는 <code>&lt;v-menu&gt;</code>·<code>&lt;v-dialog&gt;</code>에도 우리 기본값이 적용되게 합니다.
        이 시스템의 컴포넌트를 안 쓰는 화면에서도 스타일이 유지되는 <b>강제 층</b>입니다.
      </p>
      <pre><code>import { createVuetify } from 'vuetify'
import { dsDefaults } from '~/src/design/defaults'

createVuetify({ defaults: dsDefaults })</code></pre>

      <h2>4. 사용</h2>
      <pre><code>&lt;script setup&gt;
// Vuetify 불필요한 컴포넌트
import { DsButton, DsChatMessage, DsToolCallStep } from '~/src/design'

// Vuetify 기반 컴포넌트 — 배럴이 다릅니다
import { DsDataTable, DsDialog } from '~/src/design/vuetify'
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
      <p><code>&lt;html data-theme="dark"&gt;</code> 하나로 전환됩니다. Vuetify 테마와 독립적으로 동작합니다.</p>

      <h2>기존 화면은 어떻게 되나</h2>
      <p>
        아무것도 바뀌지 않습니다. 이 시스템은 <code>src/design/</code> 안에만 존재하고
        앱 파일을 건드리지 않습니다. 폴더째 지워도 앱은 그대로 돌아갑니다.
      </p>
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
      <div class="callout">
        <b>Vuetify를 대체하지 않습니다. 옆에 함께 삽니다.</b><br>
        Vuetify 3.11은 그대로 두고, 그 옆에 <code>src/design/</code>을 짓습니다.
        마이그레이션은 없고 기존 화면은 바뀌지 않습니다.
      </div>

      <h2>"Vuetify 없이 동작한다"의 뜻</h2>
      <p>
        오해하기 쉬운 표현입니다. <b>"Vuetify와 호환되지 않는다"는 뜻이 전혀 아닙니다.</b>
        정확히는 <b>"Vuetify를 필요로 하지 않는다"</b>는 뜻이고, 이건 호환성을 <u>낮추는</u> 게 아니라
        <u>높이는</u> 성질입니다.
      </p>
      <table>
        <thead><tr><th></th><th>Standalone 컴포넌트</th><th>Vuetify 기반 컴포넌트</th></tr></thead>
        <tbody>
          <tr><td><b>Vuetify 앱에서</b></td><td>정상 동작 ✓</td><td>정상 동작 ✓</td></tr>
          <tr><td><b>Vuetify 없는 앱에서</b></td><td>정상 동작 ✓</td><td>동작하지 않음</td></tr>
          <tr><td><b>Vuetify 버전 올릴 때</b></td><td>영향 없음</td><td>확인 필요</td></tr>
        </tbody>
      </table>
      <p>
        Standalone은 Vuetify가 <b>있어도 없어도</b> 동작합니다.
        의존이 없다는 것은 Vuetify 버전이 바뀌어도 깨질 일이 없다는 뜻이기도 합니다 —
        오히려 가장 안전한 쪽입니다.
      </p>

      <h2>실제로 검증했습니다</h2>
      <div class="callout">
        <b>Vuetify 3.11.6 실제 앱에서 컴포넌트 25종 전부 렌더 확인 (2026-07-31)</b><br>
        <code>examples/vuetify-app</code>에 검증용 최소 앱이 들어 있습니다.
        <code>npm run dev</code>로 직접 돌려볼 수 있습니다.
      </div>
      <table>
        <thead><tr><th>검증 항목</th><th>결과</th></tr></thead>
        <tbody>
          <tr><td><code>vite build</code> (602 모듈)</td><td>통과 · 에러 0</td></tr>
          <tr><td>Vuetify 원본(<code>VBtn</code>·<code>VChip</code>)과 나란히 배치</td><td>상호 침범 없음</td></tr>
          <tr><td><code>VCard</code> 안에 우리 컴포넌트 중첩</td><td>스타일 유지됨</td></tr>
          <tr><td>Standalone 20종 중 <code>vuetify</code> import</td><td>0개</td></tr>
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
        <li><b>루트에 <code>all: unset</code></b> — Vuetify 전역 리셋의 영향을 차단합니다.</li>
        <li><b><code>ds-</code> 프리픽스</b> — <code>.v-*</code> 클래스와 원천적으로 겹치지 않습니다.</li>
        <li><b><code>!important</code>는 Vuetify 기반 컴포넌트에서만</b> — Standalone 컴포넌트에 <code>!important</code>가 필요해지면 구조가 잘못됐다는 신호입니다.</li>
      </ol>

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
        라이트 <code>#1F7FF0</code> / 다크 <code>#4593F5</code>.
        어두운 배경에서는 원색이 가라앉아 보여 한 톤 밝은 변형을 씁니다.
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
