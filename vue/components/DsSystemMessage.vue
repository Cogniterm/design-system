<script setup lang="ts">
// origin: custom — 대화 속 시스템 알림 (참여자 아님)
// "대화가 요약되었습니다" · "컨텍스트가 초기화되었습니다" 같은 것
defineProps<{ time?: string }>()
</script>
<template>
  <div class="sysmsg" role="status">
    <span class="sysmsg-text"><slot /></span>
    <span v-if="time" class="sysmsg-time">{{ time }}</span>
  </div>
</template>
