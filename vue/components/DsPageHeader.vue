<script setup lang="ts">
// origin: custom — 화면 제목줄. 제목 왼쪽 · 액션 오른쪽 (콘솔 .ptitle 그대로)
// 화면의 기본 액션(만들기 · 편집 · 저장)은 여기 오른쪽에 둡니다 — 필터줄에는 거르는 것만
defineProps<{
  /** 화면 제목 — GNB 메뉴 이름과 같은 낱말 */
  title: string
}>()
</script>

<template>
  <div class="ptitle">
    <h1>{{ title }}</h1>
    <slot />
  </div>
</template>
