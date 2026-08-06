<script setup lang="ts">
// origin: wrapped — VDatePicker 기반
// 어디에: 화면에 펼쳐 두는 달력 — 예약 화면, 기간 필터 패널
//
// 이름에 대하여: 예전에 이 파일이 DatePicker였습니다. 하지만 대부분의
// 디자인 시스템에서 "펼쳐진 달력 격자"는 Calendar이고, DatePicker는
// 입력 필드에 달력이 딸린 것을 가리킵니다 (MUI · Ant Design · shadcn ·
// Mantine · Geist 모두 같습니다). 이름을 바꾸고 DatePicker는 따로 두었습니다.
import { computed } from 'vue'
import { VDatePicker } from 'vuetify/components'

const props = withDefaults(defineProps<{
  /** single = 하루 · multiple = 여러 날 · range = 기간(시작~종료) */
  mode?: 'single' | 'multiple' | 'range'
  /** 선택할 수 있는 최소·최대 날짜 */
  min?: string | Date
  max?: string | Date
  /** 지난 날짜를 막습니다 — 예약처럼 앞날만 고르는 화면 */
  disablePast?: boolean
  /** 앞날을 막습니다 — 감사 로그처럼 지난 기간만 고르는 화면 */
  disableFuture?: boolean
}>(), { mode: 'single' })

const model = defineModel<any>()

/* disabled·name 같은 속성이 바깥 <div>가 아니라 진짜 VDatePicker에 붙게 합니다. */
defineOptions({ inheritAttrs: false })

const today = new Date(new Date().toDateString())
const minDate = computed(() => props.min ?? (props.disablePast ? today : undefined))
const maxDate = computed(() => props.max ?? (props.disableFuture ? today : undefined))
</script>

<template>
  <div class="ds-calendar" :class="mode === 'range' && 'ds-calendar--range'">
    <VDatePicker
      v-model="model"
      :multiple="mode === 'single' ? undefined : mode === 'range' ? 'range' : true"
      :min="minDate"
      :max="maxDate"
      color="primary"
      :elevation="0"
      show-adjacent-months
      hide-header
      v-bind="$attrs"
    />
  </div>
</template>
