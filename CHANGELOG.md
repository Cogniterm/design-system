# Changelog

이 프로젝트는 [Semantic Versioning](https://semver.org/lang/ko/)을 따릅니다.

형식: `Added` 추가 · `Changed` 변경 · `Fixed` 수정 · `Removed` 제거 · `Deprecated` 폐기 예정

---

## [Unreleased]

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
