<script setup lang="ts">
// origin: wrapped — VCombobox 기반. 목록에 없는 값도 입력 가능한 태그 입력
// 어디에: 태그 붙이기, 수신자 추가 — 자유 입력 + 제안이 함께 필요한 곳
import { VCombobox } from 'vuetify/components'
defineProps<{
  items?: string[]; label?: string; hint?: string; error?: string; placeholder?: string
}>()
const model = defineModel<string[]>({ default: () => [] })
</script>
<template>
  <div class="field ds-vfield">
    <label v-if="label">{{ label }}</label>
    <VCombobox v-model="model" :items="items ?? []" :error="!!error" :placeholder="placeholder"
      multiple chips closable-chips variant="outlined" density="comfortable" hide-details="auto" />
    <div v-if="error" class="hint error">{{ error }}</div>
    <div v-else-if="hint" class="hint">{{ hint }}</div>
  </div>
</template>
