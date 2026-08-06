<script setup lang="ts">
// origin: custom — 본문 옆에 붙는 목차. Vuetify에 대응 컴포넌트가 없습니다.
// 어디에: 긴 문서·설정 화면. 절이 3개 미만이면 쓰지 않습니다 — 목록이 본문보다 짧으면 도움이 안 됩니다.
//
// 공식 명칭: Table of Contents. 문서 사이트에서는 "On this page"로도 부릅니다
// (Astryx · Primer는 AnchorNav, MUI·Docusaurus는 TableOfContents).
import { onMounted, onBeforeUnmount, ref } from 'vue'

export interface TocItem { id: string; label: string }

const props = withDefaults(defineProps<{
  items: TocItem[]
  /** 스크롤을 감지할 대상. 기본은 창 전체 */
  scrollTarget?: HTMLElement | null
}>(), { scrollTarget: null })

const active = ref(props.items[0]?.id ?? '')

/* 눌러서 이동하는 동안에는 스크롤 감지가 표시를 도로 뺏지 않게 잠급니다.
   부드러운 스크롤은 여러 프레임에 걸쳐 일어나고, 그 사이 중간 절들이
   차례로 화면에 들어오기 때문입니다. */
let lockedUntil = 0

function go (id: string, e: Event) {
  e.preventDefault()
  active.value = id
  lockedUntil = Date.now() + 700
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

let obs: IntersectionObserver | null = null

function onScroll () {
  if (Date.now() < lockedUntil) return
  const el = props.scrollTarget ?? document.scrollingElement
  if (!el) return
  /* 바닥에 닿으면 마지막 항목입니다.
     스크롤 감지만으로는 마지막 절이 끝내 켜지지 않습니다 — 스크롤이 끝까지
     내려가도 마지막 제목이 화면 위쪽 띠까지 올라오지 못하기 때문입니다.
     문서가 짧을수록 확실히 그렇습니다. */
  if (el.scrollHeight - el.scrollTop - el.clientHeight < 4) {
    active.value = props.items[props.items.length - 1]?.id ?? active.value
  }
}

onMounted(() => {
  obs = new IntersectionObserver((entries) => {
    if (Date.now() < lockedUntil) return
    for (const e of entries) if (e.isIntersecting) active.value = e.target.id
  }, { rootMargin: '-10% 0px -80% 0px' })
  for (const i of props.items) {
    const el = document.getElementById(i.id)
    if (el) obs.observe(el)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  obs?.disconnect()
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <!-- nav + aria-label — 스크린 리더가 "목차"라는 이름으로 건너뛸 수 있게 -->
  <nav class="ds-toc" aria-label="목차">
    <a
      v-for="i in items" :key="i.id"
      :href="`#${i.id}`"
      :class="{ on: active === i.id }"
      :aria-current="active === i.id ? 'location' : undefined"
      @click="go(i.id, $event)"
    >{{ i.label }}</a>
  </nav>
</template>
