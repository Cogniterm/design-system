<script setup lang="ts">
// origin: custom — VBtnToggle을 버리고 직접 제작.
// 이유: 세그먼티드 컨트롤은 시각이 전부인데 Vuetify의 density·높이 계산과
// 싸우면 트랙(32px) 안 칩(26px) 높이를 통제할 수 없습니다 (칩이 14px로 눌림).
// 모양: 회색 트랙 + 선택 항목만 흰 칩 (Astryx SegmentedControl 참고)
const props = withDefaults(defineProps<{
  items: { value: any; label: string }[]
  /** 컨트롤 스케일 32/40/48 — 필터 바·툴바는 sm */
  size?: 'sm' | 'default' | 'lg'
}>(), { size: 'default' })
const model = defineModel<any>()

// 라디오 그룹 관례: ← →로 선택 이동
function onKey(e: KeyboardEvent) {
  const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1
    : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
  if (!dir) return
  e.preventDefault()
  const idx = props.items.findIndex(i => i.value === model.value)
  const next = props.items[(idx + dir + props.items.length) % props.items.length]
  model.value = next.value
  ;((e.currentTarget as HTMLElement).children[
    props.items.indexOf(next)] as HTMLElement)?.focus()
}
</script>

<template>
  <div class="ds-btn-group" :class="size !== 'default' && `ds-btn-group--${size}`"
       role="radiogroup" @keydown="onKey">
    <button
      v-for="i in items" :key="i.value" type="button"
      class="ds-btn-group__seg" :class="{ 'is-on': model === i.value }"
      role="radio" :aria-checked="model === i.value"
      :tabindex="model === i.value ? 0 : -1"
      @click="model = i.value"
    >{{ i.label }}</button>
  </div>
</template>
