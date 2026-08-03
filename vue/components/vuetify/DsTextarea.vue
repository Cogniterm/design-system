<script setup lang="ts">
import { useId } from 'vue'
// origin: wrapped — VTextarea 기반. 여러 줄 입력
// 어디에: 설명·메모 입력, 프롬프트 편집 (에이전트 대화 입력은 DsAgentInput)
import { VTextarea } from 'vuetify/components'
withDefaults(defineProps<{
  label?: string; hint?: string; error?: string; placeholder?: string; rows?: number
}>(), { rows: 3 })
const model = defineModel<string>()
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
  <div class="field ds-vfield">
    <label v-if="label" :for="fieldId">{{ label }}</label>
    <VTextarea :id="fieldId" :aria-describedby="error || hint ? msgId : undefined" v-model="model" :rows="rows" :placeholder="placeholder" :error="!!error"
      variant="outlined" density="comfortable" hide-details="auto" auto-grow v-bind="$attrs" />
    <div v-if="error" :id="msgId" class="hint error">{{ error }}</div>
    <div v-else-if="hint" :id="msgId" class="hint">{{ hint }}</div>
  </div>
</template>
