<script setup lang="ts">
// origin: custom — VRadioGroup을 버리고 직접 제작.
// 이유: Vuetify는 선택 표시를 아이콘 글리프(CircleDot)로 그리는데, 안쪽 점이
// 1.5px 선으로 된 아주 작은 원이라 "채워진 점"으로 보이지 않았습니다.
// 크기를 키워도 글리프라 비율이 어긋납니다. 여기서는 원과 점을 CSS로 그려
// 어떤 크기에서도 같은 비율(점 = 상자의 37.5%)이 유지됩니다.
// 네이티브 <input type="radio">를 쓰므로 ← → 이동·그룹 포커스는 브라우저가 처리합니다.
import { useId } from 'vue'

withDefaults(defineProps<{
  label?: string
  items: { value: any; label: string; hint?: string; disabled?: boolean }[]
  inline?: boolean
  /** 원 14 / 16 / 20px */
  size?: 'sm' | 'default' | 'lg'
  disabled?: boolean
}>(), { inline: false, size: 'default' })

const model = defineModel<any>()
defineOptions({ inheritAttrs: false })

const uid = useId()
const name = `ds-radio-${uid}`
</script>

<template>
  <div class="ds-radio" :class="size !== 'default' && `ds-radio--${size}`">
    <label v-if="label" class="ds-radio__group-label">{{ label }}</label>
    <div class="ds-radio__group" :class="{ 'is-inline': inline }" role="radiogroup" :aria-label="label">
      <label
        v-for="i in items" :key="i.value"
        class="ds-radio__row" :class="{ 'is-disabled': disabled || i.disabled }"
      >
        <span class="ds-radio__mark" :class="{ 'is-on': model === i.value }">
          <input
            type="radio" :name="name" :value="i.value" v-model="model"
            :disabled="disabled || i.disabled" v-bind="$attrs"
          />
        </span>
        <span class="ds-radio__text">
          {{ i.label }}
          <span v-if="i.hint" class="ds-radio__hint">{{ i.hint }}</span>
        </span>
      </label>
    </div>
  </div>
</template>
