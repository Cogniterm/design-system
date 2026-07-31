<script setup lang="ts">
// origin: wrapped — VBreadcrumbs 기반
// 어디에: 드라이브 폴더 경로, 설정 하위 페이지
import { VBreadcrumbs } from 'vuetify/components'
defineProps<{ items: { title: string; to?: string; disabled?: boolean }[] }>()
</script>
<template>
  <VBreadcrumbs :items="items" class="ds-breadcrumbs" density="compact">
    <template #divider><span class="ds-bc-sep">/</span></template>
  </VBreadcrumbs>
</template>
