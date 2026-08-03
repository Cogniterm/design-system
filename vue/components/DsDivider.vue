<script setup lang="ts">
// origin: custom — 1px 구분선. label 주면 "오늘/어제"식 날짜 구분
defineProps<{ label?: string }>()
</script>

<template>
  <div v-if="label" class="divider-label" role="separator" :aria-label="label">{{ label }}</div>
  <hr v-else class="divider" />
</template>
