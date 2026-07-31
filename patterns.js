/* ============================================
   Patterns — 컴포넌트를 조합해 반복되는 문제를 푸는 법
   ============================================
   컴포넌트가 "무엇"이라면 패턴은 "어떻게 조합하나"입니다.
   같은 문제를 화면마다 다르게 풀면 컴포넌트가 같아도 제품은 일관되지 않습니다.

   참고: carbondesignsystem.com/patterns, paste.twilio.design/patterns,
        polaris.shopify.com/patterns, atlassian.design (Rovo UI)
*/
import { ic } from './icons-svg.js'

export const PATTERN_GROUPS = [
  { id: 'core', name: 'Core', ko: '기본' },
  { id: 'agent', name: 'Agent', ko: '에이전트' },
  { id: 'template', name: 'Page Templates', ko: '페이지 템플릿' },
]

const P = (id, name, ko, group, summary, body) => ({ id, name, ko, group, summary, body })

/* ══════════════════ CORE ══════════════════ */

const forms = P('forms', 'Forms', '폼', 'core',
  '입력을 받고 검증하고 저장합니다.', () => `
  <div class="prose">
    <h2>구조</h2>
    <p>
      라벨 → 입력 → 힌트 순으로 <b>6px 간격</b>으로 붙여 한 덩어리로 만들고,
      필드 사이는 <b>20px</b>로 띄웁니다. 이 차이가 무엇이 한 묶음인지 알려줍니다.
    </p>
    <div class="demo" style="border-radius:var(--r-xl)">
      <div style="max-width:420px">
        <div class="field" style="width:100%"><label>워크스페이스 이름</label>
          <input class="input" value="Acme Inc." /><div class="hint">모든 멤버에게 표시됩니다.</div></div>
        <div style="height:20px"></div>
        <div class="field" style="width:100%"><label>이메일</label>
          <input class="input error" value="ujin@" /><div class="hint error">올바른 이메일 주소를 입력하세요. 예: name@company.com</div></div>
        <div style="display:flex;gap:8px;margin-top:24px;justify-content:flex-end">
          <button class="btn btn-secondary">취소</button>
          <button class="btn btn-primary">저장</button>
        </div>
      </div>
    </div>

    <h2>검증은 언제</h2>
    <table>
      <thead><tr><th>시점</th><th>쓰는 곳</th></tr></thead>
      <tbody>
        <tr><td><b>제출할 때</b> (기본)</td><td>대부분의 폼. 입력 중에 빨간 줄이 뜨면 방해가 됩니다.</td></tr>
        <tr><td><b>필드를 벗어날 때</b></td><td>형식이 정해진 값 — 이메일, 전화번호</td></tr>
        <tr><td><b>입력하는 중</b></td><td>실시간 확인이 필요한 것 — 비밀번호 강도, 중복 검사</td></tr>
      </tbody>
    </table>
    <p><code>defaults.ts</code>가 <code>VForm</code>의 <code>validateOn</code>을 <code>submit</code>으로 고정합니다.</p>

    <h2>에러 처리</h2>
    <ul>
      <li>필드 에러는 <b>그 필드 아래</b>에 둡니다. 위에 모아두면 어느 필드인지 찾아야 합니다.</li>
      <li>에러가 3개를 넘으면 폼 <b>상단에 Alert</b>로 요약하고, 각 필드에도 표시합니다.</li>
      <li>제출 실패 시 <b>첫 에러 필드로 포커스</b>를 옮깁니다.</li>
      <li>입력한 값은 <b>지우지 않습니다</b>. 다시 치게 만들지 마세요.</li>
    </ul>

    <h2>저장 상태</h2>
    <div class="dodont">
      <div class="dd do"><span class="dd-tag">해야 할 것</span><ul>
        <li>저장 중에는 버튼을 <code>disabled</code> + Spinner로</li>
        <li>완료는 Snackbar로 짧게</li>
        <li>자동 저장이면 "저장됨 · 방금" 같은 조용한 표시</li>
      </ul></div>
      <div class="dd dont"><span class="dd-tag">하지 말 것</span><ul>
        <li>저장 성공을 Dialog로 알리기 — 흐름을 끊습니다</li>
        <li>필수 항목을 <code>*</code>로만 표시 — "(필수)"라고 씁니다</li>
        <li>취소 버튼을 primary로</li>
      </ul></div>
    </div>

    <h2>쓰는 컴포넌트</h2>
    <p><a href="#/components/input">Input</a> · <a href="#/components/textarea">Textarea</a> ·
       <a href="#/components/select">Select</a> · <a href="#/components/checkbox">Checkbox</a> ·
       <a href="#/components/radiogroup">RadioGroup</a> · <a href="#/components/alert">Alert</a> ·
       <a href="#/components/button">Button</a></p>
  </div>`)

