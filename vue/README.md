# vue/ — Vue 3 + Vuetify 3.11 호환 패키지

우리 앱(Nuxt 3 / Vue 3.5 / Vuetify 3.11)에 그대로 넣는 실사용 코드입니다.
**외부 의존성 0** — reka-ui, Tailwind 등 아무것도 설치할 필요 없습니다.

## Vuetify와 충돌하지 않는 이유 (브리프 2장 규칙 적용)

1. 모든 컴포넌트 루트가 `all: unset`으로 Vuetify 전역 리셋을 차단
2. 클래스가 `.v-*`와 겹치지 않음 (`ds-` 계열)
3. `!important` 사용 0회

## 설치 (개발자용, 10분)

```bash
# 1. 이 폴더를 앱에 복사
cp -r vue/ <소스루트>/design/
cp ds.css <app>/src/design/ds.css
```

```ts
// 2. nuxt.config.ts — 스타일 등록
export default defineNuxtConfig({
  css: ['~/design/ds.css'],
})

// 3. Vuetify defaults 연결 (A그룹 스타일 강제)
import { dsDefaults } from '~/design/defaults'
createVuetify({ defaults: dsDefaults })
```

```vue
<!-- 4. 사용 -->
<script setup>
import { DsButton, DsChatMessage, DsToolCallStep } from '~/design'
</script>

<template>
  <DsChatMessage role="agent" name="Agent" :streaming="true">
    응답 텍스트
    <template #tools>
      <DsToolCallStep status="done">search_drive("계약서")</DsToolCallStep>
    </template>
  </DsChatMessage>
  <DsButton variant="primary" @click="run">New agent</DsButton>
</template>
```

## 다크 모드

`<html data-theme="dark">` 토글이 전부입니다. Vuetify 테마와 독립적으로 동작합니다.

## 파일

| 파일 | 역할 |
|---|---|
| `components/*.vue` | 컴포넌트 30종 (의존성 0, TypeScript props) |
| `index.ts` | 배럴 — 한 줄 import |
| `meta.ts` | 컴포넌트별 origin·이유 (en/ko) — 문서 배지 자동 생성용 |
| `defaults.ts` | Vuetify A그룹(VMenu·VDialog·VDataTable 등) 기본값 |
