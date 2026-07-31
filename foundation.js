/* ============================================
   Foundation — 컴포넌트 이전의 결정들
   참고: seed-design.io(당근), atlassian.design, carbondesignsystem.com(IBM),
        polaris.shopify.com, paste.twilio.design
   ============================================ */

export const FOUNDATION_PAGES = [
  ['overview', '개요', 'Overview'],
  ['tokens', '토큰', 'Design Tokens'],
  ['color', '색', 'Color'],
  ['typography', '타이포그래피', 'Typography'],
  ['spacing', '여백 · 레이아웃', 'Spacing & Layout'],
  ['shape', '모서리 · 보더', 'Radius & Border'],
  ['elevation', '높낮이', 'Elevation'],
  ['density', '밀도', 'Density'],
  ['iconography', '아이콘', 'Iconography'],
  ['motion', '모션', 'Motion'],
  ['state', '상태', 'State'],
  ['a11y', '접근성', 'Accessibility'],
  ['writing', '글쓰기', 'Writing'],
  ['i18n', '다국어', 'Internationalization'],
]

const swatchRow = (n) => `<div class="swatch" style="background:var(--gray-${n})"><span>${n}</span></div>`

/* ════════════════════════════════════════ */
export function fdOverview() {
  return `
    <div class="page-head"><h1>Foundation</h1><span class="page-ko">기초</span></div>
    <p class="page-lead">
      컴포넌트를 만들기 <b>전에</b> 내린 결정들입니다.
      버튼이 어떻게 생겼는지보다, 왜 그 회색이고 왜 그 여백인지가 여기 있습니다.
    </p>
    <div class="prose">
      <div class="callout">
        <b>Foundation이 없으면 컴포넌트는 취향의 모음이 됩니다.</b><br>
        새 컴포넌트를 만들 때 "이 값을 얼마로 할까"를 매번 고민하지 않도록,
        미리 정해둔 답이 Foundation입니다.
      </div>

      <h2>구성</h2>
      <table>
        <thead><tr><th>주제</th><th>무엇을 정하나</th></tr></thead>
        <tbody>
          <tr><td><a href="#/foundation/tokens">토큰</a></td><td>모든 값의 단일 원본. 여기서 CSS 변수로 흘러갑니다.</td></tr>
          <tr><td><a href="#/foundation/color">색</a></td><td>브랜드 1개 + 회색 12단계 + 상태 4개. 그 이상은 쓰지 않습니다.</td></tr>
          <tr><td><a href="#/foundation/typography">타이포그래피</a></td><td>Pretendard 5단계. 위계는 크기보다 굵기로 만듭니다.</td></tr>
          <tr><td><a href="#/foundation/spacing">여백 · 레이아웃</a></td><td>4px 배수 9단계. 그림자가 없으므로 여백이 구조를 만듭니다.</td></tr>
          <tr><td><a href="#/foundation/shape">모서리 · 보더</a></td><td>2 / 4 / 6px. 1px 보더가 이 시스템의 유일한 구분 장치입니다.</td></tr>
          <tr><td><a href="#/foundation/elevation">높낮이</a></td><td>그림자를 쓰지 않는 이유와, 유일한 예외.</td></tr>
          <tr><td><a href="#/foundation/density">밀도</a></td><td>챗과 드라이브를 같은 시스템으로 만드는 방법. B2B의 핵심.</td></tr>
          <tr><td><a href="#/foundation/iconography">아이콘</a></td><td>세트 하나, 크기 3개, 굵기 하나.</td></tr>
          <tr><td><a href="#/foundation/motion">모션</a></td><td>거의 움직이지 않습니다. 움직인다면 120ms.</td></tr>
          <tr><td><a href="#/foundation/state">상태</a></td><td>화면 상태 5종과 인터랙션 상태 5종. 처음부터 만듭니다.</td></tr>
          <tr><td><a href="#/foundation/a11y">접근성</a></td><td>대비, 포커스, 키보드, 색맹 대응.</td></tr>
          <tr><td><a href="#/foundation/writing">글쓰기</a></td><td>에러는 사과하지 않습니다. 문구도 디자인입니다.</td></tr>
          <tr><td><a href="#/foundation/i18n">다국어</a></td><td>컴포넌트 이름은 영문, UI 문구는 한글.</td></tr>
        </tbody>
      </table>

      <h2>이 시스템의 성격</h2>
      <p>
        일반적인 디자인 시스템과 다른 점이 두 가지 있습니다.
      </p>
      <ol>
        <li>
          <b>극한 미니멀</b> — 그림자·그라디언트·일러스트를 쓰지 않습니다.
          그래서 Foundation에 <code>Gradient</code>·<code>Illustration</code> 페이지가 없습니다.
          대신 <b>보더와 여백</b>에 훨씬 많은 규칙이 있습니다.
        </li>
        <li>
          <b>에이전트 제품</b> — 화면이 10~30초씩 "일하는" 상태로 있습니다.
          그래서 <a href="#/foundation/state">상태</a>가 다른 시스템보다 훨씬 중요하고,
          로딩이 아니라 <b>진행</b>을 표현하는 규칙이 따로 있습니다.
        </li>
      </ol>

      <h2>참고한 시스템</h2>
      <table>
        <thead><tr><th>시스템</th><th>가져온 것</th></tr></thead>
        <tbody>
          <tr><td>Vercel Geist</td><td>극한 미니멀의 기준 — 보더 중심, 장식 없음</td></tr>
          <tr><td>Radix Themes / Colors</td><td>회색 12단계 체계와 역할 구분</td></tr>
          <tr><td>Seed (당근)</td><td>Foundation 문서 구조</td></tr>
          <tr><td>Atlassian Design</td><td>토큰 · 스타일 · 가이드라인의 3층 분리</td></tr>
          <tr><td>IBM Carbon</td><td>데이터 밀집 화면의 밀도·그리드 접근</td></tr>
          <tr><td>Shopify Polaris</td><td>인터페이스 문구를 시스템으로 다루는 방식</td></tr>
        </tbody>
      </table>
    </div>`
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
          <tr><td><code>--gray-1~12</code></td><td>중립 회색 12단계</td><td><code>--gray-6</code></td></tr>
          <tr><td><code>--success/warning/danger/info</code></td><td>상태 색</td><td><code>--danger</code></td></tr>
          <tr><td><code>--r-*</code></td><td>모서리 반경</td><td><code>--r-lg</code></td></tr>
          <tr><td><code>--bg</code> / <code>--surface</code></td><td>페이지 배경 / 요소 면</td><td>—</td></tr>
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
      <p><a href="#/docs/tokens">토큰 값 전체 보기 →</a></p>
    </div>`
}

/* ════════════════════════════════════════ */
export function fdColor() {
  return `
    <div class="page-head"><h1>Color</h1><span class="page-ko">색</span></div>
    <p class="page-lead">
      브랜드 1개, 회색 12단계, 상태 4개. 그 이상은 쓰지 않습니다.
      <b>색은 마지막에 씁니다</b> — 위계는 여백과 굵기로 먼저 만듭니다.
    </p>
    <div class="prose">
      <h2>Brand</h2>
      <div class="brand-row" style="margin-bottom:16px">
        <div class="brand-chip" style="background:var(--brand);color:var(--on-brand)">base</div>
        <div class="brand-chip" style="background:var(--brand-hover);color:var(--on-brand)">hover</div>
        <div class="brand-chip" style="background:var(--brand-active);color:var(--on-brand)">active</div>
        <div class="brand-chip" style="background:var(--brand-subtle);color:var(--brand)">subtle</div>
      </div>
      <p>
        라이트 <code>#1F7FF0</code> · 다크 <code>#4593F5</code>.
        어두운 배경에서 원색은 가라앉아 보이므로 한 톤 밝은 변형을 씁니다.
      </p>
      <div class="dodont">
        <div class="dd do">
          <span class="dd-tag">이럴 때만</span>
          <ul>
            <li>기본 액션 버튼</li>
            <li>선택된 항목 · 활성 탭</li>
            <li>포커스 링</li>
            <li>링크</li>
            <li>인용 칩 · 진행 중 상태</li>
          </ul>
        </div>
        <div class="dd dont">
          <span class="dd-tag">쓰지 않습니다</span>
          <ul>
            <li>페이지 배경</li>
            <li>카드·패널 보더</li>
            <li>제목 텍스트</li>
            <li>장식</li>
            <li>차트의 모든 계열 색</li>
          </ul>
        </div>
      </div>

      <h2>Gray — Radix Slate 1–12</h2>
      <div class="swatch-wrap"><div class="swatches">${[1,2,3,4,5,6,7,8,9,10,11,12].map(swatchRow).join('')}</div></div>
      <p>
        <b>이 시스템의 실질적인 색은 회색입니다.</b> 화면의 95%가 이 12단계로 그려집니다.
        직접 만들지 않고 검증된 Radix Slate를 씁니다 — 브랜드 블루와 온도가 맞는 차가운 회색이고,
        라이트/다크 쌍의 대비가 이미 검증돼 있습니다.
      </p>
      <table>
        <thead><tr><th>단계</th><th>역할</th><th>예</th></tr></thead>
        <tbody>
          <tr><td><code>1</code></td><td>가장 낮은 배경</td><td>데모 영역, 코드 블록 바깥</td></tr>
          <tr><td><code>2</code></td><td>보조 배경</td><td>테이블 헤더, 툴콜 박스, 호버된 행</td></tr>
          <tr><td><code>3</code></td><td>호버 배경</td><td>메뉴 항목 호버, ghost 버튼 호버</td></tr>
          <tr><td><code>4</code></td><td>연한 보더 · 비활성 배경</td><td>카드 보더, disabled 버튼</td></tr>
          <tr><td><code>5</code></td><td>연한 보더</td><td>배지 보더</td></tr>
          <tr><td><code>6</code></td><td><b>기본 보더</b></td><td>버튼·입력 필드 보더</td></tr>
          <tr><td><code>7</code></td><td>중간 보더</td><td>구분자</td></tr>
          <tr><td><code>8</code></td><td><b>호버 보더</b> · 비활성 텍스트</td><td>입력 필드 호버</td></tr>
          <tr><td><code>9</code></td><td>약한 텍스트</td><td>placeholder, 메타 정보</td></tr>
          <tr><td><code>10</code></td><td>보조 텍스트</td><td>설명 문구</td></tr>
          <tr><td><code>11</code></td><td><b>기본 보조 텍스트</b></td><td>본문 설명, 라벨</td></tr>
          <tr><td><code>12</code></td><td><b>본문 텍스트</b></td><td>제목, 주요 내용</td></tr>
        </tbody>
      </table>
      <div class="callout">
        <b>외우는 요령</b> — 배경은 1~3, 보더는 6과 8, 텍스트는 11과 12.
        나머지는 이 사이를 미세 조정할 때만 씁니다.
      </div>

      <h2>Status</h2>
      <div class="statusrow">
        <div><i style="background:var(--success)"></i><b>success</b><span>완료된 작업</span></div>
        <div><i style="background:var(--warning)"></i><b>warning</b><span>확인이 필요한 상태</span></div>
        <div><i style="background:var(--danger)"></i><b>danger</b><span>실패 · 파괴적 액션</span></div>
        <div><i style="background:var(--info)"></i><b>info</b><span>브랜드와 같은 색</span></div>
      </div>
      <p>
        상태 색은 <b>진짜 그 상태일 때만</b> 씁니다.
        빨강이 화면에 늘 떠 있으면 진짜 에러가 났을 때 눈에 띄지 않습니다.
      </p>
      <div class="dodont">
        <div class="dd dont">
          <span class="dd-tag">하지 말 것</span>
          <ul><li>색만으로 상태를 구분 — 색맹 사용자는 읽을 수 없습니다. 항상 텍스트나 아이콘을 함께.</li></ul>
        </div>
        <div class="dd do">
          <span class="dd-tag">해야 할 것</span>
          <ul><li>배지처럼 <b>점 + 텍스트</b>를 함께 씁니다.</li></ul>
        </div>
      </div>
      <div class="demo" style="border-radius:var(--r-lg)">
        <div class="row">
          <span class="badge"><span class="dot"></span>대기</span>
          <span class="badge brand"><span class="dot"></span>실행 중</span>
          <span class="badge success"><span class="dot"></span>완료</span>
          <span class="badge danger"><span class="dot"></span>실패</span>
        </div>
      </div>
    </div>`
}

/* ════════════════════════════════════════ */
export function fdTypography() {
  const rows = [
    ['xl', '20px', '600', '페이지 제목', 'font-size:20px;font-weight:600;letter-spacing:-.02em'],
    ['lg', '16px', '600', '섹션 제목', 'font-size:16px;font-weight:600;letter-spacing:-.01em'],
    ['base', '14px', '400', '본문 · 버튼 · 입력', 'font-size:14px'],
    ['sm', '13px', '400', '보조 설명 · 테이블 셀', 'font-size:13px'],
    ['xs', '12px', '500', '라벨 · 메타 · 배지', 'font-size:12px;font-weight:500'],
  ]
  return `
    <div class="page-head"><h1>Typography</h1><span class="page-ko">타이포그래피</span></div>
    <p class="page-lead">
      Pretendard 5단계. <b>위계는 크기보다 굵기와 색으로 만듭니다</b> —
      크기를 키우면 화면이 커 보이고, 굵기를 바꾸면 위계만 생깁니다.
    </p>
    <div class="prose">
      <h2>스케일</h2>
      <div class="typescale">
        ${rows.map(([n, s, w, use, css]) => `
          <div class="ts-row">
            <div class="ts-meta"><code>${n}</code><span>${s} · ${w}</span></div>
            <div class="ts-sample" style="${css}">문서를 중앙에서 관리하세요</div>
            <div class="ts-use">${use}</div>
          </div>`).join('')}
      </div>

      <h2>굵기</h2>
      <table>
        <thead><tr><th>값</th><th>이름</th><th>용도</th></tr></thead>
        <tbody>
          <tr><td><code>400</code></td><td>Regular</td><td>본문 전부</td></tr>
          <tr><td><code>500</code></td><td>Medium</td><td>라벨, 버튼, 강조된 셀</td></tr>
          <tr><td><code>600</code></td><td>SemiBold</td><td>제목</td></tr>
        </tbody>
      </table>
      <p>
        <b>700 이상은 쓰지 않습니다.</b> Pretendard의 600으로 충분히 위계가 생기고,
        더 굵어지면 미니멀한 인상이 깨집니다.
      </p>

      <h2>글꼴</h2>
      <table>
        <thead><tr><th>토큰</th><th>글꼴</th><th>용도</th></tr></thead>
        <tbody>
          <tr><td><code>--font</code></td><td>Pretendard Variable</td><td>UI 전부. 한글·영문·숫자가 한 벌로 어울립니다.</td></tr>
          <tr><td><code>--mono</code></td><td>SF Mono 계열</td><td>코드, 툴콜, 시각, IP, 파일 크기</td></tr>
        </tbody>
      </table>
      <div class="callout">
        <b>고정폭 글꼴을 쓰는 기준</b> — 세로로 자릿수를 맞춰 읽어야 하는 값.
        시각·용량·ID·코드가 여기 해당합니다. 사람 이름이나 문서 제목은 아닙니다.
      </div>

      <h2>줄 간격</h2>
      <table>
        <thead><tr><th>값</th><th>용도</th></tr></thead>
        <tbody>
          <tr><td><code>1.55</code></td><td>기본. UI 전반</td></tr>
          <tr><td><code>1.7</code></td><td>긴 문단, 에이전트 응답 본문</td></tr>
          <tr><td><code>1.2</code></td><td>제목, 한 줄로 끝나는 라벨</td></tr>
        </tbody>
      </table>

      <h2>한글에서 주의할 것</h2>
      <ul>
        <li><b>letter-spacing을 양수로 주지 않습니다.</b> 한글은 자간이 벌어지면 단어 경계가 무너집니다. 제목에만 <code>-0.01~-0.02em</code>을 씁니다.</li>
        <li><b>대문자 변환(uppercase)을 쓰지 않습니다.</b> 한글에는 대문자가 없어 영문만 튀어 보입니다. Vuetify 기본값을 <code>defaults.ts</code>에서 해제한 이유입니다.</li>
        <li><b>줄바꿈은 <code>word-break: keep-all</code></b>을 기본으로 합니다. 단어 중간에서 끊기지 않습니다.</li>
      </ul>
    </div>`
}

/* ════════════════════════════════════════ */
export function fdSpacing() {
  const scale = [0, 4, 8, 12, 16, 24, 32, 48, 64]
  return `
    <div class="page-head"><h1>Spacing &amp; Layout</h1><span class="page-ko">여백 · 레이아웃</span></div>
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
          <tr><td>본문 최대 너비 (읽는 화면)</td><td><code>720px</code></td></tr>
          <tr><td>본문 최대 너비 (문서·설정)</td><td><code>900px</code></td></tr>
          <tr><td>본문 최대 너비 (데이터 화면)</td><td><code>1080~1280px</code></td></tr>
          <tr><td>사이드바 너비</td><td><code>232px</code></td></tr>
          <tr><td>페이지 좌우 여백</td><td><code>24px</code> (모바일) / <code>44px</code> (데스크톱)</td></tr>
          <tr><td>상단 바 높이</td><td><code>52px</code></td></tr>
        </tbody>
      </table>
      <div class="callout">
        <b>에이전트 응답은 720px을 넘기지 않습니다.</b>
        한 줄이 너무 길면 다음 줄 첫 글자를 찾기 어려워집니다.
        데이터 테이블은 반대로 넓을수록 좋습니다 — 화면 성격에 따라 다르게 잡습니다.
      </div>

      <h2>그리드</h2>
      <p>
        12열 그리드를 강제하지 않습니다. 대신 <b>flex와 grid를 직접</b> 쓰되
        간격은 위 스케일에서만 고릅니다. 카드 나열은
        <code>repeat(auto-fill, minmax(212px, 1fr))</code>처럼 반응형으로 두어
        브레이크포인트를 늘리지 않습니다.
      </p>
    </div>`
}

/* ════════════════════════════════════════ */
export function fdShape() {
  return `
    <div class="page-head"><h1>Radius &amp; Border</h1><span class="page-ko">모서리 · 보더</span></div>
    <p class="page-lead">
      <b>1px 보더가 이 시스템의 유일한 구분 장치입니다.</b>
      그림자를 안 쓰기로 한 순간, 보더가 그 역할을 전부 떠맡습니다.
    </p>
    <div class="prose">
      <h2>Radius</h2>
      <div class="radiusrow">
        <div><div class="rd" style="border-radius:var(--r-sm)"></div><code>--r-sm</code><span>2px</span><em>작은 표식, 코드 태그</em></div>
        <div><div class="rd" style="border-radius:var(--r-md)"></div><code>--r-md</code><span>4px</span><em>메뉴 항목, 툴콜, 알림</em></div>
        <div><div class="rd" style="border-radius:var(--r-lg)"></div><code>--r-lg</code><span>6px</span><em>버튼, 입력, 카드, 패널</em></div>
        <div><div class="rd" style="border-radius:var(--r-full)"></div><code>--r-full</code><span>9999px</span><em>배지, 칩, 아바타</em></div>
      </div>
      <p>
        일반적인 시스템보다 <b>한 단계 작습니다</b>(보통 8~12px).
        모서리가 둥글수록 친근하지만 무릅니다. 업무 도구는 각진 쪽이 신뢰가 갑니다.
      </p>
      <div class="callout">
        <b>중첩 규칙</b> — 안쪽 요소의 radius는 바깥보다 작거나 같아야 합니다.
        카드(6px) 안의 툴콜(4px)처럼. 반대가 되면 모서리가 어긋나 보입니다.
      </div>

      <h2>Border</h2>
      <table>
        <thead><tr><th>색</th><th>쓰는 곳</th></tr></thead>
        <tbody>
          <tr><td><code>--gray-4</code></td><td>카드·패널·테이블 바깥 테두리 (가장 조용함)</td></tr>
          <tr><td><code>--gray-3</code></td><td>목록 항목 사이 구분선 (더 조용함)</td></tr>
          <tr><td><code>--gray-6</code></td><td>버튼·입력 필드 (조작 가능함을 알림)</td></tr>
          <tr><td><code>--gray-8</code></td><td>위 요소의 호버 상태</td></tr>
          <tr><td><code>--brand</code></td><td>포커스, 선택된 항목</td></tr>
        </tbody>
      </table>
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
            <li>이미 32px 이상 떨어진 섹션 사이</li>
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
    <div class="page-head"><h1>Elevation</h1><span class="page-ko">높낮이</span></div>
    <p class="page-lead">
      <b>이 시스템에는 elevation 단계가 없습니다.</b>
      그림자는 "떠 있는 것"에만, 그것도 한 종류만 씁니다.
    </p>
    <div class="prose">
      <div class="callout">
        <b>왜 그림자를 버렸나</b><br>
        그림자는 깊이를 만들지만 동시에 화면을 탁하게 합니다.
        머티리얼 계열 시스템은 elevation 0~24단계를 두는데,
        실무에서는 "이건 몇 단계지?"가 매번 취향 문제가 됩니다.
        보더로 통일하면 그 논쟁이 사라집니다.
      </div>

      <h2>규칙</h2>
      <table>
        <thead><tr><th>상황</th><th>처리</th></tr></thead>
        <tbody>
          <tr><td>페이지 안에 놓인 모든 것</td><td>그림자 없음. <code>1px solid var(--gray-4)</code></td></tr>
          <tr><td>페이지 위에 <b>떠 있는</b> 것</td><td>보더 + <code>0 4px 16px rgba(0,0,0,.08)</code></td></tr>
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
      <div class="callout">
        <b>B2B 제품의 핵심 결정입니다.</b>
        소비자 앱은 밀도가 하나여도 되지만, 업무 도구는 같은 사용자가
        "훑어보는 화면"과 "읽는 화면"을 오갑니다.
        밀도를 고정하면 둘 중 하나는 반드시 불편해집니다.
      </div>

      <h2>3단계</h2>
      <table>
        <thead><tr><th>이름</th><th>행 높이</th><th>세로 여백</th><th>쓰는 곳</th></tr></thead>
        <tbody>
          <tr><td><code>compact</code></td><td>32px</td><td>4px</td><td>드라이브 목록, 감사 로그, 대량 테이블</td></tr>
          <tr><td><code>comfortable</code></td><td>40px</td><td>8px</td><td><b>기본</b>. 대부분의 화면</td></tr>
          <tr><td><code>spacious</code></td><td>48px</td><td>12px</td><td>챗, 읽는 화면, 설정</td></tr>
        </tbody>
      </table>

      <div class="demo" style="border-radius:var(--r-lg)">
        <div style="display:flex;gap:16px;flex-wrap:wrap">
          ${['compact:32', 'comfortable:40', 'spacious:48'].map((s) => {
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
    <p class="page-lead">
      세트 하나, 크기 3개, 굵기 하나. 아이콘은 <b>글자를 대체하지 않고 보조합니다</b>.
    </p>
    <div class="prose">
      <div class="callout">
        <b>적용 완료</b> — <code>lucide-vue-next</code>를 등록하고
        <code>DsIcon</code> 컴포넌트와 아이콘 레지스트리(<code>vue/icons.ts</code>)를 만들었습니다.
        라이브 갤러리의 <b>Iconography</b> 섹션에서 등록된 아이콘 전체를 볼 수 있습니다.
      </div>

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

      <h2>크기</h2>
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
          <tr><td><code>120ms</code></td><td><b>기본</b> — 호버, 보더 색, 배경 변화</td></tr>
          <tr><td><code>160ms</code></td><td>테마 전환, 패널 열고 닫기</td></tr>
          <tr><td><code>240ms</code></td><td>최대. 이보다 길면 느리게 느껴집니다.</td></tr>
        </tbody>
      </table>
      <div class="demo" style="border-radius:var(--r-lg)">
        <div class="row">
          <button class="btn btn-secondary">호버해보세요 — 120ms</button>
          <input class="input" placeholder="포커스해보세요" style="width:200px" />
        </div>
      </div>

      <h2>가속</h2>
      <p>
        기본은 <code>ease</code> 하나입니다. 커스텀 베지어 곡선을 만들지 않습니다.
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
    <p class="page-lead">
      화면 상태 5종과 인터랙션 상태 5종. <b>처음부터 전부 만듭니다</b> —
      나중에 추가하는 비용이 훨씬 큽니다.
    </p>
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
      <div class="callout">
        <b><code>partial</code>을 빠뜨리기 쉽습니다.</b>
        에이전트 제품에서는 "문서 10건 중 7건만 읽었다" 같은 상황이 흔합니다.
        전부 실패로 처리하면 읽은 7건이 낭비되고, 성공으로 처리하면 사용자가 속습니다.
      </div>

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
      <p>조작 가능한 모든 요소는 이 다섯을 가집니다. 극한 미니멀에서는 <b>특히 중요합니다</b> — 보더와 그림자를 걷어내면 무엇이 눌리는지 안 보이기 때문입니다.</p>
      <table>
        <thead><tr><th>상태</th><th>표현</th></tr></thead>
        <tbody>
          <tr><td><code>default</code></td><td>기본</td></tr>
          <tr><td><code>hover</code></td><td>배경 <code>gray-3</code> 또는 보더 <code>gray-6 → gray-8</code></td></tr>
          <tr><td><code>focus</code></td><td>브랜드 보더 + <code>3px</code> 브랜드 subtle 링. <b>절대 없애지 않습니다</b></td></tr>
          <tr><td><code>active</code></td><td>한 단계 더 진한 배경</td></tr>
          <tr><td><code>disabled</code></td><td>배경 <code>gray-3</code>, 글자 <code>gray-8</code>, <code>cursor: not-allowed</code></td></tr>
          <tr><td><code>selected</code></td><td>브랜드 subtle 배경 + 브랜드 글자</td></tr>
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
        <div class="toolcall"><span class="check">✓</span> search_drive("계약서", June) — 3 files found</div>
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
      극한 미니멀은 대비가 낮아지기 쉬워서, 이 시스템에서는 특히 지켜야 합니다.
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
      <div class="callout warn">
        <b><code>gray-9</code>보다 연한 색에 의미 있는 정보를 담지 않습니다.</b>
        <code>gray-8</code> 이하는 보더와 비활성 상태 전용입니다.
      </div>

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
    <div class="page-head"><h1>Writing</h1><span class="page-ko">글쓰기</span></div>
    <p class="page-lead">
      문구도 디자인입니다. 특히 <b>에러 메시지</b>가 제품의 인상을 만듭니다.
      원칙 2 — 실패는 예외가 아니라 기본 상태 중 하나입니다.
    </p>
    <div class="prose">
      <h2>목소리</h2>
      <table>
        <thead><tr><th>이렇게</th><th>이렇지 않게</th></tr></thead>
        <tbody>
          <tr><td>차분하고 정확하게</td><td>발랄하거나 사과하듯이</td></tr>
          <tr><td>사용자가 할 수 있는 것을 말함</td><td>시스템 내부 사정을 말함</td></tr>
          <tr><td>짧게</td><td>정중하게 늘여서</td></tr>
        </tbody>
      </table>

      <h2>에러 메시지</h2>
      <div class="callout">
        <b>에러는 사과하지 않습니다.</b>
        무엇이 일어났고, 무엇을 할 수 있는지 말합니다.
        "죄송합니다"는 정보가 아니고, 사용자는 사과가 아니라 해결책을 원합니다.
      </div>
      <div class="writecmp">
        <div class="wc bad">
          <span class="wc-tag">이렇게 쓰지 않습니다</span>
          <ul>
            <li>"죄송합니다. 오류가 발생했습니다."</li>
            <li>"입력값이 올바르지 않습니다."</li>
            <li>"Error 500: Internal Server Error"</li>
            <li>"업로드 실패"</li>
          </ul>
        </div>
        <div class="wc good">
          <span class="wc-tag">이렇게 씁니다</span>
          <ul>
            <li>"법무 폴더는 관리자만 삭제할 수 있습니다." + 권한 요청 버튼</li>
            <li>"올바른 이메일 주소를 입력하세요. 예: name@company.com"</li>
            <li>"문서를 불러오지 못했습니다. 잠시 후 다시 시도하세요." + 재시도</li>
            <li>"10MB를 초과합니다 (14.2MB). 파일을 나누어 올려주세요."</li>
          </ul>
        </div>
      </div>
      <p>공식은 이렇습니다 — <b>무엇이 일어났나 + 왜 + 무엇을 할 수 있나.</b></p>

      <h2>빈 상태</h2>
      <p>"결과 없음"으로 끝내지 않습니다. 항상 다음 행동을 제안합니다.</p>
      <table>
        <thead><tr><th>구성</th><th>예</th></tr></thead>
        <tbody>
          <tr><td>제목 — 무엇이 없는지</td><td>"에이전트가 없습니다"</td></tr>
          <tr><td>설명 — 왜 없는지 / 무엇을 할 수 있는지</td><td>"첫 에이전트를 만들어 업무 자동화를 시작하세요."</td></tr>
          <tr><td>액션 — 다음 행동</td><td>[New agent]</td></tr>
        </tbody>
      </table>

      <h2>버튼 문구</h2>
      <ul>
        <li><b>동사로 시작합니다</b> — "저장" "삭제" "에이전트 만들기". "확인" "예"는 무엇이 일어나는지 알려주지 않습니다.</li>
        <li><b>다이얼로그 버튼은 행동을 반복합니다</b> — "정말 삭제할까요?"의 버튼은 [확인]이 아니라 [삭제]입니다.</li>
        <li><b>2~4글자</b>로 짧게. 길어지면 버튼이 문장이 됩니다.</li>
      </ul>

      <h2>파괴적 액션</h2>
      <p>되돌릴 수 없는 작업은 <b>결과를 구체적으로</b> 적습니다.</p>
      <div class="writecmp">
        <div class="wc bad">
          <span class="wc-tag">약함</span>
          <ul><li>"정말 삭제하시겠습니까?"</li></ul>
        </div>
        <div class="wc good">
          <span class="wc-tag">좋음</span>
          <ul><li>"이 작업은 되돌릴 수 없습니다. 연결된 실행 기록 128건도 함께 삭제됩니다."</li></ul>
        </div>
      </div>

      <h2>에이전트가 말할 때</h2>
      <ul>
        <li><b>진행 문구는 현재 하는 일을 말합니다</b> — "로딩 중…"이 아니라 "계약서 조항을 분석하는 중…"</li>
        <li><b>10초 이상 걸리면 단계에 맞게 갱신합니다</b> — "문서를 읽는 중…" → "요약을 작성하는 중…"</li>
        <li><b>못 한 일은 숨기지 않습니다</b> — "3건 중 2건만 읽었습니다. 스캔본은 텍스트 레이어가 없습니다."</li>
        <li><b>단정하지 않습니다</b> — 근거가 있으면 인용 칩을 답니다.</li>
      </ul>

      <h2>표기</h2>
      <table>
        <thead><tr><th>항목</th><th>규칙</th></tr></thead>
        <tbody>
          <tr><td>문장</td><td>"~합니다" 체. 명령형은 버튼·짧은 안내에만.</td></tr>
          <tr><td>숫자</td><td>천 단위 쉼표. 1,284</td></tr>
          <tr><td>용량</td><td>2.1 MB — 숫자와 단위 사이 띄어쓰기</td></tr>
          <tr><td>시각</td><td>절대 시각 <code>2026-07-31 09:14</code>, 최근이면 "2시간 전"</td></tr>
          <tr><td>영문 고유명사</td><td>원문 그대로 — Vuetify, Pretendard</td></tr>
        </tbody>
      </table>
    </div>`
}

/* ════════════════════════════════════════ */
export function fdI18n() {
  return `
    <div class="page-head"><h1>Internationalization</h1><span class="page-ko">다국어</span></div>
    <p class="page-lead">
      <b>컴포넌트 이름과 API는 영문, UI 문구는 한글.</b>
      오픈소스로 공개하되 실제 제품은 한국어라는 조건에서 나온 결정입니다.
    </p>
    <div class="prose">
      <h2>무엇을 어느 언어로</h2>
      <table>
        <thead><tr><th>대상</th><th>언어</th><th>예</th></tr></thead>
        <tbody>
          <tr><td>컴포넌트 이름</td><td>영문 고정</td><td><code>DsChatMessage</code></td></tr>
          <tr><td>props · 이벤트 · 슬롯</td><td>영문 고정</td><td><code>variant</code>, <code>@send</code></td></tr>
          <tr><td>토큰 이름</td><td>영문 고정</td><td><code>--gray-11</code></td></tr>
          <tr><td>코드 주석</td><td>한글</td><td>"왜 이렇게 만들었는지"</td></tr>
          <tr><td>문서 산문</td><td>한글 (영문 병기)</td><td>이 문서</td></tr>
          <tr><td>UI 문구</td><td>한글</td><td>"에이전트가 없습니다"</td></tr>
        </tbody>
      </table>
      <p>
        코드에 한글이 섞이면 개발자 도구·에러 로그·검색이 불편해집니다.
        반대로 문서가 영문이면 팀이 안 읽습니다. 경계를 <b>코드/문서</b>로 나눈 이유입니다.
      </p>

      <h2>meta의 이중 언어</h2>
      <p><code>vue/meta.ts</code>는 컴포넌트마다 존재 이유를 두 언어로 갖습니다.</p>
      <pre><code>reason: {
  en: 'No conversational message component exists in Vuetify.',
  ko: 'Vuetify에 대화형 메시지 컴포넌트가 없습니다.',
}</code></pre>
      <p>문서 사이트는 한글을, 공개용 영문 문서는 <code>en</code>을 렌더합니다. 없으면 영문으로 폴백합니다.</p>

      <h2>한글 조판</h2>
      <table>
        <thead><tr><th>항목</th><th>규칙</th></tr></thead>
        <tbody>
          <tr><td>글꼴</td><td>Pretendard — 한글·영문·숫자가 한 벌로 어울립니다</td></tr>
          <tr><td>자간</td><td>양수 금지. 제목만 <code>-0.01~-0.02em</code></td></tr>
          <tr><td>줄바꿈</td><td><code>word-break: keep-all</code> — 단어 중간에서 끊지 않음</td></tr>
          <tr><td>대문자 변환</td><td>금지 — 한글에는 대문자가 없어 영문만 튐</td></tr>
          <tr><td>줄 간격</td><td>영문보다 넉넉하게. 기본 1.55</td></tr>
        </tbody>
      </table>

      <h2>레이아웃 여유</h2>
      <p>
        같은 뜻이라도 <b>한글이 영문보다 20~30% 짧고, 독일어는 30% 깁니다.</b>
        버튼과 라벨에 고정 너비를 주지 않습니다 —
        <code>min-width</code>는 두되 <code>width</code>는 내용에 맡깁니다.
      </p>

      <h2>Vuetify 로케일</h2>
      <p>
        <code>VDataTable</code>의 "Rows per page", <code>VDatePicker</code>의 요일처럼
        Vuetify가 직접 렌더하는 문구가 있습니다. 앱에서 로케일을 지정합니다.
      </p>
      <pre><code>import { ko } from 'vuetify/locale'

createVuetify({
  locale: { locale: 'ko', messages: { ko } },
  theme: dsTheme,
  defaults: dsDefaults,
})</code></pre>

      <h2>입력에서 주의할 것</h2>
      <p>
        한글은 <b>조합 중(IME composition)</b> 상태가 있습니다.
        조합 중에 <code>Enter</code>가 눌리면 글자가 확정되는 것인지 전송인지 구분해야 합니다.
        직접 만든 필터링·자동완성이 한글에서 깨지는 주된 이유이고,
        <code>DsAutocomplete</code>를 직접 만들지 않고 Vuetify를 감싼 이유입니다.
      </p>
    </div>`
}

export const FD_RENDERERS = {
  overview: fdOverview, tokens: fdTokens, color: fdColor, typography: fdTypography,
  spacing: fdSpacing, shape: fdShape, elevation: fdElevation, density: fdDensity,
  iconography: fdIconography, motion: fdMotion, state: fdState, a11y: fdA11y,
  writing: fdWriting, i18n: fdI18n,
}
