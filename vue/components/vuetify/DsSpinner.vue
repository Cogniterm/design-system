<script setup lang="ts">
// origin: wrapped — VProgressCircular 기반
// 어디에: 버튼 내부 로딩, 인라인 짧은 대기 (2초 이내)
// ⚠️ 에이전트 작업에는 쓰지 마세요 — ThinkingIndicator·ToolCallStep을 씁니다 (원칙 1)
import { VProgressCircular } from 'vuetify/components'
withDefaults(defineProps<{ size?: number }>(), { size: 16 })
</script>
<template>
  <VProgressCircular class="ds-spinner" indeterminate color="primary" :size="size" :width="2" />
</template>
