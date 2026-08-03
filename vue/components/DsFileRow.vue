<script setup lang="ts">
// origin: custom — 드라이브 리스트 보기 한 줄 (compact 40px)
// icon: 어떤 아이콘인지 알려주는 값. 실제 그림은 #icon 슬롯이 그립니다
//       (Standalone 계층이라 Lucide를 직접 import하지 않습니다).
import type { IconName } from '../icons'
defineProps<{ name: string; meta?: string; icon?: IconName; selected?: boolean }>()
const emit = defineEmits<{ select: [] }>()
</script>

<template>
  <div class="file-row" :class="{ selected }" @click="emit('select')">
    <span v-if="icon || $slots.icon" class="f-icon"><slot name="icon" :name="icon" /></span>
    <span class="f-name">{{ name }}</span>
    <span v-if="meta" class="f-meta">{{ meta }}</span>
  </div>
</template>
