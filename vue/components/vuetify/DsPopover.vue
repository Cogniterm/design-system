<script setup lang="ts">
// origin: wrapped — VMenu 기반. 메뉴가 아닌 임의 내용을 띄우는 패널
// 어디에: 미리보기, 짧은 폼, 부가 정보 — Tooltip보다 길고 Dialog보다 가벼운 것
import type { Anchor } from 'vuetify'
import { VMenu } from 'vuetify/components'
withDefaults(defineProps<{
  location?: Anchor
  width?: number | string
  /** prose(기본) = 설명·짧은 폼 · list = 옵션 목록 (메뉴 패널과 같은 4px 인셋)
      · bare = 패딩 0 — 내용물이 자체 패딩·폭을 가질 때 (구 shadcn p-0 자리, 2026-08-26 보완).
        list(4px)를 쓰면 내용물 패딩과 겹쳐 인셋이 두 배가 됩니다 */
  variant?: 'prose' | 'list' | 'bare'
}>(), { location: 'bottom start', width: 280, variant: 'prose' })

/* 열림 상태를 밖에서도 잡을 수 있게 v-model을 넘긴다 (2026-08-26 보완).
   이 패널은 close-on-content-click이 꺼져 있어(폼·달력이 들어가므로) 안을 눌러도
   안 닫힌다 — '적용'·'선택 완료' 같은 동작에서 바깥이 닫아 줘야 한다.
   안 넘기면 VMenu가 알아서 열고 닫는다 — 기존 사용처는 그대로 동작한다. */
const open = defineModel<boolean>()
</script>
<template>
  <VMenu v-model="open" :location="location" :close-on-content-click="false">
    <template #activator="{ props }">
      <slot name="activator" v-bind="props" />
    </template>
    <div
      class="ds-popover"
      :class="variant !== 'prose' && 'ds-popover--' + variant"
      :style="{ width: typeof width === 'number' ? width + 'px' : width }"
    >
      <slot />
    </div>
  </VMenu>
</template>
