<script setup lang="ts">
// origin: wrapped — Lucide 기반
// 어디에: 아이콘이 필요한 모든 곳. 의미 이름으로만 부릅니다.
//
// 아이콘은 옆에 있는 글자와 같은 색을 씁니다 (currentColor).
// 아이콘만 브랜드 색으로 칠하지 않습니다.
import { computed } from 'vue'
import { icons, ICON_SIZES, type IconName, type IconSize } from '../icons'

const props = withDefaults(defineProps<{
  name: IconName
  size?: IconSize | number
  label?: string        // 뜻을 전달하는 아이콘이면 필수 (장식이면 생략)
  spin?: boolean        // loading 아이콘 회전
}>(), { size: 'md' })

const px = computed(() =>
  typeof props.size === 'number' ? props.size : ICON_SIZES[props.size])
const cmp = computed(() => icons[props.name])
</script>

<template>
  <component
    :is="cmp"
    class="ds-icon"
    :class="{ 'is-spin': spin }"
    :size="px"
    :stroke-width="1.5"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
    :role="label ? 'img' : undefined"
  />
</template>
