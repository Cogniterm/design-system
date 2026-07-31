<script setup lang="ts">
// origin: wrapped — VFileInput 기반
// 어디에: 문서 업로드, 로고 교체
import { VFileInput } from 'vuetify/components'
defineProps<{ label?: string; hint?: string; error?: string; accept?: string; multiple?: boolean }>()
const model = defineModel<any>()
</script>
<template>
  <div class="field ds-vfield">
    <label v-if="label">{{ label }}</label>
    <VFileInput v-model="model" :accept="accept" :multiple="multiple" :error="!!error"
      variant="outlined" density="comfortable" hide-details="auto" prepend-icon=""
      placeholder="파일 선택 또는 드래그" />
    <div v-if="error" class="hint error">{{ error }}</div>
    <div v-else-if="hint" class="hint">{{ hint }}</div>
  </div>
</template>
