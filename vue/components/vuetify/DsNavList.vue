<script setup lang="ts">
// origin: wrapped — VList 기반. 좌측 내비게이션
// 어디에: 앱 사이드바, 설정 화면 좌측 메뉴
import { VList, VListItem, VListSubheader } from 'vuetify/components'
export interface NavItem { value: any; title: string; icon?: string; badge?: string | number; subheader?: string }
defineProps<{ items: NavItem[] }>()
const model = defineModel<any>()
</script>
<template>
  <VList v-model:selected="model" class="ds-navlist" density="comfortable" nav rounded="md">
    <template v-for="(i, n) in items" :key="n">
      <VListSubheader v-if="i.subheader">{{ i.subheader }}</VListSubheader>
      <VListItem v-else :value="i.value" :ripple="false">
        <template v-if="i.icon" #prepend><span class="ds-nav-icon">{{ i.icon }}</span></template>
        <template #title>{{ i.title }}</template>
        <template v-if="i.badge !== undefined" #append>
          <span class="ds-nav-badge">{{ i.badge }}</span>
        </template>
      </VListItem>
    </template>
  </VList>
</template>
