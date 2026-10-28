/* ============================================
   Foundation — 컴포넌트 이전의 결정들
   참고: seed-design.io(당근), atlassian.design, carbondesignsystem.com(IBM),
        polaris.shopify.com, paste.twilio.design
   ============================================ */

const V = new URL(import.meta.url).search
const { ic, ICON_NAMES } = await import('./icons-svg.js' + V)

export const FOUNDATION_PAGES = [
  ['overview', '개요', 'Overview'],
  ['tokens', '토큰', 'Design Tokens'],
  ['color', '컬러', 'Color'],
  ['typography', '타이포그래피', 'Typography'],
  ['spacing', '스페이싱 · 레이아웃', 'Spacing & Layout'],
  ['shape', '라디우스 · 보더', 'Radius & Border'],
  ['elevation', '엘리베이션', 'Elevation'],
  ['density', '밀도', 'Density'],
  ['iconography', '아이콘', 'Iconography'],
  ['motion', '모션', 'Motion'],
  ['state', '상태', 'State'],
  ['a11y', '접근성', 'Accessibility'],
  ['writing', 'UX 라이팅', 'Writing'],
  ['wordlist', '용어집', 'Word List'],
]

const swatchRow = (n) => `<div class="swatch" style="background:var(--gray-${n})"><span>${n}</span></div>`

/* ════════════════════════════════════════ */
export function fdOverview() {
  /* 주제별 미니 견본 — 전부 실제 토큰으로 그립니다 */
  const THUMBS = {
    tokens: `<div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">
      ${['--brand', '--gray-a3', '--sel-bg'].map((t) =>
        `<code style="font-family:var(--mono);font-size:10px;background:var(--gray-3);color:var(--brand);padding:3px 7px;border-radius:var(--r-sm)">${t}</code>`).join('')}
    </div>`,
    color: `<div style="display:flex;flex-direction:column;gap:6px;width:150px">
      <div style="display:flex;border-radius:var(--r-sm);overflow:hidden;height:16px">
        ${[3,5,7,9,11,12].map((n) => `<div style="flex:1;background:var(--gray-${n})"></div>`).join('')}
      </div>
      <div style="height:16px;border-radius:var(--r-sm);background:var(--brand)"></div>
    </div>`,
    typography: `<div style="display:flex;align-items:baseline;gap:10px;color:var(--gray-12)">
      <span style="font-size:26px;font-weight:600;letter-spacing:-.02em">Ag</span>
      <span style="font-size:16px;font-weight:500">가나</span>
      <span style="font-size:12px;color:var(--gray-10)">11–24px</span>
    </div>`,
    spacing: `<div style="display:flex;flex-direction:column;gap:5px;width:130px">
      ${[8,16,32,56].map((w) => `<div style="height:8px;width:${w}px;background:var(--brand-subtle);border-left:2px solid var(--brand)"></div>`).join('')}
    </div>`,
    shape: `<div style="display:flex;gap:8px;align-items:flex-end">
      ${['in','el','ct'].map((r) =>
        `<div style="width:26px;height:26px;border:1px solid var(--brand);background:var(--brand-subtle);border-radius:var(--r-${r})"></div>`).join('')}
    </div>`,
    elevation: `<div style="display:flex;gap:12px;align-items:center">
      <div style="width:44px;height:32px;border:1px solid var(--border);border-radius:var(--r-md);background:var(--surface)"></div>
      <div style="width:44px;height:32px;border-radius:var(--r-md);background:var(--surface);box-shadow:var(--shadow-overlay)"></div>
    </div>`,
    density: `<div style="width:120px;border:1px solid var(--border);border-radius:var(--r-md);overflow:hidden">
      ${[28,32,40].map((h) => `<div style="height:${h}px;border-bottom:1px solid var(--border-subtle);display:flex;align-items:center;padding:0 8px"><div style="width:60%;height:5px;border-radius:3px;background:var(--gray-4)"></div></div>`).join('')}
    </div>`,
    iconography: `<div style="display:flex;gap:10px;color:var(--gray-11)">
      ${ic('agent')}${ic('search')}${ic('folder')}${ic('settings')}
    </div>`,
    motion: `<div style="display:flex;align-items:center;gap:9px;color:var(--gray-10)">
      <span class="spinner"></span>
      <code style="font-family:var(--mono);font-size:11px">160ms ease</code>
    </div>`,
    state: `<div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">
      <span class="badge brand">실행 중</span>
      <span class="badge danger">실패</span>
    </div>`,
    a11y: `<div style="display:flex;align-items:center;gap:10px">
      <div style="width:34px;height:24px;border-radius:var(--r-md);background:var(--brand);box-shadow:var(--focus-ring)"></div>
      <span class="kbd">Tab</span>
    </div>`,
    writing: `<div style="font-size:13px;line-height:1.7;text-align:center">
      <div style="color:var(--gray-12);font-weight:600">삭제할까요?</div>
      <div style="color:var(--gray-8);text-decoration:line-through">하시겠습니까?</div>
    </div>`,
    wordlist: `<div style="display:flex;gap:5px;flex-wrap:wrap;justify-content:center">
      <span class="chip" style="height:24px;padding:0 10px">에이전트</span>
      <span class="chip" style="height:24px;padding:0 10px">실행 중</span>
    </div>`,
  }

  const DESC = {
    tokens: '모든 값의 단일 원본', color: '제품 토큰 전체 — 라이트 · 다크 나란히',
    typography: 'Pretendard 11~24 여덟 단계 — UI와 본문 분리', spacing: '4px 배수 · 문서형 화면 층 간격',
    shape: '4 · 6 · 10 — 안쪽 · 요소 · 컨테이너', elevation: '면은 1px 선 · 떠 있는 것만 그림자',
    density: '컨트롤 32 · 표 줄 52 · 머리 40', iconography: `Lucide ${ICON_NAMES.length} · stroke 2`,
    motion: '160ms ease · 상태를 알리는 움직임만', state: '화면 5종 + 인터랙션 6종',
    a11y: 'WCAG 2.2 AA · 포커스 링 · 키보드', writing: '에러는 사과하지 않는다',
    wordlist: '한국어 UI 어휘 고정', i18n: '이름은 영문 · 문구는 한글',
  }

  const cards = FOUNDATION_PAGES.filter(([id]) => id !== 'overview').map(([id, ko, en]) => `
    <a class="cat-card" href="#/foundation/${id}">
      <div class="thumb"><div class="thumb-inner">${THUMBS[id] || ''}</div></div>
      <div class="cat-body">
        <div class="cc-top"><h3>${en}</h3></div>
        <p>${DESC[id] || ''}</p>
      </div>
    </a>`).join('')

  return `
    <div class="page-head"><h1>Foundation</h1></div>
    <div class="cat-grid" style="margin-top:30px">${cards}</div>`
}

/* ════════════════════════════════════════ */
export function fdTokens() {
  return `
    <div class="page-head"><h1>Design Tokens</h1></div>
    <p class="page-lead">
      모든 색·간격·모서리 값의 단일 원본입니다. 값은 한 방향으로만 흐릅니다.
    </p>
    <div class="prose">
      <div class="flowbox">
        <span>ds.css</span><i>→</i><span>CSS 변수</span><i>→</i><span>컴포넌트</span>
      </div>
      <p>
        컴포넌트는 <code>var(--gray-3)</code> 형태로만 참조합니다.
        hex 값을 컴포넌트에 직접 쓰면 3개월 뒤 색이 갈라집니다.
      </p>

      <h2>이름 규칙</h2>
      <table>
        <thead><tr><th>접두사</th><th>뜻</th><th>예</th></tr></thead>
        <tbody>
          <tr><td><code>--primary-*</code></td><td>브랜드 색과 그 변형 (부품 안쪽의 <code>--brand-*</code>는 별칭)</td><td><code>--primary-hover</code></td></tr>
          <tr><td><code>--gray-1~12</code></td><td>불투명 회색 — 배경·텍스트</td><td><code>--gray-11</code></td></tr>
          <tr><td><code>--gray-a1~a12</code></td><td>반투명 회색 — 보더·오버레이</td><td><code>--gray-a3</code></td></tr>
          <tr><td><code>--border</code> · <code>--input</code> · <code>--border-emphasized</code> · <code>--border-subtle</code></td><td>보더 시맨틱 (<code>--border-strong</code> · <code>--border-hover</code>는 옛 별칭)</td><td><code>--border</code></td></tr>
          <tr><td><code>--success/warning/error</code></td><td>상태 색 (+ <code>-text</code>·<code>-subtle</code>·<code>-border</code>). <code>--danger-*</code>는 옛 별칭</td><td><code>--error-text</code></td></tr>
          <tr><td><code>--r-in</code> · <code>--r-el</code> · <code>--r-ct</code> · <code>--r-full</code></td><td>모서리 반경 4 · 6 · 10 · 원형 (<code>sm/md/lg/xl</code>은 옛 별칭)</td><td><code>--r-el</code></td></tr>
          <tr><td><code>--canvas</code> / <code>--card</code> / <code>--background</code></td><td>셸 바탕 / 흰 패널 · 카드 면 / 그 아래 한 단</td><td>—</td></tr>
          <tr><td><code>--nav-active</code> · <code>-fg</code> · <code>-bg</code></td><td>탭 · 세그먼티드 · 값 걸린 필터 · 조건 칩의 활성 (브랜드 선 + 글자)</td><td>밑줄 탭</td></tr>
          <tr><td><code>--selected-fill</code> (<code>--sel-bg</code>)</td><td>목록 · 내비 행의 선택 (중립 회색 면)</td><td>GNB 현재 메뉴, 고른 행</td></tr>
          <tr><td><code>--focus-ring</code> / <code>--shadow-overlay</code></td><td>포커스 링 / 떠 있는 요소 그림자</td><td>—</td></tr>
          <tr><td><code>--font</code> / <code>--mono</code></td><td>글꼴</td><td>—</td></tr>
        </tbody>
      </table>
      <p>
        <b>의미로 이름 짓고 값으로 이름 짓지 않습니다.</b>
        <code>--blue-500</code>이 아니라 <code>--brand</code>입니다.
        브랜드 색이 바뀌어도 이름은 그대로여야 하기 때문입니다.
      </p>

      <h2>다크 모드</h2>
      <p>
        같은 이름의 변수를 제품에서는 <code>.dark</code> 클래스에서 덮어씁니다(관리자 콘솔 · 이용자 화면 같은 셀렉터).
        컴포넌트는 테마를 신경 쓰지 않고 <code>var(--muted)</code>만 참조합니다.
        이 문서 사이트만 <code>[data-theme="dark"]</code>로 전환합니다 — <code>ds.css</code>가 두 셀렉터를 함께 받습니다.
      </p>
      <pre><code>:root { --muted: #f4f4f5; --card: #ffffff; --canvas: #f4f4f5; }   /* 라이트 */
.dark { --muted: #222327; --card: #101013; --canvas: #181818; }   /* 다크 */</code></pre>
      <p>
        <b>다른 토큰을 <code>var()</code>로 엮은 토큰은 다크 블록에도 같은 줄을 적습니다.</b>
        <code>--nav-active: var(--primary)</code>는 선언된 자리의 값으로 굳어서,
        <code>:root</code>에만 적으면 다크에서도 라이트 브랜드가 나옵니다.
      </p>

      <h2>Vuetify와의 연결</h2>
      <p>
        Vuetify는 CSS 변수가 아닌 실제 hex 값을 요구합니다.
        <code>vue/theme.ts</code>에 같은 값을 한 벌 더 정의해 Vuetify 테마에 주입합니다.
        <b>두 곳의 값은 항상 같아야 합니다</b> — 어긋나면 색이 갈립니다.
      </p>

      <h2>전체 목록</h2>
      <p><a href="#/foundation/color">토큰 값 전체 보기 →</a></p>
    </div>`
}

