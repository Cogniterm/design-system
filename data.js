import { ic } from './icons-svg.js'

/* ============================================
   컴포넌트 레지스트리 — 문서 사이트의 단일 원본
   여기에 추가하면 사이드바·페이지·검색에 자동 반영됩니다.
   ============================================ */

// origin: 'custom'   직접 만듦 (Vuetify 불필요)
//         'wrapped'  Vuetify 컴포넌트를 감쌈 (Vuetify 필요)
//
// vuetifyBase — wrapped일 때 감싼 Vuetify 컴포넌트
// vuetifyAlt  — custom이지만 Vuetify에 대안이 있는 경우 (왜 안 썼는지는 reason에)

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
    ['size', `'default' | 'sm'`, `'default'`, 'Geist 스케일 32/40. 필터 바·테이블 주변 같은 밀한 맥락은 sm.'],
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
    <div class="ds-menu-item">${ic('edit','sm')}이름 바꾸기</div>
    <div class="ds-menu-item">${ic('copy','sm')}복제</div>
    <hr class="divider" style="margin:4px 0">
    <div class="ds-menu-item" style="color:var(--danger)">${ic('delete','sm')}삭제</div>
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
    ['dense', 'boolean', 'false', '32px — 필터 바·툴바.'],
    ['error', 'string', '—', '에러 메시지.'],
  ],
  slots: [],
  demo: `<div class="field"><label>Status</label>
    <div class="input" style="display:flex;align-items:center;justify-content:space-between;cursor:pointer">
      <span>Running</span><span style="color:var(--gray-9)">${ic('expand','sm')}</span>
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
    ['variant', `'default' | 'brand'`, `'default'`, '거의 default를 씁니다. 활성 필터도 중립 칩입니다.'],
    ['removable', 'boolean', 'true', '✕ 버튼 표시.'],
  ],
  events: [['remove', '—', '✕ 클릭 시 발생.']],
  slots: [['default', '칩 라벨.']],
  demo: `<div class="row">
    <span class="chip">design-system.pdf<button class="x" aria-label="Remove">${ic('close',12)}</button></span>
    <span class="chip">Q3 보고서<button class="x" aria-label="Remove">${ic('close',12)}</button></span>
    <span class="chip brand">Status: Running<button class="x" aria-label="Remove">${ic('close',12)}</button></span>
  </div>`,
  vue: `<DsChip @remove="detach(file)">design-system.pdf</DsChip>
<DsChip variant="brand" @remove="clearFilter">Status: Running</DsChip>`,
  html: `<span class="chip">
  design-system.pdf
  <button class="x" aria-label="Remove">${ic('close',12)}</button>
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
      <button class="ai-tool" aria-label="Attach file">${ic('attach','sm')}</button>
      <button class="ai-tool" aria-label="Slash commands">${ic('command','sm')}</button>
      <span class="ai-spacer"></span>
      <button class="btn btn-primary btn-sm">Send</button>
    </div>
  </div>`,
  vue: `<DsAgentInput v-model="draft" @send="submit" @attach="pickFile" />`,
  html: `<div class="agent-input">
  <textarea rows="1" placeholder="Message agent…"></textarea>
  <div class="ai-bar">
    <button class="ai-tool" aria-label="Attach file">${ic('attach','sm')}</button>
    <button class="ai-tool" aria-label="Slash commands">${ic('command','sm')}</button>
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
  origin: 'custom', vuetifyBase: null, vuetifyAlt: 'VSkeletonLoader',
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
  origin: 'custom', vuetifyBase: null, vuetifyAlt: 'VSnackbar',
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
  <button class="ai-tool" aria-label="Archive">${ic('archive','sm')}</button>
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
    ['density', `'compact' | 'comfortable' | 'spacious'`, `'comfortable'`, '행 높이 34 / 42 / 50px (원칙 3).'],
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
  slots: [['icon', '파일 아이콘. <DsIcon>을 넣습니다. 생략하면 file.icon 문자열이 그대로 표시됩니다.']],
  demo: `<div class="file-grid">
    <div class="file-card"><div class="f-icon">${ic('folder','lg')}</div><div class="f-name">법무</div><div class="f-meta">12 files</div></div>
    <div class="file-card selected"><div class="f-icon">${ic('document','lg')}</div><div class="f-name">계약서_최종.pdf</div><div class="f-meta">2.1 MB</div></div>
    <div class="file-card"><div class="f-icon">${ic('document','lg')}</div><div class="f-name">계약서_v2_검토중.docx</div><div class="f-meta">840 KB</div></div>
    <div class="file-card"><div class="f-icon">${ic('spreadsheet','lg')}</div><div class="f-name">Q3_실적.xlsx</div><div class="f-meta">1.4 MB</div></div>
  </div>`,
  vue: `<DsFileGrid :files="files" :selected="selectedIds" @select="toggle">
  <template #icon="{ file }"><DsIcon :name="file.icon" size="lg" /></template>
</DsFileGrid>`,
  html: `<div class="file-grid">
  <div class="file-card">
    <div class="f-icon">${ic('document','lg')}</div>
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
    ['icon', 'string', '—', '텍스트 아이콘. 보통은 #icon 슬롯에 <DsIcon>을 넣습니다.'],
    ['selected', 'boolean', 'false', '선택 상태.'],
  ],
  events: [['select', '—', '행 클릭.']],
  slots: [],
  demo: `<div class="file-row"><span class="f-icon">${ic('folder','sm')}</span><span class="f-name">법무</span><span class="f-meta">Jun 28</span></div>
  <div class="file-row selected"><span class="f-icon">${ic('document','sm')}</span><span class="f-name">계약서_최종.pdf</span><span class="f-meta">2.1 MB · Jun 28</span></div>
  <div class="file-row"><span class="f-icon">${ic('spreadsheet','sm')}</span><span class="f-name">Q3_실적.xlsx</span><span class="f-meta">1.4 MB · Jul 12</span></div>`,
  vue: `<DsFileRow v-for="f in files" :key="f.id"
  :name="f.name" :meta="f.meta"
  :selected="isSelected(f)" @select="toggle(f)"&gt;
  <template #icon><DsIcon :name="f.icon" size="sm" /></template>
</DsFileRow>`,
  html: `<div class="file-row">
  <span class="f-icon">${ic('document','sm')}</span>
  <span class="f-name">계약서_최종.pdf</span>
  <span class="f-meta">2.1 MB · Jun 28</span>
</div>`,
  guidelines: [['해야 할 것', 'compact 밀도(42px)를 유지해 많은 파일을 훑기 좋게 합니다.']],
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
      <div class="toolcall"><span class="check">${ic('confirm','sm')}</span> search_drive("계약서", June) — 3 files found</div>
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
  demo: `<div class="toolcall"><span class="check">${ic('confirm','sm')}</span> search_drive("계약서", June) — 3 files found</div>
  <div class="toolcall"><span class="spinner"></span> read_document("계약서_최종.pdf")</div>
  <div class="toolcall"><span class="check" style="color:var(--danger)">${ic('close','sm')}</span> extract_table("스캔본.pdf") — 텍스트 레이어 없음</div>`,
  vue: `<DsToolCallStep status="done">search_drive("계약서", June) — 3 files</DsToolCallStep>
<DsToolCallStep status="running">read_document("계약서_최종.pdf")</DsToolCallStep>
<DsToolCallStep status="error">extract_table("스캔본.pdf") — 텍스트 레이어 없음</DsToolCallStep>`,
  html: `<!-- 진행 중 -->
<div class="toolcall"><span class="spinner"></span> read_document("file.pdf")</div>

<!-- 완료 -->
<div class="toolcall"><span class="check">${ic('confirm','sm')}</span> search_drive("query") — 3 files found</div>`,
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
{
  id: 'icon', name: 'Icon', ko: '아이콘', category: 'content',
  origin: 'wrapped', vuetifyBase: 'Lucide',
  summary: '아이콘 하나를 그립니다.',
  reason: { ko: '아이콘 세트가 섞이면 굵기와 광학 크기가 달라 같은 줄에서 어긋나 보입니다. Lucide 하나로 고정하고, Lucide 이름이 아니라 우리 어휘(의미 이름)로 부릅니다 — 나중에 세트를 바꿔도 화면 코드는 그대로입니다.',
            en: 'Mixed icon sets misalign due to differing stroke and optical size. Fixed to Lucide, addressed by semantic name so the set can be swapped without touching screens.' },
  props: [
    ['name', 'IconName', '필수', "의미 이름. 'delete', 'agent', 'search' 등. vue/icons.ts에 등록된 것만."],
    ['size', "'sm' | 'md' | 'lg' | number", "'md'", '16 / 20 / 24px. 그 사이 값은 픽셀 그리드가 어긋납니다.'],
    ['label', 'string', '—', '뜻을 전달하는 아이콘이면 필수. 없으면 aria-hidden 처리됩니다.'],
    ['spin', 'boolean', 'false', '회전. loading 아이콘에 씁니다.'],
  ],
  slots: [],
  demo: `<div class="row" style="gap:20px;color:var(--gray-11)">
    <span style="display:inline-flex;gap:8px;align-items:center;font-size:13px">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg> search</span>
    <span style="display:inline-flex;gap:8px;align-items:center;font-size:13px">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2M20 14h2M15 13v2M9 13v2"/></svg> agent</span>
    <span style="display:inline-flex;gap:8px;align-items:center;font-size:13px">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> delete</span>
  </div>`,
  vue: `import { DsIcon } from '~/design/icon'

