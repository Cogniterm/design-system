<script setup lang="ts">
// origin: custom — 점 + 상태 글자 (콘솔 .state 그대로). 표 칸의 '지금 상태'
// 색만으로 뜻을 전하지 않게 글자는 늘 함께입니다. 한 번의 결과(완료 · 실패)는 DsBadge
withDefaults(defineProps<{
  /** 톤 — ok(정상 · 활성) · wait(대기 · 확인 필요) · err(오류) · off(일시정지 · 비활성) · neutral */
  tone?: 'neutral' | 'ok' | 'wait' | 'err' | 'off'
}>(), { tone: 'neutral' })
</script>

<template>
  <span class="state" :class="tone !== 'neutral' && tone"><slot /></span>
</template>
