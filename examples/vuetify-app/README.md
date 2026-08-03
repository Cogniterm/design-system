# Vuetify 3.11 호환 검증 앱 — 감사 로그 화면

이 디자인 시스템이 **실제 Vuetify 3.11.6 앱 안에서** 문제없이 동작하는지
직접 확인할 수 있는 예제입니다. 화면은 **감사 로그(Audit Log)** — 테이블 중심이라
정렬·필터·밀도·상태 표시를 한눈에 검증하기 좋습니다.

## 실행

```bash
cd examples/vuetify-app
npm install                                   # vue + vuetify 3.11.6 + vite
cp -r ../../vue src/design
cp ../../ds.css ../../ds-vuetify.css src/design/
npm run dev
```

## 화면 구성

| 영역 | 확인 항목 |
|---|---|
| 요약 카드 4개 | DsCard · 상태별 집계 |
| 필터 바 | DsInput · DsSelect(VSelect) · 수준 필터 · 밀도 전환 |
| 활성 필터 | DsChip 제거 · 모두 해제 |
| **로그 테이블** | DsDataTable(VDataTable) — 정렬·페이지네이션, 셀 슬롯에 Badge/Avatar/코드 |
| 행 메뉴 | DsMenu(VMenu) — ⋯ 클릭 |
| 상세 창 | DsDialog(VDialog) — 포커스 트랩·ESC |
| 로딩 / 빈 상태 | DsSkeleton · DsEmptyState (새로고침·필터로 재현) |
| 토스트 | DsToast — 성공/실패 |
| 에이전트 분석 | DsChatMessage · DsToolCallStep · DsCitationChip · DsAgentInput |
| **Vuetify 원본** | 감싸지 않은 `v-btn`·`v-alert`·`v-list`·`v-tabs` 등이 theme/defaults만으로 우리 스타일이 되는지 |

## 검증 결과 (2026-07-31)

- `vite build` 통과 — 603 모듈, 에러 0
- Vuetify 3.11.6 정확히 설치 확인
- Standalone 컴포넌트 30종 중 `vuetify`를 import 하는 것: **0개**
- `ds.css`의 `!important`: **0개** / `.v-*` 정의: **0개**
- Vuetify 컴포넌트 96종 중 `defaults.ts` 지정: **77종**, 나머지는 CSS 또는 스타일 불필요

## 눈으로 확인할 것

1. **다크 모드** — 우상단 토글. Vuetify 테마(`theme.change`)와 우리 CSS(`data-theme`)가 함께 전환됩니다.
2. **밀도 전환** — compact / comfortable / spacious. 행 높이가 32/40/48px로 바뀝니다 (원칙 3).
3. **Vuetify 원본 영역** — `v-alert`·`v-list`·`v-tabs`가 브랜드 파랑과 우리 회색으로 나오는지.
