<script setup lang="ts">
// origin: wrapped — VMenu(hover) 기반. 올리면 뜨는 미리보기 카드
// 어디에: 사용자·문서 이름 위 미리보기. 터치 기기에선 뜨지 않으므로 필수 정보 금지
import { VMenu } from 'vuetify/components'
withDefaults(defineProps<{
  location?: string
  openDelay?: number
}>(), { location: 'bottom start', openDelay: 350 })
</script>
<template>
  <VMenu :location="location" open-on-hover :open-delay="openDelay" :close-on-content-click="false">
    <template #activator="{ props }">
      <slot name="activator" v-bind="props" />
    </template>
    <div class="ds-popover ds-hovercard"><slot /></div>
  </VMenu>
</template>
