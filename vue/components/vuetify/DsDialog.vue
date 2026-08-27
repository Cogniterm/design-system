<script setup lang="ts">
// origin: wrapped — VDialog 기반
// 포커스 트랩·스크롤 락·ESC 처리를 직접 만들기 어려움 → Vuetify 유지, 내부 면만 우리 것으로
import { useId } from 'vue'
import { VDialog } from 'vuetify/components'
import { X } from '@lucide/vue'

withDefaults(defineProps<{
  title?: string
  width?: number | string
  persistent?: boolean
  /** 제목줄 우상단 닫기 X — 조회·안내 모달용 (X버튼 UX Rule §3).
      결정 모달(삭제 확인 등)은 취소/실행 버튼으로만 닫는 게 규칙이라 기본값은 false */
  closable?: boolean
}>(), { width: 480 })
const open = defineModel<boolean>({ default: false })

/* Vuetify는 role="dialog"만 붙이고 이름은 안 붙입니다 — 그대로 두면
   스크린 리더가 "대화상자"라고만 읽고 무슨 대화상자인지 말해주지 않습니다. */
const titleId = `ds-dialog-title-${useId()}`
</script>

<template>
  <VDialog
    v-model="open" :width="width" :persistent="persistent" class="ds-vdialog"
    :content-props="{ 'aria-labelledby': title ? titleId : undefined }"
  >
    <div class="ds-dialog-panel">
      <div v-if="title" :id="titleId" class="ds-dialog-head">
        <span class="ds-dialog-head__text">{{ title }}</span>
        <button
          v-if="closable" type="button" class="ds-dialog-close"
          aria-label="닫기" title="닫기" @click="open = false"
        ><X :size="18" /></button>
      </div>
      <div class="ds-dialog-body"><slot /></div>
      <div v-if="$slots.actions" class="ds-dialog-foot"><slot name="actions" /></div>
    </div>
  </VDialog>
</template>
