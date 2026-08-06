<script setup lang="ts">
import { useId } from 'vue'
// origin: wrapped — VAutocomplete 기반. 검색 가능한 선택
// 어디에: 옵션이 10개를 넘는 선택 (사용자 지정, 태그 붙이기)
import { VAutocomplete } from 'vuetify/components'
withDefaults(defineProps<{ items: any[]; label?: string; multiple?: boolean; error?: string; placeholder?: string 
  /** 컨트롤 스케일 — 기본 32 / md 36 / lg 40 (sm은 32의 다른 이름) */
  size?: 'sm' | 'default' | 'md' | 'lg'
}>(), { size: 'default' })
const model = defineModel<any>()
/* 칩은 다중 선택에서만 씁니다. 하나만 고르는 필드에서 값 하나를 칩으로
   감싸면 "지울 수 있는 여러 개 중 하나"처럼 읽혀서, 실제로는 바꿔야 하는데
   지우려 듭니다. 단일 선택은 고른 값을 그냥 글자로 둡니다. */
/* 소비자가 준 속성(disabled·required·name·error-messages 등)이 바깥 <div>가 아니라
   진짜 Vuetify 컴포넌트에 붙게 합니다. 이게 없으면 조용히 무시됩니다. */
defineOptions({ inheritAttrs: false })
/* 라벨을 위에 따로 그리는 디자인이라, id로 묶어주지 않으면 스크린 리더가
   이 입력의 이름을 읽지 못하고 라벨을 눌러도 포커스가 가지 않습니다. */
const uid = useId()
const fieldId = `ds-field-${uid}`
const msgId = `ds-field-msg-${uid}`
</script>
<template>
  <div class="field ds-vfield" :class="{ 'ds-vfield--sm': size === 'sm' }">
    <label v-if="label" :for="fieldId">{{ label }}</label>
    <VAutocomplete :id="fieldId" :aria-describedby="error ? msgId : undefined" v-model="model" :items="items" :multiple="multiple" :error="!!error"
      :placeholder="placeholder" variant="outlined" :density="size === 'lg' ? 'default' : size === 'md' ? 'comfortable' : 'compact'"
      hide-details="auto"
      :chips="multiple" :closable-chips="multiple" v-bind="$attrs" />
    <div v-if="error" :id="msgId" class="hint error">{{ error }}</div>
  </div>
</template>
