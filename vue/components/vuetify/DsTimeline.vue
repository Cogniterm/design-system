<script setup lang="ts">
// origin: wrapped — VTimeline 기반
// 어디에: 문서 변경 이력, 에이전트 실행 이력, 승인 흐름
import { VTimeline, VTimelineItem } from 'vuetify/components'
export interface TimelineItem { id: any; time: string; title: string; body?: string; variant?: 'default'|'success'|'danger' }
defineProps<{ items: TimelineItem[] }>()
const dotColor = (v?: string) => v === 'success' ? 'success' : v === 'danger' ? 'error' : 'primary'
</script>
<template>
  <VTimeline class="ds-timeline" side="end" align="start" density="comfortable" :line-thickness="1">
    <VTimelineItem v-for="i in items" :key="i.id" :dot-color="dotColor(i.variant)" size="x-small">
      <div class="ds-tl-time">{{ i.time }}</div>
      <div class="ds-tl-title">{{ i.title }}</div>
      <div v-if="i.body" class="ds-tl-body">{{ i.body }}</div>
    </VTimelineItem>
  </VTimeline>
</template>
