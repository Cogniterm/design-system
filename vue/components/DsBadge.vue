<script setup lang="ts">
// origin: custom — 읽기 전용 상태 라벨 (조작 가능한 건 DsChip)
withDefaults(defineProps<{
  variant?: 'default' | 'brand' | 'success' | 'danger'
  dot?: boolean
}>(), { variant: 'default', dot: true })
</script>

<template>
  <span class="badge" :class="variant !== 'default' && variant">
    <span v-if="dot" class="dot"></span>
    <slot />
  </span>
</template>
