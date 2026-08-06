<script setup lang="ts">
// origin: wrapped — VSnackbar 기반. 실제로 떠서 시간이 지나면 사라지는 알림
// 어디에: 저장·삭제 결과 알림.
//
// DsToast와의 관계: 이 컴포넌트는 "언제 뜨고 언제 사라지는가"만 담당하고,
// 생김새는 DsToast를 그대로 씁니다. 전에는 같은 모양을 두 곳에서 따로 그려서
// 한쪽만 고치면 둘이 어긋났습니다(점 제거·테두리 제거 때 실제로 그랬습니다).
import { VSnackbar } from 'vuetify/components'
import DsToast from '../DsToast.vue'
withDefaults(defineProps<{
  variant?: 'success' | 'danger'
  action?: string
  /** 자동으로 닫히기까지(ms) */
  timeout?: number
}>(), { variant: 'success', timeout: 4000 })
const open = defineModel<boolean>({ default: false })
const emit = defineEmits<{ action: [] }>()
</script>
<template>
  <VSnackbar v-model="open" :timeout="timeout" class="ds-snackbar"
    location="bottom right" rounded="lg">
    <DsToast :variant="variant" :action="action" @action="emit('action'); open = false">
      <slot />
    </DsToast>
  </VSnackbar>
</template>
