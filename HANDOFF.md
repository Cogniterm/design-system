# 개발자 핸드오프

> 함께 앉아서 30분이면 앱에 적용까지 끝납니다.
> 이 문서 하나만 따라가면 되고, 막히는 지점은 마지막 절에 미리 적어뒀습니다.

**문서 사이트** → https://Cogniterm.github.io/design-system/
**라이브 갤러리** → https://Cogniterm.github.io/design-system/live/

---

## 1. 5분 — 무엇인지 먼저 이해하기

| 사실 | 뜻 |
|---|---|
| npm 패키지가 **아닙니다** | 파일을 앱에 복사해 넣습니다. 버전 충돌이 생길 수 없습니다 |
| Vuetify를 **대체하지 않습니다** | 3.11 그대로 두고 그 옆에 삽니다. 마이그레이션 없음 |
| 기존 화면은 **안 바뀝니다** | 설정 몇 줄(별칭·CSS·createVuetify) 외에는 `design/` 밖을 안 건드립니다. 폴더째 지워도 앱은 그대로 |
| 컴포넌트 65종 | Standalone 30 (Vuetify 불필요) + Vuetify 기반 34 + 아이콘 1 |

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

> 설치할 때 `lucide-vue-next@1.0.0: Package deprecated` 경고가 뜹니다 — **정상입니다.**
> 1.0.0이 이 이름으로 나온 마지막 버전이고, 후속인 `@lucide/vue`로 옮기려면
> `vue/icons.ts`와 `vue/vuetify-icons.ts`의 import를 함께 바꿔야 해서 아직 그대로 씁니다.

### 2-2. 파일 복사

프로젝트의 **소스 루트** 아래 `design/`에 넣습니다.
소스 루트는 Vite면 `src/`, Nuxt 3면 프로젝트 루트, Nuxt 4면 `app/`입니다.

```bash
# vue/. 의 점은 "폴더가 아니라 그 안의 내용물"이라는 뜻입니다.
# 점 없이 vue/ 만 쓰면 design/ 이 이미 있을 때 design/vue/ 로 한 단계 더 들어가서
# 아래 import 경로가 전부 어긋납니다 (macOS와 리눅스의 cp 동작이 다릅니다).
mkdir -p <소스루트>/design
cp -r <design-system>/vue/.          <소스루트>/design/
cp    <design-system>/ds.css         <소스루트>/design/
cp    <design-system>/ds-vuetify.css <소스루트>/design/
```

이렇게 두면 어느 프레임워크든 `~/design` 하나로 부릅니다.
Nuxt는 `~`가 소스 루트라 그대로 되고, **Vite는 두 곳**에 별칭을 넣어야 합니다.
Vite와 TypeScript는 서로의 설정을 읽지 않아서, 한쪽만 하면 `npm run build`가
`Cannot find module '~/design'`으로 멈춥니다.

```ts
// ① vite.config.ts — 실행할 때 쓰는 별칭
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  resolve: { alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) } },
})
```

```json
// ② tsconfig.app.json — 타입 검사·에디터가 쓰는 별칭
{ "compilerOptions": { "paths": { "~/*": ["./src/*"] } } }
```

`baseUrl`은 넣지 마세요 — TypeScript 6에서 `TS5101`로 막힙니다. `paths`만 있으면 됩니다.

### 2-3. 설정 — 이 스니펫 그대로

```ts
import { createVuetify } from 'vuetify'
import { ko } from 'vuetify/locale'
import 'vuetify/styles'
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'

import { dsTheme } from '~/design/theme'
import { dsDefaults } from '~/design/defaults'
import { lucideIconSet } from '~/design/vuetify-icons'
import '~/design/ds.css'
import '~/design/ds-vuetify.css'

const vuetify = createVuetify({
  theme: dsTheme,
  defaults: dsDefaults,
  icons: lucideIconSet,                        // 빠뜨리면 내부 아이콘이 전부 깨집니다
  locale: { locale: 'ko', messages: { ko } },  // 테이블 등 내장 문구 한국어
})

createApp(App).use(vuetify).mount('#app')
```

> `vue-tsc`가 `import 'vuetify/styles'`에서 `TS2882`를 낸다면 Vuetify 쪽 타입 누락입니다.
> `src/shims.d.ts`에 `declare module 'vuetify/styles'` 한 줄을 넣으면 지나갑니다.

Nuxt라면 CSS는 `nuxt.config.ts`의 `css: []`에, `createVuetify`는 플러그인에 둡니다.

> `createVuetify`는 **컴포넌트를 등록하지 않습니다.** 손으로 쓴 `<v-btn>`이
> `Failed to resolve component`로 비어 나오면 `vite-plugin-vuetify`(`autoImport: true`)를
> 넣거나 `createVuetify({ components, directives })`로 직접 등록합니다.
> 우리 `Ds*`는 각자 필요한 것을 직접 import하므로 이 설정 없이도 돕니다.

### 2-4. 사용

