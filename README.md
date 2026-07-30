# Design System

AI SaaS Agent 제품군을 위한 극한 미니멀 디자인 시스템.
Extreme-minimal design system for AI agent products.

- **스타일**: Geist 계열 — 그림자 없음, 1px 보더, radius 2/4/6px
- **브랜드**: `#1F7FF0` (다크에선 `#4593F5`)
- **회색**: Radix Slate 1–12 (라이트/다크 쌍)
- **폰트**: Pretendard
- **테마**: 라이트 + 다크 (`data-theme="dark"`)

## 사용법 / Usage

`ds.css` 하나만 가져오면 됩니다:

```html
<link rel="stylesheet" href="ds.css">
```

컴포넌트 마크업은 문서 사이트의 각 섹션에서 복사하세요.

## AI에게 시킬 때 / For AI

`llms.txt`를 컨텍스트로 넣고 이렇게 요청하세요:

> "이 디자인 시스템으로 검색 화면 만들어줘. templates/search.html 참고해."

## 구조

```
ds.css            토큰 + 전체 컴포넌트 스타일 (단일 원본)
theme.js          다크 모드 토글
index.html        문서 사이트 (컴포넌트 21종, 한글 설명 + 코드)
templates/        골든 스크린 (chat, search)
llms.txt          AI용 요약 컨텍스트
```
