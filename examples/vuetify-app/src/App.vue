<script setup lang="ts">
import { ref } from 'vue'
// ① Standalone 컴포넌트 — Vuetify를 import 하지 않는 것들
import {
  DsButton, DsInput, DsBadge, DsChip, DsAvatar, DsCard, DsDivider,
  DsSkeleton, DsToast, DsEmptyState, DsChatMessage, DsStreamingText,
  DsThinkingIndicator, DsToolCallStep, DsAgentInput, DsCitationChip,
  DsArtifactPanel, DsSearchResult, DsFileGrid, DsFileRow,
} from '~/design'
// ② Vuetify 기반 컴포넌트
import { DsDataTable, DsDialog, DsMenu, DsTooltip, DsSelect } from '~/design/vuetify'

const dark = ref(false)
function toggle() {
  dark.value = !dark.value
  document.documentElement.setAttribute('data-theme', dark.value ? 'dark' : 'light')
}

const name = ref('Acme Inc.')
const email = ref('ujin@')
const draft = ref('')
const status = ref('Running')
const dialogOpen = ref(false)

const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Status', key: 'status' },
  { title: 'Owner', key: 'owner' },
]
const rows = [
  { name: 'Weekly report agent', status: 'brand', label: 'Running', owner: 'Jiyong Kim' },
  { name: 'Invoice classifier', status: 'success', label: 'Completed', owner: 'Minji Park' },
  { name: 'Drive sync', status: 'danger', label: 'Failed', owner: 'Jiyong Kim' },
]
const files = [
  { id: '1', name: '법무', meta: '12 files', icon: '📁' },
  { id: '2', name: '계약서_최종.pdf', meta: '2.1 MB', icon: '📄' },
  { id: '3', name: 'Q3_실적.xlsx', meta: '1.4 MB', icon: '📊' },
]
</script>

<template>
  <v-app>
    <v-main style="background: var(--bg)">
      <div style="max-width: 880px; margin: 0 auto; padding: 40px 24px 120px">

        <div style="display:flex;align-items:center;gap:12px">
          <h1 style="font-size:22px;font-weight:650;letter-spacing:-.02em;color:var(--gray-12)">
            Vuetify 3.11.6 호환 검증
          </h1>
          <DsButton variant="secondary" size="sm" @click="toggle">
            {{ dark ? '☀ Light' : '☾ Dark' }}
          </DsButton>
        </div>
        <p style="color:var(--gray-11);font-size:14px;margin-top:8px">
          이 페이지 전체가 <code>&lt;v-app&gt;</code> 안에서 렌더됩니다.
          Vuetify 전역 스타일(<code>vuetify/styles</code>)이 로드된 상태입니다.
        </p>

        <!-- ═══ 1. Vuetify 원본과 나란히 ═══ -->
        <h2 class="sec">1. Vuetify 원본 컴포넌트와 나란히</h2>
        <div class="demo">
          <div class="row">
            <v-btn color="primary">Vuetify VBtn</v-btn>
            <DsButton variant="primary">Ds Button</DsButton>
            <v-chip>Vuetify VChip</v-chip>
            <DsChip>Ds Chip</DsChip>
          </div>
          <p class="note">
            같은 화면·같은 부모 안에서 둘 다 자기 스타일을 유지하면 충돌이 없다는 뜻입니다.
          </p>
        </div>

        <!-- ═══ 2. Vuetify 컴포넌트 안에 우리 컴포넌트 ═══ -->
        <h2 class="sec">2. Vuetify 컴포넌트 <b>안에</b> 우리 컴포넌트 넣기</h2>
        <div class="demo">
          <v-card class="pa-4" style="max-width:420px">
            <div style="font-size:13px;font-weight:600;margin-bottom:10px;color:var(--gray-12)">
              VCard 내부입니다
            </div>
            <DsBadge variant="brand">Running</DsBadge>
            <DsBadge variant="success" style="margin-left:6px">Completed</DsBadge>
            <DsDivider />
            <DsInput v-model="name" label="Workspace name" hint="VCard 안의 Ds Input" />
            <div style="margin-top:12px">
              <DsButton variant="primary" size="sm">Save</DsButton>
            </div>
          </v-card>
          <p class="note">
            Vuetify가 자식 요소에 거는 전역 리셋(<code>.v-card *</code> 등)의 영향을
            <code>all: unset</code>이 차단합니다.
          </p>
        </div>

        <!-- ═══ 3. Vuetify 기반 컴포넌트 ═══ -->
        <h2 class="sec">3. Vuetify 기반 컴포넌트 (VDataTable · VDialog · VMenu · VTooltip · VSelect)</h2>
        <div class="demo">
          <DsDataTable :headers="headers" :items="rows" density="compact">
            <template #item.status="{ item }">
              <DsBadge :variant="(item as any).status">{{ (item as any).label }}</DsBadge>
            </template>
          </DsDataTable>

          <div class="row" style="margin-top:20px">
            <DsSelect v-model="status" label="Status" :items="['Draft', 'Running', 'Completed']" />
          </div>

          <div class="row" style="margin-top:20px">
            <DsMenu location="bottom start">
              <template #activator="props">
                <DsButton variant="secondary" v-bind="props">More ▾</DsButton>
              </template>
              <div class="ds-menu-item">이름 바꾸기</div>
              <div class="ds-menu-item">복제</div>
              <div class="ds-menu-item" style="color:var(--danger)">삭제</div>
            </DsMenu>

            <DsTooltip text="Vuetify VTooltip 기반">
              <DsButton variant="ghost">Hover me</DsButton>
            </DsTooltip>

            <DsButton variant="danger" @click="dialogOpen = true">Open Dialog</DsButton>
          </div>

          <DsDialog v-model="dialogOpen" title="에이전트를 삭제할까요?">
            이 작업은 되돌릴 수 없습니다. 연결된 실행 기록 128건도 함께 삭제됩니다.
            <template #actions>
              <DsButton variant="secondary" size="sm" @click="dialogOpen = false">Cancel</DsButton>
              <DsButton variant="danger" size="sm" @click="dialogOpen = false">Delete</DsButton>
            </template>
          </DsDialog>
          <p class="note">
            동작(정렬·포커스 트랩·포지셔닝)은 Vuetify가, 생김새는 우리가 담당합니다.
          </p>
        </div>

        <!-- ═══ 4. 에이전트 컴포넌트 ═══ -->
        <h2 class="sec">4. 에이전트 전용 컴포넌트 (Vuetify에 없는 것들)</h2>
        <div class="demo">
          <div class="chat">
            <DsChatMessage role="user" name="You">지난달 계약서 파일 찾아서 요약해줘</DsChatMessage>
            <DsChatMessage role="agent" name="Agent" :streaming="true">
              <template #tools>
                <DsToolCallStep status="done">search_drive("계약서", June) — 3 files found</DsToolCallStep>
                <DsToolCallStep status="running">read_document("계약서_최종.pdf")</DsToolCallStep>
              </template>
              6월에 체결된 계약서 3건을 찾았습니다. 그중 최종본<DsCitationChip :index="1" />의 핵심 조항은
            </DsChatMessage>
          </div>
          <div style="margin-top:16px">
            <DsThinkingIndicator label="계약서 조항을 분석하는 중…" />
          </div>
          <div style="margin-top:16px;max-width:560px">
            <DsAgentInput v-model="draft" />
          </div>
          <div style="margin-top:16px;max-width:560px">
            <DsArtifactPanel title="summary_report.md" copyable downloadable>
