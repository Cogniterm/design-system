<script setup lang="ts">
// origin: custom — VTimeline을 버리고 직접 제작 (2026-08-28).
// 이유: VTimeline의 점은 면을 채운 원이라 링으로 바꾸려면 .v-timeline-divider__inner-dot을
// 뒤집어야 하고, 점 크기·선 두께·항목 간격이 전부 density 프리셋에 묶여 우리 치수로 통제되지
// 않았습니다. 타임라인은 포커스 트랩도 포지셔닝도 키보드 조작도 없는 **시각이 전부인 부품**이라
// 기여 가이드의 판단 기준상 custom이 맞습니다 (DsTreeview와 같은 길).
// 치수는 naive-ui n-timeline(medium) 규격 — 자세한 근거는 ds.css의 .ds-timeline 주석.
//
// ⚠ 글의 차례는 **제목 → 본문 → 시각**입니다. 시각을 맨 위로 올리지 마세요 —
//   목록을 훑을 때 먼저 읽혀야 하는 것은 '무엇이 있었나'입니다.
// ⚠ variant는 링 색을 거들 뿐입니다. 성공·실패를 색만으로 가르지 마세요(색각 이상에서 사라집니다) —
//   title이나 body가 글로도 말해야 합니다.
export interface TimelineItem {
  id: string | number
  /** 표시할 시각 문자열. datetime을 함께 주면 <time datetime>으로 나갑니다 */
  time: string
  /** 기계가 읽는 시각 (ISO 8601). 없으면 time을 그대로 씁니다 */
  datetime?: string
  title: string
  body?: string
  variant?: 'default' | 'success' | 'danger' | 'brand'
}
defineProps<{ items: TimelineItem[]; ariaLabel?: string }>()
</script>

<template>
  <!-- <ol>로 마크업해 **순서**를 보조기술에 전달합니다 (a11y 규칙) -->
  <ol class="ds-timeline" :aria-label="ariaLabel">
    <li v-for="i in items" :key="i.id"
        class="ds-timeline__item"
        :class="i.variant && i.variant !== 'default' ? `ds-timeline__item--${i.variant}` : null">
      <slot name="title" :item="i"><p class="ds-timeline__title">{{ i.title }}</p></slot>
      <slot name="body" :item="i">
        <div v-if="i.body" class="ds-timeline__body">{{ i.body }}</div>
      </slot>
      <slot name="time" :item="i">
        <time class="ds-timeline__time" :datetime="i.datetime || i.time">{{ i.time }}</time>
      </slot>
    </li>
  </ol>
</template>
