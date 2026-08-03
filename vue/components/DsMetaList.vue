<script setup lang="ts">
// origin: custom — 키-값 메타 정보 (상세 패널의 표준)
export interface MetaItem { label: string; value: string; mono?: boolean }
defineProps<{ items: MetaItem[] }>()
</script>
<template>
  <dl class="metalist">
    <div v-for="i in items" :key="i.label" class="metalist-row">
      <dt>{{ i.label }}</dt>
      <dd :class="{ mono: i.mono }"><slot :name="i.label" :item="i">{{ i.value }}</slot></dd>
    </div>
  </dl>
</template>
