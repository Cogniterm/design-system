<script setup lang="ts">
import { computed } from 'vue'
// origin: wrapped — VList 기반. 일반 목록
// 어디에: 설정 항목 목록, 선택 가능한 항목 나열 (파일은 FileRow, 데이터는 DataTable)
import { VList, VListItem } from 'vuetify/components'
import DsIcon from '../DsIcon.vue'
import type { IconName } from '../../icons'
export interface ListItem { value?: any; title: string; subtitle?: string; icon?: IconName; meta?: string }
withDefaults(defineProps<{ items: ListItem[]; selectable?: boolean }>(), { selectable: false })
/* Vuetify의 VList는 선택값을 항상 배열로 주고받습니다.
   우리 문서와 예제는 v-model="nav" 처럼 값 하나를 쓰므로, 여기서 이어 붙입니다.
   (이게 없으면 문자열은 글자 단위로 쪼개지고, 숫자는 "not iterable" 예외가 납니다.) */
const model = defineModel<any>()
const selected = computed<any[]>({
  get: () => (model.value == null ? [] : [model.value]),
  set: (v) => { model.value = v[0] ?? null },
})
</script>
<template>
  <VList v-model:selected="selected" class="ds-list" density="comfortable" rounded="md" :nav="selectable">
    <VListItem v-for="(i, n) in items" :key="n" :value="i.value ?? n" :ripple="false">
      <template v-if="i.icon || $slots.icon" #prepend>
        <span class="ds-nav-icon"><slot name="icon" :item="i"><DsIcon v-if="i.icon" :name="i.icon" size="sm" /></slot></span>
      </template>
      <template #title>{{ i.title }}</template>
      <template v-if="i.subtitle" #subtitle>{{ i.subtitle }}</template>
      <template v-if="i.meta" #append><span class="ds-list-meta">{{ i.meta }}</span></template>
    </VListItem>
  </VList>
</template>
