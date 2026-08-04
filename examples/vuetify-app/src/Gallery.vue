<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from 'vuetify'
import {
  DsButton, DsInput, DsBadge, DsChip, DsAvatar, DsCard, DsDivider, DsSkeleton,
  DsToast, DsEmptyState, DsChatMessage, DsStreamingText, DsThinkingIndicator,
  DsToolCallStep, DsAgentInput, DsCitationChip, DsArtifactPanel, DsSearchResult,
  DsFileGrid, DsFileRow,
} from '~/design'
import {
  DsIconButton, DsButtonGroup, DsMenu, DsTabs, DsBreadcrumbs, DsPagination,
  DsNavList, DsStepper, DsSelect, DsAutocomplete, DsTextarea, DsCheckbox,
  DsRadioGroup, DsSwitch, DsSlider, DsFileInput, DsDatePicker, DsAlert,
  DsBanner, DsProgressBar, DsSpinner, DsSnackbar, DsDialog, DsTooltip,
  DsDataTable, DsList, DsTreeview, DsTimeline, DsAccordion,
} from '~/design/vuetify'
import { DsIcon } from '~/design/icon'
import { icons } from '~/design/icons'
const iconNames = Object.keys(icons) as any[]

const theme = useTheme()
const dark = ref(false)
function toggleTheme() {
  dark.value = !dark.value
  theme.change(dark.value ? 'dsDark' : 'dsLight')
  document.documentElement.setAttribute('data-theme', dark.value ? 'dark' : 'light')
}

/* 상태 */
const tab = ref('all'); const view = ref('list'); const page = ref(2)
const nav = ref(['logs']); const step = ref(2)
const sel = ref('Running'); const auto = ref(['법무']); const memo = ref('')
const check = ref(true); const radio = ref('180'); const sw = ref(true)
const slider = ref(70); const files = ref(null); const date = ref(null)
const dialogOpen = ref(false); const snackOpen = ref(false)
const accordion = ref<any>(null); const tree = ref([])
const listSel = ref([])

const tableHeaders = [
  { title: '이름', key: 'name' }, { title: '상태', key: 'status' }, { title: '수정', key: 'at' },
]
const tableRows = [
  { name: 'Weekly report agent', status: 'brand', label: '실행 중', at: '2h ago' },
  { name: 'Invoice classifier', status: 'success', label: '완료', at: '1d ago' },
  { name: 'Drive sync', status: 'danger', label: '실패', at: '3d ago' },
]
const treeItems = [
  { id: 1, title: '법무', children: [{ id: 2, title: '2026' }, { id: 3, title: '2025' }] },
  { id: 4, title: '재무', children: [{ id: 5, title: 'Q3' }] },
]
const timelineItems = [
  { id: 1, time: '09:14', title: '삭제 시도 차단', body: '권한 없음 — 법무 폴더', variant: 'danger' as const },
  { id: 2, time: '09:12', title: '분류 완료', body: '문서 42건 · 12.4초', variant: 'success' as const },
  { id: 3, time: '09:11', title: '한도 80% 도달', body: '월간 실행 한도' },
]

/* 갤러리 메타 — 각 컴포넌트의 "왜"와 "어디에" */
const SECTIONS = [
  { id: 'action', name: 'Action', ko: '액션' },
  { id: 'nav', name: 'Navigation', ko: '내비게이션' },
  { id: 'input', name: 'Data Input', ko: '입력' },
  { id: 'feedback', name: 'Feedback & Status', ko: '피드백·상태' },
  { id: 'overlay', name: 'Overlay', ko: '오버레이' },
  { id: 'data', name: 'Table & List', ko: '표·목록' },
  { id: 'content', name: 'Content', ko: '콘텐츠' },
  { id: 'agent', name: 'Agent', ko: '에이전트' },
]
</script>

