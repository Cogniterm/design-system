<script setup lang="ts">
import { useId } from 'vue'
// origin: wrapped — VRadioGroup 기반
// 어디에: 설정에서 배타적 선택 (보존 기간, 공개 범위)
import { VRadioGroup, VRadio } from 'vuetify/components'
withDefaults(defineProps<{
  label?: string
  items: { value: any; label: string; hint?: string }[]
  inline?: boolean
}>(), { inline: false })
const model = defineModel<any>()
/* 소비자가 준 속성(disabled·required·name·error-messages 등)이 바깥 <div>가 아니라
   진짜 Vuetify 컴포넌트에 붙게 합니다. 이게 없으면 조용히 무시됩니다. */
defineOptions({ inheritAttrs: false })
/* 라벨을 위에 따로 그리는 디자인이라, id로 묶어주지 않으면 스크린 리더가
   이 입력의 이름을 읽지 못하고 라벨을 눌러도 포커스가 가지 않습니다. */
const uid = useId()
const fieldId = `ds-field-${uid}`
</script>
<template>
  <div class="field ds-radio">
    <label v-if="label" :for="fieldId">{{ label }}</label>
    <VRadioGroup :id="fieldId" v-model="model" :inline="inline" color="primary" density="comfortable" hide-details="auto"
      v-bind="$attrs"
    >
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
