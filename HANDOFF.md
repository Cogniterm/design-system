# 개발자 핸드오프

> 함께 앉아서 30분이면 앱에 적용까지 끝납니다.
> 이 문서 하나만 따라가면 되고, 막히는 지점은 마지막 절에 미리 적어뒀습니다.

**문서 사이트** → https://kimjiyong995-coder.github.io/design-system/
**라이브 갤러리** → https://kimjiyong995-coder.github.io/design-system/live/

---

## 1. 5분 — 무엇인지 먼저 이해하기

| 사실 | 뜻 |
|---|---|
| npm 패키지가 **아닙니다** | 파일을 앱에 복사해 넣습니다. 버전 충돌이 생길 수 없습니다 |
| Vuetify를 **대체하지 않습니다** | 3.11 그대로 두고 그 옆에 삽니다. 마이그레이션 없음 |
| 기존 화면은 **안 바뀝니다** | `src/design/` 밖은 건드리지 않습니다. 폴더째 지워도 앱은 그대로 |
| 컴포넌트 65종 | Standalone 30 (Vuetify 불필요) + Vuetify 기반 35 |

**함께 열어볼 것** — 라이브 갤러리에서 아무 컴포넌트나 눌러보세요. 문서의 데모는
정적 그림이 아니라 실제 Vue + Vuetify 3.11.6으로 도는 화면입니다.

---

## 2. 10분 — 앱에 넣기

### 2-1. 의존성 두 개

```bash
npm install pretendard lucide-vue-next
```

| 패키지 | 용도 | 라이선스 |
|---|---|---|
| `pretendard` | 본문 글꼴 | SIL OFL 1.1 |
| `lucide-vue-next` | 아이콘 | ISC |

### 2-2. 파일 복사

```bash
cp -r <design-system>/vue           <app>/src/design/
cp    <design-system>/ds.css        <app>/src/design/
cp    <design-system>/ds-vuetify.css <app>/src/design/
```

### 2-3. 설정 — 이 스니펫 그대로

```ts
import { createVuetify } from 'vuetify'
import { ko } from 'vuetify/locale'
import 'vuetify/styles'
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'

import { dsTheme } from '~/src/design/theme'
import { dsDefaults } from '~/src/design/defaults'
import { lucideIconSet } from '~/src/design/vuetify-icons'
import '~/src/design/ds.css'
import '~/src/design/ds-vuetify.css'

createVuetify({
  theme: dsTheme,
  defaults: dsDefaults,
  icons: lucideIconSet,                        // 빠뜨리면 내부 아이콘이 전부 깨집니다
  locale: { locale: 'ko', messages: { ko } },  // 테이블 등 내장 문구 한국어
})
```

Nuxt라면 CSS는 `nuxt.config.ts`의 `css: []`에, `createVuetify`는 플러그인에 둡니다.

### 2-4. 사용

```vue
<script setup>
// Vuetify가 필요 없는 것
import { DsButton, DsChatMessage, DsToolCallStep } from '~/src/design'
// Vuetify를 감싼 것 — 배럴이 다릅니다
import { DsDataTable, DsDialog, DsAlert } from '~/src/design/vuetify'
// 아이콘
import { DsIcon } from '~/src/design/icon'
</script>
```

### 2-5. 확인

화면 하나를 만들어 봅니다. `templates/audit.html`(관리자 감사 로그)을 복제하는 게
가장 빠릅니다 — 테이블·필터·상세 패널·상태 5종이 다 들어 있습니다.

---

## 3. 15분 — 함께 확인할 것 (리뷰 포인트)

브리프에서 **"생략 불가"**라고 했던 구조 리뷰입니다. 아래만 봐주시면 됩니다.

### 3-1. 컴포넌트 구조 — `vue/components/DsButton.vue`

```vue
<script setup lang="ts">
withDefaults(defineProps<{ variant?: ...; size?: ...; disabled?: boolean }>(), { ... })
</script>
<template>
  <button class="btn" :class="[`btn-${variant}`, size === 'sm' && 'btn-sm']" :disabled="disabled">
    <slot />
  </button>
</template>
```

**물어볼 것**: 이 구조가 우리 컨벤션과 맞나요? (props 네이밍, `withDefaults` 사용,
클래스 조합 방식) — 여기서 승인받으면 나머지 64개가 같은 패턴입니다.

### 3-2. Vuetify와 충돌하지 않는 이유

- 모든 컴포넌트 루트에 `all: unset` → Vuetify 전역 리셋 차단
- `ds-` 프리픽스 → `.v-*`와 겹치지 않음
- `ds.css`에 `!important` 0회, `.v-*` 정의 0회

CI가 매번 검증합니다.

### 3-3. 토큰이 단일 원본인가