/* 라이트 · 다크 견본 칸 — 페이지 테마와 상관없이 두 모드를 나란히 그립니다.
   ds.css 의 토큰 덩이(:root · 다크)를 그대로 읽어 .fd-light · .fd-dark 에 다시 선언합니다.
   값을 여기 적지 않으므로 토큰이 바뀌어도(npm run tokens:pull) 이 페이지는 따라옵니다.
   다크 칸은 라이트 선언 위에 다크 선언을 덮습니다 — 다크 덩이가 다시 적지 않는 color-mix 파생값
   (--success-subtle 등)이 그 칸의 --card 로 다시 계산되게 하려면 같은 자리에 둘 다 있어야 합니다. */
function themeScopes() {
  if (typeof document === 'undefined' || document.getElementById('fd-scopes')) return   // 검사 스크립트(node)도 이 함수를 부릅니다
  let light = '', dark = ''
  for (const sheet of document.styleSheets) {
    if (!/\/ds\.css/.test(sheet.href || '')) continue
    let rules
    try { rules = sheet.cssRules } catch { continue }
    for (const r of rules) {
      const sel = (r.selectorText || '').replace(/\s+/g, '')
      if (sel === ':root') light += r.style.cssText
      else if (sel === '[data-theme="dark"],.dark') dark += r.style.cssText
    }
  }
  const el = document.createElement('style')
  el.id = 'fd-scopes'
  el.textContent = `.fd-light{${light}}.fd-dark{${light}${dark}}`
  document.head.appendChild(el)
}

/* ════════════════════════════════════════ */
export function fdColor() {
  themeScopes()

  /* 견본 하나 — kind: fill(면) · text(글자) · line(선) · on:<면 토큰>(그 면 위 글자) */
  const chip = (name, kind = 'fill') => {
    if (kind === 'text') return `<span class="ctok-aa" data-p="color" style="color:var(${name})">가나</span>`
    if (kind === 'line') return `<span class="ctok-chip ctok-line" data-p="border-top-color" style="border-color:var(${name})"></span>`
    if (kind.startsWith('on:')) return `<span class="ctok-aa ctok-on" data-p="color" style="color:var(${name});background:var(${kind.slice(3)})">가나</span>`
    return `<span class="ctok-chip" data-p="background-color" style="background:var(${name})"></span>`
  }
  const row = ([name, note, kind]) => `
    <div class="ctok">
      <button class="ctok-name" data-tok="${name}" title="클릭하면 복사"><code>${name}</code><span>${note}</span></button>
      ${['fd-light', 'fd-dark'].map((s) => `<div class="ctok-sw ${s}">${chip(name, kind)}<code data-hex></code></div>`).join('')}
    </div>`
  const table = (rows) => `
    <div class="ctok-list">
      <div class="ctok ctok-head"><span>토큰</span><span>라이트</span><span>다크</span></div>
      ${rows.map(row).join('')}
    </div>`
  const strip = (prefix, nums) => ['fd-light', 'fd-dark'].map((s) => `
    <div class="ctok-strip ${s}">
      <span class="ctok-strip-l">${s === 'fd-light' ? '라이트' : '다크'}</span>
      ${nums.map((n) => `<button class="ctok-step" data-tok="${prefix}${n}" title="${prefix}${n} — 클릭하면 복사"><span style="background:var(${prefix}${n})"></span><i>${n}</i></button>`).join('')}
    </div>`).join('')

  const status = (k, d) => [
    [`--${k}`, `${d} — 점 · 막대 · 배지 면`],
    [`--${k}-text`, '글자', 'text'],
    [`--${k}-subtle`, '옅은 면'],
    [`--${k}-border`, '테두리', 'line'],
  ]

  return `
    <div class="page-head"><h1>Color</h1></div>
    <p class="page-lead">
      제품(관리자 콘솔 · 이용자 화면)이 쓰는 토큰입니다 — 원본은 앱의 <code>공용/스타일/토큰.css</code>.
      <b>모든 토큰을 라이트 · 다크로 나란히</b> 보여 줍니다. 이름을 누르면 복사됩니다.
    </p>
    <div class="prose">

      <h2>Surface</h2>
      ${table([
        ['--canvas', '셸 바탕'],
        ['--card', '패널 · 카드 면'],
        ['--background', '카드 아래 한 단 — sticky 표 머리 · 포커스 링 안쪽'],
        ['--muted', '옅은 면'],
        ['--accent-muted', '옅은 브랜드 면'],
        ['--overlay-hover', '호버 (반투명)'],
        ['--selected-fill', '목록 · 내비 행의 선택 (반투명)'],
        ['--scrim', '모달 뒤 가림막'],
      ])}
      <p>
        <b>셸은 캔버스 위 패널입니다</b> — <code>--canvas</code> 위에 <code>--card</code> 패널을 8px 인셋으로 얹습니다.
        다크에서는 명암 관계가 반대입니다: 콘텐츠 면이 캔버스보다 <b>어둡습니다</b> — 글자 대비가 높은 쪽이 읽는 면입니다.
      </p>

      <h2>Text</h2>
      ${table([
        ['--foreground', '본문 · 제목', 'text'],
        ['--muted-foreground', '보조 글자', 'text'],
        ['--primary-text', '링크 · 브랜드 글자', 'text'],
      ])}

      <h2>Border</h2>
      ${table([
        ['--border-subtle', '행 구분선 (반투명)', 'line'],
        ['--border', '카드 · 표 · 패널', 'line'],
        ['--input', '입력칸 · 한 단 강한 선', 'line'],
        ['--border-emphasized', '호버', 'line'],
      ])}
      <p>
        <b>보더는 불투명 실선입니다.</b> 반투명은 행 사이 구분선 <code>--border-subtle</code> 하나뿐입니다.
        <code>--border-strong</code> · <code>--border-hover</code>는 옛 별칭입니다.
      </p>

      <h2>Brand</h2>
      ${table([
        ['--primary', '면 — 버튼 배경 · 점 · 포커스'],
        ['--primary-hover', '호버'],
        ['--primary-active', '누름'],
        ['--primary-foreground', '브랜드 면 위 글자', 'on:--primary'],
        ['--ring', '포커스 링'],
        ['--nav-active', '탭 · 필터 활성 선 · 글자'],
        ['--nav-active-bg', '활성 옅은 면'],
      ])}
      <p>
        <b>면과 글자를 나눕니다.</b> <code>--primary</code>는 버튼 배경 · 점 · 포커스 링처럼 <b>면</b>에만 씁니다.
        흰 배경 위 <b>글자 · 링크</b>는 대비가 부족하므로 <code>--primary-text</code>를 씁니다.
        디자인 시스템 부품 안쪽의 <code>--brand-*</code>는 이 토큰들의 별칭입니다.
      </p>
      <div class="dodont">
        <div class="dd do">
          <span class="dd-tag">이럴 때만</span>
          <ul>
            <li>기본 액션 버튼 · 링크</li>
            <li>포커스 링</li>
            <li>진행 중 상태 · 인용 칩</li>
            <li>폼 컨트롤의 켜짐</li>
            <li><b>활성 표시</b> — 탭 · 세그먼티드 · 값 걸린 필터 · 조건 칩 (선 + 글자만)</li>
          </ul>
        </div>
        <div class="dd dont">
          <span class="dd-tag">쓰지 않습니다</span>
          <ul>
            <li><b>목록 · 내비 행의 선택</b> — 중립 회색 면</li>
            <li>활성 항목의 <b>면 채우기</b> (브랜드 채움 · 검정 반전)</li>
            <li>페이지 배경 · 카드 보더</li>
            <li>제목 텍스트 · 장식</li>
          </ul>
        </div>
      </div>
      <p>
        <b>활성과 선택은 다른 규칙입니다.</b>
        탭 · 세그먼티드 · 값 걸린 필터 · 조건 칩의 활성은 <code>--nav-active</code>(브랜드 선 + 글자)이고 면은 그대로 둡니다.
        목록 · 내비 행의 선택은 중립 회색 면 <code>--selected-fill</code>입니다.
      </p>

      <h2>Status</h2>
      ${table([
        ...status('success', '완료'),
        ...status('warning', '확인 필요'),
        ...status('error', '실패 · 오류 · 파괴적'),
        ['--error-ring', '오류 칸의 포커스 링'],
        ['--error-deep', '가장 위험 — 개인 · 그룹 기준 동시 초과'],
        ['--info-subtle', '정보 — 옅은 면'],
        ['--info-border', '정보 — 테두리', 'line'],
        ['--success-on-inverse', '토스트 · 툴팁 위 성공 아이콘', 'on:--foreground'],
        ['--error-on-inverse', '토스트 · 툴팁 위 실패 아이콘', 'on:--foreground'],
      ])}
      <p>
        상태마다 단이 나뉩니다 — 원색(점 · 막대 · 배지 면) · <code>-text</code>(글자) · <code>-subtle</code>(면) · <code>-border</code>(테두리).
        <b>원색은 흰 배경에서 AA 미달이라 글자에는 <code>-text</code></b>를 씁니다.
        면 · 테두리는 원색에서 파생하므로 다크에서도 자동으로 맞습니다.
        <code>--danger-*</code>는 옛 별칭입니다.
      </p>
      <div class="dodont">
        <div class="dd dont">
          <span class="dd-tag">하지 말 것</span>
          <ul><li>색만으로 상태 구분 — 색맹 사용자는 읽을 수 없습니다</li>
              <li>빨강을 화면에 상시 노출 — 진짜 에러가 묻힙니다</li></ul>
        </div>
        <div class="dd do">
          <span class="dd-tag">해야 할 것</span>
          <ul><li>배지처럼 <b>옅은 면 + 글자</b>로 — 색과 낱말이 함께</li>
              <li>진짜 그 상태일 때만</li></ul>
        </div>
      </div>
      <div class="ctok-demo">
        ${['fd-light', 'fd-dark'].map((s) => `
          <div class="${s}">
            <span class="badge">대기</span>
            <span class="badge brand">실행 중</span>
            <span class="badge success">완료</span>
            <span class="badge warning">확인 필요</span>
            <span class="badge danger">실패</span>
          </div>`).join('')}
      </div>

      <h2>대비</h2>
      <p>WCAG 2.2 AA 기준 — 본문 4.5:1, UI 요소 · 보더 3:1. 다크는 콘텐츠 면 <code>--card</code> 위에서 잽니다.</p>
      <table>
        <thead><tr><th>조합</th><th>라이트</th><th>다크</th></tr></thead>
        <tbody>
          <tr><td>본문 (<code>--foreground</code>)</td><td>17.4:1</td><td>17.3:1</td></tr>
          <tr><td>보조 텍스트 (<code>--muted-foreground</code>)</td><td>4.9:1</td><td>7.6:1</td></tr>
          <tr><td>링크 (<code>--primary-text</code>)</td><td>5.9:1</td><td>7.8:1</td></tr>
          <tr><td>버튼 라벨 (<code>--primary-foreground</code> on <code>--primary</code>)</td><td><b>3.9:1 — 미달(승인된 예외)</b></td><td><b>3.0:1 — 미달(승인된 예외)</b></td></tr>
          <tr><td>상태 글자 (<code>-text</code>)</td><td>4.9~5.5:1</td><td>8.2~13.3:1</td></tr>
        </tbody>
      </table>
      <p>
        <b>버튼 라벨은 브랜드 원색을 그대로 쓰기로 한 결정입니다</b> — 색 일치를 우선한 선택이며 무결성 검사에도 예외로 기록해 두었습니다.
        접근성이 요구되는 화면에서는 primary 버튼 대신 secondary를 쓰거나 라벨을 18px 이상으로 잡습니다.
      </p>

      <h2>Category</h2>
      ${table([1, 2, 3, 4, 5, 6, 7, 8].map((n) => [`--cat-${n}`, n === 1 ? '1번 — 브랜드색' : `${n}번`]))}
      <p>
        <b>'종류'에 색을 고정</b>합니다 — 순위나 개수가 바뀌어도 그 종류는 늘 같은 색입니다.
        다크는 자동 반전이 아니라 어두운 면에 맞춰 따로 고른 값입니다.
        부를 때는 <b>색 이름이 아니라 슬롯 번호</b>로 부르세요(<code>.badge.cat-2</code>) — 값은 언제든 바뀝니다.
        상태색과 섞어 쓰지 않습니다.
      </p>

      <h2>File type</h2>
      ${table([
        ['--ft-pdf', 'PDF'], ['--ft-doc', '문서'], ['--ft-sheet', '스프레드시트'], ['--ft-slide', '슬라이드'],
        ['--ft-hwp', '한글'], ['--ft-image', '이미지'], ['--ft-archive', '압축'], ['--ft-csv', 'CSV'],
        ['--ft-audio', '음성'], ['--ft-video', '영상'], ['--ft-text', '텍스트 · 기타'],
      ])}
      <p>확장자 아이콘 · 배지 색입니다. 확장자 → 토큰 매핑은 <code>공용/파일유형.ts</code> 한 벌입니다. 다크 값은 아직 라이트와 같습니다.</p>

      <h2>Privacy</h2>
      ${table([
        ['--pii-direct', '직접식별자 — 면 · 점'],
        ['--pii-direct-text', '직접식별자 — 글자', 'text'],
        ['--pii-quasi', '준식별자 — 면 · 점'],
        ['--pii-quasi-text', '준식별자 — 글자', 'text'],
        ['--pii-sensitive', '민감정보 — 면 · 점'],
        ['--pii-sensitive-text', '민감정보 — 글자', 'text'],
      ])}
      <p><b>위험이 큰 쪽이 붉습니다</b> — 직접식별자 레드 → 준식별자 주황 → 민감 앰버. 면 위에 얹는 글자는 <code>-text</code> 쪽입니다.</p>

      <h2>Feature</h2>
      ${table([
        ['--user-bubble', '사용자 말풍선 면'],
        ['--user-bubble-fg', '사용자 말풍선 글자', 'on:--user-bubble'],
        ['--highlight-bg', '인용 하이라이트'],
        ['--kb', '지식자산 갈래'],
        ['--favorite', '즐겨찾기 별'],
        ['--scrollbar', '스크롤바'],
      ])}

      <h2>Gray</h2>
      ${strip('--gray-', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])}
      <p>
        <b>디자인 시스템 부품 안쪽용입니다 — 화면 CSS는 번호 대신 위의 의미 토큰을 씁니다.</b>
        3 · 5 · 6 · 7 · 10 · 12는 <code>--muted</code> · <code>--border</code> · <code>--input</code> ·
        <code>--border-emphasized</code> · <code>--muted-foreground</code> · <code>--foreground</code>와 같은 값입니다.
        <code>gray-9</code>는 본문 대비에 미달하므로 의미 있는 정보를 담지 않습니다.
      </p>

      <h2>Gray Alpha</h2>
      ${strip('--gray-a', [1, 2, 3, 4, 5, 6, 7, 8])}
      <p>반투명 회색 — 어떤 면 위에 올려도 자연스러운 겹판 · 옅은 띠. 다크에서는 흰색 기반으로 뒤집힙니다.</p>

      <h2>Chart</h2>
      ${table([1, 2, 3, 4, 5, 6].map((n) => [`--chart-${n}`, `${n}번 계열`]))}
      <p>
        <b>이 문서 사이트에만 있습니다</b> — 앱 토큰 파일에는 아직 <code>--chart-*</code>가 없습니다.
        계열 색은 1부터 순서대로 씁니다. 상태색과 겹치지 않아 "빨강 = 실패"가 차트에서 흐려지지 않습니다.
      </p>
    </div>`
}

