<script setup lang="ts">
// origin: wrapped — VProgressCircular 기반
// 어디에: 버튼 내부 로딩, 인라인 짧은 대기 (2초 이내)
// ⚠️ 에이전트 작업에는 쓰지 마세요 — ThinkingIndicator·ToolCallStep을 씁니다 (원칙 1)
import { VProgressCircular } from 'vuetify/components'
withDefaults(defineProps<{
  size?: number
  /** brand: 브랜드색(기본) · current: 글자색을 따라감 — 색 있는 버튼(primary·danger) 안에서 사용 */
  variant?: 'brand' | 'current'
}>(), { size: 16, variant: 'brand' })
</script>
<template>
  <VProgressCircular class="ds-spinner" :class="variant === 'current' && 'ds-spinner--current'" indeterminate
    :color="variant === 'brand' ? 'primary' : undefined"
    :size="size" :width="2" />
</template>
