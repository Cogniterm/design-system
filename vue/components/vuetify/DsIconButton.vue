<script setup lang="ts">
// origin: wrapped — VBtn 기반. 아이콘만 있는 버튼
// 어디에: 테이블 행 액션, 툴바, 입력창 부가 버튼
import { VBtn } from 'vuetify/components'
withDefaults(defineProps<{
  label: string                    // aria-label — 필수
  /** ghost = 툴바·행 액션(기본) · secondary = 테두리 있는 보조
   *  brand = 채운 원형. 입력창의 '보내기'처럼 그 자리에서 유일한 주 동작일 때만.
   *  한 화면에 둘 이상 두면 어느 쪽이 주 동작인지 사라집니다. */
  variant?: 'ghost' | 'secondary' | 'brand'
  size?: 'sm' | 'default'
}>(), { variant: 'ghost', size: 'default' })
</script>
<template>
  <VBtn
    class="ds-icon-btn" :class="[`is-${variant}`, size === 'sm' && 'is-sm']"
    :aria-label="label" variant="text" :ripple="false" icon
  ><slot /></VBtn>
</template>
