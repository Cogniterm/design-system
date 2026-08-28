<script setup lang="ts">
// origin: custom — 읽기 전용 상태 라벨 (조작 가능한 건 DsChip)
// 두 축: 톤(variant)과 외형(appearance). 색만으로 뜻을 전하지 않게 텍스트는 항상 함께.
withDefaults(defineProps<{
  /** 톤 — 의미색 5종 + 분류용 3종.
      ⚠ 분류용은 **색 이름이 아니라 범주 팔레트의 슬롯 번호**입니다 (2026-08-28 개명:
      violet · teal · pink → cat-3 · cat-2 · cat-5). 범주 색은 앱을 따라 값이 바뀌므로
      색 이름으로 부르면 이름이 거짓말이 됩니다 — 실제로 그랬습니다 */
  variant?: 'default' | 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'cat-2' | 'cat-3' | 'cat-5'
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
