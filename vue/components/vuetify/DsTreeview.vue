<script setup lang="ts">
// origin: wrapped — VTreeview 기반
// 어디에: 드라이브 폴더 트리, 문서 목차, 조직도
// #prepend 슬롯으로 노드마다 아이콘을 넣을 수 있고, opened로 펼침 상태를 제어합니다.
import { VTreeview } from 'vuetify/components'
withDefaults(defineProps<{
  items: any[]
  itemTitle?: string
  itemValue?: string
  density?: 'compact' | 'comfortable' | 'default'
}>(), { density: 'comfortable' })
const model = defineModel<any[]>()             // 활성(선택) 노드
const opened = defineModel<any[]>('opened')    // 펼쳐진 노드
</script>
<template>
  <VTreeview
    v-model:activated="model" v-model:opened="opened" :items="items"
    :item-title="itemTitle || 'title'" :item-value="itemValue || 'id'"
    class="ds-treeview" :density="density" rounded="md" activatable open-on-click
  >
    <template v-if="$slots.prepend" #prepend="slotProps">
      <slot name="prepend" v-bind="slotProps" />
    </template>
  </VTreeview>
</template>
