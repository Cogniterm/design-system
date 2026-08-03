<script setup lang="ts">
// origin: wrapped — VDialog 기반. ⌘K 전역 검색·실행
// 어디에: 어디서든 문서·에이전트·명령으로 점프
import { computed, ref, useId, watch } from 'vue'
import { VDialog } from 'vuetify/components'

export interface PaletteItem { id: string; title: string; group?: string; hint?: string }
const props = defineProps<{ items: PaletteItem[]; placeholder?: string }>()
const open = defineModel<boolean>({ default: false })
const emit = defineEmits<{ select: [item: PaletteItem] }>()

const q = ref(''); const active = ref(0)
const results = computed(() => {
  const s = q.value.trim().toLowerCase()
  const list = s ? props.items.filter((i) => i.title.toLowerCase().includes(s)) : props.items
  return list.slice(0, 12)
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

function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') { e.preventDefault(); active.value = Math.min(active.value + 1, results.value.length - 1) }
  else if (e.key === 'ArrowUp') { e.preventDefault(); active.value = Math.max(active.value - 1, 0) }
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
        <button
          v-for="(i, n) in results" :key="i.id"
          :id="optId(n)" type="button"
          class="ds-palette-item" :class="{ active: n === active }"
          role="option" :aria-selected="n === active"
          @mouseenter="active = n" @click="pick(i)"
        >
          <span class="pi-title">{{ i.title }}</span>
          <span v-if="i.group" class="pi-group">{{ i.group }}</span>
          <kbd v-if="i.hint" class="kbd">{{ i.hint }}</kbd>
        </button>
      </div>
    </div>
  </VDialog>
</template>
