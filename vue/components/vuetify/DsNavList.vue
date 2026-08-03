<script setup lang="ts">
import { computed } from 'vue'
// origin: wrapped — VList 기반. 좌측 내비게이션
// 어디에: 앱 사이드바, 설정 화면 좌측 메뉴
import { VList, VListItem, VListSubheader } from 'vuetify/components'
import DsIcon from '../DsIcon.vue'
import type { IconName } from '../../icons'
// 구분선 행({ subheader })과 메뉴 행을 함께 넣습니다.
export type NavItem =
  | { subheader: string; value?: never; title?: never; icon?: never; badge?: never }
  | { value: any; title: string; icon?: IconName; badge?: string | number; subheader?: never }
defineProps<{ items: NavItem[] }>()
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
  <VList v-model:selected="selected" class="ds-navlist" density="comfortable" nav rounded="md">
    <template v-for="(i, n) in items" :key="n">
      <VListSubheader v-if="i.subheader">{{ i.subheader }}</VListSubheader>
      <VListItem v-else :value="i.value" :ripple="false" :aria-current="i.value === model ? 'page' : undefined">
        <template v-if="i.icon || $slots.icon" #prepend>
          <span class="ds-nav-icon"><slot name="icon" :item="i"><DsIcon v-if="i.icon" :name="i.icon" size="sm" /></slot></span>
        </template>
        <template #title>{{ i.title }}</template>
        <template v-if="i.badge !== undefined" #append>
          <span class="ds-nav-badge">{{ i.badge }}</span>
        </template>
      </VListItem>
    </template>
  </VList>
</template>
