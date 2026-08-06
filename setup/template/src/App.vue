<script setup lang="ts">
/* 설치 확인용 화면입니다. 여기부터 원하는 화면을 만드세요.
   컴포넌트 목록: https://Cogniterm.github.io/design-system/#/components */
import { ref } from 'vue'
import { DsButton, DsInput } from '~/design'
import { DsSelect } from '~/design/vuetify'

const q = ref('')
const status = ref('실행 중')
</script>

<template>
  <div class="page">
    <h1>설치가 끝났습니다</h1>
    <p>이 화면은 <code>src/App.vue</code>입니다. 지우고 원하는 화면을 만드세요.</p>

    <div class="row">
      <DsInput v-model="q" label="검색어" placeholder="입력하세요" />
      <DsSelect v-model="status" label="상태" :items="['대기', '실행 중', '완료']" />
    </div>
    <div><DsButton variant="primary">저장</DsButton></div>
  </div>
</template>

<style>
.page { padding: 40px; max-width: 640px; display: flex; flex-direction: column; gap: 18px; }
.page h1 { font-size: 24px; font-weight: 600; letter-spacing: -0.02em; }
.page p { color: var(--gray-11); font-size: 14px; }
.page code { font-family: var(--mono); font-size: 13px; }
.row { display: flex; gap: 12px; align-items: flex-start; }
</style>
