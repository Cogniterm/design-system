<script setup lang="ts">
// origin: wrapped — 조합 컴포넌트: Input(모양) + VMenu(띄우기) + Calendar(고르기)
// 어디에: 폼 안에서 날짜 한 칸 — 계약 만료일, 감사 로그 기간 필터
//
// 왜 조합인가: 이 컴포넌트에 새로 그린 시각 요소는 없습니다. 필드는 DsInput과
// 같은 .field/.input이고, 띄우는 방식은 Menu와 같은 VMenu이며, 안의 격자는
// Calendar 그대로입니다. 셋을 빌려 쓰기 때문에 셋 중 하나가 바뀌면 여기도
// 같이 바뀝니다 — 같은 부품이 자리에 따라 달라지는 일이 생기지 않습니다.
import { computed, ref, useId } from 'vue'
import { VMenu } from 'vuetify/components'
import DsCalendar from './DsCalendar.vue'

const props = withDefaults(defineProps<{
  label?: string
  hint?: string
  /** 에러 메시지 — 있으면 에러 상태 (원칙 2: 에러는 기본 상태) */
  error?: string
  placeholder?: string
  /** single = 하루 · range = 기간(시작~종료) */
  mode?: 'single' | 'range'
  /** 컨트롤 스케일 — sm 32px / default 40px. 필터 바·툴바는 sm. */
  size?: 'sm' | 'default'
  disabled?: boolean
  clearable?: boolean
  /** 기간 프리셋 — [라벨, 일수]. 예: [['최근 7일', 7], ['최근 30일', 30]]
      프리셋 없이 두 번 클릭하게 하면, 대부분은 프리셋을 원했던 경우입니다. */
  presets?: [string, number][]
  min?: string | Date
  max?: string | Date
  disablePast?: boolean
  disableFuture?: boolean
}>(), { mode: 'single', size: 'default' })

const model = defineModel<any>()
const open = ref(false)
const uid = useId()
const msgId = `ds-dp-msg-${uid}`

defineOptions({ inheritAttrs: false })

/* 화면에 보이는 글자는 Intl로 찍습니다 — 직접 "YYYY.MM.DD"를 조립하면
   한 자리 월·일에서 어긋나고 로케일을 바꿀 때 같이 못 따라갑니다. */
const fmt = new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
const one = (d: any) => (d ? fmt.format(new Date(d)) : '')

const display = computed(() => {
  const v = model.value
  if (!v || (Array.isArray(v) && !v.length)) return ''
  if (!Array.isArray(v)) return one(v)
  const from = one(v[0])
  const to = one(v[v.length - 1])
  // 기간은 "시작 ~ 종료". 하루만 고른 중간 상태에서는 시작만 보여 줍니다.
  return v.length < 2 || from === to ? from : `${from} ~ ${to}`
})

const ph = computed(() =>
  props.placeholder ?? (props.mode === 'range' ? '기간 선택' : '날짜 선택'))

function applyPreset (days: number) {
  const end = new Date(new Date().toDateString())
  if (props.mode !== 'range') { model.value = end; open.value = false; return }
  /* Vuetify의 기간 모델은 [시작, 종료] 두 개가 아니라 사이 날짜를 전부 담은
     배열입니다. 두 개만 넣으면 달력이 그 두 날만 골라진 것으로 그립니다. */
  const out: Date[] = []
  const d = new Date(end)
  d.setDate(d.getDate() - (days - 1))
  while (d <= end) { out.push(new Date(d)); d.setDate(d.getDate() + 1) }
  model.value = out
  open.value = false
}

function clear () {
  model.value = props.mode === 'range' ? [] : null
}

/* 하루만 고르는 모드는 고른 순간 닫습니다 — 더 할 일이 없는데 달력이 남아 있으면
   다음 필드를 누를 때 달력 두 개가 겹쳐 열려, 어느 쪽을 조작하는지 알 수 없습니다.
   (시작일·종료일을 나란히 둔 화면에서 실제로 겹쳤습니다.)
   기간(range)은 두 번 골라야 완성되므로 열어 둡니다. */
function onPick () {
  if (props.mode === 'single') open.value = false
}
</script>

<template>
  <div class="field ds-datepicker">
    <label v-if="label">{{ label }}</label>

    <VMenu v-model="open" :disabled="disabled" location="bottom start" :close-on-content-click="false">
      <template #activator="{ props: act }">
        <!-- 진짜 <input>이 아니라 버튼입니다. 날짜는 달력에서 고르는 값이고,
             직접 치게 하면 형식 검증·오타 안내가 통째로 따라옵니다. -->
        <button
          type="button"
          class="input ds-dp-field"
          :class="[{ error: !!error, 'is-open': open, 'is-empty': !display }, size === 'sm' && 'sm']"
          :disabled="disabled"
          :aria-invalid="error ? 'true' : undefined"
          :aria-describedby="error || hint ? msgId : undefined"
          v-bind="{ ...act, ...$attrs }"
        >
          <span class="ds-dp-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>
          </span>
          <span class="ds-dp-value">{{ display || ph }}</span>
          <span
            v-if="clearable && display && !disabled"
            class="ds-dp-clear" role="button" tabindex="-1" aria-label="지우기"
            @click.stop="clear"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </span>
        </button>
      </template>

      <div class="ds-dp-panel">
        <div v-if="presets?.length" class="ds-dp-presets">
          <button v-for="[t, d] in presets" :key="t" type="button" class="ds-dp-preset" @click="applyPreset(d)">
            {{ t }}
          </button>
        </div>
        <DsCalendar
          v-model="model" :mode="mode"
          :min="min" :max="max" :disable-past="disablePast" :disable-future="disableFuture"
          @update:model-value="onPick"
        />
      </div>
    </VMenu>

    <div v-if="error" :id="msgId" class="hint error">{{ error }}</div>
    <div v-else-if="hint" :id="msgId" class="hint">{{ hint }}</div>
  </div>
</template>
