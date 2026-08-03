<script setup lang="ts">
// origin: custom — 시각 표기 (용어집 규칙 내장)
// 7일 이내 = 상대("2시간 전"), 이후 = 절대(YYYY-MM-DD HH:mm) · 고정폭
import { computed } from 'vue'
const props = withDefaults(defineProps<{
  value: Date | string | number
  mode?: 'auto' | 'absolute' | 'relative'
}>(), { mode: 'auto' })

const d = computed(() => new Date(props.value))
const iso = computed(() => d.value.toISOString())
const text = computed(() => {
  const diff = Date.now() - d.value.getTime()
  const rel = props.mode === 'relative' ||
    (props.mode === 'auto' && diff >= 0 && diff < 7 * 864e5)
  if (rel) {
    const m = Math.floor(diff / 6e4)
    if (m < 1) return '방금'
    if (m < 60) return `${m}분 전`
    const h = Math.floor(m / 60)
    if (h < 24) return `${h}시간 전`
    return `${Math.floor(h / 24)}일 전`
  }
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.value.getFullYear()}-${p(d.value.getMonth() + 1)}-${p(d.value.getDate())} ${p(d.value.getHours())}:${p(d.value.getMinutes())}`
})
</script>
<template>
  <time class="ds-time" :datetime="iso" :title="iso">{{ text }}</time>
</template>
