<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'
import {
  DsButton, DsInput, DsBadge, DsChip, DsAvatar, DsCard, DsDivider,
  DsSkeleton, DsToast, DsEmptyState, DsChatMessage, DsToolCallStep,
  DsAgentInput, DsCitationChip, DsArtifactPanel, DsSearchResult,
  DsFileGrid, DsFileRow, DsThinkingIndicator, DsStreamingText,
} from '~/design'
import { DsDataTable, DsDialog, DsMenu, DsTooltip, DsSelect } from '~/design/vuetify'
import { DsIcon } from '~/design/icon'

/* ── 테마 ── */
const theme = useTheme()
const dark = ref(false)
function toggleTheme() {
  dark.value = !dark.value
  theme.change(dark.value ? 'dsDark' : 'dsLight')
  document.documentElement.setAttribute('data-theme', dark.value ? 'dark' : 'light')
}

/* ══════════════════════════════════════════
   감사 로그 데이터
   ══════════════════════════════════════════ */
type Level = 'info' | 'warn' | 'error' | 'success'
interface Log {
  id: number; time: string; level: Level; actor: string; actorInit: string
  action: string; target: string; ip: string; agent: string; detail: string
}

const RAW: Log[] = [
  { id: 1,  time: '2026-07-31 09:14:02', level: 'error',   actor: 'Jiyong Kim',  actorInit: 'JK', action: 'document.delete',   target: '계약서_v2_검토중.docx', ip: '10.4.22.108', agent: 'Drive Sync',        detail: '권한 없음 — 법무 폴더는 관리자만 삭제할 수 있습니다.' },
  { id: 2,  time: '2026-07-31 09:12:47', level: 'success', actor: 'Minji Park',  actorInit: 'MP', action: 'agent.run',         target: 'Invoice classifier',  ip: '10.4.19.55',  agent: 'Invoice classifier', detail: '문서 42건 분류 완료 (12.4초)' },
  { id: 3,  time: '2026-07-31 09:11:20', level: 'warn',    actor: 'system',      actorInit: 'SY', action: 'quota.threshold',   target: 'workspace/acme',      ip: '—',           agent: '—',                  detail: '월간 실행 한도의 80%에 도달했습니다.' },
  { id: 4,  time: '2026-07-31 09:08:33', level: 'info',    actor: 'Jiyong Kim',  actorInit: 'JK', action: 'document.read',     target: '계약서_최종.pdf',      ip: '10.4.22.108', agent: 'DocuRAG',            detail: '3개 섹션 인용됨' },
  { id: 5,  time: '2026-07-31 09:02:11', level: 'success', actor: 'Seoyeon Han', actorInit: 'SH', action: 'agent.create',      target: 'Weekly report agent', ip: '10.4.31.7',   agent: '—',                  detail: '스케줄: 매주 월요일 09:00' },
  { id: 6,  time: '2026-07-31 08:57:40', level: 'error',   actor: 'system',      actorInit: 'SY', action: 'tool.extract_table', target: '스캔본.pdf',          ip: '—',           agent: 'DocuRAG',            detail: '텍스트 레이어 없음 — OCR이 필요합니다.' },
  { id: 7,  time: '2026-07-31 08:51:09', level: 'info',    actor: 'Minji Park',  actorInit: 'MP', action: 'search.query',      target: '"계약서" June',        ip: '10.4.19.55',  agent: 'Search',             detail: '결과 3건 · 0.4초' },
  { id: 8,  time: '2026-07-31 08:44:55', level: 'warn',    actor: 'Seoyeon Han', actorInit: 'SH', action: 'auth.login',        target: 'seoyeon@acme.co',     ip: '203.0.113.9', agent: '—',                  detail: '새 기기에서 로그인 — 승인 필요' },
  { id: 9,  time: '2026-07-31 08:30:02', level: 'success', actor: 'system',      actorInit: 'SY', action: 'drive.sync',        target: 'Drive / 법무',        ip: '—',           agent: 'Drive Sync',         detail: '파일 128건 동기화' },
  { id: 10, time: '2026-07-31 08:12:18', level: 'info',    actor: 'Jiyong Kim',  actorInit: 'JK', action: 'settings.update',   target: 'workspace/acme',      ip: '10.4.22.108', agent: '—',                  detail: '보존 기간 90일 → 180일' },
  { id: 11, time: '2026-07-30 18:44:31', level: 'error',   actor: 'Minji Park',  actorInit: 'MP', action: 'file.upload',       target: '실적_원본.xlsx',       ip: '10.4.19.55',  agent: '—',                  detail: '10MB를 초과합니다 (14.2MB)' },
  { id: 12, time: '2026-07-30 18:20:07', level: 'success', actor: 'system',      actorInit: 'SY', action: 'agent.run',         target: 'Weekly report agent', ip: '—',           agent: 'Weekly report',      detail: '리포트 생성 완료 · 수신자 4명' },
]

