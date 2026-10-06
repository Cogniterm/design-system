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
          <input class="input" value="Acme Inc." /><div class="hint">모든 구성원에게 표시됩니다.</div></div>
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

    <h2>값을 고르는 컨트롤</h2>
    <table>
      <thead><tr><th>값</th><th>컨트롤</th></tr></thead>
      <tbody>
        <tr><td>2~5개 · 짧은 라벨</td><td><b>세그먼티드</b> — 다 보여 줍니다. 사다리(이용 ⊂ 편집)면 차례대로</td></tr>
        <tr><td>그보다 많거나 라벨이 김</td><td>DsSelect (드롭다운)</td></tr>
        <tr><td>한 줄에서 하나 고르는 값이 <b>여러 줄</b>에 걸침</td><td><b>매트릭스</b> — 줄끼리 열이 맞아 세로로 훑을 수 있습니다</td></tr>
        <tr><td>표 안에서 상태를 바꾸는 칸</td><td><b>태그 드롭다운</b> — 배지 모양 + 셰브런. 테두리 있는 Select를 넣지 않습니다</td></tr>
        <tr><td>날짜</td><td>DS 달력 — readonly 트리거 + 팝오버</td></tr>
      </tbody>
    </table>
    <ul>
      <li><b>네이티브 <code>&lt;select&gt;</code> · <code>&lt;input type="date"&gt;</code>를 쓰지 않습니다.</b> 시스템 UI는 글꼴 · 줄 높이 · 라운드가 달라 그 칸만 결이 어긋납니다. 파일 고르기만 예외입니다.</li>
      <li>못 고르는 값은 지우지 말고 <b>잠급니다</b> — 지우면 칸 수가 달라져 줄이 어긋나고, 왜 잠겼는지는 툴팁이 말합니다.</li>
      <li><b>화면의 뜻을 뒤집는 토글을 두지 않습니다.</b> 누르면 왼쪽 · 오른쪽이 자리를 바꾸는 전환은 매번 "지금 어느 쪽이지"를 되짚게 합니다. 반대 방향은 그 대상의 화면에 읽기 전용으로 답니다.</li>
    </ul>

    <h2>한글 입력 (IME)</h2>
    <ul>
      <li><b>치는 대로 거르는 칸에 Vue <code>v-model</code>을 쓰지 않습니다.</b> 한글은 음절이 끝나야 조합이 끝나 'ㅈ' 한 글자가 영영 안 올라오고, 마지막 음절은 늘 빠집니다.
          <code>:value</code> + <code>@input</code>으로 입력칸의 값을 직접 읽습니다(제품의 <code>imeValue($event)</code>).</li>
      <li><b>치고 있는 입력칸을 다시 그리지 않습니다.</b> 칸이 새 노드로 바뀌면 조합이 그 자리에서 확정돼 '인사'가 'ㅇㅣㄴㅅㅏ'가 됩니다. 검색어에 딸린 <b>목록만</b> 갈아 끼웁니다.</li>
      <li>제출할 때 한 번 읽는 칸(이름 · 메모 · 답변)은 <code>v-model</code> 그대로 둡니다.</li>
    </ul>

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
      필터 줄 → <b>조건 칩 줄</b> → 건수 → 결과. 지금 무엇이 걸려 있는지가
      항상 보여야 합니다. 결과가 적을 때 "왜 적지?"를 스스로 답할 수 있어야 합니다.
    </p>
    <pre><code>[필터] [ 전체 ▾ | 검색어…  🔍 ]            건수 · [표 열 설정]   ← 필터 줄
