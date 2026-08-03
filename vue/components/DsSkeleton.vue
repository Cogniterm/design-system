<script setup lang="ts">
// origin: custom — 데이터 로딩 뼈대. 에이전트 응답 대기엔 DsThinkingIndicator 사용
withDefaults(defineProps<{
  variant?: 'text' | 'circle' | 'rect'
  width?: string
  height?: string
}>(), { variant: 'text' })
</script>

<template>
  <div
    class="skeleton"
    aria-hidden="true"
    :class="variant !== 'rect' && variant"
    :style="{ width, height }"
  ></div>
</template>
