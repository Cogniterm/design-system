<script setup lang="ts">
// origin: custom — Vuetify에 대화형 메시지 컴포넌트 없음 (브리프 C그룹)
// 스트리밍 중 높이 변화 + 역방향 스크롤 앵커링 필요로 VCard 대체 불가
withDefaults(defineProps<{
  role?: 'user' | 'agent'
  name?: string
  streaming?: boolean   // true면 깜빡이는 커서 표시
}>(), { role: 'agent' })
</script>

<template>
  <div class="msg">
    <span class="avatar" :class="role === 'agent' ? 'ai' : 'user'">
      {{ role === 'agent' ? 'A' : 'U' }}
    </span>
    <div class="msg-body">
      <div v-if="name" class="msg-name">{{ name }}</div>
      <slot name="tools" />
      <div class="msg-text">
        <slot />
        <span v-if="streaming" class="cursor"></span>
      </div>
    </div>
  </div>
</template>