const LEVEL_META: Record<Level, { label: string; variant: 'default'|'brand'|'success'|'danger'; ko: string }> = {
  info:    { label: 'Info',    variant: 'default', ko: '정보' },
  success: { label: 'Success', variant: 'success', ko: '성공' },
  warn:    { label: 'Warning', variant: 'brand',   ko: '경고' },
  error:   { label: 'Error',   variant: 'danger',  ko: '실패' },
}

/* ── 필터 상태 ── */
const q = ref('')
const levelFilter = ref<Level | null>(null)
const actorFilter = ref<string>('전체')
const density = ref<'compact' | 'comfortable' | 'spacious'>('compact')
const loading = ref(false)
const selected = ref<Log | null>(null)
const toast = ref<{ msg: string; variant: 'success' | 'danger' } | null>(null)

const actors = ['전체', ...new Set(RAW.map((r) => r.actor))]

const rows = computed(() =>
  RAW.filter((r) => {
    if (levelFilter.value && r.level !== levelFilter.value) return false
    if (actorFilter.value !== '전체' && r.actor !== actorFilter.value) return false
    if (q.value) {
      const s = q.value.toLowerCase()
      return r.action.toLowerCase().includes(s) || r.target.toLowerCase().includes(s) ||
             r.actor.toLowerCase().includes(s) || r.detail.toLowerCase().includes(s)
    }
    return true
  }))

const counts = computed(() => ({
  all: RAW.length,
  error: RAW.filter((r) => r.level === 'error').length,
  warn: RAW.filter((r) => r.level === 'warn').length,
  success: RAW.filter((r) => r.level === 'success').length,
}))

const headers = [
  { title: '시각', key: 'time', width: 160 },
  { title: '수준', key: 'level', width: 96 },
  { title: '수행자', key: 'actor', width: 150 },
  { title: '동작', key: 'action', width: 180 },
  { title: '대상', key: 'target' },
  { title: '', key: 'more', width: 52, sortable: false },
]

function clearFilters() { q.value = ''; levelFilter.value = null; actorFilter.value = '전체' }
function simulateLoad() {
  loading.value = true
  setTimeout(() => { loading.value = false; toast.value = { msg: '로그를 새로 불러왔습니다.', variant: 'success' } }, 1200)
  setTimeout(() => { toast.value = null }, 4200)
}
function exportCsv() { toast.value = { msg: '내보내기에 실패했습니다 — 권한이 없습니다.', variant: 'danger' }; setTimeout(() => { toast.value = null }, 4000) }
</script>

