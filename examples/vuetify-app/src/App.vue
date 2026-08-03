<script setup lang="ts">
import { ref } from 'vue'
import Gallery from './Gallery.vue'
import AuditLog from './AuditLog.vue'
import Playground from './Playground.vue'

// 해시로 화면 전환 — #audit 이면 감사 로그, 기본은 갤러리
const route = () => location.hash.startsWith('#play/') ? 'play'
  : location.hash === '#audit' ? 'audit' : 'gallery'
const page = ref(route())
window.addEventListener('hashchange', () => { page.value = route() })
function go(p: string) { location.hash = p === 'audit' ? '#audit' : '' }
</script>

<template>
  <Playground v-if="page === 'play'" />
  <Gallery v-else-if="page === 'gallery'" @nav="go" />
  <AuditLog v-else @nav="go" />
</template>