<template>
  <v-app>
    <v-main :style="{ background: 'var(--bg)' }">
      <div class="g-wrap">

        <div class="g-head">
          <div>
            <h1>컴포넌트 갤러리 <span class="g-en">Live Gallery</span></h1>
            <p>실제 Vuetify 3.11.6 위에서 렌더된 화면입니다. 모든 컴포넌트를 눈으로 확인할 수 있습니다.</p>
          </div>
          <div style="display:flex;gap:8px">
            <DsButton variant="ghost" size="sm" @click="toggleTheme">
              <DsIcon :name="dark ? 'light' : 'dark'" size="sm" />{{ dark ? 'Light' : 'Dark' }}
            </DsButton>
            <DsButton variant="secondary" size="sm" @click="$emit('nav', 'audit')">감사 로그 화면 →</DsButton>
          </div>
        </div>

        <div class="g-legend">
          <span><i class="lg standalone"></i>Standalone — Vuetify 불필요</span>
          <span><i class="lg wrapped"></i>Vuetify 기반 — 우리가 감쌈</span>
        </div>

        <!-- ══════ ACTION ══════ -->
        <h2 class="g-sec">Action <span>액션</span></h2>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsButton <i class="lg standalone"></i></div>
          </div>
          <div class="g-demo">
            <DsButton><DsIcon name="add" size="sm" />New agent</DsButton>
            <DsButton variant="secondary">Cancel</DsButton>
            <DsButton variant="ghost">Learn more</DsButton>
            <DsButton variant="danger">Delete</DsButton>
            <DsButton disabled>Disabled</DsButton>
          </div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsIconButton <i class="lg wrapped"></i> <code>VBtn</code></div>
          </div>
          <div class="g-demo">
            <DsIconButton label="More"><DsIcon name="more" /></DsIconButton>
            <DsIconButton label="Archive" variant="secondary"><DsIcon name="archive" /></DsIconButton>
            <DsIconButton label="Close" size="sm"><DsIcon name="close" size="sm" /></DsIconButton>
          </div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsButtonGroup <i class="lg wrapped"></i> <code>VBtnToggle</code></div>
          </div>
          <div class="g-demo">
            <DsButtonGroup v-model="view" :items="[
              { value: 'list', label: '리스트' }, { value: 'grid', label: '그리드' }]" />
            <span class="g-val">선택: {{ view }}</span>
          </div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsMenu <i class="lg wrapped"></i> <code>VMenu</code></div>
          </div>
          <div class="g-demo">
            <DsMenu location="bottom start">
              <template #activator="props">
                <DsButton variant="secondary" v-bind="props">More <DsIcon name="expand" size="sm" /></DsButton>
              </template>
              <div class="ds-menu-item">이름 바꾸기</div>
              <div class="ds-menu-item">복제</div>
              <div class="ds-menu-item" style="color:var(--danger)">삭제</div>
            </DsMenu>
          </div>
        </div>

        <!-- ══════ NAVIGATION ══════ -->
        <h2 class="g-sec">Navigation <span>내비게이션</span></h2>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsTabs <i class="lg wrapped"></i> <code>VTabs</code></div>
          </div>
          <div class="g-demo" style="display:block">
            <DsTabs v-model="tab" :items="[
              { value: 'all', label: '전체', count: 12 },
              { value: 'error', label: '실패', count: 3 },
              { value: 'warn', label: '경고', count: 2 }]" />
          </div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsBreadcrumbs <i class="lg wrapped"></i> <code>VBreadcrumbs</code></div>
          </div>
          <div class="g-demo">
            <DsBreadcrumbs :items="[
              { title: 'Drive' }, { title: '법무' }, { title: '2026', disabled: true }]" />
          </div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsPagination <i class="lg wrapped"></i> <code>VPagination</code></div>
          </div>
          <div class="g-demo"><DsPagination v-model="page" :length="8" /></div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsNavList <i class="lg wrapped"></i> <code>VList</code></div>
          </div>
          <div class="g-demo" style="display:block;max-width:240px">
            <DsNavList v-model="nav" :items="[
              { subheader: '워크스페이스' },
              { value: 'agents', title: '에이전트', icon: 'agent', badge: 17 },
              { value: 'drive', title: '드라이브', icon: 'drive' },
              { value: 'logs', title: '감사 로그', icon: 'tableView', badge: 3 }]">
              <template #icon="{ item }"><DsIcon :name="item.icon" size="sm" /></template>
            </DsNavList>
          </div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsStepper <i class="lg wrapped"></i> <code>VStepper</code></div>
          </div>
          <div class="g-demo" style="display:block">
            <DsStepper v-model="step" :items="['소스 선택', '규칙 설정', '검토']" />
          </div>
        </div>

        <!-- ══════ INPUT ══════ -->
        <h2 class="g-sec">Data Input <span>입력</span></h2>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsInput <i class="lg standalone"></i></div>
          </div>
          <div class="g-demo">
            <DsInput label="워크스페이스 이름" placeholder="Acme Inc." hint="모든 멤버에게 표시됩니다." />
            <DsInput label="이메일" model-value="ujin@" error="올바른 이메일 주소를 입력하세요." />
          </div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsTextarea <i class="lg wrapped"></i> <code>VTextarea</code></div>
          </div>
          <div class="g-demo"><DsTextarea v-model="memo" label="메모" placeholder="내용을 입력하세요" hint="줄이 늘면 자동으로 커집니다." /></div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsSelect <i class="lg wrapped"></i> <code>VSelect</code></div>
          </div>
          <div class="g-demo"><DsSelect v-model="sel" label="상태" :items="['대기', '실행 중', '완료', '실패']" style="width:200px" /></div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsAutocomplete <i class="lg wrapped"></i> <code>VAutocomplete</code></div>
          </div>
          <div class="g-demo"><DsAutocomplete v-model="auto" label="폴더" multiple
            :items="['법무', '재무', '인사', '영업', '기술', '마케팅']" style="width:260px" /></div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsCheckbox <i class="lg wrapped"></i> <code>VCheckbox</code></div>
          </div>
          <div class="g-demo">
            <DsCheckbox v-model="check" label="이메일 알림 받기" hint="실패한 실행에 대해서만 발송됩니다." />
            <DsCheckbox :indeterminate="true" label="일부 선택됨" />
          </div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsSwitch <i class="lg wrapped"></i> <code>VSwitch</code></div>
          </div>
          <div class="g-demo"><DsSwitch v-model="sw" label="에이전트 활성화" hint="끄면 예약된 실행도 중단됩니다." /></div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsRadioGroup <i class="lg wrapped"></i> <code>VRadioGroup</code></div>
          </div>
          <div class="g-demo" style="display:block">
            <DsRadioGroup v-model="radio" label="보존 기간" :items="[
              { value: '90', label: '90일', hint: '기본값' },
              { value: '180', label: '180일', hint: '현재 설정' },
              { value: '365', label: '365일', hint: '엔터프라이즈 전용' }]" />
          </div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsSlider <i class="lg wrapped"></i> <code>VSlider</code></div>
          </div>
          <div class="g-demo" style="display:block;max-width:320px">
            <DsSlider v-model="slider" label="신뢰도 임계값" suffix="%" />
          </div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsFileInput <i class="lg wrapped"></i> <code>VFileInput</code></div>
          </div>
          <div class="g-demo"><DsFileInput v-model="files" label="문서 업로드" hint="PDF·DOCX · 최대 10MB" /></div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsDatePicker <i class="lg wrapped"></i> <code>VDatePicker</code></div>
          </div>
          <div class="g-demo"><DsDatePicker v-model="date" /></div>
        </div>

        <!-- ══════ FEEDBACK ══════ -->
        <h2 class="g-sec">Feedback &amp; Status <span>피드백·상태</span></h2>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsAlert <i class="lg wrapped"></i> <code>VAlert</code></div>
          </div>
          <div class="g-demo" style="display:block">
            <DsAlert variant="error" title="삭제하지 못했습니다">
              법무 폴더는 관리자만 삭제할 수 있습니다.
              <template #actions><DsButton variant="secondary" size="sm">권한 요청</DsButton></template>
            </DsAlert>
            <DsAlert variant="warning" style="margin-top:8px">월간 실행 한도의 80%에 도달했습니다.</DsAlert>
            <DsAlert variant="success" style="margin-top:8px">파일 128건이 동기화되었습니다.</DsAlert>
            <DsAlert variant="info" style="margin-top:8px">이 에이전트는 매주 월요일 09:00에 실행됩니다.</DsAlert>
          </div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsBanner <i class="lg wrapped"></i> <code>VBanner</code></div>
          </div>
          <div class="g-demo" style="display:block">
            <DsBanner>
              <template #icon><DsIcon name="notification" size="sm" /></template>
              8월 3일 02:00~04:00 서비스 점검이 예정되어 있습니다.
              <template #actions><DsButton variant="ghost" size="sm">자세히</DsButton></template>
            </DsBanner>
          </div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsProgressBar <i class="lg wrapped"></i> <code>VProgressLinear</code></div>
          </div>
          <div class="g-demo" style="display:block;max-width:320px">
            <DsProgressBar :value="62" label="문서 분석 중" />
          </div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsSpinner <i class="lg wrapped"></i> <code>VProgressCircular</code></div>
          </div>
          <div class="g-demo">
            <DsSpinner />
            <DsButton variant="secondary"><DsIcon name="loading" size="sm" spin /> 저장 중…</DsButton>
          </div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsSnackbar <i class="lg wrapped"></i> <code>VSnackbar</code></div>
          </div>
          <div class="g-demo">
            <DsButton variant="secondary" @click="snackOpen = true">토스트 띄우기</DsButton>
            <DsSnackbar v-model="snackOpen" variant="success" action="View">에이전트가 생성되었습니다.</DsSnackbar>
          </div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsBadge · DsChip <i class="lg standalone"></i></div>
          </div>
          <div class="g-demo">
            <DsBadge>대기</DsBadge>
            <DsBadge variant="brand">실행 중</DsBadge>
            <DsBadge variant="success">완료</DsBadge>
            <DsBadge variant="warning">지연</DsBadge>
            <DsBadge variant="danger">실패</DsBadge>
            <DsChip>계약서_최종.pdf</DsChip>
            <DsChip variant="brand">상태: 실행 중</DsChip>
          </div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsSkeleton · DsEmptyState <i class="lg standalone"></i></div>
          </div>
          <div class="g-demo" style="display:block">
            <div style="display:flex;gap:12px;align-items:center;margin-bottom:16px">
              <DsSkeleton variant="circle" width="32px" height="32px" />
              <div style="flex:1;display:flex;flex-direction:column;gap:8px;max-width:280px">
                <DsSkeleton width="60%" /><DsSkeleton width="90%" />
              </div>
            </div>
            <DsEmptyState title="에이전트가 없습니다" description="첫 에이전트를 만들어 업무 자동화를 시작하세요.">
              <DsButton>New agent</DsButton>
            </DsEmptyState>
          </div>
        </div>

        <!-- ══════ OVERLAY ══════ -->
        <h2 class="g-sec">Overlay <span>오버레이</span></h2>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsDialog <i class="lg wrapped"></i> <code>VDialog</code></div>
          </div>
          <div class="g-demo">
            <DsButton variant="danger" @click="dialogOpen = true">삭제 확인창 열기</DsButton>
            <DsDialog v-model="dialogOpen" title="에이전트를 삭제할까요?">
              이 작업은 되돌릴 수 없습니다. 연결된 실행 기록 128건도 함께 삭제됩니다.
              <template #actions>
                <DsButton variant="secondary" size="sm" @click="dialogOpen = false">취소</DsButton>
                <DsButton variant="danger" size="sm" @click="dialogOpen = false">삭제</DsButton>
              </template>
            </DsDialog>
          </div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsTooltip <i class="lg wrapped"></i> <code>VTooltip</code></div>
          </div>
          <div class="g-demo">
            <DsTooltip text="보관함으로 이동"><DsIconButton label="Archive"><DsIcon name="archive" /></DsIconButton></DsTooltip>
            <DsTooltip text="이 값은 변경할 수 없습니다"><DsButton variant="ghost">호버해보세요</DsButton></DsTooltip>
          </div>
        </div>

        <!-- ══════ DATA ══════ -->
        <h2 class="g-sec">Table &amp; List <span>표·목록</span></h2>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsDataTable <i class="lg wrapped"></i> <code>VDataTable</code></div>
          </div>
          <div class="g-demo" style="display:block">
            <DsDataTable :headers="tableHeaders" :items="tableRows" density="compact">
              <template #item.status="{ item }">
                <DsBadge :variant="(item as any).status">{{ (item as any).label }}</DsBadge>
              </template>
            </DsDataTable>
          </div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsList <i class="lg wrapped"></i> <code>VList</code></div>
          </div>
          <div class="g-demo" style="display:block;max-width:420px">
            <DsList v-model="listSel" selectable :items="[
              { value: 'a', title: '자동 분류', subtitle: '수신 문서를 규칙에 따라 분류', icon: 'run', meta: '켜짐' },
              { value: 'b', title: '주간 리포트', subtitle: '매주 월요일 09:00', icon: 'tableView', meta: '켜짐' },
              { value: 'c', title: '드라이브 동기화', subtitle: '10분마다', icon: 'drive', meta: '꺼짐' }]">
              <template #icon="{ item }"><DsIcon :name="item.icon" size="sm" /></template>
            </DsList>
          </div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsTreeview <i class="lg wrapped"></i> <code>VTreeview</code></div>
          </div>
          <div class="g-demo" style="display:block;max-width:280px">
            <DsTreeview v-model="tree" :items="treeItems" />
          </div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsTimeline <i class="lg wrapped"></i> <code>VTimeline</code></div>
          </div>
          <div class="g-demo" style="display:block">
            <DsTimeline :items="timelineItems" />
          </div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsAccordion <i class="lg wrapped"></i> <code>VExpansionPanels</code></div>
          </div>
          <div class="g-demo" style="display:block">
            <DsAccordion v-model="accordion" :items="[
              { title: '원본 페이로드 보기', text: '{ \'event\': \'document.delete\', \'allowed\': false }' },
              { title: '고급 설정', text: '재시도 3회 · 타임아웃 30초' }]" />
          </div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsFileGrid · DsFileRow <i class="lg standalone"></i></div>
          </div>
          <div class="g-demo" style="display:block">
            <DsFileGrid :files="[
              { id: '1', name: '법무', meta: '12 files', icon: 'folder' },
              { id: '2', name: '계약서_최종.pdf', meta: '2.1 MB', icon: 'document' },
              { id: '3', name: 'Q3_실적.xlsx', meta: '1.4 MB', icon: 'spreadsheet' }]" :selected="['2']">
              <template #icon="{ file }"><DsIcon :name="file.icon" size="lg" /></template>
            </DsFileGrid>
            <div style="margin-top:12px">
              <DsFileRow name="계약서_최종.pdf" meta="2.1 MB · Jun 28" :selected="true">
                <template #icon><DsIcon name="document" size="sm" /></template>
              </DsFileRow>
              <DsFileRow name="Q3_실적.xlsx" meta="1.4 MB · Jul 12">
                <template #icon><DsIcon name="spreadsheet" size="sm" /></template>
              </DsFileRow>
            </div>
          </div>
        </div>

        <!-- ══════ ICONS ══════ -->
        <h2 class="g-sec">Iconography <span>아이콘 — Lucide</span></h2>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsIcon <i class="lg wrapped"></i> <code>Lucide</code></div>
          </div>
          <div class="g-demo" style="display:block">
            <div style="display:flex;gap:20px;align-items:flex-end;margin-bottom:18px">
              <div style="text-align:center"><DsIcon name="search" size="sm" /><div class="ic-sz">sm · 16</div></div>
              <div style="text-align:center"><DsIcon name="search" size="md" /><div class="ic-sz">md · 20</div></div>
              <div style="text-align:center"><DsIcon name="search" size="lg" /><div class="ic-sz">lg · 24</div></div>
              <div style="text-align:center"><DsIcon name="loading" size="md" spin /><div class="ic-sz">spin</div></div>
            </div>
            <div class="icon-grid">
              <div v-for="n in iconNames" :key="n" class="ic">
                <DsIcon :name="n" />
                <span>{{ n }}</span>
              </div>
            </div>
            <div style="font-size:12.5px;color:var(--gray-10);margin-top:14px">
              전체 {{ iconNames.length }}개. Lucide 5,845개 중 우리 어휘로 등록한 것만 보입니다.
              필요한 아이콘이 없으면 <code style="font-family:var(--mono);color:var(--brand)">vue/icons.ts</code>에 의미 이름으로 추가합니다.
            </div>
          </div>
        </div>

        <!-- ══════ CONTENT ══════ -->
        <h2 class="g-sec">Content <span>콘텐츠</span></h2>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsAvatar · DsCard · DsDivider <i class="lg standalone"></i></div>
          </div>
          <div class="g-demo" style="display:block">
            <div style="display:flex;gap:10px;align-items:center;margin-bottom:14px">
              <DsAvatar size="sm">JK</DsAvatar><DsAvatar>JK</DsAvatar>
              <DsAvatar size="lg">JK</DsAvatar><DsAvatar variant="brand">A</DsAvatar>
            </div>
            <DsDivider label="구분선" />
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px">
              <DsCard title="자동화된 작업" subtitle="최근 30일"><div class="num">1,284<span class="delta">+12.4%</span></div></DsCard>
              <DsCard title="활성 에이전트" subtitle="전체 워크스페이스"><div class="num">17<span class="delta">+2</span></div></DsCard>
            </div>
          </div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsSearchResult <i class="lg standalone"></i></div>
          </div>
          <div class="g-demo" style="display:block">
            <DsSearchResult title="계약서_최종.pdf" path="Drive / 법무 / 2026">
              본 <mark>계약서</mark>는 2026년 7월 1일부터 효력이 발생하며…
            </DsSearchResult>
          </div>
        </div>

        <!-- ══════ AGENT ══════ -->
        <h2 class="g-sec">Agent <span>에이전트 — Vuetify에 없는 것들</span></h2>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsChatMessage · DsToolCallStep · DsCitationChip <i class="lg standalone"></i></div>
          </div>
          <div class="g-demo" style="display:block">
            <div class="chat">
              <DsChatMessage role="user">지난달 계약서 파일 찾아서 요약해줘</DsChatMessage>
              <DsChatMessage role="agent" :streaming="true">
                <template #tools>
                  <DsToolCallStep status="done">search_drive("계약서", June) — 3 files</DsToolCallStep>
                  <DsToolCallStep status="running">read_document("계약서_최종.pdf")</DsToolCallStep>
                  <DsToolCallStep status="error">extract_table("스캔본.pdf") — 텍스트 레이어 없음</DsToolCallStep>
                </template>
                6월 계약서 3건을 찾았습니다. 최종본<DsCitationChip :index="1" />의 핵심 조항은
              </DsChatMessage>
            </div>
          </div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsThinkingIndicator <i class="lg standalone"></i></div>
          </div>
          <div class="g-demo"><DsThinkingIndicator label="계약서 조항을 분석하는 중…" /></div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsAgentInput <i class="lg standalone"></i></div>
          </div>
          <div class="g-demo" style="display:block;max-width:520px"><DsAgentInput /></div>
        </div>

        <div class="g-item">
          <div class="g-meta">
            <div class="g-name">DsArtifactPanel <i class="lg standalone"></i></div>
          </div>
          <div class="g-demo" style="display:block;max-width:520px">
            <DsArtifactPanel title="audit_summary.md" copyable downloadable>