<template>
  <v-app>
    <v-main :style="{ background: 'var(--bg)' }">
      <div class="wrap">

        <!-- ═══ 헤더 ═══ -->
        <div class="head">
          <div>
            <div class="crumb">Workspace / Acme Inc.</div>
            <h1>감사 로그 <span class="h1-en">Audit Log</span></h1>
          </div>
          <div class="head-actions">
            <DsButton variant="ghost" size="sm" @click="toggleTheme">
              <DsIcon :name="dark ? 'light' : 'dark'" size="sm" />{{ dark ? 'Light' : 'Dark' }}
            </DsButton>
            <DsButton variant="secondary" size="sm" @click="exportCsv"><DsIcon name="download" size="sm" />Export CSV</DsButton>
            <DsButton variant="primary" size="sm" @click="simulateLoad"><DsIcon name="refresh" size="sm" />새로고침</DsButton>
          </div>
        </div>

        <!-- ═══ 요약 카드 ═══ -->
        <div class="stats">
          <DsCard title="전체 이벤트" subtitle="최근 24시간">
            <div class="num">{{ counts.all }}</div>
          </DsCard>
          <DsCard title="실패" subtitle="조치 필요">
            <div class="num" style="color:var(--danger)">{{ counts.error }}</div>
          </DsCard>
          <DsCard title="경고" subtitle="확인 권장">
            <div class="num">{{ counts.warn }}</div>
          </DsCard>
          <DsCard title="성공" subtitle="정상 처리">
            <div class="num" style="color:var(--success)">{{ counts.success }}</div>
          </DsCard>
        </div>

        <!-- ═══ 필터 바 ═══ -->
        <div class="filters">
          <DsInput v-model="q" placeholder="동작·대상·수행자 검색…" />
          <DsSelect v-model="actorFilter" :items="actors" style="width:180px" />
          <div class="lvl-chips">
            <button
              v-for="(m, k) in LEVEL_META" :key="k"
              class="lvl-chip" :class="{ on: levelFilter === k }"
              @click="levelFilter = levelFilter === k ? null : (k as Level)"
            >
              <span class="lvl-dot" :data-lvl="k"></span>{{ m.ko }}
            </button>
          </div>
          <span style="flex:1"></span>
          <DsTooltip text="행 높이를 바꿉니다 (원칙 3 — 밀도는 선택)">
            <DsSelect v-model="density" :items="['compact', 'comfortable', 'spacious']" style="width:150px" />
          </DsTooltip>
        </div>

        <!-- 활성 필터 표시 -->
        <div v-if="q || levelFilter || actorFilter !== '전체'" class="active-filters">
          <span class="af-label">필터</span>
          <DsChip v-if="q" variant="brand" @remove="q = ''">검색: {{ q }}</DsChip>
          <DsChip v-if="levelFilter" variant="brand" @remove="levelFilter = null">수준: {{ LEVEL_META[levelFilter].ko }}</DsChip>
          <DsChip v-if="actorFilter !== '전체'" variant="brand" @remove="actorFilter = '전체'">수행자: {{ actorFilter }}</DsChip>
          <DsButton variant="ghost" size="sm" @click="clearFilters">모두 해제</DsButton>
        </div>

        <!-- ═══ 로딩 상태 ═══ -->
        <div v-if="loading" class="tbl-skel">
          <div v-for="i in 6" :key="i" class="skel-row">
            <DsSkeleton width="140px" /><DsSkeleton width="70px" />
            <DsSkeleton width="120px" /><DsSkeleton width="160px" /><DsSkeleton width="200px" />
          </div>
        </div>

        <!-- ═══ 빈 상태 ═══ -->
        <DsEmptyState
          v-else-if="!rows.length"
          title="조건에 맞는 로그가 없습니다"
          description="검색어를 바꾸거나 필터를 해제해보세요."
        >
          <DsButton variant="secondary" @click="clearFilters">필터 해제</DsButton>
        </DsEmptyState>

        <!-- ═══ 테이블 ═══ -->
        <div v-else class="tbl">
          <DsDataTable :headers="headers" :items="rows" :density="density">
            <template #item.time="{ item }">
              <span class="mono-cell">{{ (item as any).time }}</span>
            </template>

            <template #item.level="{ item }">
              <DsBadge :variant="LEVEL_META[(item as any).level as Level].variant">
                {{ LEVEL_META[(item as any).level as Level].ko }}
              </DsBadge>
            </template>

            <template #item.actor="{ item }">
              <span class="actor">
                <DsAvatar size="sm">{{ (item as any).actorInit }}</DsAvatar>
                {{ (item as any).actor }}
              </span>
            </template>

            <template #item.action="{ item }">
              <code class="code-cell">{{ (item as any).action }}</code>
            </template>

            <template #item.target="{ item }">
              <span class="target">{{ (item as any).target }}</span>
            </template>

            <template #item.more="{ item }">
              <DsMenu location="bottom end">
                <template #activator="props">
                  <button class="row-more" v-bind="props" aria-label="More"><DsIcon name="more" size="sm" /></button>
                </template>
                <div class="ds-menu-item" @click="selected = item as any">상세 보기</div>
                <div class="ds-menu-item">이 수행자로 필터</div>
                <div class="ds-menu-item">이벤트 ID 복사</div>
              </DsMenu>
            </template>
          </DsDataTable>
        </div>

        <!-- ═══ 상세 다이얼로그 ═══ -->
        <DsDialog v-model="selected" :title="selected ? `이벤트 #${selected.id}` : ''" :width="560">
          <template v-if="selected">
            <div class="kv"><span>시각</span><code>{{ selected.time }}</code></div>
            <div class="kv"><span>수준</span>
              <DsBadge :variant="LEVEL_META[selected.level].variant">{{ LEVEL_META[selected.level].ko }}</DsBadge>
            </div>
            <div class="kv"><span>수행자</span>{{ selected.actor }}</div>
            <div class="kv"><span>동작</span><code>{{ selected.action }}</code></div>
            <div class="kv"><span>대상</span>{{ selected.target }}</div>
            <div class="kv"><span>IP</span><code>{{ selected.ip }}</code></div>
            <div class="kv"><span>에이전트</span>{{ selected.agent }}</div>
            <DsDivider />
            <div class="detail-box" :data-lvl="selected.level">{{ selected.detail }}</div>
          </template>
          <template #actions>
            <DsButton variant="secondary" size="sm" @click="selected = null">닫기</DsButton>
            <DsButton variant="primary" size="sm" @click="selected = null">에이전트에게 분석 요청</DsButton>
          </template>
        </DsDialog>

        <!-- ═══ 토스트 ═══ -->
        <div v-if="toast" class="toast-slot">
          <DsToast :variant="toast.variant">{{ toast.msg }}</DsToast>
        </div>

        <!-- ═══ 에이전트 분석 패널 ═══ -->
        <h2 class="sec">에이전트 분석</h2>
        <div class="agent-box">
          <div class="chat">
            <DsChatMessage role="user" name="You">오늘 실패한 이벤트 원인 정리해줘</DsChatMessage>
            <DsChatMessage role="agent" name="Audit Agent" :streaming="true">
              <template #tools>
                <DsToolCallStep status="done">query_logs(level="error", since="24h") — 3건</DsToolCallStep>
                <DsToolCallStep status="done">group_by(cause) — 3개 원인</DsToolCallStep>
                <DsToolCallStep status="running">check_permissions("법무")</DsToolCallStep>
              </template>
              오늘 실패 3건은 서로 다른 원인입니다. ① 법무 폴더 삭제 권한 부족<DsCitationChip :index="1" />
              ② 스캔 PDF의 텍스트 레이어 부재<DsCitationChip :index="6" />
              ③ 업로드 용량 초과<DsCitationChip :index="11" />. 이 중 ①만
            </DsChatMessage>
          </div>
          <div style="margin-top:14px">
            <DsThinkingIndicator label="권한 설정을 확인하는 중…" />
          </div>
          <div style="margin-top:14px">
            <DsAgentInput placeholder="감사 로그에 대해 질문하세요…" />
          </div>
        </div>

        <!-- ═══ Vuetify 원본 컴포넌트 검증 ═══ -->
        <h2 class="sec">Vuetify 원본 컴포넌트 — defaults + theme 적용 확인</h2>
        <p class="sec-note">
          아래는 <b>감싸지 않은 Vuetify 컴포넌트를 그대로</b> 쓴 것입니다.
          <code>theme.ts</code>와 <code>defaults.ts</code>만으로 우리 스타일이 나오는지 확인하는 영역입니다.
        </p>
        <div class="agent-box">
          <div class="vrow">
            <v-btn color="primary">v-btn</v-btn>
            <v-btn variant="outlined">outlined</v-btn>
            <v-btn variant="text">text</v-btn>
            <v-chip>v-chip</v-chip>
            <v-chip color="primary">primary</v-chip>
          </div>

          <v-alert type="error" class="mt-4">
            v-alert — 권한이 없어 삭제하지 못했습니다.
          </v-alert>
          <v-alert type="warning" class="mt-2">v-alert — 월간 한도의 80%에 도달했습니다.</v-alert>
          <v-alert type="success" class="mt-2">v-alert — 파일 128건 동기화 완료.</v-alert>

          <div class="vrow mt-4">
            <v-text-field label="v-text-field" style="max-width:240px" />
            <v-select label="v-select" :items="['A', 'B']" style="max-width:180px" />
            <v-checkbox label="v-checkbox" />
            <v-switch label="v-switch" />
          </div>

          <v-tabs v-model="density" class="mt-2">
            <v-tab value="compact">compact</v-tab>
            <v-tab value="comfortable">comfortable</v-tab>
            <v-tab value="spacious">spacious</v-tab>
          </v-tabs>

          <div class="mt-4">
            <v-progress-linear model-value="62" class="mb-3" />
            <v-list style="max-width:320px">
              <v-list-subheader>보존 정책</v-list-subheader>
              <v-list-item title="90일" subtitle="기본" />
              <v-list-item title="180일" subtitle="현재 설정" active />
              <v-list-item title="365일" subtitle="엔터프라이즈" />
            </v-list>
          </div>

          <v-expansion-panels class="mt-4">
            <v-expansion-panel title="v-expansion-panel — 원본 페이로드">
              <template #text>
                <code style="font-size:12px">{ "event": "document.delete", "allowed": false }</code>
              </template>
            </v-expansion-panel>
          </v-expansion-panels>

          <div class="vrow mt-4">
            <v-pagination :length="5" :total-visible="5" />
          </div>
        </div>

        <!-- ═══ 그 외 Standalone 컴포넌트 ═══ -->
        <h2 class="sec">그 외 Standalone 컴포넌트</h2>
        <div class="agent-box">
          <DsSearchResult title="계약서_최종.pdf" path="Drive / 법무 / 2026">
            본 <mark>계약서</mark>는 2026년 7월 1일부터 효력이 발생하며…
          </DsSearchResult>
          <DsDivider />
          <DsFileGrid :files="[
            { id: '1', name: '법무', meta: '12 files', icon: 'folder' },
            { id: '2', name: '계약서_최종.pdf', meta: '2.1 MB', icon: 'document' },
            { id: '3', name: 'Q3_실적.xlsx', meta: '1.4 MB', icon: 'spreadsheet' }]" :selected="['2']">
            <template #icon="{ file }"><DsIcon :name="file.icon" size="lg" /></template>
          </DsFileGrid>
          <DsDivider />
          <DsFileRow name="계약서_최종.pdf" meta="2.1 MB · Jun 28" :selected="true">
            <template #icon><DsIcon name="document" size="sm" /></template>
          </DsFileRow>
          <DsFileRow name="Q3_실적.xlsx" meta="1.4 MB · Jul 12">
            <template #icon><DsIcon name="spreadsheet" size="sm" /></template>
          </DsFileRow>
          <DsDivider />
          <DsArtifactPanel title="audit_summary.md" copyable downloadable>
