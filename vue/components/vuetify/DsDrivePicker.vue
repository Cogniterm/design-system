<script setup lang="ts">
// origin: wrapped — 드라이브 파일 피커 (VDialog + VTreeview 위에 DS 컴포넌트 조합).
// 왼쪽 폴더 트리 + 오른쪽 파일 목록. 검색하면 목록이 "검색 결과 뷰"로 바뀝니다.
// 데이터는 전부 props로 받습니다 (연동 시 API 응답으로 교체) — 컴포넌트는 데이터를 모릅니다.
import { computed, ref, watch } from 'vue'
import { VDialog } from 'vuetify/components'
import DsIcon from '../DsIcon.vue'
import DsBadge from '../DsBadge.vue'
import DsButton from '../DsButton.vue'
import DsFileRow from '../DsFileRow.vue'
import DsSearchField from '../DsSearchField.vue'
import DsEmptyState from '../DsEmptyState.vue'
import DsBreadcrumbs from './DsBreadcrumbs.vue'
import type { IconName } from '../../icons'

export interface DpTreeNode {
  id: string
  title: string
  path: string
  icon?: IconName
  locked?: boolean          // 열람 권한 없음 — 자물쇠로 표시, 진입 불가
  kind?: 'favorite' | 'recent'  // 가상 노드: 폴더가 아니라 모아보기(즐겨찾기·최신)
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
  favorite?: boolean        // 즐겨찾기 — 이름 우측에 별
  recentAt?: number         // 최근 열람 순서 (클수록 최신) — 최신 모아보기 정렬용
}

const props = withDefaults(defineProps<{
  tree: DpTreeNode[]
  files: DpFile[]
  title?: string
  confirmLabel?: string
}>(), { title: '드라이브에서 파일 추가', confirmLabel: '첨부' })

const open = defineModel<boolean>({ default: false })
const emit = defineEmits<{ confirm: [files: DpFile[]] }>()

// ── 확장자별 파일 아이콘 + 색 (공식 매핑) ────────────────────
// 아이콘 모양은 등록된 4종(document·spreadsheet·file·archive)으로, 유형 구분은 색으로.
const EXT_GLYPH: Record<string, { icon: IconName; color: string }> = {
  pdf:  { icon: 'document',    color: '#d6452e' },
  doc:  { icon: 'document',    color: '#3b78d8' }, docx: { icon: 'document', color: '#3b78d8' },
  hwp:  { icon: 'document',    color: '#0e8ba8' }, hwpx: { icon: 'document', color: '#0e8ba8' },
  ppt:  { icon: 'document',    color: '#e8730c' }, pptx: { icon: 'document', color: '#e8730c' },
  txt:  { icon: 'file',        color: '#6f7076' }, md:   { icon: 'file',     color: '#6f7076' },
  xls:  { icon: 'spreadsheet', color: '#2f9e44' }, xlsx: { icon: 'spreadsheet', color: '#2f9e44' },
  csv:  { icon: 'spreadsheet', color: '#12a594' },
  png:  { icon: 'file',        color: '#8250c4' }, jpg:  { icon: 'file',     color: '#8250c4' },
  jpeg: { icon: 'file',        color: '#8250c4' }, gif:  { icon: 'file',     color: '#8250c4' }, webp: { icon: 'file', color: '#8250c4' },
  zip:  { icon: 'archive',     color: '#b98900' }, rar:  { icon: 'archive',  color: '#b98900' },
}
function glyph(name: string): { icon: IconName; color: string } {
  const ext = name.includes('.') ? name.split('.').pop()!.toLowerCase() : ''
  return EXT_GLYPH[ext] ?? { icon: 'file', color: '#6f7076' }
}

// ── LNB 폭 (드래그로 조절) ─────────────────────────────────
const navWidth = ref(232)
function onResizeStart(e: MouseEvent) {
  e.preventDefault()
  const startX = e.clientX
  const startW = navWidth.value
  const move = (ev: MouseEvent) => { navWidth.value = Math.max(180, Math.min(400, startW + (ev.clientX - startX))) }
  const up = () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up) }
  window.addEventListener('mousemove', move)
  window.addEventListener('mouseup', up)
}

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
const currentKind = computed(() => currentNode.value?.kind)
const crumb = computed(() => (currentPath.value ? currentPath.value.split(' / ') : []))
const crumbItems = computed(() => crumb.value.map((seg, i) => ({ title: seg, index: i, disabled: i === crumb.value.length - 1 })))
const childFolders = computed(() => currentKind.value ? [] : (currentNode.value?.children ?? []))

