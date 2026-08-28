<script setup lang="ts">
/* 컴포넌트별 인터랙티브 데모 — 문서 사이트가 iframe으로 임베드합니다.
   #play/<id> 로 접근. 높이는 postMessage로 부모에게 알립니다. */
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useTheme } from 'vuetify'
import {
  DsButton, DsButtonGroup, DsCheckbox, DsRadioGroup, DsInput, DsBadge, DsChip, DsAvatar, DsCard, DsDivider, DsSkeleton,
  DsToast, DsEmptyState, DsChatMessage, DsStreamingText, DsThinkingIndicator,
  DsDotField, DsLoadingScreen, DsToolCallStep, DsAgentInput, DsCitationChip, DsArtifactPanel, DsSearchResult,
  DsFileGrid, DsFileRow, DsLink, DsKbd, DsCode, DsTimestamp,
  DsMetaList, DsSearchField, DsSystemMessage, DsToolbar, DsTableOfContents, DsVisuallyHidden,
  DsTreeview, DsTimeline,
} from '~/design'
import {
  DsIconButton, DsMenu, DsTabs, DsBreadcrumbs, DsPagination,
  DsNavList, DsStepper, DsSelect, DsAutocomplete, DsTextarea,
  DsSwitch, DsSlider, DsFileInput, DsCalendar, DsDatePicker, DsAlert,
  DsBanner, DsProgressBar, DsSpinner, DsSnackbar, DsDialog, DsTooltip,
  DsDataTable, DsList, DsAccordion,
  DsNumberInput, DsCombobox, DsPopover, DsHoverCard, DsCommandPalette,
} from '~/design/vuetify'
import { DsIcon } from '~/design/icon'

/* #play/<id> 또는 #play/<id>/<group> — group은 데모를 쪼갠 컴포넌트만 사용 */
function parseHash() {
  const [cid, sub] = location.hash.replace(/^#play\//, '').split('/')
  return { id: cid || 'button', group: sub || '' }
}
const id = ref(parseHash().id)
const group = ref(parseHash().group)
window.addEventListener('hashchange', () => { id.value = parseHash().id; group.value = parseHash().group })

/* 부모(문서 사이트)의 테마를 따라갑니다 — 같은 오리진이라 localStorage 공유 */
const theme = useTheme()
function applyTheme() {
  const dark = localStorage.getItem('theme') === 'dark'
  theme.change(dark ? 'dsDark' : 'dsLight')
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
}
applyTheme()
window.addEventListener('storage', applyTheme)
window.addEventListener('message', (e) => { if (e.data?.t === 'ds-theme') applyTheme() })

/* 높이 보고 — 데모 루트 + 열린 오버레이(메뉴·팝오버·달력 등)까지 포함.
   Vuetify 오버레이는 루트 밖 .v-overlay-container에 렌더링돼 scrollHeight에 안 잡힙니다.
   그대로 두면 iframe이 짧아서 메뉴가 잘려 보입니다. */
const root = ref<HTMLElement>()
/* 열린 오버레이(메뉴·셀렉트 목록·달력 …)만큼 iframe을 늘립니다.

   ── 위로 뒤집혀 열리던 문제 ──
   iframe은 내용 높이에 맞춰져 있어 필드 아래에 남는 공간이 거의 없습니다.
   그러면 Vuetify가 "아래가 좁다"고 판단해 메뉴를 위로 뒤집어 엽니다.
   그런데 iframe은 아래로만 늘릴 수 있으니, 위로 열린 메뉴는 위쪽이
   그대로 잘리고 그림자도 보이지 않았습니다.

   해결은 뒤집힌 뒤에 합니다. 위로 열렸다면 "아래로 열렸을 때 필요했을"
   높이만큼 아래에 자리를 만들어 줍니다. Vuetify는 창 크기가 바뀌면 위치를
   다시 계산하므로(locationStrategies의 resize 처리), 자리가 생긴 것을 보고
   스스로 아래로 되돌립니다.

   덕분에 아무것도 열지 않은 동안에는 데모가 내용만큼만 차지합니다 —
   미리 300px씩 비워 두면 셀렉트 문서마다 회색 여백이 남습니다. */
const SHADOW_ROOM = 44   // 그림자가 패널 아래로 40px까지 번집니다 (0 12px 28px)
function measureH() {
  let h = (root.value?.scrollHeight ?? 0) + 2
  let tallest = 0
  document.querySelectorAll<HTMLElement>('.v-overlay__content').forEach((el) => {
    const r = el.getBoundingClientRect()
    if (r.height <= 0) return
    tallest = Math.max(tallest, r.height)
    h = Math.max(h, Math.ceil(r.bottom) + SHADOW_ROOM)
  })
  // 열려 있는 활성자 아래로 패널이 들어갈 자리를 확보 — 위로 뒤집힌 경우의 복구
  if (tallest > 0) {
    document.querySelectorAll<HTMLElement>('[aria-expanded="true"]').forEach((el) => {
      const a = el.getBoundingClientRect()
      if (a.height > 0) h = Math.max(h, Math.ceil(a.bottom + tallest) + SHADOW_ROOM)
    })
  }
  return h
}
/* 변화가 감지되면 ~300ms 동안 매 프레임 추적 — 오버레이 열림 애니메이션을
   실시간으로 따라가 즉각 늘어납니다 (한 번만 재면 애니메이션이 끝난 뒤라 늦음) */
let rafId = 0
let trackUntil = 0
let lastH = 0
function tick() {
  const h = measureH()
  if (h !== lastH) { lastH = h; parent.postMessage({ t: 'ds-play-h', h }, '*') }
  if (performance.now() < trackUntil) rafId = requestAnimationFrame(tick)
}
function report() {
  trackUntil = performance.now() + 300
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(tick)
}
onMounted(() => {
  new ResizeObserver(report).observe(root.value!)
  // 창이 늘어나면 Vuetify가 위치를 다시 잡습니다 — 그 결과를 다시 재야 합니다
  window.addEventListener('resize', report)
  // 오버레이 열림·닫힘·이동 감지 (포지셔닝이 몇 프레임 뒤에 끝나 transitionend도 함께)
  new MutationObserver(report).observe(document.body,
    { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] })
  document.body.addEventListener('transitionend', report, true)
  report()
})