```vue
<script setup>
// Vuetify가 필요 없는 것
import { DsButton, DsChatMessage, DsToolCallStep } from '~/design'
// Vuetify를 감싼 것 — 배럴이 다릅니다
import { DsDataTable, DsDialog, DsAlert } from '~/design/vuetify'
// 아이콘 — Lucide가 필요해 배럴이 또 다릅니다
import { DsIcon } from '~/design/icon'

// 이 앱이 어느 시점 것인지 — 문의할 때 이 값을 알려주면 됩니다
import { DS_VERSION, DS_BUILT_AT } from '~/design'
</script>
```

### 2-5. 확인

화면 하나를 만들어 봅니다. `examples/vuetify-app/src/AuditLog.vue`(관리자 감사 로그)를
복제하는 게 가장 빠릅니다 — 테이블·필터·상세 패널·상태 5종이 다 들어 있고,
`Ds*` 컴포넌트로만 짜여 있습니다.
(같은 화면의 정적 HTML 버전은 `templates/audit.html`인데, 그건 Vue가 아니라
`ds.css` 클래스를 직접 쓴 것이라 Vue 앱에 그대로 못 옮깁니다.)

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

- 버튼·입력 등 조작 요소에 `all: unset` → Vuetify·브라우저 기본 스타일 차단
- `ds.css`에 `!important` 0회, `.v-*` 정의 0회 → Vuetify 쪽을 덮어쓰지 않음
- Vuetify 조정은 전부 `ds-vuetify.css` 한 파일에 격리

CI가 매번 검증합니다.

**단, 클래스 이름은 한계가 있습니다.** `ds.css`의 이름 63개 중 54개가
`ds-` 없이 짧습니다 — `.btn` `.card` `.input` `.field` `.chip` `.badge` `.check`
`.hint` `.empty` `.chat` `.msg` `.toast` `.spinner` `.skeleton` `.divider` 등.
Vuetify의 `.v-*`와는 안 겹치지만 **기존 앱에 같은 이름이 있으면 서로 영향을 줍니다.**
넣기 전에 30초만 확인하세요:

```bash
# 앱에서 같은 이름을 쓰고 있는지
grep -rEo 'class="[^"]*\b(btn|card|input|field|chip|badge|check|hint|empty|chat|msg|toast|spinner|skeleton|divider|avatar-group|table-wrap|status-dot|mono)\b' src/ | sort -u | head -20
```

하나라도 나오면 그 화면부터 확인하고 넘어갑니다.
`ds-` 접두로 전면 개명하는 것이 근본 해결이고, 그건 여러분과 함께 결정할 일입니다.

### 3-3. 토큰이 단일 원본인가

`ds.css` → CSS 변수 → 컴포넌트. 한 방향만 흐릅니다.
Vuetify는 CSS 변수를 못 받으므로 `vue/theme.ts`에 같은 값이 한 벌 더 있고,
**두 값이 어긋나면 CI가 실패**합니다.

---

## 4. 유지보수 — 무엇이 자동이고 무엇이 수동인가

### 자동 (푸시하면 CI가 검사)

20종 게이트가 돌고, 하나라도 실패하면 머지가 막힙니다.

| 검사 | 막는 것 |
|---|---|
| 문서 무결성 | 컴포넌트 필수 항목 누락, 배럴↔문서↔meta 불일치 |
| 타입 스케일 | 스케일 밖 글자 크기 |
| 보더 토큰 | `1px solid var(--gray-N)` — 시맨틱 토큰만 허용 |
| 토큰 무결성 | 자기 참조, 정의 없는 토큰 사용 |
| **색 대비** | WCAG 2.2 AA 미달 — 토큰 14조합 + 스타일시트가 글자에 쓴 회색 전수 |
| 아이콘 | 두 레지스트리 불일치, 기준선 어긋남, 이름이 글자로 새는 폴백 |
| 색 사용 | 색 정의 블록(`:root`·`[data-theme]`) 밖에서 hex 직접 사용 |
| Stylelint | 굵기 700+, uppercase, 2px 이상 보더 |
| 캐시 스탬프 | 문서 사이트 파일을 고치고 `?v=`를 안 올림 |
| 실제 빌드 | Vuetify 3.11.6 앱에서 컴파일 실패 · `vue-tsc` 타입 오류 |
| 문서 사이트 렌더 | 브라우저 없이 `docs.js`를 실행 — 예외, 화면에 새는 `undefined`, 링크 중첩 |

### 수동 (기억해야 하는 것)

1. **자동 생성물은 손으로 고치지 않습니다** — `vue/meta.ts`, 모든 `llms.txt`,
   `components/*.txt`. 고쳤으면 `node scripts-gen-meta.mjs && node scripts-gen-llms.mjs`.
   안 돌리고 커밋하면 CI가 "생성물이 낡았다"며 실패시킵니다.
   문서 사이트의 CSS·JS를 고쳤다면 `node scripts-stamp.mjs`도 함께 돌립니다
   (안 돌리면 방문자 브라우저가 옛 파일을 계속 씁니다).
