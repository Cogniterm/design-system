<script setup lang="ts">
// origin: custom — 도구 실행 과정 표시. 원칙 4: 접을 수는 있어도 없애지 않는다
withDefaults(defineProps<{
  status?: 'running' | 'done' | 'error'
}>(), { status: 'running' })
</script>

<template>
  <div class="toolcall">
    <span v-if="status === 'running'" class="spinner"></span>
    <span v-else-if="status === 'done'" class="check">✓</span>
    <span v-else class="check" style="color:var(--error)">✕</span>
    <slot />
  </div>
</template>