담당자 확인: 미확인   상태: 오류 ×   부서: 인사팀 ×                ← 조건 칩 줄 (걸린 게 없으면 숨김)
12 / 전체 128건                                                    ← 건수 (한 곳)</code></pre>
    <div class="demo" style="border-radius:var(--r-ct)">
      <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-bottom:12px">
        <span class="chip brand" style="height:28px;background:transparent;border-color:var(--primary)">담당자 확인: 미확인</span>
        <span class="chip brand" style="height:28px;background:transparent;border-color:var(--primary)">상태: 오류<button class="x" aria-label="빼기">${ic('close', 12)}</button></span>
        <span class="chip brand" style="height:28px;background:transparent;border-color:var(--primary)">부서: 인사팀<button class="x" aria-label="빼기">${ic('close', 12)}</button></span>
      </div>
      <div style="font-size:var(--text-xs);color:var(--gray-10)">12 / 전체 128건</div>
    </div>

    <h2>규칙</h2>
    <ul>
      <li><b>필터는 즉시 반영</b>합니다. 패널에 "적용 / 취소" 발을 두지 않습니다.</li>
      <li>필터 축은 <b>[필터] 버튼 + 패널</b>에 모읍니다. 패널은 조건 칩 줄 <b>아래로</b> 엽니다 — 고르는 동안 쌓인 조건이 보여야 합니다.</li>
      <li>걸린 조건은 <b>필터 줄과 건수 사이 제 줄</b>에 칩으로 쌓습니다. 칩은 <b>면 없이 브랜드 선 + 글자 · 28px · 네모(6px)</b>.
          <b>×는 그 값 하나</b>만 뺍니다. <b>기본값 칩에는 ×가 없고</b>, 누르면 패널이 그 축으로 열립니다.</li>
      <li>칩 줄에 "모두 해제"를 두지 않습니다 — 한꺼번에 비우기는 패널 안 [모두 지우기] 하나입니다.</li>
      <li>건수는 <b>목록 위 한 곳</b> — "N / 전체 M건". 안 좁혀졌으면 "전체 M건". <b>0건이면 필터 해제 길이 있는 빈 상태</b>로.</li>
      <li><b>칸 필터</b> — 링크 표에서 분류되는 칸(상태 · 유형 · 사람 · 부서)을 누르면 그 축을 그 값 하나로 겁니다.
          표시는 <b>hover 때 밑줄뿐</b>이고 기본 상태에는 밑줄을 긋지 않습니다. 일시 · 수치 · 자유 글 · 구간 축에는 달지 않습니다.</li>
      <li>거르개 · 검색 · 정렬을 바꾸면 <b>쪽은 1로</b> 돌아갑니다.</li>
      <li>치는 대로 거르는 검색칸은 <b>Vue <code>v-model</code>을 쓰지 않습니다</b> — 한글 조합 중엔 값이 안 올라옵니다(폼 패턴 참조).</li>
    </ul>

    <h2>쓰는 컴포넌트</h2>
    <p><a href="#/components/input">Input</a> · <a href="#/components/select">Select</a> ·
       <a href="#/components/chip">Chip</a> · <a href="#/components/buttongroup">ButtonGroup</a> ·
       <a href="#/components/empty">EmptyState</a></p>
  </div>`)

const states = P('states', 'Loading & Empty & Error', '로딩 · 빈 · 에러', 'core',
  '데이터가 없거나 실패했을 때의 다섯 가지 상태.', () => `
  <div class="prose">
    <p>
      <b>모든 목록·테이블·검색 화면은 다섯 상태를 전부 가집니다.</b>
      나중에 추가하는 비용이 처음부터 만드는 것보다 훨씬 큽니다.
    </p>

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
      (편집 모드 안의 낱개 조작은 예외 — 되돌리는 길은 [취소] 하나입니다)
    </p>
    <div class="demo" style="border-radius:var(--r-xl)">
      <div class="toast danger" style="max-width:360px"><span class="t-icon">${ic('error','sm')}</span>
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
        <tr><td>취소 버튼</td><td>왼쪽, 중립(테두리) 버튼</td></tr>
        <tr><td>기본 포커스</td><td><b>취소</b>에 둡니다. Enter를 잘못 눌러 삭제되면 안 됩니다</td></tr>
      </tbody>
    </table>
    <p>
      영향이 아주 큰 경우(워크스페이스 삭제)는 <b>이름을 타이핑</b>하게 합니다.
      다만 남용하면 사용자가 기계적으로 치게 되므로 정말 큰 것에만 씁니다.
    </p>

    <h2>다이얼로그는 두 규격입니다</h2>
    <table>
      <thead><tr><th>규격</th><th>쓰는 곳</th><th>모양</th></tr></thead>
      <tbody>
        <tr><td><b>기본형</b></td><td>보여 줄 내용 없이 묻기만 하는 창</td><td>제목 + 설명 + 발 · 폭 460 · 안여백 20 · 선 없음</td></tr>
        <tr><td><b>구획형</b></td><td>변경 목록 · 표 · 폼처럼 본문이 있는 창</td><td>머리 · 본문 · 발을 1px 선으로 나눔</td></tr>
      </tbody>
    </table>
    <p>구획형에 본문을 비우면 선 두 개가 맞붙습니다 — 짧은 확인은 기본형으로.</p>

    <h2>닫히는 길</h2>
    <ul>
      <li><b>모든 창은 바깥 클릭 · Esc · X로 닫힙니다.</b> 확인 창이 닫히는 결과는 [취소]와 같아 막을 이유가 없습니다.</li>
      <li><code>persistent</code>는 <b>되돌릴 수 없는 진행 중 작업</b>(올리는 중 · 실행 중)에만 겁니다.</li>
      <li><b>쓰다 만 입력이 있다고 묻지 않습니다.</b> 창이 [저장]으로 받는 것이 없으면 그냥 닫습니다.
          (화면의 편집 모드에서 저장 안 한 채 나가는 것은 다릅니다 — 편집 모드 패턴)</li>
      <li>겹친 창은 위엣것부터 닫힙니다. Esc는 한 겹씩.</li>
    </ul>

    <h2>끄기와 켜기</h2>
    <ul>
      <li><b>끄기(비활성화)는 가벼운 확인</b>, <b>켜기는 즉시</b>. 저위험 동작에 무거운 모달을 달지 않습니다.</li>
      <li><b>막을 거면 막힌 자리에서 풀 수 있어야 합니다.</b> "먼저 7명을 옮기세요"만 띄우지 말고, 지우는 창 안에서
          옮길 곳을 고르게 합니다. 풀 방법이 없는 진짜 제약만 경고로 남깁니다.</li>
    </ul>
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
        <tr><td><code>대기</code></td><td><span class="badge">대기</span></td><td>아직 시작하지 않음</td></tr>
        <tr><td><code>실행 중</code></td><td><span class="badge brand">실행 중</span></td><td>진행 중</td></tr>
        <tr><td><code>완료</code></td><td><span class="badge success">완료</span></td><td>정상 종료</td></tr>
        <tr><td><code>실패</code></td><td><span class="badge danger">실패</span></td><td>오류로 중단</td></tr>
        <tr><td><code>부분 완료</code></td><td><span class="badge warning">부분 완료</span></td><td>일부만 성공</td></tr>
      </tbody>
    </table>

    <h2>상태와 결과는 다른 축입니다</h2>
    <table>
      <thead><tr><th>축</th><th>붙는 대상</th><th>값</th></tr></thead>
      <tbody>
        <tr><td><b>상태</b> — 지금 어떤가</td><td>커넥터 · 매핑룰 · 문서 · 계정</td><td>정상 · 일시정지 / 활성 · 비활성</td></tr>
        <tr><td><b>결과</b> — 어떻게 끝났나</td><td>실행 · 동기화 회차</td><td>완료 · 확인 필요 · 오류</td></tr>
        <tr><td><b>결과</b> — 파일 1건</td><td>파일 · 문서</td><td>완료 · 실패</td></tr>
      </tbody>
    </table>
    <p>회차에 "정상"을 쓰지 않습니다. 판정은 한 곳에서 내리고, 배지도 한 벌로 그립니다 — 표마다 손으로 그리면 어긋납니다.</p>

    <h2>규칙</h2>
    <ul>
      <li>상태는 <b>옅은 면(틴트) 배지 + 글자</b>입니다. <b>색만으로 구분하지 않습니다</b> — 낱말이 늘 함께 섭니다.</li>
      <li>표에서 <b>상태 · 결과 열은 오른쪽 끝</b>, 조작 열(스위치 · ⋯)이 있으면 그 <b>바로 앞</b>입니다.
          왼쪽부터 '무엇을 · 얼마나'를 읽고 '지금 어떤가'로 끝냅니다. (행이 곧 상태인 요약 표만 첫 열)</li>
      <li>실패 상태는 <b>왜 실패했는지</b>를 Tooltip이나 상세로 볼 수 있게 합니다.</li>
      <li>Badge는 읽기 전용입니다. <b>표 안에서 상태를 바꾸는 칸은 태그 드롭다운</b>(배지 모양 + 셰브런 · 목록도 같은 배지 + 체크)입니다.
          테두리 있는 Select를 넣으면 배지가 줄지어 선 표에서 그 칸만 입력칸으로 보입니다. 폼 칸은 Select 그대로입니다.</li>
      <li>값이 없으면 <b>"—"</b>입니다. "0건"은 잰 결과이고 "—"는 잰 적 없음입니다 — 둘을 같은 0으로 적지 않습니다.</li>
      <li>성공 옆에는 실패 건수를 함께 적습니다.</li>
    </ul>
  </div>`)

const editMode = P('edit-mode', 'Edit mode', '편집 모드', 'core',
  '여러 값을 함께 고치고 한 번에 저장합니다 — 조직 · 권한 · 직제 · 사용자 · 정책.', () => `
  <div class="prose">
    <h2>흐름</h2>
    <pre><code>읽는 중   제목                                [권한 편집]   ← 프라이머리
   ↓
