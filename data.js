/* ============================================
   컴포넌트 레지스트리 — 문서 사이트의 단일 원본
   여기에 추가하면 사이드바·페이지·검색에 자동 반영됩니다.
   ============================================ */

// origin: 'custom'   직접 만듦 (Vuetify 불필요)
//         'wrapped'  Vuetify 컴포넌트를 감쌈 (Vuetify 필요)
//         'vuetify'  Vuetify 그대로 + defaults만 조정

export const CATEGORIES = [
  { id: 'action',   name: 'Action',            ko: '액션' },
  { id: 'content',  name: 'Content',           ko: '콘텐츠' },
  { id: 'input',    name: 'Data Input',        ko: '입력' },
  { id: 'feedback', name: 'Feedback & Status', ko: '피드백·상태' },
  { id: 'layout',   name: 'Layout',            ko: '레이아웃' },
  { id: 'overlay',  name: 'Overlay',           ko: '오버레이' },
  { id: 'data',     name: 'Table & List',      ko: '표·목록' },
  { id: 'agent',    name: 'Agent',             ko: '에이전트' },
]

export const COMPONENTS = [
/* ══════════════ ACTION ══════════════ */
{
  id: 'button', name: 'Button', ko: '버튼', category: 'action',
  origin: 'custom', vuetifyBase: null,
  summary: '액션을 실행하는 기본 버튼.',
  reason: { ko: '시각이 전부인 컴포넌트라 직접 만듭니다. 직접 만든 버튼은 Vuetify와 특이도 싸움이 일어나지 않습니다.',
            en: 'Purely visual; building it ourselves avoids specificity wars with Vuetify.' },
  props: [
    ['variant', `'primary' | 'secondary' | 'ghost' | 'danger'`, `'primary'`, '시각 강도. primary는 한 화면에 하나만.'],
    ['size', `'default' | 'sm'`, `'default'`, '높이 36px / 30px.'],
    ['disabled', 'boolean', 'false', '비활성화. 이유를 Tooltip으로 알려주는 것을 권장.'],
  ],
  events: [['click', 'MouseEvent', '클릭 시 발생.']],
  slots: [['default', '버튼 라벨. 아이콘만 넣을 경우 aria-label 필수.']],
  demo: `<div class="row">
    <button class="btn btn-primary">New agent</button>
    <button class="btn btn-secondary">Cancel</button>
    <button class="btn btn-ghost">Learn more</button>
    <button class="btn btn-danger">Delete</button>
    <button class="btn" disabled>Disabled</button>
    <button class="btn btn-primary btn-sm">Small</button>
  </div>`,
  vue: `<DsButton variant="primary" @click="run">New agent</DsButton>
<DsButton variant="secondary">Cancel</DsButton>
<DsButton variant="ghost">Learn more</DsButton>
<DsButton variant="danger" @click="remove">Delete</DsButton>
<DsButton disabled>Disabled</DsButton>
<DsButton size="sm">Small</DsButton>`,
  html: `<button class="btn btn-primary">New agent</button>
<button class="btn btn-secondary">Cancel</button>
<button class="btn btn-ghost">Learn more</button>
<button class="btn btn-danger">Delete</button>
<button class="btn" disabled>Disabled</button>
<button class="btn btn-primary btn-sm">Small</button>`,
  guidelines: [
    ['해야 할 것', 'primary는 한 화면에 하나. 그 화면에서 사용자가 할 "그 행동"에만 씁니다.'],
    ['해야 할 것', '파괴적 액션은 danger를 쓰되, 기본은 조용한 외곽선 — 호버할 때만 빨간 배경이 드러납니다.'],
    ['하지 말 것', '취소 버튼을 primary로 쓰지 않습니다. 취소는 secondary 또는 ghost입니다.'],
    ['접근성', '아이콘만 있는 버튼에는 반드시 aria-label을 붙입니다.'],
  ],
},
{
  id: 'menu', name: 'Menu', ko: '메뉴', category: 'action',
  origin: 'wrapped', vuetifyBase: 'VMenu',
  summary: '클릭하면 열리는 드롭다운 메뉴.',
  reason: { ko: '뷰포트 경계에서 위치를 뒤집는 포지셔닝과 키보드 네비게이션을 직접 만들기 어렵습니다. Vuetify의 VMenu를 유지하고 안쪽 면만 우리 스타일로 바꿉니다.',
            en: 'Viewport-aware positioning and keyboard nav are hard to rebuild; keep VMenu, restyle the panel.' },
  props: [
    ['location', 'string', `'bottom start'`, '열리는 방향. Vuetify VMenu의 location을 그대로 전달합니다.'],
  ],
  slots: [['activator', '메뉴를 여는 요소. v-bind="props" 필수.'], ['default', '메뉴 내용. .ds-menu-item 사용.']],
  demo: `<div class="ds-menu-panel" style="max-width:200px">
    <div class="ds-menu-item">이름 바꾸기</div>
    <div class="ds-menu-item">복제</div>
    <hr class="divider" style="margin:4px 0">
    <div class="ds-menu-item" style="color:var(--danger)">삭제</div>
  </div>
  <div class="hint" style="margin-top:10px">↑ 실제로는 버튼 클릭 시 이 패널이 떠서 열립니다.</div>`,
  vue: `<DsMenu location="bottom end">
  <template #activator="props">
    <DsButton variant="secondary" v-bind="props">More</DsButton>
  </template>
  <div class="ds-menu-item" @click="rename">이름 바꾸기</div>
  <div class="ds-menu-item" @click="duplicate">복제</div>
  <hr class="divider" />
  <div class="ds-menu-item" style="color:var(--danger)" @click="remove">삭제</div>
</DsMenu>`,
  html: null,
  guidelines: [
    ['해야 할 것', '항목이 8개를 넘으면 구분선으로 묶거나 Command Palette를 검토합니다.'],
    ['하지 말 것', '메뉴 안에 폼을 넣지 않습니다. 그건 Dialog의 역할입니다.'],
  ],
},

/* ══════════════ CONTENT ══════════════ */
{
  id: 'avatar', name: 'Avatar', ko: '아바타', category: 'content',
  origin: 'custom', vuetifyBase: null,
  summary: '사람 또는 에이전트를 나타내는 원형 표식.',
  reason: { ko: '이니셜 표시와 겹침 그룹이 전부인 시각 컴포넌트입니다.', en: 'Initials and overlap groups — purely visual.' },
  props: [
    ['size', `'sm' | 'default' | 'lg'`, `'default'`, '24 / 32 / 44px.'],
    ['variant', `'default' | 'brand'`, `'default'`, 'brand는 에이전트를 뜻합니다.'],
    ['src', 'string', '—', '이미지 URL. 없으면 슬롯의 이니셜을 표시합니다.'],
  ],
  slots: [['default', '이니셜 텍스트 (2글자 권장).']],
  demo: `<div class="row">
    <span class="ds-avatar sm">JK</span>
    <span class="ds-avatar">JK</span>
    <span class="ds-avatar lg">JK</span>
    <span class="ds-avatar brand">A</span>
    <span class="avatar-group"><span class="ds-avatar">JK</span><span class="ds-avatar">MP</span><span class="ds-avatar">+3</span></span>
  </div>`,
  vue: `<DsAvatar>JK</DsAvatar>
<DsAvatar size="sm">JK</DsAvatar>
<DsAvatar size="lg">JK</DsAvatar>
<DsAvatar variant="brand">A</DsAvatar>
<DsAvatar src="/photo.jpg" />`,
  html: `<span class="ds-avatar">JK</span>
<span class="ds-avatar sm">JK</span>
<span class="ds-avatar lg">JK</span>
<span class="ds-avatar brand">A</span>

<span class="avatar-group">
  <span class="ds-avatar">JK</span><span class="ds-avatar">MP</span><span class="ds-avatar">+3</span>
</span>`,
  guidelines: [
    ['해야 할 것', '에이전트는 brand, 사람은 기본 회색으로 구분합니다.'],
    ['하지 말 것', '아바타만으로 사람을 식별하게 하지 않습니다. 이름을 함께 보여주거나 Tooltip을 답니다.'],
  ],
},
{
  id: 'card', name: 'Card', ko: '카드', category: 'content',
  origin: 'custom', vuetifyBase: null,
  summary: '콘텐츠를 담는 면(Surface).',
  reason: { ko: 'VCard의 elevation 시스템이 필요 없습니다. 우리는 그림자 대신 1px 보더로만 구분합니다.',
            en: 'No need for VCard elevation; we separate with 1px borders only.' },
  props: [
    ['title', 'string', '—', '제목. 없으면 렌더하지 않습니다.'],
    ['subtitle', 'string', '—', '보조 설명.'],
  ],
  slots: [['default', '카드 본문.']],
  demo: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
    <div class="card"><h3>Tasks automated</h3><p>Last 30 days</p><div class="num">1,284<span class="delta">+12.4%</span></div></div>
    <div class="card"><h3>Active agents</h3><p>Across all workspaces</p><div class="num">17<span class="delta">+2</span></div></div>
  </div>`,
  vue: `<DsCard title="Tasks automated" subtitle="Last 30 days">
  <div class="num">1,284<span class="delta">+12.4%</span></div>
</DsCard>`,
  html: `<div class="card">
  <h3>Tasks automated</h3>
  <p>Last 30 days</p>
  <div class="num">1,284<span class="delta">+12.4%</span></div>
</div>`,
  guidelines: [
    ['하지 말 것', '카드 안에 카드를 넣지 않습니다. 위계가 무너집니다.'],
    ['해야 할 것', '클릭 가능한 카드는 호버 시 보더가 진해지도록 해서 조작 가능함을 알립니다.'],
  ],
},
{
  id: 'divider', name: 'Divider', ko: '구분선', category: 'content',
  origin: 'custom', vuetifyBase: null,
  summary: '내용을 나누는 1px 선.',
  reason: { ko: '극한 미니멀에서는 그림자 대신 이것으로 영역을 나눕니다.', en: 'Our primary separation device in a shadowless system.' },
  props: [['label', 'string', '—', '있으면 선 가운데에 라벨을 넣습니다. "오늘 / 어제" 같은 구분에 사용.']],
  slots: [],
  demo: `<div style="font-size:13px;color:var(--gray-11)">위 내용</div>
  <hr class="divider" />
  <div style="font-size:13px;color:var(--gray-11)">아래 내용</div>
  <div class="divider-label">Yesterday</div>
  <div style="font-size:13px;color:var(--gray-11)">어제 대화</div>`,
  vue: `<DsDivider />
<DsDivider label="Yesterday" />`,
  html: `<hr class="divider" />
<div class="divider-label">Yesterday</div>`,
  guidelines: [['하지 말 것', '여백으로 충분히 구분되는 곳에 선을 또 긋지 않습니다.']],
},
{
  id: 'citation', name: 'CitationChip', ko: '인용 칩', category: 'content',
  origin: 'custom', vuetifyBase: null,
  summary: '에이전트 응답의 근거 출처를 가리키는 번호 칩.',
  reason: { ko: 'Vuetify에 근거 인용 개념이 없습니다. 에이전트 제품의 신뢰도를 만드는 핵심 요소입니다.',
            en: 'No citation concept in Vuetify; core to agent trustworthiness.' },
  props: [['index', 'number | string', '필수', '표시할 번호.']],
  events: [['open', '—', '클릭·Enter 시 발생. 원문 위치로 이동시키세요.']],
  slots: [],
  demo: `<div class="msg-text">계약 기간은 12개월이며<span class="cite">1</span> 대금은 30일 이내 지급합니다<span class="cite">2</span></div>`,
  vue: `본문 텍스트<DsCitationChip :index="1" @open="scrollToSource(1)" />`,
  html: `본문 텍스트<span class="cite">1</span>`,
  guidelines: [
    ['해야 할 것', '원칙 4 — 근거는 접을 수 있어도 없앨 수 없습니다. 항상 열어볼 수 있게 합니다.'],
    ['하지 말 것', '문장 끝마다 칩을 다는 것은 피합니다. 실제 근거가 있는 주장에만 답니다.'],
  ],
},
{
  id: 'empty', name: 'EmptyState', ko: '빈 상태', category: 'content',
  origin: 'custom', vuetifyBase: null,
  summary: '데이터가 없을 때 보여주는 화면.',
  reason: { ko: 'Vuetify에 없습니다. 극한 미니멀에서는 빈 화면이 "미완성"처럼 보이기 쉬워 특히 중요합니다.',
            en: 'Not in Vuetify; critical in a minimal system where blank reads as broken.' },
  props: [['title', 'string', '필수', '무엇이 없는지.'], ['description', 'string', '—', '왜 없는지, 무엇을 할 수 있는지.']],
  slots: [['default', '다음 행동 버튼(CTA).']],
  demo: `<div class="empty">
    <h3>No agents yet</h3>
    <p>첫 에이전트를 만들어 업무 자동화를 시작하세요.</p>
    <button class="btn btn-primary">New agent</button>
  </div>`,
  vue: `<DsEmptyState title="No agents yet" description="첫 에이전트를 만들어 업무 자동화를 시작하세요.">
  <DsButton @click="create">New agent</DsButton>
</DsEmptyState>`,
  html: `<div class="empty">
  <h3>No agents yet</h3>
  <p>첫 에이전트를 만들어 업무 자동화를 시작하세요.</p>
  <button class="btn btn-primary">New agent</button>
</div>`,
  guidelines: [
    ['해야 할 것', '빈 상태는 반드시 다음 행동을 제안합니다. "결과 없음"만 쓰고 끝내지 않습니다.'],
    ['해야 할 것', '검색 결과가 없을 때는 필터를 해제하는 버튼을 제공합니다.'],
  ],
},

/* ══════════════ DATA INPUT ══════════════ */
{
  id: 'input', name: 'Input', ko: '입력 필드', category: 'input',
  origin: 'custom', vuetifyBase: null,
  summary: '한 줄 텍스트 입력.',
  reason: { ko: 'VTextField는 VField 래퍼가 5~6겹이라 겹을 벗기는 비용이 새로 만드는 비용보다 큽니다.',
            en: 'VTextField nests VField 5-6 layers deep; unwrapping costs more than rebuilding.' },
  props: [
    ['modelValue', 'string', '—', 'v-model로 바인딩.'],
    ['label', 'string', '—', '필드 위 라벨.'],
    ['hint', 'string', '—', '보조 설명. error가 있으면 숨겨집니다.'],
    ['error', 'string', '—', '에러 메시지. 있으면 에러 상태가 됩니다.'],
    ['placeholder', 'string', '—', '입력 예시.'],
    ['type', 'string', `'text'`, 'HTML input type.'],
  ],
  slots: [],
  demo: `<div class="row" style="align-items:flex-start;gap:24px">
    <div class="field"><label>Workspace name</label><input class="input" placeholder="Acme Inc." /><div class="hint">모든 멤버에게 표시됩니다.</div></div>
    <div class="field"><label>Email</label><input class="input error" value="ujin@" /><div class="hint error">올바른 이메일 주소를 입력하세요.</div></div>
  </div>`,
  vue: `<DsInput v-model="name" label="Workspace name"
  placeholder="Acme Inc." hint="모든 멤버에게 표시됩니다." />

<DsInput v-model="email" label="Email"
  :error="emailError" />`,
  html: `<div class="field">
  <label>Workspace name</label>
  <input class="input" placeholder="Acme Inc." />
  <div class="hint">모든 멤버에게 표시됩니다.</div>
</div>

<!-- 에러 상태 -->
<input class="input error" />
<div class="hint error">올바른 이메일 주소를 입력하세요.</div>`,
  guidelines: [
    ['해야 할 것', '에러는 무엇이 잘못됐고 어떻게 고치는지 말합니다. 사과하지 않습니다.'],
    ['하지 말 것', '"입력값이 올바르지 않습니다" 같은 모호한 메시지를 쓰지 않습니다.'],
    ['접근성', 'label은 항상 붙입니다. placeholder를 라벨 대신 쓰지 않습니다.'],
  ],
},
{
  id: 'select', name: 'Select', ko: '선택', category: 'input',
  origin: 'wrapped', vuetifyBase: 'VSelect',
  summary: '옵션 목록에서 하나 또는 여러 개를 고릅니다.',
  reason: { ko: '옵션 목록 포지셔닝·키보드 선택·다중 선택 동작이 복잡합니다. VSelect를 유지하고 필드 외형만 바꿉니다.',
            en: 'List positioning, keyboard selection, multi-select are complex; keep VSelect, restyle the field.' },
  props: [
    ['modelValue', 'any', '—', 'v-model로 바인딩.'],
    ['items', 'any[]', '필수', '옵션 목록.'],
    ['label', 'string', '—', '필드 라벨.'],
    ['multiple', 'boolean', 'false', '다중 선택.'],
    ['error', 'string', '—', '에러 메시지.'],
  ],
  slots: [],
  demo: `<div class="field"><label>Status</label>
    <div class="input" style="display:flex;align-items:center;justify-content:space-between;cursor:pointer">
      <span>Running</span><span style="color:var(--gray-9);font-size:11px">▾</span>
    </div>
    <div class="hint">Vuetify VSelect 위에 우리 필드 외형을 입힙니다.</div>
  </div>`,
  vue: `<DsSelect v-model="status" label="Status"
  :items="['Draft', 'Running', 'Completed']" />`,
  html: null,
  guidelines: [['해야 할 것', '옵션이 10개를 넘으면 검색 가능한 Autocomplete를 검토합니다.']],
},
{
  id: 'chip', name: 'Chip', ko: '칩', category: 'input',
  origin: 'custom', vuetifyBase: null,
  summary: '선택된 항목을 표시하고 제거합니다.',
  reason: { ko: 'VChip보다 훨씬 단순한 형태만 필요합니다.', en: 'We need a far simpler shape than VChip.' },
  props: [
    ['variant', `'default' | 'brand'`, `'default'`, 'brand는 활성 필터를 뜻합니다.'],
    ['removable', 'boolean', 'true', '✕ 버튼 표시.'],
  ],
  events: [['remove', '—', '✕ 클릭 시 발생.']],
  slots: [['default', '칩 라벨.']],
  demo: `<div class="row">
    <span class="chip">design-system.pdf<button class="x" aria-label="Remove">✕</button></span>
    <span class="chip">Q3 보고서<button class="x" aria-label="Remove">✕</button></span>
    <span class="chip brand">Status: Running<button class="x" aria-label="Remove">✕</button></span>
  </div>`,
  vue: `<DsChip @remove="detach(file)">design-system.pdf</DsChip>
<DsChip variant="brand" @remove="clearFilter">Status: Running</DsChip>`,
  html: `<span class="chip">
  design-system.pdf
  <button class="x" aria-label="Remove">✕</button>
</span>`,
  guidelines: [
    ['해야 할 것', 'Badge는 읽기 전용, Chip은 조작 가능 — 이 구분을 지킵니다.'],
    ['접근성', '✕ 버튼에 aria-label="Remove"를 붙입니다.'],
  ],
},
{
  id: 'agentinput', name: 'AgentInput', ko: '에이전트 입력창', category: 'input',
  origin: 'custom', vuetifyBase: null,
  summary: '에이전트에게 메시지를 보내는 입력창.',
  reason: { ko: 'Vuetify에 없습니다. 여러 줄 자동 확장, 파일 첨부, 슬래시 명령, Enter 전송이 한 컴포넌트에 필요합니다.',
            en: 'Not in Vuetify. Auto-grow, attachments, slash commands, Enter-to-send in one component.' },
  props: [
    ['modelValue', 'string', `''`, 'v-model로 바인딩.'],
    ['placeholder', 'string', `'Message agent…'`, '입력 안내 문구.'],
    ['sendLabel', 'string', `'Send'`, '전송 버튼 라벨.'],
  ],
  events: [['send', '—', 'Enter 또는 전송 버튼. Shift+Enter는 줄바꿈.'], ['attach', '—', '＋ 클릭.'], ['slash', '—', '/ 클릭.']],
  slots: [],
  demo: `<div class="agent-input" style="max-width:560px">
    <textarea rows="1" placeholder="Message agent… (/ 로 명령어)"></textarea>
    <div class="ai-bar">
      <button class="ai-tool" aria-label="Attach file">＋</button>
      <button class="ai-tool" aria-label="Slash commands">/</button>
      <span class="ai-spacer"></span>
      <button class="btn btn-primary btn-sm">Send</button>
    </div>
  </div>`,
  vue: `<DsAgentInput v-model="draft" @send="submit" @attach="pickFile" />`,
  html: `<div class="agent-input">
  <textarea rows="1" placeholder="Message agent…"></textarea>
  <div class="ai-bar">
    <button class="ai-tool" aria-label="Attach file">＋</button>
    <button class="ai-tool" aria-label="Slash commands">/</button>
    <span class="ai-spacer"></span>
    <button class="btn btn-primary btn-sm">Send</button>
  </div>
</div>`,
  guidelines: [
    ['해야 할 것', 'Enter로 전송, Shift+Enter로 줄바꿈 — 챗 제품의 관습입니다.'],
    ['해야 할 것', '전송 중에는 버튼을 정지(Stop)로 바꿔 생성을 멈출 수 있게 합니다.'],
  ],
},

/* ══════════════ FEEDBACK & STATUS ══════════════ */
{
  id: 'badge', name: 'Badge', ko: '배지', category: 'feedback',
  origin: 'custom', vuetifyBase: null,
  summary: '상태를 표시하는 작은 읽기 전용 라벨.',
  reason: { ko: 'VChip으로 대체 가능하지만 필요한 형태가 훨씬 단순합니다.', en: 'Simpler than VChip for our needs.' },
  props: [
    ['variant', `'default' | 'brand' | 'success' | 'danger'`, `'default'`, '상태 색.'],
    ['dot', 'boolean', 'true', '앞의 색 점 표시.'],
  ],
  slots: [['default', '상태 텍스트.']],
  demo: `<div class="row">
    <span class="badge"><span class="dot"></span>Draft</span>
    <span class="badge brand"><span class="dot"></span>Running</span>
    <span class="badge success"><span class="dot"></span>Completed</span>
    <span class="badge danger"><span class="dot"></span>Failed</span>
  </div>`,
  vue: `<DsBadge>Draft</DsBadge>
<DsBadge variant="brand">Running</DsBadge>
<DsBadge variant="success">Completed</DsBadge>
<DsBadge variant="danger">Failed</DsBadge>`,
  html: `<span class="badge"><span class="dot"></span>Draft</span>
<span class="badge brand"><span class="dot"></span>Running</span>
<span class="badge success"><span class="dot"></span>Completed</span>
<span class="badge danger"><span class="dot"></span>Failed</span>`,
  guidelines: [
    ['해야 할 것', '색 점이 상태를 말하고 배경은 조용하게 둡니다.'],
    ['하지 말 것', '색만으로 상태를 구분하지 않습니다. 텍스트를 항상 함께 씁니다(색맹 대응).'],
  ],
},
{
  id: 'skeleton', name: 'Skeleton', ko: '스켈레톤', category: 'feedback',
  origin: 'custom', vuetifyBase: 'VSkeletonLoader',
  summary: '데이터 로딩 중 콘텐츠의 자리를 미리 보여줍니다.',
  reason: { ko: 'VSkeletonLoader는 프리셋 타입이 많아 무겁습니다. 우리는 3가지 형태만 필요합니다.',
            en: 'VSkeletonLoader ships many presets; we need only three shapes.' },
  props: [
    ['variant', `'text' | 'circle' | 'rect'`, `'text'`, '형태.'],
    ['width', 'string', '—', 'CSS 너비.'],
    ['height', 'string', '—', 'CSS 높이.'],
  ],
  slots: [],
  demo: `<div style="display:flex;gap:12px;align-items:center;max-width:380px">
    <div class="skeleton circle" style="width:32px;height:32px;flex-shrink:0"></div>
    <div style="flex:1;display:flex;flex-direction:column;gap:8px">
      <div class="skeleton text" style="width:60%"></div>
      <div class="skeleton text" style="width:90%"></div>
    </div>
  </div>`,
  vue: `<DsSkeleton variant="circle" width="32px" height="32px" />
<DsSkeleton width="60%" />
<DsSkeleton width="90%" />`,
  html: `<div class="skeleton circle" style="width:32px;height:32px"></div>
<div class="skeleton text" style="width:60%"></div>
<div class="skeleton text" style="width:90%"></div>`,
  guidelines: [
    ['하지 말 것', '에이전트 응답 대기에 쓰지 않습니다. 그건 ThinkingIndicator·ToolCallStep의 몫입니다(원칙 1).'],
    ['해야 할 것', '실제 콘텐츠와 비슷한 크기·개수로 만듭니다. 화면 흔들림을 줄이는 게 목적입니다.'],
  ],
},
{
  id: 'toast', name: 'Toast', ko: '토스트', category: 'feedback',
  origin: 'custom', vuetifyBase: 'VSnackbar',
  summary: '작업 결과를 잠깐 알리는 알림.',
  reason: { ko: 'VSnackbar를 쓸 수도 있지만 큐 관리를 우리가 하고 싶고 시각이 단순합니다.',
            en: 'We manage the queue ourselves; visuals are simple.' },
  props: [
    ['variant', `'success' | 'danger'`, `'success'`, '결과 종류.'],
    ['action', 'string', '—', '후속 액션 버튼 라벨. 하나까지만.'],
  ],
  events: [['action', '—', '액션 버튼 클릭.']],
  slots: [['default', '알림 문구.']],
  demo: `<div style="display:flex;flex-direction:column;gap:10px;align-items:flex-start">
    <div class="toast success"><span class="t-dot"></span><span class="t-body">에이전트가 생성되었습니다.</span><button class="t-action">View</button></div>
    <div class="toast danger"><span class="t-dot"></span><span class="t-body">파일 업로드에 실패했습니다 — 10MB를 초과합니다.</span><button class="t-action">Retry</button></div>
  </div>`,
  vue: `<DsToast variant="success" action="View" @action="open">
  에이전트가 생성되었습니다.
</DsToast>

<DsToast variant="danger" action="Retry" @action="retry">
  파일 업로드에 실패했습니다 — 10MB를 초과합니다.
</DsToast>`,
  html: `<div class="toast success">
  <span class="t-dot"></span>
  <span class="t-body">에이전트가 생성되었습니다.</span>
  <button class="t-action">View</button>
</div>`,
  guidelines: [
    ['해야 할 것', '에러 토스트는 무엇이 실패했고 왜인지 말합니다("10MB를 초과합니다").'],
    ['하지 말 것', '액션을 두 개 이상 넣지 않습니다. 선택이 필요하면 Dialog입니다.'],
    ['예외', '떠 있는 요소라 이 시스템에서 그림자가 허용되는 몇 안 되는 컴포넌트입니다.'],
  ],
},

/* ══════════════ OVERLAY ══════════════ */
{
  id: 'dialog', name: 'Dialog', ko: '다이얼로그', category: 'overlay',
  origin: 'wrapped', vuetifyBase: 'VDialog',
  summary: '화면 위에 떠서 흐름을 멈추는 창.',
  reason: { ko: '포커스 트랩, 배경 스크롤 락, ESC 처리, 접근성 속성을 직접 만들기 어렵습니다. VDialog를 유지하고 내부 면만 우리 스타일로 바꿉니다.',
            en: 'Focus trap, scroll lock, ESC handling and a11y are hard to rebuild; keep VDialog, restyle the panel.' },
  props: [
    ['modelValue', 'boolean', 'false', 'v-model로 열림 상태 제어.'],
    ['title', 'string', '—', '제목.'],
    ['width', 'number | string', '480', '너비.'],
    ['persistent', 'boolean', 'false', '바깥 클릭으로 닫히지 않게 합니다. 위험한 작업에만.'],
  ],
  slots: [['default', '본문.'], ['actions', '하단 버튼 영역.']],
  demo: `<div class="ds-dialog-panel" style="max-width:420px">
    <div class="ds-dialog-head">에이전트를 삭제할까요?</div>
    <div class="ds-dialog-body">이 작업은 되돌릴 수 없습니다. 연결된 실행 기록 128건도 함께 삭제됩니다.</div>
    <div class="ds-dialog-foot">
      <button class="btn btn-secondary btn-sm">Cancel</button>
      <button class="btn btn-danger btn-sm">Delete</button>
    </div>
  </div>
  <div class="hint" style="margin-top:10px">↑ 실제로는 이 패널이 화면 중앙에 떠서 배경을 어둡게 덮습니다.</div>`,
  vue: `<DsDialog v-model="open" title="에이전트를 삭제할까요?" persistent>
  이 작업은 되돌릴 수 없습니다. 연결된 실행 기록 128건도 함께 삭제됩니다.
  <template #actions>
    <DsButton variant="secondary" size="sm" @click="open = false">Cancel</DsButton>
    <DsButton variant="danger" size="sm" @click="remove">Delete</DsButton>
  </template>
</DsDialog>`,
  html: null,
  guidelines: [
    ['해야 할 것', '되돌릴 수 없는 작업은 결과를 구체적으로 씁니다("실행 기록 128건도 함께 삭제됩니다").'],
    ['하지 말 것', '단순 알림에 Dialog를 쓰지 않습니다. 그건 Toast입니다.'],
  ],
},
{
  id: 'tooltip', name: 'Tooltip', ko: '툴팁', category: 'overlay',
  origin: 'wrapped', vuetifyBase: 'VTooltip',
  summary: '요소에 마우스를 올리면 뜨는 짧은 설명.',
  reason: { ko: '지연 표시, 포지셔닝, 터치 기기 대응을 Vuetify가 이미 처리합니다.',
            en: 'Delay, positioning and touch handling already solved by Vuetify.' },
  props: [['text', 'string', '필수', '표시할 문구.'], ['location', 'string', `'top'`, '표시 방향.']],
  slots: [['default', '툴팁을 붙일 요소. v-bind 필수.']],
  demo: `<span style="display:inline-flex;align-items:center;height:26px;padding:0 9px;border-radius:var(--r-md);background:var(--gray-12);color:var(--bg);font-size:12.5px">보관함으로 이동</span>
  <div class="hint" style="margin-top:10px">↑ 아이콘 버튼 위에 이렇게 뜹니다.</div>`,
  vue: `<DsTooltip text="보관함으로 이동">
  <button class="ai-tool" aria-label="Archive">□</button>
</DsTooltip>`,
  html: null,
  guidelines: [
    ['하지 말 것', '툴팁에만 있는 정보를 만들지 않습니다. 터치 기기에서는 보이지 않습니다.'],
    ['해야 할 것', '아이콘만 있는 버튼에는 툴팁과 aria-label을 함께 답니다.'],
  ],
},

/* ══════════════ TABLE & LIST ══════════════ */
{
  id: 'datatable', name: 'DataTable', ko: '데이터 테이블', category: 'data',
  origin: 'wrapped', vuetifyBase: 'VDataTable',
  summary: '정렬·페이지네이션이 되는 데이터 목록.',
  reason: { ko: '정렬, 페이지네이션, 행 선택, 가상 스크롤을 직접 만드는 것은 비현실적입니다. VDataTable을 그대로 쓰고 시각만 우리 것으로 덮습니다.',
            en: 'Sorting, pagination, selection, virtualization are impractical to rebuild; keep VDataTable and restyle.' },
  props: [
    ['headers', 'any[]', '필수', 'Vuetify VDataTable의 headers 형식 그대로.'],
    ['items', 'any[]', '필수', '행 데이터.'],
    ['density', `'compact' | 'comfortable' | 'spacious'`, `'comfortable'`, '행 높이 32 / 40 / 48px (원칙 3).'],
    ['loading', 'boolean', 'false', '로딩 표시.'],
  ],
  slots: [['(VDataTable의 모든 슬롯)', 'item.* 등 Vuetify 슬롯이 그대로 전달됩니다.']],
  demo: `<div class="table-wrap"><table>
    <thead><tr><th>Name</th><th>Status</th><th>Owner</th><th>Updated</th></tr></thead>
    <tbody>
      <tr><td>Weekly report agent</td><td><span class="badge brand"><span class="dot"></span>Running</span></td><td>Jiyong Kim</td><td class="mono">2h ago</td></tr>
      <tr><td>Invoice classifier</td><td><span class="badge success"><span class="dot"></span>Completed</span></td><td>Minji Park</td><td class="mono">1d ago</td></tr>
      <tr><td>Drive sync</td><td><span class="badge danger"><span class="dot"></span>Failed</span></td><td>Jiyong Kim</td><td class="mono">3d ago</td></tr>
    </tbody>
  </table></div>`,
  vue: `<DsDataTable :headers="headers" :items="agents" density="compact">
  <template #item.status="{ item }">
    <DsBadge :variant="item.status">{{ item.statusLabel }}</DsBadge>
  </template>
</DsDataTable>`,
  html: `<div class="table-wrap"><table>
  <thead><tr><th>Name</th><th>Status</th></tr></thead>
  <tbody>
    <tr><td>Weekly report agent</td>
        <td><span class="badge brand"><span class="dot"></span>Running</span></td></tr>
  </tbody>
</table></div>`,
  guidelines: [
    ['해야 할 것', '드라이브·목록처럼 훑는 화면은 compact, 그 외는 comfortable (원칙 3).'],
    ['해야 할 것', '행 액션은 호버 시에만 드러내 기본 화면을 조용하게 유지합니다.'],
  ],
},
{
  id: 'filegrid', name: 'FileGrid', ko: '파일 그리드', category: 'data',
  origin: 'custom', vuetifyBase: null,
  summary: '드라이브의 그리드(카드) 보기.',
  reason: { ko: 'Vuetify에 파일 브라우저 개념이 없습니다.', en: 'No file browser concept in Vuetify.' },
  props: [
    ['files', 'DsFile[]', '필수', '{ id, name, meta?, icon? } 배열.'],
    ['selected', 'string[]', '—', '선택된 파일 id 목록.'],
  ],
  events: [['select', 'DsFile', '카드 클릭.']],
  slots: [],
  demo: `<div class="file-grid">
    <div class="file-card"><div class="f-icon">📁</div><div class="f-name">법무</div><div class="f-meta">12 files</div></div>
    <div class="file-card selected"><div class="f-icon">📄</div><div class="f-name">계약서_최종.pdf</div><div class="f-meta">2.1 MB</div></div>
    <div class="file-card"><div class="f-icon">📄</div><div class="f-name">계약서_v2_검토중.docx</div><div class="f-meta">840 KB</div></div>
    <div class="file-card"><div class="f-icon">📊</div><div class="f-name">Q3_실적.xlsx</div><div class="f-meta">1.4 MB</div></div>
  </div>`,
  vue: `<DsFileGrid :files="files" :selected="selectedIds" @select="toggle" />`,
  html: `<div class="file-grid">
  <div class="file-card">
    <div class="f-icon">📄</div>
    <div class="f-name">계약서_최종.pdf</div>
    <div class="f-meta">2.1 MB</div>
  </div>
  <div class="file-card selected">…</div>
</div>`,
  guidelines: [['해야 할 것', 'FileRow와 같은 데이터로 보기 전환이 가능해야 합니다.']],
},
{
  id: 'filerow', name: 'FileRow', ko: '파일 행', category: 'data',
  origin: 'custom', vuetifyBase: null,
  summary: '드라이브의 리스트 보기 한 줄.',
  reason: { ko: 'Vuetify에 파일 브라우저 개념이 없습니다.', en: 'No file browser concept in Vuetify.' },
  props: [
    ['name', 'string', '필수', '파일 이름.'],
    ['meta', 'string', '—', '크기·날짜 등.'],
    ['icon', 'string', `'📄'`, '아이콘.'],
    ['selected', 'boolean', 'false', '선택 상태.'],
  ],
  events: [['select', '—', '행 클릭.']],
  slots: [],
  demo: `<div class="file-row"><span class="f-icon">📁</span><span class="f-name">법무</span><span class="f-meta">Jun 28</span></div>
  <div class="file-row selected"><span class="f-icon">📄</span><span class="f-name">계약서_최종.pdf</span><span class="f-meta">2.1 MB · Jun 28</span></div>
  <div class="file-row"><span class="f-icon">📊</span><span class="f-name">Q3_실적.xlsx</span><span class="f-meta">1.4 MB · Jul 12</span></div>`,
  vue: `<DsFileRow v-for="f in files" :key="f.id"
  :name="f.name" :meta="f.meta" :icon="f.icon"
  :selected="isSelected(f)" @select="toggle(f)" />`,
  html: `<div class="file-row">
  <span class="f-icon">📄</span>
  <span class="f-name">계약서_최종.pdf</span>
  <span class="f-meta">2.1 MB · Jun 28</span>
</div>`,
  guidelines: [['해야 할 것', 'compact 밀도(40px)를 유지해 많은 파일을 훑기 좋게 합니다.']],
},
{
  id: 'searchresult', name: 'SearchResult', ko: '검색 결과', category: 'data',
  origin: 'custom', vuetifyBase: null,
  summary: '검색 결과 한 건.',
  reason: { ko: 'Vuetify에 검색 결과 개념이 없습니다.', en: 'No search result concept in Vuetify.' },
  props: [
    ['title', 'string', '필수', '문서 제목.'],
    ['path', 'string', '—', '경로 (예: Drive / 법무 / 2026).'],
    ['href', 'string', `'#'`, '링크.'],
  ],
  slots: [['default', '매칭 문맥. <mark>로 검색어를 감쌉니다.'], ['footer', '배지·날짜 등.']],
  demo: `<div class="sresult">
    <h4><a href="#">계약서_최종.pdf</a></h4>
    <div class="s-path">Drive / 법무 / 2026</div>
    <p>본 <mark>계약서</mark>는 2026년 7월 1일부터 효력이 발생하며…</p>
  </div>
  <div class="sresult">
    <h4><a href="#">계약서_v2_검토중.docx</a></h4>
    <div class="s-path">Drive / 법무 / 2026</div>
    <p>수정된 <mark>계약서</mark> 초안. 법무팀 검토 대기 중…</p>
  </div>`,
  vue: `<DsSearchResult title="계약서_최종.pdf" path="Drive / 법무 / 2026">
  본 <mark>계약서</mark>는 2026년 7월 1일부터 효력이 발생하며…
  <template #footer>
    <DsBadge variant="success">Signed</DsBadge>
  </template>
</DsSearchResult>`,
  html: `<div class="sresult">
  <h4><a href="#">계약서_최종.pdf</a></h4>
  <div class="s-path">Drive / 법무 / 2026</div>
  <p>본 <mark>계약서</mark>는 2026년 7월 1일부터…</p>
</div>`,
  guidelines: [['해야 할 것', '하이라이트는 브랜드 subtle 배경으로 조용하게. 형광펜처럼 쓰지 않습니다.']],
},

/* ══════════════ AGENT ══════════════ */
{
  id: 'chatmessage', name: 'ChatMessage', ko: '채팅 메시지', category: 'agent',
  origin: 'custom', vuetifyBase: null,
  summary: '대화의 메시지 한 건.',
  reason: { ko: 'Vuetify에 대화형 메시지 컴포넌트가 없습니다. 스트리밍 중 높이가 변하고 역방향 스크롤 앵커링이 필요해 VCard로 대체할 수 없습니다.',
            en: 'No conversational message component in Vuetify. Streaming height changes and reverse scroll anchoring cannot be supported by VCard.' },
  props: [
    ['role', `'user' | 'agent'`, `'agent'`, '말하는 주체. 아바타 색이 달라집니다.'],
    ['name', 'string', '—', '표시 이름.'],
    ['streaming', 'boolean', 'false', 'true면 끝에 깜빡이는 커서를 붙입니다.'],
  ],
  slots: [['default', '메시지 본문.'], ['tools', '본문 위에 들어가는 ToolCallStep 목록.']],
  demo: `<div class="chat">
    <div class="msg"><div class="avatar user">U</div><div class="msg-body">
      <div class="msg-name">You</div><div class="msg-text">지난달 계약서 파일 찾아서 요약해줘</div>
    </div></div>
    <div class="msg"><div class="avatar ai">A</div><div class="msg-body">
      <div class="msg-name">Agent</div>
      <div class="toolcall"><span class="check">✓</span> search_drive("계약서", June) — 3 files found</div>
      <div class="msg-text">6월에 체결된 계약서 3건을 찾았습니다. 그중 최종본<span class="cite">1</span>의 핵심 조항을 정리하면<span class="cursor"></span></div>
    </div></div>
  </div>`,
  vue: `<DsChatMessage role="user" name="You">
  지난달 계약서 파일 찾아서 요약해줘
</DsChatMessage>

<DsChatMessage role="agent" name="Agent" :streaming="isStreaming">
  <template #tools>
    <DsToolCallStep status="done">search_drive("계약서", June) — 3 files</DsToolCallStep>
  </template>
  6월에 체결된 계약서 3건을 찾았습니다<DsCitationChip :index="1" />
</DsChatMessage>`,
  html: `<div class="msg">
  <div class="avatar ai">A</div>
  <div class="msg-body">
    <div class="msg-name">Agent</div>
    <div class="msg-text">
      본문 텍스트<span class="cite">1</span>
      <span class="cursor"></span>  <!-- 스트리밍 중일 때만 -->
    </div>
  </div>
</div>`,
  guidelines: [
    ['해야 할 것', '툴콜은 본문 위에 둡니다. 무엇을 근거로 답했는지가 답보다 먼저 보여야 합니다.'],
    ['하지 말 것', '메시지에 말풍선 꼬리·배경색을 넣지 않습니다. 구분은 보더와 아바타로 충분합니다.'],
  ],
},
{
  id: 'streamingtext', name: 'StreamingText', ko: '스트리밍 텍스트', category: 'agent',
  origin: 'custom', vuetifyBase: null,
  summary: '응답이 실시간으로 흘러나오는 중임을 나타냅니다.',
  reason: { ko: 'Vuetify에 없습니다. 토큰 단위로 텍스트가 늘어나는 동안 커서를 유지합니다.',
            en: 'Not in Vuetify; keeps a caret while tokens stream in.' },
  props: [['done', 'boolean', 'false', 'true가 되면 커서를 제거합니다.']],
  slots: [['default', '지금까지 도착한 텍스트.']],
  demo: `<div class="msg-text">6월에 체결된 계약서 3건을 찾았습니다. 핵심 조항을 정리하면<span class="cursor"></span></div>`,
  vue: `<DsStreamingText :done="!isStreaming">{{ text }}</DsStreamingText>`,
  html: `<div class="msg-text">
  스트리밍 중인 텍스트<span class="cursor"></span>
</div>
<!-- 완료되면 .cursor 제거 -->`,
  guidelines: [['해야 할 것', '완료되는 즉시 커서를 없앱니다. 남아 있으면 멈춘 것처럼 보입니다.']],
},
{
  id: 'thinking', name: 'ThinkingIndicator', ko: '추론 표시', category: 'agent',
  origin: 'custom', vuetifyBase: null,
  summary: '에이전트가 생각하는 중임을 알립니다.',
  reason: { ko: 'Vuetify에 없습니다. 원칙 1 — 빈 스피너 대신 무엇을 하고 있는지 말로 보여줍니다.',
            en: 'Not in Vuetify. Principle 1 — words, not a bare spinner.' },
  props: [['label', 'string', `'생각하는 중…'`, '현재 하는 일. 단계가 바뀌면 갱신합니다.']],
  slots: [['default', 'label 대신 넣을 내용.']],
  demo: `<div class="thinking"><span class="dots"><i></i><i></i><i></i></span>계약서 조항을 분석하는 중…</div>`,
  vue: `<DsThinkingIndicator :label="currentStep" />`,
  html: `<div class="thinking">
  <span class="dots"><i></i><i></i><i></i></span>
  계약서 조항을 분석하는 중…
</div>`,
  guidelines: [
    ['해야 할 것', '10초 이상 걸리면 단계에 맞게 문구를 갱신합니다("문서를 읽는 중…" → "요약을 작성하는 중…").'],
    ['하지 말 것', '"로딩 중…"처럼 아무 정보 없는 문구를 쓰지 않습니다.'],
  ],
},
{
  id: 'toolcall', name: 'ToolCallStep', ko: '툴콜 단계', category: 'agent',
  origin: 'custom', vuetifyBase: null,
  summary: '에이전트가 도구를 실행하는 과정 한 단계.',
  reason: { ko: 'Vuetify에 없습니다. 에이전트 제품에서 "일하고 있음"을 보여주는 가장 중요한 요소입니다.',
            en: 'Not in Vuetify; the key device for showing the agent is working.' },
  props: [['status', `'running' | 'done' | 'error'`, `'running'`, '진행 중 스피너 / 완료 체크 / 실패 ✕.']],
  slots: [['default', '실행 내용. 도구 이름과 인자를 그대로 보여줍니다.']],
  demo: `<div class="toolcall"><span class="check">✓</span> search_drive("계약서", June) — 3 files found</div>
  <div class="toolcall"><span class="spinner"></span> read_document("계약서_최종.pdf")</div>
  <div class="toolcall"><span class="check" style="color:var(--danger)">✕</span> extract_table("스캔본.pdf") — 텍스트 레이어 없음</div>`,
  vue: `<DsToolCallStep status="done">search_drive("계약서", June) — 3 files</DsToolCallStep>
<DsToolCallStep status="running">read_document("계약서_최종.pdf")</DsToolCallStep>
<DsToolCallStep status="error">extract_table("스캔본.pdf") — 텍스트 레이어 없음</DsToolCallStep>`,
  html: `<!-- 진행 중 -->
<div class="toolcall"><span class="spinner"></span> read_document("file.pdf")</div>

<!-- 완료 -->
<div class="toolcall"><span class="check">✓</span> search_drive("query") — 3 files found</div>`,
  guidelines: [
    ['해야 할 것', '원칙 4 — 접을 수는 있어도 없애지 않습니다. 항상 열어볼 수 있게 합니다.'],
    ['해야 할 것', '실패한 단계도 그대로 보여줍니다. 무엇이 안 됐는지 아는 것이 사용자에게 유용합니다.'],
  ],
},
{
  id: 'artifact', name: 'ArtifactPanel', ko: '산출물 패널', category: 'agent',
  origin: 'custom', vuetifyBase: null,
  summary: '에이전트가 만든 산출물(코드·문서·표)을 대화 옆에 보여줍니다.',
  reason: { ko: 'Vuetify에 없습니다. 긴 산출물을 대화 흐름에서 분리해야 둘 다 읽을 수 있습니다.',
            en: 'Not in Vuetify; long outputs must live outside the conversation flow.' },
  props: [
    ['title', 'string', '필수', '산출물 이름 (파일명 권장).'],
    ['copyable', 'boolean', 'false', '복사 버튼 표시.'],
    ['downloadable', 'boolean', 'false', '다운로드 버튼 표시.'],
  ],
  events: [['copy', '—', '복사 클릭.'], ['download', '—', '다운로드 클릭.']],
  slots: [['default', '산출물 내용.']],
  demo: `<div class="artifact" style="max-width:560px">
    <div class="a-head"><span class="a-title">summary_report.md</span><button class="btn btn-ghost btn-sm">Copy</button><button class="btn btn-secondary btn-sm">Download</button></div>
    <div class="a-body"># 6월 계약서 요약
- 계약 기간: 12개월 (자동 갱신)
- 대금 지급: 월말 정산 후 30일 이내
- 해지 조건: 90일 전 서면 통보</div>
  </div>`,
  vue: `<DsArtifactPanel title="summary_report.md" copyable downloadable
  @copy="copy" @download="save">
{{ markdown }}
</DsArtifactPanel>`,
  html: `<div class="artifact">
  <div class="a-head">
    <span class="a-title">summary_report.md</span>
    <button class="btn btn-ghost btn-sm">Copy</button>
    <button class="btn btn-secondary btn-sm">Download</button>
  </div>
  <div class="a-body">산출물 내용</div>
</div>`,
  guidelines: [['해야 할 것', '산출물이 20줄을 넘으면 대화에 인라인으로 넣지 말고 이 패널로 분리합니다.']],
},
]

export const TEMPLATES = [
  { id: 'chat',   name: 'Chat / Agent',   ko: '챗 · 에이전트', file: 'templates/chat.html',
    desc: '메시지 스트림 · 툴콜 · 인용 · 입력창', covers: ['ChatMessage', 'ToolCallStep', 'CitationChip', 'AgentInput'] },
  { id: 'search', name: 'Search Results', ko: '검색 결과',     file: 'templates/search.html',
    desc: '쿼리 바 · 필터 · 하이라이트 결과 · 빈 결과', covers: ['SearchResult', 'Chip', 'EmptyState', 'Input'] },
]

/* ============================================
   Vuetify 3.11 전 컴포넌트 커버리지
   status: 'wrapped'  Ds* 컴포넌트로 제공 (감쌈)
           'themed'   defaults.ts + ds-vuetify.css로 스타일 적용
           'css'      CSS로만 스타일 적용 (내부 프리미티브·타이포)
           'structural' 시각 표면이 없음 (레이아웃·프로바이더) — 스타일 불필요
   ============================================ */
export const VUETIFY_COVERAGE = [
  // ── wrapped (5) ──
  ['VDataTable', 'wrapped', 'DsDataTable', '정렬·페이지네이션·선택'],
  ['VDialog', 'wrapped', 'DsDialog', '포커스 트랩·스크롤 락'],
  ['VMenu', 'wrapped', 'DsMenu', '포지셔닝·키보드 네비'],
  ['VTooltip', 'wrapped', 'DsTooltip', '지연 표시·터치 대응'],
  ['VSelect', 'wrapped', 'DsSelect', '옵션 포지셔닝·다중 선택'],

  // ── themed: Action ──
  ['VBtn', 'themed', '', 'flat · rounded md · ripple 제거'],
  ['VBtnGroup', 'themed', '', 'outlined · divided'],
  ['VBtnToggle', 'themed', '', 'outlined · divided'],
  ['VFab', 'themed', '', 'elevation 0'],
  ['VSpeedDial', 'themed', '', 'fade 전환'],

  // ── themed: Surface ──
  ['VCard', 'themed', '', 'outlined · elevation 0'],
  ['VSheet', 'themed', '', 'elevation 0'],
  ['VToolbar', 'themed', '', 'flat'],
  ['VAppBar', 'themed', '', 'flat · 하단 보더'],
  ['VFooter', 'themed', '', '상단 보더'],
  ['VSystemBar', 'themed', '', 'surface 색'],
  ['VExpansionPanel', 'themed', '', 'elevation 0 · 보더'],
  ['VParallax', 'themed', '', 'scale 1'],

  // ── themed: Navigation ──
  ['VNavigationDrawer', 'themed', '', 'elevation 0 · 보더'],
  ['VBottomNavigation', 'themed', '', 'elevation 0'],
  ['VTabs', 'themed', '', '2px 슬라이더 · 대문자 변환 해제'],
  ['VBreadcrumbs', 'themed', '', 'comfortable'],
  ['VPagination', 'themed', '', 'text · 활성 시 브랜드 배경'],
  ['VStepper', 'themed', '', 'flat · 보더'],

  // ── themed: Data Input ──
  ['VTextField', 'themed', '', 'outlined · 포커스 시 브랜드 보더'],
  ['VTextarea', 'themed', '', 'outlined · auto-grow'],
  ['VAutocomplete', 'themed', '', 'outlined'],
  ['VCombobox', 'themed', '', 'outlined'],
  ['VFileInput', 'themed', '', 'outlined'],
  ['VNumberInput', 'themed', '', 'outlined'],
  ['VOtpInput', 'themed', '', 'outlined'],
  ['VCheckbox', 'themed', '', 'primary · ripple 제거'],
  ['VRadio', 'themed', '', 'primary · ripple 제거'],
  ['VRadioGroup', 'themed', '', 'primary'],
  ['VSwitch', 'themed', '', 'inset · primary'],
  ['VSlider', 'themed', '', 'thumb 14 · track 3'],
  ['VRangeSlider', 'themed', '', 'thumb 14 · track 3'],
  ['VRating', 'themed', '', 'small · primary'],
  ['VDatePicker', 'themed', '', 'elevation 0'],
  ['VTimePicker', 'themed', '', 'elevation 0'],
  ['VColorPicker', 'themed', '', 'elevation 0 · hexa'],
  ['VCalendar', 'themed', '', 'primary'],
  ['VConfirmEdit', 'themed', '', 'primary'],
  ['VForm', 'themed', '', 'submit 시 검증'],

  // ── themed: Feedback ──
  ['VAlert', 'themed', '', 'tonal · 좌측 보더'],
  ['VBanner', 'themed', '', 'rounded md'],
  ['VChip', 'themed', '', 'outlined · pill · small'],
  ['VBadge', 'themed', '', 'primary'],
  ['VProgressLinear', 'themed', '', '높이 2px'],
  ['VProgressCircular', 'themed', '', '두께 2 · 크기 20'],
  ['VSkeletonLoader', 'themed', '', 'elevation 0'],
  ['VSnackbar', 'themed', '', '보더 · 우하단 · 4초'],
  ['VSnackbarQueue', 'themed', '', '보더 · 우하단'],
  ['VEmptyState', 'themed', '', '아이콘 48'],

  // ── themed: Overlay ──
  ['VOverlay', 'themed', '', 'fade · scrim 32%'],
  ['VBottomSheet', 'themed', '', 'fade 전환'],

  // ── themed: Table & List ──
  ['VTable', 'themed', '', '헤더 회색 · 호버 배경'],
  ['VDataTableServer', 'themed', '', 'DsDataTable과 동일 스타일'],
  ['VDataTableVirtual', 'themed', '', 'DsDataTable과 동일 스타일'],
  ['VDataIterator', 'themed', '', '페이지당 20'],
  ['VList', 'themed', '', 'nav · rounded · 34px 행'],
  ['VTreeview', 'themed', '', 'rounded · 32px 행'],
  ['VVirtualScroll', 'themed', '', '행 높이 40'],
  ['VInfiniteScroll', 'themed', '', 'intersect 모드'],
  ['VTimeline', 'themed', '', '선 1px · 브랜드 점'],
  ['VSparkline', 'themed', '', 'primary · smooth'],

  // ── themed: Content ──
  ['VAvatar', 'themed', '', 'circle · 32px'],
  ['VIcon', 'themed', '', '20px'],
  ['VImg', 'themed', '', 'cover'],
  ['VCarousel', 'themed', '', '호버 시 화살표'],
  ['VWindow', 'themed', '', '화살표 숨김'],
  ['VSlideGroup', 'themed', '', '화살표 표시'],
  ['VDivider', 'themed', '', '1px'],
  ['VLazy', 'themed', '', 'minHeight 0'],

  // ── css: 내부 프리미티브 · 타이포 ──
  ['VField', 'css', '', '입력 공통 껍데기 — 보더·radius·포커스 링'],
  ['VInput', 'css', '', '입력 공통 래퍼'],
  ['VLabel', 'css', '', '라벨 크기·색'],
  ['VMessages', 'css', '', '힌트·에러 문구 크기'],
  ['VCounter', 'css', '', '글자수 표시'],
  ['VSelectionControl', 'css', '', '체크박스·라디오 공통'],
  ['VSelectionControlGroup', 'css', '', '선택 컨트롤 그룹'],
  ['VChipGroup', 'css', '', '칩 묶음'],
  ['VItemGroup', 'css', '', '선택 그룹'],
  ['VCode', 'css', '', 'mono · 회색 배경'],
  ['VKbd', 'css', '', 'mono · 반전 배경'],
  ['VHotkey', 'css', '', 'VKbd 기반'],
  ['VOverflowBtn', 'css', '', 'VSelect 기반'],

  // ── structural: 시각 표면 없음 ──
  ['VApp', 'structural', '', '앱 루트'],
  ['VMain', 'structural', '', '본문 영역'],
  ['VLayout', 'structural', '', '레이아웃 컨테이너'],
  ['VGrid', 'structural', '', '그리드 (row/col/container)'],
  ['VResponsive', 'structural', '', '비율 유지 박스'],
  ['VHover', 'structural', '', '호버 상태 제공'],
  ['VNoSsr', 'structural', '', 'SSR 제외'],
  ['VValidation', 'structural', '', '검증 로직'],
  ['VDefaultsProvider', 'structural', '', 'defaults 주입'],
  ['VThemeProvider', 'structural', '', '테마 주입'],
  ['VLocaleProvider', 'structural', '', '로케일 주입'],
]
