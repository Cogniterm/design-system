<script setup lang="ts">
// origin: wrapped — VDatePicker 기반
// 어디에: 감사 로그 기간 필터, 스케줄 설정
import { VDatePicker } from 'vuetify/components'
defineProps<{ label?: string }>()
const model = defineModel<any>()
</script>
<template>
  <div class="ds-datepicker">
    <label v-if="label" class="ds-dp-label">{{ label }}</label>
    <VDatePicker v-model="model" color="primary" :elevation="0" show-adjacent-months />
  </div>
</template>
