<script setup lang="ts">
// origin: wrapped — VBreadcrumbs 기반
// 어디에: 드라이브 폴더 경로, 설정 하위 페이지
// to가 있으면 링크. 없으면 @select(index)로 클릭 이동 — 마지막 또는 disabled 항목은 현재 위치(클릭 불가).
import { VBreadcrumbs } from 'vuetify/components'
defineProps<{ items: { title: string; to?: string; disabled?: boolean; index?: number }[] }>()
const emit = defineEmits<{ select: [index: number] }>()
</script>
<template>
  <VBreadcrumbs :items="items" class="ds-breadcrumbs" density="compact">
    <template #divider><span class="ds-bc-sep">/</span></template>
    <template #title="{ item }">
      <a v-if="(item as any).to" :href="String((item as any).to)" class="ds-bc-link">{{ (item as any).title }}</a>
      <button
        v-else-if="!(item as any).disabled"
        type="button" class="ds-bc-link"
        @click="emit('select', (item as any).index ?? -1)"
      >{{ (item as any).title }}</button>
      <span v-else class="ds-bc-cur">{{ (item as any).title }}</span>
    </template>
  </VBreadcrumbs>
</template>
