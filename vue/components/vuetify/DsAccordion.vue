<script setup lang="ts">
// origin: wrapped — VExpansionPanels 기반. 접었다 펴는 영역
// 어디에: 툴콜 원본 페이로드, FAQ, 고급 설정 숨기기
// 원칙 4 — 근거를 접을 수는 있어도 없애지 않습니다. 그 "접기"가 이 컴포넌트입니다.
import { VExpansionPanels, VExpansionPanel } from 'vuetify/components'
defineProps<{ items: { title: string; text?: string }[] }>()
const model = defineModel<any>()
</script>
<template>
  <VExpansionPanels v-model="model" class="ds-accordion" variant="accordion" :elevation="0">
    <VExpansionPanel v-for="(i, n) in items" :key="n" :title="i.title">
      <template #text>
        <slot :name="`item-${n}`">{{ i.text }}</slot>
      </template>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
