<script setup lang="ts">
// origin: custom — 페이지·데이터 로딩용 풀스크린 로딩 화면.
// 브랜드 컬러 도트 44개가 구(sphere) 표면에서 회전하는 3D 인디케이터를 정중앙에 표시합니다.
// 원본 스펙: DocuRAG 디자인 산출물 "풀스크린 로딩 화면 디자인" (design_handoff_loading_indicator) — hifi, 수치 그대로.
import { onMounted, onBeforeUnmount, ref } from 'vue'

const props = withDefaults(defineProps<{
  /** false면 오버레이 없이 50×50 인디케이터만 인라인으로 렌더 */
  fullscreen?: boolean
  /** 모션 배속 — 스펙 기본 2 */
  speed?: number
  /** 인디케이터 한 변(px) — 스펙 기본 50 */
  size?: number
  /** 스크린리더용 라벨 — 시각적으로는 표시되지 않습니다 */
  label?: string
}>(), { fullscreen: true, speed: 2, size: 50, label: '불러오는 중' })

const host = ref<HTMLElement | null>(null)

const N = 44                      // 도트 수
const R = 20.5                    // 구 반지름 (디자인 단위 = px)
const ISO = Math.atan(1 / Math.sqrt(2)) // 35.26° — 공중제비 고도각
// 브랜드 블루 팔레트: 딥 → --primary(#1F7FF0) → 라이트 틴트. 조명 계산이라 hex 고정(스펙 확정값).
const STOPS = [[11, 84, 189], [31, 127, 240], [122, 182, 247]]
// 깊이 페이드가 녹아드는 목표색 — 배경(--background)을 읽어 라이트/다크 모두 자연스럽게
let bgRGB = [255, 255, 255]
let themeObs: MutationObserver | undefined

function readBg() {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--background').trim()
  const m = /^#([0-9a-f]{6})$/i.exec(v)
  if (m) bgRGB = [0, 1, 2].map((j) => parseInt(m[1].slice(j * 2, j * 2 + 2), 16))
}

let raf = 0
let timer: ReturnType<typeof setInterval> | undefined
let check: ReturnType<typeof setTimeout> | undefined
let ticked = false
let t0 = 0
let pts: { px: number, py: number, pz: number, x?: number, y?: number }[] = []
let els: HTMLElement[] = []

function grad(g: number, fade: number) {
  const seg = g < 0.5 ? 0 : 1
  const k = (g - seg * 0.5) * 2
  const a = STOPS[seg], b = STOPS[seg + 1]
  const out: number[] = []
  for (let j = 0; j < 3; j++) {
    const v = a[j] + (b[j] - a[j]) * k
    out.push(Math.round(v + (bgRGB[j] - v) * fade))
  }
  return `rgb(${out.join(',')})`
}

