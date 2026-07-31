<script setup lang="ts">
// origin: wrapped — VStepper 기반
// 어디에: 에이전트 생성 마법사, 온보딩, 다단계 폼
import { VStepper } from 'vuetify/components'
defineProps<{ items: string[] }>()
const model = defineModel<number>({ default: 1 })
</script>
<template>
  <VStepper v-model="model" :items="items" class="ds-stepper" flat :elevation="0" hide-actions>
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </VStepper>
</template>
