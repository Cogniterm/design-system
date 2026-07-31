<script setup lang="ts">
// origin: wrapped — VTabs 기반
// 어디에: 상세 화면의 섹션 전환(개요·활동·설정), 문서 탭
import { VTabs, VTab } from 'vuetify/components'
defineProps<{ items: { value: any; label: string; count?: number }[] }>()
const model = defineModel<any>()
</script>
<template>
  <VTabs v-model="model" class="ds-tabs" density="comfortable" slider-color="primary">
    <VTab v-for="i in items" :key="i.value" :value="i.value" :ripple="false">
      {{ i.label }}
      <span v-if="i.count !== undefined" class="ds-tab-count">{{ i.count }}</span>
    </VTab>
  </VTabs>
</template>
