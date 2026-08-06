/* 한국어 로케일 — createVuetify에 넘깁니다.
   이걸 넣지 않으면 Vuetify 내부 문구가 영어로 남습니다.
   달력이 가장 눈에 띕니다: 요일이 "S M T W T F S", 머리글이 "August 2026"으로 나옵니다.

   두 가지를 따로 설정해야 합니다 — 하나만 넣으면 절반만 번역됩니다.
     locale — 컴포넌트가 쓰는 UI 문구 (닫기 · 다음 페이지 · 항목 없음 …)
     date   — 날짜를 글자로 바꿀 때 쓰는 Intl 로케일 (요일 · 월 이름 · 연월 표기) */
import { ko, en } from 'vuetify/locale'

export const dsLocale = {
  locale: 'ko',
  fallback: 'en',
  messages: { ko, en },
}

/* Vuetify 로케일 키('ko')를 Intl 로케일('ko-KR')에 잇습니다.
   ko-KR로 잡으면 요일이 일·월·화…, 머리글이 "2026년 8월"이 되고
   한 주의 시작이 일요일로 맞춰집니다. */
export const dsDate = {
  locale: { ko: 'ko-KR', en: 'en-US' },
}
