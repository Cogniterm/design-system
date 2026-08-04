<script setup lang="ts">
// origin: custom — 드라이브 리스트 보기 한 줄 (compact 42px)
// icon: 어떤 아이콘인지 알려주는 값. 실제 그림은 #icon 슬롯이 그립니다
//       (Standalone 계층이라 Lucide를 직접 import하지 않습니다).
// checkbox: 다중 선택 피커에서 앞에 체크박스를 노출 (선택 상태는 selected로 반영).
// #trailing: 이름 뒤 우측에 배지·상태 같은 부가 정보 (예: CSO 등급).
import type { IconName } from '../icons'
defineProps<{
  name: string
  meta?: string
  icon?: IconName
  selected?: boolean
  checkbox?: boolean
  disabled?: boolean
}>()
const emit = defineEmits<{ select: [] }>()
</script>

<template>
  <div
    class="file-row" :class="{ selected, disabled }"
    role="option" :aria-selected="!!selected" :aria-disabled="disabled || undefined"
    :tabindex="disabled ? -1 : 0"
    @click="!disabled && emit('select')"
    @keydown.enter.prevent="!disabled && emit('select')"
    @keydown.space.prevent="!disabled && emit('select')"
  >
    <input
      v-if="checkbox" type="checkbox" class="f-check"
      :checked="!!selected" :disabled="disabled" tabindex="-1" aria-hidden="true"
    />
    <span v-if="icon || $slots.icon" class="f-icon"><slot name="icon" /></span>
    <span class="f-name">{{ name }}</span>
    <slot name="afterName" />
    <span class="f-fill" aria-hidden="true" />
    <slot name="trailing" />
    <span v-if="meta" class="f-meta">{{ meta }}</span>
  </div>
</template>
