<script setup lang="ts">
// origin: custom — 스트리밍 중 텍스트 + 커서. done이 되면 커서 제거
withDefaults(defineProps<{ done?: boolean }>(), { done: false })
</script>

<template>
  <span class="msg-text"><slot /><span v-if="!done" class="cursor"></span></span>
</template>
