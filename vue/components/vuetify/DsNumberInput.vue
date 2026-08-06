<script setup lang="ts">
import { useId } from 'vue'
// origin: wrapped — VNumberInput 기반
// 어디에: 개수·한도·임계값 입력. 스텝 버튼과 키보드 ↑↓를 Vuetify가 처리
import { VNumberInput } from 'vuetify/components'
withDefaults(defineProps<{
  label?: string; hint?: string; error?: string
  min?: number; max?: number; step?: number
  /** 컨트롤 스케일 — sm 32px / default 40px. 필터 바·툴바는 sm. */
  size?: 'sm' | 'default'
}>(), { step: 1, size: 'default' })
const model = defineModel<number>()
/* 소비자가 준 속성(disabled·required·name·error-messages 등)이 바깥 <div>가 아니라
   진짜 Vuetify 컴포넌트에 붙게 합니다. 이게 없으면 조용히 무시됩니다. */
defineOptions({ inheritAttrs: false })
/* 라벨을 위에 따로 그리는 디자인이라, id로 묶어주지 않으면 스크린 리더가
   이 입력의 이름을 읽지 못하고 라벨을 눌러도 포커스가 가지 않습니다. */
const uid = useId()
const fieldId = `ds-field-${uid}`
const msgId = `ds-field-msg-${uid}`
</script>
<template>
  <div class="field ds-vfield" :class="{ 'ds-vfield--sm': size === 'sm' }">
    <label v-if="label" :for="fieldId">{{ label }}</label>
    <VNumberInput :id="fieldId" :aria-describedby="error || hint ? msgId : undefined" v-model="model" :min="min" :max="max" :step="step" :error="!!error"
      control-variant="stacked" variant="outlined" :density="size === 'sm' ? 'compact' : 'comfortable'" hide-details="auto" v-bind="$attrs" />
    <div v-if="error" :id="msgId" class="hint error">{{ error }}</div>
    <div v-else-if="hint" :id="msgId" class="hint">{{ hint }}</div>
  </div>
</template>
