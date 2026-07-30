<script setup lang="ts">
// origin: custom — auto-grow 입력창 + 첨부/슬래시 + Send. Enter 전송, Shift+Enter 줄바꿈
import { ref, watch } from 'vue'
withDefaults(defineProps<{ placeholder?: string; sendLabel?: string }>(), {
  placeholder: 'Message agent…', sendLabel: 'Send',
})
const model = defineModel<string>({ default: '' })
const emit = defineEmits<{ send: []; attach: []; slash: [] }>()
const ta = ref<HTMLTextAreaElement>()
watch(model, () => {
  if (!ta.value) return
  ta.value.style.height = 'auto'
  ta.value.style.height = ta.value.scrollHeight + 'px'
})
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); emit('send') }
}
</script>

<template>
  <div class="agent-input">
    <textarea ref="ta" v-model="model" rows="1" :placeholder="placeholder" @keydown="onKeydown"></textarea>
    <div class="ai-bar">
      <button class="ai-tool" aria-label="Attach file" @click="emit('attach')">＋</button>
      <button class="ai-tool" aria-label="Slash commands" @click="emit('slash')">/</button>
      <span class="ai-spacer"></span>
      <button class="btn btn-primary btn-sm" @click="emit('send')">{{ sendLabel }}</button>
    </div>
  </div>
</template>