편집 중   제목   ● 편집 중 · 변경 3건         [취소] [저장]  ← [저장]이 그 자리를 물려받음
   ↓ [저장]
확인 창   이대로 저장할까요?
          자원 권한 2건 · CSO 등급 1건          [더 고치기] [저장]
   ↓
토스트    저장했습니다 — 자원 권한 2건 · CSO 등급 1건</code></pre>

    <h2>규칙</h2>
    <ul>
      <li><b>[○○ 편집]은 제목줄 오른쪽 · 프라이머리</b>입니다(○○는 화면 이름). 편집은 화면 전체에 걸리므로 탭 · 판 머리로 내리지 않습니다.</li>
      <li>편집 중 표시는 한 벌 — <b>"● 편집 중 · 변경 N건"</b>(사람을 세면 "N명").</li>
      <li><b>[취소]는 스냅샷을 통째로 되돌립니다.</b> 초안 자료구조를 따로 두지 않고, 들어갈 때 찍은 스냅샷을 부어 넣습니다 —
          드는 상태를 하나도 빠뜨리지 않습니다.</li>
      <li><b>건수는 스냅샷과의 차이</b>입니다. 동작을 세지 않습니다 — 줬다 뺐으면 0건.</li>
      <li><b>[저장]은 확인 창</b>을 거칩니다 — 변경 요약 한 줄 + [더 고치기] [저장]. 무엇이 무엇으로 바뀌는지까지 적습니다. 저장 뒤 토스트가 요약을 되풀이합니다.</li>
      <li><b>읽는 중에 값을 누르면 "편집을 시작할까요?"</b>를 묻습니다. 그냥 안 먹게 두면 "눌렀는데 아무 일도 안 일어나는 화면"입니다.
          읽는 중의 값은 흐리지 않습니다 — 읽으라고 있는 표입니다.</li>
      <li><b>Esc는 한 겹씩</b> — 창 › 서랍 › 편집.</li>
      <li><b>저장하지 않은 채 다른 메뉴로 못 나갑니다</b> — "저장하지 않고 나갈까요?". 붙잡았으면 메뉴 강조도 되돌립니다.</li>
    </ul>

    <h2>하지 않는 것</h2>
    <ul>
      <li><b>칸마다 확인을 묻지 않습니다.</b> 묻는 자리는 [편집] 진입과 [저장] 둘이고, 그 사이는 [취소]가 책임집니다.</li>
      <li><b>낱개 조작마다 토스트를 띄우지 않습니다.</b> 무엇이 바뀌었는지는 그 줄이, 얼마나 쌓였는지는 "변경 N건"이 말합니다.
          말이 붙는 것은 줄만 봐서는 모르는 변경(상속 끊기 · 전원에 걸리는 변경)뿐입니다.</li>
      <li><b>[실행 취소] 토스트를 함께 두지 않습니다.</b> 되돌리는 길은 [취소] 하나입니다.</li>
      <li>낱말은 <b>편집</b>입니다 — "수정"이 아닙니다.</li>
    </ul>
  </div>`)

/* ══════════════════ AGENT ══════════════════ */

const streaming = P('streaming', 'Streaming Response', '스트리밍 응답', 'agent',
  '응답이 만들어지는 동안 무엇을 보여줄지.', () => `
  <div class="prose">
    <p>
      <b>원칙 1 — 로딩이 아니라 진행을 보여줍니다.</b>
      에이전트는 10~30초씩 걸립니다. 빈 스피너는 "느린 제품", 진행 중인 추론과
      도구 실행이 보이면 "일하는 제품"이 됩니다.
    </p>

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
    <p>
      <b>원칙 4 — 근거를 숨기지 않습니다.</b>
      접어둘 수는 있어도 없애지 않습니다. 이것이 에이전트 제품의 신뢰를 만듭니다.
    </p>

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
    <p>
      <b>사용자가 화면의 어떤 부분을 신뢰해야 할지 알 수 있어야 합니다.</b>
      원본 데이터와 AI가 만든 내용이 같은 모양이면 구분할 수 없습니다.
    </p>

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
          <span class="badge brand">AI 요약</span>
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
    <p>
      <b>원칙 2 — 실패는 예외가 아니라 기본 상태 중 하나입니다.</b>
      에이전트는 도구 실패·권한 부족·모호한 요청으로 자주 멈춥니다.
      실패 화면의 품질이 제품의 품질입니다.
    </p>

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
    <pre><code>제목 (20px/600)                 [＋ 사용자 추가] [사용자 편집]   ← 제목줄: 만들기 · 편집 · 저장 · 실행