const filtering = P('filtering', 'Filtering', '필터', 'core',
  '많은 데이터에서 원하는 것만 남깁니다.', () => `
  <div class="prose">
    <h2>구조</h2>
    <p>
      필터 바 → <b>활성 필터 칩</b> → 결과. 지금 무엇이 걸려 있는지가
      항상 보여야 합니다. 결과가 적을 때 "왜 적지?"를 스스로 답할 수 있어야 합니다.
    </p>
    <div class="demo" style="border-radius:var(--r-xl)">
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:14px">
        <div class="field" style="width:200px"><input class="input" placeholder="검색…" /></div>
        <span class="chip brand">수준: 실패<button class="x">${ic('close', 12)}</button></span>
        <span class="chip brand">수행자: Jiyong Kim<button class="x">${ic('close', 12)}</button></span>
        <button class="btn btn-ghost btn-sm">모두 해제</button>
      </div>
      <div style="font-size:12.5px;color:var(--gray-9)">3 results · 0.4s</div>
    </div>

    <h2>규칙</h2>
    <ul>
      <li><b>필터는 즉시 반영</b>합니다. "적용" 버튼을 두지 않습니다.</li>
      <li>활성 필터는 <b>Chip으로 나열</b>하고 각각 제거할 수 있게 합니다. "모두 해제"를 함께.</li>
      <li>결과 개수를 항상 보여줍니다. <b>0건일 때는 필터 해제 버튼이 있는 빈 상태</b>로.</li>
      <li>필터 상태를 <b>URL에 담습니다</b>. 링크를 공유하면 같은 화면이 열려야 합니다.</li>
      <li>필터가 5개를 넘으면 "필터" 버튼 + 패널로 접습니다.</li>
    </ul>

    <h2>쓰는 컴포넌트</h2>
    <p><a href="#/components/input">Input</a> · <a href="#/components/select">Select</a> ·
       <a href="#/components/chip">Chip</a> · <a href="#/components/buttongroup">ButtonGroup</a> ·
       <a href="#/components/empty">EmptyState</a></p>
  </div>`)

const states = P('states', 'Loading & Empty & Error', '로딩 · 빈 · 에러', 'core',
  '데이터가 없거나 실패했을 때의 다섯 가지 상태.', () => `
  <div class="prose">
    <div class="callout">
      <b>모든 목록·테이블·검색 화면은 다섯 상태를 전부 가집니다.</b>
      나중에 추가하는 비용이 처음부터 만드는 것보다 훨씬 큽니다.
    </div>

    <h2>다섯 상태</h2>
    <table>
      <thead><tr><th>상태</th><th>쓰는 것</th><th>주의</th></tr></thead>
      <tbody>
        <tr><td><code>default</code></td><td>—</td><td></td></tr>
        <tr><td><code>loading</code></td><td>Skeleton (에이전트면 ThinkingIndicator)</td><td>실제 콘텐츠와 비슷한 크기·개수로</td></tr>
        <tr><td><code>empty</code></td><td>EmptyState</td><td><b>다음 행동을 반드시 제안</b></td></tr>
        <tr><td><code>error</code></td><td>Alert + 재시도</td><td>사과하지 않고 무엇을 할 수 있는지</td></tr>
        <tr><td><code>partial</code></td><td>Alert(warning) + 성공분 표시</td><td>가장 자주 빠뜨립니다</td></tr>
      </tbody>
    </table>

    <h2>빈 상태는 네 종류입니다</h2>
    <p>같은 문구로 처리하면 사용자는 무엇을 해야 할지 알 수 없습니다.</p>
    <table>
      <thead><tr><th>종류</th><th>문구</th><th>액션</th></tr></thead>
      <tbody>
        <tr><td>아직 만든 적 없음</td><td>"에이전트가 없습니다"</td><td>만들기</td></tr>
        <tr><td>검색 결과 없음</td><td>"'회의록 2019'에 대한 결과가 없습니다"</td><td>검색어 수정 안내</td></tr>
        <tr><td>필터로 걸러짐</td><td>"조건에 맞는 항목이 없습니다"</td><td><b>필터 해제</b></td></tr>
        <tr><td>권한 없음</td><td>"이 폴더를 볼 권한이 없습니다"</td><td>권한 요청</td></tr>
      </tbody>
    </table>

    <h2>partial — 에이전트 제품의 필수 상태</h2>
    <p>
      "문서 10건 중 7건만 읽었다"는 상황이 흔합니다.
      전부 실패로 처리하면 읽은 7건이 낭비되고, 성공으로 처리하면 사용자가 속습니다.
    </p>
    <div class="demo" style="border-radius:var(--r-xl)">
      <div class="ds-alert-demo warn" style="margin-bottom:12px">
        <b>문서 10건 중 7건을 읽었습니다</b>
        <span>3건은 스캔본이라 텍스트 레이어가 없습니다. OCR을 실행하면 포함할 수 있습니다.</span>
      </div>
      <div class="toolcall"><span class="check">${ic('success', 'sm')}</span> read_documents(10) — 7 succeeded, 3 failed</div>
    </div>
  </div>`)

