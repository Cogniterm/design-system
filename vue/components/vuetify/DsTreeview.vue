<script setup lang="ts">
// origin: wrapped — VTreeview 기반
// 어디에: 드라이브 폴더 트리, 문서 목차, 조직도
import { VTreeview } from 'vuetify/components'
defineProps<{ items: any[]; itemTitle?: string; itemValue?: string }>()
const model = defineModel<any[]>()
</script>
<template>
  <VTreeview
    v-model:activated="model" :items="items"
    :item-title="itemTitle || 'title'" :item-value="itemValue || 'id'"
    class="ds-treeview" density="comfortable" rounded="md" activatable open-on-click
  />
</template>
