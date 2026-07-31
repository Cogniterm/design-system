<script setup lang="ts">
// origin: wrapped — VDialog 기반
// 포커스 트랩·스크롤 락·ESC 처리를 직접 만들기 어려움 → Vuetify 유지, 내부 면만 우리 것으로
import { VDialog } from 'vuetify/components'

withDefaults(defineProps<{
  title?: string
  width?: number | string
  persistent?: boolean
}>(), { width: 480 })
const open = defineModel<boolean>({ default: false })
</script>

<template>
  <VDialog v-model="open" :width="width" :persistent="persistent" class="ds-vdialog">
    <div class="ds-dialog-panel">
      <div v-if="title" class="ds-dialog-head">{{ title }}</div>
      <div class="ds-dialog-body"><slot /></div>
      <div v-if="$slots.actions" class="ds-dialog-foot"><slot name="actions" /></div>
    </div>
  </VDialog>
</template>
