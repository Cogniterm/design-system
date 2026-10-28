<script setup lang="ts">
// origin: custom — 요약 숫자 카드 (콘솔 .summary .card 그대로)
// 여러 장을 <div class="summary"> 로 감싸면 넉 장 한 줄 · 적으면 왼쪽부터 같은 칸 폭입니다
// ⚠ 속성 이름은 콘솔 공용/부품/ReportStat.vue 와 같게 맞췄습니다(label · value · unit · of · sub · delta) —
//   콘솔이 이 부품으로 옮길 때 호출부를 고치지 않아도 되게
withDefaults(defineProps<{
  /** 무엇을 센 숫자인가 — '오늘 검색' */
  label: string
  /** 숫자 — number 면 천 단위 쉼표를 붙입니다 */
  value: string | number
  /** 단위 — '초' · '건'. 숫자에 붙되 한 단 작게 */
  unit?: string
  /** 분모 — 값 옆에 ' / 26,482' 로 한 단 작게 */
  of?: string | number
  /** 곁말 한 줄 — 집계 기준 · 비율 */
  sub?: string
  /** 증감 글자 — '+12%' */
  delta?: string
  /** 증감의 뜻 — 방향이 아니라 좋고 나쁨. 나쁜 지표가 늘면 bad */
  deltaTone?: 'good' | 'bad' | 'flat'
  /** 증감의 비교 기준 — '직전 30일 대비' */
  deltaLabel?: string
}>(), { deltaTone: 'flat' })

const fmt = (v: string | number) => (typeof v === 'number' ? v.toLocaleString('ko-KR') : v)
</script>

<template>
  <div class="card">
    <span class="l">{{ label }}</span>
    <span class="v">{{ fmt(value) }}<em v-if="unit">{{ unit }}</em><span v-if="of != null" class="card-of"> / {{ fmt(of) }}</span></span>
    <span v-if="sub" class="s">{{ sub }}</span>
    <span v-if="delta" class="delta" :class="`delta--${deltaTone}`">{{ delta }}<span v-if="deltaLabel" class="delta-l"> · {{ deltaLabel }}</span></span>
  </div>
</template>