# 감사 요약 (2026-07-31)
- 실패 3건 · 경고 2건
- 반복 원인: 법무 폴더 권한</DsArtifactPanel>
          </div>
        </div>

        <div class="g-foot">
          컴포넌트 {{ 20 + 29 }}종 — Standalone 20 · Vuetify 기반 29.
          모두 Vuetify 3.11.6 위에서 렌더된 실제 화면입니다.
        </div>

      </div>
    </v-main>
  </v-app>
</template>

<style>
.g-wrap { max-width: 1120px; margin: 0 auto; padding: 32px 24px 140px; }
.g-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
.g-head h1 { font-size: 24px; font-weight: 650; letter-spacing: -.02em; color: var(--gray-12); }
.g-en { font-size: 14px; font-weight: 500; color: var(--gray-9); margin-left: 6px; }
.g-head p { font-size: 13.5px; color: var(--gray-11); margin-top: 6px; }

.g-legend { display: flex; gap: 18px; margin-top: 20px; padding: 12px 16px;
  border: 1px solid var(--border); border-radius: var(--r-xl); background: var(--gray-1); }
.g-legend span { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; color: var(--gray-11); }
.lg { width: 8px; height: 8px; border-radius: 2px; display: inline-block; }
.lg.standalone { background: var(--brand); }
.lg.wrapped { background: #ab6400; }
[data-theme="dark"] .lg.wrapped { background: #f0b429; }

.g-sec { font-size: 12px; font-weight: 700; color: var(--gray-9);
  margin: 56px 0 14px; }
.g-sec span { text-transform: none; letter-spacing: 0; font-weight: 500; color: var(--gray-8); margin-left: 8px; }

.g-item { display: grid; grid-template-columns: 210px 1fr; gap: 24px;
  border: 1px solid var(--border); border-radius: var(--r-xl); overflow: hidden; margin-bottom: 12px; }
.g-meta { padding: 18px; background: var(--gray-2); border-right: 1px solid var(--border); }
.g-name { font-size: 13.5px; font-weight: 650; color: var(--gray-12);
  display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.g-name code { font-family: var(--mono); font-size: 11px; font-weight: 500;
  background: var(--gray-4); color: var(--gray-10); padding: 1px 5px; border-radius: 3px; }
.g-why, .g-where { font-size: 12.5px; color: var(--gray-11); line-height: 1.6; margin-top: 10px; }
.g-why b, .g-where b { display: inline-block; min-width: 42px; font-size: 10.5px; font-weight: 700;
  color: var(--gray-9); }
.g-demo { padding: 24px; display: flex; flex-wrap: wrap; gap: 12px; align-items: center;
  background: var(--surface); }
.g-val { font-family: var(--mono); font-size: 12px; color: var(--gray-9); }

.g-foot { margin-top: 40px; padding: 18px; text-align: center; font-size: 13px; color: var(--gray-10);
  border: 1px solid var(--border); border-radius: var(--r-xl); background: var(--gray-1); }

.icon-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(104px, 1fr)); gap: 2px; }
.ic { display: flex; flex-direction: column; align-items: center; gap: 7px;
  padding: 14px 6px; border-radius: var(--r-md); color: var(--gray-11); }
.ic:hover { background: var(--gray-2); color: var(--gray-12); }
.ic span { font-family: var(--mono); font-size: 10.5px; color: var(--gray-9);
  text-align: center; word-break: break-all; }
.ic-sz { font-family: var(--mono); font-size: 10.5px; color: var(--gray-9); margin-top: 8px; }

@media (max-width: 860px) {
  .g-item { grid-template-columns: 1fr; }
  .g-meta { border-right: none; border-bottom: 1px solid var(--border); }
}
</style>
