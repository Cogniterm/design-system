<script setup lang="ts">
// origin: wrapped — VCheckbox 기반
// 어디에: 테이블 행 다중 선택, 설정 토글(즉시 저장 아닌 것), 약관 동의
import { VCheckbox } from 'vuetify/components'
defineProps<{ label?: string; hint?: string; indeterminate?: boolean; disabled?: boolean }>()
const model = defineModel<boolean>()
/* 소비자가 준 속성(disabled·required·name·error-messages 등)이 바깥 <div>가 아니라
   진짜 Vuetify 컴포넌트에 붙게 합니다. 이게 없으면 조용히 무시됩니다. */
defineOptions({ inheritAttrs: false })
</script>
<template>
  <div class="ds-check">
    <VCheckbox v-model="model" :label="label" :indeterminate="indeterminate" :disabled="disabled"
      color="primary" density="comfortable" hide-details="auto" :ripple="false" v-bind="$attrs" />
    <div v-if="hint" class="hint ds-check-hint">{{ hint }}</div>
  </div>
</template>
