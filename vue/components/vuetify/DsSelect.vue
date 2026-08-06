<script setup lang="ts">
import { useId } from 'vue'
// origin: wrapped — VSelect 기반
// 옵션 목록 포지셔닝·키보드 선택·다중 선택 동작 → Vuetify 유지, 필드 외형만 우리 것으로
import { VSelect } from 'vuetify/components'

withDefaults(defineProps<{
  items: any[]
  label?: string
  multiple?: boolean
  error?: string
  /** 컨트롤 스케일 — 기본 32 / md 36 / lg 40 (sm은 32의 다른 이름)
      다른 컨트롤(Button·Checkbox 등)과 같은 prop 이름을 씁니다. */
  size?: 'sm' | 'default' | 'md' | 'lg'
}>(), { size: 'default' })
const model = defineModel<any>()
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
  <div class="field ds-vselect" :class="{ 'ds-vfield--sm': size === 'sm' }">
    <label v-if="label" :for="fieldId">{{ label }}</label>
    <VSelect :id="fieldId" :aria-describedby="error ? msgId : undefined"
      v-model="model"
      :items="items"
      :multiple="multiple"
      :error="!!error"
      variant="outlined"
      :density="size === 'lg' ? 'default' : size === 'md' ? 'comfortable' : 'compact'"
      hide-details="auto"
    v-bind="$attrs" />
    <div v-if="error" :id="msgId" class="hint error">{{ error }}</div>
  </div>
</template>
