<script setup lang="ts">
// origin: wrapped — 드라이브 파일 피커 (VDialog + VTreeview 위에 DS 컴포넌트 조합).
// 왼쪽 폴더 트리 + 오른쪽 파일 목록. 검색하면 목록이 "검색 결과 뷰"로 바뀝니다.
// 데이터는 전부 props로 받습니다 (연동 시 API 응답으로 교체) — 컴포넌트는 데이터를 모릅니다.
import { computed, ref, watch } from 'vue'
import { VDialog, VTreeview } from 'vuetify/components'
import DsIcon from '../DsIcon.vue'
import DsBadge from '../DsBadge.vue'
import DsButton from '../DsButton.vue'
import DsFileRow from '../DsFileRow.vue'
import DsSearchField from '../DsSearchField.vue'
import DsEmptyState from '../DsEmptyState.vue'
import type { IconName } from '../../icons'

export interface DpTreeNode {
  id: string
  title: string
  path: string
  icon?: IconName
  locked?: boolean          // 열람 권한 없음 — 자물쇠로 표시, 진입 불가
  children?: DpTreeNode[]
}
export interface DpBadge { text: string; variant?: 'default' | 'brand' | 'success' | 'warning' | 'danger'; title?: string }
export interface DpFile {
  id: string
  name: string
  path: string              // 어느 폴더에 있는지 (트리 노드 path와 매칭)
  icon?: IconName
  meta?: string             // 우측 메타 (예: '2.4MB · 07.03')
  badge?: DpBadge           // 우측 배지 (예: CSO 등급)
  disabled?: boolean        // 선택 불가 (권한·정책)
  disabledReason?: string   // 불가 사유 (title 툴팁)
}

const props = withDefaults(defineProps<{
  tree: DpTreeNode[]
  files: DpFile[]
  title?: string
  confirmLabel?: string
}>(), { title: '드라이브에서 파일 추가', confirmLabel: '첨부' })

const open = defineModel<boolean>({ default: false })
const emit = defineEmits<{ confirm: [files: DpFile[]] }>()

// ── 트리 상태 ──────────────────────────────────────────────
const rootIds = computed(() => props.tree.map(n => n.id))
const activated = ref<string[]>([props.tree[0]?.id].filter(Boolean) as string[])
const opened = ref<string[]>(rootIds.value.slice())
const currentId = computed(() => activated.value[0] ?? props.tree[0]?.id)

function findNode(nodes: DpTreeNode[], id?: string): DpTreeNode | null {
  if (!id) return null
  for (const n of nodes) {
    if (n.id === id) return n
    if (n.children) { const hit = findNode(n.children, id); if (hit) return hit }
  }
  return null
}
const currentNode = computed(() => findNode(props.tree, currentId.value))
const currentPath = computed(() => currentNode.value?.path ?? '')
const crumb = computed(() => (currentPath.value ? currentPath.value.split(' / ') : []))
const childFolders = computed(() => currentNode.value?.children ?? [])
const browseFiles = computed(() => props.files.filter(f => f.path === currentPath.value))

// 트리 아이콘: 루트는 scope 아이콘, 자물쇠면 lock, 그 외 폴더는 열림/닫힘
const isRoot = (id: string) => rootIds.value.includes(id)
function nodeIcon(n: DpTreeNode): IconName {
  if (n.locked) return 'lock'
  if (n.icon && isRoot(n.id)) return n.icon
  return n.id === currentId.value ? 'folderOpen' : 'folder'
}
const raw = (x: unknown): DpTreeNode => ((x as { raw?: DpTreeNode })?.raw ?? x) as DpTreeNode
function gotoCrumb(i: number) {
  const prefix = crumb.value.slice(0, i + 1).join(' / ')
  const hit = (function walk(nodes: DpTreeNode[]): DpTreeNode | null {
    for (const n of nodes) { if (n.path === prefix) return n; if (n.children) { const h = walk(n.children); if (h) return h } }
    return null
  })(props.tree)
  if (hit) activated.value = [hit.id]
}

// ── 검색 ──────────────────────────────────────────────────
const query = ref('')
const searching = computed(() => query.value.trim().length > 0)
const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return []
  return props.files.filter(f => (f.name + ' ' + f.path + ' ' + (f.meta ?? '')).toLowerCase().includes(q))
})

// ── 선택 ──────────────────────────────────────────────────
const selected = ref<Set<string>>(new Set())
const isSel = (id: string) => selected.value.has(id)
function toggle(f: DpFile) {
  if (f.disabled) return
  const next = new Set(selected.value)
  next.has(f.id) ? next.delete(f.id) : next.add(f.id)
  selected.value = next
}
function reset() {
  query.value = ''
  selected.value = new Set()
  activated.value = [props.tree[0]?.id].filter(Boolean) as string[]
  opened.value = rootIds.value.slice()
}
function close() { open.value = false }
function confirm() {
  const picked = props.files.filter(f => selected.value.has(f.id))
  if (picked.length) emit('confirm', picked)
  close()
}
watch(open, (o) => { if (!o) reset() })
</script>

