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
    <!-- 치수는 shadcn Slider 규격입니다 — 손잡이 16 · 홈 6.
         ⚠ 여기 숫자와 ds-vuetify.css의 `.v-slider-thumb__surface` 크기는 **같이 움직입니다.**
            Vuetify가 손잡이 자리를 --v-slider-thumb-size로 계산해서, 한쪽만 고치면
            손잡이가 값보다 반 칸씩 밀려 그려집니다.
         ⚠ track-color를 빼면 **홈 전체가 파랗게** 칠해집니다 — color는 채운 구간과 빈 홈
            양쪽에 걸리고, Vuetify가 붙이는 `.bg-primary`는 `!important`라 CSS로 못 덮습니다.
            (같은 이유로 defaults.ts의 VSlider·VRangeSlider에도 같은 값이 있습니다) -->
    <VSlider :id="fieldId" v-model="model" :min="min" :max="max" :step="step"
      color="primary" track-color="var(--muted)" density="comfortable" hide-details
      :elevation="0" :thumb-size="16" :track-size="6" v-bind="$attrs" />
  </div>
</template>
