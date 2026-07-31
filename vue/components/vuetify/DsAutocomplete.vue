<script setup lang="ts">
// origin: wrapped — VAutocomplete 기반. 검색 가능한 선택
// 어디에: 옵션이 10개를 넘는 선택 (사용자 지정, 태그 붙이기)
import { VAutocomplete } from 'vuetify/components'
defineProps<{ items: any[]; label?: string; multiple?: boolean; error?: string; placeholder?: string }>()
const model = defineModel<any>()
</script>
<template>
  <div class="field ds-vfield">
    <label v-if="label">{{ label }}</label>
    <VAutocomplete v-model="model" :items="items" :multiple="multiple" :error="!!error"
      :placeholder="placeholder" variant="outlined" density="comfortable"
      hide-details="auto" chips closable-chips />
    <div v-if="error" class="hint error">{{ error }}</div>
  </div>
</template>
