<script setup lang="ts">
// origin: custom — 키보드 키 표기
defineProps<{ keys?: string[] }>()
</script>
<template>
  <span class="ds-kbd-group" v-if="keys?.length">
    <kbd v-for="k in keys" :key="k" class="kbd">{{ k }}</kbd>
  </span>
  <kbd v-else class="kbd"><slot /></kbd>
</template>