<DsIcon name="delete" />
<DsIcon name="agent" size="lg" />
<DsIcon name="loading" spin />
<DsIcon name="search" label="검색" />`,
  html: null,
  guidelines: [
    ['해야 할 것', '같은 뜻에는 항상 같은 아이콘을 씁니다. 새 아이콘은 vue/icons.ts에 의미 이름으로 등록합니다.'],
    ['해야 할 것', '아이콘은 옆 글자와 같은 색(currentColor)을 씁니다. 아이콘만 브랜드 색으로 칠하지 않습니다.'],
    ['접근성', '뜻을 전달하는 아이콘에는 label을, 장식이면 생략합니다(자동으로 aria-hidden).'],
    ['하지 말 것', '16/20/24 외의 크기를 쓰지 않습니다. 18px, 22px는 픽셀 그리드가 어긋나 흐려집니다.'],
  ],
},
/* ══════════════ 신규 — Vuetify 기반 래퍼 ══════════════ */
{
  id: 'iconbutton', name: 'IconButton', ko: '아이콘 버튼', category: 'action',
  origin: 'wrapped', vuetifyBase: 'VBtn',
  summary: '아이콘만 있는 버튼.',
  reason: { ko: '아이콘 버튼은 크기·정렬·aria-label 규칙이 화면마다 어긋나기 쉽습니다. 하나로 고정합니다.',
            en: 'Size, alignment and aria-label drift across screens; fix them once.' },
  props: [
    ['label', 'string', '필수', 'aria-label. 아이콘만 있으므로 생략할 수 없습니다.'],
    ['variant', "'ghost' | 'secondary'", "'ghost'", '보더 유무.'],
    ['size', "'sm' | 'default'", "'default'", '28 / 32px.'],
  ],
  events: [['click', 'MouseEvent', '클릭 시 발생.']],
  slots: [['default', '아이콘.']],
  demo: `<div class="row"><button class="row-more-demo">${ic('more')}</button><button class="row-more-demo bordered">${ic('archive')}</button></div>`,
  vue: `<DsIconButton label="More"><DsIcon name="more" /></DsIconButton>
