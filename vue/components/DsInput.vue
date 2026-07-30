<script setup lang="ts">
// origin: custom — VTextField는 래퍼가 깊어 직접 제작 (브리프 B그룹)
withDefaults(defineProps<{
  label?: string
  hint?: string
  error?: string        // 에러 메시지 — 있으면 에러 상태 (원칙 2: 에러는 기본 상태)
  placeholder?: string
  type?: string
}>(), { type: 'text' })
const model = defineModel<string>()
</script>

<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <input
      v-model="model"
      class="input"
      :class="{ error: !!error }"
      :type="type"
      :placeholder="placeholder"
    />
    <div v-if="error" class="hint error">{{ error }}</div>
    <div v-else-if="hint" class="hint">{{ hint }}</div>
  </div>
</template>
