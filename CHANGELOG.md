# Changelog

## 이 문서를 왜 쓰나

이 디자인 시스템은 npm 패키지가 아니라 **파일 복사**로 배포됩니다.
받는 쪽이 특정 버전에 고정할 방법이 없고, 갱신은 `src/design/`을 통째로
다시 복사하는 것입니다. 그래서 번호를 붙인 릴리스는 하지 않습니다 —
아무도 그 번호로 고정할 수 없으니 관리 비용만 늘어납니다.

대신 **깨지는 변경만** 여기 적습니다. 복사만 하면 기존 화면이 달라지는 것들입니다.
받는 쪽은 복사하기 전에 이 문서의 맨 위만 읽으면 됩니다.

- 지금 쓰는 것이 언제 것인지는 `vue/version.ts`의 `DS_VERSION`(내용 지문)으로 압니다.
- 되돌아갈 지점이 필요한 변경에는 날짜 태그(`2026-08-06`)를 답니다.
- 사외 배포나 npm 패키지로 바뀌면 그때 Semantic Versioning으로 옮깁니다.

형식: `Added` 추가 · `Changed` 변경 · `Fixed` 수정 · `Removed` 제거 · `Deprecated` 폐기 예정

---

## 2026-08-28 — 깨지는 변경 (색)

### Changed

**차트 색과 범주 색이 갈라졌습니다 — `--cat-*`를 차트에 쓰고 있었다면 색이 바뀝니다**

한 팔레트로 둘을 겸하고 있었습니다(`--chart-N: var(--cat-N)`). 요구가 반대라 겸할 수
없습니다 — 차트는 **순서대로 배정**해서 인접 계열의 대비가 중요하고, 범주는 **종류에
고정**이라 값이 앱을 따라 바뀝니다. 조사한 시스템(shadcn · Atlassian · Carbon · Primer)
중 둘을 겸용하는 곳은 없습니다.

| | 이전 | 이후 |
|---|---|---|
| 차트 계열 | `--chart-N` = `--cat-N` 별칭 | **`--chart-1~6`이 자기 값** (기존 색 그대로: 블루 · 틸 · 바이올렛 · 앰버 · 핑크 · 그린) |
| 범주 | `--cat-1~6` | **`--cat-1~8`, 값은 앱(llmops-console-ux)과 동일** — 2는 틸→주황, 3은 바이올렛→초록, 4·5·6도 톤이 조금 달라집니다 |

받는 쪽이 할 일:
- **차트에 `--cat-N`을 쓰고 있었다면 `--chart-N`으로 바꾸세요.** 그러면 색이 그대로입니다.
  안 바꾸면 2번 계열이 틸에서 주황으로 바뀝니다.
- 문서 종류·라벨처럼 **종류에 색을 고정**해 쓰고 있었다면 그대로 `--cat-N`입니다.

**배지 분류 톤이 개명됐습니다 — `violet` · `teal` · `pink`는 더 이상 없습니다**

| 이전 | 이후 |
|---|---|
| `.badge.violet` / `variant="violet"` | **`.badge.cat-3`** / `variant="cat-3"` |
| `.badge.teal` / `variant="teal"` | **`.badge.cat-2`** / `variant="cat-2"` |
| `.badge.pink` / `variant="pink"` | **`.badge.cat-5`** / `variant="cat-5"` |

`solid` · `outline` 조합도 같이 바뀝니다(`.badge.solid.teal` → `.badge.solid.cat-2`).

왜: 이 톤들은 뜻이 없는 **분류용**이라 값이 언제든 바뀝니다. 실제로 이번에 `--cat-2`가
주황이 되면서 `.badge.teal`이 주황을 칠하게 됐습니다. 색 이름 대신 **슬롯 번호**로 부르면
값이 바뀌어도 이름이 안 틀립니다. Atlassian이 accent를 두고 "한 색을 다른 색으로 바꿔도
경험이 그대로여야 한다"고 못박는 것과 같은 이유입니다.
의미색(`brand` · `success` · `warning` · `danger` · `info`)은 그대로입니다.

찾는 법: `grep -rn "badge.*\(violet\|teal\|pink\)\|variant=\"\(violet\|teal\|pink\)\"" src/`

---

## 2026-08-28 — 깨지는 변경

### Changed

**슬라이더 손잡이·홈이 커집니다 — 복사하면 화면이 달라집니다** (shadcn Slider 규격)

| | 이전 | 이후 |
|---|---|---|
| 홈(track) | 3~4px | **6px** |
| 손잡이(thumb) | 14px · 브랜드로 꽉 참 | **16px · 흰 면 + 브랜드 테두리 1px** |
| 빈 홈 | (실제로는 브랜드 파랑이었음) | **회색 `--gray-5`** |
| 손잡이 그림자 | 머티리얼 elevation 2 | **없음** |
| hover · 포커스 | 머티리얼 헤일로 | **4px 링 · `--focus-ring`과 같은 그림** |

