<script setup lang="ts">
// origin: wrapped — VTooltip 기반
// 지연 표시·포지셔닝·터치 대응 → Vuetify 유지
import { VTooltip } from 'vuetify/components'

withDefaults(defineProps<{
  text: string
  location?: string
}>(), { location: 'top' })
</script>

<template>
  <VTooltip :text="text" :location="location" class="ds-vtooltip">
    <template #activator="{ props }">
      <slot v-bind="props" />
    </template>
  </VTooltip>
</template>
