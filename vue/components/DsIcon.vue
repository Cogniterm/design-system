<script setup lang="ts">
// origin: wrapped — Lucide 기반
// 어디에: 아이콘이 필요한 모든 곳. 의미 이름으로만 부릅니다.
//
// 아이콘은 옆에 있는 글자와 같은 색을 씁니다 (currentColor).
// 아이콘만 브랜드 색으로 칠하지 않습니다.
import { computed } from 'vue'
import { icons, ICON_SIZES, type IconName, type IconSize } from '../icons'

const props = withDefaults(defineProps<{
  name?: IconName       // 없으면 아무것도 그리지 않습니다 (icon?: 데이터를 그대로 넘길 수 있게)
  size?: IconSize | number
  label?: string        // 뜻을 전달하는 아이콘이면 필수 (장식이면 생략)
  spin?: boolean        // loading 아이콘 회전
}>(), { size: 'md' })

const px = computed(() =>
  typeof props.size === 'number' ? props.size : ICON_SIZES[props.size])
const cmp = computed(() => {
  if (!props.name) return null
  const c = icons[props.name]
  // 타입상 올 수 없는 이름 — as any로 우회했을 때만 여기 옵니다. 조용히 비우면 찾기 어렵습니다.
  if (!c) console.warn(`[DsIcon] "${props.name}"는 아이콘 레지스트리에 없습니다 — vue/icons.ts를 확인하세요.`)
  return c ?? null
})
</script>

<template>
  <component
    v-if="cmp"
    :is="cmp"
    class="ds-icon"
    :class="{ 'is-spin': spin }"
    :size="px"
    :stroke-width="2"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
    :role="label ? 'img' : undefined"
  />
</template>
