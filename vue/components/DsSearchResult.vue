<script setup lang="ts">
// origin: custom — 검색 결과 한 건. 매칭 문맥은 <mark>로 하이라이트
defineProps<{ title: string; path?: string; href?: string }>()
</script>

<template>
  <div class="sresult">
    <h4><a :href="href || '#'">{{ title }}</a></h4>
    <div v-if="path" class="s-path">{{ path }}</div>
    <p><slot /></p>
    <slot name="footer" />
  </div>
</template>