/* ── 공유 상태 ── */
const txt = ref(''); const email = ref('ujin@'); const memo = ref('')
const loadingOpen = ref(false)
function showLoading() { loadingOpen.value = true; setTimeout(() => { loadingOpen.value = false }, 3000) }
const num = ref(3); const tags = ref(['법무', '계약'])
const sel = ref('실행 중'); const auto = ref(['법무', '재무', '인사', '영업'])
const b1 = ref(true); const b2 = ref(false); const radio = ref('180')
const TOC_ITEMS = [{ id: 'toc-a', label: '개요' }, { id: 'toc-b', label: '설치' }, { id: 'toc-c', label: '사용법' }]
const slider = ref(70); const files = ref(null); const date = ref(null)
/* Autocomplete 데모 — 칩이 여러 개 쌓인 모습을 바로 보여 주려고 미리 채웁니다 */
const FOLDERS = ['법무', '재무', '인사', '영업', '기술', '연구', '총무']
const autoOne = ref('법무')
const autoSm = ref(['법무', '재무'])
const autoErr = ref(null)
/* 달력 데모용 값 — 캡처마다 달라지지 않게 고정 날짜를 씁니다 */
const d1 = new Date(2026, 7, 11); const d2 = new Date(2026, 7, 18)
/* 기간 값은 [시작, 종료]가 아니라 사이 날짜를 전부 담은 배열입니다 (Vuetify 규약) */
const span = (a: Date, b: Date) => {
  const out = []; const d = new Date(a)
  while (d <= b) { out.push(new Date(d)); d.setDate(d.getDate() + 1) }
  return out
}
const dRange = ref(span(d1, d2)); const dMulti = ref([d1, new Date(2026, 7, 14), d2])
const dpRange = ref(span(d1, d2)); const dpPreset = ref([]); const dpClear = ref(d1)
const tab = ref('all'); const view = ref('list'); const period = ref('w'); const page = ref(2)
const nav = ref(['logs']); const step = ref(2); const listSel = ref([])
const tree = ref([5]); const treeOpen = ref([1, 4]); const acc = ref<any>(null)
const dlg = ref(false); const snack = ref(false); const pal = ref(false)
const streaming = ref(true); const toolStatus = ref<'running' | 'done' | 'error'>('running')
/* thinking — 단계 문구 자동 전환 (스펙: 2.6s 간격, 450ms fade-in) */
const stages = ['문서 분석 중', '근거 문서 검색 중', '답변 정리 중']
const stageIdx = ref(0)
onMounted(() => { window.setInterval(() => { stageIdx.value = (stageIdx.value + 1) % stages.length }, 2600) })
/* ── 아이콘 굵기 점검 (#play/strokeaudit) ──
   Lucide 굵기를 1.5 → 2로 통일한 뒤, 아이콘이 흘러 들어오는 경로가 여러 개라
   한 곳만 고치고 끝난 줄 알기 쉽습니다. 경로마다 실제로 그려진 값을
   DOM에서 읽어 표로 보여줍니다 — 눈으로도, 숫자로도 확인됩니다. */
const auditRoot = ref<HTMLElement>()
const auditRows = ref<{ name: string; widths: string[]; ok: boolean }[]>([])
function runAudit() {
  const el = auditRoot.value
  if (!el) return
  const rows: { name: string; widths: string[]; ok: boolean }[] = []
  el.querySelectorAll<HTMLElement>('[data-audit]').forEach((cell) => {
    const seen = new Set<string>()
    cell.querySelectorAll('svg').forEach((svg) => {
      const shapes = svg.querySelectorAll('path,circle,rect,line,polyline,polygon,ellipse')
      const targets: Element[] = shapes.length ? Array.from(shapes) : [svg]
      targets.forEach((s) => {
        const cs = getComputedStyle(s)
        // 면으로만 그린 글리프(stroke 없음)는 굵기 대상이 아닙니다
        if (cs.stroke === 'none' || cs.stroke === 'rgba(0, 0, 0, 0)') return
        const w = parseFloat(cs.strokeWidth)
        if (!Number.isFinite(w)) return
        seen.add(String(Math.round(w * 100) / 100))
      })
    })
    const widths = [...seen].sort()
    rows.push({ name: cell.dataset.audit || '?', widths, ok: widths.length > 0 && widths.every((w) => w === '2') })
  })
  auditRows.value = rows
}
watch(id, (v) => { if (v === 'strokeaudit') nextTick(runAudit) })
onMounted(() => { if (id.value === 'strokeaudit') nextTick(runAudit) })
const auditFail = computed(() => auditRows.value.filter((r) => !r.ok).length)

const chips = ref(['계약서_최종.pdf', 'Q3 보고서'])
const gridSel = ref(['2']); const clicks = ref(0); const sent = ref<string[]>([])
const q = ref(''); const loading = ref(false)
const now = ref(Date.now() - 2 * 36e5)

const tableRows = [
  { name: 'Weekly report agent', status: 'brand', label: '실행중', docs: 1284, at: '2h ago' },
  { name: 'Invoice classifier', status: 'success', label: '완료', docs: 92, at: '1d ago' },
  { name: 'Drive sync', status: 'danger', label: '실패', docs: 7, at: '3d ago' },
]
/* numeric: true — 숫자 열은 오른쪽 정렬 + 자릿수 고정폭으로 자동 처리됩니다 */
const tableCols = [
  { title: '이름', key: 'name' },
  { title: '상태', key: 'status' },
  { title: '문서 수', key: 'docs', numeric: true },
  { title: '수정', key: 'at' },
]
const tableSel = ref<any[]>([])
const palItems = [
  { id: 'a', title: '감사 로그 열기', group: '이동' },
  { id: 'b', title: '새 에이전트', hint: 'N' },
  { id: 'c', title: '다크 모드 전환', group: '설정' },
]
function cycleTool() {
  toolStatus.value = toolStatus.value === 'running' ? 'done' : toolStatus.value === 'done' ? 'error' : 'running'
}
function search() { loading.value = true; setTimeout(() => { loading.value = false }, 900) }

/* ── Button — variant 그룹 (새 variant가 생기면 여기 + data.js demos에 추가) ── */
const btnVariants = [
  { variant: 'primary',   label: '새 에이전트', icon: 'add' },
  { variant: 'secondary', label: '내보내기',    icon: 'download' },
  { variant: 'ghost',     label: '더 알아보기', icon: 'link' },
  { variant: 'danger',    label: '삭제',        icon: 'delete' },
] as const
const btnGroup = computed(() => btnVariants.find(v => v.variant === group.value) ?? btnVariants[0])

/* 그룹 키 선택 — 허용 목록에 없으면 기본값 (단일 #play/<id> 접근 대비) */
// 반환은 any — 템플릿에서 각 컴포넌트의 리터럴 유니언 prop에 바로 꽂기 위함
function gv(allowed: string[], def: string): any {
  return allowed.includes(group.value) ? group.value : def
}
const badgeLabel: Record<string, string> = { default: '대기', brand: '실행중', success: '완료', warning: '보류', danger: '실패' }

</script>

