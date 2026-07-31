<script setup lang="ts">
// origin: wrapped — VSelect 기반
// 옵션 목록 포지셔닝·키보드 선택·다중 선택 동작 → Vuetify 유지, 필드 외형만 우리 것으로
import { VSelect } from 'vuetify/components'

defineProps<{
  items: any[]
  label?: string
  multiple?: boolean
  error?: string
}>()
const model = defineModel<any>()
</script>

<template>
  <div class="field ds-vselect">
    <label v-if="label">{{ label }}</label>
    <VSelect
      v-model="model"
      :items="items"
      :multiple="multiple"
      :error="!!error"
      variant="outlined"
      density="comfortable"
      hide-details="auto"
    />
    <div v-if="error" class="hint error">{{ error }}</div>
  </div>
</template>
