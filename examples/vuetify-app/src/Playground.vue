<script setup lang="ts">
/* 컴포넌트별 인터랙티브 데모 — 문서 사이트가 iframe으로 임베드합니다.
   #play/<id> 로 접근. 높이는 postMessage로 부모에게 알립니다. */
import { computed, onMounted, ref, watch } from 'vue'
import { useTheme } from 'vuetify'
import {
  DsButton, DsInput, DsBadge, DsChip, DsAvatar, DsCard, DsDivider, DsSkeleton,
  DsToast, DsEmptyState, DsChatMessage, DsStreamingText, DsThinkingIndicator,
  DsDotField, DsToolCallStep, DsAgentInput, DsCitationChip, DsArtifactPanel, DsSearchResult,
  DsFileGrid, DsFileRow, DsLink, DsKbd, DsCode, DsStatusDot, DsTimestamp,
  DsMetaList, DsSearchField, DsSystemMessage, DsToolbar, DsVisuallyHidden,
} from '~/design'
import {
  DsIconButton, DsButtonGroup, DsMenu, DsTabs, DsBreadcrumbs, DsPagination,
  DsNavList, DsStepper, DsSelect, DsAutocomplete, DsTextarea, DsCheckbox,
  DsRadioGroup, DsSwitch, DsSlider, DsFileInput, DsDatePicker, DsAlert,
  DsBanner, DsProgressBar, DsSpinner, DsSnackbar, DsDialog, DsTooltip,
  DsDataTable, DsList, DsTreeview, DsTimeline, DsAccordion,
  DsNumberInput, DsCombobox, DsPopover, DsHoverCard, DsCommandPalette,
} from '~/design/vuetify'
import { DsIcon } from '~/design/icon'

