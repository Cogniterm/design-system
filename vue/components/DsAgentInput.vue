<script setup lang="ts">
// origin: custom — auto-grow 입력창 + 첨부/슬래시 + Send. Enter 전송, Shift+Enter 줄바꿈
import { ref, watch } from 'vue'
withDefaults(defineProps<{ placeholder?: string; sendLabel?: string }>(), {
  placeholder: 'Message agent…', sendLabel: 'Send',
})
const model = defineModel<string>({ default: '' })
const emit = defineEmits<{ send: []; attach: []; slash: [] }>()
const ta = ref<HTMLTextAreaElement>()
/* flush: 'post' — Vue가 DOM을 고친 뒤에 재야 높이가 맞습니다.
   기본값(pre)이면 한 박자 전 내용으로 재서, 지운 뒤에도 상자가 커진 채 남습니다.
   immediate — 처음부터 여러 줄이 들어 있는 경우도 펴서 보여줍니다. */
watch(model, () => {
  if (!ta.value) return
  ta.value.style.height = 'auto'
  ta.value.style.height = ta.value.scrollHeight + 'px'
}, { flush: 'post', immediate: true })
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); emit('send') }
}
</script>

<template>
  <div class="agent-input">
    <textarea ref="ta" v-model="model" rows="1" :placeholder="placeholder" @keydown="onKeydown"></textarea>
    <div class="ai-bar">
      <button type="button" class="ai-tool" aria-label="Attach file" @click="emit('attach')">＋</button>
      <button type="button" class="ai-tool" aria-label="Slash commands" @click="emit('slash')">/</button>
      <span class="ai-spacer"></span>
      <button type="button" class="btn btn-primary btn-sm" @click="emit('send')">{{ sendLabel }}</button>
    </div>
  </div>
</template>
