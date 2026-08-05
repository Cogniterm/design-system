<script setup lang="ts">
// origin: custom — 읽기 전용 상태 라벨 (조작 가능한 건 DsChip)
// 두 축: 톤(variant)과 외형(appearance). 색만으로 뜻을 전하지 않게 텍스트는 항상 함께.
withDefaults(defineProps<{
  /** 톤 — 의미색 5종 + 분류용 3종 */
  variant?: 'default' | 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'violet' | 'teal' | 'pink'
  /** 외형 — subtle(면만·기본) / solid(채움) / outline(테두리만) */
  appearance?: 'subtle' | 'solid' | 'outline'
  size?: 'default' | 'sm'
}>(), { variant: 'default', appearance: 'subtle', size: 'default' })
</script>

<template>
  <span class="badge" :class="[
    variant !== 'default' && variant,
    appearance !== 'subtle' && appearance,
    size !== 'default' && size,
  ]">
    <slot />
  </span>
</template>