받는 쪽이 할 일:
- `DsSlider`만 쓰고 있으면 **할 일 없습니다.** 슬라이더가 굵어지고 손잡이가 흰 원이 됩니다.
- `<v-slider>`를 직접 쓰고 있으면 `defaults.ts`를 함께 복사해야 합니다 —
  `trackColor`·`elevation`이 거기 있고, 빠지면 **홈 전체가 파랗게** 칠해집니다.
- 슬라이더 줄 높이가 2~3px 커집니다. 그 줄에 맞춰 잡아 둔 여백이 있으면 함께 보세요.

### Fixed

위 표의 "이전" 칸이 의도와 달랐던 것 둘 — 고쳐 놓고 보니 **원래 안 먹던 CSS**였습니다.

- **빈 홈이 파랬습니다.** `color="primary"`가 채운 구간과 빈 홈 **양쪽**에 걸리는데,
  Vuetify가 그때 붙이는 `.bg-primary`가 `!important`라 `.v-slider-track__background`
  규칙이 한 번도 이기지 못했습니다. 이제 `trackColor`(인라인)로 정합니다.
- **손잡이에 머티리얼 그림자가 남아 있었습니다.** `.elevation-N`의 `box-shadow`가
  `!important`인 데다 `@layer vuetify` 안에 있어서 — **중요 선언은 레이어 우선순위가
  뒤집힙니다** — 레이어 밖의 `box-shadow: none`으로는 못 지웠습니다.
  이제 `elevation: 0`으로 끄고, 링은 Vuetify가 손대지 않는 `outline`으로 그립니다.

## 2026-08-06 — 깨지는 변경

### Changed

**컨트롤 크기 체계가 바뀝니다 — 복사하면 화면이 달라집니다**

| | 이전 | 이후 |
|---|---|---|
| 단계 | 32 / 40 / 48 | **32 / 36 / 40** |
| 기본값 | 40 | **32** |

크기를 지정하지 않은 버튼·입력·검색·세그먼티드 컨트롤이 **40px에서 32px로
8px 줄어듭니다.** 그 줄에 맞춰 잡아 둔 여백이 있으면 함께 봐야 합니다.

받는 쪽이 할 일:
- 그대로 두면 화면 전체가 촘촘해집니다. 대부분은 이게 의도한 결과입니다.
- 예전 크기를 유지해야 하는 자리가 있으면 `size="lg"`(40px)를 명시합니다.
- `size="sm"`으로 쓴 코드는 그대로 둬도 됩니다 — 32의 다른 이름으로 남겼습니다.
- `size="lg"`로 쓴 자리는 48 → 40으로 줄어듭니다. 확인이 필요합니다.

**다크 모드 Primary 버튼의 글자색이 검정 → 흰색**

면도 밝은 파랑(#4593F5)에서 라이트와 같은 원색(#1F7FF0)으로 돌아갑니다.
다크 화면을 캡처해 둔 문서가 있으면 다시 찍어야 합니다.

### Added
- `DsButton`에 `loading` — 스피너를 알아서 고릅니다 (색 있는 버튼엔 흰 스피너)
- `DsSpinner` 종류 4가지: `brand` · `on-brand` · `current` · `muted`
- `DsSwitch`에 `size` — 32×18 / 40×22 / 48×26

### Fixed
- 스위치 트랙 너비가 두 곳에서 36px·34px로 갈려 있던 것
- 색 있는 버튼 위 스피너의 회색 밑줄이 잔상처럼 보이던 것
- 에러 입력의 포커스 링이 너무 옅어 잘 안 보이던 것
- 문서 사이트가 낡은 캐시를 잡고 있으면 스스로 새로고침하도록

---

## [Unreleased]

### Added
- **감사 로그 템플릿** (`templates/audit.html`) — 컴포넌트만으로 조립한 관리자 화면.
  LNB 셸 · 요약 카드 · 필터 바 · 정렬/선택 테이블 · 상세 패널 · 상태 5종
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

### Fixed
- **Select·Combobox·Autocomplete 드롭다운 옵션 높이** — Vuetify density 규칙이
  `.v-list-item` 기본(36px)을 44px로 덮어써 Menu(34px)와 어긋나던 것 교정.
  오버레이(`.v-select__content` 등)에 특이도를 올려 36px로 통일
- **텍스트에어리어 값·placeholder 상단 잘림** — `padding:0`+중앙 정렬이 여러 줄
  입력의 첫 줄을 필드 경계에 붙여 글자 윗부분이 잘렸음. `.v-textarea`만 상단 정렬+상하 여백
- **체크박스·라디오 라벨 간격 과다** — 선택 컨트롤 상자(36px)와 라벨 사이 빈 공간을
  28px로 좁혀 라벨에 붙임 (스위치는 트랙 크기 영향으로 제외)
- **입력 안 태그(Combobox·Autocomplete chips) 크기** — 26px 큰 알약을 22px 컴팩트 태그로,
  닫기 아이콘 축소. 필드 높이(40px) 안에 여유 있게
- 위 수정은 모두 `ds-vuetify.css`에서만 처리 (컴포넌트 API·`!important` 변화 없음)

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
- `vue/meta.ts` — `data.js`에서 자동 생성 (직접 고치지 않음)

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
- 페이지 템플릿 — Chat, Search
- 문서 사이트, `llms.txt`
