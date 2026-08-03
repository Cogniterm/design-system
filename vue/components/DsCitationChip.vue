<script setup lang="ts">
// origin: custom — 응답 근거 출처 번호 칩. 클릭 시 원문으로 (원칙 4)
defineProps<{ index: number | string }>()
const emit = defineEmits<{ open: [] }>()
</script>

<template>
  <span class="cite" role="button" tabindex="0" @click="emit('open')" @keydown.enter.prevent="emit('open')" @keydown.space.prevent="emit('open')">{{ index }}</span>
</template>