<template>
  <v-app>
    <div ref="root" class="play" :data-id="id">

      <template v-if="id === 'button'">
        <!-- 그룹(variant) 하나만 렌더 — 문서 페이지가 그룹마다 iframe을 따로 띄웁니다 -->
        <div class="play-sections">
          <div class="play-sec">
            <div class="play-sec-cap">Sizes · 32 / 36 / 40</div>
            <div class="play-sec-row">
              <DsButton :variant="btnGroup.variant" size="sm">{{ btnGroup.label }}</DsButton>
              <DsButton :variant="btnGroup.variant">{{ btnGroup.label }}</DsButton>
              <DsButton :variant="btnGroup.variant" size="lg">{{ btnGroup.label }}</DsButton>
            </div>
          </div>
          <div class="play-sec">
            <div class="play-sec-cap">States</div>
            <div class="play-sec-row">
              <DsButton :variant="btnGroup.variant" disabled>Disabled</DsButton>
              <DsButton :variant="btnGroup.variant">
                <DsSpinner :variant="btnGroup.variant === 'primary' || btnGroup.variant === 'danger' ? 'current' : 'brand'" :size="13" /> 저장 중…
              </DsButton>
            </div>
          </div>
          <div class="play-sec">
            <div class="play-sec-cap">With icon</div>
            <div class="play-sec-row">
              <DsButton :variant="btnGroup.variant"><DsIcon :name="btnGroup.icon" size="sm" /> {{ btnGroup.label }}</DsButton>
              <DsButton :variant="btnGroup.variant">{{ btnGroup.label }} <DsIcon name="forward" size="sm" /></DsButton>
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="id === 'iconbutton'">
        <template v-if="gv(['ghost','secondary'], 'ghost') === 'secondary'">
          <DsIconButton label="보관" variant="secondary"><DsIcon name="archive" /></DsIconButton>
          <DsIconButton label="편집" variant="secondary" size="sm"><DsIcon name="edit" size="sm" /></DsIconButton>
        </template>
        <template v-else>
          <DsIconButton label="더보기"><DsIcon name="more" /></DsIconButton>
          <DsIconButton label="닫기" size="sm"><DsIcon name="close" size="sm" /></DsIconButton>
        </template>
      </template>

      <template v-else-if="id === 'buttongroup'">
        <div class="play-sections">
          <div class="play-sec">
            <div class="play-sec-cap">Sizes · 32 / 36 / 40</div>
            <div class="play-sec-row">
              <DsButtonGroup v-model="view" size="sm" :items="[{ value: 'list', label: '리스트' }, { value: 'grid', label: '그리드' }]" />
              <DsButtonGroup v-model="view" :items="[{ value: 'list', label: '리스트' }, { value: 'grid', label: '그리드' }]" />
              <DsButtonGroup v-model="view" size="lg" :items="[{ value: 'list', label: '리스트' }, { value: 'grid', label: '그리드' }]" />
              <span class="play-val">{{ view }}</span>
            </div>
          </div>
          <div class="play-sec">
            <div class="play-sec-cap">3개 이상</div>
            <div class="play-sec-row">
              <DsButtonGroup v-model="period" :items="[{ value: 'd', label: '일' }, { value: 'w', label: '주' }, { value: 'm', label: '월' }]" />
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="id === 'menu'">
        <DsMenu>
          <template #activator="props">
            <DsButton variant="secondary" v-bind="props">More <DsIcon name="expand" size="sm" /></DsButton>
          </template>
          <div class="ds-menu-item"><DsIcon name="edit" size="sm" />이름 바꾸기</div>
          <div class="ds-menu-item"><DsIcon name="copy" size="sm" />복제</div>
          <div class="ds-menu-item ds-menu-item--danger"><DsIcon name="delete" size="sm" />삭제</div>
        </DsMenu>
      </template>

      <template v-else-if="id === 'link'">
        <span>자세한 내용은 <DsLink href="#play/link">감사 로그 문서</DsLink>를 참고하세요.</span>
      </template>

      <template v-else-if="id === 'tableofcontents'">
        <div style="display:flex;gap:32px">
          <div style="width:190px">
            <DsTableOfContents :items="TOC_ITEMS" />
          </div>
          <div style="max-width:360px;color:var(--gray-11);font-size:13px;line-height:1.7">
            <h2 id="toc-a" style="font-size:16px;color:var(--gray-12);margin-bottom:6px">개요</h2>
            <p style="margin-bottom:28px">목차는 본문 옆에 붙어 지금 어느 절을 보고 있는지 알려 줍니다.</p>
            <h2 id="toc-b" style="font-size:16px;color:var(--gray-12);margin-bottom:6px">설치</h2>
            <p style="margin-bottom:28px">항목을 누르면 그 자리로 이동하고 표시도 함께 옮깁니다.</p>
            <h2 id="toc-c" style="font-size:16px;color:var(--gray-12);margin-bottom:6px">사용법</h2>
            <p>절이 3개 이상일 때만 씁니다.</p>
          </div>
        </div>
      </template>

      <template v-else-if="id === 'toolbar'">
        <DsToolbar dense style="width:100%">
          <DsButton variant="secondary" size="sm">필터</DsButton>
          <DsButton variant="ghost" size="sm">내보내기</DsButton>
          <span class="sep"></span>
          <span style="font-size:var(--text-xs);color:var(--gray-9)">12건</span>
          <span class="spacer"></span>
          <DsButton size="sm">에이전트 추가</DsButton>
        </DsToolbar>
      </template>

      <template v-else-if="id === 'tabs'">
        <div style="width:100%">
          <DsTabs v-model="tab" :items="[
            { value: 'all', label: '전체', count: 12 },
            { value: 'error', label: '실패', count: 3 },
            { value: 'warn', label: '경고', count: 2 }]" />
          <div class="play-val" style="margin-top:10px">선택: {{ tab }}</div>
        </div>
      </template>

      <template v-else-if="id === 'breadcrumbs'">
        <DsBreadcrumbs :items="[{ title: 'Drive' }, { title: '법무' }, { title: '2026', disabled: true }]" />
      </template>

      <template v-else-if="id === 'pagination'">
        <DsPagination v-model="page" :length="8" />
      </template>

      <template v-else-if="id === 'navlist'">
        <div style="width:230px">
          <DsNavList v-model="nav" :items="[
            { subheader: '워크스페이스' },
            { value: 'agents', title: '에이전트', icon: 'agent', badge: 17 },
            { value: 'drive', title: '드라이브', icon: 'drive' },
            { value: 'logs', title: '감사 로그', icon: 'tableView', badge: 3 }]">
            <template #icon="{ item }"><DsIcon :name="item.icon" size="sm" /></template>
          </DsNavList>
        </div>
      </template>

      <template v-else-if="id === 'stepper'">
        <div style="width:100%">
          <DsStepper v-model="step" :items="['소스 선택', '규칙 설정', '검토']" />
          <div style="display:flex;gap:8px;margin-top:12px">
            <DsButton variant="secondary" size="sm" :disabled="step <= 1" @click="step--">이전</DsButton>
            <DsButton size="sm" :disabled="step >= 3" @click="step++">다음</DsButton>
          </div>
        </div>
      </template>

      <template v-else-if="id === 'input'">
        <div class="play-sections">
          <div class="play-sec">
            <div class="play-sec-cap">Sizes · 32 / 36 / 40</div>
            <div class="play-sec-row" style="align-items:flex-end">
              <DsInput v-model="txt" size="sm" label="sm — 필터 바·툴바" placeholder="Acme Inc." />
              <DsInput v-model="txt" label="default" placeholder="Acme Inc." />
            </div>
          </div>
          <div class="play-sec">
            <div class="play-sec-cap">States</div>
            <div class="play-sec-row" style="align-items:flex-start">
              <DsInput v-model="txt" label="워크스페이스 이름" placeholder="Acme Inc." hint="모든 멤버에게 표시됩니다." />
              <DsInput v-model="email" label="이메일" error="올바른 이메일 주소를 입력하세요." />
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="id === 'textarea'">
        <div style="display:flex;gap:12px;align-items:flex-start">
          <div style="width:220px"><DsTextarea v-model="memo" size="sm" label="sm" placeholder="줄이 늘면 자동으로 커집니다" /></div>
          <div style="width:220px"><DsTextarea v-model="memo" label="default" placeholder="줄이 늘면 자동으로 커집니다" /></div>
        </div>
      </template>

      <template v-else-if="id === 'select'">
        <div class="play-sections">
          <div class="play-sec">
            <div class="play-sec-cap">Sizes · 32 / 36 / 40</div>
            <div class="play-sec-row" style="align-items:flex-end">
              <DsSelect v-model="sel" size="sm" label="sm — 필터 바·툴바" :items="['대기', '실행 중', '완료', '실패']" style="width:190px" />
              <DsSelect v-model="sel" label="default" :items="['대기', '실행 중', '완료', '실패']" style="width:190px" />
            </div>
          </div>
          <div class="play-sec">
            <div class="play-sec-cap">States</div>
            <div class="play-sec-row" style="align-items:flex-start">
              <DsSelect v-model="sel" :items="['대기', '실행 중', '완료', '실패']" style="width:190px" />
              <DsSelect v-model="sel" :items="['대기', '실행 중', '완료', '실패']" error="상태를 선택하세요." style="width:190px" />
              <DsSelect v-model="sel" :items="['대기', '실행 중', '완료', '실패']" disabled style="width:190px" />
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="id === 'autocomplete'">
        <div class="play-sections">
          <div class="play-sec">
            <div class="play-sec-cap">Single</div>
            <div class="play-sec-row" style="width:280px">
              <DsAutocomplete v-model="autoOne" label="폴더" :items="FOLDERS" />
            </div>
          </div>
          <div class="play-sec">
            <div class="play-sec-cap">Multiple · 칩이 늘면 줄이 늘어납니다</div>
            <div class="play-sec-row" style="width:280px">
              <DsAutocomplete v-model="auto" label="폴더" multiple :items="FOLDERS" />
            </div>
          </div>
          <div class="play-sec">
            <div class="play-sec-cap">Sizes · 32 / 36 / 40</div>
            <div class="play-sec-row" style="width:280px;flex-direction:column;align-items:stretch">
              <DsAutocomplete v-model="autoSm" size="sm" multiple :items="FOLDERS" />
              <DsAutocomplete v-model="autoOne" :items="FOLDERS" />
            </div>
          </div>
          <div class="play-sec">
            <div class="play-sec-cap">States</div>
            <div class="play-sec-row" style="width:280px;flex-direction:column;align-items:stretch">
              <DsAutocomplete v-model="autoErr" label="폴더" :items="FOLDERS" error="폴더를 선택하세요." />
              <DsAutocomplete v-model="autoOne" label="잠긴 필드" :items="FOLDERS" disabled />
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="id === 'combobox'">
        <DsCombobox v-model="tags" label="태그" :items="['법무', '계약', '검토']" hint="목록에 없는 값도 Enter로 추가" style="width:300px" />
      </template>

      <template v-else-if="id === 'numberinput'">
        <div class="play-sec-row" style="align-items:flex-end">
          <DsNumberInput v-model="num" size="sm" label="sm" :min="0" :max="10" style="width:150px" />
          <DsNumberInput v-model="num" label="default" :min="0" :max="10" hint="↑↓ 키도 동작합니다" style="width:180px" />
        </div>
      </template>

      <template v-else-if="id === 'checkbox'">
        <div class="play-sections">
          <div class="play-sec">
            <div class="play-sec-cap">Sizes · 14 / 16 / 20</div>
            <div class="play-sec-row">
              <DsCheckbox :model-value="true" size="sm" label="Small" />
              <DsCheckbox :model-value="true" label="Default" />
              <DsCheckbox :model-value="true" size="lg" label="Large" />
            </div>
          </div>
          <div class="play-sec">
            <div class="play-sec-cap">States</div>
            <div class="play-sec-row">
              <DsCheckbox v-model="b1" label="선택" />
              <DsCheckbox :model-value="false" label="미선택" />
              <DsCheckbox :indeterminate="true" label="부분 선택" />
              <DsCheckbox :model-value="true" label="비활성" disabled />
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="id === 'switch'">
        <div class="play-sections">
          <div class="play-sec">
            <div class="play-sec-cap">Sizes · 32 / 36 / 40</div>
            <div class="play-sec-row" style="flex-direction:column;align-items:flex-start;gap:14px">
              <DsSwitch v-model="b2" size="sm" label="sm — 촘촘한 목록·테이블 행" />
              <DsSwitch v-model="b2" label="default — 설정 화면" />
              <DsSwitch v-model="b2" size="lg" label="lg — 터치가 주가 되는 화면" />
            </div>
          </div>
          <div class="play-sec">
            <div class="play-sec-cap">States</div>
            <div class="play-sec-row" style="flex-direction:column;align-items:flex-start;gap:14px">
              <DsSwitch v-model="b2" label="에이전트 활성화" hint="끄면 예약된 실행도 중단됩니다." />
              <DsSwitch :model-value="false" label="꺼짐" />
              <DsSwitch :model-value="true" label="켜짐 · 잠김" disabled />
              <DsSwitch :model-value="false" label="꺼짐 · 잠김" disabled />
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="id === 'radiogroup'">
        <div class="play-sections">
          <div class="play-sec">
            <div class="play-sec-cap">Sizes · 14 / 16 / 20</div>
            <div class="play-sec-row" style="gap:24px;align-items:flex-start">
              <DsRadioGroup :model-value="'a'" size="sm" inline :items="[{ value: 'a', label: 'Small' }]" />
              <DsRadioGroup :model-value="'a'" inline :items="[{ value: 'a', label: 'Default' }]" />
              <DsRadioGroup :model-value="'a'" size="lg" inline :items="[{ value: 'a', label: 'Large' }]" />
            </div>
          </div>
          <div class="play-sec">
            <div class="play-sec-cap">설명이 있는 선택지</div>
            <DsRadioGroup v-model="radio" label="보존 기간" :items="[
              { value: '90', label: '90일', hint: '기본값' },
              { value: '180', label: '180일', hint: '현재 설정' },
              { value: '365', label: '365일', hint: '엔터프라이즈', disabled: true }]" />
          </div>
        </div>
      </template>

      <template v-else-if="id === 'slider'">
        <div style="width:280px"><DsSlider v-model="slider" label="신뢰도 임계값" suffix="%" /></div>
      </template>

      <template v-else-if="id === 'fileinput'">
        <div style="width:300px"><DsFileInput v-model="files" label="문서 업로드" hint="PDF·DOCX · 최대 10MB" /></div>
      </template>

      <template v-else-if="id === 'calendar'">
        <div class="play-sections">
          <div class="play-sec">
            <div class="play-sec-cap">Single</div>
            <div class="play-sec-row"><DsCalendar v-model="date" /></div>
          </div>
          <div class="play-sec">
            <div class="play-sec-cap">Range</div>
            <div class="play-sec-row"><DsCalendar v-model="dRange" mode="range" /></div>
          </div>
          <div class="play-sec">
            <div class="play-sec-cap">Multiple</div>
            <div class="play-sec-row"><DsCalendar v-model="dMulti" mode="multiple" /></div>
          </div>
          <div class="play-sec">
            <div class="play-sec-cap">Bounded · 지난 날짜 차단</div>
            <div class="play-sec-row"><DsCalendar v-model="date" disable-past /></div>
          </div>
        </div>
      </template>

      <template v-else-if="id === 'datepicker'">
        <div class="play-sections">
          <div class="play-sec">
            <div class="play-sec-cap">Default</div>
            <div class="play-sec-row" style="width:260px">
              <DsDatePicker v-model="date" label="계약 만료일" />
            </div>
          </div>
          <div class="play-sec">
            <div class="play-sec-cap">Range</div>
            <div class="play-sec-row" style="width:320px">
              <DsDatePicker v-model="dpRange" mode="range" label="조회 기간" />
            </div>
          </div>
          <div class="play-sec">
            <div class="play-sec-cap">Presets</div>
            <div class="play-sec-row" style="width:320px">
              <DsDatePicker
                v-model="dpPreset" mode="range" label="조회 기간" disable-future
                :presets="[['최근 7일', 7], ['최근 30일', 30], ['최근 90일', 90]]"
                hint="프리셋을 고르면 달력을 열지 않아도 됩니다" />
            </div>
          </div>
          <div class="play-sec">
            <div class="play-sec-cap">Sizes · 32 / 36 / 40</div>
            <div class="play-sec-row" style="width:260px;flex-direction:column;align-items:stretch">
              <DsDatePicker v-model="date" size="sm" />
              <DsDatePicker v-model="date" />
            </div>
          </div>
          <div class="play-sec">
            <div class="play-sec-cap">Clearable</div>
            <div class="play-sec-row" style="width:260px">
              <DsDatePicker v-model="dpClear" clearable />
            </div>
          </div>
          <div class="play-sec">
            <div class="play-sec-cap">States</div>
            <div class="play-sec-row" style="width:260px;flex-direction:column;align-items:stretch">
              <DsDatePicker v-model="date" label="시작일" error="시작일을 골라 주세요" />
              <DsDatePicker v-model="date" label="잠긴 필드" disabled />
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="id === 'searchfield'">
        <div class="play-sections">
          <div class="play-sec">
            <div class="play-sec-cap">Sizes · 32 / 36 / 40</div>
            <div class="play-sec-row">
              <DsSearchField v-model="q" size="sm" placeholder="sm — 필터 바·툴바" />
              <DsSearchField v-model="q" shortcut="⌘K" :loading="loading" @search="search" />
            </div>
          </div>
        </div>
        <span v-if="q" class="play-val">"{{ q }}"</span>
      </template>

      <template v-else-if="id === 'badge'">
        <div class="play-sec-row">
          <DsBadge :appearance="gv(['subtle','solid','outline'], 'subtle')">대기</DsBadge>
          <DsBadge :appearance="gv(['subtle','solid','outline'], 'subtle')" variant="brand">실행중</DsBadge>
          <DsBadge :appearance="gv(['subtle','solid','outline'], 'subtle')" variant="success">완료</DsBadge>
          <DsBadge :appearance="gv(['subtle','solid','outline'], 'subtle')" variant="warning">보류</DsBadge>
          <DsBadge :appearance="gv(['subtle','solid','outline'], 'subtle')" variant="danger">실패</DsBadge>
          <DsBadge :appearance="gv(['subtle','solid','outline'], 'subtle')" variant="info">안내</DsBadge>
          <DsBadge :appearance="gv(['subtle','solid','outline'], 'subtle')" variant="violet">베타</DsBadge>
          <DsBadge :appearance="gv(['subtle','solid','outline'], 'subtle')" variant="teal">신규</DsBadge>
          <DsBadge :appearance="gv(['subtle','solid','outline'], 'subtle')" variant="pink">실험</DsBadge>
        </div>
      </template>

      <template v-else-if="id === 'chip'">
        <template v-if="gv(['default','brand'], 'default') === 'brand'">
          <DsChip variant="brand">Weekly report agent</DsChip>
          <DsChip variant="brand">Invoice classifier</DsChip>
        </template>
        <template v-else>
          <DsChip v-for="(c, i) in chips" :key="c" @remove="chips.splice(i, 1)">{{ c }}</DsChip>
          <DsButton v-if="!chips.length" variant="ghost" size="sm"
            @click="chips = ['계약서_최종.pdf', 'Q3 보고서']">복원</DsButton>
        </template>
      </template>

      <template v-else-if="id === 'skeleton'">
        <template v-if="gv(['text','circle','rect'], 'text') === 'circle'">
          <DsSkeleton variant="circle" width="32px" height="32px" />
        </template>
        <template v-else-if="gv(['text','circle','rect'], 'text') === 'rect'">
          <DsSkeleton variant="rect" width="180px" height="100px" />
        </template>
        <template v-else>
          <div style="display:flex;flex-direction:column;gap:8px;width:300px">
            <DsSkeleton width="60%" /><DsSkeleton width="90%" /><DsSkeleton width="75%" />
          </div>
        </template>
      </template>

      <template v-else-if="id === 'toast'">
        <DsToast v-if="gv(['success','danger'], 'success') === 'success'" variant="success" action="보기">에이전트를 추가했습니다.</DsToast>
        <DsToast v-else variant="danger" action="재시도">동기화하지 못했습니다. 잠시 후 다시 시도하세요.</DsToast>
      </template>

      <template v-else-if="id === 'snackbar'">
        <DsButton variant="secondary" @click="snack = true">스낵바 띄우기</DsButton>
        <DsSnackbar v-if="gv(['success','danger'], 'success') === 'success'" v-model="snack" variant="success" action="보기">저장했습니다.</DsSnackbar>
        <DsSnackbar v-else v-model="snack" variant="danger" action="재시도">저장하지 못했습니다. 네트워크를 확인하고 다시 시도하세요.</DsSnackbar>
      </template>

      <template v-else-if="id === 'alert'">
        <div style="width:100%">
          <DsAlert v-if="gv(['info','success','warning','error'], 'error') === 'info'" variant="info" title="새 기능">이제 hwp 문서도 분석할 수 있습니다.</DsAlert>
          <DsAlert v-else-if="gv(['info','success','warning','error'], 'error') === 'success'" variant="success" closable>파일 128건이 동기화되었습니다.</DsAlert>
          <DsAlert v-else-if="gv(['info','success','warning','error'], 'error') === 'warning'" variant="warning" title="저장 공간 부족">드라이브 용량의 92%를 사용 중입니다.</DsAlert>
          <DsAlert v-else variant="error" title="삭제하지 못했습니다">법무 폴더는 관리자만 삭제할 수 있습니다.</DsAlert>
        </div>
      </template>

      <template v-else-if="id === 'banner'">
        <div style="width:100%"><DsBanner>
          <template #icon><DsIcon name="notification" size="sm" /></template>
          8월 10일 02:00~04:00 서비스 점검이 예정되어 있습니다.
          <template #actions><DsButton variant="ghost" size="sm">자세히</DsButton></template>
        </DsBanner></div>
      </template>

      <template v-else-if="id === 'progressbar'">
        <div style="width:280px"><DsProgressBar :value="slider" label="문서 분석 중" />
          <div style="margin-top:10px"><DsSlider v-model="slider" label="값 조절" suffix="%" /></div>
        </div>
      </template>

      <template v-else-if="id === 'spinner'">
        <template v-if="gv(['brand','current'], 'brand') === 'current'">
          <DsButton><DsSpinner variant="current" :size="13" /> 저장 중…</DsButton>
          <DsButton variant="primary" loading>저장 중…</DsButton>
          <DsButton variant="danger" loading>삭제 중…</DsButton>
          <DsButton variant="secondary" loading>불러오는 중…</DsButton>
        </template>
        <template v-else>
          <DsSpinner />
          <DsButton variant="secondary"><DsSpinner :size="13" /> 저장 중…</DsButton>
        </template>
      </template>

      <template v-else-if="id === 'empty'">
        <DsEmptyState title="에이전트가 없습니다" description="첫 에이전트를 만들어 업무 자동화를 시작하세요.">
          <DsButton @click="clicks++">New agent{{ clicks ? ` (${clicks})` : '' }}</DsButton>
        </DsEmptyState>
      </template>

      <template v-else-if="id === 'dialog'">
        <DsButton variant="danger" @click="dlg = true">삭제 확인창 열기</DsButton>
        <DsDialog v-model="dlg" title="에이전트 삭제">
          이 작업은 되돌릴 수 없습니다. 연결된 실행 기록 128건도 함께 삭제됩니다.
          <template #actions>
            <DsButton variant="secondary" size="sm" @click="dlg = false">취소</DsButton>
            <DsButton variant="danger" size="sm" @click="dlg = false">삭제</DsButton>
          </template>
        </DsDialog>
      </template>

      <template v-else-if="id === 'tooltip'">
        <DsTooltip text="보관함으로 이동">
          <DsIconButton label="보관"><DsIcon name="archive" /></DsIconButton>
        </DsTooltip>
        <DsTooltip text="이 값은 변경할 수 없습니다">
          <DsButton variant="ghost">올려보세요</DsButton>
        </DsTooltip>
      </template>

      <template v-else-if="id === 'popover'">
        <DsPopover :width="260">
          <template #activator="props">
            <DsIconButton label="설명" v-bind="props"><DsIcon name="info" /></DsIconButton>
          </template>
          <b style="color:var(--gray-12)">보존 기간</b><br>180일이 지난 기록은 보관 저장소로 이동합니다.
        </DsPopover>
      </template>

      <template v-else-if="id === 'hovercard'">
        <span>수행자: <DsHoverCard>
          <template #activator="props"><DsLink href="#play/hovercard" v-bind="props">Jiyong Kim</DsLink></template>
          <div style="display:flex;gap:10px;align-items:center">
            <DsAvatar>JK</DsAvatar>
            <div><b style="color:var(--gray-12)">Jiyong Kim</b>
              <div style="font-size:var(--text-xs);color:var(--gray-10)">편집자 · 법무팀</div></div>
          </div>
        </DsHoverCard></span>
      </template>

      <template v-else-if="id === 'commandpalette'">
        <DsButton variant="secondary" @click="pal = true">
          팔레트 열기 <DsKbd :keys="['⌘', 'K']" />
        </DsButton>
        <DsCommandPalette v-model="pal" :items="palItems" @select="sent.push($event.title)" />
        <span v-if="sent.length" class="play-val">실행: {{ sent[sent.length - 1] }}</span>
      </template>

      <template v-else-if="id === 'datatable'">
        <div style="width:100%">
          <DsDataTable
            v-model:selected="tableSel"
            :headers="tableCols"
            :items="group === 'empty' ? [] : tableRows"
            :size="gv(['sm','default','lg'], 'default')"
            :striped="group === 'striped'"
            :selectable="group === 'selectable'"
            :loading="group === 'loading'"
            hide-default-footer
            item-value="name"
          >
            <template #item.status="{ item }">
              <DsBadge :variant="(item as any).status">{{ (item as any).label }}</DsBadge>
            </template>
          </DsDataTable>
        </div>
      </template>

      <template v-else-if="id === 'list'">
        <div style="width:340px"><DsList v-model="listSel" selectable :items="[
          { value: 'a', title: '자동 분류', subtitle: '규칙에 따라 분류', icon: 'run', meta: '켜짐' },
          { value: 'b', title: '주간 리포트', subtitle: '매주 월요일 09:00', icon: 'tableView', meta: '켜짐' }]">
          <template #icon="{ item }"><DsIcon :name="item.icon" size="sm" /></template>
        </DsList></div>
      </template>

      <template v-else-if="id === 'treeview'">
        <!-- 파일 피커에서 확정한 모습 그대로 — 펼침 + 아이콘 + 선택 + 깊이 가이드선 -->
        <div style="width:260px"><DsTreeview v-model="tree" v-model:opened="treeOpen" :items="[
          { id: 1, title: '법무', icon: 'folder', children: [
            { id: 2, title: '2026', icon: 'folder', children: [{ id: 6, title: '계약서', icon: 'folder' }] },
            { id: 3, title: '2025', icon: 'folder' }] },
          { id: 4, title: '재무', icon: 'folder', children: [{ id: 5, title: 'Q3', icon: 'folder' }] }]">
          <template #prepend="{ item }"><DsIcon :name="(item as any).icon" size="sm" /></template>
        </DsTreeview></div>
      </template>

      <template v-else-if="id === 'timeline'">
        <DsTimeline :items="[
          { id: 1, time: '09:14', title: '삭제 시도 차단', body: '권한 없음', variant: 'danger' },
          { id: 2, time: '09:12', title: '분류 완료', body: '문서 42건', variant: 'success' }]" />
      </template>

      <template v-else-if="id === 'accordion'">
        <div style="width:100%"><DsAccordion v-model="acc" :items="[
          { title: '원본 페이로드 보기', text: '{ \'event\': \'document.delete\', \'allowed\': false }' },
          { title: '고급 설정', text: '재시도 3회 · 타임아웃 30초' }]" /></div>
      </template>

      <template v-else-if="id === 'metalist'">
        <div style="width:300px"><DsMetaList :items="[
          { label: '수행자', value: 'Jiyong Kim' },
          { label: '이벤트 ID', value: 'evt_8f3a2c91', mono: true },
          { label: 'IP', value: '10.4.22.108', mono: true }]" /></div>
      </template>

      <template v-else-if="id === 'timestamp'">
        <DsTimestamp :value="now" />
        <DsTimestamp :value="now" mode="absolute" />
      </template>

      <template v-else-if="id === 'kbd'">
        <DsKbd :keys="['⌘', 'K']" />
        <DsKbd>Esc</DsKbd>
      </template>

      <template v-else-if="id === 'code'">
        <div style="width:100%">
          <p style="font-size:var(--text-sm);color:var(--gray-11)">인라인 <DsCode>agent.run()</DsCode> 표기와</p>
          <DsCode block>const result = await agent.run({
  source: 'drive',
})</DsCode>
        </div>
      </template>

      <template v-else-if="id === 'avatar'">
        <DsAvatar :size="gv(['sm','default','lg'], 'default')">JK</DsAvatar>
        <DsAvatar :size="gv(['sm','default','lg'], 'default')" variant="brand">A</DsAvatar>
      </template>

      <template v-else-if="id === 'card'">
        <DsCard title="자동화된 작업" subtitle="최근 30일" style="width:220px">
          <div class="num">1,284<span class="delta">+12.4%</span></div>
        </DsCard>
      </template>

      <template v-else-if="id === 'divider'">
        <div style="width:280px;font-size:var(--text-sm);color:var(--gray-11)">
          위 내용<DsDivider />아래 내용<DsDivider label="어제" />어제 대화
        </div>
      </template>

      <template v-else-if="id === 'icon'">
        <DsIcon name="agent" /><DsIcon name="search" /><DsIcon name="folder" />
        <DsIcon name="settings" /><DsIcon name="loading" spin />
      </template>

      <!-- 아이콘 굵기 점검 — #play/strokeaudit -->
      <template v-else-if="id === 'strokeaudit'">
        <div ref="auditRoot" class="play-doc">
          <div class="play-group">
            <p class="play-h2">아이콘 굵기 점검 — 기준 stroke-width 2</p>
            <p class="play-sub">
              아이콘이 화면에 닿는 경로를 모두 늘어놓고, 실제로 그려진 굵기를 DOM에서 읽었습니다.
              <b :class="auditFail ? 'sa-bad' : 'sa-good'">{{ auditFail ? auditFail + '개 경로가 기준과 다릅니다' : '모든 경로가 2입니다' }}</b>
            </p>

            <table class="sa-table">
              <thead><tr><th>경로</th><th>실측 stroke-width</th><th>판정</th></tr></thead>
              <tbody>
                <tr v-for="r in auditRows" :key="r.name">
                  <td>{{ r.name }}</td>
                  <td class="sa-num">{{ r.widths.join(' · ') || '—' }}</td>
                  <td :class="r.ok ? 'sa-good' : 'sa-bad'">{{ r.ok ? '기준' : '어긋남' }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="play-group">
            <p class="play-h2">경로별 실물</p>
            <p class="play-sub">같은 아이콘을 경로만 바꿔 나란히 둡니다. 굵기가 다르면 여기서 바로 보입니다.</p>
            <div class="sa-grid">
              <div class="sa-cell"><span class="sa-cap">DsIcon sm / md / lg</span>
                <div class="sa-row" data-audit="DsIcon (vue/components/DsIcon.vue)">
                  <DsIcon name="search" size="sm" /><DsIcon name="search" /><DsIcon name="search" size="lg" />
                  <DsIcon name="settings" /><DsIcon name="folder" /><DsIcon name="loading" spin />
                </div>
              </div>
              <div class="sa-cell"><span class="sa-cap">v-icon 문자열 (의미 이름)</span>
                <div class="sa-row" data-audit="v-icon 문자열 (vuetify-icons.ts · lucideSet)">
                  <v-icon icon="search" /><v-icon icon="settings" /><v-icon icon="folder" />
                </div>
              </div>
              <div class="sa-cell"><span class="sa-cap">Vuetify 내부 alias ($…)</span>
                <div class="sa-row" data-audit="Vuetify alias (vuetify-icons.ts · wrap)">
                  <v-icon icon="$dropdown" /><v-icon icon="$close" /><v-icon icon="$next" /><v-icon icon="$prev" />
                </div>
              </div>
              <div class="sa-cell"><span class="sa-cap">Vuetify 컴포넌트 속 아이콘</span>
                <div class="sa-row" data-audit="Vuetify 컴포넌트 내부 (VSelect·VAlert)">
                  <DsSelect :items="['A', 'B']" model-value="A" style="width:120px" />
                  <DsAlert variant="info" closable>알림</DsAlert>
                </div>
              </div>
              <div class="sa-cell"><span class="sa-cap">인라인 .lic SVG</span>
                <div class="sa-row" data-audit="인라인 .lic (ds.css)">
                  <DsSearchField model-value="계약서" style="width:200px" />
                </div>
              </div>
              <div class="sa-cell"><span class="sa-cap">체크 표식</span>
                <div class="sa-row" data-audit="체크 표식 (DsCheckbox · Vuetify mark)">
                  <DsCheckbox :model-value="true" label="DS" />
                  <v-icon icon="$checkboxOn" />
                </div>
              </div>
            </div>
          </div>

          <div class="play-group">
            <p class="play-h2">굵기 비교 기준선</p>
            <p class="play-sub">왼쪽이 예전 1.5, 오른쪽이 지금 2입니다. 위 실물이 오른쪽과 같아야 합니다.</p>
            <div class="sa-row">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
              <span class="sa-cap">1.5 (옛 기준)</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
              <span class="sa-cap">2 (현재 기준)</span>
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="id === 'visuallyhidden'">
        <DsButton variant="secondary">
          12건<DsVisuallyHidden> — 검색 결과 12건</DsVisuallyHidden>
        </DsButton>
        <span class="play-val">스크린리더는 "12건 — 검색 결과 12건"으로 읽습니다</span>
      </template>

      <template v-else-if="id === 'chatmessage'">
        <div class="chat" style="width:100%">
          <DsChatMessage role="user">지난달 계약서 파일 찾아서 요약해줘</DsChatMessage>
          <DsChatMessage role="agent" :streaming="streaming">
            <template #tools>
              <DsToolCallStep status="done">search_drive("계약서") — 3 files</DsToolCallStep>
            </template>
            6월 계약서 3건을 찾았습니다<DsCitationChip :index="1" />
          </DsChatMessage>
        </div>
        <DsButton variant="ghost" size="sm" @click="streaming = !streaming">
          스트리밍 {{ streaming ? '끄기' : '켜기' }}
        </DsButton>
      </template>

      <template v-else-if="id === 'systemmessage'">
        <div style="width:100%"><DsSystemMessage time="09:14">이전 대화가 요약되었습니다</DsSystemMessage></div>
      </template>

      <template v-else-if="id === 'streamingtext'">
        <DsStreamingText :done="!streaming">응답이 흘러나오는 중입니다</DsStreamingText>
        <DsButton variant="ghost" size="sm" @click="streaming = !streaming">전환</DsButton>
      </template>

      <template v-else-if="id === 'thinking'">
        <DsThinkingIndicator v-if="gv(['default','compact','inline'], 'default') === 'default'" :label="stages[stageIdx]" />
        <DsThinkingIndicator v-else-if="gv(['default','compact','inline'], 'default') === 'compact'" size="compact" label="생성 중" />
        <DsThinkingIndicator v-else size="inline" label="검토 의견 생성 중" />
      </template>

      <template v-else-if="id === 'dotfield'">
        <DsDotField label="이미지를 생성하는 중" :size="260" />
      </template>

      <template v-else-if="id === 'loadingscreen'">
        <div style="display:flex;flex-direction:column;align-items:center;gap:20px;padding:24px 0">
          <DsLoadingScreen :fullscreen="false" label="불러오는 중" />
          <DsButton variant="secondary" @click="showLoading()">풀스크린으로 3초 보기</DsButton>
          <DsLoadingScreen v-if="loadingOpen" label="불러오는 중" />
        </div>
      </template>

      <template v-else-if="id === 'toolcall'">
        <div style="width:100%">
          <DsToolCallStep v-if="gv(['running','done','error'], 'running') === 'running'" status="running">read_document("계약서_최종.pdf")</DsToolCallStep>
          <DsToolCallStep v-else-if="gv(['running','done','error'], 'running') === 'done'" status="done">search_drive("계약서", June) — 3 files found</DsToolCallStep>
          <DsToolCallStep v-else status="error">extract_table("스캔본.pdf") — 텍스트 레이어 없음</DsToolCallStep>
        </div>
      </template>

      <template v-else-if="id === 'agentinput'">
        <div style="width:100%;max-width:480px">
          <DsAgentInput v-model="txt" @send="sent.push(txt); txt = ''" />
          <div v-if="sent.length" class="play-val" style="margin-top:8px">전송됨: {{ sent[sent.length - 1] }}</div>
        </div>
      </template>

      <template v-else-if="id === 'citation'">
        <span class="msg-text">계약 기간은 12개월이며<DsCitationChip :index="1" @open="clicks++" />
          {{ clicks ? ` (열림 ${clicks}회)` : '' }}</span>
      </template>

      <template v-else-if="id === 'artifact'">
        <div style="width:100%;max-width:460px"><DsArtifactPanel title="summary.md" copyable downloadable>
# 6월 계약서 요약
- 계약 기간: 12개월 (자동 갱신)</DsArtifactPanel></div>
      </template>

      <template v-else-if="id === 'searchresult'">
        <div style="width:100%"><DsSearchResult title="계약서_최종.pdf" path="Drive / 법무 / 2026">
          본 <mark>계약서</mark>는 2026년 7월 1일부터 효력이 발생하며…
        </DsSearchResult></div>
      </template>

      <template v-else-if="id === 'filegrid'">
        <div style="width:100%"><DsFileGrid :files="[
          { id: '1', name: '법무', meta: '12 files', icon: 'folder' },
          { id: '2', name: '계약서_최종.pdf', meta: '2.1 MB', icon: 'document' },
          { id: '3', name: 'Q3_실적.xlsx', meta: '1.4 MB', icon: 'spreadsheet' }]"
          :selected="gridSel"
          @select="(f) => gridSel = gridSel.includes(f.id) ? gridSel.filter((x) => x !== f.id) : [...gridSel, f.id]">
          <template #icon="{ file }"><DsIcon :name="file.icon" size="lg" /></template>
        </DsFileGrid></div>
      </template>

      <template v-else-if="id === 'filerow'">
        <div style="width:100%">
          <DsFileRow name="계약서_최종.pdf" meta="2.1 MB · Jun 28" :selected="b1" @select="b1 = !b1">
            <template #icon><DsIcon name="document" size="sm" /></template>
          </DsFileRow>
          <DsFileRow name="Q3_실적.xlsx" meta="1.4 MB · Jul 12" :selected="b2" @select="b2 = !b2">
            <template #icon><DsIcon name="spreadsheet" size="sm" /></template>
          </DsFileRow>
        </div>
      </template>

      <div v-else class="play-val">이 컴포넌트의 데모가 아직 없습니다: {{ id }}</div>

    </div>
  </v-app>