`ds.css` → CSS 변수 → 컴포넌트. 한 방향만 흐릅니다.
Vuetify는 CSS 변수를 못 받으므로 `vue/theme.ts`에 같은 값이 한 벌 더 있고,
**두 값이 어긋나면 CI가 실패**합니다.

---

## 4. 유지보수 — 무엇이 자동이고 무엇이 수동인가

### 자동 (푸시하면 CI가 검사)

17종 게이트가 돌고, 하나라도 실패하면 머지가 막힙니다.

| 검사 | 막는 것 |
|---|---|
| 문서 무결성 | 컴포넌트 필수 항목 누락, 배럴↔문서↔meta 불일치 |
| 타입 스케일 | 스케일 밖 글자 크기 |
| 보더 토큰 | `1px solid var(--gray-N)` — 시맨틱 토큰만 허용 |
| 토큰 무결성 | 자기 참조, 정의 없는 토큰 사용 |
| **색 대비** | WCAG 2.2 AA 미달 (라이트·다크 14조합 실측) |
| 아이콘 | 두 레지스트리 불일치, 기준선 어긋남 |
| Stylelint | hex 직접 사용, `!important`, 굵기 700+, uppercase |
| 실제 빌드 | Vuetify 3.11.6 앱에서 컴파일 실패 |

### 수동 (기억해야 하는 것)

1. **자동 생성물은 손으로 고치지 않습니다** — `vue/meta.ts`, 모든 `llms.txt`,
   `components/*.txt`. 고쳤으면 `node scripts-gen-meta.mjs && node scripts-gen-llms.mjs`.
   안 돌리고 커밋하면 CI가 "생성물이 낡았다"며 실패시킵니다.
2. **토큰을 바꾸면 네 곳** — `ds.css` · `vue/theme.ts` · Foundation 문서 · `llms.txt`
3. **`live/` 재빌드** — 컴포넌트 `.vue`를 고치면 갤러리를 다시 빌드해 넣어야 합니다
   (`examples/vuetify-app/README.md` 참고). 이건 아직 자동이 아닙니다.

---

## 5. 미리 아는 함정

세션 중에 나올 만한 것들을 먼저 적어둡니다.

| 증상 | 원인 | 해결 |
|---|---|---|
| 화면이 미묘하게 다른 글꼴 | Pretendard CSS 미등록 | **에러가 안 납니다.** import 확인 |
| 체크박스·셀렉트 화살표가 빈 네모 | `icons: lucideIconSet` 누락 | createVuetify에 추가 |
| 테이블 "Rows per page"가 영어 | `locale` 누락 | `{ locale: 'ko', messages: { ko } }` |
| import 에러 | 배럴을 잘못 골랐음 | Vuetify 기반은 `~/design/vuetify` |
| 아이콘이 안 나옴 | 이름이 레지스트리에 없음 | `vue/icons.ts`에 의미 이름으로 추가 |
| 다크 모드가 일부만 바뀜 | Vuetify 테마와 `data-theme` 중 하나만 전환 | 둘 다 전환해야 합니다 (아래) |

```ts
// 다크 전환은 두 곳을 함께
import { useTheme } from 'vuetify'
const theme = useTheme()
function toggle(dark: boolean) {
  theme.change(dark ? 'dsDark' : 'dsLight')
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
}
```

---

## 6. 아직 안 된 것 (정직하게)

- **시각적 회귀 테스트 없음** — 레이아웃이 미묘하게 깨지는 건 아직 눈으로 봐야 합니다.
  Playwright 스크린샷 diff가 다음 과제입니다.
- **`live/` 자동 빌드 없음** — CI가 갤러리를 대신 빌드하게 만들 수 있습니다 (반나절).
- **기존 컴포넌트와의 대응표 없음** — 앱의 기존 컴포넌트 → `Ds*` 매핑을 만들면
  전환이 빨라집니다. 요청하면 앱 코드를 스캔해 만들 수 있습니다.
- **npm 패키지화 안 함** — 의도적입니다. 쓰는 앱이 2~3개로 늘면 그때가 적기입니다.

---

## 7. AI로 화면 만들 때

`llms.txt`를 컨텍스트로 넣으면 이 시스템의 규칙을 따라 코드를 생성합니다.
섹션별로 나뉘어 있어 필요한 것만 읽히면 됩니다.

```
/llms.txt                  색인 (2 KB)
/components/llms.txt       UI를 만들 때
/patterns/llms.txt         화면 전체 · 에이전트 흐름
/foundation/llms.txt       색 · 여백 · 타이포 · 토큰
/vuetify/llms.txt          설치와 연동
/a11y/llms.txt             접근성
/components/<id>.txt       컴포넌트 하나만 (65개)
```

문서 사이트의 컴포넌트 페이지마다 **"AI 프롬프트 복사"** 버튼이 있어,
그 컴포넌트를 쓰는 데 필요한 전부를 한 번에 클립보드로 가져갑니다.
