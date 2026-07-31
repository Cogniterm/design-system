<script setup lang="ts">
// origin: wrapped — VMenu 기반
// 포지셔닝(뷰포트 충돌 회피)·키보드 네비게이션이 어려움 → Vuetify 유지
import { VMenu } from 'vuetify/components'

withDefaults(defineProps<{
  location?: string
}>(), { location: 'bottom start' })
</script>

<template>
  <VMenu :location="location" class="ds-vmenu">
    <template #activator="{ props }">
      <slot name="activator" v-bind="props" />
    </template>
    <div class="ds-menu-panel"><slot /></div>
  </VMenu>
</template>
