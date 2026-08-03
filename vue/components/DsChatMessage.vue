<script setup lang="ts">
// origin: custom — Vuetify에 대화형 메시지 컴포넌트 없음 (브리프 C그룹)
// 글로벌 표준(Claude·ChatGPT·Gemini 공통): 아바타·이름표 없음.
// 사용자 = 오른쪽 연회색 풍선, 에이전트 = 풍선 없는 전체 폭 본문.
// 정렬이 화자를 구분하므로 표식이 필요 없습니다.
withDefaults(defineProps<{
  role?: 'user' | 'agent'
  streaming?: boolean   // true면 끝에 깜빡이는 커서
}>(), { role: 'agent' })
</script>

<template>
  <div class="msg" :class="role === 'user' ? 'msg-user' : 'msg-agent'"
    :aria-label="role === 'user' ? '내 메시지' : '에이전트 응답'">
    <div v-if="role === 'user'" class="msg-bubble"><slot /></div>
    <div v-else class="msg-body">
      <slot name="tools" />
      <div class="msg-text">
        <slot />
        <span v-if="streaming" class="cursor"></span>
      </div>
    </div>
  </div>
</template>
