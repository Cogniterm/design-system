<script setup lang="ts">
// origin: custom — 작업 결과 알림. 후속 액션은 하나까지. 그림자 허용 예외 컴포넌트
withDefaults(defineProps<{
  variant?: 'success' | 'danger'
  action?: string
}>(), { variant: 'success' })
const emit = defineEmits<{ action: [] }>()
</script>

<template>
  <div class="toast" :class="variant">
    <span class="t-dot"></span>
    <span class="t-body"><slot /></span>
    <button v-if="action" class="t-action" @click="emit('action')">{{ action }}</button>
  </div>
</template>
