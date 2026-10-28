<script setup lang="ts">
// origin: custom — 정해진 최대 대비 비율 하나 (Geist Gauge 결). 할당량 · 사용률처럼 '얼마나 찼나'가 요점일 때
// ⚠ 색은 부품이 정하지 않습니다 — 화면이 가진 기준 하나로 variant 를 고릅니다.
//   부품 안에 임계를 두면 같은 숫자가 화면마다 다른 색이 됩니다(콘솔 2026-09-15 riskTone 을 걷은 까닭)
import { computed } from 'vue'
const props = withDefaults(defineProps<{
  /** 값 — 0 ~ max */
  value: number
  /** 최대 — 좌석 7 / 10 이면 :value="7" :max="10" */
  max?: number
  /** 무엇의 비율인가 — 스크린리더가 읽는 이름('저장 공간 사용률') */
  label: string
  /** sm 24 · md 48 · lg 80 */
  size?: 'sm' | 'md' | 'lg'
  /** 고리 안에 숫자 — 단위 없이 숫자만. sm 은 자리가 없어 그리지 않습니다 */
  showValue?: boolean
  variant?: 'brand' | 'success' | 'warning' | 'danger'
}>(), { max: 100, size: 'md', variant: 'brand' })

const pct = computed(() => (props.max > 0 ? Math.min(100, Math.max(0, (props.value / props.max) * 100)) : 0))
</script>

<template>
  <span
    class="gauge"
    :class="[size !== 'md' && `gauge--${size}`, variant !== 'brand' && variant]"
    role="meter" :aria-label="label" aria-valuemin="0" :aria-valuemax="max" :aria-valuenow="value"
    :style="{ '--gauge-value': pct }"
  >
    <svg viewBox="0 0 36 36" aria-hidden="true">
      <circle class="gauge__track" cx="18" cy="18" r="15.75" />
      <circle class="gauge__arc" cx="18" cy="18" r="15.75" pathLength="100" />
    </svg>
    <span v-if="showValue && size !== 'sm'" class="gauge__value">{{ Math.round(value) }}</span>
  </span>
</template>