/* ════════════════════════════════════════ */
export function fdTypography() {
  /* 역할 — 크기 · 굵기 · 줄 간격을 묶은 실제 조합. 견본은 토큰으로 그립니다 */
  const roles = [
    ['KPI 숫자', '2xl', 'semibold', 'tight', '-.025em', '요약 카드의 큰 숫자', '1,284건'],
    ['화면 제목', 'xl', 'semibold', 'tight', '-.015em', '패널 맨 위 제목 · 문서형 화면의 대분류', '검색 로그'],
    ['절 제목', 'lg', 'semibold', 'tight', '-.01em', '카드 · 다이얼로그 · 절의 제목', '최근 30일 추이'],
    ['읽는 글', 'md', 'normal', 'prose', '', '설명 문단 · 에이전트 응답', '문서를 중앙에서 관리하고 권한에 맞게 검색합니다.'],
    ['UI 기본', 'base', 'normal', 'ui', '', '입력 · 탭 · 메뉴 · 표 본문', '문서를 중앙에서 관리하세요'],
    ['조밀 UI', 'sm', 'normal', 'ui', '', '버튼 · 표 셀 · 칩 · 사이드 목록', '문서를 중앙에서 관리하세요'],
    ['표 머리', 'sm', 'semibold', 'ui', '', '표 머리 — 색은 --muted-foreground', '등록일'],
    ['메타', 'xs', 'medium', 'ui', '', '라벨 · 곁말 · 시각 · 쪽 발', '2026-10-27 14:02 · 관리자'],
    ['마이크로 라벨', '2xs', 'semibold', 'ui', '', '배지 · 키캡 · 견본 캡션', '실행 중'],
  ]
  const v = (name) => `<span class="mono" data-var="${name}"></span>`
  return `
    <div class="page-head"><h1>Typography</h1></div>
    <p class="page-lead">
      Pretendard 여덟 단계 — 11 · 12 · 13 · 14 · 15 · 16 · 20 · 24.
      <b>위계는 크기보다 굵기와 색으로</b> 만듭니다.
    </p>
    <div class="prose">

      <h2>역할</h2>
      <div class="typescale">
        ${roles.map(([role, s, w, l, ls, use, text]) => `
          <div class="ts-row">
            <div class="ts-meta"><b>${role}</b><span><i data-var="--text-${s}"></i> · <i data-var="--weight-${w}"></i> · <i data-var="--leading-${l}"></i></span></div>
            <div class="ts-sample" style="font-size:var(--text-${s});font-weight:var(--weight-${w});line-height:var(--leading-${l});${ls ? `letter-spacing:${ls};` : ''}${role === '표 머리' || role === '메타' ? 'color:var(--muted-foreground);' : ''}">${text}</div>
            <div class="ts-use">${use}</div>
          </div>`).join('')}
      </div>
      <p>
        <b>UI와 읽는 글을 구분합니다.</b> 조작하는 면(버튼 · 표 · 메뉴)은 13~14px로 조밀하게,
        읽는 면(설명 · 에이전트 응답)은 15px에 줄 간격 1.8로 넉넉하게 둡니다.
        읽는 글의 줄 길이는 <a href="#/foundation/spacing">Spacing &amp; Layout</a>의 <code>--measure</code>를 따릅니다.
      </p>

      <h2>토큰</h2>
      <div class="ty-toks">
        ${[
          ['크기', ['2xs', 'xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl'].map((n) => `--text-${n}`)],
          ['굵기', ['normal', 'medium', 'semibold'].map((n) => `--weight-${n}`)],
          ['줄 간격', ['tight', 'ui', 'normal', 'prose'].map((n) => `--leading-${n}`)],
        ].map(([h, toks]) => `
          <table>
            <thead><tr><th>${h}</th><th>값</th></tr></thead>
            <tbody>${toks.map((t) => `<tr><td><code>${t}</code></td><td>${v(t)}</td></tr>`).join('')}</tbody>
          </table>`).join('')}
      </div>
      <p>
        <b>이 여덟 밖의 크기와 반픽셀은 쓰지 않습니다</b> — 10 · 17 · 18 · 22 같은 값이 그 예입니다.
        <code>--text-3xl</code>(30) · <code>--text-4xl</code>(36)은 랜딩 전용이라 제품 화면에는 쓰지 않습니다.
        <b>700 이상의 굵기도 쓰지 않습니다</b> — 600으로 위계가 충분합니다.
      </p>

      <h2>글꼴</h2>
      <table>
        <thead><tr><th>토큰</th><th>글꼴</th><th>용도</th></tr></thead>
        <tbody>
          <tr><td><code>--font</code></td><td>Pretendard Variable</td><td>UI 전부 — 한글 · 영문 · 숫자가 한 벌로 어울립니다</td></tr>
          <tr><td><code>--mono</code></td><td>시스템 고정폭 (SF Mono · Consolas)</td><td>코드 · 툴콜 · 시각 · IP · 파일 크기</td></tr>
        </tbody>
      </table>
      <p>
        <b>고정폭은 세로로 자릿수를 맞춰 읽는 값에만</b> 씁니다 — 시각 · 용량 · ID · 코드.
        사람 이름 · 문서 제목 · 키캡(<code>.kbd</code>)은 아닙니다.
        세로로 놓이는 숫자에는 <code>font-variant-numeric: tabular-nums</code>를 씁니다(<code>.mono</code> · <code>code</code>에는 자동).
      </p>
      <p>
        <b>Pretendard는 설치가 필요합니다.</b> <code>npm install pretendard</code> 후
        <code>pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css</code>를 등록하세요.
        빠뜨리면 에러 없이 시스템 글꼴로 그려집니다. 라이선스는 SIL OFL 1.1입니다.
      </p>

      <h2>한글 규칙</h2>
      <div class="dodont">
        <div class="dd do"><span class="dd-tag">이렇게</span><ul>
          <li>제목에만 음수 자간 <code>-0.01~-0.025em</code></li>
          <li>줄바꿈은 <code>word-break: keep-all</code> — 단어 중간에서 끊지 않습니다</li>
          <li>작은 라벨의 위계는 <b>크기 + 굵기 + 회색</b>으로 — 표 머리 13 · 600 · <code>--muted-foreground</code></li>
        </ul></div>
        <div class="dd dont"><span class="dd-tag">이렇지 않게</span><ul>
          <li>양수 자간 — 한글은 단어 경계가 무너집니다</li>
          <li><span style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.07em">Section Title</span> — 대문자 변환 + 벌어진 자간. 한글엔 대문자가 없어 영문만 튑니다</li>
          <li>11px 미만</li>
        </ul></div>
      </div>
    </div>`
}