밑줄 탭 (있으면)                                                  ← 아래에 선 · 여백을 또 두지 않음
[필터] [검색]  보기 전환                건수 · [표 열 설정]         ← 필터줄: 거르는 것만
조건 칩 줄 (걸린 게 있을 때만)
─────────────────────────
표 — 머리 40 · 줄 52
쪽 발 — 1–20 / 500명   ‹ 1 2 3 ›                                  ← 판 바닥에 붙박음</code></pre>

    <h2>버튼의 자리</h2>
    <ul>
      <li><b>만들기 · 편집 · 저장 · 실행은 제목줄 오른쪽</b>. 프라이머리는 화면에 <b>하나</b>입니다 —
          편집이 있는 화면은 [○○ 편집]이 프라이머리이고 편집 중에는 그 자리를 [저장]이 물려받습니다.</li>
      <li><b>필터줄은 보이는 것을 고르는 것뿐</b> — 왼쪽부터 필터 · 검색 · 보기 전환, 오른쪽 끝은 건수 → [표 열 설정].
          여기에 만드는 버튼을 두지 않습니다. <code>margin-left: auto</code>는 한 줄에 하나만.</li>
      <li>예외 — 한 화면에 카드가 여럿이면 만드는 버튼이 <b>그것을 담은 카드 머리 맨 끝</b>에 섭니다.</li>
    </ul>

    <h2>표는 두 갈래 — 한 표 안에서 섞지 않습니다</h2>
    <table>
      <thead><tr><th>갈래</th><th>언제</th><th>모양</th></tr></thead>
      <tbody>
        <tr><td><b>줄 클릭 표</b></td><td>줄이 곧 물건 하나이고 줄 안에 누를 것이 없음</td><td>줄 hover 면 + 손가락. 줄 안에서 누르는 것은 맨 끝 ⋯ · 스위치뿐. 칸 필터 없음</td></tr>
        <tr><td><b>링크 표</b></td><td>거르면서 보는 기록 · 로그 · 이력 (칸 필터 · 체크 · 정렬이 줄에 섬)</td><td>줄은 안 눌림. <b>맨 왼쪽 한 칸이 문</b> — 밑줄 글자, 줄에 올리면 [↗ 열기] 배지. 분류 칸은 칸 필터</td></tr>
      </tbody>
    </table>
    <p>가르는 기준은 데이터 양이 아니라 <b>"그 줄에 문 말고 누를 것이 있느냐"</b>입니다. 줄 hover는 눌러서 열리는 줄에만 겁니다.</p>

    <h2>정렬</h2>
    <ul>
      <li>목록 표의 머리 칸은 <b>전부</b> 오름차순 ↔ 내림차순으로 정렬됩니다.</li>
      <li>기준은 <b>칸에 보이는 값</b>. 서열이 있는 값은 서열로(등급 C › S › O, 직급 차례) — 글자순이 아닙니다.</li>
      <li><b>빈 값은 방향과 상관없이 맨 뒤</b>. 첫 방향은 글자 오름차순 · <b>수 · 일시는 내림차순</b>.</li>
      <li>정렬을 바꾸면 쪽은 1로. 눌러도 아무 줄도 안 움직이는 열에는 달지 않습니다.</li>
    </ul>

    <h2>쪽 나눔</h2>
    <ul>
      <li>한 쪽 <b>20줄</b>. 발은 <b>판 바닥에 붙박이</b>(줄이 적어도 바닥) — 담는 칸이 세로 flex여야 합니다.</li>
      <li>발의 글은 <b>건수가 아니라 자리</b> — "1–20 / 500명". 몇 건이 걸렸나는 목록 위 건수가 말합니다.</li>
      <li>줄이 없으면 발을 그리지 않습니다. 새로 만든 줄은 그 줄이 있는 쪽으로 옮깁니다. 무한 스크롤을 쓰지 않습니다.</li>
      <li>순위표 · 대시보드 카드 안 표 · 트리 · 차례가 값인 편집 목록은 자르지 않습니다.</li>
    </ul>

    <h2>칸</h2>
    <ul>
      <li>값이 없는 칸은 <b>"—"</b>. 사용자 칸은 <b>이름 / 사용자 ID(계정 전체)</b> 두 줄.</li>
      <li>상태 · 결과 열은 오른쪽 끝, 조작 열 바로 앞. 조작 열(×)은 편집 중에만 버튼이 서도 <b>칸은 늘 섭니다</b> — 열 폭이 흔들리지 않게.</li>
      <li>[표 열 설정]은 열 구성을 고정할 수 없는 표에만 답니다(배포 · 회사마다 쓰는 열이 다름).</li>
    </ul>

    <h2>탭</h2>
    <ul>
      <li>화면 안 큰 갈래 = <b>밑줄 탭</b>, 그 안에서 보기를 바꾸는 것 = <b>세그먼티드</b>. 둘 다 밑줄이면 무엇이 상위인지 안 읽힙니다.</li>
      <li>탭 줄 아래에 여백 · 구분선을 또 두지 않습니다. 탭 안에 탭을 두지 않습니다.</li>
      <li><b>탭에 건수 배지를 달지 않습니다</b> — 처리하면 줄어드는 대기열(미답변 등)만 예외입니다.</li>
    </ul>
    <p class="tpl-link">
      <a href="templates/audit.html" target="_blank" rel="noopener">감사 로그 템플릿 (HTML) ${ic('externalLink', 'sm')}</a>
      <a href="live/#audit" target="_blank" rel="noopener">라이브 버전 (Vue) ${ic('externalLink', 'sm')}</a>
    </p>
  </div>`)

const tplDetail = P('t-detail', 'Detail Page', '상세 화면', 'template',
  '한 항목을 자세히 보고 조작하는 화면.', () => `
  <div class="prose">
    <h2>골격</h2>
    <pre><code>문의 › 결제 · 김지용                       ‹ 이전  3 / 18  다음 ›   ← 셸이 그림