<DsIconButton label="Archive" variant="secondary"><DsIcon name="archive" /></DsIconButton>`,
  html: null,
  guidelines: [
    ['접근성', 'label은 필수입니다. 스크린리더에는 아이콘이 읽히지 않습니다.'],
    ['해야 할 것', '아이콘만으로 뜻이 분명하지 않으면 Tooltip을 함께 답니다.'],
  ],
},
{
  id: 'buttongroup', name: 'ButtonGroup', ko: '버튼 그룹', category: 'action',
  origin: 'wrapped', vuetifyBase: 'VBtnToggle',
  summary: '서로 배타적인 보기 전환.',
  reason: { ko: '라디오 버튼은 무겁고 탭은 과합니다. 그 중간 크기의 전환이 필요합니다.',
            en: 'Radios are heavy, tabs too prominent; this is the middle weight.' },
  props: [
    ['modelValue', 'any', '—', 'v-model.'],
    ['items', '{ value, label }[]', '필수', '선택지.'],
  ],
  slots: [],
  demo: `<div class="ds-bg-demo"><span class="on">리스트</span><span>그리드</span></div>`,
  vue: `<DsButtonGroup v-model="view" :items="[
  { value: 'list', label: '리스트' },
  { value: 'grid', label: '그리드' },
]" />`,
  html: null,
  guidelines: [
    ['해야 할 것', '선택지는 2~4개까지. 그 이상이면 Select를 씁니다.'],
    ['하지 말 것', '페이지를 바꾸는 내비게이션으로 쓰지 않습니다. 그건 Tabs입니다.'],
  ],
},
{
  id: 'tabs', name: 'Tabs', ko: '탭', category: 'action',
  origin: 'wrapped', vuetifyBase: 'VTabs',
  summary: '같은 대상의 여러 단면을 전환합니다.',
  reason: { ko: 'Vuetify 기본 탭은 대문자 변환과 리플이 우리 기조와 맞지 않고, 건수 배지가 자주 필요합니다.',
            en: 'Default uppercase + ripple clash with our tone; count badges are frequently needed.' },
  props: [
    ['modelValue', 'any', '—', 'v-model.'],
    ['items', '{ value, label, count? }[]', '필수', 'count를 주면 배지가 붙습니다.'],
  ],
  slots: [],
  demo: `<div class="ds-tabs-demo"><span class="on">전체 <b>12</b></span><span>실패 <b>3</b></span><span>경고 <b>2</b></span></div>`,
  vue: `<DsTabs v-model="tab" :items="[
  { value: 'all', label: '전체', count: 12 },
  { value: 'error', label: '실패', count: 3 },
]" />`,
  html: null,
  guidelines: [
    ['해야 할 것', '탭은 같은 대상의 다른 단면일 때만. 다른 대상이면 내비게이션입니다.'],
    ['하지 말 것', '탭 안에 탭을 넣지 않습니다.'],
  ],
},
{
  id: 'breadcrumbs', name: 'Breadcrumbs', ko: '경로', category: 'action',
  origin: 'wrapped', vuetifyBase: 'VBreadcrumbs',
  summary: '현재 위치의 계층 경로.',
  reason: { ko: '구분자 모양과 마지막 항목 강조 규칙을 고정합니다.', en: 'Fix separator and last-item emphasis.' },
  props: [['items', '{ title, to?, disabled? }[]', '필수', '마지막 항목은 disabled로 두어 현재 위치를 표시합니다.']],
  slots: [],
  demo: `<div class="ds-bc-demo">Drive <i>/</i> 법무 <i>/</i> <b>2026</b></div>`,
  vue: `<DsBreadcrumbs :items="[
  { title: 'Drive' }, { title: '법무' }, { title: '2026', disabled: true },
]" />`,
  html: null,
  guidelines: [['해야 할 것', '깊이가 4단계를 넘으면 중간을 … 으로 접습니다.']],
},
{
  id: 'pagination', name: 'Pagination', ko: '페이지네이션', category: 'data',
  origin: 'wrapped', vuetifyBase: 'VPagination',
  summary: '긴 목록을 페이지로 나눕니다.',
  reason: { ko: 'Vuetify 기본은 크고 그림자가 있습니다. 조용하게 낮춥니다.', en: 'Default is large and elevated; we quiet it down.' },
  props: [
    ['modelValue', 'number', '1', '현재 페이지.'],
    ['length', 'number', '필수', '전체 페이지 수.'],
    ['totalVisible', 'number', '7', '한 번에 보이는 버튼 수.'],
  ],
  slots: [],
  demo: `<div class="ds-pg-demo"><span>${ic('prev','sm')}</span><span>1</span><span class="on">2</span><span>3</span><span>4</span><span>${ic('forward','sm')}</span></div>`,
  vue: `<DsPagination v-model="page" :length="8" />`,
  html: null,
  guidelines: [['해야 할 것', '무한 스크롤이 나은 화면도 있습니다. 되돌아올 일이 많으면 페이지네이션입니다.']],
},
{
  id: 'navlist', name: 'NavList', ko: '내비게이션 목록', category: 'action',
  origin: 'wrapped', vuetifyBase: 'VList',
  summary: '좌측 사이드바 메뉴.',
  reason: { ko: '사이드바는 모든 화면에 나오는데 매번 다르게 만들어집니다. 아이콘·배지·활성 표시를 고정합니다.',
            en: 'Sidebars appear everywhere and drift; fix icon, badge and active styling.' },
  props: [
    ['modelValue', 'any', '—', '선택된 항목.'],
    ['items', 'NavItem[]', '필수', '{ value, title, icon?, badge?, subheader? }'],
  ],
  slots: [],
  demo: `<div class="ds-nav-demo"><div class="sub">워크스페이스</div><div>${ic('agent','sm')} 에이전트 <b>17</b></div><div class="on">${ic('tableView','sm')} 감사 로그 <b>3</b></div></div>`,
  vue: `<DsNavList v-model="nav" :items="[
  { subheader: '워크스페이스' },
  { value: 'agents', title: '에이전트', icon: 'agent', badge: 17 },
  { value: 'logs', title: '감사 로그', icon: 'tableView', badge: 3 },
]">
  <template #icon="{ item }"><DsIcon :name="item.icon" size="sm" /></template>
</DsNavList>`,
  html: null,
  guidelines: [['해야 할 것', '항목이 7개를 넘으면 subheader로 묶습니다.']],
},
{
  id: 'stepper', name: 'Stepper', ko: '단계 표시', category: 'action',
  origin: 'wrapped', vuetifyBase: 'VStepper',
  summary: '여러 단계로 나뉜 흐름.',
  reason: { ko: '마법사 UI를 매번 새로 만들면 단계 표시가 제각각이 됩니다.', en: 'Wizards drift without a fixed step indicator.' },
  props: [
    ['modelValue', 'number', '1', '현재 단계 (1부터).'],
    ['items', 'string[]', '필수', '단계 이름.'],
  ],
  slots: [['item.N', 'N번째 단계의 내용.']],
  demo: `<div class="ds-step-demo"><span><i>1</i>소스 선택</span><span class="on"><i>2</i>규칙 설정</span><span><i>3</i>검토</span></div>`,
  vue: `<DsStepper v-model="step" :items="['소스 선택', '규칙 설정', '검토']">
  <template #item.1>1단계 내용</template>
</DsStepper>`,
  html: null,
  guidelines: [['해야 할 것', '단계는 5개를 넘지 않게 합니다. 넘으면 흐름을 나눕니다.']],
},
{
  id: 'textarea', name: 'Textarea', ko: '여러 줄 입력', category: 'input',
  origin: 'wrapped', vuetifyBase: 'VTextarea',
  summary: '여러 줄 텍스트 입력.',
  reason: { ko: 'auto-grow와 라벨·에러 규칙을 Input과 똑같이 맞추기 위해 감쌉니다.',
            en: 'Wrapped so auto-grow, label and error rules match DsInput exactly.' },
  props: [
    ['modelValue', 'string', '—', 'v-model.'],
    ['label', 'string', '—', '라벨.'],
    ['hint', 'string', '—', '보조 설명.'],
    ['error', 'string', '—', '에러 메시지.'],
    ['rows', 'number', '3', '초기 줄 수. 내용이 늘면 자동 확장.'],
  ],
  slots: [],
  demo: `<div class="field"><label>메모</label><textarea class="input" style="height:auto;padding:10px 12px;min-height:66px" placeholder="내용을 입력하세요"></textarea><div class="hint">줄이 늘면 자동으로 커집니다.</div></div>`,
  vue: `<DsTextarea v-model="memo" label="메모" hint="줄이 늘면 자동으로 커집니다." />`,
  html: null,
  guidelines: [['하지 말 것', '에이전트 대화 입력에는 쓰지 않습니다. 그건 AgentInput입니다.']],
},
{
  id: 'autocomplete', name: 'Autocomplete', ko: '검색 선택', category: 'input',
  origin: 'wrapped', vuetifyBase: 'VAutocomplete',
  summary: '검색해서 고르는 선택.',
  reason: { ko: '검색·필터링을 직접 만들면 한글 조합 입력에서 깨집니다. Vuetify 구현을 유지합니다.',
            en: 'Hand-rolled filtering breaks on Korean IME composition; keep Vuetify.' },
  props: [
    ['modelValue', 'any', '—', 'v-model.'],
    ['items', 'any[]', '필수', '옵션.'],
    ['multiple', 'boolean', 'false', '다중 선택 시 칩으로 표시됩니다.'],
    ['error', 'string', '—', '에러 메시지.'],
  ],
  slots: [],
  demo: `<div class="field"><label>폴더</label><div class="input" style="display:flex;gap:6px;align-items:center"><span class="chip" style="height:20px">법무<button class="x">${ic('close',12)}</button></span><span style="color:var(--gray-9);font-size:13px">검색…</span></div></div>`,
  vue: `<DsAutocomplete v-model="folders" label="폴더" multiple
  :items="['법무', '재무', '인사', '영업']" />`,
  html: null,
  guidelines: [['해야 할 것', '옵션이 10개를 넘으면 Select 대신 이것을 씁니다.']],
},
{
  id: 'checkbox', name: 'Checkbox', ko: '체크박스', category: 'input',
  origin: 'wrapped', vuetifyBase: 'VCheckbox',
  summary: '켜고 끄는 선택. 저장 버튼과 함께 씁니다.',
  reason: { ko: '부분 선택(indeterminate) 상태가 테이블 전체 선택에 반드시 필요한데 직접 만들면 빠뜨립니다.',
            en: 'Indeterminate state is required for table select-all and is easy to miss.' },
  props: [
    ['modelValue', 'boolean', '—', 'v-model.'],
    ['label', 'string', '—', '라벨.'],
    ['hint', 'string', '—', '보조 설명.'],
    ['indeterminate', 'boolean', 'false', '부분 선택 상태.'],
  ],
  slots: [],
  demo: `<div style="display:flex;flex-direction:column;gap:10px"><label style="display:flex;gap:8px;align-items:center;font-size:13.5px"><input type="checkbox" checked style="accent-color:var(--brand);width:16px;height:16px">이메일 알림 받기</label><label style="display:flex;gap:8px;align-items:center;font-size:13.5px"><input type="checkbox" style="accent-color:var(--brand);width:16px;height:16px">자동 재시도</label></div>`,
  vue: `<DsCheckbox v-model="notify" label="이메일 알림 받기"
  hint="실패한 실행에 대해서만 발송됩니다." />

<DsCheckbox :indeterminate="someSelected" label="전체 선택" />`,
  html: null,
  guidelines: [
    ['해야 할 것', '저장 버튼을 눌러야 반영되면 Checkbox, 즉시 반영이면 Switch입니다.'],
    ['해야 할 것', '테이블 전체 선택은 일부만 선택됐을 때 indeterminate로 표시합니다.'],
  ],
},
{
  id: 'switch', name: 'Switch', ko: '스위치', category: 'input',
  origin: 'wrapped', vuetifyBase: 'VSwitch',
  summary: '즉시 반영되는 on/off.',
  reason: { ko: 'Checkbox와 혼용되면 "저장을 눌러야 하나"가 매번 헷갈립니다. 즉시 반영 = Switch로 고정합니다.',
            en: 'Mixing with checkbox confuses save semantics; switch always means instant.' },
  props: [
    ['modelValue', 'boolean', '—', 'v-model.'],
    ['label', 'string', '—', '라벨.'],
    ['hint', 'string', '—', '끄면 무슨 일이 생기는지 적습니다.'],
  ],
  slots: [],
  demo: `<div style="display:flex;gap:10px;align-items:center"><span style="width:34px;height:20px;border-radius:999px;background:var(--brand);position:relative;display:inline-block"><i style="position:absolute;right:2px;top:2px;width:16px;height:16px;border-radius:50%;background:#fff"></i></span><span style="font-size:13.5px">에이전트 활성화</span></div>`,
  vue: `<DsSwitch v-model="enabled" label="에이전트 활성화"
  hint="끄면 예약된 실행도 중단됩니다." />`,
  html: null,
  guidelines: [
    ['해야 할 것', '즉시 반영되므로 되돌리기(Undo) 토스트를 함께 제공하는 것이 좋습니다.'],
    ['해야 할 것', 'hint에 "끄면 무슨 일이 생기는지"를 적습니다.'],
  ],
},
{
  id: 'radiogroup', name: 'RadioGroup', ko: '라디오 그룹', category: 'input',
  origin: 'wrapped', vuetifyBase: 'VRadioGroup',
  summary: '여러 선택지 중 하나.',
  reason: { ko: '항목마다 부연 설명이 필요한 경우가 많아 hint를 구조에 포함시켰습니다.',
            en: 'Per-option hints are common; baked into the structure.' },
  props: [
    ['modelValue', 'any', '—', 'v-model.'],
    ['label', 'string', '—', '그룹 라벨.'],
    ['items', '{ value, label, hint? }[]', '필수', '선택지.'],
    ['inline', 'boolean', 'false', '가로 배치.'],
  ],
  slots: [],
  demo: `<div style="display:flex;flex-direction:column;gap:8px;font-size:13.5px"><label style="display:flex;gap:8px"><input type="radio" name="d" style="accent-color:var(--brand)"><span>90일 <span style="color:var(--gray-10);font-size:12px;display:block">기본값</span></span></label><label style="display:flex;gap:8px"><input type="radio" name="d" checked style="accent-color:var(--brand)"><span>180일 <span style="color:var(--gray-10);font-size:12px;display:block">현재 설정</span></span></label></div>`,
  vue: `<DsRadioGroup v-model="retention" label="보존 기간" :items="[
  { value: '90', label: '90일', hint: '기본값' },
  { value: '180', label: '180일', hint: '현재 설정' },
]" />`,
  html: null,
  guidelines: [['해야 할 것', '선택지가 5개를 넘으면 Select를 검토합니다.']],
},
{
  id: 'slider', name: 'Slider', ko: '슬라이더', category: 'input',
  origin: 'wrapped', vuetifyBase: 'VSlider',
  summary: '범위 안에서 값을 조정합니다.',
  reason: { ko: '현재 값 표시가 기본으로 없어서 매번 따로 붙이게 됩니다. 라벨에 통합했습니다.',
            en: 'Current value display is always added ad hoc; folded into the label.' },
  props: [
    ['modelValue', 'number', '0', 'v-model.'],
    ['label', 'string', '—', '라벨. 우측에 현재 값이 표시됩니다.'],
    ['min / max / step', 'number', '0 / 100 / 1', '범위.'],
    ['suffix', 'string', '—', '값 뒤 단위 (예: %).'],
  ],
  slots: [],
  demo: `<div style="max-width:280px"><div style="display:flex;justify-content:space-between;font-size:13px;font-weight:500"><span>신뢰도 임계값</span><span style="font-family:var(--mono);color:var(--gray-11);font-weight:400">70%</span></div><div style="height:3px;background:var(--gray-5);border-radius:2px;margin-top:12px;position:relative"><div style="width:70%;height:100%;background:var(--brand);border-radius:2px"></div><i style="position:absolute;left:70%;top:-5.5px;width:14px;height:14px;border-radius:50%;background:var(--brand);margin-left:-7px;display:block"></i></div></div>`,
  vue: `<DsSlider v-model="threshold" label="신뢰도 임계값" suffix="%" />`,
  html: null,
  guidelines: [['해야 할 것', '정확한 값이 중요하면 숫자 입력을 함께 제공합니다.']],
},
{
  id: 'fileinput', name: 'FileInput', ko: '파일 선택', category: 'input',
  origin: 'wrapped', vuetifyBase: 'VFileInput',
  summary: '파일을 고르거나 끌어다 놓습니다.',
  reason: { ko: '기본 클립 아이콘과 머티리얼 스타일이 우리 기조와 맞지 않습니다.',
            en: 'Default paperclip and material styling clash with our tone.' },
  props: [
    ['modelValue', 'File | File[]', '—', 'v-model.'],
    ['label', 'string', '—', '라벨.'],
    ['accept', 'string', '—', '허용 확장자.'],
    ['multiple', 'boolean', 'false', '여러 개 선택.'],
    ['error', 'string', '—', '에러 메시지.'],
  ],
  slots: [],
  demo: `<div class="field"><label>문서 업로드</label><div class="input" style="color:var(--gray-9)">파일 선택 또는 드래그</div><div class="hint">PDF·DOCX · 최대 10MB</div></div>`,
  vue: `<DsFileInput v-model="file" label="문서 업로드"
  accept=".pdf,.docx" hint="PDF·DOCX · 최대 10MB" :error="sizeError" />`,
  html: null,
  guidelines: [['해야 할 것', '허용 형식과 최대 크기를 hint에 미리 적습니다. 실패 후에 알리지 않습니다.']],
},
{
  id: 'datepicker', name: 'DatePicker', ko: '날짜 선택', category: 'input',
  origin: 'wrapped', vuetifyBase: 'VDatePicker',
  summary: '달력에서 날짜를 고릅니다.',
  reason: { ko: '달력을 직접 만드는 것은 비현실적입니다 — 로케일, 윤년, 키보드 이동, 접근성.',
            en: 'Building a calendar is impractical: locale, leap years, keyboard nav, a11y.' },
  props: [['modelValue', 'Date | Date[]', '—', 'v-model.'], ['label', 'string', '—', '라벨.']],
  slots: [],
  demo: `<div style="border:1px solid var(--gray-4);border-radius:var(--r-lg);padding:14px;width:260px;background:var(--surface)"><div style="font-size:13px;font-weight:600;margin-bottom:10px">2026년 7월</div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;font-size:11.5px;color:var(--gray-9);text-align:center"><span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span></div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;font-size:12px;text-align:center;margin-top:6px"><span></span><span></span><span></span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span></div></div>`,
  vue: `<DsDatePicker v-model="date" label="시작일" />`,
  html: null,
  guidelines: [['해야 할 것', '기간 선택은 시작·종료 두 개를 나란히 두고 "최근 7일" 같은 프리셋을 함께 제공합니다.']],
},
{
  id: 'alert', name: 'Alert', ko: '알림', category: 'feedback',
  origin: 'wrapped', vuetifyBase: 'VAlert',
  summary: '화면에 머무는 상태 알림.',
  reason: { ko: 'Toast와 역할이 섞이면 중요한 정보가 사라져 버립니다. Alert는 사라지지 않는 알림으로 고정합니다.',
            en: 'Mixing with Toast loses important information; Alert is the persistent one.' },
  props: [
    ['variant', "'info' | 'success' | 'warning' | 'error'", "'info'", '심각도.'],
    ['title', 'string', '—', '제목. 한 줄로 끝나면 생략합니다.'],
    ['closable', 'boolean', 'false', '닫기 버튼.'],
  ],
  events: [['close', '—', '닫기 클릭.']],
  slots: [['default', '본문.'], ['actions', '후속 액션 버튼.']],
  demo: `<div style="display:flex;flex-direction:column;gap:8px">
    <div class="ds-alert-demo err"><b>삭제하지 못했습니다</b><span>법무 폴더는 관리자만 삭제할 수 있습니다.</span></div>
    <div class="ds-alert-demo warn"><span>월간 실행 한도의 80%에 도달했습니다.</span></div>
    <div class="ds-alert-demo ok"><span>파일 128건이 동기화되었습니다.</span></div>
  </div>`,
  vue: `<DsAlert variant="error" title="삭제하지 못했습니다">
  법무 폴더는 관리자만 삭제할 수 있습니다.
  <template #actions>
    <DsButton variant="secondary" size="sm">권한 요청</DsButton>
  </template>
</DsAlert>`,
  html: null,
  guidelines: [
    ['해야 할 것', '사라지면 안 되는 정보는 Alert, 지나가도 되는 결과는 Toast입니다.'],
    ['해야 할 것', '에러 Alert에는 사용자가 할 수 있는 다음 행동을 답니다.'],
    ['하지 말 것', '한 화면에 Alert를 3개 이상 쌓지 않습니다.'],
  ],
},
{
  id: 'banner', name: 'Banner', ko: '배너', category: 'feedback',
  origin: 'wrapped', vuetifyBase: 'VBanner',
  summary: '페이지 전체에 해당하는 공지.',
  reason: { ko: 'Alert는 영역 단위, Banner는 페이지 전체 단위입니다. 이 구분이 없으면 둘 다 남발됩니다.',
            en: 'Alert is regional, Banner is page-wide; without the distinction both get overused.' },
  props: [['icon', 'string', '—', '앞에 붙는 아이콘.']],
  slots: [['default', '공지 문구.'], ['actions', '액션 버튼.']],
  demo: `<div class="ds-banner-demo">${ic('notification','sm')} 8월 3일 02:00~04:00 서비스 점검이 예정되어 있습니다.</div>`,
  vue: `<DsBanner icon="◈">
  8월 3일 02:00~04:00 서비스 점검이 예정되어 있습니다.
  <template #actions><DsButton variant="ghost" size="sm">자세히</DsButton></template>
</DsBanner>`,
  html: null,
  guidelines: [['해야 할 것', '화면 최상단에 하나만. 여러 개가 필요하면 우선순위가 잘못된 것입니다.']],
},
{
  id: 'progressbar', name: 'ProgressBar', ko: '진행 막대', category: 'feedback',
  origin: 'wrapped', vuetifyBase: 'VProgressLinear',
  summary: '진행률을 아는 작업의 막대.',
  reason: { ko: '진행률 숫자를 매번 따로 붙이게 되어 라벨에 통합했습니다.',
            en: 'The percentage label is always added ad hoc; folded in.' },
  props: [
    ['value', 'number', '0', '0~100.'],
    ['label', 'string', '—', '라벨. 우측에 %가 표시됩니다.'],
    ['indeterminate', 'boolean', 'false', '진행률을 모를 때.'],
  ],
  slots: [],
  demo: `<div style="max-width:300px"><div style="display:flex;justify-content:space-between;font-size:12.5px;color:var(--gray-11);margin-bottom:6px"><span>문서 분석 중</span><span style="font-family:var(--mono);color:var(--gray-10)">62%</span></div><div style="height:2px;background:var(--gray-4)"><div style="width:62%;height:100%;background:var(--brand)"></div></div></div>`,
  vue: `<DsProgressBar :value="progress" label="문서 분석 중" />`,
  html: null,
  guidelines: [
    ['하지 말 것', '진행률을 모르면 indeterminate 대신 ThinkingIndicator를 씁니다 (원칙 1).'],
    ['해야 할 것', '오래 걸리는 작업은 남은 시간이나 처리 건수를 함께 보여줍니다.'],
  ],
},
{
  id: 'spinner', name: 'Spinner', ko: '스피너', category: 'feedback',
  origin: 'wrapped', vuetifyBase: 'VProgressCircular',
  summary: '아주 짧은 대기 표시.',
  reason: { ko: '크기·굵기가 제각각이 되기 쉬워 고정합니다. 2초 이내 대기 전용입니다.',
            en: 'Size and stroke drift; fixed. For sub-2-second waits only.' },
  props: [['size', 'number', '16', '지름(px).']],
  slots: [],
  demo: `<div class="row"><span class="spinner"></span><button class="btn btn-secondary"><span class="spinner"></span> 저장 중…</button></div>`,
  vue: `<DsSpinner />
<DsButton variant="secondary"><DsSpinner :size="13" /> 저장 중…</DsButton>`,
  html: null,
  guidelines: [
    ['하지 말 것', '에이전트 작업에 쓰지 않습니다. ThinkingIndicator·ToolCallStep이 그 자리입니다 (원칙 1).'],
    ['해야 할 것', '2초를 넘길 것 같으면 Skeleton이나 진행 표시로 바꿉니다.'],
  ],
},
{
  id: 'snackbar', name: 'Snackbar', ko: '스낵바', category: 'feedback',
  origin: 'wrapped', vuetifyBase: 'VSnackbar',
  summary: '떴다가 사라지는 알림.',
  reason: { ko: 'Toast는 생김새만 담당합니다. 실제로 떠서 시간이 지나면 사라지는 동작이 필요합니다.',
            en: 'DsToast is visual only; this adds real appearance and timeout behavior.' },
  props: [
    ['modelValue', 'boolean', 'false', 'v-model로 열고 닫습니다.'],
    ['variant', "'success' | 'danger'", "'success'", '결과 종류.'],
    ['action', 'string', '—', '후속 액션 라벨. 하나까지.'],
    ['timeout', 'number', '4000', '자동 닫힘(ms).'],
  ],
  events: [['action', '—', '액션 클릭.']],
  slots: [['default', '문구.']],
  demo: `<div class="toast success"><span class="t-dot"></span><span class="t-body">에이전트가 생성되었습니다.</span><button class="t-action">View</button></div>`,
  vue: `<DsSnackbar v-model="open" variant="success" action="View" @action="go">
  에이전트가 생성되었습니다.
</DsSnackbar>`,
  html: null,
  guidelines: [
    ['해야 할 것', '삭제처럼 되돌릴 수 있는 작업에는 Undo 액션을 답니다.'],
    ['하지 말 것', '동시에 여러 개를 띄우지 않습니다. 큐로 하나씩 처리합니다.'],
  ],
},
{
  id: 'list', name: 'List', ko: '목록', category: 'data',
  origin: 'wrapped', vuetifyBase: 'VList',
  summary: '열이 고정되지 않은 항목 목록.',
  reason: { ko: '열이 고정되지 않은 목록에 테이블은 과합니다. 그 중간 단계가 필요합니다.',
            en: 'A table is overkill when columns are not fixed; this is the middle ground.' },
  props: [
    ['items', 'ListItem[]', '필수', '{ value?, title, subtitle?, icon?, meta? }'],
    ['selectable', 'boolean', 'false', '선택 가능 여부.'],
  ],
  slots: [],
  demo: `<div class="ds-list-demo"><div><span>${ic('run','sm')}</span><b>자동 분류</b><i>수신 문서를 규칙에 따라 분류</i><em>켜짐</em></div><div><span>${ic('tableView','sm')}</span><b>주간 리포트</b><i>매주 월요일 09:00</i><em>켜짐</em></div></div>`,
  vue: `<DsList :items="[
  { value: 'a', title: '자동 분류', subtitle: '규칙에 따라 분류', icon: 'run', meta: '켜짐' },
]" selectable>
  <template #icon="{ item }"><DsIcon :name="item.icon" size="sm" /></template>
</DsList>`,
  html: null,
  guidelines: [['해야 할 것', '정렬·필터가 필요해지면 DataTable로 바꿉니다.']],
},
{
  id: 'treeview', name: 'Treeview', ko: '트리', category: 'data',
  origin: 'wrapped', vuetifyBase: 'VTreeview',
  summary: '계층 구조를 펼쳐서 봅니다.',
  reason: { ko: '펼침 상태·키보드 이동·중첩 선택을 직접 만들면 깊이가 늘 때 무너집니다.',
            en: 'Expansion state, keyboard nav and nested selection break at depth if hand-rolled.' },
  props: [
    ['items', 'any[]', '필수', 'children으로 중첩합니다.'],
    ['itemTitle / itemValue', 'string', "'title' / 'id'", '필드 이름.'],
  ],
  slots: [],
  demo: `<div class="ds-tree-demo"><div>${ic('expand','sm')} 법무</div><div class="ind on">2026</div><div class="ind">2025</div><div>${ic('collapse','sm')} 재무</div></div>`,
  vue: `<DsTreeview v-model="activated" :items="[
  { id: 1, title: '법무', children: [{ id: 2, title: '2026' }] },
]" />`,
  html: null,
  guidelines: [['해야 할 것', '깊이가 3단계를 넘으면 검색을 함께 제공합니다.']],
},
{
  id: 'timeline', name: 'Timeline', ko: '타임라인', category: 'data',
  origin: 'wrapped', vuetifyBase: 'VTimeline',
  summary: '시간순 이력.',
  reason: { ko: '시간순 이력을 평범한 목록으로 만들면 "무엇이 먼저인지"가 읽히지 않습니다.',
            en: 'Chronology is lost when history is rendered as a plain list.' },
  props: [['items', 'TimelineItem[]', '필수', '{ id, time, title, body?, variant? }']],
  slots: [],
  demo: `<div class="ds-tl-demo"><div><i class="d err"></i><span class="t">09:14</span><b>삭제 시도 차단</b><em>권한 없음 — 법무 폴더</em></div><div><i class="d ok"></i><span class="t">09:12</span><b>분류 완료</b><em>문서 42건 · 12.4초</em></div></div>`,
  vue: `<DsTimeline :items="[
  { id: 1, time: '09:14', title: '삭제 시도 차단',
    body: '권한 없음 — 법무 폴더', variant: 'danger' },
]" />`,
  html: null,
  guidelines: [['해야 할 것', '항목이 20개를 넘으면 날짜로 묶고 더보기를 제공합니다.']],
},
{
  id: 'accordion', name: 'Accordion', ko: '아코디언', category: 'data',
  origin: 'wrapped', vuetifyBase: 'VExpansionPanels',
  summary: '접었다 펴는 영역.',
  reason: { ko: '원칙 4 — 근거를 접을 수는 있어도 없애지 않습니다. 그 "접기"의 구현체입니다.',
            en: 'Principle 4 — evidence may be collapsed, never removed. This is that collapse.' },
  props: [['items', '{ title, text? }[]', '필수', '패널 목록.']],
  slots: [['item-N', 'N번째 패널의 내용(텍스트 대신 컴포넌트를 넣을 때).']],
  demo: `<div class="ds-acc-demo"><div class="h">원본 페이로드 보기 <span>${ic('expand','sm')}</span></div><div class="b">{ "event": "document.delete", "allowed": false }</div><div class="h">고급 설정 <span>${ic('collapse','sm')}</span></div></div>`,
  vue: `<DsAccordion v-model="open" :items="[
  { title: '원본 페이로드 보기' },
]">
  <template #item-0><pre>{{ payload }}</pre></template>
</DsAccordion>`,
  html: null,
  guidelines: [
    ['해야 할 것', '기본은 접힌 상태로 둡니다. 중요한 정보라면 접지 않습니다.'],
    ['하지 말 것', '에러 메시지를 접어두지 않습니다.'],
  ],
},

]

