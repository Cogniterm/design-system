<script setup lang="ts">
// origin: custom — 드라이브 그리드 보기. FileRow와 같은 데이터로 보기 전환 가능해야 함
import type { IconName } from '../icons'
// icon: 실제 그림은 #icon 슬롯이 그립니다 (Standalone 계층 — Lucide 직접 의존 없음)
export interface DsFile { id: string; name: string; meta?: string; icon?: IconName }
defineProps<{ files: DsFile[]; selected?: string[] }>()
const emit = defineEmits<{ select: [file: DsFile] }>()
</script>

<template>
  <div class="file-grid" role="listbox" aria-label="파일">
    <div
      v-for="f in files" :key="f.id"
      class="file-card"
      :class="{ selected: selected?.includes(f.id) }"
      role="option" :aria-selected="!!selected?.includes(f.id)" tabindex="0"
      @click="emit('select', f)"
      @keydown.enter.prevent="emit('select', f)"
      @keydown.space.prevent="emit('select', f)"
    >
      <div v-if="f.icon || $slots.icon" class="f-icon"><slot name="icon" :file="f" /></div>
      <div class="f-name">{{ f.name }}</div>
      <div v-if="f.meta" class="f-meta">{{ f.meta }}</div>
    </div>
  </div>
</template>
