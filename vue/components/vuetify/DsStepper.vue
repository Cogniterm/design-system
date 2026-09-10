<script setup lang="ts">
// origin: wrapped — VStepper 기반
// 어디에: 에이전트 생성 마법사, 온보딩, 다단계 폼
import { computed, useSlots } from 'vue'
import { VStepper } from 'vuetify/components'
defineProps<{ items: string[] }>()
const model = defineModel<number>({ default: 1 })
/* 단계 내용 슬롯을 안 주면 VStepper가 빈 창(window)을 그대로 남겨
   머리표 아래에 빈 상자가 생깁니다. 그럴 땐 창을 접습니다. */
const slots: Record<string, unknown> = useSlots()
const headless = computed<boolean>(() => Object.keys(slots).length === 0)
/* 지나보내기 래퍼 — 슬롯을 통째로 넘깁니다. 적어 두지 않으면 자기 템플릿의
   `#[name]`이 다시 자기 슬롯 타입을 만들어 추론이 제자리를 돕니다(TS7022). */
defineSlots<Record<string, (props: Record<string, unknown>) => unknown>>()
</script>
<template>
  <VStepper v-model="model" :items="items" class="ds-stepper"
    :class="{ 'ds-stepper--headless': headless }" flat :elevation="0" hide-actions>
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </VStepper>
</template>
