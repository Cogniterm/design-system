<script setup lang="ts">
// origin: custom — 기본 동작 하나 + 그 곁 변형 1~4개 (Geist Split Button 결)
// Vuetify 없이 그려 관리자 콘솔에서도 같습니다. 목록 모양은 콘솔 .pop 과 같은 값(ds.css .splitbtn__menu)
// 서로 다른 동작을 모으는 자리가 아닙니다 — 그건 DsMenu(더보기)
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'

export interface SplitButtonItem {
  label: string
  value: string
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  /** 기본 동작 — 왼쪽 버튼 글자 */
  label: string
  /** ▾ 를 누르면 뜨는 변형 1~4개. 첫 줄에 기본 동작을 다시 두면 키보드 · 스크린리더도 같은 선택지를 봅니다 */
  items: SplitButtonItem[]
  /** ▾ 버튼의 이름 — 스크린리더가 읽습니다('다른 저장 방법') */
  menuLabel: string
  /** 파괴적 동작은 받지 않습니다 — 삭제는 SplitButton 에 넣지 않습니다 */
  variant?: 'primary' | 'secondary'
  size?: 'default' | 'sm'
  /** 목록을 맞출 끝 — 버튼이 오른쪽 끝에 붙어 있으면 end */
  align?: 'start' | 'end'
  disabled?: boolean
}>(), { variant: 'primary', size: 'default', align: 'start' })

const emit = defineEmits<{
  /** 왼쪽(기본 동작)을 눌렀을 때 */
  click: [e: MouseEvent]
  /** 목록에서 고른 항목의 value */
  select: [value: string]
}>()

const id = useId()
const open = ref(false)
const root = ref<HTMLElement>()
const more = ref<HTMLButtonElement>()
const menu = ref<HTMLElement>()
const cls = computed(() => [props.variant === 'primary' && 'btn-primary', props.size === 'sm' && 'btn-sm'])

const enabled = () => [...(menu.value?.querySelectorAll<HTMLButtonElement>('.splitbtn__item:not([disabled])') ?? [])]
function close(refocus: boolean) {
  if (!open.value) return
  open.value = false
  if (refocus) more.value?.focus()
}
async function show(at?: number) {
  open.value = true
  await nextTick()
  if (at == null) return
  const list = enabled()
  // at() 는 쓰지 않습니다 — 앱의 TS lib(ES2020)에 없어 타입 검사가 멈춥니다(DocuPortal UX 2026-10-28)
  list[at < 0 ? list.length + at : at]?.focus()
}
const toggle = () => (open.value ? close(false) : show())
function pick(it: SplitButtonItem) {
  emit('select', it.value)
  close(true)
}
function onMenuKey(e: KeyboardEvent) {
  const list = enabled()
  const i = list.indexOf(document.activeElement as HTMLButtonElement)
  const go = (n: number) => { e.preventDefault(); list[(n + list.length) % list.length]?.focus() }
  if (e.key === 'ArrowDown') go(i + 1)
  else if (e.key === 'ArrowUp') go(i - 1)
  else if (e.key === 'Home') go(0)
  else if (e.key === 'End') go(list.length - 1)
}
/* 바깥을 누르거나 Tab 으로 나가면 닫습니다 — 포커스는 옮겨 간 자리에 둡니다 */
function onOutside(e: PointerEvent) {
  if (!root.value?.contains(e.target as Node)) close(false)
}
function onFocusOut(e: FocusEvent) {
  if (!root.value?.contains(e.relatedTarget as Node | null) && e.relatedTarget) close(false)
}
watch(open, (v) => (v ? document.addEventListener('pointerdown', onOutside) : document.removeEventListener('pointerdown', onOutside)))
onBeforeUnmount(() => document.removeEventListener('pointerdown', onOutside))
</script>

<template>
  <div ref="root" class="splitbtn" @keydown.esc="close(true)" @focusout="onFocusOut">
    <button type="button" class="btn" :class="cls" :disabled="disabled" @click="emit('click', $event)">{{ label }}</button>
    <button
      ref="more" type="button" class="btn splitbtn__more" :class="cls" :disabled="disabled"
      :aria-label="menuLabel" aria-haspopup="menu" :aria-expanded="open" :aria-controls="open ? id : undefined"
      @click="toggle" @keydown.down.prevent="show(0)" @keydown.up.prevent="show(-1)"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
    </button>
    <div
      v-if="open" :id="id" ref="menu" class="splitbtn__menu" :class="align === 'end' && 'splitbtn__menu--end'"
      role="menu" :aria-label="menuLabel" @keydown="onMenuKey"
    >
      <button
        v-for="it in items" :key="it.value" type="button" class="splitbtn__item" role="menuitem" tabindex="-1"
        :disabled="it.disabled" @click="pick(it)"
      >{{ it.label }}</button>
    </div>
  </div>
</template>