/* ════════════════════════════════════════ */
export function fdSpacing() {
  /* 단계 — 관리자 콘솔 실측(2026-10-27, 여백 값 1,566개)에서 자주 쓰는 순 */
  const base = [
    [4, '아이콘과 글자 사이 (조밀)'],
    [8, '관련된 요소 사이 · 셸 인셋'],
    [12, '버튼 사이 · 카드 사이 · 입력 안쪽'],
    [16, '카드 안쪽 · 블록 위'],
    [20, '패널 좌우 여백'],
    [24, '섹션 안쪽'],
    [32, '섹션 사이'],
    [48, '큰 구획'],
  ]
  const half = [
    [2, '붙어 있는 요소 — 아이콘 버튼 사이'],
    [6, '버튼 안 아이콘–글자 · 라벨–입력–힌트'],
    [10, '제목 아래 · 머리줄 요소 사이'],
    [14, '머리줄 위'],
  ]
  const bars = (rows) => `<div class="spacescale">${rows.map(([v, use]) => `
    <div class="sp-row"><code>${v}</code><div class="sp-bar" style="width:${v}px"></div><span>${use}</span></div>`).join('')}</div>`

  return `
    <div class="page-head"><h1>Spacing &amp; Layout</h1></div>
    <p class="page-lead">
      그림자가 없는 시스템에서는 <b>여백이 구조를 만듭니다</b> — 가까이 있으면 한 덩어리, 멀면 다른 덩어리입니다.
    </p>
    <div class="prose">

      <h2>기본 단계 — 4의 배수</h2>
      ${bars(base)}

      <h2>조밀 보정 — 2의 배수</h2>
      ${bars(half)}
      <p>
        <b>표 · 필터 · 머리줄처럼 조밀한 UI는 4의 배수 사이를 2px로 보정합니다.</b>
        이 열둘 밖의 값(5 · 7 · 9 · 13)은 쓰지 않습니다 — 정렬이 미묘하게 어긋납니다.
      </p>

      <h2>덩어리 짓기</h2>
      <p>같은 의미의 요소는 <b>가깝게</b>, 다른 의미는 <b>멀게</b>. 이것만 지켜도 보더 없이 구조가 읽힙니다.</p>
      <div class="demo" style="border-radius:var(--r-ct)">
        <div style="display:flex;gap:40px;flex-wrap:wrap">
          <div>
            <div style="font-size:var(--text-2xs);font-weight:600;color:var(--success-text);margin-bottom:10px">좋음</div>
            <div class="field" style="width:200px">
              <label style="margin-bottom:6px">이름</label>
              <input class="input" placeholder="Acme Inc." />
              <div class="hint" style="margin-top:6px">라벨-입력-힌트가 6px로 붙어 한 덩어리</div>
            </div>
          </div>
          <div>
            <div style="font-size:var(--text-2xs);font-weight:600;color:var(--error-text);margin-bottom:10px">나쁨</div>
            <div style="width:200px">
              <label style="display:block;font-size:13px;font-weight:500;margin-bottom:16px">이름</label>
              <input class="input" style="width:100%" placeholder="Acme Inc." />
              <div class="hint" style="margin-top:16px">전부 16px — 무엇이 한 덩어리인지 안 보임</div>
            </div>
          </div>
        </div>
      </div>

      <h2>화면 골격</h2>
      <div class="sp-shell" aria-hidden="true">
        <div class="sp-gnb"><b>GNB</b><span>268</span></div>
        <div class="sp-panel">
          <div class="sp-title">화면 제목 <span>위 18 · 좌우 20</span></div>
          <div class="sp-block">다음 블록 <span>위 16</span></div>
          <div class="sp-cards"><i></i><i></i><i></i><i></i></div>
          <span class="sp-inset">캔버스 인셋 8</span>
        </div>
      </div>
      <table>
        <thead><tr><th>영역</th><th>값</th></tr></thead>
        <tbody>
          <tr><td>셸</td><td><code>--canvas</code> 바탕 + 패널(<code>--card</code>) <code>8</code> 인셋 · GNB <code>268</code></td></tr>
          <tr><td>패널 좌우 여백</td><td><code>20</code> 하나 — 목록 · 판 · 한 칸 화면 모두 (글자 시작점이 화면마다 움직이지 않게)</td></tr>
          <tr><td>화면 제목 줄</td><td>20 · 600 · 위 <code>18</code> · 아래 여백은 다음 블록의 위 <code>16</code>이 맡음</td></tr>
          <tr><td>요약 카드 줄</td><td>4열 · 사이 <code>12</code> · 카드 안 위아래 <code>14</code> 좌우 <code>16</code> · 줄 사이 <code>6</code></td></tr>
          <tr><td>읽는 글 최대 너비</td><td><code>--measure</code> <span data-var="--measure"></span> — 에이전트 응답 · 설명 문단</td></tr>
          <tr><td>문서 · 상세 최대 너비</td><td><code>760</code> ~ <code>900</code></td></tr>
        </tbody>
      </table>
      <p>
        <b>표와 데이터 화면은 최대 너비를 두지 않습니다</b> — 넓을수록 좋습니다.
        컨트롤 · 표 줄 높이는 <a href="#/foundation/density">밀도</a>에 있습니다.
      </p>

      <h2>문서형 화면의 층 간격</h2>
      <p>
        보고서 · 평가 · 프로파일링처럼 <b>절이 층으로 쌓이는 화면</b>은 층을 여백 차이로 말합니다 —
        이 차이 자체가 어디까지가 한 덩어리인지를 알려 줍니다.
      </p>
      <table>
        <thead><tr><th>사이</th><th>값</th></tr></thead>
        <tbody>
          <tr><td>대분류 ↔ 대분류 (20 · 600)</td><td><code>44</code></td></tr>
          <tr><td>문서 머리 → 첫 대분류</td><td><code>32</code></td></tr>
          <tr><td>소분류 ↔ 소분류 (16 · 600 — 카드 하나)</td><td><code>28</code></td></tr>
          <tr><td>대분류 → 첫 소분류</td><td><code>18</code></td></tr>
          <tr><td>소분류 → 그 내용</td><td><code>10</code></td></tr>
        </tbody>
      </table>
      <p>
        층 간격은 <b>한 곳에서만</b> 냅니다(절 · 덩어리 · 머리 중 하나). 내용이 제 안여백을 더하므로
        바꾼 뒤에는 <b>그려진 것 기준으로</b> 잽니다.
      </p>

      <h2>줄 바꿈 지점</h2>
      <table>
        <thead><tr><th>지점</th><th>바뀌는 것</th></tr></thead>
        <tbody>
          <tr><td><code>1100px</code></td><td>요약 카드 4열 → 2열</td></tr>
          <tr><td><code>900px</code></td><td>GNB 숨김 · 캔버스 인셋 사방 8</td></tr>
          <tr><td><code>760px</code></td><td>2 · 3열 리포트 그리드 → 1열</td></tr>
        </tbody>
      </table>
      <p>
        <b>관리자 콘솔은 데스크톱 전용입니다.</b> 패널 안 카드 묶음은 화면 폭이 아니라
        <b>패널 폭</b>을 보고 바뀌도록 <code>@container</code>로 같은 지점(760 · 900)을 씁니다.
        카드 나열은 <code>repeat(auto-fill, minmax(…, 1fr))</code>로 내용이 스스로 줄 바꾸게 둡니다.
        표는 열을 빼지 않고 <b>가로 스크롤</b>로 둡니다 — 열을 빼면 정보가 사라집니다.
      </p>
    </div>`
}

/* ════════════════════════════════════════ */
export function fdShape() {
  return `
    <div class="page-head"><h1>Radius &amp; Border</h1></div>
    <p class="page-lead">
      <b>1px 보더가 이 시스템의 유일한 구분 장치입니다.</b>
      그림자를 안 쓰기로 한 순간, 보더가 그 역할을 전부 떠맡습니다.
    </p>
    <div class="prose">
      <h2>Radius</h2>
      <div class="radiusrow">
        <div><div class="rd" style="border-radius:var(--r-in)"></div><code>--r-in</code><span>4px</span><em>요소 안쪽 — 체크박스, 작은 칩, 키캡</em></div>
        <div><div class="rd" style="border-radius:var(--r-el)"></div><code>--r-el</code><span>6px</span><em>요소 — 버튼, 입력, 메뉴 항목, 조건 칩</em></div>
        <div><div class="rd" style="border-radius:var(--r-ct)"></div><code>--r-ct</code><span>10px</span><em>컨테이너 — 카드, 패널, 다이얼로그, 상세 표</em></div>
        <div><div class="rd" style="border-radius:var(--r-full)"></div><code>--r-full</code><span>9999px</span><em>원형 — 아바타, 스위치</em></div>
      </div>
      <p>
        <b>요소 6 / 컨테이너 10 두 단</b>이 위계를 만들고, 그 안쪽만 4를 씁니다.
        <code>--r-sm</code> · <code>--r-md</code> · <code>--r-lg</code> · <code>--r-xl</code>은 옛 4단(4/6/8/12)의
        별칭으로 남아 있을 뿐입니다(<code>--r-lg</code>는 이제 6). 새 코드에는 쓰지 않습니다.
        <b>px로 직접 쓰지 마세요</b> — 하드코딩 라운드가 남아 버튼이 8, 카드가 12 · 16으로 제각각이던 적이 있습니다.
      </p>
      <p>
        <b>중첩 규칙</b> — 안쪽 요소의 radius는 바깥보다 작거나 같아야 합니다.
        컨테이너(10) 안의 버튼(6), 버튼 안의 키캡(4)처럼. 반대가 되면 모서리가 어긋나 보입니다.
      </p>

      <h2>Border</h2>
      <table>
        <thead><tr><th>토큰</th><th>쓰는 곳</th></tr></thead>
        <tbody>
          <tr><td><code>--border-subtle</code></td><td>목록 행 사이 구분선 (반투명 — 유일한 알파 보더)</td></tr>
          <tr><td><code>--border</code></td><td>카드 · 패널 · 표(머리 밑줄 · 행 선) · 버튼 · 입력 · 탭 줄</td></tr>
          <tr><td><code>--input</code></td><td>한 단 강한 선 — 키캡 · 이용자 화면 표 머리 밑줄</td></tr>
          <tr><td><code>--border-emphasized</code></td><td>입력 · 컨트롤의 호버 · 체크박스 테두리</td></tr>
          <tr><td><code>--primary</code></td><td>포커스 · 활성(<code>--nav-active</code>)</td></tr>
        </tbody>
      </table>
      <p>
        <b>불투명 실선입니다</b> (#e4e4e7 · #d6d6da · #c9c9cd). 회색 번호를 직접 쓰지 않습니다.
        <code>--border-strong</code> · <code>--border-hover</code>는 <code>--input</code> · <code>--border-emphasized</code>의 옛 별칭입니다.
      </p>
      <p>
        <b>두께는 항상 1px입니다.</b> 2px 보더는 강조가 아니라 소음이 됩니다.
        강조가 필요하면 보더 색을 진하게 하거나 배경을 바꿉니다.
      </p>

      <h2>구분선 vs 여백</h2>
      <div class="dodont">
        <div class="dd do">
          <span class="dd-tag">선을 긋습니다</span>
          <ul>
            <li>목록·테이블의 행 사이</li>
            <li>패널의 헤더와 본문 사이</li>
            <li>서로 다른 성격의 영역 경계</li>
          </ul>
        </div>
        <div class="dd dont">
          <span class="dd-tag">여백으로 충분합니다</span>
          <ul>
            <li><b>섹션 사이 — 선을 긋지 않습니다.</b> 위 여백 + 제목 굵기가 그룹을 만듭니다</li>
            <li><b>밑줄 탭 아래</b> — 탭 줄이 이미 1px 선입니다. 또 그으면 선 두 개 사이에 죽은 띠가 생깁니다</li>
            <li>카드가 이미 보더를 가진 경우 그 안쪽</li>
            <li>제목과 본문 사이</li>
          </ul>
        </div>
      </div>
    </div>`
}

/* ════════════════════════════════════════ */
export function fdElevation() {
  return `
    <div class="page-head"><h1>Elevation</h1></div>
    <p class="page-lead">
      <b>페이지 안에 놓인 것은 그림자 없이 1px 선으로</b> 구분합니다.
      그림자는 페이지 위에 <b>떠 있는 것</b>에만, 정해진 토큰으로만 씁니다.
    </p>
    <div class="prose">
      <h2>규칙</h2>
      <table>
        <thead><tr><th>상황</th><th>처리</th></tr></thead>
        <tbody>
          <tr><td>페이지 안에 놓인 모든 것 (카드 · 표 · 패널)</td><td>그림자 없음. <code>1px solid var(--border)</code></td></tr>
          <tr><td>페이지 위에 <b>떠 있는</b> 것</td><td>아래 그림자 토큰 중 하나. rgba를 직접 적지 않습니다</td></tr>
        </tbody>
      </table>

      <h2>그림자 토큰과 쓰는 곳</h2>
      <table>
        <thead><tr><th>토큰</th><th>쓰는 곳</th></tr></thead>
        <tbody>
          <tr><td><code>--shadow-sm</code></td><td>컨트롤 살짝 — 슬라이더 손잡이 · 바닥에 붙박인 줄(<code>--shadow-up-sm</code>)</td></tr>
          <tr><td><code>--shadow-md</code></td><td>카드 hover · 작은 팝</td></tr>
          <tr><td><code>--shadow-lg</code></td><td>팝오버(필터 · 고르개 목록) · 토스트</td></tr>
          <tr><td><code>--shadow-xl</code></td><td>다이얼로그 · 상세 검색 패널 · 달력 팝</td></tr>
          <tr><td><code>--shadow-overlay</code></td><td>1px 윤곽 + 근거리 + 원거리 3겹 — 메뉴 · 알림 패널 · 파일 고르개</td></tr>
          <tr><td><code>--shadow-drawer</code></td><td>오른쪽에서 밀려 나오는 서랍 — 그림자가 왼쪽으로 눕습니다</td></tr>
          <tr><td><code>--scrim</code></td><td>모달 뒤 가림막 (검정 40%)</td></tr>
        </tbody>
      </table>
      <p>그림자는 다크에서도 <b>검정</b>입니다 — 면이 어두워 같은 알파로는 안 보여 다크 값이 더 진합니다.</p>

      <div class="demo" style="border-radius:var(--r-lg)">
        <div style="display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start">
          <div>
            <div style="font-size:11px;font-weight:600;color:var(--gray-9);margin-bottom:10px;text-transform:uppercase;letter-spacing:.05em">면 — 그림자 없음</div>
            <div class="card" style="width:180px"><h3>카드</h3><p>보더로만 구분</p></div>
          </div>
          <div>
            <div style="font-size:11px;font-weight:600;color:var(--gray-9);margin-bottom:10px;text-transform:uppercase;letter-spacing:.05em">떠 있음 — 그림자 토큰</div>
            <div class="ds-menu-panel" style="width:180px">
              <div class="ds-menu-item">이름 바꾸기</div>
              <div class="ds-menu-item">복제</div>
            </div>
          </div>
        </div>
      </div>

      <h2>다크 모드</h2>
      <p>
        다크에서는 같은 그림자가 거의 보이지 않으므로 토큰의 다크 값이 알파를 올립니다(<code>.3~.6</code>).
        면의 위계는 라이트와 반대입니다 — 콘텐츠 면 <code>--card</code>(#101013)가
        캔버스 <code>--canvas</code>(#181818)보다 <b>어둡습니다</b>. 읽는 면의 글자 대비를 높이려는 것입니다.
      </p>

      <h2>깊이가 정말 필요하면</h2>
      <ol>
        <li>먼저 <b>여백</b>으로 분리해봅니다.</li>
        <li>그다음 <b>보더</b>를 긋습니다.</li>
        <li>그다음 <b>배경 한 단계</b>(gray-1 ↔ gray-2)를 바꿉니다.</li>
        <li>그래도 안 되면 — 대개 레이아웃이 잘못된 것입니다.</li>
      </ol>
    </div>`
}

