<script setup lang="ts">
// origin: wrapped — VBanner 기반. 화면 최상단 전역 공지
// 어디에: 서비스 점검 예정, 요금제 만료 임박 — 페이지 전체에 해당하는 것만
import { VBanner } from 'vuetify/components'
import DsIcon from '../DsIcon.vue'
import type { IconName } from '../../icons'
defineProps<{ icon?: IconName }>()
</script>
<template>
  <VBanner class="ds-banner" density="comfortable" rounded="md" lines="one">
    <template v-if="icon || $slots.icon" #prepend>
      <span class="ds-banner-icon"><slot name="icon"><DsIcon v-if="icon" :name="icon" size="sm" /></slot></span>
    </template>
    <slot />
    <template v-if="$slots.actions" #actions><slot name="actions" /></template>
  </VBanner>
</template>
