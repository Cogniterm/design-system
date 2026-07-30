<script setup lang="ts">
// origin: custom — 빈 상태는 반드시 다음 행동(CTA)을 제안한다
defineProps<{ title: string; description?: string }>()
</script>

<template>
  <div class="empty">
    <h3>{{ title }}</h3>
    <p v-if="description">{{ description }}</p>
    <slot />
  </div>
</template>
