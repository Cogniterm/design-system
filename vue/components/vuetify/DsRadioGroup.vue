<script setup lang="ts">
// origin: wrapped — VRadioGroup 기반
// 어디에: 설정에서 배타적 선택 (보존 기간, 공개 범위)
import { VRadioGroup, VRadio } from 'vuetify/components'
withDefaults(defineProps<{
  label?: string
  items: { value: any; label: string; hint?: string }[]
  inline?: boolean
}>(), { inline: false })
const model = defineModel<any>()
</script>
<template>
  <div class="field ds-radio">
    <label v-if="label">{{ label }}</label>
    <VRadioGroup v-model="model" :inline="inline" color="primary" density="comfortable" hide-details="auto">
      <VRadio v-for="i in items" :key="i.value" :value="i.value" :ripple="false">
        <template #label>
          <span class="ds-radio-label">{{ i.label }}
            <span v-if="i.hint" class="ds-radio-hint">{{ i.hint }}</span>
          </span>
        </template>
      </VRadio>
    </VRadioGroup>
  </div>
</template>
