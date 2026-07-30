<script setup lang="ts">
// origin: custom — Vuetify 시각 오버라이드 없이 직접 제작 (브리프 B그룹)
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'default' | 'sm'
  disabled?: boolean
}>(), { variant: 'primary', size: 'default' })
</script>

<template>
  <button
    class="btn"
    :class="[`btn-${variant}`, size === 'sm' && 'btn-sm']"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
