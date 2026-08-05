<script setup lang="ts">
import { computed, useId } from 'vue'
// origin: wrapped — VFileInput 기반
// 어디에: 문서 업로드, 로고 교체
import { VFileInput } from 'vuetify/components'
import DsIcon from '../DsIcon.vue'
withDefaults(defineProps<{
  label?: string; hint?: string; error?: string; accept?: string; multiple?: boolean
  /** 비어 있을 때 필드 안에 보이는 안내 */
  placeholder?: string
}>(), { placeholder: '파일 선택 또는 드래그' })
const model = defineModel<any>()
/* <input type="file">은 placeholder 속성을 브라우저가 무시합니다.
   그대로 두면 빈 상자로 보여 파일 입력인지 알 수 없어, 안내를 직접 그립니다. */
const isEmpty = computed(() => {
  const v = model.value
  return !v || (Array.isArray(v) && v.length === 0)
})
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
    <VFileInput :id="fieldId" :aria-describedby="error || hint ? msgId : undefined" v-model="model" :accept="accept" :multiple="multiple" :error="!!error"
      variant="outlined" density="comfortable" hide-details="auto" prepend-icon=""
      v-bind="$attrs">
      <template v-if="isEmpty" #prepend-inner>
        <span class="ds-file-ph"><DsIcon name="attach" size="sm" />{{ placeholder }}</span>
      </template>
    </VFileInput>
    <div v-if="error" :id="msgId" class="hint error">{{ error }}</div>
    <div v-else-if="hint" :id="msgId" class="hint">{{ hint }}</div>
  </div>
</template>
