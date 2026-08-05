# 기여 가이드

> 이 시스템의 목표는 "컴포넌트를 많이 만드는 것"이 아니라
> **화면이 늘어도 일관성이 유지되는 것**입니다. 그래서 추가보다 판단 기준이 중요합니다.

---

## 시작하기

```bash
git clone https://github.com/Cogniterm/design-system.git
cd design-system

# 1) 문서 사이트 — 빌드 과정 없음
python3 -m http.server 4173
# → http://localhost:4173

# 2) 라이브 갤러리 (실제 Vuetify 위)
cd examples/vuetify-app
npm install
cp -r ../../vue src/design
cp ../../ds.css ../../ds-vuetify.css src/design/
npm run dev
```

---

## 새 컴포넌트를 만들기 전에

**대부분의 경우 답은 "만들지 않는다"입니다.** 아래 순서로 확인하세요.

1. **기존 컴포넌트 조합으로 되는가?** → 그러면 [Patterns](https://Cogniterm.github.io/design-system/#/templates)에 추가합니다.
2. **Vuetify에 이미 있고 동작이 복잡한가?** (포커스 트랩·포지셔닝·정렬·키보드)
   → `wrapped`로 감쌉니다. 직접 만들지 않습니다.
3. **시각이 전부이거나 Vuetify에 없는가?** → `custom`으로 만듭니다.

### 어디에 만드나

| origin | 위치 | 배럴 | 조건 |
|---|---|---|---|
| `custom` | `vue/components/Ds*.vue` | `vue/index.ts` | **외부 import 금지** — Vuetify도 Lucide도 |
| `wrapped` | `vue/components/vuetify/Ds*.vue` | `vue/vuetify.ts` | `vuetify/components`에서 import |

아이콘이 필요하면 **`#icon` 슬롯**으로 받습니다. 컴포넌트가 Lucide에 의존하지 않게 하기 위해서입니다.

---

## 컴포넌트 체크리스트

새 컴포넌트 PR에는 아래가 전부 있어야 합니다.

- [ ] 루트에 `all: unset` 리셋 (Vuetify 전역 리셋 차단)
- [ ] 클래스는 `ds-` 또는 시스템 고유 이름 — `.v-*`와 겹치지 않음
- [ ] `!important` 0회 (`ds-vuetify.css`의 A그룹 조정은 예외)
- [ ] 색·간격·모서리는 **CSS 변수로만** — hex·임의 px 금지
- [ ] 상태: `hover` `focus-visible` `active` `disabled` — 해당하면 `selected` `error`
- [ ] 포커스 링을 지우지 않음 (`outline: none` 금지)
- [ ] 아이콘만 있는 버튼에 `aria-label`
- [ ] `data.js`에 문서 항목 추가 — `reason`(왜 만들었나)과 `WHERE`(어디에 쓰나)를 **비워두지 않음**
- [ ] `node scripts-gen-meta.mjs` 실행 (meta.ts 재생성)
- [ ] 라이브 갤러리에 추가해 실제 Vuetify 위에서 확인

### 문서를 손으로 적지 않습니다

`vue/meta.ts`는 `data.js`에서 **자동 생성**됩니다. 직접 고치지 마세요.

```bash
node scripts-gen-meta.mjs
```

---

## 판단이 갈릴 때

**기본은 Geist, 갈리면 Radix Themes의 규칙을 따릅니다.**
그래도 안 되면 [디자인 원칙 6가지](https://Cogniterm.github.io/design-system/#/docs/principles)로 판단합니다.

자주 나오는 갈림길:

| 상황 | 답 |
|---|---|
| 저장 버튼이 필요한 on/off | Checkbox |
| 즉시 반영되는 on/off | Switch |
| 사라지면 안 되는 알림 | Alert |
| 지나가도 되는 결과 | Snackbar |
| 영역 단위 알림 | Alert |
| 페이지 전체 공지 | Banner |
| 2초 이내 대기 | Spinner |
| 에이전트 작업 대기 | ThinkingIndicator + ToolCallStep |
| 옵션 10개 이하 | Select |
| 옵션 10개 초과 | Autocomplete |
| 열이 고정된 데이터 | DataTable |
| 열이 고정되지 않은 목록 | List |

---

## 커밋과 PR

**PR은 작게 쪼갭니다.** 리뷰 15분을 넘기지 않는 크기가 좋습니다.

```
PR 1: tokens 변경        (30분)
PR 2: 컴포넌트 1종       (15분)
PR 3: 문서 항목          (10분)
```

커밋 메시지는 무엇을 왜 바꿨는지 씁니다. `wip:` 수준의 잦은 커밋이
6주 뒤 커밋 1개보다 낫습니다.

---

## 토큰을 바꿀 때

**회색 스케일은 되돌리기가 가장 비쌉니다.** 뿌리이기 때문입니다.
회색·브랜드 색 변경은 반드시 이슈에서 먼저 논의합니다.

값을 바꾸면 **네 곳을 함께** 고쳐야 합니다. 하나라도 빠지면 색이 갈립니다.

1. `ds.css` — CSS 변수 (라이트 + 다크)
2. `vue/theme.ts` — Vuetify 테마 (hex 값, CSS 변수 못 씀)
3. Foundation 문서의 해당 페이지
4. `llms.txt` — AI가 참조하는 규칙

---

## 릴리스

`CHANGELOG.md`에 기록하고 semver를 따릅니다.

| 변경 | 버전 |
|---|---|
| 토큰 값 변경, 컴포넌트 제거, props 이름 변경 | **major** |
| 컴포넌트·props 추가 | **minor** |
| 버그 수정, 문서 | **patch** |

---

## 질문

이슈로 남겨주세요. "이건 어떤 컴포넌트를 써야 하나요?" 같은 질문도 환영합니다 —
그 질문이 반복되면 문서가 부족하다는 신호입니다.