</template>

<style>
/* iframe 안이라 스크롤바가 보이면 데모가 잘려 보입니다.
   높이는 부모에게 정확히 보고하므로 스크롤은 필요 없습니다. */
html, body { overflow: hidden; }
/* 무대 색을 body에 둡니다. 드롭다운이 열리면 iframe이 세로로 늘어나는데,
   색이 .play에만 있으면 늘어난 부분만 흰색으로 남아 무대가 중간에서
   끊깁니다 — 메뉴가 잘린 것처럼 보이던 정체가 이것이었습니다. */
html, body { background: var(--gray-1); }
/* Vuetify의 .v-application이 테마 배경(흰색)으로 body를 덮으므로 여기에도 겁니다 */
.v-application, .v-application__wrap { background: var(--gray-1); }
.play {
  display: flex; flex-wrap: wrap; gap: 12px; align-items: center;
  padding: 20px 24px; min-height: 64px;
  background: var(--gray-1);
}
.play-val { font-family: var(--mono); font-size: var(--text-xs); color: var(--gray-9); }
/* 섹션형 데모 — Variants / Sizes / States 같은 그룹 나열 */
.play-sections { display: flex; flex-direction: column; gap: 18px; width: 100%; }
.play-sec-cap {
  font-size: var(--text-2xs); font-weight: var(--weight-semibold); color: var(--gray-11);
  margin-bottom: 8px; letter-spacing: .02em;
}
.play-sec-row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
/* Geist식 문서형 데모 — 섹션 제목 + 예시 타일 그리드 */
.play-doc { display: flex; flex-direction: column; gap: 32px; width: 100%; }
.play-group { display: flex; flex-direction: column; }
.play-h2 {
  font-size: var(--text-base); font-weight: var(--weight-semibold); color: var(--gray-12);
  margin: 0 0 4px;
}
.play-sub { font-size: var(--text-sm); color: var(--gray-11); margin: 0 0 14px; }
.play-h2 + .play-tiles { margin-top: 10px; }
.play-tiles {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px; width: 100%;
}
.play-tile { display: flex; flex-direction: column; }
.play-tile-stage {
  display: flex; align-items: center; justify-content: center;
  min-height: 96px; padding: 20px 16px;
  border: 1px solid var(--border); border-radius: var(--r-lg);
  background: var(--surface); margin-bottom: 8px;
}
.play-tile-name {
  font-family: var(--mono); font-size: var(--text-xs);
  font-weight: var(--weight-medium); color: var(--gray-12);
}
.play-tile-desc { font-size: var(--text-xs); color: var(--gray-11); margin-top: 2px; }
.play .v-application__wrap { min-height: 0; }

/* ── 아이콘 굵기 점검 (#play/strokeaudit) ── */
.sa-table { border-collapse: collapse; width: 100%; font-size: var(--text-sm); }
.sa-table th, .sa-table td {
  text-align: left; padding: 8px 12px; border-bottom: 1px solid var(--border);
}
.sa-table th { font-size: var(--text-xs); font-weight: var(--weight-semibold); color: var(--gray-11); }
.sa-num { font-family: var(--mono); }
.sa-good { color: var(--gray-12); font-weight: var(--weight-medium); }
.sa-bad { color: var(--danger, #d93025); font-weight: var(--weight-semibold); }
.sa-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; width: 100%; }
.sa-cell { display: flex; flex-direction: column; gap: 6px; }
.sa-cap { font-size: var(--text-xs); color: var(--gray-11); }
.sa-row { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
</style>