# 감사 요약 (2026-07-31)
- 실패 3건 · 경고 2건
- 반복 원인: 법무 폴더 권한</DsArtifactPanel>
          <DsDivider />
          <DsStreamingText :done="false">스트리밍 중인 텍스트</DsStreamingText>
        </div>

      </div>
    </v-main>
  </v-app>
</template>

<style>
.wrap { max-width: 1080px; margin: 0 auto; padding: 32px 24px 120px; }

.head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.crumb { font-size: 12.5px; color: var(--gray-9); }
.head h1 { font-size: 24px; font-weight: 650; letter-spacing: -.02em; color: var(--gray-12); margin-top: 4px; }
.h1-en { font-size: 14px; font-weight: 500; color: var(--gray-9); margin-left: 6px; }
.head-actions { display: flex; gap: 8px; }

.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 24px; }
.stats .num { font-size: 26px; font-weight: 650; letter-spacing: -.02em; margin-top: 10px; color: var(--gray-12); }

.filters { display: flex; align-items: flex-start; gap: 10px; margin-top: 24px; flex-wrap: wrap; }
.filters .field { width: 260px; }
.lvl-chips { display: flex; gap: 6px; }
.lvl-chip {
  all: unset; box-sizing: border-box; cursor: pointer; height: 38px; padding: 0 13px;
  display: inline-flex; align-items: center; gap: 6px;
  border: 1px solid var(--gray-6); border-radius: var(--r-lg);
  font-size: 13px; font-weight: 500; color: var(--gray-11);
  font-family: var(--font); background: var(--surface);
  transition: background .16s ease, border-color .16s ease, color .16s ease;
}
.lvl-chip:hover { background: var(--gray-2); border-color: var(--gray-8); }
.lvl-chip.on { background: var(--sel-bg); color: var(--sel-fg); border-color: var(--gray-6); }
.lvl-dot { width: 6px; height: 6px; border-radius: 50%; }
.lvl-dot[data-lvl="info"]    { background: var(--gray-8); }
.lvl-dot[data-lvl="success"] { background: var(--success); }
.lvl-dot[data-lvl="warn"]    { background: var(--brand); }
.lvl-dot[data-lvl="error"]   { background: var(--danger); }

