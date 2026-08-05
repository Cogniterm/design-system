<script setup lang="ts">
// origin: custom — VTreeview를 버리고 직접 제작 (파일 피커에서 확정한 평탄화 렌더).
// 이유: VTreeview는 들여쓰기·가이드선·행 높이(30px)를 우리 규격으로 통제하기 어렵고,
// 깊이별 세로 가이드선을 그릴 방법이 없습니다. 평탄화 렌더는 깊이만큼
// 가이드 셀을 앞에 붙여 들여쓰기와 연결선을 동시에 해결합니다.
import { computed } from 'vue'
import DsIcon from './DsIcon.vue'
import type { IconName } from '../icons'

export interface DsTreeNode {
  id: string | number
  title: string
  icon?: IconName
  locked?: boolean
  children?: DsTreeNode[]
}

const props = defineProps<{ items: DsTreeNode[] }>()
const model = defineModel<Array<string | number>>({ default: () => [] })            // 활성(선택) 노드 id
const opened = defineModel<Array<string | number>>('opened', { default: () => [] }) // 펼쳐진 노드 id

type Flat = { node: DsTreeNode; depth: number; hasChildren: boolean; expanded: boolean }
const openSet = computed(() => new Set(opened.value))
const flat = computed(() => {
  const out: Flat[] = []
  const walk = (nodes: DsTreeNode[], depth: number) => {
    for (const n of nodes) {
      const kids = n.children ?? []
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
function toggleExpand(id: string | number) {
  const s = new Set(opened.value)
  s.has(id) ? s.delete(id) : s.add(id)
  opened.value = [...s]
}
function select(n: DsTreeNode) {
  model.value = [n.id]
  if ((n.children?.length ?? 0) > 0 && !openSet.value.has(n.id)) toggleExpand(n.id)
}
</script>

<template>
  <div class="cog-tree" role="tree">
    <button
      v-for="item in flat" :key="item.node.id" type="button"
      class="cog-tree__row" :class="{ 'is-active': item.node.id === activeId }"
      role="treeitem" :aria-expanded="item.hasChildren ? item.expanded : undefined"
      :aria-selected="item.node.id === activeId"
      @click="select(item.node)"
    >
      <span v-for="i in item.depth" :key="i" class="cog-tree__guide" aria-hidden="true" />
      <span class="cog-tree__chev" @click.stop="item.hasChildren && toggleExpand(item.node.id)">
        <DsIcon v-if="item.hasChildren" :name="item.expanded ? 'expand' : 'collapse'" size="sm" />
      </span>
      <!-- #prepend로 노드 아이콘을 바꿀 수 있음. 기본: 폴더(열림/닫힘)·자물쇠 -->
      <slot name="prepend" :item="item.node" :expanded="item.expanded">
        <DsIcon :name="nodeIcon(item)" size="sm" class="cog-tree__icon" />
      </slot>
      <span class="cog-tree__label">{{ item.node.title }}</span>
    </button>
  </div>
</template>
