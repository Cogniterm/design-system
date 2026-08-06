<script setup lang="ts">
import { useId } from 'vue'
// origin: custom — VTextField는 래퍼가 깊어 직접 제작 (브리프 B그룹)
withDefaults(defineProps<{
  label?: string
  hint?: string
  error?: string        // 에러 메시지 — 있으면 에러 상태 (원칙 2: 에러는 기본 상태)
  placeholder?: string
  type?: string
  /** 컨트롤 스케일 — 기본 32 / md 36 / lg 40 (sm은 32의 다른 이름).
   * 기본이 가장 작은 이유: 컨트롤은 대부분 툴바·필터 바·표 안에 줄지어 놓입니다. */
  size?: 'sm' | 'default' | 'md' | 'lg'
}>(), { type: 'text', size: 'default' })
const model = defineModel<string>()

/* disabled·required·name·autocomplete 같은 속성이 바깥 <div>가 아니라
   진짜 <input>에 붙게 합니다. */
defineOptions({ inheritAttrs: false })

/* 라벨 클릭하면 입력으로 포커스가 가고, 스크린 리더가 라벨과 오류를 함께 읽도록
   id로 묶습니다. id를 직접 넘기지 않아도 되게 컴포넌트마다 하나씩 만듭니다. */
const uid = useId()
const inputId = `ds-input-${uid}`
const msgId = `ds-input-msg-${uid}`
</script>

<template>
  <div class="field">
    <label v-if="label" :for="inputId">{{ label }}</label>
    <input
      :id="inputId"
      v-model="model"
      class="input"
      :class="[{ error: !!error }, size !== 'default' && size]"
      :type="type"
      :placeholder="placeholder"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="error || hint ? msgId : undefined"
      v-bind="$attrs"
    />
    <div v-if="error" :id="msgId" class="hint error">{{ error }}</div>
    <div v-else-if="hint" :id="msgId" class="hint">{{ hint }}</div>
  </div>
</template>
