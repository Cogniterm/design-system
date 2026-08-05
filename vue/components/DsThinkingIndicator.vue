<script setup lang="ts">
// origin: custom — 원칙 1: 빈 스피너 대신 무엇을 하는지 텍스트로 (10초+ 걸리면 단계별 갱신)
// 모션 스펙: Soft Rise v1.0 (DocuRAG "AI 응답 생성 인디케이터 설계_최종본")
//  · 단계 전환 최소 간격 2.5초, 최소 노출 500ms — 호출부(앱)에서 지킵니다
import { ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  label?: string
  /** default: dot 6px + shimmer 라벨 · compact: dot 4px/12px · inline: 텍스트 뒤 도트 */
  size?: 'default' | 'compact' | 'inline'
}>(), { label: '', size: 'default' })

// 라벨(단계)이 바뀌면 노드를 교체해 450ms fade-in 재생
const labelKey = ref(0)
watch(() => props.label, () => { labelKey.value++ })
</script>

<template>
  <div class="thinking"
       :class="{ 'thinking--compact': size === 'compact', 'thinking--inline': size === 'inline' }"
       role="status" aria-live="polite">
    <span v-if="size !== 'inline'" class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
    <span :key="labelKey" class="t-label"><slot>{{ label || '답변 생성 중' }}</slot></span>
    <span v-if="size === 'inline'" class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
  </div>
</template>
