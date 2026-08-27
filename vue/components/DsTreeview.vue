<script setup lang="ts" generic="T extends DsTreeNode">
// origin: custom — VTreeview를 버리고 직접 제작 (파일 피커에서 확정한 평탄화 렌더).
// 이유: VTreeview는 들여쓰기·가이드선·행 높이(30px)를 우리 규격으로 통제하기 어렵고,
// 깊이별 세로 가이드선을 그릴 방법이 없습니다. 평탄화 렌더는 깊이만큼
// 가이드 셀을 앞에 붙여 들여쓰기와 연결선을 동시에 해결합니다.
//
// 2026-08-26 보완 (AI 드라이브 트리를 reka-ui에서 옮겨 오면서):
//   1. **키보드 탐색을 실제로 구현**했습니다. 스펙(components/treeview.txt)은 ↑↓ ←→ Enter
//      Home/End 를 약속하고 있었는데 구현이 없어서, 트리를 쓰려면 헤드리스 라이브러리를
//      따로 붙여야 했습니다. roving tabindex + 화살표 이동으로 채웠습니다.
//   2. `#append`(행 끝 — 컨텍스트 메뉴 등), `#prepend`에 depth·hasChildren 추가
//   3. `getChildren`(권한 필터 등으로 자식을 걸러야 하는 경우), `rowClass`, 드래그 이벤트
//   4. `expandOnSelect=false` — 행 클릭은 선택만 하고 펼침은 셰브런이 담당하는 화면용
// ⚠ 이 보완은 design-system 저장소 원본에는 아직 없습니다. DS를 다시 동기화하면 덮여요.
import { computed, ref } from 'vue'
import DsIcon from './DsIcon.vue'
import type { IconName } from '../icons'

export interface DsTreeNode {
  id: string | number
  title?: string
  /** title 대신 label을 쓰는 데이터도 받습니다 */
  label?: string
  icon?: IconName
  locked?: boolean
  children?: DsTreeNode[]
  [k: string]: any
}

const props = withDefaults(defineProps<{
  items: T[]
  /** 자식을 걸러서 내려줄 때 (권한 없는 폴더 숨김 등). 빈 배열/undefined면 리프 */
  getChildren?: (n: T) => T[] | undefined
  /** 행에 덧붙일 클래스 — 선택·비활성·드롭 하이라이트 같은 화면 고유 상태 */
  rowClass?: (n: T, ctx: { depth: number; expanded: boolean; hasChildren: boolean }) => unknown
  ariaLabel?: string
  /** 기본 true — 선택하면 자식이 있는 노드는 함께 펼칩니다.
      false면 펼침은 셰브런만 담당합니다 (행 클릭 = 선택 전용) */
  expandOnSelect?: boolean
}>(), { expandOnSelect: true })

const emit = defineEmits<{
  (e: 'select', node: T): void
  (e: 'row-dragover', ev: DragEvent, node: T, ctx: { expanded: boolean; hasChildren: boolean }): void
  (e: 'row-dragleave', ev: DragEvent, node: T): void
  (e: 'row-drop', ev: DragEvent, node: T): void
}>()

const model = defineModel<Array<string | number>>({ default: () => [] })            // 활성(선택) 노드 id
const opened = defineModel<Array<string | number>>('opened', { default: () => [] }) // 펼쳐진 노드 id

type Flat = { node: T; depth: number; hasChildren: boolean; expanded: boolean }
const openSet = computed(() => new Set(opened.value))
// children 은 인터페이스상 DsTreeNode[] 라 T[] 로 좁혀 준다 (같은 트리의 노드이므로 안전)
const childrenOf = (n: T): T[] | undefined =>
  props.getChildren ? props.getChildren(n) : (n.children as T[] | undefined)
const titleOf = (n: T) => n.title ?? n.label ?? ''

const flat = computed(() => {
  const out: Flat[] = []
  const walk = (nodes: T[], depth: number) => {
    for (const n of nodes) {
      const kids = childrenOf(n) ?? []
      const expanded = openSet.value.has(n.id)
      out.push({ node: n, depth, hasChildren: kids.length > 0, expanded })
      if (kids.length && expanded) walk(kids, depth + 1)
    }
  }
  walk(props.items, 0)
  return out
})
const activeId = computed(() => model.value?.[0])

function nodeIcon(item: Flat): IconName {
  if (item.node.locked) return 'lock'
  if (item.node.icon) return item.node.icon
  return item.node.id === activeId.value || item.expanded ? 'folderOpen' : 'folder'
}
function setExpanded(id: string | number, on: boolean) {
  const s = new Set(opened.value)
  on ? s.add(id) : s.delete(id)
  opened.value = [...s]
}
function toggleExpand(id: string | number) {
  setExpanded(id, !openSet.value.has(id))
}
function select(n: T) {
  model.value = [n.id]
  emit('select', n)
  if (props.expandOnSelect && (childrenOf(n)?.length ?? 0) > 0 && !openSet.value.has(n.id)) toggleExpand(n.id)
}