<template>
  <VDialog v-model="open" width="980" class="ds-vdialog" content-class="ds-drivepicker-content">
    <div class="ds-drivepicker" role="dialog" :aria-label="title">
      <!-- 헤더 -->
      <div class="dp-head">
        <DsIcon name="drive" size="sm" class="dp-head-icon" />
        <h2 class="dp-title">{{ title }}</h2>
        <button type="button" class="dp-close" aria-label="닫기" @click="close"><DsIcon name="close" size="sm" /></button>
      </div>

      <!-- 본문: 좌 트리 + 우 목록 -->
      <div class="dp-body">
        <nav class="dp-nav" aria-label="폴더 트리">
          <VTreeview
            v-model:activated="activated" v-model:opened="opened"
            :items="tree" item-value="id" item-title="title"
            activatable density="compact" class="ds-treeview dp-tree"
          >
            <template #prepend="{ item }">
              <DsIcon :name="nodeIcon(raw(item))" size="sm" class="dp-tree-icon" />
            </template>
          </VTreeview>
        </nav>

        <div class="dp-main">
          <div class="dp-search">
            <DsSearchField v-model="query" placeholder="드라이브 전체에서 검색 — 파일명·경로" />
          </div>

          <!-- 검색 결과 뷰 -->
          <template v-if="searching">
            <div class="dp-count">
              검색 결과 <b>{{ results.length }}</b>건<span v-if="results.length"> · “{{ query.trim() }}”</span>
            </div>
            <div v-if="results.length" class="dp-list" role="listbox" aria-label="검색 결과">
              <DsFileRow
                v-for="f in results" :key="f.id"
                :name="f.name" :meta="f.path" checkbox
                :selected="isSel(f.id)" :disabled="f.disabled"
                :title="f.disabled ? f.disabledReason : undefined"
                @select="toggle(f)"
              >
                <template #icon><DsIcon :name="f.icon || 'file'" size="sm" /></template>
                <template v-if="f.badge" #trailing>
                  <DsBadge :variant="f.badge.variant" :title="f.badge.title">{{ f.badge.text }}</DsBadge>
                </template>
              </DsFileRow>
            </div>
            <div v-else class="dp-empty">
              <DsEmptyState title="검색 결과가 없습니다" description="다른 파일명이나 폴더 이름으로 검색해 보세요." />
            </div>
          </template>

          <!-- 폴더 탐색 뷰 -->
          <template v-else>
            <nav class="dp-crumb" aria-label="현재 위치">
              <template v-for="(seg, i) in crumb" :key="i">
                <DsIcon v-if="i > 0" name="forward" size="sm" class="dp-crumb-sep" />
                <button v-if="i < crumb.length - 1" type="button" class="dp-crumb-btn" @click="gotoCrumb(i)">{{ seg }}</button>
                <span v-else class="dp-crumb-cur">{{ seg }}</span>
              </template>
            </nav>
            <div v-if="childFolders.length + browseFiles.length" class="dp-list" role="listbox" aria-label="파일 목록">
              <!-- 하위 폴더 -->
              <DsFileRow
                v-for="c in childFolders" :key="c.id"
                :name="c.title" meta="폴더"
                @select="activated = [c.id]"
              >
                <template #icon><DsIcon :name="c.locked ? 'lock' : 'folder'" size="sm" /></template>
              </DsFileRow>
              <!-- 파일 -->
              <DsFileRow
                v-for="f in browseFiles" :key="f.id"
                :name="f.name" :meta="f.meta" checkbox
                :selected="isSel(f.id)" :disabled="f.disabled"
                :title="f.disabled ? f.disabledReason : undefined"
                @select="toggle(f)"
              >
                <template #icon><DsIcon :name="f.icon || 'file'" size="sm" /></template>
                <template v-if="f.badge" #trailing>
                  <DsBadge :variant="f.badge.variant" :title="f.badge.title">{{ f.badge.text }}</DsBadge>
                </template>
              </DsFileRow>
            </div>
            <div v-else class="dp-empty">
              <DsEmptyState title="이 위치에 항목이 없습니다" description="다른 폴더를 선택하거나 위에서 검색해 보세요." />
            </div>
          </template>
        </div>
      </div>

      <!-- 선택 액션 바 -->
      <div v-if="selected.size" class="dp-cab">
        <button type="button" class="dp-cab-clear" @click="selected = new Set()">선택 해제</button>
        <span class="dp-cab-count">{{ selected.size }}개 선택됨</span>
        <span class="dp-spacer" />
        <DsButton variant="primary" @click="confirm">{{ selected.size }}개 {{ confirmLabel }}</DsButton>
      </div>
    </div>
  </VDialog>
</template>
