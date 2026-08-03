<script setup lang="ts">
// origin: custom — 컨트롤 줄 정렬 규약 (높이 32 · 간격 8 · 구분 그룹)
defineProps<{ dense?: boolean }>()
</script>
<template>
  <div class="ds-toolbar" :class="{ dense }" role="toolbar">
    <slot />
  </div>
</template>
