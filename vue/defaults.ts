/* ============================================
   defaults.ts — Vuetify 전 컴포넌트 기본값
   ============================================
   브리프 11장 "강제 층 1번".
   개발자가 <v-alert>·<v-stepper>를 그냥 써도 우리 스타일이 나오게 합니다.
   여기 없는 컴포넌트는 Vuetify 기본 모양으로 나오므로 계속 채워 넣습니다.

   원칙:
   - elevation: 0        그림자 없음 (떠 있는 요소만 예외)
   - variant: 'outlined' 면은 1px 보더로 구분
   - rounded: 'lg'       컨트롤 radius 8px — 커스텀 .btn·.input과 같은 값 (면은 xl)
   - ripple: false       미니멀 — 물결 효과 제거
*/

export const dsDefaults = {
  /* ── 전역 ── */
  global: {
    ripple: false,
  },

  /* ── Action ── */
  VBtn: {
    variant: 'flat',
    rounded: 'lg',
    elevation: 0,
    ripple: false,
    style: 'text-transform:none;letter-spacing:0;font-weight:500;',
  },
  VBtnGroup: { variant: 'outlined', rounded: 'lg', elevation: 0, divided: true },
  VBtnToggle: { variant: 'outlined', rounded: 'lg', elevation: 0, divided: true },
  VFab: { elevation: 0, rounded: 'md' },
  VSpeedDial: { transition: 'fade-transition' },

  /* ── Surface / Container ── */
  VCard: { variant: 'outlined', rounded: 'xl', elevation: 0 },
  VSheet: { elevation: 0, rounded: 'xl' },
  VToolbar: { flat: true, density: 'comfortable' },
  VAppBar: { flat: true, elevation: 0, density: 'comfortable', border: 'b' },
  VFooter: { elevation: 0, border: 't' },
  VSystemBar: { color: 'surface' },
  VExpansionPanel: { elevation: 0, rounded: 'md' },
  VExpansionPanels: { variant: 'accordion', elevation: 0 },
  VParallax: { scale: 1 },

  /* ── Navigation ── */
  VNavigationDrawer: { elevation: 0, border: 'e' },
  VBottomNavigation: { elevation: 0, border: 't', grow: true },
  VTabs: { density: 'comfortable' },
  VTab: { ripple: false, style: 'text-transform:none;letter-spacing:0;font-weight:500;' },
  VBreadcrumbs: { density: 'comfortable' },
  VPagination: { variant: 'text', rounded: 'md', totalVisible: 7 },
  VStepper: { flat: true, elevation: 0, rounded: 'lg' },

  /* ── Data Input ── */
  VTextField: { variant: 'outlined', density: 'comfortable', hideDetails: 'auto', rounded: 'lg' },
  VTextarea: { variant: 'outlined', density: 'comfortable', hideDetails: 'auto', rounded: 'lg', autoGrow: true },
  VSelect: { variant: 'outlined', density: 'comfortable', hideDetails: 'auto', rounded: 'lg' },
  VAutocomplete: { variant: 'outlined', density: 'comfortable', hideDetails: 'auto', rounded: 'lg' },
  VCombobox: { variant: 'outlined', density: 'comfortable', hideDetails: 'auto', rounded: 'lg' },
  VFileInput: { variant: 'outlined', density: 'comfortable', hideDetails: 'auto', rounded: 'lg' },
  VNumberInput: { variant: 'outlined', density: 'comfortable', hideDetails: 'auto', rounded: 'lg' },
  VOtpInput: { variant: 'outlined', rounded: 'lg' },
  VCheckbox: { color: 'primary', density: 'comfortable', hideDetails: 'auto', ripple: false },
  VRadio: { color: 'primary', density: 'comfortable', ripple: false },
  VRadioGroup: { color: 'primary', density: 'comfortable', hideDetails: 'auto' },
  VSwitch: { color: 'primary', density: 'comfortable', hideDetails: 'auto', inset: true, ripple: false },
  VSlider: { color: 'primary', density: 'comfortable', hideDetails: 'auto', thumbSize: 14, trackSize: 3 },
  VRangeSlider: { color: 'primary', density: 'comfortable', hideDetails: 'auto', thumbSize: 14, trackSize: 3 },
  VRating: { color: 'primary', density: 'comfortable', size: 'small' },
  VDatePicker: { elevation: 0, color: 'primary', hideHeader: true },
  VTimePicker: { elevation: 0, color: 'primary', hideHeader: true },
  VColorPicker: { elevation: 0, mode: 'hexa' },
  VCalendar: { color: 'primary' },
  VConfirmEdit: { color: 'primary' },

  /* ── Feedback & Status ── */
  VAlert: { variant: 'tonal', rounded: 'lg', density: 'comfortable' },
  VBanner: { rounded: 'md', density: 'comfortable', lines: 'one' },
  VChip: { variant: 'outlined', rounded: 'pill', size: 'small', ripple: false },
  VBadge: { color: 'primary' },
  VProgressLinear: { color: 'primary', height: 2, rounded: false },
  VProgressCircular: { color: 'primary', width: 2, size: 20 },
  VSkeletonLoader: { elevation: 0, color: 'surface' },
  /* timeout은 DsSnackbar가 내용에 따라 정합니다(행동 버튼 없으면 3초, 있으면 6초).
     직접 쓴 <v-snackbar>를 위한 기본값만 여기 둡니다. */
  VSnackbar: { rounded: 'xl', location: 'bottom right', timeout: 3000 },
  VSnackbarQueue: { elevation: 0, rounded: 'xl', location: 'bottom right' },
  VEmptyState: { size: 48 },

  /* ── Overlay ── */
  VDialog: { transition: 'fade-transition', scrim: 'rgba(0,0,0,.32)' },
  VMenu: { transition: 'fade-transition', offset: 6 },
  VOverlay: { transition: 'fade-transition', scrim: 'rgba(0,0,0,.32)' },
  VTooltip: { transition: 'fade-transition', location: 'top', openDelay: 300 },
  VBottomSheet: { transition: 'fade-transition' },

  /* ── Table & List ── */
  VTable: { density: 'comfortable', hover: true },
  VDataTable: { density: 'comfortable', hover: true, itemsPerPage: 20 },
  VDataTableServer: { density: 'comfortable', hover: true, itemsPerPage: 20 },
  VDataTableVirtual: { density: 'comfortable', hover: true },
  VDataIterator: { itemsPerPage: 20 },
  VList: { density: 'comfortable', nav: true, rounded: 'lg' },
  VListItem: { ripple: false, rounded: 'md' },
  VTreeview: { density: 'comfortable', rounded: 'md' },
  VVirtualScroll: { itemHeight: 40 },
  VInfiniteScroll: { mode: 'intersect' },
  VTimeline: { density: 'comfortable', lineThickness: 1, dotColor: 'primary' },
  VSparkline: { color: 'primary', lineWidth: 2, smooth: true },

  /* ── Content ── */
  VAvatar: { rounded: 'circle', size: 32 },
  VIcon: { size: 20 },
  VImg: { cover: true },
  VCarousel: { hideDelimiterBackground: true, showArrows: 'hover', progress: 'primary' },
  VWindow: { showArrows: false },
  VSlideGroup: { showArrows: true },
  VDivider: { thickness: 1 },

  /* ── Layout / Utility ── */
  VForm: { validateOn: 'submit' },
  VLazy: { minHeight: 0 },
} as const

/* 사용법 (nuxt plugin 또는 main.ts):
import { createVuetify } from 'vuetify'
import { dsTheme } from '~/design/theme'
import { dsDefaults } from '~/design/defaults'
import { dsLocale, dsDate } from '~/design/locale'

createVuetify({ theme: dsTheme, defaults: dsDefaults, locale: dsLocale, date: dsDate })

locale과 date를 빠뜨리면 Vuetify 내부 문구가 영어로 남습니다 —
달력 요일이 S M T W T F S로, 페이지네이션 안내가 영문으로 나옵니다.
*/
