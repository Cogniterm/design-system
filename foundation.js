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
      <span style="font-size:12px;color:var(--gray-10)">12–30px</span>
    </div>`,
    spacing: `<div style="display:flex;flex-direction:column;gap:5px;width:130px">
      ${[8,16,32,56].map((w) => `<div style="height:8px;width:${w}px;background:var(--brand-subtle);border-left:2px solid var(--brand)"></div>`).join('')}
    </div>`,
    shape: `<div style="display:flex;gap:8px;align-items:flex-end">
      ${['sm','md','lg','xl'].map((r) =>
        `<div style="width:26px;height:26px;border:1px solid var(--brand);background:var(--brand-subtle);border-radius:var(--r-${r})"></div>`).join('')}
    </div>`,
    elevation: `<div style="display:flex;gap:12px;align-items:center">
      <div style="width:44px;height:32px;border:1px solid var(--border);border-radius:var(--r-md);background:var(--surface)"></div>
      <div style="width:44px;height:32px;border-radius:var(--r-md);background:var(--surface);box-shadow:var(--shadow-overlay)"></div>
    </div>`,
    density: `<div style="width:120px;border:1px solid var(--border);border-radius:var(--r-md);overflow:hidden">
      ${[22,28,34].map((h) => `<div style="height:${h}px;border-bottom:1px solid var(--border-subtle);display:flex;align-items:center;padding:0 8px"><div style="width:60%;height:5px;border-radius:3px;background:var(--gray-4)"></div></div>`).join('')}
    </div>`,
    iconography: `<div style="display:flex;gap:10px;color:var(--gray-11)">
      ${ic('agent')}${ic('search')}${ic('folder')}${ic('settings')}
    </div>`,
    motion: `<div style="display:flex;align-items:center;gap:9px;color:var(--gray-10)">
      <span class="spinner"></span>
      <code style="font-family:var(--mono);font-size:11px">160ms ease</code>
    </div>`,
    state: `<div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">
      <span class="badge brand"><span class="dot"></span>실행 중</span>
      <span class="badge danger"><span class="dot"></span>실패</span>
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
    tokens: '모든 값의 단일 원본', color: '브랜드 1 · 회색 12 · 알파 12 · 상태 4',
    typography: 'Pretendard 9단계 — UI와 본문 분리', spacing: '4px 배수 · 역할 열 그리드',
    shape: '4/6/8/12 — 컨트롤과 면의 두 단계', elevation: '그림자 없음 · 떠 있는 것만 예외',
    density: '32/40/48 — 화면 성격별 행 높이', iconography: 'Lucide 59 · stroke 1.5',
    motion: '160ms ease · 상태를 알리는 움직임만', state: '화면 5종 + 인터랙션 6종',
    a11y: 'WCAG 2.2 AA · 포커스 링 · 키보드', writing: '에러는 사과하지 않는다',
    wordlist: '한국어 UI 어휘 고정', i18n: '이름은 영문 · 문구는 한글',
  }

  const cards = FOUNDATION_PAGES.filter(([id]) => id !== 'overview').map(([id, ko, en]) => `
    <a class="cat-card" href="#/foundation/${id}">
      <div class="thumb"><div class="thumb-inner">${THUMBS[id] || ''}</div></div>
      <div class="cat-body">
        <div class="cc-top"><h3>${en}</h3><span class="cc-ko">${ko}</span></div>
        <p>${DESC[id] || ''}</p>
      </div>
    </a>`).join('')

  return `
    <div class="page-head"><h1>Foundation</h1><span class="page-ko">파운데이션</span></div>
    <p class="page-lead">컴포넌트 이전의 결정들.</p>
    <div class="cat-grid" style="margin-top:30px">${cards}</div>`
}

