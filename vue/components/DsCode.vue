<script setup lang="ts">
// origin: custom — 인라인 코드 / 블록 코드 (복사 버튼 포함)
import { ref } from 'vue'
withDefaults(defineProps<{
  block?: boolean
  copyable?: boolean
}>(), { block: false, copyable: true })
const copied = ref(false)
function copy(e: Event) {
  const root = (e.currentTarget as HTMLElement).closest('.ds-codeblock')
  const code = root?.querySelector('code')?.innerText ?? ''
  navigator.clipboard.writeText(code).then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 1500)
  })
}
</script>
<template>
  <div v-if="block" class="ds-codeblock">
    <button v-if="copyable" class="ds-code-copy" @click="copy">{{ copied ? '복사됨' : '복사' }}</button>
    <pre><code><slot /></code></pre>
  </div>
  <code v-else class="ds-code"><slot /></code>
</template>
