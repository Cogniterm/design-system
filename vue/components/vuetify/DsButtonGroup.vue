<script setup lang="ts">
// origin: wrapped — VBtnToggle 기반. 서로 배타적인 보기 전환
// 어디에: 그리드/리스트 전환, 기간 선택(일·주·월), 밀도 전환
import { VBtnToggle, VBtn } from 'vuetify/components'
defineProps<{ items: { value: any; label: string }[] }>()
const model = defineModel<any>()
</script>
<template>
  <VBtnToggle v-model="model" class="ds-btn-group" mandatory divided variant="outlined" density="compact">
    <VBtn v-for="i in items" :key="i.value" :value="i.value" :ripple="false">{{ i.label }}</VBtn>
  </VBtnToggle>
</template>
