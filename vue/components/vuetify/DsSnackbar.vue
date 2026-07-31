<script setup lang="ts">
// origin: wrapped — VSnackbar 기반. 실제로 떠서 사라지는 토스트
// 어디에: 저장·삭제 결과 알림. DsToast는 생김새만, 이것은 표시/타이머까지 담당합니다.
import { VSnackbar } from 'vuetify/components'
withDefaults(defineProps<{
  variant?: 'success' | 'danger'; action?: string; timeout?: number
}>(), { variant: 'success', timeout: 4000 })
const open = defineModel<boolean>({ default: false })
const emit = defineEmits<{ action: [] }>()
</script>
<template>
  <VSnackbar v-model="open" :timeout="timeout" class="ds-snackbar"
    location="bottom right" :elevation="0" rounded="lg">
    <span class="t-dot" :class="variant"></span>
    <span class="ds-snack-body"><slot /></span>
    <template v-if="action" #actions>
      <button class="t-action" @click="emit('action'); open = false">{{ action }}</button>
    </template>
  </VSnackbar>
</template>
