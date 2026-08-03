<script setup lang="ts">
// origin: custom — 본문 속 링크. 브랜드색 + 호버 밑줄
withDefaults(defineProps<{
  href: string
  external?: boolean   // 새 탭 + 외부 표시 아이콘 자리(#icon 슬롯)
}>(), { external: false })
</script>
<template>
  <a class="ds-link" :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener' : undefined">
    <slot /><slot name="icon" />
  </a>
</template>
