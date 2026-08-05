/* ============================================
   vuetify-icons.ts — Vuetify 내부 아이콘을 Lucide로
   ============================================
   Vuetify는 체크박스 체크·셀렉트 화살표·정렬 화살표·알림 아이콘 같은
   내부 아이콘을 기본으로 @mdi/font(웹폰트 1MB+)에서 가져옵니다.
   설치하지 않으면 전부 빈 글자로 깨지고, 설치하면 Lucide와 두 벌이 섞입니다.

   여기서 Vuetify의 내부 별칭 전부를 Lucide 컴포넌트로 매핑합니다.
   문자열 아이콘(icon="agent")은 우리 의미 레지스트리(icons.ts)로 풉니다.

   연결:
     import { lucideIconSet } from '~/design/vuetify-icons'
     createVuetify({ icons: lucideIconSet, theme: dsTheme, defaults: dsDefaults })
*/
import { h, type FunctionalComponent } from 'vue'
import type { IconSet, IconAliases, IconProps } from 'vuetify'
import {
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
  ChevronsLeft, ChevronsRight, ChevronsUpDown,
  X, XCircle, Check, CheckCircle2, Info, AlertTriangle, AlertCircle,
  Loader2, Square, CheckSquare, MinusSquare, Circle, CircleDot,
  ArrowUp, ArrowDown, Menu, Pencil, Star, StarHalf,
  Paperclip, Plus, Minus, Calendar, Pipette, Upload, EllipsisVertical,
  Palette, Command, ArrowBigUp, Option, CornerDownLeft,
  ArrowUp as ArrowUpKey, ArrowDown as ArrowDownKey,
  ArrowLeft as ArrowLeftKey, ArrowRight as ArrowRightKey, Delete, Space,
} from 'lucide-vue-next'
import { icons as semantic } from './icons'

/* Lucide 컴포넌트를 Vuetify 아이콘 슬롯에 맞게 감쌉니다.
   크기는 VIcon의 font-size(1em)를 따라가고, 선 굵기는 시스템 표준 1.5. */
const wrap = (C: unknown): FunctionalComponent =>
  () => h(C as FunctionalComponent, { size: '1em', strokeWidth: 1.5, 'aria-hidden': 'true' })

/* Vuetify 3가 내부에서 쓰는 별칭 전부 */
export const lucideAliases: IconAliases = {
  collapse: wrap(ChevronUp),
  complete: wrap(Check),
  cancel: wrap(XCircle),
  close: wrap(X),
  delete: wrap(XCircle),       // 입력 필드의 clear 버튼
  clear: wrap(XCircle),
  success: wrap(CheckCircle2),
  info: wrap(Info),
  warning: wrap(AlertTriangle),
  error: wrap(AlertCircle),
  prev: wrap(ChevronLeft),
  next: wrap(ChevronRight),
  /* 체크박스 — 선택하면 브랜드 면이 채워지므로(ds-vuetify.css) 상자가 아니라
     글리프만 얹습니다. 미선택은 빈 사각형 그대로. */
  checkboxOn: wrap(Check),
  checkboxOff: wrap(Square),
  checkboxIndeterminate: wrap(Minus),
  delimiter: wrap(Circle),     // 캐러셀 점
  sortAsc: wrap(ArrowUp),
  sortDesc: wrap(ArrowDown),
  expand: wrap(ChevronDown),
  menu: wrap(Menu),
  subgroup: wrap(ChevronDown),
  dropdown: wrap(ChevronDown),
  radioOn: wrap(CircleDot),
  radioOff: wrap(Circle),
  edit: wrap(Pencil),
  ratingEmpty: wrap(Star),
  ratingFull: wrap(Star),
  ratingHalf: wrap(StarHalf),
  loading: wrap(Loader2),
  first: wrap(ChevronsLeft),
  last: wrap(ChevronsRight),
  unfold: wrap(ChevronsUpDown),
  file: wrap(Paperclip),
  plus: wrap(Plus),
  minus: wrap(Minus),
  calendar: wrap(Calendar),
  treeviewCollapse: wrap(ChevronDown),
  treeviewExpand: wrap(ChevronRight),
  eyeDropper: wrap(Pipette),
  upload: wrap(Upload),
  vertical: wrap(EllipsisVertical),

  /* 키보드 힌트 — Vuetify의 IconAliases 타입이 요구합니다 (VHotkey 등에서 사용) */
  color: wrap(Palette),
  command: wrap(Command),
  ctrl: wrap(ChevronUp),
  space: wrap(Space),
  shift: wrap(ArrowBigUp),
  alt: wrap(Option),
  enter: wrap(CornerDownLeft),
  arrowup: wrap(ArrowUpKey),
  arrowdown: wrap(ArrowDownKey),
  arrowleft: wrap(ArrowLeftKey),
  arrowright: wrap(ArrowRightKey),
  backspace: wrap(Delete),
}

/* 문자열 아이콘 — 우리 의미 이름을 그대로 씁니다: <v-icon icon="agent" /> */
const lucideSet: IconSet = {
  component: (props: IconProps) => {
    const C = semantic[props.icon as keyof typeof semantic]
    if (!C) return h('span')  // 등록되지 않은 이름은 조용히 비웁니다
    return h(C as FunctionalComponent, { size: '1em', strokeWidth: 1.5, 'aria-hidden': 'true' })
  },
}

export const lucideIconSet = {
  defaultSet: 'lucide',
  aliases: lucideAliases,
  sets: { lucide: lucideSet },
}