.active-filters { display: flex; align-items: center; gap: 8px; margin-top: 14px; flex-wrap: wrap; }
.af-label { font-size: 12px; font-weight: 600; color: var(--gray-9); }

.tbl { margin-top: 18px; }
.mono-cell { font-family: var(--mono); font-size: 12.5px; color: var(--gray-11); white-space: nowrap; }
.code-cell { font-family: var(--mono); font-size: 12.5px; color: var(--brand);
  background: var(--gray-3); padding: 1px 6px; border-radius: 3px; }
.actor { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
.target { color: var(--gray-11); }
.row-more {
  all: unset; box-sizing: border-box; cursor: pointer;
  width: 26px; height: 26px; display: flex; align-items: center; justify-content: center;
  border-radius: var(--r-md); color: var(--gray-9); font-size: 15px;
}
.row-more:hover { background: var(--gray-3); color: var(--gray-12); }

.tbl-skel { margin-top: 18px; border: 1px solid var(--gray-4); border-radius: var(--r-xl); overflow: hidden; }
.skel-row { display: flex; gap: 24px; align-items: center; padding: 12px 16px; border-bottom: 1px solid var(--gray-3); }
.skel-row:last-child { border-bottom: none; }

.kv { display: flex; gap: 12px; padding: 7px 0; font-size: 13.5px; color: var(--gray-12); align-items: center; }
.kv span:first-child { width: 78px; flex-shrink: 0; color: var(--gray-10); font-size: 12.5px; }
.kv code { font-family: var(--mono); font-size: 12.5px; color: var(--gray-11); }
.detail-box { font-size: 13.5px; padding: 14px 16px; border-radius: var(--r-lg); line-height: 1.7;
  background: var(--gray-2); border-left: 3px solid var(--gray-6); color: var(--gray-11); }
.detail-box[data-lvl="error"] { border-left-color: var(--danger); }
.detail-box[data-lvl="warn"]  { border-left-color: var(--brand); }
.detail-box[data-lvl="success"] { border-left-color: var(--success); }

.toast-slot { position: fixed; right: 24px; bottom: 24px; z-index: 3000; }

.sec { font-size: 15px; font-weight: 600; color: var(--gray-12); margin: 48px 0 8px; }
.sec-note { font-size: 13px; color: var(--gray-10); margin-bottom: 14px; }
.sec-note code { font-family: var(--mono); color: var(--brand); }
.agent-box { border: 1px solid var(--gray-4); border-radius: var(--r-xl); padding: 22px; background: var(--gray-1); }
.vrow { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
.mt-2 { margin-top: 8px; } .mt-4 { margin-top: 16px; } .mb-3 { margin-bottom: 12px; }

@media (max-width: 900px) { .stats { grid-template-columns: 1fr 1fr; } }
</style>