/* ════════════════════════════════════════ */
export function fdDensity() {
  return `
    <div class="page-head"><h1>Density</h1></div>
    <p class="page-lead">
      밀도는 화면마다 고르는 값이 아니라 <b>정해진 높이 한 벌</b>입니다.
      같은 자리의 줄이 화면마다 다르면 오갈 때 표가 출렁입니다.
    </p>
    <div class="prose">
      <h2>높이 한 벌</h2>
      <table>
        <thead><tr><th>자리</th><th>높이</th><th>글자</th></tr></thead>
        <tbody>
          <tr><td>버튼 · 입력 · 세그먼티드 (기본)</td><td><code>32px</code></td><td>13 · 14px</td></tr>
          <tr><td>작은 버튼 (<code>sm</code>) · 조건 칩</td><td><code>28px</code></td><td>12 · 13px</td></tr>
          <tr><td>큰 버튼 (<code>lg</code>) — 로그인 제출 · 이용자 목록 화면의 큰 검색칸만</td><td><code>40px</code></td><td>14px</td></tr>
          <tr><td><b>목록 표의 줄</b></td><td><code>52px</code></td><td>14px</td></tr>
          <tr><td><b>목록 표의 머리</b> — sticky · 아래 1px 선</td><td><code>40px</code></td><td>13px / 600</td></tr>
          <tr><td>밑줄 탭</td><td><code>40px</code></td><td>14px</td></tr>
          <tr><td>상세 · 카드 안의 키–값 표 (<code>.jt</code>)</td><td>줄 <code>46px</code> · 머리 <code>38px</code></td><td>14 · 13px</td></tr>
          <tr><td>메뉴 항목</td><td><code>32px</code></td><td>14px</td></tr>
        </tbody>
      </table>

      <div class="demo" style="border-radius:var(--r-ct)">
        <div class="table-wrap" style="width:100%"><table>
          <thead><tr><th style="height:40px;font-size:13px;font-weight:600">파일명</th></tr></thead>
          <tbody>
            ${['계약서_최종.pdf', 'Q3_실적.xlsx', '회의록.docx'].map((f) =>
              `<tr><td style="height:52px;font-size:14px">${f}</td></tr>`).join('')}
          </tbody>
        </table></div>
      </div>

      <h2>규칙</h2>
      <ul>
        <li><b>34 · 42 · 50 같은 밀도 단계를 화면마다 고르지 않습니다.</b> 목록 표는 어디서나 52 / 40입니다.
            밀도를 바꾸려면 화면이 아니라 공용 표부터 바꿉니다.</li>
        <li>메뉴 · 목록 안 요소 높이는 <b>4의 배수</b>로 둡니다 — 배율 125% · 150%에서 1px 선이 흐려지지 않게.</li>
        <li>Vuetify <code>density</code> prop은 래핑한 컴포넌트 안에서만 의미가 있습니다. 화면 규격은 위 표가 정합니다.</li>
      </ul>
    </div>`
}

/* ════════════════════════════════════════ */
export function fdIconography() {
  return `
    <div class="page-head"><h1>Iconography</h1></div>
    <p class="page-lead">Lucide 하나, 크기 3개, stroke 2.</p>
    <div class="prose">
      <p>
        <b>적용 완료</b> — <code>@lucide/vue</code>를 등록하고
        <code>DsIcon</code> 컴포넌트와 아이콘 레지스트리(<code>vue/icons.ts</code>)를 만들었습니다.
        라이브 갤러리의 <b>Iconography</b> 섹션에서 등록된 아이콘 전체를 볼 수 있습니다.
      </p>

      <h2>의미로 부릅니다</h2>
      <p>
        Lucide의 아이콘 이름이 아니라 <b>우리 어휘</b>로 부릅니다.
        <code>Trash2</code>가 아니라 <code>delete</code>, <code>Bot</code>이 아니라 <code>agent</code>입니다.
        나중에 세트를 바꾸더라도 화면 코드는 그대로 둘 수 있습니다.
      </p>
      <pre><code>import { DsIcon } from '~/design/icon'

&lt;DsIcon name="delete" /&gt;
&lt;DsIcon name="agent" size="lg" /&gt;
&lt;DsIcon name="loading" spin /&gt;
&lt;DsIcon name="search" label="검색" /&gt;   &lt;!-- 뜻을 전달하면 label 필수 --&gt;</code></pre>
      <p>
        등록은 <code>vue/icons.ts</code> 한 곳에서 합니다.
        필요한 아이콘이 없으면 거기에 <b>의미 이름</b>으로 추가합니다.
        Lucide 5,845개 중 실제로 쓰는 것만 번들에 들어갑니다.
      </p>

      <h2>슬롯으로 받습니다</h2>
      <p>
        <code>DsFileRow</code>·<code>DsNavList</code>처럼 아이콘이 들어가는 컴포넌트는
        아이콘을 <b>슬롯</b>으로 받습니다. 그래야 Standalone 컴포넌트가
        Lucide에 의존하지 않게 됩니다.
      </p>
      <pre><code>&lt;DsFileRow name="계약서_최종.pdf" meta="2.1 MB"&gt;
  &lt;template #icon&gt;&lt;DsIcon name="document" size="sm" /&gt;&lt;/template&gt;
&lt;/DsFileRow&gt;</code></pre>

      <h2>세트 — Lucide</h2>
      <table>
        <thead><tr><th>항목</th><th>값</th></tr></thead>
        <tbody>
          <tr><td>패키지</td><td><code>@lucide/vue</code> — 이 시스템의 <b>유일한 외부 의존성</b></td></tr>
          <tr><td>라이선스</td><td>ISC (상업적 사용 가능)</td></tr>
          <tr><td>개수</td><td>1,600+ — 드라이브·검색까지 충분</td></tr>
          <tr><td>선 굵기</td><td>2px 고정</td></tr>
        </tbody>
      </table>
      <p>
        <b>세트는 하나만 씁니다.</b> 현재 앱에 <code>@mdi/font</code>·<code>@mdi/js</code>·
        <code>material-symbols</code> 3종이 섞여 있는데, 굵기와 광학 크기가 달라
        같은 줄에 놓으면 어긋나 보입니다. 하나로 정리합니다.
      </p>
      <p>
        웹폰트(<code>@mdi/font</code>, 1MB+) 대신 <b>컴포넌트 방식</b>을 씁니다.
        쓰는 아이콘만 번들에 들어갑니다.
      </p>

      <h2>등록된 아이콘 ${ICON_NAMES.length}개</h2>
      <p>
        Lucide 5,845개 중 <b>실제로 쓰는 것만</b> 우리 어휘로 등록했습니다.
        필요한 아이콘이 없으면 <code>vue/icons.ts</code>에 의미 이름으로 추가합니다.
      </p>
      <div class="fd-icons">
        ${ICON_NAMES.map((n) => `<div class="fd-ic">${ic(n)}<span>${n}</span></div>`).join('')}
      </div>

      <h2>크기</h2>
      <div class="fd-icsizes">
        <div>${ic('search', 'sm')}<span>sm · 16</span></div>
        <div>${ic('search', 'md')}<span>md · 20</span></div>
        <div>${ic('search', 'lg')}<span>lg · 24</span></div>
        <div>${ic('loading', 'md', 'spin')}<span>spin</span></div>
      </div>
      <table>
        <thead><tr><th>크기</th><th>쓰는 곳</th></tr></thead>
        <tbody>
          <tr><td><code>16px</code></td><td>인라인 — 텍스트 옆, 배지 안, 작은 버튼</td></tr>
          <tr><td><code>20px</code></td><td><b>기본</b> — 버튼, 메뉴 항목, 내비게이션</td></tr>
          <tr><td><code>24px</code></td><td>강조 — 빈 상태, 배너</td></tr>
        </tbody>
      </table>
      <p>그 사이 값(18px, 22px)은 쓰지 않습니다. 픽셀 그리드가 어긋나 흐려집니다.</p>

      <h2>색</h2>
      <p>
        아이콘은 <b>옆에 있는 글자와 같은 색</b>을 씁니다.
        보조 텍스트 옆이면 <code>--gray-11</code>, 본문 옆이면 <code>--gray-12</code>.
        아이콘만 브랜드 색으로 칠하지 않습니다.
      </p>

      <h2>규칙</h2>
      <div class="dodont">
        <div class="dd do">
          <span class="dd-tag">해야 할 것</span>
          <ul>
            <li>아이콘만 있는 버튼에는 <b><code>aria-label</code> 필수</b></li>
            <li>뜻이 분명하지 않으면 Tooltip을 함께</li>
            <li>같은 뜻에는 항상 같은 아이콘</li>
          </ul>
        </div>
        <div class="dd dont">
          <span class="dd-tag">하지 말 것</span>
          <ul>
            <li>아이콘만으로 상태를 구분 (색맹·시각 장애)</li>
            <li>장식용 아이콘 — 뜻이 없으면 뺍니다</li>
            <li>두 세트를 섞어 쓰기</li>
          </ul>
        </div>
      </div>
    </div>`
}

