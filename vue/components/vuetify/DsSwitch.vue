<script setup lang="ts">
// origin: wrapped — VSwitch 기반
// 어디에: 즉시 반영되는 on/off 설정 (알림 받기, 자동 실행)
// Checkbox와 구분: 저장 버튼이 필요하면 Checkbox, 즉시 적용이면 Switch
import { VSwitch } from 'vuetify/components'
defineProps<{ label?: string; hint?: string; disabled?: boolean }>()
const model = defineModel<boolean>()
</script>
<template>
  <div class="ds-switch">
    <VSwitch v-model="model" :label="label" :disabled="disabled"
      color="primary" density="comfortable" hide-details="auto" inset :ripple="false" />
    <div v-if="hint" class="hint ds-check-hint">{{ hint }}</div>
  </div>
</template>