function paint(now: number) {
  ticked = true
  const t = (now - t0) / 1000 * props.speed
  // 케이던스: 상시 드리프트 + 3.4s 주기 후반의 이징 "서지".
  // 가로 120° 스핀과 세로 공중제비를 사이클마다 교대합니다.
  const P = 3.4
  const ph = (t % P) / P
  const su = Math.min(1, Math.max(0, (ph - 0.55) / 0.45))
  const surgeK = su * su * (3 - 2 * su)
  const cycle = Math.floor(t / P)
  const axisY = cycle % 2 === 0
  const doneY = Math.ceil(cycle / 2)
  const doneX = Math.floor(cycle / 2)
  const STEP = Math.PI * 2 / 3
  const ry = t * 0.3 + (doneY + (axisY ? surgeK : 0)) * STEP
  const flips = doneX + (!axisY ? surgeK : 0)
  const elev = ISO * Math.cos(flips * Math.PI)
  const rx = elev + 0.09 * Math.sin(t * 0.5) + 0.05 * Math.sin(t * 1.27) - 0.12 * Math.sin(su * Math.PI)
  const cy = Math.cos(ry), sy = Math.sin(ry)
  const cx = Math.cos(rx), sx = Math.sin(rx)
  // 수축-팽창 — 서지 직전 움츠렸다 튕겨나감
  const breathe = 1 + 0.07 * Math.sin(t * 0.9) - 0.14 * Math.sin(su * Math.PI)
  const half = props.size / 50 * 1.4
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i]
    const x1 = p.px * cy + p.pz * sy
    const z1 = -p.px * sy + p.pz * cy
    const y2 = p.py * cx - z1 * sx
    const z2 = p.py * sx + z1 * cx
    // 극→극으로 쓸고 가는 리플 웨이브
    const rad = (p.py / R + 1) * 1.5
    const ripple = Math.max(0, Math.sin(t * 2.4 - rad * 1.6))
    // 원근 투영 — 겹치는 도트가 완전히 포개지지 않게
    const pf = 170 / (170 - z2)
    const k = props.size / 50
    const px = x1 * breathe * pf * k
    const py = y2 * breathe * pf * k
    if (p.x === undefined || p.y === undefined) { p.x = px; p.y = py }
    // 스프링 팔로우스루 — 서지 때 유기적 잔상
    p.x += (px - p.x) * 0.22
    p.y += (py - p.y) * 0.22
    const dn = (z2 / (12 * 1.9) + 1) / 2 // 0 뒤 .. 1 앞
    const sc = 0.78 + 0.42 * dn + 0.22 * ripple
    const entry = Math.min(1, Math.max(0, (t - 0.1 - i * 0.04) / 0.7))
    const el = els[i]
    el.style.transform = `translate(${(p.x - half).toFixed(1)}px,${(p.y - half).toFixed(1)}px) scale(${sc.toFixed(3)})`
    el.style.opacity = (entry * (0.55 + 0.35 * dn + 0.1 * ripple)).toFixed(3)
    // 조명 기반 색상 — 좌상단 앞쪽 광원이 천천히 공전
    const la = -0.7 + 0.25 * Math.sin(t * 0.3)
    const lx = Math.sin(la) * 0.8, ly = -0.55, lz = Math.cos(la) * 0.8
    const lam = Math.max(0, Math.min(1, (x1 * lx + y2 * ly + z2 * lz) / R * 0.5 + 0.5))
    el.style.background = grad(1 - lam, (1 - dn) * 0.22)
  }
}

function loop(now: number) {
  raf = requestAnimationFrame(loop)
  paint(now)
}

onMounted(() => {
  const el = host.value
  if (!el) return
  const GA = Math.PI * (3 - Math.sqrt(5)) // 골든 앵글 — 피보나치 구 분포
  const dot = 2.8 * props.size / 50
  pts = []; els = []
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const th = i * GA
    pts.push({ px: Math.cos(th) * r * R, py: y * R, pz: Math.sin(th) * r * R })
    const d = document.createElement('div')
    d.style.cssText = `position:absolute;left:50%;top:50%;width:${dot}px;height:${dot}px;border-radius: 50%;opacity:0;will-change:transform,opacity,background;`
    el.appendChild(d)
    els.push(d)
  }
  readBg()
  themeObs = new MutationObserver(readBg)
  themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] })
  t0 = performance.now()
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduced) { paint(t0 + 2400) ; return } // 등장 완료 뒤의 정지 프레임 하나만
  raf = requestAnimationFrame(loop)
  // rAF가 뛰지 않는 호스트(iframe 등) 대비 워치독 → setInterval 폴백
  check = setTimeout(() => {
    if (!ticked) {
      cancelAnimationFrame(raf)
      timer = setInterval(() => paint(performance.now()), 16)
    }
  }, 200)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  if (check) clearTimeout(check)
  if (timer) clearInterval(timer)
  themeObs?.disconnect()
})
</script>

<template>
  <div :class="['loading-screen', { 'loading-screen--inline': !fullscreen }]"
       role="status" :aria-label="label">
    <div ref="host" class="loading-screen__sphere" aria-hidden="true"
         :style="{ width: size + 'px', height: size + 'px' }"></div>
  </div>
</template>
