<script setup lang="ts">
// origin: custom — 텍스트 없이 점만 필요할 때 (아바타 모서리 등)
// 단독 사용 금지: 색만으로 의미 전달 불가 — label로 뜻을 명시합니다
withDefaults(defineProps<{
  status?: 'neutral' | 'brand' | 'success' | 'warning' | 'danger'
  label: string          // 스크린리더용 — 필수
  pulse?: boolean        // 실행 중 강조
}>(), { status: 'neutral', pulse: false })
</script>
<template>
  <span class="status-dot" :class="[status, { pulse }]" role="img" :aria-label="label"></span>
</template>