/* ════════════════════════════════════════ */
export function fdMotion() {
  return `
    <div class="page-head"><h1>Motion</h1></div>
    <p class="page-lead">
      <b>거의 움직이지 않습니다.</b> 움직인다면 짧고, 이유가 있어야 합니다.
      업무 도구에서 애니메이션은 대부분 대기 시간입니다.
    </p>
    <div class="prose">
      <h2>시간</h2>
      <table>
        <thead><tr><th>값</th><th>쓰는 곳</th></tr></thead>
        <tbody>
          <tr><td><code>0ms</code></td><td>즉시 반영되어야 하는 것 — 체크박스, 탭 전환 내용</td></tr>
          <tr><td><code>160ms</code></td><td><b>기본</b> — 호버, 보더 색, 배경 변화</td></tr>
          <tr><td><code>200ms</code></td><td>테마 전환, 패널 열고 닫기</td></tr>
          <tr><td><code>240ms</code></td><td>최대. 이보다 길면 느리게 느껴집니다.</td></tr>
        </tbody>
      </table>
      <div class="demo" style="border-radius:var(--r-lg)">
        <div class="row">
          <button class="btn btn-secondary">호버해보세요 — 160ms</button>
          <input class="input" placeholder="포커스해보세요" style="width:200px" />
        </div>
      </div>

      <h2>가속</h2>
      <p>
        기본은 <code>ease</code> 하나입니다. 커스텀 베지어 곡선을 만들지 않습니다.
        <code>linear</code>는 쓰지 않습니다 — 기계적으로 느껴집니다.
        오버레이는 <b>fade만</b> 씁니다 — Vuetify 기본인 scale 전환을
        <code>defaults.ts</code>에서 <code>fade-transition</code>으로 바꾼 이유입니다.
      </p>

      <h2>움직여도 되는 것</h2>
      <table>
        <thead><tr><th>움직임</th><th>이유</th></tr></thead>
        <tbody>
          <tr><td>호버 · 포커스 색 변화</td><td>조작 가능함을 알림</td></tr>
          <tr><td>오버레이 fade</td><td>어디서 나타났는지 알림</td></tr>
          <tr><td>스켈레톤 셔머</td><td>멈춘 게 아니라 기다리는 중임을 알림</td></tr>
          <tr><td>스트리밍 커서 깜빡임</td><td>아직 생성 중임을 알림</td></tr>
          <tr><td>툴콜 스피너</td><td>도구가 실행 중임을 알림</td></tr>
        </tbody>
      </table>
      <p>공통점은 하나입니다 — <b>전부 상태를 알리는 움직임</b>입니다. 장식은 없습니다.</p>

      <h2>하지 않는 것</h2>
      <ul>
        <li><b>리플(ripple)</b> — <code>defaults.ts</code>에서 전역으로 껐습니다.</li>
        <li><b>페이지 전환 애니메이션</b> — 화면 이동은 즉시.</li>
        <li><b>목록 항목 등장 애니메이션</b> — 20행이 순차로 나타나면 읽기 시작이 늦어집니다.</li>
        <li><b>바운스·스프링</b> — 업무 도구의 인상과 맞지 않습니다.</li>
      </ul>

      <h2>접근성</h2>
      <p>움직임에 민감한 사용자를 위해 시스템 설정을 존중합니다.</p>
      <pre><code>@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
  }
}</code></pre>
    </div>`
}

/* ════════════════════════════════════════ */
export function fdState() {
  return `
    <div class="page-head"><h1>State</h1></div>
    <p class="page-lead">화면 상태 5종 + 인터랙션 상태. 처음부터 전부.</p>
    <div class="prose">
      <h2>화면 상태 5종</h2>
      <p>모든 목록·테이블·검색 화면은 이 다섯을 전부 가집니다.</p>
      <table>
        <thead><tr><th>상태</th><th>무엇</th><th>쓰는 컴포넌트</th></tr></thead>
        <tbody>
          <tr><td><code>default</code></td><td>데이터가 정상적으로 있는 상태</td><td>—</td></tr>
          <tr><td><code>loading</code></td><td>불러오는 중</td><td>Skeleton (에이전트 작업이면 ThinkingIndicator)</td></tr>
          <tr><td><code>empty</code></td><td>데이터가 없음</td><td>EmptyState — <b>다음 행동을 반드시 제안</b></td></tr>
          <tr><td><code>error</code></td><td>불러오기 실패</td><td>Alert + 재시도 버튼</td></tr>
          <tr><td><code>partial</code></td><td>일부만 성공</td><td>Alert(warning) + 성공한 데이터는 그대로 표시</td></tr>
        </tbody>
      </table>
      <p>
        <b><code>partial</code>을 빠뜨리기 쉽습니다.</b>
        에이전트 제품에서는 "문서 10건 중 7건만 읽었다" 같은 상황이 흔합니다.
        전부 실패로 처리하면 읽은 7건이 낭비되고, 성공으로 처리하면 사용자가 속습니다.
      </p>

      <h3>빈 상태를 나누기</h3>
      <table>
        <thead><tr><th>종류</th><th>문구 예</th></tr></thead>
        <tbody>
          <tr><td>아직 만든 적 없음</td><td>"에이전트가 없습니다 — 첫 에이전트를 만들어 시작하세요"</td></tr>
          <tr><td>검색 결과 없음</td><td>"'회의록 2019'에 대한 결과가 없습니다 — 검색어를 바꾸거나 필터를 해제하세요"</td></tr>
          <tr><td>필터로 걸러짐</td><td>"조건에 맞는 항목이 없습니다" + <b>필터 해제 버튼</b></td></tr>
          <tr><td>권한 없음</td><td>"이 폴더를 볼 권한이 없습니다" + 권한 요청 버튼</td></tr>
        </tbody>
      </table>
      <p>네 가지를 같은 문구로 처리하면 사용자는 무엇을 해야 할지 알 수 없습니다.</p>

      <h2>인터랙션 상태</h2>
      <p>조작 가능한 모든 요소는 이 상태들을 가집니다. 시각 요소를 절제한 화면에서는 <b>특히 중요합니다</b> — 보더와 그림자를 걷어내면 무엇이 눌리는지 안 보이기 때문입니다.</p>
      <table>
        <thead><tr><th>상태</th><th>표현</th></tr></thead>
        <tbody>
          <tr><td><code>default</code></td><td>기본</td></tr>
          <tr><td><code>hover</code></td><td>면 <code>--overlay-hover</code> 또는 보더 <code>--border → --border-emphasized</code>.
            표의 줄 hover는 <b>눌러서 무언가 열리는 줄(<code>.rowlink</code>)에만</b> — 안 열리는 줄이 밝아지면 상세가 있는 줄로 읽힙니다</td></tr>
          <tr><td><code>focus</code></td><td>아래 세 가지. <b>절대 없애지 않습니다</b></td></tr>
          <tr><td><code>active</code></td><td>한 단계 더 진한 배경</td></tr>
          <tr><td><code>disabled</code></td><td>흐리게(버튼 <code>opacity .45</code>) · 이유는 툴팁으로. 고를 수 없는 칸은 지우지 말고 잠급니다</td></tr>
          <tr><td><code>활성</code> (탭 · 세그먼티드 · 값 걸린 필터 · 조건 칩)</td><td>브랜드 선 + 브랜드 글자(<code>--nav-active</code> · <code>-fg</code>). <b>면은 그대로</b></td></tr>
          <tr><td><code>selected</code> (목록 · 내비 행)</td><td>중립 회색 면 <code>--selected-fill</code>. 브랜드가 아닙니다</td></tr>
        </tbody>
      </table>
      <h3>포커스 — 지금 쓰는 세 가지</h3>
      <table>
        <thead><tr><th>대상</th><th>표현</th></tr></thead>
        <tbody>
          <tr><td>버튼 · 네이티브 체크박스 · 라디오</td><td><code>outline: 2px solid var(--primary)</code> · <code>outline-offset: 1px</code></td></tr>
          <tr><td>입력 · 세그먼티드 · 검색칸</td><td>브랜드 보더 + <code>0 0 0 3px</code> 브랜드 22% 링</td></tr>
          <tr><td>DS 체크박스 · 라디오 부품 · 트리 · 링크</td><td><code>var(--focus-ring)</code> — 배경 2px + 브랜드 2px 이중 링</td></tr>
        </tbody>
      </table>
      <p>세 벌이 섞여 있는 것이 현재 상태입니다. 새 부품은 놓이는 자리의 것을 따릅니다.</p>
      <div class="demo" style="border-radius:var(--r-lg)">
        <div class="row">
          <button class="btn btn-secondary">기본 · 호버 · 클릭해보세요</button>
          <button class="btn" disabled>disabled</button>
          <span class="badge brand">selected</span>
          <input class="input" placeholder="탭 키로 포커스" style="width:180px" />
        </div>
      </div>

      <h2>진행 상태 — 이 제품의 특수 규칙</h2>
      <p>
        원칙 1 — <b>로딩이 아니라 진행을 보여줍니다.</b>
        에이전트 작업은 10~30초씩 걸리므로 일반적인 로딩 표시로는 부족합니다.
      </p>
      <table>
        <thead><tr><th>걸리는 시간</th><th>쓰는 것</th></tr></thead>
        <tbody>
          <tr><td>~2초</td><td>Spinner</td></tr>
          <tr><td>2~10초, 진행률 앎</td><td>ProgressBar (숫자와 함께)</td></tr>
          <tr><td>2~10초, 진행률 모름</td><td>Skeleton</td></tr>
          <tr><td>10초 이상 (에이전트)</td><td><b>ThinkingIndicator + ToolCallStep</b></td></tr>
        </tbody>
      </table>
      <div class="demo" style="border-radius:var(--r-lg)">
        <div class="toolcall"><span class="check">${ic('success','sm')}</span> search_drive("계약서", June) — 3 files found</div>
        <div class="toolcall"><span class="spinner"></span> read_document("계약서_최종.pdf")</div>
        <div class="thinking" style="margin-top:12px"><span class="dots"><i></i><i></i><i></i></span>계약서 조항을 분석하는 중…</div>
      </div>
    </div>`
}

/* ════════════════════════════════════════ */
export function fdA11y() {
  return `
    <div class="page-head"><h1>Accessibility</h1></div>
    <p class="page-lead">
      기준은 <b>WCAG 2.2 AA</b>입니다.
      미니멀은 대비가 낮아지기 쉬워서, 이 시스템에서는 특히 지켜야 합니다.
    </p>
    <div class="prose">
      <h2>색 대비</h2>
      <table>
        <thead><tr><th>대상</th><th>최소 대비</th><th>우리 값</th></tr></thead>
        <tbody>
          <tr><td>본문 텍스트 (<code>gray-12</code> on <code>bg</code>)</td><td>4.5:1</td><td>통과</td></tr>
          <tr><td>보조 텍스트 (<code>gray-11</code>)</td><td>4.5:1</td><td>통과</td></tr>
          <tr><td>약한 텍스트 (<code>gray-9</code>)</td><td>4.5:1</td><td>경계 — 메타 정보에만</td></tr>
          <tr><td>보더·아이콘</td><td>3:1</td><td>아이콘은 글자색 · 보더는 장식 구분(대비 대상 아님)</td></tr>
          <tr><td>브랜드 위 흰 글자</td><td>4.5:1</td><td><b>미달 — 승인된 예외</b> (라이트 3.9:1 · 다크 3.0:1)</td></tr>
        </tbody>
      </table>
      <p>
        <b><code>gray-9</code>보다 연한 색에 의미 있는 정보를 담지 않습니다.</b>
        <code>gray-8</code> 이하는 보더와 비활성 상태 전용입니다.
      </p>

      <h2>포커스</h2>
      <p>
        <b><code>outline: none</code>을 쓰지 않습니다.</b>
        키보드만 쓰는 사용자에게 포커스 링은 마우스 커서와 같습니다.
      </p>
      <pre><code>.btn:focus-visible {                 /* 버튼 · 네이티브 체크박스 · 라디오 */
  outline: 2px solid var(--primary);
  outline-offset: 1px;
}
.input:focus {                       /* 입력 · 세그먼티드 · 검색칸 */
  border-color: var(--primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 22%, transparent);
}
.ds-check__box:has(input:focus-visible) { box-shadow: var(--focus-ring); }   /* DS 부품 */</code></pre>
      <p><code>:focus</code>가 아니라 <code>:focus-visible</code>을 씁니다 — 마우스 클릭 시에는 링이 뜨지 않습니다.</p>

      <h2>키보드</h2>
      <table>
        <thead><tr><th>키</th><th>동작</th></tr></thead>
        <tbody>
          <tr><td><code>Tab</code></td><td>다음 요소. 순서는 화면에 보이는 순서와 같아야 합니다.</td></tr>
          <tr><td><code>Esc</code></td><td>다이얼로그·메뉴 닫기</td></tr>
          <tr><td><code>Enter</code></td><td>기본 액션 실행. 채팅에서는 전송.</td></tr>
          <tr><td><code>Shift+Enter</code></td><td>채팅 입력에서 줄바꿈</td></tr>
          <tr><td><code>↑ ↓</code></td><td>메뉴·목록 이동</td></tr>
        </tbody>
      </table>
      <p>
        다이얼로그와 메뉴의 <b>포커스 트랩</b>은 Vuetify가 처리합니다.
        이것이 <code>VDialog</code>·<code>VMenu</code>를 직접 만들지 않고 감싼 이유입니다.
      </p>

      <h2>색에만 의존하지 않기</h2>
      <div class="dodont">
        <div class="dd dont">
          <span class="dd-tag">하지 말 것</span>
          <ul><li>빨간 점만으로 "실패"를 표시</li><li>빨간 보더만으로 입력 에러 표시</li></ul>
        </div>
        <div class="dd do">
          <span class="dd-tag">해야 할 것</span>
          <ul><li>점 + <b>"실패"</b> 텍스트</li><li>빨간 보더 + <b>에러 메시지 문장</b></li></ul>
        </div>
      </div>

      <h2>스크린 리더</h2>
      <ul>
        <li>아이콘만 있는 버튼 → <code>aria-label</code>(낭독기) + <code>title</code>(눈으로 보는 사람) <b>둘 다</b>. 단 <code>title</code>과 <code>data-tip</code>을 한 요소에 함께 달지 않습니다 — 툴팁이 두 개 뜹니다</li>
        <li>진행 중 영역 → <code>aria-live="polite"</code> (에이전트 응답이 도착할 때 읽어줌)</li>
        <li>장식용 아이콘 → <code>aria-hidden="true"</code></li>
        <li>제목 계층(<code>h1</code>→<code>h2</code>→<code>h3</code>)을 건너뛰지 않기</li>
      </ul>

      <h2>동작 최소화</h2>
      <p><code>prefers-reduced-motion</code>을 존중합니다. <a href="#/foundation/motion">모션 →</a></p>
    </div>`
}

