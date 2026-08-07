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
    <input
      v-model="model" type="search" :placeholder="placeholder"
      @focus="focused = true" @blur="focused = false"
      @keydown.enter="emit('search', model)"
    />
    <kbd v-if="shortcut && !focused && !model" class="kbd sf-kbd">{{ shortcut }}</kbd>
    <button v-if="model" class="sf-clear" aria-label="지우기" @click="model = ''">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>
  </div>
</template>
