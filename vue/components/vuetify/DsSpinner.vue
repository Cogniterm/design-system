<script setup lang="ts">
// origin: wrapped — VProgressCircular 기반
// 어디에: 버튼 내부 로딩, 인라인 짧은 대기 (2초 이내)
// ⚠️ 에이전트 작업에는 쓰지 마세요 — ThinkingIndicator·ToolCallStep을 씁니다 (원칙 1)
import { VProgressCircular } from 'vuetify/components'
withDefaults(defineProps<{
  size?: number
  /** 어디에 얹느냐로 고릅니다 — 바탕색과 같은 색을 쓰면 아예 안 보입니다.
   *  brand    흰 바탕·회색 바탕 (기본)
   *  on-brand 색이 채워진 면 — primary·danger 버튼 안
   *  current  글자색을 따라감 — secondary·ghost 버튼, 본문 안
   *  muted    조용히 — 배경 갱신처럼 눈에 덜 띄어야 할 때 */
  variant?: 'brand' | 'on-brand' | 'current' | 'muted'
}>(), { size: 16, variant: 'brand' })

const COLOR = { brand: 'primary', 'on-brand': undefined, current: undefined, muted: undefined } as const
</script>
<template>
  <VProgressCircular
    class="ds-spinner" :class="`ds-spinner--${variant}`" indeterminate
    :color="COLOR[variant]" :size="size" :width="2"
    role="status" aria-label="진행 중" />
</template>