/* ── 키보드 탐색 ──────────────────────────────────────────────
   트리는 항목 하나만 Tab 순서에 두고(roving tabindex) 안에서는 화살표로 옮깁니다.
   목록마다 Tab을 수십 번 눌러야 빠져나가는 것을 막는 표준 패턴입니다. */
const rootRef = ref<HTMLElement | null>(null)
const focusIdx = ref(0)

function rows(): HTMLElement[] {
  return Array.from(rootRef.value?.querySelectorAll<HTMLElement>('[data-tree-row]') ?? [])
}
function focusAt(i: number) {
  const list = rows()
  if (!list.length) return
  const idx = Math.max(0, Math.min(i, list.length - 1))
  focusIdx.value = idx
  list[idx].focus()
}
function onKeydown(e: KeyboardEvent) {
  const list = flat.value
  const i = focusIdx.value
  const cur = list[i]
  switch (e.key) {
    case 'ArrowDown': e.preventDefault(); focusAt(i + 1); break
    case 'ArrowUp': e.preventDefault(); focusAt(i - 1); break
    case 'Home': e.preventDefault(); focusAt(0); break
    case 'End': e.preventDefault(); focusAt(list.length - 1); break
    case 'ArrowRight':
      if (!cur) return
      e.preventDefault()
      // 접혀 있으면 펴고, 이미 펴져 있으면 첫 자식으로
      if (cur.hasChildren && !cur.expanded) setExpanded(cur.node.id, true)
      else if (cur.hasChildren) focusAt(i + 1)
      break
    case 'ArrowLeft': {
      if (!cur) return
      e.preventDefault()
      // 펴져 있으면 접고, 아니면 부모로 (앞쪽에서 depth가 한 단 낮은 첫 항목)
      if (cur.hasChildren && cur.expanded) { setExpanded(cur.node.id, false); break }
      for (let k = i - 1; k >= 0; k--) if (list[k].depth < cur.depth) { focusAt(k); break }
      break
    }
    case 'Enter':
    case ' ':
      if (!cur) return
      e.preventDefault(); select(cur.node); break
  }
}
// 마우스로 다른 행을 눌러도 roving 기준점을 옮겨 둡니다
function onRowFocus(i: number) { focusIdx.value = i }
</script>

<template>
  <div
    ref="rootRef" class="cog-tree" role="tree" :aria-label="ariaLabel"
    @keydown="onKeydown"
  >
    <button
      v-for="(item, i) in flat" :key="item.node.id" type="button"
      data-tree-row
      class="cog-tree__row"
      :class="[{ 'is-active': item.node.id === activeId },
               rowClass?.(item.node, { depth: item.depth, expanded: item.expanded, hasChildren: item.hasChildren })]"
      role="treeitem" :aria-expanded="item.hasChildren ? item.expanded : undefined"
      :aria-selected="item.node.id === activeId"
      :aria-level="item.depth + 1"
      :tabindex="i === focusIdx ? 0 : -1"
      @focus="onRowFocus(i)"
      @click="select(item.node)"
      @dragover="(e) => emit('row-dragover', e, item.node, { expanded: item.expanded, hasChildren: item.hasChildren })"
      @dragleave="(e) => emit('row-dragleave', e, item.node)"
      @drop="(e) => emit('row-drop', e, item.node)"
    >
      <span v-for="d in item.depth" :key="d" class="cog-tree__guide" aria-hidden="true" />
      <span
        class="cog-tree__chev"
        :aria-label="item.hasChildren ? `${titleOf(item.node)} ${item.expanded ? '접기' : '펼치기'}` : undefined"
        @click.stop="item.hasChildren && toggleExpand(item.node.id)"
      >
        <DsIcon v-if="item.hasChildren" :name="item.expanded ? 'expand' : 'collapse'" size="sm" />
      </span>
      <!-- #prepend로 노드 아이콘을 바꿀 수 있음. 기본: 폴더(열림/닫힘)·자물쇠 -->
      <slot
        name="prepend" :item="item.node" :expanded="item.expanded"
        :depth="item.depth" :has-children="item.hasChildren"
      >
        <DsIcon :name="nodeIcon(item)" size="sm" class="cog-tree__icon" />
      </slot>
      <span class="cog-tree__label">{{ titleOf(item.node) }}</span>
      <!-- #append로 행 끝에 컨텍스트 메뉴·배지 등을 붙입니다 -->
      <slot
        name="append" :item="item.node" :expanded="item.expanded"
        :depth="item.depth" :has-children="item.hasChildren"
      />
    </button>
  </div>
</template>
