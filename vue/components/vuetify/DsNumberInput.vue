<script setup lang="ts">
// origin: wrapped — VNumberInput 기반
// 어디에: 개수·한도·임계값 입력. 스텝 버튼과 키보드 ↑↓를 Vuetify가 처리
import { VNumberInput } from 'vuetify/components'
withDefaults(defineProps<{
  label?: string; hint?: string; error?: string
  min?: number; max?: number; step?: number
}>(), { step: 1 })
const model = defineModel<number>()
</script>
<template>
  <div class="field ds-vfield">
    <label v-if="label">{{ label }}</label>
    <VNumberInput v-model="model" :min="min" :max="max" :step="step" :error="!!error"
      control-variant="stacked" variant="outlined" density="comfortable" hide-details="auto" />
    <div v-if="error" class="hint error">{{ error }}</div>
    <div v-else-if="hint" class="hint">{{ hint }}</div>
  </div>
</template>
