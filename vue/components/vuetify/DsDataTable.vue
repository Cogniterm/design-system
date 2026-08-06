<script setup lang="ts">
// origin: wrapped — VDataTable 기반
// 정렬·페이지네이션·선택·가상스크롤 동작을 직접 만들기 어려움 → Vuetify 유지, 시각만 우리 것으로
// ⚠️ 이 컴포넌트는 Vuetify가 설치된 앱에서만 동작합니다.
import { computed } from 'vue'
import { VDataTable } from 'vuetify/components'

const props = withDefaults(defineProps<{
  headers: any[]
  items: any[]
  /** 행 높이 34 / 42 / 50px — 다른 컨트롤과 같은 prop 이름을 씁니다 */
  size?: 'sm' | 'default' | 'lg'
  loading?: boolean
  /** 홀짝 행에 옅은 면 — 열이 많아 눈이 행을 놓칠 때만 */
  striped?: boolean
  /** 세로로 긴 표에서 헤더 고정. height와 함께 씁니다 */
  sticky?: boolean
  /** 바깥 테두리·모서리. 이미 테두리가 있는 카드 안에 넣을 땐 false */
  bordered?: boolean
  /** 행 선택 체크박스 열 */
  selectable?: boolean
  /** 행이 없을 때 문구 — 다음 행동까지 적습니다 */
  emptyText?: string
}>(), {
  size: 'default', bordered: true,
  emptyText: '표시할 데이터가 없습니다.',
})

const selected = defineModel<any[]>('selected', { default: () => [] })
/* 소비자가 준 속성(disabled·required·name·error-messages 등)이 바깥 <div>가 아니라
   진짜 Vuetify 컴포넌트에 붙게 합니다. 이게 없으면 조용히 무시됩니다. */
defineOptions({ inheritAttrs: false })

/* 숫자 열은 오른쪽 정렬이 기본입니다 — 자릿수가 맞아야 크기를 눈으로 비교할 수 있습니다.
   headers에 align을 안 줬어도 numeric이면 end로 채웁니다. */
const cols = computed(() => props.headers.map((h) =>
  h.align == null && h.numeric ? { ...h, align: 'end' } : h))
</script>

<template>
  <div class="ds-vtable" :data-size="size" :class="{
    'ds-vtable--striped': striped,
    'ds-vtable--flat': !bordered,
    'ds-vtable--sticky': sticky,
  }">
    <VDataTable
      v-model="selected"
      :headers="cols"
      :items="items"
      :loading="loading"
      :show-select="selectable"
      :fixed-header="sticky"
      hover
      :items-per-page="20"
      v-bind="$attrs"
    >
      <!-- 빈 상태 — Vuetify 기본 문구("No data available")를 우리 말로 -->
      <template #no-data>
        <div class="ds-vtable-empty">{{ emptyText }}</div>
      </template>
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps ?? {}" />
      </template>
    </VDataTable>
  </div>
</template>
