<script setup lang="ts">
// origin: wrapped — VList 기반. 일반 목록
// 어디에: 설정 항목 목록, 선택 가능한 항목 나열 (파일은 FileRow, 데이터는 DataTable)
import { VList, VListItem } from 'vuetify/components'
export interface ListItem { value?: any; title: string; subtitle?: string; icon?: string; meta?: string }
withDefaults(defineProps<{ items: ListItem[]; selectable?: boolean }>(), { selectable: false })
const model = defineModel<any>()
</script>
<template>
  <VList v-model:selected="model" class="ds-list" density="comfortable" rounded="md" :nav="selectable">
    <VListItem v-for="(i, n) in items" :key="n" :value="i.value ?? n" :ripple="false">
      <template v-if="i.icon || $slots.icon" #prepend>
        <span class="ds-nav-icon"><slot name="icon" :item="i">{{ i.icon }}</slot></span>
      </template>
      <template #title>{{ i.title }}</template>
      <template v-if="i.subtitle" #subtitle>{{ i.subtitle }}</template>
      <template v-if="i.meta" #append><span class="ds-list-meta">{{ i.meta }}</span></template>
    </VListItem>
  </VList>
</template>
