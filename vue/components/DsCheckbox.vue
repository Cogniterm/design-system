<script setup lang="ts">
// origin: custom — VCheckbox를 버리고 직접 제작.
// 이유: Vuetify는 상자를 아이콘 글리프로 그려서 면을 채우려면 CSS로 상자를 덧대야 하고,
// 그러면 글리프 크기·정렬을 크기별로 맞출 수 없습니다(체크가 상자 밖으로 나가거나 눌립니다).
// 여기서는 상자를 CSS로, 체크·대시는 뷰박스가 고정된 SVG로 그려 항상 정중앙에 옵니다.
import { computed, useId } from 'vue'

const props = withDefaults(defineProps<{
  label?: string
  hint?: string
  /** 부분 선택 — 전체 선택 헤더에 씁니다 */
  indeterminate?: boolean
  disabled?: boolean
  /** 상자 14 / 16 / 20px */
  size?: 'sm' | 'default' | 'lg'
}>(), { size: 'default' })

const model = defineModel<boolean>({ default: false })
defineOptions({ inheritAttrs: false })

const uid = useId()
const inputId = `ds-check-${uid}`
const msgId = `ds-check-msg-${uid}`
const checked = computed(() => props.indeterminate || model.value === true)
</script>

<template>
  <div class="ds-check" :class="[size !== 'default' && `ds-check--${size}`, { 'is-disabled': disabled }]">
    <div class="ds-check__row">
      <span class="ds-check__box" :class="{ 'is-on': checked }">
        <input
          :id="inputId" v-model="model" type="checkbox"
          :disabled="disabled"
          :aria-checked="indeterminate ? 'mixed' : undefined"
          :aria-describedby="hint ? msgId : undefined"
          v-bind="$attrs"
        />
        <!-- 상자는 CSS, 표식은 SVG — 크기가 바뀌어도 획 굵기와 위치가 유지됩니다 -->
        <svg v-if="indeterminate" class="ds-check__mark" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M4 8h8" />
        </svg>
        <svg v-else-if="model" class="ds-check__mark" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3.5 8.5 6.5 11.5 12.5 5" />
        </svg>
      </span>
      <label v-if="label" :for="inputId" class="ds-check__label">{{ label }}</label>
    </div>
    <div v-if="hint" :id="msgId" class="hint ds-check__hint">{{ hint }}</div>
  </div>
</template>
