<script setup lang="ts">
import { useId } from 'vue'
// origin: wrapped — VSlider 기반
// 어디에: 임계값 조정 (신뢰도 컷오프, 결과 개수)
import { VSlider } from 'vuetify/components'
withDefaults(defineProps<{
  label?: string; min?: number; max?: number; step?: number; suffix?: string
}>(), { min: 0, max: 100, step: 1 })
const model = defineModel<number>({ default: 0 })
/* 소비자가 준 속성(disabled·required·name·error-messages 등)이 바깥 <div>가 아니라
   진짜 Vuetify 컴포넌트에 붙게 합니다. 이게 없으면 조용히 무시됩니다. */
defineOptions({ inheritAttrs: false })
/* 라벨을 위에 따로 그리는 디자인이라, id로 묶어주지 않으면 스크린 리더가
   이 입력의 이름을 읽지 못하고 라벨을 눌러도 포커스가 가지 않습니다. */
const uid = useId()
const fieldId = `ds-field-${uid}`
</script>
<template>
  <div class="field ds-slider">
    <label v-if="label" :for="fieldId" class="ds-slider-label">
      {{ label }}<span class="ds-slider-val">{{ model }}{{ suffix }}</span>
    </label>
    <VSlider :id="fieldId" v-model="model" :min="min" :max="max" :step="step"
      color="primary" density="comfortable" hide-details :thumb-size="14" :track-size="3" v-bind="$attrs" />
  </div>
</template>
