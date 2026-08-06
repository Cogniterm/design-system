<script setup lang="ts">
// origin: wrapped — VDialog 기반. ⌘K 전역 검색·실행
// 어디에: 어디서든 문서·에이전트·명령으로 점프
// 공식 명칭: Command Palette (⌘K menu · command menu)
import { computed, ref, useId, watch } from 'vue'
import { VDialog } from 'vuetify/components'

export interface PaletteItem { id: string; title: string; group?: string; hint?: string }
const props = withDefaults(defineProps<{
  items: PaletteItem[]
  placeholder?: string
  /** 결과 상한 — 넘치면 목록이 스크롤됩니다 */
  limit?: number
}>(), { limit: 30 })
const open = defineModel<boolean>({ default: false })
const emit = defineEmits<{ select: [item: PaletteItem] }>()

const q = ref(''); const active = ref(0)
const results = computed(() => {
  const s = q.value.trim().toLowerCase()
  const list = s ? props.items.filter((i) => i.title.toLowerCase().includes(s)) : props.items
  return list.slice(0, props.limit)
})
/* group이 있으면 머리글로 묶어 보여줍니다. 키보드 이동은 묶기 전 순서(평면 index)로
   해야 하므로, 화면용 묶음에 원래 index를 함께 실어 보냅니다. */
const sections = computed(() => {
  const out: { group: string; items: { item: PaletteItem; n: number }[] }[] = []
  results.value.forEach((item, n) => {
    const g = item.group ?? ''
    const last = out[out.length - 1]
    if (last && last.group === g) last.items.push({ item, n })
    else out.push({ group: g, items: [{ item, n }] })
  })
  return out
})
/* 열릴 때만 검색어를 비웁니다.
   전에는 [q, open]을 함께 보고 있어서, 글자를 칠 때마다 감시자가 돌며 q를 비웠습니다
   — 팔레트는 열리는데 아무것도 입력되지 않았습니다. */
watch(open, (v) => { if (v) { q.value = ''; active.value = 0 } })
watch(q, () => { active.value = 0 })

/* 포커스는 입력창에 있고 선택은 목록에서 움직이므로,
   지금 어느 항목이 선택됐는지 aria-activedescendant로 알려야 읽힙니다. */
const uid = useId()
const listId = `ds-palette-list-${uid}`
const optId = (n: number) => `ds-palette-opt-${uid}-${n}`

function move(d: number) {
  const max = results.value.length - 1
  if (max < 0) return
  active.value = Math.min(Math.max(active.value + d, 0), max)
  // 선택 항목이 보이도록 스크롤
  document.getElementById(optId(active.value))?.scrollIntoView({ block: 'nearest' })
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') { e.preventDefault(); move(1) }
  else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1) }
  else if (e.key === 'Enter' && results.value[active.value]) { pick(results.value[active.value]) }
}
function pick(i: PaletteItem) { emit('select', i); open.value = false }
</script>
<template>
  <VDialog v-model="open" width="560" location="top" class="ds-palette-dialog">
    <div class="ds-palette" @keydown="onKey">
      <input
        v-model="q" class="ds-palette-input" :placeholder="placeholder ?? '검색 또는 명령…'"
        autofocus aria-label="명령 검색"
        role="combobox" aria-expanded="true" :aria-controls="listId"
        :aria-activedescendant="results[active] ? optId(active) : undefined"
      />
      <div :id="listId" class="ds-palette-list" role="listbox">
        <div v-if="!results.length" class="ds-palette-empty">결과가 없습니다</div>
        <template v-for="(sec, si) in sections" :key="si">
          <div v-if="sec.group" class="ds-palette-label">{{ sec.group }}</div>
          <button
            v-for="{ item, n } in sec.items" :key="item.id"
            :id="optId(n)" type="button"
            class="ds-palette-item" :class="{ active: n === active }"
            role="option" :aria-selected="n === active"
            @mouseenter="active = n" @click="pick(item)"
          >
            <span class="pi-title">{{ item.title }}</span>
            <kbd v-if="item.hint" class="kbd">{{ item.hint }}</kbd>
          </button>
        </template>
      </div>
      <!-- 조작법 — 키보드로 쓰는 물건이라 방법을 화면에 남깁니다.
           키캡 안 화살표는 SVG입니다: 글자 ↑ ↓ ↵는 글꼴에 따라 모양이 갈립니다. -->
      <div class="ds-palette-foot">
        <span>
          <kbd class="kbd"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg></kbd>
          <kbd class="kbd"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg></kbd>
          이동
        </span>
        <span>
          <kbd class="kbd"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 10l-5 5 5 5" /><path d="M20 4v7a4 4 0 0 1-4 4H4" /></svg></kbd>
          선택
        </span>
        <span><kbd class="kbd">Esc</kbd> 닫기</span>
      </div>
    </div>
  </VDialog>
</template>
