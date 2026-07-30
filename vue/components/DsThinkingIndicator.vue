<script setup lang="ts">
// origin: custom — 원칙 1: 빈 스피너 대신 무엇을 하는지 텍스트로 (10초+ 걸리면 단계별 갱신)
defineProps<{ label?: string }>()
</script>

<template>
  <div class="thinking">
    <span class="dots"><i></i><i></i><i></i></span>
    <slot>{{ label || '생각하는 중…' }}</slot>
  </div>
</template>