// ── 필터 (MVP: 파일 유형 — 확장자 기준) ─────────────────────
const filterOpen = ref(false)
const activeTypes = ref<Set<string>>(new Set())
function extOf(name: string): string {
  return name.includes('.') ? name.split('.').pop()!.toLowerCase() : ''
}
// 실제 존재하는 확장자만, 확장자 라벨(.pdf)과 아이콘/색을 함께.
const fileTypes = computed(() => {
  const seen = new Set<string>()
  const out: { ext: string; label: string; icon: IconName; color: string }[] = []
  for (const f of props.files) {
    const e = extOf(f.name)
    if (!e || seen.has(e)) continue
    seen.add(e)
    const g = glyph(f.name)
    out.push({ ext: e, label: '.' + e, icon: g.icon, color: g.color })
  }
  return out.sort((a, b) => a.ext.localeCompare(b.ext))
})
function toggleType(ext: string) {
  const s = new Set(activeTypes.value)
  s.has(ext) ? s.delete(ext) : s.add(ext)
  activeTypes.value = s
}
const matchType = (f: DpFile) => activeTypes.value.size === 0 || activeTypes.value.has(extOf(f.name))

// 트리 아이콘: 루트는 scope 아이콘, 자물쇠면 lock, 그 외 폴더는 열림/닫힘
const isRoot = (id: string) => rootIds.value.includes(id)
function nodeIcon(n: DpTreeNode): IconName {
  if (n.locked) return 'lock'
  if (n.icon && isRoot(n.id)) return n.icon
  return n.id === currentId.value ? 'folderOpen' : 'folder'
}

// ── 자체 트리(평탄화) — VTreeview 대신. 들여쓰기·가이드선을 우리가 통제. ──
type FlatNode = { node: DpTreeNode; depth: number; hasChildren: boolean; expanded: boolean; groupTop?: boolean }
const openSet = computed(() => new Set(opened.value))
const flatTree = computed(() => {
  const out: FlatNode[] = []
  const walk = (nodes: DpTreeNode[], depth: number) => {
    for (const n of nodes) {
      const kids = n.children ?? []
      const hasChildren = kids.length > 0
      const expanded = openSet.value.has(n.id)
      // 모아보기(즐겨찾기·최신) 그룹 시작 지점에 여백 — 앞 항목이 일반 폴더일 때.
      const prev = out[out.length - 1]
      const groupTop = !!n.kind && !prev?.node.kind
      out.push({ node: n, depth, hasChildren, expanded, groupTop })
      if (hasChildren && expanded) walk(kids, depth + 1)
    }
  }
  walk(props.tree, 0)
  return out
})
function toggleExpand(id: string) {
  const s = new Set(opened.value)
  s.has(id) ? s.delete(id) : s.add(id)
  opened.value = [...s]
}
function selectNode(n: DpTreeNode) {
  activated.value = [n.id]
  if ((n.children?.length ?? 0) > 0 && !openSet.value.has(n.id)) toggleExpand(n.id)
}
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
  return props.files.filter(f => matchType(f) && (f.name + ' ' + f.path + ' ' + (f.meta ?? '')).toLowerCase().includes(q))
})

