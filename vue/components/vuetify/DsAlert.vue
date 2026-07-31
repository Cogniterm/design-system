<script setup lang="ts">
// origin: wrapped — VAlert 기반. 화면에 머무는 상태 알림
// 어디에: 폼 상단 검증 요약, 권한 부족 안내, 한도 경고
// Toast와 구분: 사라지면 안 되는 정보는 Alert, 지나가도 되는 결과는 Toast
import { VAlert } from 'vuetify/components'
withDefaults(defineProps<{
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  closable?: boolean
}>(), { variant: 'info' })
const emit = defineEmits<{ close: [] }>()
</script>
<template>
  <VAlert
    class="ds-alert" :type="variant" :title="title" :closable="closable"
    variant="tonal" border="start" density="comfortable" rounded="md"
    @click:close="emit('close')"
  >
    <slot />
    <div v-if="$slots.actions" class="ds-alert-actions"><slot name="actions" /></div>
  </VAlert>
</template>
