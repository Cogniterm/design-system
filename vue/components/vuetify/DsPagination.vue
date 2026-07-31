<script setup lang="ts">
// origin: wrapped — VPagination 기반
// 어디에: 테이블 하단, 검색 결과 하단
import { VPagination } from 'vuetify/components'
withDefaults(defineProps<{ length: number; totalVisible?: number }>(), { totalVisible: 7 })
const model = defineModel<number>({ default: 1 })
</script>
<template>
  <VPagination
    v-model="model" :length="length" :total-visible="totalVisible"
    class="ds-pagination" variant="text" density="comfortable" rounded="md"
  />
</template>
