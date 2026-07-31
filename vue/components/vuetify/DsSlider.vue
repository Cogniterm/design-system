<script setup lang="ts">
// origin: wrapped — VSlider 기반
// 어디에: 임계값 조정 (신뢰도 컷오프, 결과 개수)
import { VSlider } from 'vuetify/components'
withDefaults(defineProps<{
  label?: string; min?: number; max?: number; step?: number; suffix?: string
}>(), { min: 0, max: 100, step: 1 })
const model = defineModel<number>({ default: 0 })
</script>
<template>
  <div class="field ds-slider">
    <label v-if="label" class="ds-slider-label">
      {{ label }}<span class="ds-slider-val">{{ model }}{{ suffix }}</span>
    </label>
    <VSlider v-model="model" :min="min" :max="max" :step="step"
      color="primary" density="comfortable" hide-details :thumb-size="14" :track-size="3" />
  </div>
</template>
