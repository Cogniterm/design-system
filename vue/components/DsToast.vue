<script setup lang="ts">
// origin: custom — 작업 결과 알림. 후속 액션은 하나까지. 그림자 허용 예외 컴포넌트
import DsIcon from './DsIcon.vue'
withDefaults(defineProps<{
  variant?: 'success' | 'danger'
  action?: string
}>(), { variant: 'success' })
const emit = defineEmits<{ action: [] }>()
</script>

<template>
  <!-- role/aria-live: 화면을 보지 않는 사용자에게도 결과가 전달되게 합니다.
       실패는 즉시(assertive), 성공은 하던 일을 끊지 않고(polite) 읽힙니다. -->
  <div
    class="toast" :class="variant"
    :role="variant === 'danger' ? 'alert' : 'status'"
    :aria-live="variant === 'danger' ? 'assertive' : 'polite'"
  >
    <!-- 점 대신 상태 아이콘 — 색+형태로 구분 (색맹 대응). 스크린리더용 텍스트도 유지 -->
    <span class="t-icon" aria-hidden="true"><DsIcon :name="variant === 'danger' ? 'error' : 'success'" size="sm" /></span>
    <span class="sr-only">{{ variant === 'danger' ? '실패' : '완료' }}</span>
    <span class="t-body"><slot /></span>
    <button type="button" v-if="action" class="t-action" @click="emit('action')">{{ action }}</button>
  </div>
</template>
