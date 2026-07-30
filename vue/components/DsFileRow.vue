<script setup lang="ts">
// origin: custom — 드라이브 리스트 보기 한 줄 (compact 40px)
defineProps<{ name: string; meta?: string; icon?: string; selected?: boolean }>()
const emit = defineEmits<{ select: [] }>()
</script>

<template>
  <div class="file-row" :class="{ selected }" @click="emit('select')">
    <span class="f-icon">{{ icon || '📄' }}</span>
    <span class="f-name">{{ name }}</span>
    <span v-if="meta" class="f-meta">{{ meta }}</span>
  </div>
</template>