export const TEMPLATES = [
  { id: 'audit',  name: 'Audit Log',      ko: '감사 로그',     file: 'templates/audit.html',
    desc: '관리자 셸 · 테이블 · 필터 · 상세 패널 · 상태 5종',
    covers: ['NavList', 'DataTable', 'Badge', 'Avatar', 'Chip', 'Pagination', 'ArtifactPanel', 'Skeleton', 'EmptyState'] },
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

/* ============================================
   어디에 적용하나 — 컴포넌트별 적용 위치
   문서 사이트의 각 컴포넌트 페이지에 표시됩니다.
   ============================================ */
export const WHERE = {
  button: '모든 화면의 액션. primary는 화면당 하나만.',
  iconbutton: '테이블 행 끝 ⋯, 툴바, 입력창 부가 버튼.',
  buttongroup: '그리드/리스트 보기 전환, 기간(일·주·월), 밀도 전환.',
  menu: '테이블 행 액션, 프로필 메뉴, 더보기.',
  tabs: '상세 화면 섹션 전환(개요·활동·설정), 로그 수준 필터.',
  breadcrumbs: '드라이브 폴더 경로, 설정 하위 페이지.',
  pagination: '테이블 하단, 검색 결과 하단.',
  navlist: '앱 좌측 사이드바, 설정 좌측 메뉴.',
  stepper: '에이전트 생성 마법사, 온보딩, 다단계 폼.',
  input: '한 줄 입력 전부. 에러 상태는 필수.',
  textarea: '설명·메모 입력, 프롬프트 편집. (대화 입력은 AgentInput)',
  select: '옵션 10개 이하의 선택. 그 이상은 Autocomplete.',
  autocomplete: '옵션이 10개를 넘는 선택 — 사용자 지정, 태그, 폴더 이동.',
  checkbox: '테이블 다중 선택, 약관 동의, 저장 버튼이 있는 설정.',
  switch: '즉시 적용되는 on/off — 에이전트 활성화, 자동 실행.',
  radiogroup: '배타적 설정 — 보존 기간, 공개 범위.',
  slider: '임계값 조정 — 신뢰도 컷오프, 결과 개수.',
  fileinput: '문서 업로드, 로고 교체.',
  datepicker: '감사 로그 기간 필터, 스케줄 설정.',
  chip: '활성 필터 표시, 첨부 파일 목록, 선택된 태그.',
  alert: '폼 상단 검증 요약, 권한 부족 안내, 한도 경고. 사라지면 안 되는 정보.',
  banner: '화면 최상단 전역 공지 — 점검 예정, 요금제 만료.',
  progressbar: '업로드·일괄 처리 — 진행률을 아는 경우만. 모르면 ThinkingIndicator.',
  spinner: '버튼 내부, 인라인 짧은 대기(2초 이내). 에이전트 작업에는 쓰지 않습니다.',
  snackbar: '저장·삭제 결과 알림. 후속 액션은 하나까지.',
  badge: '테이블 상태 열, 목록 항목의 상태 표시. 읽기 전용.',
  skeleton: '목록·테이블의 로딩 상태. 에이전트 응답 대기에는 쓰지 않습니다.',
  toast: 'Snackbar의 시각 부분. 큐 관리가 필요하면 Snackbar를 쓰세요.',
  empty: '모든 목록·테이블·검색의 빈 상태. 다음 행동을 반드시 제안.',
  dialog: '되돌릴 수 없는 확인, 흐름을 멈춰야 하는 입력.',
  tooltip: '아이콘 버튼 설명, 잘린 텍스트 전체 보기.',
  datatable: '감사 로그, 에이전트 목록, 실행 이력 — 열이 고정된 데이터.',
  list: '설정 항목, 선택 가능한 항목 나열. (파일은 FileRow, 고정 열은 DataTable)',
  treeview: '드라이브 폴더 트리, 문서 목차, 조직도.',
  timeline: '문서 변경 이력, 에이전트 실행 이력, 승인 흐름.',
  accordion: '툴콜 원본 페이로드, 고급 설정, FAQ. (원칙 4의 "접기")',
  filegrid: '드라이브 그리드 보기 — 훑어보기용.',
  filerow: '드라이브 리스트 보기 — 세부 비교용.',
  searchresult: '검색 화면, 문서 찾기 결과.',
  icon: '아이콘이 필요한 모든 곳. 의미 이름으로 부르고, 없으면 vue/icons.ts에 등록합니다.',
  avatar: '사용자·에이전트 표시. 이름과 함께 씁니다.',
  card: '대시보드 통계, 설정 그룹.',
  divider: '설정 그룹 사이, 대화의 날짜 구분.',
  chatmessage: '챗 화면. 툴콜은 본문 위에 — 근거가 답보다 먼저.',
  streamingtext: '스트리밍 중인 응답 본문.',
  thinking: '에이전트 대기 전부. 10초 이상이면 문구를 단계에 맞게 갱신.',
  toolcall: '에이전트가 도구를 쓸 때마다. 실패한 단계도 그대로 보여줍니다.',
  agentinput: '챗 화면 하단. Enter 전송, Shift+Enter 줄바꿈.',
  citation: '에이전트 응답에서 근거가 있는 주장 뒤.',
  artifact: '20줄이 넘는 에이전트 산출물 — 코드·문서·표.',
}

/* ============================================
   접근성 — 컴포넌트별 (Carbon 방식)
   keys   : 키보드 상호작용 표
   free   : 이 컴포넌트가 알아서 해주는 것
   yours  : 쓰는 사람이 반드시 해야 하는 것
   ============================================ */
export const A11Y = {
  button: {
    keys: [['Tab', '버튼으로 이동'], ['Enter · Space', '실행']],
    free: ['focus-visible 링 (마우스 클릭 시에는 뜨지 않음)', 'disabled 시 포커스에서 제외', '네이티브 <button> — 스크린리더가 "버튼"으로 읽음'],
    yours: ['아이콘만 있으면 aria-label', 'disabled 이유를 Tooltip으로 알리기', '라벨을 동사로 — "확인"이 아니라 "삭제"'],
  },
  iconbutton: {
    keys: [['Tab', '버튼으로 이동'], ['Enter · Space', '실행']],
    free: ['aria-label prop이 필수라 빠뜨릴 수 없음', 'focus-visible 링'],
    yours: ['label에 동작을 씀 — "아이콘 이름"이 아니라 "보관함으로 이동"', '뜻이 모호하면 Tooltip 병기'],
  },
  input: {
    keys: [['Tab', '필드로 이동'], ['Esc', '입력 취소 (구현 시)']],
    free: ['label과 input 연결', 'error 시 aria-invalid', '포커스 링'],
    yours: ['label을 반드시 채우기 — placeholder로 대신하지 않음', '에러 메시지를 구체적으로'],
  },
  select: {
    keys: [['Tab', '필드로 이동'], ['Enter · Space · ↓', '목록 열기'], ['↑ ↓', '항목 이동'], ['Enter', '선택'], ['Esc', '닫기'], ['글자 입력', '해당 글자로 시작하는 항목으로 점프']],
    free: ['Vuetify가 role="listbox"·aria-expanded·활성 항목 추적을 처리', '포커스 복귀'],
    yours: ['label 채우기', '옵션 10개 초과 시 Autocomplete로 교체'],
  },
  autocomplete: {
    keys: [['Tab', '필드로 이동'], ['글자 입력', '검색'], ['↑ ↓', '결과 이동'], ['Enter', '선택'], ['Backspace', '마지막 칩 제거'], ['Esc', '닫기']],
    free: ['role="combobox"·aria-autocomplete', '한글 조합 입력(IME) 처리', '결과 개수 안내'],
    yours: ['결과 없음 문구 제공', '로딩 중 상태 표시'],
  },
  checkbox: {
    keys: [['Tab', '이동'], ['Space', '켜고 끄기']],
    free: ['indeterminate 시 aria-checked="mixed"', 'label 클릭으로 토글'],
    yours: ['label 필수', '테이블 전체 선택은 부분 선택 시 indeterminate로'],
  },
  switch: {
    keys: [['Tab', '이동'], ['Space · Enter', '켜고 끄기']],
    free: ['role="switch"·aria-checked'],
    yours: ['즉시 반영되므로 되돌리기(Undo) 제공 검토', '끄면 무슨 일이 생기는지 hint에'],
  },
  radiogroup: {
    keys: [['Tab', '그룹으로 진입 (선택된 항목)'], ['↑ ↓ ← →', '항목 이동 — 이동하면 바로 선택됨'], ['Space', '선택']],
    free: ['role="radiogroup"·그룹 내 단일 Tab 정지'],
    yours: ['그룹 label 채우기', '기본 선택을 지정 — 빈 상태로 두지 않기'],
  },
  slider: {
    keys: [['Tab', '이동'], ['← →', '한 단계'], ['Home · End', '최소 · 최대'], ['PageUp · PageDown', '큰 단위']],
    free: ['role="slider"·aria-valuenow/min/max'],
    yours: ['현재 값을 눈으로도 보이게 (label에 포함됨)', '정확한 값이 중요하면 숫자 입력 병기'],
  },
  dialog: {
    keys: [['Tab', '내부에서만 순환 (포커스 트랩)'], ['Esc', '닫기 — persistent면 무시'], ['Enter', '기본 액션']],
    free: ['포커스 트랩·배경 스크롤 락', '열 때 첫 요소로 포커스, 닫을 때 원래 자리로 복귀', 'role="dialog"·aria-modal'],
    yours: ['title 채우기 — 스크린리더가 읽는 이름입니다', '되돌릴 수 없는 작업은 결과를 구체적으로'],
  },
  menu: {
    keys: [['Enter · Space · ↓', '열기'], ['↑ ↓', '항목 이동'], ['Enter', '실행'], ['Esc', '닫고 트리거로 복귀'], ['Tab', '닫기']],
    free: ['포지셔닝·포커스 복귀·바깥 클릭 닫기'],
    yours: ['항목에 role="menuitem" 부여', '파괴적 항목은 마지막에 두고 구분선으로 분리'],
  },
  tooltip: {
    keys: [['Tab', '트리거에 포커스 시 표시'], ['Esc', '숨기기']],
    free: ['지연 표시·포지셔닝·터치 대응'],
    yours: ['툴팁에만 있는 정보를 만들지 않기 — 터치 기기에서 안 보임', 'aria-label과 중복되지 않게'],
  },
  datatable: {
    keys: [['Tab', '테이블 진입'], ['↑ ↓', '행 이동'], ['Enter · Space', '정렬 (헤더에서)'], ['Space', '행 선택']],
    free: ['정렬 상태 aria-sort', '행 선택 상태 전달'],
    yours: ['빈 상태·로딩·에러 상태 제공', '색만으로 상태 구분하지 않기 — 배지에 텍스트 포함'],
  },
  tabs: {
    keys: [['Tab', '탭 목록으로 진입'], ['← →', '탭 이동'], ['Home · End', '첫 · 마지막'], ['Enter · Space', '선택']],
    free: ['role="tablist"·aria-selected·패널 연결'],
    yours: ['탭 이름을 짧게 — 줄바꿈되면 읽기 어려움'],
  },
  accordion: {
    keys: [['Tab', '헤더로 이동'], ['Enter · Space', '펴고 접기']],
    free: ['aria-expanded·패널 연결'],
    yours: ['에러 메시지를 접어두지 않기', '기본은 접힌 상태로'],
  },
  chatmessage: {
    keys: [['Tab', '메시지 내 링크·인용 칩으로 이동']],
    free: ['의미 있는 순서로 DOM 구성 (툴콜 → 본문)'],
    yours: ['스트리밍 영역에 aria-live="polite" — 응답 도착을 읽어줌', '아바타 이니셜만으로 화자를 구분하지 않기 (이름 병기)'],
  },
  toolcall: {
    keys: [],
    free: ['상태를 아이콘 + 텍스트로 함께 표현'],
    yours: ['진행 → 완료 전환 시 aria-live로 알리기', '실패한 단계를 숨기지 않기'],
  },
  agentinput: {
    keys: [['Enter', '전송'], ['Shift + Enter', '줄바꿈'], ['Tab', '도구 버튼으로 이동']],
    free: ['auto-grow — 내용에 따라 높이 조절'],
    yours: ['도구 버튼에 aria-label', '전송 중에는 버튼을 정지(Stop)로 바꾸기'],
  },
  alert: {
    keys: [['Tab', '액션 버튼으로 이동']],
    free: ['type에 따른 role="alert" 부여'],
    yours: ['색만으로 심각도 구분하지 않기 — 아이콘·제목 병기', '에러에는 다음 행동을 함께'],
  },
  snackbar: {
    keys: [['Tab', '액션으로 이동']],
    free: ['role="status" — 스크린리더가 읽음', '자동 닫힘'],
    yours: ['중요한 정보는 Snackbar에 담지 않기 — 사라집니다', '액션은 하나까지'],
  },
  empty: {
    keys: [['Tab', 'CTA로 이동']],
    free: [],
    yours: ['제목을 h2/h3 계층에 맞추기', '다음 행동을 반드시 제공'],
  },
}


/* ── 나머지 컴포넌트 ── */
Object.assign(A11Y, {
  avatar: {
    keys: [],
    free: ['장식용이므로 aria-hidden 처리 (label 없을 때)'],
    yours: ['아바타만으로 사람을 식별하게 하지 않기 — 이름을 함께 표시', '이미지에는 의미 있는 alt 또는 빈 alt'],
  },
  card: {
    keys: [['Tab', '클릭 가능한 카드일 때만 포커스']],
    free: [],
    yours: ['클릭 가능하면 <a> 또는 <button>으로 감싸기 — div에 onclick만 달지 않기',
            '제목을 h2/h3 계층에 맞추기', '카드 전체가 링크면 안쪽에 또 링크를 넣지 않기'],
  },
  divider: {
    keys: [],
    free: ['<hr>은 스크린리더가 구분선으로 인식'],
    yours: ['장식용 구분선이 많으면 aria-hidden 처리', '라벨형은 제목이 아니므로 h 태그를 쓰지 않기'],
  },
  citation: {
    keys: [['Tab', '칩으로 이동'], ['Enter', '원문으로 이동']],
    free: ['role="button" · tabindex 부여'],
    yours: ['번호만으로는 뜻이 없으므로 aria-label에 "출처 1: 계약서_최종.pdf"처럼 대상 명시',
            '이동 후 포커스를 원문 위치로 옮기기'],
  },
  chip: {
    keys: [['Tab', '칩 · 제거 버튼으로 이동'], ['Enter · Space', '제거']],
    free: ['제거 버튼이 네이티브 <button>'],
    yours: ['제거 버튼에 aria-label="Remove" — 무엇을 제거하는지 포함하면 더 좋음',
            '제거 후 포커스를 다음 칩 또는 컨테이너로 옮기기'],
  },
  badge: {
    keys: [],
    free: ['점 + 텍스트를 함께 렌더 — 색만으로 구분되지 않음'],
    yours: ['텍스트를 반드시 넣기 (dot만 두지 않기)', '상태가 바뀌면 aria-live로 알릴지 검토'],
  },
  skeleton: {
    keys: [],
    free: [],
    yours: ['로딩 영역에 aria-busy="true"', '스켈레톤 자체는 aria-hidden — 스크린리더가 읽을 내용이 없음',
            'prefers-reduced-motion에서 셔머 애니메이션 정지'],
  },
  toast: {
    keys: [['Tab', '액션으로 이동']],
    free: [],
    yours: ['role="status" 부여 — DsSnackbar를 쓰면 자동입니다',
            '사라지는 시간을 충분히 (4초 이상). 액션이 있으면 더 길게'],
  },
  progressbar: {
    keys: [],
    free: ['Vuetify가 role="progressbar" · aria-valuenow 처리'],
    yours: ['label을 채워 무엇의 진행률인지 알리기', '완료 시 aria-live로 알리기'],
  },
  spinner: {
    keys: [],
    free: ['Vuetify가 role="progressbar" · indeterminate 처리'],
    yours: ['주변에 무엇을 기다리는지 텍스트로 함께 표시', '2초를 넘길 것 같으면 Skeleton이나 진행 표시로 교체'],
  },
  banner: {
    keys: [['Tab', '액션으로 이동']],
    free: [],
    yours: ['페이지 최상단에 두고 랜드마크(role="region")로 표시', '닫을 수 있으면 닫기 버튼에 aria-label'],
  },
  buttongroup: {
    keys: [['Tab', '그룹으로 진입'], ['← →', '항목 이동'], ['Enter · Space', '선택']],
    free: ['Vuetify가 그룹 내 단일 Tab 정지 · aria-pressed 처리'],
    yours: ['각 버튼의 라벨을 명확히 — 아이콘만이면 aria-label', '그룹 자체에 aria-label로 무엇을 고르는지 설명'],
  },
  breadcrumbs: {
    keys: [['Tab', '각 항목으로 이동']],
    free: ['<nav> 랜드마크 · 구분자는 aria-hidden'],
    yours: ['nav에 aria-label="경로"', '마지막 항목은 링크가 아니라 현재 위치 — aria-current="page"'],
  },
  pagination: {
    keys: [['Tab', '페이지 버튼으로 이동'], ['Enter · Space', '이동']],
    free: ['Vuetify가 aria-current · 이전/다음 라벨 처리'],
    yours: ['페이지 이동 후 결과 영역으로 포커스를 옮기거나 aria-live로 알리기',
            '전체 개수를 텍스트로도 제공'],
  },
  navlist: {
    keys: [['Tab', '목록 진입'], ['↑ ↓', '항목 이동'], ['Enter', '이동']],
    free: ['Vuetify가 목록 시맨틱 · 활성 상태 처리'],
    yours: ['<nav>로 감싸고 aria-label 부여', '현재 페이지에 aria-current="page"',
            '배지 숫자에 의미를 붙이기 — "3"이 아니라 "미확인 3건"'],
  },
  stepper: {
    keys: [['Tab', '단계로 이동']],
    free: ['Vuetify가 단계 상태 전달'],
    yours: ['현재 단계에 aria-current="step"', '"3단계 중 2단계"를 텍스트로도 제공',
            '단계 전환 시 새 단계 제목으로 포커스 이동'],
  },
  list: {
    keys: [['Tab', '목록 진입'], ['↑ ↓', '항목 이동 (선택 가능할 때)'], ['Enter · Space', '선택']],
    free: ['Vuetify가 목록 시맨틱 · 선택 상태 처리'],
    yours: ['목록에 aria-label로 무엇의 목록인지', 'meta 텍스트가 상태라면 색만으로 구분하지 않기'],
  },
  treeview: {
    keys: [['Tab', '트리 진입'], ['↑ ↓', '항목 이동'], ['← →', '접기 · 펴기'], ['Enter', '선택'], ['Home · End', '처음 · 끝']],
    free: ['Vuetify가 role="tree" · aria-expanded · 레벨 정보 처리'],
    yours: ['트리에 aria-label', '깊이가 3단계를 넘으면 검색을 함께 제공'],
  },
  timeline: {
    keys: [['Tab', '항목 내 링크로 이동']],
    free: ['시간순 DOM 구성'],
    yours: ['<ol>로 마크업해 순서를 전달', '시각을 <time datetime="">로 표기',
            '점 색만으로 성공·실패를 구분하지 않기'],
  },
  textarea: {
    keys: [['Tab', '필드로 이동'], ['Enter', '줄바꿈']],
    free: ['label 연결 · auto-grow · error 시 aria-invalid'],
    yours: ['label 채우기', '글자 수 제한이 있으면 남은 수를 aria-live로 알리기'],
  },
  fileinput: {
    keys: [['Tab', '필드로 이동'], ['Enter · Space', '파일 선택 창 열기']],
    free: ['네이티브 <input type="file"> 사용'],
    yours: ['허용 형식·최대 크기를 hint에 미리 표시', '드래그 앤 드롭만 제공하지 않기 — 버튼도 함께',
            '업로드 진행률을 aria-live로'],
  },
  datepicker: {
    keys: [['Tab', '달력 진입'], ['← → ↑ ↓', '날짜 이동'], ['PageUp · PageDown', '월 이동'], ['Enter', '선택'], ['Esc', '닫기']],
    free: ['Vuetify가 role="grid" · 로케일 · 요일 헤더 처리'],
    yours: ['locale을 ko로 설정 (createVuetify의 locale)', '선택한 날짜를 텍스트로도 표시',
            '기간 선택이면 시작·종료를 각각 라벨링'],
  },
  searchresult: {
    keys: [['Tab', '결과 제목으로 이동']],
    free: [],
    yours: ['결과 목록을 <ol>로 마크업', '결과 개수를 aria-live로 알리기',
            '<mark> 하이라이트는 스크린리더가 읽지 않으므로 문맥이 스스로 이해되게'],
  },
  filegrid: {
    keys: [['Tab', '그리드 진입'], ['↑ ↓ ← →', '항목 이동'], ['Space', '선택'], ['Enter', '열기']],
    free: [],
    yours: ['선택 상태를 aria-selected로', '선택 개수를 aria-live로 알리기',
            '아이콘만으로 파일 종류를 구분하지 않기 — 확장자가 이름에 포함됨'],
  },
  filerow: {
    keys: [['Tab', '행으로 이동'], ['Enter', '열기'], ['Space', '선택']],
    free: [],
    yours: ['행 전체가 클릭 가능하면 <a> 또는 <button>으로', '선택 상태를 aria-selected로'],
  },
  artifact: {
    keys: [['Tab', '복사 · 다운로드 버튼으로 이동']],
    free: [],
    yours: ['패널에 aria-label로 무엇의 산출물인지', '복사 완료를 aria-live로 알리기',
            '코드면 <pre><code>로 마크업'],
  },
  streamingtext: {
    keys: [],
    free: ['완료 시 커서 제거'],
    yours: ['부모 영역에 aria-live="polite" — 도착하는 대로 읽어줌',
            '커서는 aria-hidden', 'aria-busy로 생성 중임을 알리기'],
  },
  thinking: {
    keys: [],
    free: ['텍스트로 현재 작업을 표현 — 스크린리더가 읽을 내용이 있음'],
    yours: ['aria-live="polite"로 단계 변경을 알리기', '점 애니메이션은 aria-hidden',
            'prefers-reduced-motion에서 애니메이션 정지'],
  },
  icon: {
    keys: [],
    free: ['label이 없으면 aria-hidden="true" 자동 부여', 'label이 있으면 role="img"'],
    yours: ['뜻을 전달하는 아이콘에는 label 필수', '장식이면 label을 비워두기 (자동 숨김)'],
  },
})

/* ============================================
   비슷한 컴포넌트 구분 — 오용의 가장 큰 원인
   ============================================ */
export const VERSUS = {
  checkbox: [['Switch', '즉시 반영되면 Switch, 저장 버튼을 눌러야 반영되면 Checkbox']],
  switch: [['Checkbox', '저장 버튼이 필요하면 Checkbox, 즉시 반영이면 Switch']],
  alert: [['Snackbar', '사라지면 안 되는 정보는 Alert, 지나가도 되는 결과는 Snackbar'],
          ['Banner', 'Alert는 영역 단위, Banner는 페이지 전체 단위']],
  banner: [['Alert', '페이지 전체에 해당하면 Banner, 특정 영역이면 Alert']],
  snackbar: [['Toast', 'Toast는 생김새만, Snackbar는 표시·타이머까지 담당'],
             ['Alert', '지나가도 되면 Snackbar, 남아야 하면 Alert']],
  toast: [['Snackbar', '실제로 떠서 사라지는 동작이 필요하면 Snackbar']],
  spinner: [['ThinkingIndicator', '2초 이내면 Spinner, 에이전트 작업이면 ThinkingIndicator (원칙 1)'],
            ['Skeleton', '자리를 미리 보여줘야 하면 Skeleton']],
  skeleton: [['ThinkingIndicator', '에이전트 응답 대기에는 Skeleton을 쓰지 않습니다']],
  progressbar: [['ThinkingIndicator', '진행률을 모르면 ProgressBar 대신 ThinkingIndicator']],
  select: [['Autocomplete', '옵션 10개를 넘으면 Autocomplete']],
  autocomplete: [['Select', '옵션 10개 이하면 Select로 충분']],
  badge: [['Chip', 'Badge는 읽기 전용, Chip은 제거 가능']],
  chip: [['Badge', '조작할 수 없으면 Badge']],
  datatable: [['List', '열이 고정되고 정렬이 필요하면 DataTable, 아니면 List'],
              ['FileRow', '파일이면 FileRow']],
  list: [['DataTable', '정렬·필터가 필요해지면 DataTable로 바꿉니다']],
  dialog: [['Snackbar', '단순 알림이면 Dialog가 아니라 Snackbar'],
           ['Menu', '선택지 나열이면 Menu']],
  menu: [['Dialog', '폼이 들어가면 Menu가 아니라 Dialog']],
  tabs: [['ButtonGroup', '페이지 섹션 전환이면 Tabs, 같은 데이터의 보기 전환이면 ButtonGroup']],
  buttongroup: [['Tabs', '내용이 통째로 바뀌면 Tabs']],
  textarea: [['AgentInput', '에이전트 대화 입력이면 AgentInput']],
  agentinput: [['Textarea', '일반 여러 줄 입력이면 Textarea']],
  filegrid: [['FileRow', '훑어보기면 그리드, 세부 비교면 리스트']],
  filerow: [['FileGrid', '썸네일이 중요하면 그리드']],
}