/* ════════════════════════════════════════ */
export function fdTokens() {
  return `
    <div class="page-head"><h1>Design Tokens</h1><span class="page-ko">토큰</span></div>
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
          <tr><td><code>--brand-*</code></td><td>브랜드 색과 그 변형</td><td><code>--brand-hover</code></td></tr>
          <tr><td><code>--gray-1~12</code></td><td>불투명 회색 — 배경·텍스트</td><td><code>--gray-11</code></td></tr>
          <tr><td><code>--gray-a1~a12</code></td><td>반투명 회색 — 보더·오버레이</td><td><code>--gray-a3</code></td></tr>
          <tr><td><code>--border(-subtle/-strong/-hover)</code></td><td>보더 시맨틱</td><td><code>--border</code></td></tr>
          <tr><td><code>--success/warning/danger/info</code></td><td>상태 색 (+ <code>-subtle</code>·<code>-border</code>)</td><td><code>--danger-subtle</code></td></tr>
          <tr><td><code>--r-*</code></td><td>모서리 반경 (sm·md·lg·xl·full)</td><td><code>--r-xl</code></td></tr>
          <tr><td><code>--bg</code> / <code>--surface</code></td><td>페이지 배경 / 요소 면</td><td>—</td></tr>
          <tr><td><code>--sel-bg</code> / <code>--sel-fg</code></td><td>선택 · 활성 상태 (중립)</td><td>활성 내비, 선택 행</td></tr>
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
        같은 이름의 변수를 <code>[data-theme="dark"]</code>에서 덮어씁니다.
        컴포넌트는 테마를 신경 쓰지 않고 <code>var(--gray-3)</code>만 참조합니다.
      </p>
      <pre><code>:root            { --gray-3: #f0f0f3; }   /* 라이트 */
[data-theme="dark"] { --gray-3: #212225; }   /* 다크 */</code></pre>

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

/* ════════════════════════════════════════ */
export function fdColor() {
  /* 토큰 견본 — 클릭하면 이름이 복사됩니다 */
  const sw = (name, note = '') => `
    <button class="tok" data-tok="${name}" title="클릭하면 복사">
      <span class="tok-chip" style="background:var(${name})"></span>
      <span class="tok-name">${name}</span>
      ${note ? `<span class="tok-note">${note}</span>` : ''}
    </button>`

  const scale = (nums, prefix) => `<div class="tok-scale">` +
    nums.map((n) => `
      <button class="tok-step" data-tok="${prefix}${n}" title="${prefix}${n} — 클릭하면 복사">
        <span class="ts-chip" style="background:var(${prefix}${n})"></span>
        <span class="ts-n">${n}</span>
      </button>`).join('') + `</div>`

  const N = [1,2,3,4,5,6,7,8,9,10,11,12]

  return `
    <div class="page-head"><h1>Color</h1><span class="page-ko">컬러</span></div>
    <p class="page-lead">
      브랜드 1 · 회색 12 · 알파 12 · 보더 4 · 상태 4×3 · 차트 6.
      <b>모든 토큰을 클릭하면 이름이 복사됩니다.</b>
    </p>
    <div class="prose">

      <h2>Brand</h2>
      <div class="tok-row">
        ${sw('--brand', '면 — 버튼 배경 · 점')}
        ${sw('--brand-text', '글자 · 링크')}
        ${sw('--brand-hover', '호버')}
        ${sw('--brand-active', '누름')}
        ${sw('--brand-subtle', '연한 면')}
        ${sw('--on-brand', '브랜드 위 글자')}
      </div>
      <p>
        <b>면과 글자를 나눕니다.</b>
        <code>--brand</code>(<code>#1F7FF0</code>)는 브랜드 원색이며 버튼 배경·점·포커스 링처럼
        <b>면</b>에만 씁니다. 흰 배경 위 <b>글자·링크</b>에 쓰면 대비가 부족하므로
        반드시 <code>--brand-text</code>를 씁니다 (5.89:1).
      </p>
      <p>
        <b>브랜드 원색을 그대로 쓰기로 한 결정입니다.</b>
        흰 라벨을 얹으면 3.92:1로 WCAG AA(4.5:1)에 미달합니다 —
        색 일치를 우선한 선택이며, 무결성 검사에도 예외로 기록해 두었습니다.
        비텍스트 UI 기준(3:1)은 통과하므로 점·포커스 링·보더는 문제가 없습니다.
        접근성이 요구되는 화면에서는 primary 버튼 대신 secondary를 쓰거나
        라벨을 크게(18px 이상) 잡으면 기준을 충족합니다.
      </p>
      <div class="dodont">
        <div class="dd do">
          <span class="dd-tag">이럴 때만</span>
          <ul>
            <li>기본 액션 버튼 · 링크</li>
            <li>포커스 링</li>
            <li>진행 중 상태 · 인용 칩</li>
            <li>폼 컨트롤의 켜짐</li>
          </ul>
        </div>
        <div class="dd dont">
          <span class="dd-tag">쓰지 않습니다</span>
          <ul>
            <li><b>선택 · 활성 상태</b> — 내비 · 탭 · 목록은 중립</li>
            <li>페이지 배경 · 카드 보더</li>
            <li>제목 텍스트 · 장식</li>
          </ul>
        </div>
      </div>
      <p>
        선택 · 활성은 <code>--sel-bg</code>(gray-4) · <code>--sel-fg</code>(gray-12)를 씁니다.
        브랜드가 흔해지면 정작 주요 버튼이 눈에 들어오지 않습니다.
      </p>

      <h2>Gray</h2>
      ${scale(N, '--gray-')}
      <p>화면의 95%는 이 12단계입니다. Radix Slate — 라이트/다크 대비가 검증된 차가운 회색.</p>
      <table>
        <thead><tr><th>단계</th><th>역할</th></tr></thead>
        <tbody>
          <tr><td><code>1–2</code></td><td>페이지 · 패널 배경</td></tr>
          <tr><td><code>3</code></td><td>호버 배경</td></tr>
          <tr><td><code>4</code></td><td>선택 배경 (<code>--sel-bg</code>) · 비활성</td></tr>
          <tr><td><code>5–8</code></td><td>면 요소 (스위치 트랙 등) · 비활성 텍스트</td></tr>
          <tr><td><code>9</code></td><td>약한 텍스트 · placeholder</td></tr>
          <tr><td><code>10–11</code></td><td>보조 텍스트</td></tr>
          <tr><td><code>12</code></td><td>본문 텍스트 · 제목</td></tr>
        </tbody>
      </table>
      <p>
        <b>보더는 이 스케일을 쓰지 않습니다</b> — 아래 알파 스케일의 시맨틱 토큰을 씁니다.
      </p>

      <h2>Gray Alpha</h2>
      ${scale(N, '--gray-a')}
      <p>
        반투명 회색. 불투명보다 연하게 얹히고 어떤 배경 위에서도 자연스럽습니다.
        보더·오버레이가 여기서 나옵니다.
      </p>

      <h2>Border</h2>
      <div class="tok-row">
        ${sw('--border-subtle', '행 구분선')}
        ${sw('--border', '카드 · 표')}
        ${sw('--border-strong', '버튼 · 입력')}
        ${sw('--border-hover', '호버')}
      </div>
      <div class="demo" style="border-radius:var(--r-xl)">
        <div style="display:flex;gap:14px;flex-wrap:wrap;width:100%">
          ${['subtle', '', 'strong', 'hover'].map((k) => {
            const t = k ? `--border-${k}` : '--border'
            return `<div style="flex:1;min-width:140px;border:1px solid var(${t});border-radius:var(--r-lg);padding:14px;font-size:var(--text-xs);color:var(--gray-10);font-family:var(--mono)">${t}</div>`
          }).join('')}
        </div>
      </div>
      <p>번호를 직접 고르지 않고 역할로 고릅니다. CI가 <code>1px solid var(--gray-N)</code>을 차단합니다.</p>

      <h2>Status</h2>
      <div class="tok-grid">
        ${[['success', '완료'], ['warning', '확인 필요'], ['danger', '실패 · 파괴적'], ['info', '정보']].map(([k, d]) => `
          <div class="tok-status">
            <div class="tok-status-h">
              <span class="tok-chip" style="background:var(--${k})"></span>
              <b>${k}</b><span>${d}</span>
            </div>
            <div class="tok-status-b">
              <button class="tok-step" data-tok="--${k}"><span class="ts-chip" style="background:var(--${k})"></span><span class="ts-n">solid</span></button>
              <button class="tok-step" data-tok="--${k}-subtle"><span class="ts-chip" style="background:var(--${k}-subtle);border:1px solid var(--border)"></span><span class="ts-n">subtle</span></button>
              <button class="tok-step" data-tok="--${k}-border"><span class="ts-chip" style="background:var(--${k}-border)"></span><span class="ts-n">border</span></button>
            </div>
          </div>`).join('')}
      </div>
      <p>
        상태마다 3단입니다 — <b>solid</b>(글자·점) · <b>subtle</b>(면) · <b>border</b>(테두리).
        면·테두리는 solid에서 파생하므로 다크에서도 자동으로 맞습니다.
      </p>
      <div class="dodont">
        <div class="dd dont">
          <span class="dd-tag">하지 말 것</span>
          <ul><li>색만으로 상태 구분 — 색맹 사용자는 읽을 수 없습니다</li>
              <li>빨강을 화면에 상시 노출 — 진짜 에러가 묻힙니다</li></ul>
        </div>
        <div class="dd do">
          <span class="dd-tag">해야 할 것</span>
          <ul><li>배지처럼 <b>점 + 텍스트</b>를 함께</li>
              <li>진짜 그 상태일 때만</li></ul>
        </div>
      </div>
      <div class="demo" style="border-radius:var(--r-xl)">
        <div class="row">
          <span class="badge"><span class="dot"></span>대기</span>
          <span class="badge brand"><span class="dot"></span>실행 중</span>
          <span class="badge success"><span class="dot"></span>완료</span>
          <span class="badge danger"><span class="dot"></span>실패</span>
        </div>
      </div>

      <h2>대비</h2>
      <p>WCAG 2.2 AA 기준 — 본문 4.5:1, UI 요소·보더 3:1.</p>
      <table>
        <thead><tr><th>조합</th><th>라이트</th><th>다크</th></tr></thead>
        <tbody>
          <tr><td>본문 (<code>gray-12</code>)</td><td>16.4:1</td><td>16.3:1</td></tr>
          <tr><td>보조 텍스트 (<code>gray-11</code>)</td><td>5.9:1</td><td>9.1:1</td></tr>
          <tr><td>링크 (<code>brand-text</code>)</td><td>5.9:1</td><td>7.8:1</td></tr>
          <tr><td>버튼 라벨 (<code>on-brand</code> on <code>brand</code>)</td><td><b>3.9:1 — 미달(승인된 예외)</b></td><td>6.0:1</td></tr>
          <tr><td>상태색</td><td>4.6~5.0:1</td><td>4.8~10.1:1</td></tr>
        </tbody>
      </table>
      <p>
        <code>gray-9</code>(3.3:1)·<code>gray-10</code>(3.8:1)은 본문 기준에 미달합니다 —
        <b>의미 있는 정보를 담지 마세요.</b> placeholder·장식 메타에만 씁니다.
      </p>

      <h2>Chart</h2>
      <div class="tok-row">
        ${[1,2,3,4,5,6].map((n) => sw(`--chart-${n}`)).join('')}
      </div>
      <div class="demo" style="border-radius:var(--r-xl)">
        <div style="display:flex;align-items:flex-end;gap:8px;height:120px;width:100%">
          ${[68, 92, 45, 78, 34, 58].map((h, i) => `
            <div style="flex:1;height:${h}%;background:var(--chart-${i + 1});border-radius:var(--r-sm) var(--r-sm) 0 0"></div>`).join('')}
        </div>
      </div>
      <p>
        계열 색은 <b>순서대로</b> 씁니다 — 1부터 채우고 필요한 만큼만.
        상태색과 겹치지 않아 "빨강 = 실패"의 의미가 차트에서 흐려지지 않습니다.
        7개를 넘으면 색이 아니라 그룹핑이나 하이라이트를 검토합니다.
      </p>

      <h2>Surface</h2>
      <div class="tok-row">
        ${sw('--bg', '페이지 배경')}
        ${sw('--surface', '요소 면')}
        ${sw('--sel-bg', '선택 배경')}
        ${sw('--sel-fg', '선택 글자')}
      </div>
    </div>`
}

/* ════════════════════════════════════════ */
export function fdTypography() {
  const rows = [
    ['4xl', '36px', '600', '랜딩 대표 제목', 'font-size:36px;font-weight:600;letter-spacing:-.03em'],
    ['3xl', '30px', '600', '페이지 제목 (26~32 유동)', 'font-size:30px;font-weight:600;letter-spacing:-.025em'],
    ['2xl', '24px', '600', '페이지 제목', 'font-size:24px;font-weight:600;letter-spacing:-.025em'],
    ['xl', '20px', '600', '섹션 제목', 'font-size:20px;font-weight:600;letter-spacing:-.015em'],
    ['lg', '16px', '600', '작은 제목 · 카드 제목', 'font-size:16px;font-weight:600;letter-spacing:-.01em'],
    ['md', '15px', '400', '읽는 글 본문', 'font-size:15px'],
    ['base', '14px', '400', 'UI 기본 — 버튼 · 입력 · 탭', 'font-size:14px'],
    ['sm', '13px', '400', '조밀한 UI — 표 셀 · 사이드바', 'font-size:13px'],
    ['xs', '12px', '500', '라벨 · 메타 · 표 헤더', 'font-size:12px;font-weight:500'],
    ['2xs', '11px', '600', '마이크로 라벨 · 배지', 'font-size:11px;font-weight:600'],
  ]
  return `
    <div class="page-head"><h1>Typography</h1><span class="page-ko">타이포그래피</span></div>
    <p class="page-lead">
      Pretendard 9단계. <b>위계는 크기보다 굵기와 색으로</b> 만듭니다 —
      크기를 키우면 화면이 커 보이고, 굵기를 바꾸면 위계만 생깁니다.
    </p>
    <div class="prose">
      <p>
        <b>UI와 Prose를 구분합니다.</b>
        조작하는 면(버튼·표·사이드바)은 13~14px로 조밀하게,
        읽는 면(설명·에이전트 응답)은 15px에 줄 간격 1.8로 넉넉하게.
        둘을 같은 크기로 두면 <b>양쪽 다 어중간해집니다</b>.
      </p>

      <h2>스케일</h2>
      <div class="typescale">
        ${rows.map(([n, s, w, use, css]) => `
          <div class="ts-row">
            <div class="ts-meta"><code>--text-${n}</code><span>${s} · ${w}</span></div>
            <div class="ts-sample" style="${css}">문서를 중앙에서 관리하세요</div>
            <div class="ts-use">${use}</div>
          </div>`).join('')}
      </div>
      <p>이 아홉 개 밖의 값은 쓰지 않습니다. CI가 <code>docs.css</code>를 검사해 막습니다.</p>

      <h2>굵기</h2>
      <table>
        <thead><tr><th>토큰</th><th>값</th><th>용도</th></tr></thead>
        <tbody>
          <tr><td><code>--weight-normal</code></td><td>400</td><td>본문 전부</td></tr>
          <tr><td><code>--weight-medium</code></td><td>500</td><td>라벨, 버튼, 강조된 셀, 활성 항목</td></tr>
          <tr><td><code>--weight-semibold</code></td><td>600</td><td>제목</td></tr>
        </tbody>
      </table>
      <p>
        <b>700 이상은 쓰지 않습니다.</b> Pretendard의 600으로 충분히 위계가 생기고,
        더 굵어지면 미니멀한 인상이 깨집니다. Stylelint가 막습니다.
      </p>

      <h2>줄 간격</h2>
      <table>
        <thead><tr><th>토큰</th><th>값</th><th>용도</th></tr></thead>
        <tbody>
          <tr><td><code>--leading-tight</code></td><td>1.3</td><td>제목</td></tr>
          <tr><td><code>--leading-ui</code></td><td>1.5</td><td>표 셀, 사이드바, 카드 설명</td></tr>
          <tr><td><code>--leading-normal</code></td><td>1.62</td><td>기본</td></tr>
          <tr><td><code>--leading-prose</code></td><td>1.8</td><td>읽는 글, 에이전트 응답</td></tr>
        </tbody>
      </table>

      <h2>줄 길이</h2>
      <p>
        읽는 글은 <code>--measure</code>(720px)를 넘기지 않습니다. ch 단위는 한글(전각)에서 좁게 잡혀 px로 고정합니다.
        한 줄이 너무 길면 다음 줄 첫 글자를 찾기 어려워집니다.
        표와 데이터 화면은 예외입니다 — 넓을수록 좋습니다.
      </p>

      <h2>글꼴</h2>
      <p>
        <b>설치가 필요합니다.</b> <code>npm install pretendard</code> 후
        <code>pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css</code>를 등록하세요.
        빠뜨리면 에러 없이 조용히 시스템 글꼴로 렌더됩니다.
        <br><span style="color:var(--gray-9);font-size:var(--text-xs)">라이선스 SIL OFL 1.1 — 재배포 가능, 판매 금지</span>
      </p>
      <table>
        <thead><tr><th>토큰</th><th>글꼴</th><th>용도</th></tr></thead>
        <tbody>
          <tr><td><code>--font</code></td><td>Pretendard Variable</td><td>UI 전부. 한글·영문·숫자가 한 벌로 어울립니다.</td></tr>
          <tr><td><code>--mono</code></td><td>시스템 고정폭 (SF Mono · Consolas)</td><td>코드, 툴콜, 시각, IP, 파일 크기</td></tr>
        </tbody>
      </table>
      <p>
        <b>고정폭 글꼴을 쓰는 기준</b> — 세로로 자릿수를 맞춰 읽어야 하는 값.
        시각·용량·ID·코드가 여기 해당합니다. 사람 이름이나 문서 제목은 아닙니다.
      </p>

      <h2>한글에서 주의할 것</h2>
      <ul>
        <li><b>letter-spacing을 양수로 주지 않습니다.</b> 한글은 자간이 벌어지면 단어 경계가 무너집니다. 제목에만 <code>-0.01~-0.03em</code>을 씁니다.</li>
        <li><b>대문자 변환(uppercase)을 쓰지 않습니다.</b> 한글에는 대문자가 없어 영문만 튀어 보입니다. Vuetify 기본값을 <code>defaults.ts</code>에서 해제했고, Stylelint가 막습니다.</li>
        <li><b>줄바꿈은 <code>word-break: keep-all</code></b>을 기본으로 합니다. 단어 중간에서 끊기지 않습니다.</li>
      </ul>

      <h2>마이크로 라벨 — 대문자 대신</h2>
      <p>
        표 헤더·섹션 라벨 같은 작은 라벨에 <b>대문자 + 벌어진 자간</b>을 쓰면
        전형적인 "관리자 템플릿" 인상이 됩니다. Geist 계열은 쓰지 않습니다.
        대신 <b>한 단계 작은 크기(12px) + medium 굵기 + 회색</b>으로 위계를 만듭니다.
      </p>
      <div class="dodont">
        <div class="dd do"><span class="dd-tag">이렇게</span><ul>
          <li>표 헤더: 12px · 500 · <code>gray-10</code> · 소문자 그대로</li>
          <li>섹션 라벨: 12px · 500 · <code>gray-9</code></li>
        </ul></div>
        <div class="dd dont"><span class="dd-tag">이렇지 않게</span><ul>
          <li><span style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.07em">Section Title</span> — 템플릿 인상</li>
          <li>11px 미만 + 양수 자간 조합</li>
        </ul></div>
      </div>

      <h2>숫자 — tabular-nums</h2>
      <p>
        시각·용량·건수처럼 <b>세로로 놓이는 숫자</b>는 자리 폭이 같아야 흔들리지 않습니다.
        <code>.mono</code>·<code>code</code>·통계 숫자에는
        <code>font-variant-numeric: tabular-nums</code>가 자동 적용됩니다.
      </p>
    </div>`
}

/* ════════════════════════════════════════ */
export function fdSpacing() {
  const scale = [0, 4, 8, 12, 16, 24, 32, 48, 64]
  return `
    <div class="page-head"><h1>Spacing &amp; Layout</h1><span class="page-ko">스페이싱 · 레이아웃</span></div>
    <p class="page-lead">
      4px 배수 9단계. 그림자가 없는 시스템에서는 <b>여백이 구조를 만듭니다</b> —
      가까이 있으면 한 덩어리, 멀면 다른 덩어리입니다.
    </p>
    <div class="prose">
      <h2>스케일</h2>
      <div class="spacescale">
        ${scale.map((v) => `
          <div class="sp-row">
            <code>${v}</code>
            <div class="sp-bar" style="width:${v}px"></div>
            <span>${v === 0 ? '없음' : v === 4 ? '아이콘과 글자 사이' : v === 8 ? '관련된 요소 사이' : v === 12 ? '버튼 사이, 카드 안쪽' : v === 16 ? '카드 안쪽 여백' : v === 24 ? '섹션 안쪽' : v === 32 ? '섹션 사이' : v === 48 ? '큰 구획' : '페이지 상하'}</span>
          </div>`).join('')}
      </div>
      <p><b>4px 배수가 아닌 값은 쓰지 않습니다.</b> 7px, 15px 같은 값이 섞이면 정렬이 미묘하게 어긋납니다.</p>

      <h2>덩어리 짓기</h2>
      <p>
        같은 의미의 요소는 <b>가깝게</b>, 다른 의미는 <b>멀게</b>.
        이것만 지켜도 보더 없이 구조가 읽힙니다.
      </p>
      <div class="demo" style="border-radius:var(--r-lg)">
        <div style="display:flex;gap:40px;flex-wrap:wrap">
          <div>
            <div style="font-size:11px;font-weight:600;color:var(--success);margin-bottom:10px">좋음</div>
            <div class="field" style="width:200px">
              <label style="margin-bottom:6px">이름</label>
              <input class="input" placeholder="Acme Inc." />
              <div class="hint" style="margin-top:6px">라벨-입력-힌트가 6px로 붙어 한 덩어리</div>
            </div>
          </div>
          <div>
            <div style="font-size:11px;font-weight:600;color:var(--danger);margin-bottom:10px">나쁨</div>
            <div style="width:200px">
              <label style="display:block;font-size:13px;font-weight:500;margin-bottom:16px">이름</label>
              <input class="input" style="width:100%" placeholder="Acme Inc." />
              <div class="hint" style="margin-top:16px">전부 16px — 무엇이 한 덩어리인지 안 보임</div>
            </div>
          </div>
        </div>
      </div>

      <h2>페이지 골격</h2>
      <table>
        <thead><tr><th>영역</th><th>값</th></tr></thead>
        <tbody>
          <tr><td>본문 최대 너비 (읽는 화면)</td><td><code>720px</code> (<code>--measure</code>)</td></tr>
          <tr><td>본문 최대 너비 (문서·설정)</td><td><code>900px</code></td></tr>
          <tr><td>본문 최대 너비 (데이터 화면)</td><td><code>1080~1280px</code></td></tr>
          <tr><td>사이드바 너비</td><td><code>232px</code></td></tr>
          <tr><td>페이지 좌우 여백</td><td><code>24px</code> (모바일) / <code>44px</code> (데스크톱)</td></tr>
          <tr><td>상단 바 높이</td><td><code>52px</code></td></tr>
          <tr><td>버튼 · 입력 높이</td><td>Geist 스케일 — <code>32</code> sm / <code>40</code> 기본 / <code>48</code> lg. 필터 바 같은 밀한 자리는 sm</td></tr>
        </tbody>
      </table>
      <p>
        <b>에이전트 응답은 720px을 넘기지 않습니다.</b>
        한 줄이 너무 길면 다음 줄 첫 글자를 찾기 어려워집니다.
        데이터 테이블은 반대로 넓을수록 좋습니다 — 화면 성격에 따라 다르게 잡습니다.
      </p>

      <h2>그리드</h2>
      <p>
        12열 그리드를 강제하지 않습니다. 대신 화면을 <b>역할 열</b>로 나눕니다 —
        문서 화면 기준: LNB <code>264px</code> · 본문 <code>minmax(0, 720px)</code> ·
        목차 레일 <code>192px</code>, 열 간격 <code>48px</code>.
        카드 나열은 <code>repeat(auto-fill, minmax(232px, 1fr))</code>처럼
        내용이 스스로 줄 바꾸게 두어 브레이크포인트를 늘리지 않습니다.
      </p>

      <h2>브레이크포인트</h2>
      <table>
        <thead><tr><th>지점</th><th>바뀌는 것</th></tr></thead>
        <tbody>
          <tr><td><code>1280px</code></td><td>목차 레일 숨김</td></tr>
          <tr><td><code>1080px</code></td><td>본문 좌우 여백 축소 (56 → 32px)</td></tr>
          <tr><td><code>900px</code></td><td><b>LNB → 드로어.</b> 사라지는 게 아니라 서랍으로 들어갑니다. 2열 카드가 1열로</td></tr>
          <tr><td><code>640px</code></td><td>검색 숨김, 통계 2열, 버튼 전체 폭</td></tr>
        </tbody>
      </table>
      <p>
        표는 줄이지 않고 <b>가로 스크롤</b>로 둡니다 — 열을 빼면 정보가 사라집니다.
        제목은 <code>clamp()</code>로 화면 폭에 따라 24~30px 사이를 흐릅니다.
      </p>
    </div>`
}

/* ════════════════════════════════════════ */
export function fdShape() {
  return `
    <div class="page-head"><h1>Radius &amp; Border</h1><span class="page-ko">라디우스 · 보더</span></div>
    <p class="page-lead">
      <b>1px 보더가 이 시스템의 유일한 구분 장치입니다.</b>
      그림자를 안 쓰기로 한 순간, 보더가 그 역할을 전부 떠맡습니다.
    </p>
    <div class="prose">
      <h2>Radius</h2>
      <div class="radiusrow">
        <div><div class="rd" style="border-radius:var(--r-sm)"></div><code>--r-sm</code><span>4px</span><em>작은 표식, 코드 태그</em></div>
        <div><div class="rd" style="border-radius:var(--r-md)"></div><code>--r-md</code><span>6px</span><em>메뉴 항목, 툴콜, 목록 행</em></div>
        <div><div class="rd" style="border-radius:var(--r-lg)"></div><code>--r-lg</code><span>8px</span><em>버튼, 입력, 알림</em></div>
        <div><div class="rd" style="border-radius:var(--r-xl)"></div><code>--r-xl</code><span>12px</span><em>카드, 패널, 다이얼로그, 테이블</em></div>
        <div><div class="rd" style="border-radius:var(--r-full)"></div><code>--r-full</code><span>9999px</span><em>배지, 칩, 아바타</em></div>
      </div>
      <p>
        일반적인 시스템(보통 8~16px)보다 <b>조금 작습니다</b>.
        각질수록 정확해 보이지만 지나치면 차갑고 딱딱해집니다.
        큰 면(카드·패널)은 12px로 부드럽게, 조작 요소(버튼·입력)는 8px로 또렷하게 —
        이 <b>두 단계 차이</b>가 위계를 만듭니다.
      </p>
      <p>
        <b>중첩 규칙</b> — 안쪽 요소의 radius는 바깥보다 작거나 같아야 합니다.
        카드(6px) 안의 툴콜(4px)처럼. 반대가 되면 모서리가 어긋나 보입니다.
      </p>

      <h2>Border</h2>
      <table>
        <thead><tr><th>토큰</th><th>쓰는 곳</th></tr></thead>
        <tbody>
          <tr><td><code>--border-subtle</code></td><td>행 사이 구분선</td></tr>
          <tr><td><code>--border</code></td><td>카드 · 패널 · 테이블</td></tr>
          <tr><td><code>--border-strong</code></td><td>버튼 · 입력 (조작 가능 표시)</td></tr>
          <tr><td><code>--border-hover</code></td><td>위 요소의 호버</td></tr>
          <tr><td><code>--brand</code></td><td>포커스</td></tr>
        </tbody>
      </table>
      <p>반투명(알파)이라 불투명 회색보다 연하게 얹힙니다. 회색 번호를 직접 쓰지 않습니다.</p>
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
            <li><b>섹션 사이 — 선을 긋지 않습니다.</b> 위 여백 64px + 제목 굵기가 그룹을 만듭니다</li>
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
    <div class="page-head"><h1>Elevation</h1><span class="page-ko">엘리베이션</span></div>
    <p class="page-lead">
      <b>이 시스템에는 elevation 단계가 없습니다.</b>
      그림자는 "떠 있는 것"에만, 그것도 한 종류만 씁니다.
    </p>
    <div class="prose">
      <h2>규칙</h2>
      <table>
        <thead><tr><th>상황</th><th>처리</th></tr></thead>
        <tbody>
          <tr><td>페이지 안에 놓인 모든 것</td><td>그림자 없음. <code>1px solid var(--gray-4)</code></td></tr>
          <tr><td>페이지 위에 <b>떠 있는</b> 것</td><td>보더 + <code>0 6px 20px rgba(0,0,0,.09)</code></td></tr>
        </tbody>
      </table>
      <p>떠 있는 것은 넷뿐입니다 — <b>Menu · Dialog · Tooltip · Snackbar</b>.</p>

      <div class="demo" style="border-radius:var(--r-lg)">
        <div style="display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start">
          <div>
            <div style="font-size:11px;font-weight:600;color:var(--gray-9);margin-bottom:10px;text-transform:uppercase;letter-spacing:.05em">면 — 그림자 없음</div>
            <div class="card" style="width:180px"><h3>카드</h3><p>보더로만 구분</p></div>
          </div>
          <div>
            <div style="font-size:11px;font-weight:600;color:var(--gray-9);margin-bottom:10px;text-transform:uppercase;letter-spacing:.05em">떠 있음 — 그림자 1종</div>
            <div class="ds-menu-panel" style="width:180px">
              <div class="ds-menu-item">이름 바꾸기</div>
              <div class="ds-menu-item">복제</div>
            </div>
          </div>
        </div>
      </div>

      <h2>다크 모드</h2>
      <p>
        다크에서는 같은 그림자가 거의 보이지 않으므로 불투명도를 <code>.4</code>로 올립니다.
        다만 <b>다크에서 깊이는 그림자보다 배경 밝기로</b> 표현합니다 —
        떠 있는 면은 <code>--surface</code>(#18191b)로 페이지 배경(#111113)보다 밝습니다.
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
    <div class="page-head"><h1>Density</h1><span class="page-ko">밀도</span></div>
    <p class="page-lead">
      같은 시스템으로 챗(여유롭게)과 드라이브 목록(조밀하게)을 다 만듭니다.
      <b>밀도는 토큰으로 제어하고 컴포넌트에 하드코딩하지 않습니다.</b>
    </p>
    <div class="prose">
      <h2>3단계</h2>
      <table>
        <thead><tr><th>이름</th><th>행 높이</th><th>세로 여백</th><th>쓰는 곳</th></tr></thead>
        <tbody>
          <tr><td><code>compact</code></td><td>34px</td><td>4px</td><td>드라이브 목록, 감사 로그, 대량 테이블</td></tr>
          <tr><td><code>comfortable</code></td><td>42px</td><td>8px</td><td><b>기본</b>. 대부분의 화면</td></tr>
          <tr><td><code>spacious</code></td><td>50px</td><td>12px</td><td>챗, 읽는 화면, 설정</td></tr>
        </tbody>
      </table>

      <div class="demo" style="border-radius:var(--r-lg)">
        <div style="display:flex;gap:16px;flex-wrap:wrap">
          ${['compact:34', 'comfortable:42', 'spacious:50'].map((s) => {
            const [n, h] = s.split(':')
            return `<div style="flex:1;min-width:180px">
              <div style="font-size:11px;font-weight:600;color:var(--gray-9);margin-bottom:8px">${n} · ${h}px</div>
              <div class="table-wrap"><table><tbody>
                ${['계약서_최종.pdf', 'Q3_실적.xlsx', '회의록.docx'].map((f) =>
                  `<tr><td style="height:${h}px;font-size:13px">${f}</td></tr>`).join('')}
              </tbody></table></div>
            </div>`
          }).join('')}
        </div>
      </div>

      <h2>어떻게 쓰나</h2>
      <pre><code>&lt;DsDataTable :headers="headers" :items="items" density="compact" /&gt;</code></pre>
      <p>
        Vuetify의 <code>density</code> prop과 이름을 맞췄습니다.
        <code>defaults.ts</code>가 전역 기본값을 <code>comfortable</code>로 고정하므로,
        따로 지정하지 않은 화면은 자동으로 기본 밀도가 됩니다.
      </p>

      <h2>고르는 기준</h2>
      <div class="dodont">
        <div class="dd do">
          <span class="dd-tag">compact</span>
          <ul>
            <li>한 화면에 20행 이상을 보여줘야 할 때</li>
            <li>사용자가 <b>찾으러</b> 온 화면 (스캔)</li>
            <li>행마다 정보가 짧을 때</li>
          </ul>
        </div>
        <div class="dd do" style="border-color:var(--gray-4)">
          <span class="dd-tag" style="background:var(--gray-3);color:var(--gray-11)">spacious</span>
          <ul>
            <li>사용자가 <b>읽으러</b> 온 화면</li>
            <li>행마다 두 줄 이상일 때</li>
            <li>실수하면 되돌리기 어려운 조작이 섞일 때</li>
          </ul>
        </div>
      </div>
      <p>
        <b>한 화면 안에서 밀도를 섞지 않습니다.</b>
        같은 페이지의 테이블과 목록은 같은 밀도를 씁니다.
      </p>
    </div>`
}

/* ════════════════════════════════════════ */
export function fdIconography() {
  return `
    <div class="page-head"><h1>Iconography</h1><span class="page-ko">아이콘</span></div>
    <p class="page-lead">Lucide 하나, 크기 3개, stroke 1.5.</p>
    <div class="prose">
      <p>
        <b>적용 완료</b> — <code>lucide-vue-next</code>를 등록하고
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
          <tr><td>패키지</td><td><code>lucide-vue-next</code> — 이 시스템의 <b>유일한 외부 의존성</b></td></tr>
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
    <div class="page-head"><h1>Motion</h1><span class="page-ko">모션</span></div>
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
    <div class="page-head"><h1>State</h1><span class="page-ko">상태</span></div>
    <p class="page-lead">화면 상태 5종 + 인터랙션 상태 6종. 처음부터 전부.</p>
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

      <h2>인터랙션 상태 5종</h2>
      <p>조작 가능한 모든 요소는 이 다섯을 가집니다. 시각 요소를 절제한 화면에서는 <b>특히 중요합니다</b> — 보더와 그림자를 걷어내면 무엇이 눌리는지 안 보이기 때문입니다.</p>
      <table>
        <thead><tr><th>상태</th><th>표현</th></tr></thead>
        <tbody>
          <tr><td><code>default</code></td><td>기본</td></tr>
          <tr><td><code>hover</code></td><td>배경 <code>gray-3</code> 또는 보더 <code>gray-6 → gray-8</code></td></tr>
          <tr><td><code>focus</code></td><td>브랜드 보더 + <code>3px</code> 브랜드 subtle 링. <b>절대 없애지 않습니다</b></td></tr>
          <tr><td><code>active</code></td><td>한 단계 더 진한 배경</td></tr>
          <tr><td><code>disabled</code></td><td>배경 <code>gray-3</code>, 글자 <code>gray-8</code>, <code>cursor: not-allowed</code></td></tr>
          <tr><td><code>selected</code></td><td>중립 — <code>--sel-bg</code>(gray-4) + <code>--sel-fg</code>(gray-12). 브랜드가 아닙니다</td></tr>
        </tbody>
      </table>
      <div class="demo" style="border-radius:var(--r-lg)">
        <div class="row">
          <button class="btn btn-secondary">기본 · 호버 · 클릭해보세요</button>
          <button class="btn" disabled>disabled</button>
          <span class="badge brand"><span class="dot"></span>selected</span>
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
    <div class="page-head"><h1>Accessibility</h1><span class="page-ko">접근성</span></div>
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
          <tr><td>보더·아이콘</td><td>3:1</td><td><code>gray-6</code> 이상 사용</td></tr>
          <tr><td>브랜드 위 흰 글자</td><td>4.5:1</td><td>통과</td></tr>
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
      <pre><code>.btn:focus-visible {
  outline: 2px solid var(--brand);
  outline-offset: 2px;
}
.input:focus {
  border-color: var(--brand);
  box-shadow: 0 0 0 3px var(--brand-subtle);
}</code></pre>
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
        <li>아이콘만 있는 버튼 → <code>aria-label</code> 필수</li>
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
    <div class="page-head"><h1>Writing</h1><span class="page-ko">UX 라이팅</span></div>
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
          <tr><td>버튼</td><td>명사형 · "-하기" 금지 · "확인" 단독 금지 · 마침표 없음</td><td>[저장] [영구 삭제] [지금 수집]</td></tr>
          <tr><td>취소/닫기/중단</td><td>하려던 행동을 무르면 <b>취소</b> · 창만 없애면 <b>닫기</b> · 실행 중 작업이면 <b>중단</b></td><td>이탈 모달은 [계속 작성] [나가기]</td></tr>
          <tr><td>폼</td><td>플레이스홀더로 레이블 대체 금지 · 플레이스홀더는 입력 예시만</td><td>레이블 "커넥터 이름" / 예: 국가법령정보센터</td></tr>
          <tr><td>토스트</td><td>{대상} {개수}건을 {액션}했습니다 · "정상적으로/성공적으로" 삭제</td><td>"문서 12건을 삭제했습니다. [실행 취소]"</td></tr>
          <tr><td>다이얼로그</td><td>제목은 명사구(물음표 금지) · 본문은 결과 + 복구 불가 명시</td><td>제목 "컬렉션 삭제" / 버튼 [취소] [영구 삭제]</td></tr>
          <tr><td>오류</td><td><b>무엇이 안 됐는지 + 왜 + 무엇을 하면 되는지</b> · 시스템 원인만 오류 코드</td><td>"색인 서버에 연결하지 못했습니다. 잠시 후 다시 시도하세요. (IDX-503)"</td></tr>
          <tr><td>빈 상태</td><td>없다는 사실 + 다음 행동</td><td>"등록된 커넥터가 없습니다. 커넥터를 추가하면 수집을 시작할 수 있습니다."</td></tr>
          <tr><td>로딩</td><td>3초+ 무엇을 하는 중인지 · 10초+ 진행률/건수 · 마침표 없음</td><td>"문서 320/1,204건 색인 중"</td></tr>
          <tr><td>권한</td><td>권한명 + 요청 대상 명시 · "권한이 없습니다" 단독 금지 · 비활성 버튼엔 툴팁으로 이유</td><td>"이 화면은 보안관리자 권한이 필요합니다. 운영관리자에게 요청하세요."</td></tr>
          <tr><td>상태 배지</td><td>표준 상태어 6종, 배지 안은 붙여 씀</td><td>대기 · 실행중 · 완료 · 실패 · 중단 · 보류 (✗ 진행중·성공·에러)</td></tr>
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
          <tr><td>시각</td><td>절대 시각 <code>2026-07-31 09:14</code> · 감사 기록은 절대 시각 고정</td></tr>
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
    <div class="page-head"><h1>Word List</h1><span class="page-ko">용어집</span></div>
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
        ['만들기', '생성, 추가, 새로 만들기', '버튼 라벨은 "만들기". 짧고 동사로.'],
        ['저장', '적용, 확인, 완료', '값을 남기는 것은 "저장"입니다.'],
        ['삭제', '제거, 지우기', '영구적으로 없애는 것. Chip에서 빼는 것은 "제거".'],
        ['제거', '삭제, 빼기', '목록에서 빼되 원본은 남는 경우.'],
        ['불러오기', '로드, 가져오기', '외부에서 데이터를 읽어올 때.'],
        ['내보내기', '다운로드, 익스포트', '파일로 뽑을 때. 단순 다운로드는 "다운로드".'],
        ['되돌리기', '취소, 언두, 롤백', 'Snackbar의 Undo 액션.'],
        ['취소', '닫기, 그만두기', '진행 중이던 것을 중단. 다이얼로그의 부(副) 버튼.'],
        ['다시 시도', '재시도, 리트라이', '실패 후 같은 작업을 반복.'],
      ])}

      <h2>상태</h2>
      ${T([
        ['대기', '준비, 예약됨, 대기 중', '아직 시작하지 않음.'],
        ['실행 중', '진행 중, 처리 중, 작업 중', '가장 많이 흔들리는 말입니다. "실행 중"으로 고정.'],
        ['완료', '성공, 종료, 끝남', '정상적으로 끝남.'],
        ['실패', '오류, 에러, 문제 발생', '사용자에게는 "실패". "에러"는 개발 로그에만.'],
        ['부분 완료', '일부 성공, 부분 성공', '일부만 성공한 상태 — 에이전트 제품에서 자주 나옵니다.'],
        ['중단됨', '정지, 멈춤, 취소됨', '사용자가 멈춘 경우.'],
      ])}

      <h2>사람 · 권한</h2>
      ${T([
        ['멤버', '사용자, 유저, 구성원', '워크스페이스에 속한 사람.'],
        ['관리자', '어드민, 매니저', '권한을 가진 멤버.'],
        ['권한', '퍼미션, 접근 권한', '무엇을 할 수 있는지.'],
        ['공유', '초대, 공유하기', '다른 사람이 볼 수 있게 하는 것.'],
      ])}

      <h2>문장 규칙</h2>
      <table>
        <thead><tr><th>상황</th><th>규칙</th><th>예</th></tr></thead>
        <tbody>
          <tr><td>안내 문장</td><td><b>~합니다</b> 체</td><td>"모든 멤버에게 표시됩니다."</td></tr>
          <tr><td>버튼</td><td><b>동사</b>, 2~4글자</td><td>"저장" "삭제" "만들기"</td></tr>
          <tr><td>지시</td><td><b>~하세요</b></td><td>"올바른 이메일 주소를 입력하세요."</td></tr>
          <tr><td>질문 (다이얼로그 제목)</td><td><b>~할까요?</b></td><td>"에이전트를 삭제할까요?"</td></tr>
          <tr><td>빈 상태 제목</td><td>명사구 — 무엇이 없는지</td><td>"에이전트가 없습니다"</td></tr>
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
        <b>조사는 앞말에 맞춥니다.</b> 프로그램이 붙이는 조사는 "을(를)"처럼 두 개를 쓰지 말고,
        문장을 바꿔 조사를 피합니다 — "PDF을(를) 선택하세요" 대신 "파일 형식: PDF".
      </p>

      <h2>숫자와 시각</h2>
      <table>
        <thead><tr><th>대상</th><th>표기</th></tr></thead>
        <tbody>
          <tr><td>개수</td><td>천 단위 쉼표 · "건" — <code>1,284건</code></td></tr>
          <tr><td>용량</td><td>소수 한 자리 · 띄어쓰기 — <code>2.1 MB</code></td></tr>
          <tr><td>절대 시각</td><td><code>2026-07-31 09:14</code> (고정폭 글꼴)</td></tr>
          <tr><td>상대 시각</td><td>7일 이내면 "2시간 전", 그 이상은 절대 시각</td></tr>
          <tr><td>소요 시간</td><td><code>12.4초</code> · <code>1분 20초</code></td></tr>
          <tr><td>범위</td><td>물결표 — <code>10~30초</code></td></tr>
        </tbody>
      </table>
    </div>`
}

export const FD_RENDERERS = {
  overview: fdOverview, tokens: fdTokens, color: fdColor, typography: fdTypography,
  spacing: fdSpacing, shape: fdShape, elevation: fdElevation, density: fdDensity,
  iconography: fdIconography, motion: fdMotion, state: fdState, a11y: fdA11y,
  writing: fdWriting, wordlist: fdWordlist,
}