const destructive = P('destructive', 'Confirmation & Destructive', '확인 · 파괴적 액션', 'core',
  '되돌릴 수 없는 작업을 안전하게 처리합니다.', () => `
  <div class="prose">
    <h2>먼저: 확인창을 띄우지 않는 방법을 찾습니다</h2>
    <p>
      <b>되돌리기(Undo)가 확인창보다 낫습니다.</b>
      확인창은 매번 흐름을 끊지만, Undo는 실수했을 때만 개입합니다.
      실제로 되돌릴 수 있다면 바로 실행하고 Snackbar에 "실행 취소"를 답니다.
    </p>
    <div class="demo" style="border-radius:var(--r-xl)">
      <div class="toast danger" style="max-width:360px"><span class="t-dot"></span>
        <span class="t-body">에이전트를 삭제했습니다.</span><button class="t-action">실행 취소</button></div>
    </div>

    <h2>확인창이 필요한 경우</h2>
    <ul>
      <li>정말 되돌릴 수 없을 때</li>
      <li>다른 사람에게 영향이 갈 때 (공유 항목 삭제, 권한 회수)</li>
      <li>비용이 발생할 때</li>
    </ul>

    <h2>확인창 쓰기</h2>
    <div class="demo" style="border-radius:var(--r-xl)">
      <div class="ds-dialog-panel" style="max-width:440px">
        <div class="ds-dialog-head">에이전트를 삭제할까요?</div>
        <div class="ds-dialog-body">이 작업은 되돌릴 수 없습니다. 연결된 실행 기록 128건도 함께 삭제됩니다.</div>
        <div class="ds-dialog-foot">
          <button class="btn btn-secondary btn-sm">취소</button>
          <button class="btn btn-danger btn-sm">삭제</button>
        </div>
      </div>
    </div>
    <table>
      <thead><tr><th>요소</th><th>규칙</th></tr></thead>
      <tbody>
        <tr><td>제목</td><td>질문으로 — "에이전트를 삭제할까요?"</td></tr>
        <tr><td>본문</td><td><b>결과를 구체적으로</b> — "실행 기록 128건도 함께 삭제됩니다"</td></tr>
        <tr><td>확인 버튼</td><td>동작을 반복 — <b>[확인]이 아니라 [삭제]</b></td></tr>
        <tr><td>취소 버튼</td><td>왼쪽, secondary</td></tr>
        <tr><td>기본 포커스</td><td><b>취소</b>에 둡니다. Enter를 잘못 눌러 삭제되면 안 됩니다</td></tr>
      </tbody>
    </table>
    <p>
      영향이 아주 큰 경우(워크스페이스 삭제)는 <b>이름을 타이핑</b>하게 합니다.
      다만 남용하면 사용자가 기계적으로 치게 되므로 정말 큰 것에만 씁니다.
    </p>
  </div>`)

const status = P('status', 'Object Status', '객체 상태', 'core',
  '항목이 지금 어떤 상태인지 일관되게 보여줍니다.', () => `
  <div class="prose">
    <h2>상태 어휘를 고정합니다</h2>
    <p>
      화면마다 "진행 중" "실행 중" "처리 중"이 섞이면 같은 상태인지 알 수 없습니다.
      <b>제품 전체에서 하나의 어휘</b>를 씁니다.
    </p>
    <table>
      <thead><tr><th>상태</th><th>배지</th><th>뜻</th></tr></thead>
      <tbody>
        <tr><td><code>대기</code></td><td><span class="badge"><span class="dot"></span>대기</span></td><td>아직 시작하지 않음</td></tr>
        <tr><td><code>실행 중</code></td><td><span class="badge brand"><span class="dot"></span>실행 중</span></td><td>진행 중</td></tr>
        <tr><td><code>완료</code></td><td><span class="badge success"><span class="dot"></span>완료</span></td><td>정상 종료</td></tr>
        <tr><td><code>실패</code></td><td><span class="badge danger"><span class="dot"></span>실패</span></td><td>오류로 중단</td></tr>
        <tr><td><code>부분 완료</code></td><td><span class="badge"><span class="dot" style="background:var(--warning)"></span>부분 완료</span></td><td>일부만 성공</td></tr>
      </tbody>
    </table>

    <h2>규칙</h2>
    <ul>
      <li><b>색만으로 구분하지 않습니다.</b> 점 + 텍스트를 항상 함께 — 색맹 사용자를 위해서입니다.</li>
      <li>테이블에서는 <b>상태 열을 고정 위치</b>에 둡니다. 화면마다 위치가 바뀌면 못 찾습니다.</li>
      <li>실패 상태는 <b>왜 실패했는지</b>를 Tooltip이나 상세로 볼 수 있게 합니다.</li>
      <li>Badge는 읽기 전용입니다. 상태를 바꿀 수 있으면 Select나 Menu를 씁니다.</li>
    </ul>
  </div>`)

