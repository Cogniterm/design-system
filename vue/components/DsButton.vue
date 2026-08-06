<script setup lang="ts">
// origin: custom — Vuetify 시각 오버라이드 없이 직접 제작 (브리프 B그룹)
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'default' | 'sm' | 'md' | 'lg'
  disabled?: boolean
  // 폼 안의 <button>은 기본이 submit이라 누르면 폼이 제출됩니다.
  // 대부분은 그걸 원하지 않으므로 button을 기본으로 두고, 필요할 때 바꿉니다.
  type?: 'button' | 'submit' | 'reset'
}>(), { variant: 'primary', size: 'default', type: 'button' })
</script>

<template>
  <button
    :type="type"
    class="btn"
    :class="[`btn-${variant}`, size !== 'default' && `btn-${size}`]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