const id = ref(location.hash.replace(/^#play\//, '') || 'button')
window.addEventListener('hashchange', () => { id.value = location.hash.replace(/^#play\//, '') || 'button' })

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
function measureH() {
  let h = (root.value?.scrollHeight ?? 0) + 2
  document.querySelectorAll<HTMLElement>('.v-overlay__content').forEach((el) => {
    const r = el.getBoundingClientRect()
    if (r.height > 0) h = Math.max(h, Math.ceil(r.bottom) + 24)
  })
  return h
}
let rafId = 0
function report() {
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() =>
    parent.postMessage({ t: 'ds-play-h', h: measureH() }, '*'))
}
onMounted(() => {
  new ResizeObserver(report).observe(root.value!)
  // 오버레이 열림·닫힘·이동 감지 (포지셔닝이 몇 프레임 뒤에 끝나 transitionend도 함께)
  new MutationObserver(report).observe(document.body,
    { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] })
  document.body.addEventListener('transitionend', report, true)
  report()
})

/* ── 공유 상태 ── */
const txt = ref(''); const email = ref('ujin@'); const memo = ref('')
const num = ref(3); const tags = ref(['법무', '계약'])
const sel = ref('실행 중'); const auto = ref(['법무'])
const b1 = ref(true); const b2 = ref(false); const radio = ref('180')
const slider = ref(70); const files = ref(null); const date = ref(null)
const tab = ref('all'); const view = ref('list'); const page = ref(2)
const nav = ref(['logs']); const step = ref(2); const listSel = ref([])
const tree = ref([]); const acc = ref<any>(null)
const dlg = ref(false); const snack = ref(false); const pal = ref(false)
const streaming = ref(true); const toolStatus = ref<'running' | 'done' | 'error'>('running')
/* thinking — 단계 문구 자동 전환 (스펙: 2.6s 간격, 450ms fade-in) */
const stages = ['문서를 분석하고 있어요', '관련 근거를 검색하고 있어요', '답변을 정리하고 있어요']
const stageIdx = ref(0)
onMounted(() => { window.setInterval(() => { stageIdx.value = (stageIdx.value + 1) % stages.length }, 2600) })
const chips = ref(['계약서_최종.pdf', 'Q3 보고서'])
const gridSel = ref(['2']); const clicks = ref(0); const sent = ref<string[]>([])
const q = ref(''); const loading = ref(false)
const now = ref(Date.now() - 2 * 36e5)

const tableRows = [
  { name: 'Weekly report agent', status: 'brand', label: '실행 중', at: '2h ago' },
  { name: 'Invoice classifier', status: 'success', label: '완료', at: '1d ago' },
  { name: 'Drive sync', status: 'danger', label: '실패', at: '3d ago' },
]
const palItems = [
  { id: 'a', title: '감사 로그 열기', group: '이동' },
  { id: 'b', title: '새 에이전트', hint: 'N' },
  { id: 'c', title: '다크 모드 전환', group: '설정' },
]
function cycleTool() {
  toolStatus.value = toolStatus.value === 'running' ? 'done' : toolStatus.value === 'done' ? 'error' : 'running'
}
function search() { loading.value = true; setTimeout(() => { loading.value = false }, 900) }

</script>

<template>
  <v-app>
    <div ref="root" class="play" :data-id="id">

      <template v-if="id === 'button'">
        <DsButton @click="clicks++">클릭 {{ clicks }}</DsButton>
        <DsButton variant="secondary">Secondary</DsButton>
        <DsButton variant="ghost">Ghost</DsButton>
        <DsButton variant="danger">Delete</DsButton>
        <DsButton disabled>Disabled</DsButton>
        <DsButton size="sm">Small</DsButton>
      </template>

      <template v-else-if="id === 'iconbutton'">
        <DsIconButton label="더보기"><DsIcon name="more" /></DsIconButton>
        <DsIconButton label="보관" variant="secondary"><DsIcon name="archive" /></DsIconButton>
        <DsIconButton label="닫기" size="sm"><DsIcon name="close" size="sm" /></DsIconButton>
      </template>

      <template v-else-if="id === 'buttongroup'">
        <DsButtonGroup v-model="view" :items="[{ value: 'list', label: '리스트' }, { value: 'grid', label: '그리드' }]" />
        <span class="play-val">{{ view }}</span>
      </template>

      <template v-else-if="id === 'menu'">
        <DsMenu>
          <template #activator="props">
            <DsButton variant="secondary" v-bind="props">More <DsIcon name="expand" size="sm" /></DsButton>
          </template>
          <div class="ds-menu-item"><DsIcon name="edit" size="sm" />이름 바꾸기</div>
          <div class="ds-menu-item"><DsIcon name="copy" size="sm" />복제</div>
          <div class="ds-menu-item" style="color:var(--danger)"><DsIcon name="delete" size="sm" />삭제</div>
        </DsMenu>
      </template>

      <template v-else-if="id === 'link'">
        <span>자세한 내용은 <DsLink href="#play/link">감사 로그 문서</DsLink>를 참고하세요.</span>
      </template>

      <template v-else-if="id === 'toolbar'">
        <DsToolbar dense style="width:100%">
          <DsButton variant="secondary" size="sm">필터</DsButton>
          <DsButton variant="ghost" size="sm">내보내기</DsButton>
          <span class="sep"></span>
          <span style="font-size:var(--text-xs);color:var(--gray-9)">12건</span>
          <span class="spacer"></span>
          <DsButton size="sm">새로 만들기</DsButton>
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
        <DsInput v-model="txt" label="워크스페이스 이름" placeholder="Acme Inc." hint="모든 멤버에게 표시됩니다." />
        <DsInput v-model="email" label="이메일" error="올바른 이메일 주소를 입력하세요." />
      </template>

      <template v-else-if="id === 'textarea'">
        <div style="width:320px"><DsTextarea v-model="memo" label="메모" placeholder="줄이 늘면 자동으로 커집니다" /></div>
      </template>

      <template v-else-if="id === 'select'">
        <DsSelect v-model="sel" label="상태" :items="['대기', '실행 중', '완료', '실패']" style="width:200px" />
      </template>

      <template v-else-if="id === 'autocomplete'">
        <DsAutocomplete v-model="auto" label="폴더" multiple :items="['법무', '재무', '인사', '영업', '기술']" style="width:280px" />
      </template>

      <template v-else-if="id === 'combobox'">
        <DsCombobox v-model="tags" label="태그" :items="['법무', '계약', '검토']" hint="목록에 없는 값도 Enter로 추가" style="width:300px" />
      </template>

      <template v-else-if="id === 'numberinput'">
        <DsNumberInput v-model="num" label="재시도 횟수" :min="0" :max="10" hint="↑↓ 키도 동작합니다" style="width:180px" />
      </template>

      <template v-else-if="id === 'checkbox'">
        <DsCheckbox v-model="b1" label="이메일 알림 받기" hint="실패한 실행에 대해서만 발송됩니다." />
        <DsCheckbox :indeterminate="true" label="일부 선택됨" />
      </template>

      <template v-else-if="id === 'switch'">
        <DsSwitch v-model="b2" label="에이전트 활성화" hint="끄면 예약된 실행도 중단됩니다." />
      </template>

      <template v-else-if="id === 'radiogroup'">
        <DsRadioGroup v-model="radio" label="보존 기간" :items="[
          { value: '90', label: '90일', hint: '기본값' },
          { value: '180', label: '180일', hint: '현재 설정' },
          { value: '365', label: '365일', hint: '엔터프라이즈' }]" />
      </template>

      <template v-else-if="id === 'slider'">
        <div style="width:280px"><DsSlider v-model="slider" label="신뢰도 임계값" suffix="%" /></div>
      </template>

      <template v-else-if="id === 'fileinput'">
        <div style="width:300px"><DsFileInput v-model="files" label="문서 업로드" hint="PDF·DOCX · 최대 10MB" /></div>
      </template>

      <template v-else-if="id === 'datepicker'">
        <DsDatePicker v-model="date" />
      </template>

      <template v-else-if="id === 'searchfield'">
        <DsSearchField v-model="q" shortcut="⌘K" :loading="loading" @search="search" />
        <span v-if="q" class="play-val">"{{ q }}"</span>
      </template>

      <template v-else-if="id === 'badge'">
        <DsBadge>대기</DsBadge>
        <DsBadge variant="brand">실행 중</DsBadge>
        <DsBadge variant="success">완료</DsBadge>
        <DsBadge variant="warning">지연</DsBadge>
        <DsBadge variant="danger">실패</DsBadge>
      </template>

      <template v-else-if="id === 'chip'">
        <DsChip v-for="(c, i) in chips" :key="c" @remove="chips.splice(i, 1)">{{ c }}</DsChip>
        <DsButton v-if="!chips.length" variant="ghost" size="sm"
          @click="chips = ['계약서_최종.pdf', 'Q3 보고서']">복원</DsButton>
      </template>

      <template v-else-if="id === 'statusdot'">
        <DsStatusDot status="success" label="온라인" />
        <DsStatusDot status="brand" label="실행 중" pulse />
        <DsStatusDot status="danger" label="오류" />
      </template>

      <template v-else-if="id === 'skeleton'">
        <div style="display:flex;gap:12px;align-items:center;width:300px">
          <DsSkeleton variant="circle" width="32px" height="32px" />
          <div style="flex:1;display:flex;flex-direction:column;gap:8px">
            <DsSkeleton width="60%" /><DsSkeleton width="90%" />
          </div>
        </div>
      </template>

      <template v-else-if="id === 'toast'">
        <DsToast variant="success" action="보기">에이전트가 생성되었습니다.</DsToast>
      </template>

      <template v-else-if="id === 'snackbar'">
        <DsButton variant="secondary" @click="snack = true">스낵바 띄우기</DsButton>
        <DsSnackbar v-model="snack" variant="success" action="보기">저장되었습니다.</DsSnackbar>
      </template>

      <template v-else-if="id === 'alert'">
        <div style="width:100%;display:flex;flex-direction:column;gap:8px">
          <DsAlert variant="error" title="삭제하지 못했습니다">법무 폴더는 관리자만 삭제할 수 있습니다.</DsAlert>
          <DsAlert variant="success" closable>파일 128건이 동기화되었습니다.</DsAlert>
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
        <DsSpinner />
        <DsButton variant="secondary"><DsSpinner :size="13" /> 저장 중…</DsButton>
      </template>

      <template v-else-if="id === 'empty'">
        <DsEmptyState title="에이전트가 없습니다" description="첫 에이전트를 만들어 업무 자동화를 시작하세요.">
          <DsButton @click="clicks++">New agent{{ clicks ? ` (${clicks})` : '' }}</DsButton>
        </DsEmptyState>
      </template>

      <template v-else-if="id === 'dialog'">
        <DsButton variant="danger" @click="dlg = true">삭제 확인창 열기</DsButton>
        <DsDialog v-model="dlg" title="에이전트를 삭제할까요?">
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
        <div style="width:100%"><DsDataTable :headers="[
          { title: '이름', key: 'name' }, { title: '상태', key: 'status' }, { title: '수정', key: 'at' }]"
          :items="tableRows" density="compact">
          <template #item.status="{ item }">
            <DsBadge :variant="(item as any).status">{{ (item as any).label }}</DsBadge>
          </template>
        </DsDataTable></div>
      </template>

      <template v-else-if="id === 'list'">
        <div style="width:340px"><DsList v-model="listSel" selectable :items="[
          { value: 'a', title: '자동 분류', subtitle: '규칙에 따라 분류', icon: 'run', meta: '켜짐' },
          { value: 'b', title: '주간 리포트', subtitle: '매주 월요일 09:00', icon: 'tableView', meta: '켜짐' }]">
          <template #icon="{ item }"><DsIcon :name="item.icon" size="sm" /></template>
        </DsList></div>
      </template>

      <template v-else-if="id === 'treeview'">
        <div style="width:260px"><DsTreeview v-model="tree" :items="[
          { id: 1, title: '법무', children: [{ id: 2, title: '2026' }, { id: 3, title: '2025' }] },
          { id: 4, title: '재무', children: [{ id: 5, title: 'Q3' }] }]" /></div>
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
        <DsAvatar size="sm">JK</DsAvatar>
        <DsAvatar>JK</DsAvatar>
        <DsAvatar size="lg">JK</DsAvatar>
        <DsAvatar variant="brand">A</DsAvatar>
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
        <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
          <DsThinkingIndicator :label="stages[stageIdx]" />
          <DsThinkingIndicator size="compact" label="생성 중" />
          <DsThinkingIndicator size="inline" label="검토 의견 생성 중" />
        </div>
      </template>

      <template v-else-if="id === 'dotfield'">
        <DsDotField label="이미지를 생성하는 중" :size="260" />
      </template>

      <template v-else-if="id === 'toolcall'">
        <div style="width:100%">
          <DsToolCallStep :status="toolStatus">read_document("계약서_최종.pdf")</DsToolCallStep>
          <DsButton variant="ghost" size="sm" style="margin-top:10px" @click="cycleTool">
            상태 전환: {{ toolStatus }}
          </DsButton>
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
.play {
  display: flex; flex-wrap: wrap; gap: 12px; align-items: center;
  padding: 28px; min-height: 96px;
  background: var(--gray-1);
}
.play-val { font-family: var(--mono); font-size: var(--text-xs); color: var(--gray-9); }
.play .v-application__wrap { min-height: 0; }
</style>
