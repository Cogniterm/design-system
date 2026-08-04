<script setup lang="ts">
// origin: custom — 읽기 전용 상태 라벨 (조작 가능한 건 DsChip)
// 색 점 없이 배경·글자·테두리 색으로 상태를 구분합니다 (텍스트는 항상 함께 — 색맹 대응).
withDefaults(defineProps<{
  variant?: 'default' | 'brand' | 'success' | 'warning' | 'danger'
}>(), { variant: 'default' })
</script>

<template>
  <span class="badge" :class="variant !== 'default' && variant">
    <slot />
  </span>
</template>
