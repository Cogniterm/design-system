<script setup lang="ts">
// origin: custom — 이미지·미디어 생성처럼 결과 자체를 기다리는 화면의 도트 필드 로더.
// 진행률도 문구도 없이 "시스템이 살아서 일하고 있음"만 전달합니다.
// 원본 스펙: DocuRAG 디자인 산출물 "AI 이미지 생성 로딩 UI" (design_handoff_ai_loading)
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'

const props = withDefaults(defineProps<{
  /** 정사각 그리드 한 변의 도트 수 */
  cols?: number
  /** 모션 배속 */
  speed?: number
  /** 카드 최대 폭(px) */
  size?: number
  /** 스크린리더용 라벨 — 시각적으로는 표시되지 않습니다 */
  label?: string
}>(), { cols: 17, speed: 1.1, size: 380, label: '콘텐츠 생성 중' })

const grid = ref<HTMLElement | null>(null)
let raf = 0

const count = computed(() => props.cols * props.cols)
const gridStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${props.cols}, 4px)`,
  gap: '12px',
}))

function paint(tMs: number) {
  const el = grid.value
  if (!el) return
  const dots = el.children as HTMLCollectionOf<HTMLElement>
  const n = props.cols
  const k = (n - 1) / 16 // 스펙은 17열(중심 8) 기준 — 다른 열 수에도 비율 유지
  const c0 = (n - 1) / 2
  const t = tMs * 0.001 * props.speed
  const fx = c0 + (Math.sin(t * 0.9) * 3.8 + Math.sin(t * 0.42) * 2.0) * k
  const fy = c0 + (Math.cos(t * 0.74) * 3.6 + Math.cos(t * 0.5) * 1.8) * k
  const radius = (5.5 + Math.sin(t * 1.1) * 2.2) * k
  for (let i = 0; i < dots.length; i++) {
    const c = i % n, r = (i / n) | 0
    const dist = Math.hypot(c - fx, r - fy)
    let v = Math.min(Math.max(1 - dist / radius, 0), 1)
    v = v * v * (3 - 2 * v) // smoothstep
    dots[i].style.transform = `scale(${0.35 + v * 0.75})`
    dots[i].style.opacity = String(0.12 + v * 0.72)
  }
}

function loop(now: number) {
  paint(now)
  raf = requestAnimationFrame(loop)
}

onMounted(() => {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduced) paint(1600) // 중간 사이클의 정지 프레임 하나만
  else raf = requestAnimationFrame(loop)
})
onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<template>
  <div class="dotfield" role="status" :aria-label="label"
       :style="{ maxWidth: size + 'px' }">
    <div ref="grid" class="dotfield-grid" aria-hidden="true" :style="gridStyle">
      <i v-for="i in count" :key="i"></i>
    </div>
  </div>
</template>
