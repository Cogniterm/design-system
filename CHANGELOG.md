# Changelog

이 프로젝트는 [Semantic Versioning](https://semver.org/lang/ko/)을 따릅니다.

형식: `Added` 추가 · `Changed` 변경 · `Fixed` 수정 · `Removed` 제거 · `Deprecated` 폐기 예정

---

## [Unreleased]

### Added
- **섹션별 llms.txt** — `/components` `/patterns` `/foundation` `/vuetify` `/a11y`.
  AI가 필요한 부분만 읽습니다. 루트 `llms.txt`는 2.4KB 색인으로 축소
- **접근성 문서 50종 전체 완료** — 키보드 표 + 역할 분담
- **용어집(Word List)** — 한국어 UI 문안 통일표. 제품 개념·동작·상태·문장 규칙·표기
- **Patterns 17종** — 기본 5(폼·필터·상태·파괴적 액션·객체 상태),
  **에이전트 5**(스트리밍·근거 표시·사람의 승인·AI 생성 표시·실패 복구),
  페이지 템플릿 7(목록·상세·설정·마법사·챗·검색·드라이브)
- **컴포넌트별 접근성 탭** — 키보드 표 + "컴포넌트가 해주는 것 / 직접 해야 하는 것"
- **비슷한 컴포넌트 구분** — Checkbox vs Switch 같은 오용 방지
- MIT 라이선스 · 기여 가이드 · 행동 강령 · 이슈/PR 템플릿
- **CI 게이트** — 문서 무결성 8종 검사, Stylelint(hex·!important·굵기 차단), Vuetify 빌드

### Changed
- `vue/meta.ts`를 `data.js`에서 자동 생성 (20종 → 50종 동기화)
- `vuetifyBase`(감싼 것)와 `vuetifyAlt`(대안이 있지만 안 쓴 것) 분리

## [0.3.0] — 2026-07-31

### Added
- **Foundation 14종** — 토큰·색·타이포그래피·여백·모서리·높낮이·밀도·아이콘·모션·상태·접근성·글쓰기·다국어
- **아이콘 시스템** — Lucide 기반. 의미 이름 59개 등록 (`vue/icons.ts`), `DsIcon` 컴포넌트
- **Vuetify 테마 주입** (`vue/theme.ts`) — Vuetify 컴포넌트 96종 전부가 우리 색을 받습니다
- **컴포넌트 24종 추가** — IconButton, ButtonGroup, Tabs, Breadcrumbs, Pagination, NavList,
  Stepper, Textarea, Autocomplete, Checkbox, RadioGroup, Switch, Slider, FileInput,
  DatePicker, Alert, Banner, ProgressBar, Spinner, Snackbar, List, Treeview, Timeline, Accordion
- **라이브 갤러리** (`/live/`) — 실제 Vuetify 3.11.6 위에서 50종 전부 렌더
- **감사 로그 예제 화면** — 테이블·필터·다이얼로그·로딩/빈 상태
- MIT 라이선스, 기여 가이드, 행동 강령, 변경 이력

### Changed
- **시각 톤을 한 단계 부드럽게** — radius 2/4/6 → 4/6/8 + xl 12 신설,
  버튼·입력 36→38px, 행 높이 32/40/48 → 34/42/50, 줄 간격 1.55→1.62, 전환 120→160ms
- `vue/defaults.ts` — Vuetify 기본값 7종 → 77종
- `vue/meta.ts` — `data.js`에서 자동 생성 (손으로 적지 않음)

### Fixed
- Pretendard가 선언만 되고 실제로 로드되지 않아 시스템 글꼴로 렌더되던 문제
- Vuetify가 `.text-*` 유틸 81종에 Roboto를 강제하던 문제

## [0.2.0] — 2026-07-31

### Added
- Vuetify 기반 래퍼 5종 (DataTable, Dialog, Menu, Tooltip, Select)
- `ds-vuetify.css` — A그룹 시각 조정
- Vuetify 3.11.6 호환 검증 앱 (`examples/vuetify-app`)
- 문서 사이트 재구성 — 카테고리 사이드바, 컴포넌트별 페이지, Overview/Properties/Guidelines/Code 탭

## [0.1.0] — 2026-07-31

### Added
- 토큰 (브랜드 #1F7FF0, Radix Slate 12단계, 라이트/다크)
- Standalone 컴포넌트 20종
- 골든 스크린 — Chat, Search
- 문서 사이트, `llms.txt`
