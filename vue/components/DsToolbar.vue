<script setup lang="ts">
// origin: custom — 컨트롤 줄 정렬 규약 (높이 32 · 간격 8 · 구분 그룹)
// label: 화면에 툴바가 둘 이상이면 어느 툴바인지 구분할 이름이 필요합니다
defineProps<{ dense?: boolean; label?: string }>()
</script>
<template>
  <div class="ds-toolbar" :class="{ dense }" role="toolbar" :aria-label="label">
    <slot />
  </div>
</template>