머리줄: 15px/600 한 줄 · 상태 배지                [답변하기]          ← 조작은 하나만
─────────────────────────
사용자 정보 (16px/600)
┌ 키 (188px) │ 값 ─────────────┐                                     ← 카드 표 (.jt)
└────────────┴─────────────────┘
(절 사이 36)
문의
┌ … ┐</code></pre>
    <ul>
      <li><b>브레드크럼과 [이전] · [다음]은 셸이 그립니다.</b> 화면 안에 '목록으로' 버튼을 따로 만들지 않습니다.</li>
      <li><b>상세에는 h1이 없습니다</b> — 제목줄은 목록의 것입니다. 상세의 제목은 브레드크럼입니다.</li>
      <li>머리줄은 <b>한 줄 + 상태 배지</b>(목록 배지와 같은 낱말 · 같은 색). 브레드크럼이 이미 말한 유형 · 사람을 또 적지 않습니다.</li>
      <li>절마다 <b>키–값 카드 표</b> — 키 칸 <b>188px</b> · 줄 46. 절 사이 <b>36</b>(첫 절 24) · 절 제목 <b>16px/600</b> + 아래 12.
          긴 값은 칸 높이를 풀고 줄바꿈합니다.</li>
      <li><b>오른쪽 메타 패널을 두지 않습니다.</b> 메타(사람 · 시각 · ID)도 절 안의 줄입니다.</li>
      <li>상세는 <b>읽는 화면</b>입니다. 본문에서 누를 수 있는 것은 <b>링크</b>(다른 로그 · 원본으로 가는 ID)뿐이고 버튼 상자로 만들지 않습니다.</li>
      <li>상세 칸은 <code>flex: 1; min-height: 0; overflow: auto</code> — 셋 중 하나라도 빠지면 길어도 안 구릅니다.</li>
    </ul>
    <p>쓰는 것: Breadcrumbs · Badge · 키–값 카드 표 · 링크</p>
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
      <li>여러 값을 함께 고치는 화면은 <b>편집 모드</b> 패턴을 씁니다 — [○○ 편집] → [저장].</li>
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
    </ul>
    <p>쓰는 것: Breadcrumbs · ButtonGroup · Treeview · FileGrid · FileRow · FileInput</p>
  </div>`)

const tplDashboard = P('t-dashboard', 'Dashboard & Report', '대시보드 · 보고서', 'template',
  '현황을 한눈에 보고, 문제가 있으면 그 화면으로 건너갑니다.', () => `
  <div class="prose">
    <h2>골격</h2>
    <pre><code>제목                          [기간 ▾]  [대시보드 구성]