# 6월 계약서 요약
- 계약 기간: 12개월 (자동 갱신)
- 해지 조건: 90일 전 서면 통보</DsArtifactPanel>
          </div>
        </div>

        <!-- ═══ 5. 나머지 ═══ -->
        <h2 class="sec">5. 나머지 Standalone 컴포넌트</h2>
        <div class="demo">
          <div class="row">
            <DsAvatar size="sm">JK</DsAvatar>
            <DsAvatar>JK</DsAvatar>
            <DsAvatar variant="brand">A</DsAvatar>
          </div>
          <DsDivider />
          <div class="row">
            <DsSkeleton variant="circle" width="32px" height="32px" />
            <DsSkeleton width="200px" />
          </div>
          <DsDivider />
          <div class="row" style="flex-direction:column;align-items:flex-start">
            <DsToast variant="success" action="View">에이전트가 생성되었습니다.</DsToast>
            <DsToast variant="danger" action="Retry">파일 업로드에 실패했습니다 — 10MB를 초과합니다.</DsToast>
          </div>
          <DsDivider />
          <DsInput v-model="email" label="Email" error="올바른 이메일 주소를 입력하세요." />
          <DsDivider />
          <DsSearchResult title="계약서_최종.pdf" path="Drive / 법무 / 2026">
            본 <mark>계약서</mark>는 2026년 7월 1일부터 효력이 발생하며…
          </DsSearchResult>
          <DsDivider />
          <DsFileGrid :files="files" :selected="['2']" />
          <DsDivider />
          <DsFileRow v-for="f in files" :key="f.id" :name="f.name" :meta="f.meta" :icon="f.icon" />
          <DsDivider />
          <DsCard title="Tasks automated" subtitle="Last 30 days">
            <div class="num">1,284<span class="delta">+12.4%</span></div>
          </DsCard>
          <DsDivider />
          <DsEmptyState title="No agents yet" description="첫 에이전트를 만들어 업무 자동화를 시작하세요.">
            <DsButton>New agent</DsButton>
          </DsEmptyState>
          <DsDivider />
          <DsStreamingText :done="false">스트리밍 중인 텍스트</DsStreamingText>
        </div>

      </div>
    </v-main>
  </v-app>
</template>

<style>
.sec { font-size: 15px; font-weight: 600; color: var(--gray-12); margin: 40px 0 12px; }
.demo { border: 1px solid var(--gray-4); border-radius: var(--r-lg); padding: 24px; background: var(--gray-1); }
.demo .row { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
.note { font-size: 12.5px; color: var(--gray-9); margin-top: 14px; }
.note code { font-family: var(--mono); color: var(--brand); }
</style>