/* ══════════════════ AGENT ══════════════════ */

const streaming = P('streaming', 'Streaming Response', '스트리밍 응답', 'agent',
  '응답이 만들어지는 동안 무엇을 보여줄지.', () => `
  <div class="prose">
    <div class="callout">
      <b>원칙 1 — 로딩이 아니라 진행을 보여줍니다.</b>
      에이전트는 10~30초씩 걸립니다. 빈 스피너는 "느린 제품", 진행 중인 추론과
      도구 실행이 보이면 "일하는 제품"이 됩니다.
    </div>

    <h2>네 단계</h2>
    <div class="demo" style="border-radius:var(--r-xl)">
      <div class="thinking" style="margin-bottom:14px"><span class="dots"><i></i><i></i><i></i></span>요청을 이해하는 중…</div>
      <div class="toolcall"><span class="check">${ic('success', 'sm')}</span> search_drive("계약서", June) — 3 files found</div>
      <div class="toolcall"><span class="spinner"></span> read_document("계약서_최종.pdf")</div>
      <div class="msg-text" style="margin-top:12px">6월에 체결된 계약서 3건을 찾았습니다. 그중 최종본<span class="cite">1</span>의 핵심 조항은<span class="cursor"></span></div>
    </div>
    <table>
      <thead><tr><th>단계</th><th>보여주는 것</th></tr></thead>
      <tbody>
        <tr><td>1. 접수</td><td>ThinkingIndicator — "요청을 이해하는 중…"</td></tr>
        <tr><td>2. 도구 실행</td><td>ToolCallStep — 무엇을 실행하는지 이름과 인자 그대로</td></tr>
        <tr><td>3. 생성</td><td>StreamingText — 텍스트 + 깜빡이는 커서</td></tr>
        <tr><td>4. 완료</td><td>커서 제거. 인용 칩 활성화</td></tr>
      </tbody>
    </table>

    <h2>규칙</h2>
    <ul>
      <li><b>10초 이상 걸리면 문구를 갱신합니다.</b> "문서를 읽는 중…" → "요약을 작성하는 중…"</li>
      <li><b>스크롤을 강제로 내리지 않습니다.</b> 사용자가 위를 읽고 있으면 그대로 두고,
          "새 내용 ↓" 버튼을 띄웁니다.</li>
      <li><b>생성 중에는 전송 버튼을 정지(Stop)로</b> 바꿔 멈출 수 있게 합니다.</li>
      <li>완료 즉시 커서를 없앱니다. 남아 있으면 멈춘 것처럼 보입니다.</li>
      <li>스트리밍 영역에 <code>aria-live="polite"</code> — 스크린리더가 도착을 읽어줍니다.</li>
    </ul>
  </div>`)

