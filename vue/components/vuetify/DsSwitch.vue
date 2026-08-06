<script setup lang="ts">
// origin: wrapped — VSwitch 기반
// 어디에: 즉시 반영되는 on/off 설정 (알림 받기, 자동 실행)
// Checkbox와 구분: 저장 버튼이 필요하면 Checkbox, 즉시 적용이면 Switch
import { VSwitch } from 'vuetify/components'
withDefaults(defineProps<{
  label?: string; hint?: string; disabled?: boolean
  /** 트랙 크기 — sm 32x18 / default 40x22 / lg 48x26 */
  size?: 'sm' | 'default' | 'lg'
}>(), { size: 'default' })
const model = defineModel<boolean>()
/* 소비자가 준 속성(disabled·required·name·error-messages 등)이 바깥 <div>가 아니라
   진짜 Vuetify 컴포넌트에 붙게 합니다. 이게 없으면 조용히 무시됩니다. */
defineOptions({ inheritAttrs: false })
</script>
<template>
  <div class="ds-switch" :class="size !== 'default' && `ds-switch--${size}`">
    <VSwitch v-model="model" :label="label" :disabled="disabled"
      color="primary" density="comfortable" hide-details="auto" inset :ripple="false" v-bind="$attrs" />
    <div v-if="hint" class="hint ds-check-hint">{{ hint }}</div>
  </div>
</template>
