<script setup lang="ts">
// origin: custom — 에이전트 산출물(코드·문서·표) 패널
defineProps<{ title: string; copyable?: boolean; downloadable?: boolean }>()
const emit = defineEmits<{ copy: []; download: [] }>()
</script>

<template>
  <div class="artifact">
    <div class="a-head">
      <span class="a-title">{{ title }}</span>
      <button type="button" v-if="copyable" class="btn btn-ghost btn-sm" @click="emit('copy')">Copy</button>
      <button type="button" v-if="downloadable" class="btn btn-secondary btn-sm" @click="emit('download')">Download</button>
    </div>
    <div class="a-body"><slot /></div>
  </div>
</template>
