<script setup lang="ts">
// origin: wrapped — VSnackbar 기반. 실제로 떠서 시간이 지나면 사라지는 알림
// 어디에: 저장·삭제 결과 알림.
//
// DsToast와의 관계: 이 컴포넌트는 "언제 뜨고 언제 사라지는가"만 담당하고,
// 생김새는 DsToast를 그대로 씁니다. 전에는 같은 모양을 두 곳에서 따로 그려서
// 한쪽만 고치면 둘이 어긋났습니다(점 제거·테두리 제거 때 실제로 그랬습니다).
import { computed } from 'vue'
import { VSnackbar } from 'vuetify/components'
import DsToast from '../DsToast.vue'
const props = withDefaults(defineProps<{
  variant?: 'success' | 'danger'
  action?: string
  /** 자동으로 닫히기까지(ms). 주지 않으면 내용에 따라 3초 · 6초로 정해집니다. */
  timeout?: number
}>(), { variant: 'success' })

/* 머무는 시간 — 값을 주지 않으면 내용에 따라 정합니다.

   되돌릴 것이 없는 알림은 읽고 나면 볼일이 끝나므로 짧게 둡니다(3초).
   화면 구석에 오래 남아 있으면 다음 작업을 방해합니다.

   되돌리기 같은 행동 버튼이 붙어 있으면 이야기가 다릅니다. 사용자가
   내용을 읽고 판단하고 마우스를 옮길 시간이 필요해서 두 배로 둡니다(6초).
   짧게 두면 누르려는 순간 사라져 버립니다. */
const ms = computed(() => props.timeout ?? (props.action ? 6000 : 3000))
const open = defineModel<boolean>({ default: false })
const emit = defineEmits<{ action: [] }>()
</script>
<template>
  <VSnackbar v-model="open" :timeout="ms" class="ds-snackbar"
    location="bottom right" rounded="lg">
    <DsToast :variant="variant" :action="action" @action="emit('action'); open = false">
      <slot />
    </DsToast>
  </VSnackbar>
</template>