const evidence = P('evidence', 'Citations & Evidence', '근거 표시', 'agent',
  '무엇을 근거로 답했는지 항상 열어볼 수 있게 합니다.', () => `
  <div class="prose">
    <div class="callout">
      <b>원칙 4 — 근거를 숨기지 않습니다.</b>
      접어둘 수는 있어도 없애지 않습니다. 이것이 에이전트 제품의 신뢰를 만듭니다.
    </div>

    <h2>세 층</h2>
    <div class="demo" style="border-radius:var(--r-xl)">
      <div class="toolcall"><span class="check">${ic('success', 'sm')}</span> search_drive("계약서", June) — 3 files found</div>
      <div class="msg-text" style="margin:12px 0">계약 기간은 12개월이며<span class="cite">1</span> 대금은 30일 이내 지급합니다<span class="cite">2</span></div>
      <div class="ds-acc-demo" style="max-width:460px">
        <div class="h">원본 페이로드 보기 <span>${ic('collapse', 'sm')}</span></div>
      </div>
    </div>
    <table>
      <thead><tr><th>층</th><th>보여주는 것</th><th>기본 상태</th></tr></thead>
      <tbody>
        <tr><td>1. 무엇을 했나</td><td>ToolCallStep — 도구 이름과 인자</td><td><b>펼침</b></td></tr>
        <tr><td>2. 어디서 왔나</td><td>CitationChip — 문장 뒤 번호</td><td><b>항상 표시</b></td></tr>
        <tr><td>3. 원문</td><td>Accordion — 페이로드·발췌</td><td>접힘</td></tr>
      </tbody>
    </table>

    <h2>규칙</h2>
    <ul>
      <li><b>인용 칩은 근거가 있는 주장에만</b> 답니다. 문장마다 달면 의미가 없어집니다.</li>
      <li>클릭하면 <b>원문 위치로 이동</b>합니다. 새 창이 아니라 옆 패널이 좋습니다.</li>
      <li><b>근거가 없는 문장은 그렇다고 말합니다</b> — "문서에서 확인되지 않았지만 일반적으로는…"</li>
      <li>툴콜은 본문 <b>위</b>에 둡니다. 무엇을 근거로 답했는지가 답보다 먼저 보여야 합니다.</li>
      <li>실패한 툴콜도 그대로 보여줍니다. 무엇을 못 했는지 아는 것이 유용합니다.</li>
    </ul>
  </div>`)

const approval = P('approval', 'Human in the Loop', '사람의 승인', 'agent',
  '에이전트가 되돌릴 수 없는 일을 하기 전에 멈춥니다.', () => `
  <div class="prose">
    <h2>언제 멈추나</h2>
    <table>
      <thead><tr><th>행동</th><th>처리</th></tr></thead>
      <tbody>
        <tr><td>읽기 · 검색 · 요약</td><td>그냥 실행. 승인 불필요</td></tr>
        <tr><td>파일 생성 · 수정</td><td>실행 후 <b>되돌리기</b> 제공</td></tr>
        <tr><td>삭제 · 외부 전송 · 결제</td><td><b>실행 전 승인</b></td></tr>
        <tr><td>권한 변경 · 대량 작업</td><td><b>실행 전 승인 + 영향 범위 명시</b></td></tr>
      </tbody>
    </table>

    <h2>승인 요청의 모양</h2>
    <div class="demo" style="border-radius:var(--r-xl)">
      <div class="toolcall" style="border-color:var(--warning);background:transparent">
        ${ic('warning', 'sm')} delete_documents(3) — 승인이 필요합니다
      </div>
      <div style="border:1px solid var(--gray-4);border-radius:var(--r-lg);padding:14px 16px;margin-top:10px;max-width:520px">
        <div style="font-size:13.5px;font-weight:600;margin-bottom:8px">문서 3건을 삭제할까요?</div>
        <div style="font-size:13px;color:var(--gray-11);line-height:1.7">
          계약서_v1.docx · 계약서_v1_수정.docx · 임시메모.txt<br>
          <span style="color:var(--gray-9)">되돌릴 수 없습니다. 휴지통을 거치지 않습니다.</span>
        </div>
        <div style="display:flex;gap:8px;margin-top:14px">
          <button class="btn btn-secondary btn-sm">거절</button>
          <button class="btn btn-danger btn-sm">삭제 승인</button>
        </div>
      </div>
    </div>

    <h2>규칙</h2>
    <ul>
      <li><b>무엇을 할지 구체적으로</b> 나열합니다. "파일을 정리할까요?"가 아니라 파일 이름을 보여줍니다.</li>
      <li>대상이 많으면 <b>개수 + 처음 몇 개 + "외 N건"</b>으로 보여주고 펼칠 수 있게 합니다.</li>
      <li>승인을 기다리는 동안 <b>다른 작업은 계속</b>합니다. 전체를 멈추지 않습니다.</li>
      <li>거절하면 <b>이유를 물어보고</b> 그 맥락으로 다시 시도할 수 있게 합니다.</li>
      <li>"항상 허용"을 제공하되 <b>범위를 좁게</b> — "이 폴더에서만", "이 대화에서만".</li>
    </ul>
  </div>`)

