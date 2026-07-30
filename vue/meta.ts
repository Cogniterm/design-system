// 컴포넌트 출처 목록 — 문서 배지 자동 생성용 (브리프 3장)
export type Origin = 'custom' | 'wrapped' | 'vuetify'

export interface ComponentMeta {
  name: string
  origin: Origin
  vuetifyBase: string | null
  reason: { en: string; ko: string }
  since: string
}

const custom = (name: string, en: string, ko: string): ComponentMeta =>
  ({ name, origin: 'custom', vuetifyBase: null, reason: { en, ko }, since: '0.1.0' })

export const meta: ComponentMeta[] = [
  custom('DsButton', 'Purely visual; avoids Vuetify specificity wars.', '시각이 전부라 직접 제작. Vuetify 특이도 충돌 회피.'),
  custom('DsInput', 'VTextField wraps VField 5-6 layers deep; unwrapping costs more than rebuilding.', 'VTextField 래퍼가 5~6겹이라 새로 만드는 게 저렴.'),
  custom('DsBadge', 'Read-only status label; trivial visual component.', '읽기 전용 상태 라벨. 시각이 전부.'),
  custom('DsChip', 'Removable selection item; simpler than VChip.', '제거 가능한 선택 항목. VChip보다 단순하게.'),
  custom('DsAvatar', 'Initials/image circle with group overlap.', '이니셜·이미지 원형 + 겹침 그룹.'),
  custom('DsCard', 'Border-based surface, no elevation system needed.', '보더 기반 면. elevation 시스템 불필요.'),
  custom('DsDivider', '1px rule with optional label.', '라벨 옵션 있는 1px 구분선.'),
  custom('DsSkeleton', 'Shimmer placeholder for data loading.', '데이터 로딩용 셔머 뼈대.'),
  custom('DsToast', 'Single-action notification; shadow allowed (floating).', '액션 하나까지 담는 알림. 떠 있는 요소라 그림자 허용.'),
  custom('DsEmptyState', 'Empty screens must propose next action.', '빈 화면은 반드시 다음 행동을 제안.'),
  custom('DsChatMessage', 'No conversational message component in Vuetify. Streaming height changes and reverse scroll anchoring unsupported by VCard.', 'Vuetify에 대화형 메시지 컴포넌트 없음. 스트리밍 높이 변화·역방향 스크롤 앵커링을 VCard가 지원 못함.'),
  custom('DsStreamingText', 'Blinking caret during token streaming.', '토큰 스트리밍 중 깜빡이는 커서.'),
  custom('DsThinkingIndicator', 'Progress-with-words instead of bare spinner (Principle 1).', '빈 스피너 대신 말로 하는 진행 표시 (원칙 1).'),
  custom('DsToolCallStep', 'Tool execution steps; collapsible but never removed (Principle 4).', '도구 실행 단계. 접어도 없애지 않음 (원칙 4).'),
  custom('DsAgentInput', 'Auto-grow composer with attach/slash; Enter to send.', 'auto-grow 입력창 + 첨부/슬래시. Enter 전송.'),
  custom('DsCitationChip', 'Numbered evidence chip linking to source.', '근거 출처 번호 칩. 클릭 시 원문 이동.'),
  custom('DsArtifactPanel', 'Panel for agent-generated outputs.', '에이전트 산출물 패널.'),
  custom('DsSearchResult', 'Search hit with highlighted context.', '하이라이트 문맥 포함 검색 결과.'),
  custom('DsFileGrid', 'Drive grid view with multi-select.', '드라이브 그리드 보기 + 다중 선택.'),
  custom('DsFileRow', 'Drive list row, compact 40px density.', '드라이브 리스트 행. compact 40px 밀도.'),
  {
    name: 'DataTable', origin: 'wrapped', vuetifyBase: 'VDataTable',
    reason: {
      en: 'Sorting/pagination/selection behavior is hard; keep VDataTable, restyle via defaults.',
      ko: '정렬·페이지네이션·선택 동작은 어려움 — VDataTable 유지, defaults로만 스타일 조정.',
    },
    since: '0.1.0',
  },
]
