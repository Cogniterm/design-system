<script setup lang="ts">
// origin: custom — 사람/에이전트 표식. 이미지 없으면 이니셜
withDefaults(defineProps<{
  size?: 'sm' | 'default' | 'lg'
  variant?: 'default' | 'brand'   // brand = 에이전트
  src?: string
}>(), { size: 'default', variant: 'default' })
</script>

<template>
  <span class="ds-avatar" :class="[size !== 'default' && size, variant === 'brand' && 'brand']">
    <img v-if="src" :src="src" alt="" style="width:100%;height:100%;border-radius:inherit;object-fit:cover" />
    <slot v-else />
  </span>
</template>