// ── 현재 뷰의 파일 목록 ────────────────────────────────────
// 폴더: 해당 경로의 파일. 즐겨찾기/최신: 여러 폴더에서 모아보기(경로를 메타로).
const browseFiles = computed(() => {
  if (currentKind.value === 'favorite') return props.files.filter(f => f.favorite && matchType(f))
  if (currentKind.value === 'recent')
    return props.files.filter(matchType).filter(f => f.recentAt != null)
      .sort((a, b) => (b.recentAt ?? 0) - (a.recentAt ?? 0))
  return props.files.filter(f => f.path === currentPath.value && matchType(f))
})
// 모아보기에서는 파일이 어느 폴더인지 보이도록 경로를 메타로 사용.
const aggregated = computed(() => !!currentKind.value)

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
  activeTypes.value = new Set()
  filterOpen.value = false
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
        <button type="button" class="dp-close" aria-label="닫기" @click="close"><DsIcon name="close" size="md" /></button>
      </div>

      <!-- 본문: 좌 트리 + 우 목록 -->
      <div class="dp-body">
        <nav class="dp-nav cog-tree" aria-label="폴더 트리" role="tree" :style="{ flex: `0 0 ${navWidth}px`, width: navWidth + 'px' }">
          <button
            v-for="item in flatTree" :key="item.node.id" type="button"
            class="cog-tree__row" :class="{ 'is-active': item.node.id === currentId, 'is-group-top': item.groupTop }"
            role="treeitem" :aria-expanded="item.hasChildren ? item.expanded : undefined"
            :aria-selected="item.node.id === currentId"
            @click="selectNode(item.node)"
          >
            <span v-for="i in item.depth" :key="i" class="cog-tree__guide" aria-hidden="true" />
            <span class="cog-tree__chev" @click.stop="item.hasChildren && toggleExpand(item.node.id)">
              <DsIcon v-if="item.hasChildren" :name="item.expanded ? 'expand' : 'collapse'" size="sm" />
            </span>
            <DsIcon :name="nodeIcon(item.node)" size="sm" class="cog-tree__icon" />
            <span class="cog-tree__label">{{ item.node.title }}</span>
          </button>
        </nav>
        <div class="dp-resizer" role="separator" aria-label="LNB 폭 조절" @mousedown="onResizeStart" />

        <div class="dp-main">
          <div class="dp-search">
            <DsSearchField v-model="query" placeholder="찾는 파일 이름을 입력하세요 (예: 계약서, 보고서)" />
            <div class="dp-filter">
              <button
                type="button" class="dp-filter-btn" :class="{ 'is-on': activeTypes.size }"
                aria-label="파일 유형 필터" title="파일 유형 필터" @click="filterOpen = !filterOpen"
              >
                <DsIcon name="filter" size="sm" />
                <span v-if="activeTypes.size" class="dp-filter-badge">{{ activeTypes.size }}</span>
              </button>
              <div v-if="filterOpen" class="dp-filter-scrim" @click="filterOpen = false" />
              <div v-if="filterOpen" class="dp-filter-panel" role="dialog" aria-label="파일 유형 필터">
                <div class="dp-filter-head">파일 유형</div>
                <label v-for="t in fileTypes" :key="t.ext" class="dp-filter-opt">
                  <input type="checkbox" :checked="activeTypes.has(t.ext)" @change="toggleType(t.ext)" />
                  <DsIcon :name="t.icon" size="sm" class="dp-filter-ico" :style="{ color: t.color }" />
                  <span>{{ t.label }}</span>
                </label>
                <button v-if="activeTypes.size" type="button" class="dp-filter-clear" @click="activeTypes = new Set()">모두 해제</button>
              </div>
            </div>
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
                <template #icon><DsIcon :name="glyph(f.name).icon" size="sm" :style="{ color: glyph(f.name).color }" /></template>
                <template v-if="f.favorite" #afterName>
                  <DsIcon name="favorite" size="sm" class="dp-star" aria-label="즐겨찾기" />
                </template>
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
            <DsBreadcrumbs class="dp-crumb" :items="crumbItems" @select="gotoCrumb" />
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
                :name="f.name" :meta="aggregated ? f.path : f.meta" checkbox
                :selected="isSel(f.id)" :disabled="f.disabled"
                :title="f.disabled ? f.disabledReason : undefined"
                @select="toggle(f)"
              >
                <template #icon><DsIcon :name="glyph(f.name).icon" size="sm" :style="{ color: glyph(f.name).color }" /></template>
                <template v-if="f.favorite" #afterName>
                  <DsIcon name="favorite" size="sm" class="dp-star" aria-label="즐겨찾기" />
                </template>
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
        <button type="button" class="dp-cab-clear" aria-label="선택 해제" title="선택 해제" @click="selected = new Set()"><DsIcon name="close" size="sm" /></button>
        <span class="dp-spacer" />
        <DsButton variant="primary" size="sm" @click="confirm">{{ selected.size }}개 {{ confirmLabel }}</DsButton>
      </div>
    </div>
  </VDialog>
</template>
