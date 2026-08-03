<script setup lang="ts">
// origin: wrapped — VMenu 기반. 메뉴가 아닌 임의 내용을 띄우는 패널
// 어디에: 미리보기, 짧은 폼, 부가 정보 — Tooltip보다 길고 Dialog보다 가벼운 것
import { VMenu } from 'vuetify/components'
withDefaults(defineProps<{
  location?: string
  width?: number | string
}>(), { location: 'bottom start', width: 280 })
</script>
<template>
  <VMenu :location="location" :close-on-content-click="false">
    <template #activator="{ props }">
      <slot name="activator" v-bind="props" />
    </template>
    <div class="ds-popover" :style="{ width: typeof width === 'number' ? width + 'px' : width }">
      <slot />
    </div>
  </VMenu>
</template>
