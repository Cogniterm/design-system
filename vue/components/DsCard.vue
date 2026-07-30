<script setup lang="ts">
// origin: custom — 그림자 대신 1px 보더로 구분하는 면
defineProps<{ title?: string; subtitle?: string }>()
</script>

<template>
  <div class="card">
    <h3 v-if="title">{{ title }}</h3>
    <p v-if="subtitle">{{ subtitle }}</p>
    <slot />
  </div>
</template>
