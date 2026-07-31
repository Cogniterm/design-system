<script setup lang="ts">
// origin: custom — 드라이브 그리드 보기. FileRow와 같은 데이터로 보기 전환 가능해야 함
export interface DsFile { id: string; name: string; meta?: string; icon?: string }
defineProps<{ files: DsFile[]; selected?: string[] }>()
const emit = defineEmits<{ select: [file: DsFile] }>()
</script>

<template>
  <div class="file-grid">
    <div
      v-for="f in files" :key="f.id"
      class="file-card"
      :class="{ selected: selected?.includes(f.id) }"
      @click="emit('select', f)"
    >
      <div class="f-icon"><slot name="icon" :file="f">{{ f.icon }}</slot></div>
      <div class="f-name">{{ f.name }}</div>
      <div v-if="f.meta" class="f-meta">{{ f.meta }}</div>
    </div>
  </div>
</template>