핵심 지표 (KPI 카드 줄)        24px 숫자 · 증감 · 비교 기간
카드 격자                     카드 = 제목 16/600 + 곁말 + [자세히]
                              사방 16 · 제목 아래 10</code></pre>

    <h2>카드</h2>
    <ul>
      <li><b>카드 하나 = 정보 하나.</b> 제목에 '·'가 들어가면 둘을 묶은 것인지 의심합니다.</li>
      <li>차례가 곧 중요도입니다. <b>문제는 그 카드 안에서 배지로</b> 보이고 문제 줄은 카드 맨 위에 섭니다 — '주의 필요' 카드를 따로 세우지 않습니다.</li>
      <li>크기 비교 · 비율은 <b>막대</b>, 이름 · 상태 · 관계는 <b>글 줄</b>. 글로 늘어놓은 Top 8 목록보다 차트입니다.</li>
      <li><b>여기서 숫자를 만들지 않습니다</b> — 값은 그 메뉴 화면의 데이터를 그대로 셉니다. 들어갔을 때 다른 수를 만나면 버그입니다.</li>
      <li>대시보드에서 원인을 풀지 않습니다 — 어디를 봐야 하는지만 말하고 [자세히]가 그 화면으로 보냅니다.</li>
    </ul>

    <h2>구성 — 켜고 끄기 · 옮기기</h2>
    <ul>
      <li>[대시보드 구성] · [보고서 구성]은 [표 열 설정]과 같은 팝오버입니다 — 체크로 켜고 끄고 끌어서 차례를 바꿉니다. 최소 한 장은 남습니다.</li>
      <li><b>카드 자체를 잡아 끕니다</b>(손잡이 아이콘 없음 — 올리면 테두리만 아주 연한 브랜드색). 누를 것(링크 · 버튼 · 고르개)에서 시작한 끌기는 받지 않습니다.</li>
      <li>놓일 자리는 <b>카드 사이 틈 한가운데 2px 브랜드색 끼움선</b>으로 먼저 보이고, <b>놓을 때</b> 옮깁니다. 목록 밖에 놓으면 그대로입니다.</li>
      <li>KPI는 KPI끼리, 카드는 카드끼리 옮깁니다. 옮긴 뒤 <b>끝 줄에 빈 칸을 남기지 않습니다</b> — 그 줄 마지막 카드가 남는 칸을 채웁니다.</li>
      <li>끈 카드에는 차트를 그리지 않습니다. 차례는 담당자 브라우저에 저장합니다.</li>
    </ul>

    <h2>차트</h2>
    <ul>
      <li>차트는 <b>칸(컨테이너) 폭</b>으로 크기 · 옵션을 정합니다 — 창 폭이 아닙니다. 메뉴를 접으면 창은 그대로인데 칸만 넓어집니다.</li>
      <li>축선은 격자와 같은 <code>--border</code> 1px입니다. 굵거나 진하게 하지 않습니다.</li>
      <li>테마가 바뀌면 다시 그립니다 — 옵션 색은 그릴 때 굳습니다.</li>
      <li>좋은 방향이 정해지지 않은 지표에는 초록 · 빨강을 칠하지 않습니다.</li>
    </ul>

    <h2>기간과 비교</h2>
    <ul>
      <li>기간은 프리셋(오늘 · 최근 7일 · 최근 30일) + 사용자 지정(달력)입니다.</li>
      <li>증감 옆 비교 기간은 <b>실제 날짜</b>로 — "+34.6% · 08-02 ~ 08-31 대비". 보고서 표 머리도 '이번 기간 · 이전 기간'이 아니라 날짜입니다.</li>
      <li><b>견줄 수 없는 증감은 줄째로 숨깁니다</b> — "비교하지 않음" 같은 문구를 두지 않습니다.
          견줄 기간에 기록이 없거나 일부만 있으면 그 사실을 날짜로 적고(<code>06-08부터만 기록</code>) 퍼센트를 붙이지 않습니다.</li>
      <li>증감은 <b>숫자에만 색</b>(방향이 아니라 의미 기준), 비교 라벨은 회색입니다.</li>
      <li>기간을 안 따르는 카드의 곁말은 '현재 상황'입니다.</li>
    </ul>

    <h2>문서형 보고서의 층</h2>
    <table>
      <thead><tr><th>층</th><th>크기</th><th>간격</th></tr></thead>
      <tbody>
        <tr><td>대분류</td><td>20px / 600</td><td>대분류 사이 44 · 문서 머리 → 첫 대분류 32</td></tr>
        <tr><td>소분류 (카드)</td><td>16px / 600</td><td>소분류 사이 28 · 대분류 → 첫 소분류 18 · 소분류 → 내용 10</td></tr>
      </tbody>
    </table>
    <p>44 › 32 › 28 › 18 › 10 — 이 차이가 덩어리를 말합니다. 바꾼 뒤에는 그려진 것 기준으로 잽니다.</p>
  </div>`)

export const PATTERNS = [
  forms, filtering, states, destructive, status, editMode,
  streaming, evidence, approval, aiContent, recovery,
  tplIndex, tplDetail, tplSettings, tplWizard, tplChat, tplSearch, tplDrive, tplDashboard,
]

export const PATTERN_BY_ID = Object.fromEntries(PATTERNS.map((p) => [p.id, p]))