const aiContent = P('ai-content', 'AI Content Labeling', 'AI 생성 표시', 'agent',
  '무엇이 AI가 만든 것인지 구분합니다.', () => `
  <div class="prose">
    <div class="callout">
      <b>사용자가 화면의 어떤 부분을 신뢰해야 할지 알 수 있어야 합니다.</b>
      원본 데이터와 AI가 만든 내용이 같은 모양이면 구분할 수 없습니다.
    </div>

    <h2>표시 방법</h2>
    <table>
      <thead><tr><th>상황</th><th>표시</th></tr></thead>
      <tbody>
        <tr><td>대화 안의 응답</td><td>아바타가 이미 구분 — 추가 표시 불필요</td></tr>
        <tr><td>일반 화면에 삽입된 요약</td><td><b>배지</b> + 조용한 브랜드 배경</td></tr>
        <tr><td>AI가 채운 폼 값</td><td>필드 옆 배지 + "확인하세요" 힌트</td></tr>
        <tr><td>AI 생성 중</td><td>Skeleton이 아니라 <b>ThinkingIndicator</b></td></tr>
      </tbody>
    </table>
    <div class="demo" style="border-radius:var(--r-xl)">
      <div style="border:1px solid var(--gray-4);border-radius:var(--r-lg);padding:16px;max-width:480px;background:var(--surface)">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
          <span class="badge brand"><span class="dot"></span>AI 요약</span>
          <span style="font-size:11.5px;color:var(--gray-9);font-family:var(--mono)">3개 문서 기반</span>
        </div>
        <div style="font-size:13.5px;color:var(--gray-12);line-height:1.7">
          6월 계약 3건의 공통 조건은 12개월 자동 갱신, 30일 이내 대금 지급입니다<span class="cite">1</span>.
        </div>
        <div style="font-size:12px;color:var(--gray-9);margin-top:10px">
          생성된 내용입니다. 중요한 결정 전에 원문을 확인하세요.
        </div>
      </div>
    </div>

    <h2>규칙</h2>
    <ul>
      <li><b>AI 배지는 브랜드 subtle 배경</b>으로 조용하게. 경고색을 쓰지 않습니다 — 위험한 게 아니라 출처가 다를 뿐입니다.</li>
      <li><b>무엇을 근거로 만들었는지</b> 함께 표시합니다 — "3개 문서 기반".</li>
      <li>사용자가 <b>수정하면 배지를 제거</b>합니다. 더 이상 AI 생성물이 아닙니다.</li>
      <li>확신이 낮으면 <b>말로 표현</b>합니다 — "문서에서 명확하지 않습니다".
          확률 퍼센트는 대부분 도움이 되지 않습니다.</li>
    </ul>
  </div>`)

const recovery = P('recovery', 'Error Recovery', '실패 복구', 'agent',
  '에이전트가 실패했을 때 사용자가 빠져나갈 길.', () => `
  <div class="prose">
    <div class="callout">
      <b>원칙 2 — 실패는 예외가 아니라 기본 상태 중 하나입니다.</b>
      에이전트는 도구 실패·권한 부족·모호한 요청으로 자주 멈춥니다.
      실패 화면의 품질이 제품의 품질입니다.
    </div>

    <h2>실패 종류별 처리</h2>
    <table>
      <thead><tr><th>실패</th><th>말할 것</th><th>줄 것</th></tr></thead>
      <tbody>
        <tr><td>도구 실패</td><td>어느 도구가 왜 실패했는지</td><td>재시도 · 건너뛰고 계속</td></tr>
        <tr><td>권한 부족</td><td>어떤 권한이 없는지</td><td>권한 요청 버튼</td></tr>
        <tr><td>요청이 모호함</td><td>무엇이 불명확한지</td><td><b>구체적인 되묻기</b></td></tr>
        <tr><td>부분 성공</td><td>몇 건 성공 · 몇 건 실패</td><td>성공분 유지 + 실패분 재시도</td></tr>
        <tr><td>한도 초과</td><td>어떤 한도인지</td><td>대기 시간 또는 상위 요금제</td></tr>
      </tbody>
    </table>

    <div class="demo" style="border-radius:var(--r-xl)">
      <div class="toolcall"><span class="check" style="color:var(--danger)">${ic('close', 'sm')}</span> extract_table("스캔본.pdf") — 텍스트 레이어 없음</div>
      <div class="msg-text" style="margin-top:12px">
        스캔본.pdf는 이미지로만 되어 있어 표를 읽지 못했습니다.
        OCR을 실행하면 시도할 수 있습니다 — 약 30초 걸립니다.
      </div>
      <div style="display:flex;gap:8px;margin-top:12px">
        <button class="btn btn-secondary btn-sm">건너뛰고 계속</button>
        <button class="btn btn-primary btn-sm">OCR 실행</button>
      </div>
    </div>

    <h2>규칙</h2>
    <ul>
      <li><b>사과하지 않습니다.</b> 무엇이 일어났고 무엇을 할 수 있는지 말합니다.</li>
      <li><b>여기까지 한 것은 버리지 않습니다.</b> 3건 중 2건을 읽었으면 그 2건은 남깁니다.</li>
      <li><b>내부 에러 코드를 그대로 노출하지 않습니다.</b> 다만 상세는 접어서 제공합니다 (지원 문의용).</li>
      <li><b>같은 실패를 반복하지 않습니다.</b> 두 번 실패하면 다른 방법을 제안하거나 사람에게 넘깁니다.</li>
      <li>모호한 요청은 <b>추측해서 실행하지 말고</b> 되묻습니다 — 다만 선택지를 함께 줍니다.</li>
    </ul>
  </div>`)

