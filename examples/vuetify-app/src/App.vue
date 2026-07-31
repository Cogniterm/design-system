<script setup lang="ts">
import { ref } from 'vue'
import Gallery from './Gallery.vue'
import AuditLog from './AuditLog.vue'

// 해시로 화면 전환 — #audit 이면 감사 로그, 기본은 갤러리
const page = ref(location.hash === '#audit' ? 'audit' : 'gallery')
window.addEventListener('hashchange', () => {
  page.value = location.hash === '#audit' ? 'audit' : 'gallery'
})
function go(p: string) { location.hash = p === 'audit' ? '#audit' : '' }
</script>

<template>
  <Gallery v-if="page === 'gallery'" @nav="go" />
  <AuditLog v-else @nav="go" />
</template>