/* ════════════════════════════════════════ */
export function fdWriting() {
  return `
    <div class="page-head"><h1>Writing</h1></div>
    <p class="page-lead">읽고 다음 행동이 떠오르지 않으면 실패입니다 — 명확성 &gt; 접근성 &gt; 일관성 &gt; 간결성.</p>
    <div class="prose">
      <p>
        이 페이지는 <b>UX 라이팅 가이드 v6의 요약</b>입니다.
        원문 6종(원칙과 문체 · 컴포넌트별 문구 템플릿 · 표기 규칙과 금칙 표현 · 도메인 용어집 ·
        AI 적용 지침 · 텍스트 통제)은 <code>6-2. Cogniterm Design System File</code>에 있습니다.
        여기 없는 세부 규칙은 원문을 따릅니다.
      </p>

      <h2>4대 원칙</h2>
      <table>
        <thead><tr><th>원칙</th><th>실무 판단 기준</th></tr></thead>
        <tbody>
          <tr><td><b>명확성</b></td><td>읽고 다음 행동이 떠오르지 않으면 실패</td></tr>
          <tr><td><b>간결성</b></td><td>단어를 지웠을 때 뜻이 안 변하면 그 단어는 불필요</td></tr>
          <tr><td><b>일관성</b></td><td>하나의 개념에는 하나의 표현만 — 용어집에 없는 표현이 화면에 나오면 위반</td></tr>
          <tr><td><b>접근성</b></td><td>용어를 쉬운 말로 바꾸는 게 아니라, <b>알 필요 없는 용어를 화면에서 빼는 것</b></td></tr>
        </tbody>
      </table>
      <p>충돌하면 <b>명확성 &gt; 접근성 &gt; 일관성 &gt; 간결성</b>. 규칙을 지켰는데 문장이 나빠졌다면 문장을 택하고 예외로 기록합니다.</p>

      <h2>문장 작성 5단계 필터</h2>
      <ul>
        <li><b>1. 이 문장이 없어도 되는가?</b> — 제목·레이블·버튼으로 이미 전달되면 통째로 삭제 (1단계에서 걸리면 끝)</li>
        <li><b>2. 한 문장에 한 가지만 담고 있는가?</b> — 접속어가 두 번 나오면 나눕니다</li>
        <li><b>3. 더 짧게 되는가?</b> — "정상적으로 처리가 완료되었습니다" → "저장했습니다"</li>
        <li><b>4. 다음 행동이 분명한가?</b> — 오류·차단·빈 상태는 반드시 행동 제시</li>
        <li><b>5. 다른 화면과 같은 말을 쓰고 있는가?</b> — <a href="#/foundation/wordlist">용어집</a> 표준 용어로 통일</li>
      </ul>

      <h2>서술 원칙 4가지</h2>
      <table>
        <thead><tr><th>원칙</th><th>✗</th><th>✓</th></tr></thead>
        <tbody>
          <tr><td><b>긍정문으로</b> (오류의 "무엇이 안 됐는지"는 예외)</td>
            <td>운영관리자가 아니면 삭제할 수 없습니다</td><td>운영관리자만 삭제할 수 있습니다</td></tr>
          <tr><td><b>상태가 아니라 일어난 일을</b></td>
            <td>마스킹 처리되었습니다</td><td>주민등록번호를 가렸습니다</td></tr>
          <tr><td><b>한 문장에 한 가지만</b></td>
            <td>~삭제되고 ~중단되며 ~없습니다</td><td>세 문장으로 나눔</td></tr>
          <tr><td><b>기능 이름이 아니라 결과를</b></td>
            <td>Sync / Reindex 호출</td><td>지금 수집 / 색인 재생성</td></tr>
        </tbody>
      </table>

      <h2>문체 — 하십시오체로 통일</h2>
      <p>
        <b>기본 문체는 "-합니다" 계열. 해요체·이모지·감탄사 금지.</b>
        B2G 검수 환경에서 해요체는 신뢰를 떨어뜨리고, 콘솔은 밀도가 생명이며, 감사 기록은 문어체가 맞습니다.
      </p>
      <table>
        <thead><tr><th>레지스터</th><th>대상</th><th>핵심 규칙</th></tr></thead>
        <tbody>
          <tr><td><b>A. 운영자 콘솔</b></td><td>관리자·감사</td><td>평서 -합니다 / 지시 -하세요 · 기술 용어 그대로 (운영자는 전문가)</td></tr>
          <tr><td><b>B. 대국민·공공</b></td><td>일반 국민</td><td>평서 -합니다 / 요청 -해 주세요 · 용어는 순화 말고 <b>노출하지 않기</b></td></tr>
          <tr><td><b>C. AI 응답</b></td><td>모든 사용자</td><td>평서 -합니다 · 의인화("제가")·사과 남발 금지 · 근거 표시 필수</td></tr>
        </tbody>
      </table>
      <p><b>과잉 높임 금지</b> — "-시-"는 사용자 행위에만. ✗ 조회하실 수 있습니다 → ✓ 조회할 수 있습니다.</p>

      <h2>컴포넌트별 핵심 패턴</h2>
      <table>
        <thead><tr><th>컴포넌트</th><th>규칙</th><th>예</th></tr></thead>
        <tbody>
          <tr><td>화면 제목</td><td>명사구 최대 3어절 · 설명문은 기본 삭제</td><td>"데이터 수집" (✗ 데이터 수집 관리하기)</td></tr>
          <tr><td>버튼</td><td><b>대상 + 동사, 동사가 끝</b> · 대상이 뻔하면 동사만 · "-하기" 금지 · "확인" 단독 금지 · 마침표 없음</td><td>[사용자 추가] [권한 편집] [저장] [영구 삭제]</td></tr>
          <tr><td>취소/닫기/중단</td><td>하려던 행동을 무르면 <b>취소</b> · 창만 없애면 <b>닫기</b> · 실행 중 작업이면 <b>중단</b></td><td>이탈 모달은 [계속 작성] [나가기]</td></tr>
          <tr><td>폼</td><td>플레이스홀더로 레이블 대체 금지 · 플레이스홀더는 입력 예시만</td><td>레이블 "커넥터 이름" / 예: 국가법령정보센터</td></tr>
          <tr><td>토스트</td><td>{대상} {개수}건을 {액션}했습니다 · "정상적으로/성공적으로" 삭제</td><td>"문서 12건을 삭제했습니다. [실행 취소]"</td></tr>
          <tr><td>다이얼로그</td><td>제목은 "~할까요?" · 본문은 결과 + 복구 불가 명시 · 확인 버튼은 동작을 반복</td><td>제목 "컬렉션을 삭제할까요?" / 버튼 [취소] [영구 삭제]</td></tr>
          <tr><td>오류</td><td><b>무엇이 안 됐는지 + 왜 + 무엇을 하면 되는지</b> · 시스템 원인만 오류 코드</td><td>"색인 서버에 연결하지 못했습니다. 잠시 후 다시 시도하세요. (IDX-503)"</td></tr>
          <tr><td>빈 상태</td><td>없다는 사실 + 다음 행동</td><td>"등록된 커넥터가 없습니다. 커넥터를 추가하면 수집을 시작할 수 있습니다."</td></tr>
          <tr><td>로딩</td><td>3초+ 무엇을 하는 중인지 · 10초+ 진행률/건수 · 마침표 없음</td><td>"문서 320/1,204건 색인 중"</td></tr>
          <tr><td>권한</td><td>권한명 + 요청 대상 명시 · "권한이 없습니다" 단독 금지 · 비활성 버튼엔 툴팁으로 이유</td><td>"이 화면은 보안관리자 권한이 필요합니다. 운영관리자에게 요청하세요."</td></tr>
          <tr><td>상태 배지</td><td>상태(지금 어떤가)와 결과(어떻게 끝났나)는 다른 축 — <a href="#/foundation/wordlist">용어집</a></td><td>상태: 정상 · 일시정지 / 활성 · 비활성 — 결과: 완료 · 확인 필요 · 오류 (✗ 회차에 '정상')</td></tr>
          <tr><td>조작 설명문</td><td>쓰지 않습니다 — 눌린다는 것은 hover가 말합니다</td><td>✗ "행을 누르면 상세가 열립니다"</td></tr>
        </tbody>
      </table>

      <h2>AI 응답</h2>
      <ul>
        <li><b>의인화 금지</b> — "제가 찾아봤어요!" ✗ → "검색 결과 3건입니다." 진행 표시도 "답변 생성 중" (✗ "생각하는 중")</li>
        <li><b>근거와 답변은 항상 분리</b> — 근거 없으면 추측하지 않고 없음을 명시. 답변을 생성하지 않습니다</li>
        <li><b>성능 단정 금지</b> — "정확한", "완벽한", "100%" 금지</li>
        <li><b>결론 먼저</b> — 서두 인사·복창("말씀하신 내용에 대해…") 삭제. 사과는 실제 시스템 실패 시 1회만</li>
      </ul>

      <h2>고정 문구 (Canonical String)</h2>
      <p>여러 화면에 동일하게 등장하는 문구 — 임의로 바꾸지 않고 코드 상수로 관리합니다.</p>
      <table>
        <thead><tr><th>키</th><th>문구</th></tr></thead>
        <tbody>
          <tr><td><code>agent.no_evidence</code></td><td>근거 문서에서 답을 찾지 못했습니다. 질문을 구체적으로 바꾸거나 검색 대상을 넓혀 보세요.</td></tr>
          <tr><td><code>agent.blocked</code></td><td>이 질문에는 답변할 수 없습니다.</td></tr>
          <tr><td><code>agent.placeholder</code></td><td>질문을 입력하세요</td></tr>
          <tr><td><code>wizard.discard</code></td><td>지금 나가면 입력한 내용이 저장되지 않습니다.</td></tr>
          <tr><td><code>destructive.irreversible</code></td><td>복구할 수 없습니다.</td></tr>
          <tr><td><code>permission.required</code></td><td>이 화면은 {권한명} 권한이 필요합니다. {상위권한명}에게 권한을 요청하세요.</td></tr>
          <tr><td><code>empty.no_result</code></td><td>'{검색어}'와 일치하는 문서가 없습니다. 검색어를 줄이거나 기간 필터를 넓혀 보세요.</td></tr>
        </tbody>
      </table>

      <h2>표기 · 문장부호</h2>
      <table>
        <thead><tr><th>항목</th><th>규칙</th></tr></thead>
        <tbody>
          <tr><td>마침표</td><td>완결 문장(본문·토스트·오류)에만. 제목·버튼·레이블·플레이스홀더·배지·로딩 문구에는 없음</td></tr>
          <tr><td>숫자</td><td>천 단위 쉼표 — 1,284</td></tr>
          <tr><td>용량</td><td>2.1 MB — 숫자와 단위 사이 띄어쓰기</td></tr>
          <tr><td>날짜 · 시각</td><td>하이픈만 — 날짜 <code>2026-07-31</code> · 일시 <code>07-31 09:14</code>(연도 없으면 올해) · 기간 <code>~</code> · 점 표기 금지</td></tr>
          <tr><td>피동 금지</td><td>"삭제되었습니다" → "삭제했습니다" (이중피동은 항상 금지)</td></tr>
          <tr><td>영문 고유명사</td><td>원문 그대로 — Vuetify, Pretendard</td></tr>
        </tbody>
      </table>
    </div>`
}

