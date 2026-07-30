<script setup lang="ts">
// origin: custom — 제거 가능한 선택 항목 (필터·첨부파일·태그)
withDefaults(defineProps<{
  variant?: 'default' | 'brand'
  removable?: boolean
}>(), { variant: 'default', removable: true })
const emit = defineEmits<{ remove: [] }>()
</script>

<template>
  <span class="chip" :class="variant === 'brand' && 'brand'">
    <slot />
    <button v-if="removable" class="x" aria-label="Remove" @click="emit('remove')">✕</button>
  </span>
</template>
