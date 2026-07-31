<script setup lang="ts">
// origin: wrapped — VCheckbox 기반
// 어디에: 테이블 행 다중 선택, 설정 토글(즉시 저장 아닌 것), 약관 동의
import { VCheckbox } from 'vuetify/components'
defineProps<{ label?: string; hint?: string; indeterminate?: boolean; disabled?: boolean }>()
const model = defineModel<boolean>()
</script>
<template>
  <div class="ds-check">
    <VCheckbox v-model="model" :label="label" :indeterminate="indeterminate" :disabled="disabled"
      color="primary" density="comfortable" hide-details="auto" :ripple="false" />
    <div v-if="hint" class="hint ds-check-hint">{{ hint }}</div>
  </div>
</template>