/* ══════════════════ TEMPLATES ══════════════════ */

const tplIndex = P('t-index', 'Index Page', '목록 화면', 'template',
  '데이터를 나열하고 찾는 화면.', () => `
  <div class="prose">
    <h2>골격</h2>
    <pre><code>제목 + 주요 액션 (우상단)
─────────────────────────
요약 카드 (선택)
필터 바 + 활성 필터 칩
─────────────────────────
테이블 또는 목록
페이지네이션</code></pre>
    <table>
      <thead><tr><th>영역</th><th>컴포넌트</th></tr></thead>
      <tbody>
        <tr><td>제목 · 액션</td><td>Button (primary는 하나)</td></tr>
        <tr><td>요약</td><td>Card</td></tr>
        <tr><td>필터</td><td>Input · Select · Chip · ButtonGroup</td></tr>
        <tr><td>본문</td><td>DataTable (열 고정) 또는 List</td></tr>
        <tr><td>상태 5종</td><td>Skeleton · EmptyState · Alert</td></tr>
      </tbody>
    </table>
    <p><b>밀도는 compact.</b> 훑어보는 화면이기 때문입니다.</p>
    <p class="tpl-link"><a href="live/#audit" target="_blank" rel="noopener">감사 로그 예시 열기 ${ic('externalLink', 'sm')}</a></p>
  </div>`)

const tplDetail = P('t-detail', 'Detail Page', '상세 화면', 'template',
  '한 항목을 자세히 보고 조작하는 화면.', () => `
  <div class="prose">
    <h2>골격</h2>
    <pre><code>Breadcrumbs
제목 + 상태 배지 + 액션 메뉴
─────────────────────────
Tabs: 개요 | 활동 | 설정
─────────────────────────
좌: 본문        우: 메타 정보 패널</code></pre>
    <ul>
      <li><b>제목 옆에 상태 배지</b>를 둡니다. 지금 어떤 상태인지가 첫 줄에 보여야 합니다.</li>
      <li>파괴적 액션은 <b>⋯ 메뉴 안</b>에. 화면에 노출하지 않습니다.</li>
      <li>메타 정보(생성자·시각·ID)는 우측 패널에 고정폭 글꼴로.</li>
      <li><b>밀도는 comfortable.</b> 읽는 화면입니다.</li>
    </ul>
    <p>쓰는 것: Breadcrumbs · Badge · Menu · Tabs · Timeline · Card</p>
  </div>`)

const tplSettings = P('t-settings', 'Settings Page', '설정 화면', 'template',
  '값을 바꾸고 저장하는 화면.', () => `
  <div class="prose">
    <h2>골격</h2>
    <pre><code>좌: 섹션 내비   우: 섹션별 설정 그룹
                  ├ 그룹 제목 + 설명
                  ├ 항목들
                  └ 구분선
                  위험 구역 (맨 아래)</code></pre>
    <table>
      <thead><tr><th>항목 종류</th><th>컴포넌트</th></tr></thead>
      <tbody>
        <tr><td>즉시 반영되는 on/off</td><td><b>Switch</b> — 저장 버튼 없음</td></tr>
        <tr><td>저장이 필요한 값</td><td>Input · Select + 하단 저장 버튼</td></tr>
        <tr><td>배타적 선택</td><td>RadioGroup</td></tr>
        <tr><td>위험 구역</td><td>맨 아래, danger 버튼, 확인창</td></tr>
      </tbody>
    </table>
    <ul>
      <li><b>Switch와 Checkbox를 섞지 않습니다.</b> 한 화면에서 저장 방식이 갈리면 혼란스럽습니다.</li>
      <li>변경 후 이동하려 하면 <b>저장하지 않은 변경이 있다고 알립니다</b>.</li>
      <li><b>밀도는 spacious.</b> 실수하면 되돌리기 어려운 조작이 섞입니다.</li>
    </ul>
  </div>`)

