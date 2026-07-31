# Vuetify 3.11 호환 검증 앱

이 디자인 시스템이 **실제 Vuetify 3.11.6 앱 안에서** 문제없이 동작하는지
직접 확인할 수 있는 최소 예제입니다.

## 실행

```bash
cd examples/vuetify-app
npm install        # vue + vuetify 3.11.6 + vite
cp -r ../../vue src/design
cp ../../ds.css ../../ds-vuetify.css src/design/
npm run dev
```

## 무엇을 확인하나

이 앱은 `<v-app>` 안에서 Vuetify 전역 스타일(`vuetify/styles`)을 로드한 상태로
컴포넌트 25종을 전부 렌더합니다.

| # | 검증 항목 |
|---|---|
| 1 | Vuetify 원본(`VBtn`·`VChip`)과 우리 컴포넌트를 나란히 배치 — 서로 스타일을 침범하지 않는지 |
| 2 | `VCard` **안에** 우리 컴포넌트를 중첩 — Vuetify 자식 셀렉터의 영향을 받지 않는지 |
| 3 | Vuetify 기반 컴포넌트 5종(`DataTable`·`Dialog`·`Menu`·`Tooltip`·`Select`) 동작 |
| 4 | 에이전트 전용 컴포넌트 — Vuetify에 없는 것들 |
| 5 | 나머지 Standalone 컴포넌트 전체 + 다크 모드 토글 |

## 검증 결과 (2026-07-31)

- `vite build` 통과 — 602 모듈, 에러 0
- Standalone 컴포넌트 20종 중 `vuetify`를 import 하는 것: **0개**
- `ds.css`의 `!important`: **0개**
- `ds.css`가 정의하는 `.v-*` 클래스: **0개**
