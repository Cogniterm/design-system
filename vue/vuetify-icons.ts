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
  Loader2, Circle, CircleDot,
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

/* 체크박스 표식 — DsCheckbox(.ds-check__mark)와 같은 경로·같은 굵기입니다.

   Lucide의 Check를 쓰면 24 뷰박스가 상자 크기로 축소되면서 선이 얇아지고
   폭도 달라집니다. 그러면 직접 만든 체크박스와 Vuetify가 그리는 체크박스가
   나란히 놓였을 때 서로 다르게 보입니다 — 같은 부품이 자리에 따라 달라지는,
   계속 잡아 온 그 문제입니다. 표식을 한 벌로 맞춥니다. */
const mark = (d: string): FunctionalComponent => () =>
  h('svg', {
    viewBox: '0 0 16 16', width: '1em', height: '1em', fill: 'none',
    stroke: 'currentColor', 'stroke-width': 2,
    'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true',
  }, [h('path', { d })])

/* 미선택 상태는 글리프를 쓰지 않습니다 — 빈 자리만 둡니다.
   상자는 선택 여부와 무관하게 CSS가 한 번만 그립니다(ds-vuetify.css). */
const blank: FunctionalComponent = () =>
  h('svg', { width: '1em', height: '1em', 'aria-hidden': 'true' })

/* Vuetify 3가 내부에서 쓰는 별칭 전부 */
export const lucideAliases: IconAliases = {
  collapse: wrap(ChevronUp),
  complete: wrap(Check),
  cancel: wrap(XCircle),
  close: wrap(X),
  delete: wrap(X),             // 칩 제거 — DsChip과 같은 가벼운 X
  clear: wrap(XCircle),        // 입력 필드의 clear 버튼
  success: wrap(CheckCircle2),
  info: wrap(Info),
  warning: wrap(AlertTriangle),
  error: wrap(AlertCircle),
  prev: wrap(ChevronLeft),
  next: wrap(ChevronRight),
  /* 체크박스 — 상자는 CSS가 그리고(ds-vuetify.css), 여기서는 그 위에 얹을
     표식만 줍니다. 전에는 선택 = Check 글리프, 미선택 = Square 글리프였는데,
     둘이 아예 다른 그림이라 켜고 끌 때 상자 크기(16 ↔ 13.3px)와
     모서리(4 ↔ 1.3px)와 선 굵기가 함께 변했습니다. */
  checkboxOn: mark('M3.5 8.5 6.5 11.5 12.5 5'),
  checkboxOff: blank,
  checkboxIndeterminate: mark('M4 8h8'),
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
