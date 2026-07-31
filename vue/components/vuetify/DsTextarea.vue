<script setup lang="ts">
// origin: wrapped — VTextarea 기반. 여러 줄 입력
// 어디에: 설명·메모 입력, 프롬프트 편집 (에이전트 대화 입력은 DsAgentInput)
import { VTextarea } from 'vuetify/components'
withDefaults(defineProps<{
  label?: string; hint?: string; error?: string; placeholder?: string; rows?: number
}>(), { rows: 3 })
const model = defineModel<string>()
</script>
<template>
  <div class="field ds-vfield">
    <label v-if="label">{{ label }}</label>
    <VTextarea v-model="model" :rows="rows" :placeholder="placeholder" :error="!!error"
      variant="outlined" density="comfortable" hide-details="auto" auto-grow />
    <div v-if="error" class="hint error">{{ error }}</div>
    <div v-else-if="hint" class="hint">{{ hint }}</div>
  </div>
</template>
