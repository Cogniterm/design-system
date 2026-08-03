<script setup lang="ts">
// origin: wrapped — VDatePicker 기반
// 어디에: 감사 로그 기간 필터, 스케줄 설정
import { VDatePicker } from 'vuetify/components'
defineProps<{ label?: string }>()
const model = defineModel<any>()
/* 소비자가 준 속성(disabled·required·name·error-messages 등)이 바깥 <div>가 아니라
   진짜 Vuetify 컴포넌트에 붙게 합니다. 이게 없으면 조용히 무시됩니다. */
defineOptions({ inheritAttrs: false })
</script>
<template>
  <div class="ds-datepicker">
    <label v-if="label" class="ds-dp-label">{{ label }}</label>
    <VDatePicker v-model="model" color="primary" :elevation="0" show-adjacent-months v-bind="$attrs" />
  </div>
</template>
