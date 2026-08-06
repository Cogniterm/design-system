<script setup lang="ts">
// origin: custom — Vuetify 시각 오버라이드 없이 직접 제작 (브리프 B그룹)
import { computed } from 'vue'
const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'default' | 'sm' | 'md' | 'lg'
  disabled?: boolean
  /** 진행 중 — 스피너를 앞에 붙이고 누를 수 없게 합니다.
   *  어떤 스피너를 쓸지는 variant를 보고 알아서 고릅니다: 색이 채워진 면
   *  (primary·danger)에는 흰 스피너, 나머지에는 글자색 스피너.
   *  브랜드색 스피너를 브랜드색 버튼에 얹으면 색이 같아 아예 보이지 않습니다. */
  loading?: boolean
  // 폼 안의 <button>은 기본이 submit이라 누르면 폼이 제출됩니다.
  // 대부분은 그걸 원하지 않으므로 button을 기본으로 두고, 필요할 때 바꿉니다.
  type?: 'button' | 'submit' | 'reset'
}>(), { variant: 'primary', size: 'default', type: 'button' })

/* 면이 채워진 버튼인가 — 그 위에서는 흰 스피너여야 보입니다 */
const solid = computed(() => props.variant === 'primary' || props.variant === 'danger')
</script>

<template>
  <button
    :type="type"
    class="btn"
    :class="[`btn-${variant}`, size !== 'default' && `btn-${size}`, loading && 'is-loading']"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
  >
    <!-- 글자를 지우지 않고 스피너를 앞에 붙입니다 — 버튼 너비가 변하면 옆 버튼이 밀립니다 -->
    <span v-if="loading" class="spinner" :class="solid ? 'on-brand' : 'current'" aria-hidden="true"></span>
    <slot />
  </button>
</template>