const tplWizard = P('t-wizard', 'Wizard', '마법사', 'template',
  '여러 단계로 나뉜 생성 흐름.', () => `
  <div class="prose">
    <h2>골격</h2>
    <pre><code>Stepper (1 소스 → 2 규칙 → 3 검토)
─────────────────────────
현재 단계 내용
─────────────────────────
이전                    다음 / 만들기</code></pre>
    <ul>
      <li><b>단계는 5개를 넘지 않습니다.</b> 넘으면 흐름을 나눕니다.</li>
      <li>마지막은 항상 <b>검토 단계</b> — 지금까지 고른 것을 요약해 보여줍니다.</li>
      <li>이전 단계로 돌아가도 <b>입력한 값이 남아 있어야</b> 합니다.</li>
      <li>중간에 나가면 <b>임시 저장</b>하거나 나가도 되는지 확인합니다.</li>
      <li>각 단계에서 <b>지금 무엇을 정하는지</b> 한 줄로 설명합니다.</li>
    </ul>
    <p>쓰는 것: Stepper · Input · Select · Alert · Button</p>
  </div>`)

const tplChat = P('t-chat', 'Chat / Agent', '챗 · 에이전트', 'template',
  '에이전트와 대화하는 화면.', () => `
  <div class="prose">
    <h2>골격</h2>
    <pre><code>좌: 대화 목록    우: 메시지 스트림
                    ├ 사용자 메시지
                    ├ 툴콜 (본문 위)
                    ├ 응답 + 인용
                    └ 입력창 (하단 고정)</code></pre>
    <ul>
      <li><b>본문 너비는 720px을 넘기지 않습니다.</b> 한 줄이 길면 다음 줄 첫 글자를 찾기 어렵습니다.</li>
      <li>툴콜은 <b>본문 위</b>에. 근거가 답보다 먼저 보여야 합니다.</li>
      <li>입력창은 하단 고정. Enter 전송, Shift+Enter 줄바꿈.</li>
      <li>긴 산출물은 인라인 대신 <b>ArtifactPanel</b>로 분리합니다.</li>
      <li><b>밀도는 spacious.</b> 읽는 화면입니다.</li>
    </ul>
    <p class="tpl-link">
      <a href="templates/chat.html" target="_blank" rel="noopener">HTML 시안 ${ic('externalLink', 'sm')}</a>
      <a href="live/" target="_blank" rel="noopener">라이브 갤러리 ${ic('externalLink', 'sm')}</a>
    </p>
  </div>`)

const tplSearch = P('t-search', 'Search Results', '검색 결과', 'template',
  '찾은 것을 보여주는 화면.', () => `
  <div class="prose">
    <h2>골격</h2>
    <pre><code>검색 바
필터 칩 (전체 | 문서 | 대화 | 에이전트)
결과 개수 · 소요 시간
─────────────────────────
결과 목록 (제목 · 경로 · 하이라이트 문맥)</code></pre>
    <ul>
      <li><b>결과 개수와 소요 시간</b>을 보여줍니다. 빠르다는 것도 정보입니다.</li>
      <li>하이라이트는 <b>브랜드 subtle 배경</b>으로 조용하게. 형광펜처럼 쓰지 않습니다.</li>
      <li>경로를 함께 보여줍니다 — 같은 이름의 파일이 여러 개일 수 있습니다.</li>
      <li>0건일 때는 <b>필터 해제 버튼이 있는 빈 상태</b>로.</li>
    </ul>
    <p class="tpl-link"><a href="templates/search.html" target="_blank" rel="noopener">HTML 시안 ${ic('externalLink', 'sm')}</a></p>
  </div>`)

const tplDrive = P('t-drive', 'File Browser', '드라이브', 'template',
  '파일을 찾고 정리하는 화면.', () => `
  <div class="prose">
    <h2>골격</h2>
    <pre><code>Breadcrumbs + 보기 전환 + 업로드
─────────────────────────
좌: 폴더 트리   우: 파일 그리드 또는 목록
                   선택 시 하단 액션 바</code></pre>
    <ul>
      <li><b>그리드와 리스트가 같은 데이터</b>여야 합니다. 전환해도 선택이 유지됩니다.</li>
      <li>그리드는 훑어보기용, 리스트는 세부 비교용입니다.</li>
      <li>다중 선택 시 <b>하단에 액션 바</b>가 올라옵니다 — 선택 개수와 함께.</li>
      <li>업로드는 <b>드래그 앤 드롭</b>을 함께 지원하고, 허용 형식·최대 크기를 미리 알립니다.</li>
      <li><b>밀도는 compact.</b></li>
    </ul>
    <p>쓰는 것: Breadcrumbs · ButtonGroup · Treeview · FileGrid · FileRow · FileInput</p>
  </div>`)

export const PATTERNS = [
  forms, filtering, states, destructive, status,
  streaming, evidence, approval, aiContent, recovery,
  tplIndex, tplDetail, tplSettings, tplWizard, tplChat, tplSearch, tplDrive,
]

export const PATTERN_BY_ID = Object.fromEntries(PATTERNS.map((p) => [p.id, p]))