/* ════════════════════════════════════════ */
export function fdWordlist() {
  const T = (rows) => `<table class="wl">
    <thead><tr><th>이렇게 씁니다</th><th>이렇게 쓰지 않습니다</th><th>이유</th></tr></thead>
    <tbody>${rows.map(([a, b, c]) =>
      `<tr><td class="wl-do">${a}</td><td class="wl-dont">${b}</td><td class="wl-why">${c}</td></tr>`).join('')}</tbody>
  </table>`

  return `
    <div class="page-head"><h1>Word List</h1></div>
    <p class="page-lead">
      같은 것을 화면마다 다르게 부르면 사용자는 <b>다른 것이라고 생각합니다</b>.
      제품 전체에서 하나의 어휘를 씁니다.
    </p>
    <div class="prose">
      <p>
        <b>여기 없는 말이 필요하면 추가하고 알립니다.</b>
        혼자 정해서 쓰면 다음 사람이 또 다르게 씁니다.
        영문 컴포넌트 이름과 달리 <b>UI 문구는 전부 한글</b>입니다.
      </p>

      <h2>제품 개념</h2>
      ${T([
        ['에이전트', 'AI, 봇, 어시스턴트', '제품이 파는 것이 "에이전트"입니다. 한 이름으로 고정합니다.'],
        ['실행', '수행, 구동, 돌리기', '에이전트가 일하는 것은 항상 "실행"입니다.'],
        ['실행 기록', '히스토리, 로그, 이력', '사용자에게 보이는 곳은 "실행 기록". "로그"는 감사 로그에만.'],
        ['워크스페이스', '작업 공간, 팀, 조직', '영문 그대로 음차합니다. 이미 널리 쓰입니다.'],
        ['드라이브', '저장소, 파일함', '제품 표면의 이름입니다.'],
        ['문서', '파일, 자료', '드라이브에 있는 것은 "파일", 에이전트가 읽는 것은 "문서".'],
        ['도구', '툴, 기능', '에이전트가 쓰는 것은 "도구"입니다.'],
        ['근거', '출처, 소스, 레퍼런스', '인용 칩이 가리키는 것은 "근거"입니다.'],
      ])}

      <h2>동작</h2>
      ${T([
        ['추가', '만들기, 등록, 새로 만들기', '새 화면은 "추가" — [사용자 추가] [예산 추가]. ⚠ 기존 콘솔 화면은 "생성"(콘솔이 새로 만들어 내는 것: 그룹 · 매핑룰 · 커넥터)과 "추가"가 아직 섞여 있습니다 — 알려진 차이이고 개명하지 않습니다.'],
        ['편집', '수정', '값을 고치는 모드는 "편집" — [권한 편집] → [저장]. "수정"으로 되돌리지 않습니다.'],
        ['저장', '적용, 확인, 완료', '값을 남기는 것은 "저장"입니다.'],
        ['삭제', '제거, 지우기', '영구적으로 없애는 것. Chip에서 빼는 것은 "제거".'],
        ['제거', '삭제, 빼기', '목록에서 빼되 원본은 남는 경우.'],
        ['불러오기', '로드, 가져오기', '외부에서 데이터를 읽어올 때.'],
        ['내보내기', '다운로드, 익스포트, CSV 저장', '표 · 보고서를 파일로 뽑을 때 — 한 낱말.'],
        ['내려받기', '다운로드, 받기', '파일 <b>원본</b>을 받는 동작. 단 권한 이름은 코드를 따라 "다운로드"(DOWNLOAD)를 그대로 씁니다.'],
        ['되돌리기', '취소, 언두, 롤백', 'Snackbar의 Undo 액션.'],
        ['취소', '닫기, 그만두기', '진행 중이던 것을 중단. 다이얼로그의 부(副) 버튼.'],
        ['다시 시도', '재시도, 리트라이', '실패 후 같은 작업을 반복.'],
      ])}

      <h2>상태와 결과 — 두 축을 섞지 않습니다</h2>
      <table>
        <thead><tr><th>축</th><th>붙는 대상</th><th>열 이름</th><th>값</th></tr></thead>
        <tbody>
          <tr><td><b>상태</b> — 지금 어떤가 (계속됨)</td><td>커넥터 · 매핑룰 · 문서 · 계정</td><td>상태</td><td>정상 · 일시정지 / 활성 · 비활성</td></tr>
          <tr><td><b>결과</b> — 어떻게 끝났나 (한 번)</td><td>실행 1회 · 동기화 회차</td><td>결과</td><td>완료 · 확인 필요 · 오류</td></tr>
          <tr><td><b>결과</b> — 파일 1건</td><td>파일 · 문서 한 건</td><td>결과</td><td>완료 · 실패 (구체화 가능: 편입 완료)</td></tr>
        </tbody>
      </table>
      <p><b>회차에 "정상"을 쓰지 않습니다</b> — "정상"은 연결 · 객체에 붙는 말이라 두 층에 같은 낱말이 겹칩니다.</p>

      <h2>에이전트 실행 상태</h2>
      ${T([
        ['대기', '준비, 예약됨, 대기 중', '아직 시작하지 않음.'],
        ['실행 중', '진행 중, 처리 중, 작업 중', '가장 많이 흔들리는 말입니다. "실행 중"으로 고정.'],
        ['완료', '성공, 종료, 끝남', '정상적으로 끝남.'],
        ['실패', '에러, 문제 발생', '사용자에게는 "실패". "에러"는 개발 로그에만. 회차 결과의 "오류"는 위 결과 축의 값입니다.'],
        ['부분 완료', '일부 성공, 부분 성공', '일부만 성공한 상태 — 에이전트 제품에서 자주 나옵니다.'],
        ['중단됨', '정지, 멈춤, 취소됨', '사용자가 멈춘 경우.'],
      ])}

      <h2>사람 · 권한</h2>
      ${T([
        ['구성원', '멤버, 유저', '조직 · 그룹에 속한 사람. 메뉴 이름(구성원 · 권한)과 같은 낱말.'],
        ['사용자', '유저', '계정 하나 · 그 사람 (목록 · 상세의 "사용자", 사용자 ID = 계정 이메일).'],
        ['관리자', '어드민, 매니저', '콘솔 역할. 자원 권한 이름에는 "관리"를 쓰지 않습니다.'],
        ['권한', '퍼미션, 접근 권한', '무엇을 할 수 있는지.'],
        ['공유', '초대, 공유하기', '다른 사람이 볼 수 있게 하는 것.'],
      ])}

      <h2>화면에 내지 않는 말</h2>
      ${T([
        ['회사 전체', '테넌트', '개발 낱말입니다. 범위는 사용자가 아는 말로.'],
        ['라우팅 · 평소 사용 모델', '바인딩', '백엔드 값 이름입니다.'],
        ['직위 · 직책 · 직급', '축', '"축을 모두 껐습니다" ✗ → "직위 · 직책 · 직급을 모두 껐습니다".'],
      ])}

      <h2>문장 규칙</h2>
      <table>
        <thead><tr><th>상황</th><th>규칙</th><th>예</th></tr></thead>
        <tbody>
          <tr><td>안내 문장</td><td><b>~합니다</b> 체</td><td>"모든 구성원에게 표시됩니다."</td></tr>
          <tr><td>버튼</td><td><b>대상 + 동사</b>, 동사가 끝 (대상이 뻔하면 동사만)</td><td>"사용자 추가" "권한 편집" "저장" "삭제"</td></tr>
          <tr><td>지시</td><td><b>~하세요</b></td><td>"올바른 이메일 주소를 입력하세요."</td></tr>
          <tr><td>질문 (다이얼로그 제목)</td><td><b>~할까요?</b></td><td>"에이전트를 삭제할까요?"</td></tr>
          <tr><td>빈 상태 제목</td><td>명사구 — 무엇이 없는지</td><td>"에이전트가 없습니다"</td></tr>
          <tr><td>검색칸 placeholder</td><td><b>&lt;대상&gt; 검색</b> — 군더더기 없이</td><td>"그룹 검색" "부서 검색" (✗ 부서 이름 검색)</td></tr>
          <tr><td>조작 설명</td><td>쓰지 않습니다</td><td>✗ "행을 누르면 …합니다" — hover가 말합니다</td></tr>
          <tr><td>아이콘만 있는 버튼</td><td><code>title</code> + <code>aria-label</code> 둘 다 · <code>title</code>과 <code>data-tip</code>은 함께 달지 않음</td><td>title="더보기"</td></tr>
        </tbody>
      </table>
      <p>
        <b>"~하시겠습니까?"를 쓰지 않습니다.</b> 딱딱하고 깁니다. "~할까요?"가 같은 뜻이면서 짧습니다.<br>
        <b>"죄송합니다"를 쓰지 않습니다.</b> 사과는 정보가 아닙니다 (<a href="#/foundation/writing">UX 라이팅 →</a>).
      </p>

      <h2>한글과 영문이 섞일 때</h2>
      <table>
        <thead><tr><th>대상</th><th>표기</th><th>예</th></tr></thead>
        <tbody>
          <tr><td>제품·기술 고유명사</td><td>원문 그대로</td><td>Vuetify, Pretendard, PDF</td></tr>
          <tr><td>일반화된 외래어</td><td>한글 음차</td><td>워크스페이스, 드라이브, 에이전트</td></tr>
          <tr><td>번역이 자연스러운 것</td><td>한글</td><td>설정, 권한, 실행 기록</td></tr>
          <tr><td>파일 확장자</td><td>소문자</td><td>.pdf, .docx, .xlsx</td></tr>
          <tr><td>단위</td><td>숫자와 띄어쓰기</td><td>2.1 MB, 30초, 128건</td></tr>
        </tbody>
      </table>
      <p>
        <b>조사는 앞말이 정합니다.</b> 값을 끼워 넣는 문장(토스트 · 확인창)은 앞말의 받침으로 조사를 고릅니다
        ('이용'으로 · '팀장'을). <b>"을(를)"처럼 둘 다 적지 않습니다</b> — 기계가 쓴 문장으로 읽힙니다.
        앞말이 한글이 아니면(메일 주소 등) 문장을 바꿔 조사를 피합니다 — "답변은 이메일로 나갑니다 · {메일}".
      </p>

      <h2>숫자와 시각</h2>
      <table>
        <thead><tr><th>대상</th><th>표기</th></tr></thead>
        <tbody>
          <tr><td>개수</td><td>천 단위 쉼표 · "건" — <code>1,284건</code></td></tr>
          <tr><td>용량</td><td>소수 한 자리 · 띄어쓰기 — <code>2.1 MB</code></td></tr>
          <tr><td>날짜</td><td>하이픈 <code>YYYY-MM-DD</code> — <code>2026-07-31</code>. 점 표기(2026.07.31) 금지</td></tr>
          <tr><td>일시</td><td><code>MM-DD HH:MM</code> — <code>07-31 09:14</code> (연도 없는 일시 = 올해)</td></tr>
          <tr><td>상대 시각</td><td>7일 이내면 "2시간 전", 그 이상은 위 표기</td></tr>
          <tr><td>소요 시간</td><td><code>12.4초</code> · <code>1분 20초</code></td></tr>
          <tr><td>범위 · 기간</td><td>물결표 — <code>10~30초</code> · <code>09-01 ~ 09-30</code></td></tr>
          <tr><td>값 없음</td><td><code>—</code> (0이 아닙니다 — "0건"은 잰 결과이고 "—"는 잰 적 없음)</td></tr>        </tbody>
      </table>
    </div>`
}

export const FD_RENDERERS = {
  overview: fdOverview, tokens: fdTokens, color: fdColor, typography: fdTypography,
  spacing: fdSpacing, shape: fdShape, elevation: fdElevation, density: fdDensity,
  iconography: fdIconography, motion: fdMotion, state: fdState, a11y: fdA11y,
  writing: fdWriting, wordlist: fdWordlist,
}
