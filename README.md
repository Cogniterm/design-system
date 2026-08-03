# Cogniterm Design System

AI SaaS Agent 제품군을 위한 미니멀 디자인 시스템.
Vue 3 · Vuetify 3.11 환경에서 그대로 사용합니다.

**문서 사이트** → https://kimjiyong995-coder.github.io/design-system/
**라이브 갤러리** → https://kimjiyong995-coder.github.io/design-system/live/
**감사 로그 예시** → https://kimjiyong995-coder.github.io/design-system/live/#audit

> **개발자와 처음 앉는다면** → [HANDOFF.md](HANDOFF.md) — 30분 적용 가이드, 리뷰 포인트, 미리 아는 함정

---

## 무엇인가

| 항목 | 값 |
|---|---|
| 브랜드 | `#1B72D9` — 면 (다크 `#4593F5`) · `#0F62C4` — 글자·링크 |
| 회색 | Radix Slate 1–12 (라이트/다크 쌍) |
| 폰트 | Pretendard Variable (SIL OFL) |
| 모서리 | 4 / 6 / 8 / 12px |
| 그림자 | 없음 (떠 있는 요소만 예외) |
| 아이콘 | Lucide — 의미 이름 59개 등록 |
| 컴포넌트 | 65종 — Standalone 30 · Vuetify 기반 34 · 아이콘 1 |

## 두 종류의 컴포넌트

```ts
// Vuetify가 없어도 동작합니다. ds.css만 필요.
import { DsButton, DsChatMessage, DsToolCallStep } from '~/design'

// Vuetify 컴포넌트를 감싼 것들. ds.css + ds-vuetify.css 필요.
import { DsDataTable, DsDialog, DsAlert } from '~/design/vuetify'
```

동작이 어려운 것(포커스 트랩·포지셔닝·정렬·페이지네이션)은 Vuetify에 맡기고,
시각이 전부인 것과 에이전트 전용 컴포넌트는 직접 만들었습니다.

Vuetify 컴포넌트 96종 전부가 `theme.ts` + `defaults.ts`로 우리 스타일을 받습니다.

## 설치

```bash
cp -r vue/ <소스루트>/design/
cp ds.css ds-vuetify.css <소스루트>/design/

npm install pretendard lucide-vue-next   # 새로 설치할 것은 둘뿐 (Vuetify는 이미 있다고 봅니다)
```

```ts
// nuxt.config.ts
css: [
  'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css',
  '~/design/ds.css',
  '~/design/ds-vuetify.css',
]

// vuetify 설정
import { dsTheme } from '~/design/theme'
import { dsDefaults } from '~/design/defaults'
createVuetify({ theme: dsTheme, defaults: dsDefaults })
```

기존 화면은 바뀌지 않습니다. `src/design/` 밖의 파일을 건드리지 않으므로
폴더째 지워도 앱은 그대로 동작합니다.

## AI에게 시킬 때

섹션별로 나뉘어 있어 필요한 것만 읽히면 됩니다.

| 파일 | 언제 |
|---|---|
| [`/llms.txt`](llms.txt) | 색인 — 항상 먼저 (2.4 KB) |
| [`/components/llms.txt`](components/llms.txt) | UI를 만들 때 (19 KB) |
| [`/patterns/llms.txt`](patterns/llms.txt) | 화면 전체·에이전트 흐름 (10 KB) |
| [`/foundation/llms.txt`](foundation/llms.txt) | 색·여백·타이포·토큰 (5 KB) |
| [`/vuetify/llms.txt`](vuetify/llms.txt) | 설치와 연동 (3 KB) |
| [`/a11y/llms.txt`](a11y/llms.txt) | 접근성 (10 KB) |

> "이 디자인 시스템으로 설정 화면 만들어줘.
> foundation/llms.txt, components/llms.txt, patterns/llms.txt 읽고 규칙 따라줘."

## 구조

```
index.html · docs.js · docs.css · data.js · foundation.js   문서 사이트
ds.css                토큰 + Standalone 컴포넌트 스타일 (단일 원본)
ds-vuetify.css        Vuetify 기반 컴포넌트 스타일
vue/
  index.ts            Standalone 배럴 (Vuetify 불필요)
  vuetify.ts          Vuetify 기반 배럴
  theme.ts            Vuetify 테마에 토큰 주입 — 96종 전부에 적용
  defaults.ts         Vuetify 컴포넌트 기본값 77종
  meta.ts             컴포넌트별 origin·이유 (en/ko)
  icon.ts / icons.ts  DsIcon 배럴 + 아이콘 레지스트리 (Lucide)
  components/         Ds*.vue
templates/            페이지 템플릿 (HTML)
examples/vuetify-app/ 실제 Vuetify 앱 예제 (소스)
live/                 위 예제의 빌드 결과 — 공개 사이트에서 바로 열림
llms.txt              AI용 색인
{components,patterns,foundation,vuetify,a11y}/llms.txt   섹션별 컨텍스트 (자동 생성)
scripts-gen-llms.mjs  llms.txt 생성기
scripts-gen-meta.mjs  meta.ts 생성기
scripts-check.mjs     문서 무결성 검사 (CI)
```

## Foundation

컴포넌트 이전의 결정 14가지 — 토큰 · 색 · 타이포그래피 · 여백 · 모서리 · 높낮이 ·
밀도 · 아이콘 · 모션 · 상태 · 접근성 · 글쓰기 · 다국어.

https://kimjiyong995-coder.github.io/design-system/#/foundation/overview

## 라이브 갤러리 직접 실행

```bash
cd examples/vuetify-app
npm install
cp -r ../../vue src/design
cp ../../ds.css ../../ds-vuetify.css src/design/
npm run dev
```
