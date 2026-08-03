<script setup lang="ts">
// origin: wrapped — VDataTable 기반
// 정렬·페이지네이션·선택·가상스크롤 동작을 직접 만들기 어려움 → Vuetify 유지, 시각만 우리 것으로
// ⚠️ 이 컴포넌트는 Vuetify가 설치된 앱에서만 동작합니다.
import { VDataTable } from 'vuetify/components'

withDefaults(defineProps<{
  headers: any[]
  items: any[]
  density?: 'compact' | 'comfortable' | 'spacious'
  loading?: boolean
}>(), { density: 'comfortable' })
/* 소비자가 준 속성(disabled·required·name·error-messages 등)이 바깥 <div>가 아니라
   진짜 Vuetify 컴포넌트에 붙게 합니다. 이게 없으면 조용히 무시됩니다. */
defineOptions({ inheritAttrs: false })
</script>

<template>
  <div class="ds-vtable" :data-density="density">
    <VDataTable
      :headers="headers"
      :items="items"
      :loading="loading"
      hover
      :items-per-page="20"
    
      v-bind="$attrs"
    >
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps ?? {}" />
      </template>
    </VDataTable>
  </div>
</template>
