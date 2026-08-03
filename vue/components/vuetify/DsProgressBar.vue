<script setup lang="ts">
// origin: wrapped — VProgressLinear 기반
// 어디에: 업로드 진행률, 일괄 처리 진행률 (진행률을 아는 경우만)
// 진행률을 모르면 indeterminate 대신 ThinkingIndicator를 쓰세요 (원칙 1)
import { VProgressLinear } from 'vuetify/components'
withDefaults(defineProps<{
  value?: number; label?: string; indeterminate?: boolean
}>(), { value: 0 })
/* 소비자가 준 속성(disabled·required·name·error-messages 등)이 바깥 <div>가 아니라
   진짜 Vuetify 컴포넌트에 붙게 합니다. 이게 없으면 조용히 무시됩니다. */
defineOptions({ inheritAttrs: false })
</script>
<template>
  <div class="ds-progress">
    <div v-if="label" class="ds-progress-head">
      <span>{{ label }}</span>
      <span v-if="!indeterminate" class="ds-progress-val">{{ Math.round(value) }}%</span>
    </div>
    <VProgressLinear :model-value="value" :indeterminate="indeterminate"
      color="primary" :height="2" rounded="0" v-bind="$attrs" />
  </div>
</template>
