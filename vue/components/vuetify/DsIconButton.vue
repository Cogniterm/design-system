<script setup lang="ts">
// origin: wrapped — VBtn 기반. 아이콘만 있는 버튼
// 어디에: 테이블 행 액션, 툴바, 입력창 부가 버튼
import { VBtn } from 'vuetify/components'
withDefaults(defineProps<{
  label: string                    // aria-label — 필수
  variant?: 'ghost' | 'secondary'
  size?: 'sm' | 'default'
}>(), { variant: 'ghost', size: 'default' })
</script>
<template>
  <VBtn
    class="ds-icon-btn" :class="[`is-${variant}`, size === 'sm' && 'is-sm']"
    :aria-label="label" variant="text" :ripple="false" icon
  ><slot /></VBtn>
</template>