2. **토큰을 바꾸면 네 곳** — `ds.css` · `vue/theme.ts` · Foundation 문서 · `llms.txt`
3. **`live/` 재빌드** — 컴포넌트 `.vue`를 고치면 갤러리를 다시 빌드해 넣어야 합니다.
   이건 아직 자동이 아닙니다.
   ```bash
   cd examples/vuetify-app
   rm -rf src/design && cp -r ../../vue src/design
   cp ../../ds.css ../../ds-vuetify.css src/design/
   npm install && npx vite build --base=./
   rm -rf ../../live && cp -r dist ../../live
   ```

---

## 5. 미리 아는 함정

세션 중에 나올 만한 것들을 먼저 적어둡니다.

| 증상 | 원인 | 해결 |
|---|---|---|
| 화면이 미묘하게 다른 글꼴 | Pretendard CSS 미등록 | **에러가 안 납니다.** import 확인 |
| 체크박스·셀렉트 화살표가 빈 네모 | `icons: lucideIconSet` 누락 | createVuetify에 추가 |
| 테이블 "Rows per page"가 영어 | `locale` 누락 | `{ locale: 'ko', messages: { ko } }` |
| import 에러 | 배럴을 잘못 골랐음 | Vuetify 기반은 `~/design/vuetify` |
| 아이콘이 안 나옴 | 이름이 레지스트리에 없음 | `vue/icons.ts` **와** `icons-svg.js` 양쪽에 같은 이름으로 추가 (한쪽만 고치면 CI가 실패) |
| 다크 모드가 일부만 바뀜 | Vuetify 테마와 `data-theme` 중 하나만 전환 | 둘 다 전환해야 합니다 (아래) |
| `npm run build`가 `Cannot find module '~/design'` | Vite 별칭만 넣고 tsconfig `paths`를 안 넣음 | 2-2의 ① ② 둘 다 |
| 손으로 쓴 `<v-btn>`이 비어 나옴 | `createVuetify`는 컴포넌트를 등록하지 않음 | `vite-plugin-vuetify` 또는 직접 등록 |

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

이번에 전수 점검하면서 고친 것과 남긴 것을 나눠 적습니다.
고친 것은 CI 게이트로 막아 뒀고, 남긴 것은 함께 결정할 일입니다.


- **시각적 회귀 테스트 없음** — 레이아웃이 미묘하게 깨지는 건 아직 눈으로 봐야 합니다.
  코드·타입·대비·링크·렌더 예외는 CI가 보지만, "보기에 이상한지"는 못 봅니다.
  Playwright 스크린샷 diff가 다음 과제입니다.
- **`live/` 자동 빌드 없음** — CI가 갤러리를 대신 빌드하게 만들 수 있습니다 (반나절).
- **기존 컴포넌트와의 대응표 없음** — 앱의 기존 컴포넌트 → `Ds*` 매핑을 만들면
  전환이 빨라집니다. 요청하면 앱 코드를 스캔해 만들 수 있습니다.
- **npm 패키지화 안 함** — 의도적입니다. 쓰는 앱이 2~3개로 늘면 그때가 적기입니다.
- **클래스 이름에 `ds-` 접두가 안 붙어 있음** — 3-2 참고. 기존 앱과 충돌할 수 있고,
  전면 개명은 화면을 눈으로 확인하면서 해야 해서 함께 결정할 일로 남겨뒀습니다.
- **보더가 옅습니다** — 입력·secondary 버튼의 테두리는 `--border-strong`(회색 11% 투명)
  이라 배경과 1.25:1입니다. WCAG 1.4.11의 UI 요소 기준(3:1)에는 못 미치는데,
  Geist를 포함한 대부분의 글로벌 시스템이 같은 특성을 갖습니다.
  진하게 바꾸면 지금 승인된 톤이 전체적으로 무거워지므로, 함께 보고 정하는 게 맞습니다.
- **API 어휘가 완전히 통일되지 않음** — 실패 상태를 `danger`로 쓰는 곳과 `error`로
  쓰는 곳이 섞여 있고, 크기는 `size`/`dense`/`density` 세 가지로 표현됩니다.
  쓰는 데 지장은 없지만 다음 정리 대상입니다.

---

## 7. AI로 화면 만들 때

`llms.txt`를 컨텍스트로 넣으면 이 시스템의 규칙을 따라 코드를 생성합니다.
섹션별로 나뉘어 있어 필요한 것만 읽히면 됩니다.

문서 사이트 주소(`https://Cogniterm.github.io/design-system`) 뒤에 붙입니다.

```
/llms.txt                  색인 (3 KB)
/components/llms.txt       UI를 만들 때 (30 KB)
/patterns/llms.txt         화면 전체 · 에이전트 흐름 (18 KB)
/foundation/llms.txt       색 · 여백 · 타이포 · 토큰 (14 KB)
/vuetify/llms.txt          설치와 연동 (3 KB)
/a11y/llms.txt             접근성 (18 KB)
/components/<id>.txt       컴포넌트 하나만 (65개)
```

문서 사이트의 컴포넌트 페이지마다 **"AI 프롬프트 복사"** 버튼이 있어,
그 컴포넌트를 쓰는 데 필요한 전부를 한 번에 클립보드로 가져갑니다.
