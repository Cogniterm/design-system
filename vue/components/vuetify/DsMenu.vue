<script setup lang="ts">
// origin: wrapped — VMenu 기반
// 포지셔닝(뷰포트 충돌 회피)·키보드 네비게이션이 어려움 → Vuetify 유지
import type { Anchor } from 'vuetify'
import { VMenu } from 'vuetify/components'

withDefaults(defineProps<{
  location?: Anchor
}>(), { location: 'bottom start' })

/* 열림 상태를 밖에서도 잡을 수 있게 v-model을 넘긴다 (2026-08-26 보완).
   VMenu는 원래 v-model을 받는데 래퍼가 전달하지 않아, 바깥에서 열고 닫아야 하는
   화면(필터 패널·상태 메뉴 등)이 이 컴포넌트를 못 쓰고 있었다.
   안 넘기면 예전처럼 VMenu가 알아서 열고 닫는다 — 기존 사용처는 그대로 동작한다. */
const open = defineModel<boolean>()
</script>

<template>
  <VMenu v-model="open" :location="location" class="ds-vmenu">
    <template #activator="{ props }">
      <slot name="activator" v-bind="props" />
    </template>
    <div class="ds-menu-panel"><slot /></div>
  </VMenu>
</template>
