<script setup lang="ts">
// origin: custom — 검색 전용 입력 (돋보기 · 지우기 · 단축키 힌트 · 로딩)
import { ref } from 'vue'
withDefaults(defineProps<{
  placeholder?: string
  shortcut?: string      // 예: '⌘K' — 포커스 전에만 표시
  loading?: boolean
  /** 컨트롤 스케일 — 기본 32 / md 36 / lg 40 (sm은 32의 다른 이름).
   * 기본이 가장 작은 이유: 컨트롤은 대부분 툴바·필터 바·표 안에 줄지어 놓입니다. */
  size?: 'sm' | 'default' | 'md' | 'lg'
}>(), { placeholder: '검색…', size: 'default' })
const model = defineModel<string>({ default: '' })
const focused = ref(false)
const emit = defineEmits<{ search: [q: string] }>()
</script>
<template>
  <div class="searchfield" :class="[{ focused }, size !== 'default' && size]">
    <span class="sf-icon" aria-hidden="true">
      <svg v-if="!loading" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <span v-else class="spinner" style="width:14px;height:14px"></span>
    </span>
    <!-- ⛔ **v-model 을 쓰지 마세요** (2026-09-17) — 검색칸은 **치는 대로** 걸러지는데,
         v-model 은 IME **조합 중에는 값을 안 올립니다**(compositionstart 에서 el.composing 을
         세우고 compositionend 때 한 번에 올립니다). 한글은 음절이 끝나야 조합이 끝나므로
         자음 하나('ㅈ') · 한 음절('김')로는 **아무것도 안 걸리고**, 여러 음절을 쳐도
         **마지막 음절이 늘 한 박자 늦습니다**. 그래서 값을 칸에서 직접 읽습니다.
         ⚠ 그래도 조합은 안 깨집니다 — 되돌려 주는 값이 이미 같은 글자면 Vue 가 DOM 에
           다시 쓰지 않습니다. -->
    <input
      :value="model" type="search" :placeholder="placeholder"
      @input="model = ($event.target as HTMLInputElement).value"
      @focus="focused = true" @blur="focused = false"
      @keydown.enter="emit('search', model)"
    />
    <kbd v-if="shortcut && !focused && !model" class="kbd sf-kbd">{{ shortcut }}</kbd>
    <button v-if="model" class="sf-clear" aria-label="지우기" @click="model = ''">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>
  </div>
</template>
