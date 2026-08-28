// ⚠️ Vuetify 의존 배럴 — Vuetify가 설치된 앱에서만 import 하세요.
// 의존성 없는 컴포넌트는 './index' 에서 가져옵니다.

/* ── Action ── */
export { default as DsIconButton } from './components/vuetify/DsIconButton.vue'
export { default as DsMenu } from './components/vuetify/DsMenu.vue'

/* ── Navigation ── */
export { default as DsTabs } from './components/vuetify/DsTabs.vue'
export { default as DsBreadcrumbs } from './components/vuetify/DsBreadcrumbs.vue'
export { default as DsPagination } from './components/vuetify/DsPagination.vue'
export { default as DsNavList } from './components/vuetify/DsNavList.vue'
export { default as DsStepper } from './components/vuetify/DsStepper.vue'

/* ── Data Input ── */
export { default as DsSelect } from './components/vuetify/DsSelect.vue'
export { default as DsAutocomplete } from './components/vuetify/DsAutocomplete.vue'
export { default as DsTextarea } from './components/vuetify/DsTextarea.vue'
export { default as DsSwitch } from './components/vuetify/DsSwitch.vue'
export { default as DsSlider } from './components/vuetify/DsSlider.vue'
export { default as DsFileInput } from './components/vuetify/DsFileInput.vue'
export { default as DsCalendar } from './components/vuetify/DsCalendar.vue'
export { default as DsDatePicker } from './components/vuetify/DsDatePicker.vue'

/* ── Feedback & Status ── */
export { default as DsAlert } from './components/vuetify/DsAlert.vue'
export { default as DsBanner } from './components/vuetify/DsBanner.vue'
export { default as DsProgressBar } from './components/vuetify/DsProgressBar.vue'
export { default as DsSpinner } from './components/vuetify/DsSpinner.vue'
export { default as DsSnackbar } from './components/vuetify/DsSnackbar.vue'

/* ── Overlay ── */
export { default as DsDialog } from './components/vuetify/DsDialog.vue'
export { default as DsTooltip } from './components/vuetify/DsTooltip.vue'

/* ── Table & List ── */
export { default as DsDataTable } from './components/vuetify/DsDataTable.vue'
export { default as DsList } from './components/vuetify/DsList.vue'
export { default as DsAccordion } from './components/vuetify/DsAccordion.vue'

/* ── 추가 (Astryx 격차 보완) ── */
export { default as DsNumberInput } from './components/vuetify/DsNumberInput.vue'
export { default as DsCombobox } from './components/vuetify/DsCombobox.vue'
export { default as DsPopover } from './components/vuetify/DsPopover.vue'
export { default as DsHoverCard } from './components/vuetify/DsHoverCard.vue'
export { default as DsCommandPalette } from './components/vuetify/DsCommandPalette.vue'

/* ── 설정 ── */
export { dsDefaults } from './defaults'
export { dsTheme, dsLight, dsDark } from './theme'
export { lucideIconSet, lucideAliases } from './vuetify-icons'

// 이 앱이 어느 시점의 디자인 시스템을 쓰는지 — 내용 지문 + 생성일
export { DS_VERSION, DS_BUILT_AT } from './version'
