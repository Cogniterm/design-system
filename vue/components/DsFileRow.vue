<script setup lang="ts">
// origin: custom — 드라이브 리스트 보기 한 줄 (compact 40px)
// icon: 문자열 대신 #icon 슬롯으로 아이콘 컴포넌트를 넣을 수 있습니다.
defineProps<{ name: string; meta?: string; icon?: string; selected?: boolean }>()
const emit = defineEmits<{ select: [] }>()
</script>

<template>
  <div class="file-row" :class="{ selected }" @click="emit('select')">
    <span class="f-icon"><slot name="icon">{{ icon }}</slot></span>
    <span class="f-name">{{ name }}</span>
    <span v-if="meta" class="f-meta">{{ meta }}</span>
  </div>
</template>
