/* ============================================
   icons.ts — 아이콘 레지스트리
   ============================================
   세트: Lucide (@lucide/vue) · ISC 라이선스 · 선 굵기 2px

   ⚠️ 이 파일은 @lucide/vue에 의존합니다.
      Standalone 컴포넌트(~/design)는 여전히 의존성이 없습니다.

   규칙 — 같은 뜻에는 항상 같은 아이콘.
   Lucide 이름이 아니라 **의미로** 이름을 짓습니다.
   나중에 세트를 바꾸더라도 화면 코드는 그대로 둘 수 있습니다.
*/
import {
  Search, Filter, X, Plus, Check, Copy, Download, Upload, Trash2, Pencil,
  MoreHorizontal, ChevronDown, ChevronRight, ChevronLeft, ArrowLeft, ArrowRight,
  ExternalLink, RefreshCw, Settings, Eye, Archive, Send, Paperclip, Slash,
  Folder, FolderOpen, File, FileText, FileSpreadsheet, HardDrive,
  Bot, Sparkles, Zap, MessageSquare, Quote, PanelRight, Database,
  LayoutGrid, List, Table, Calendar, Clock, Bell,
  User, Users, Building2, Globe, Shield, ShieldAlert, Lock, LogOut,
  AlertCircle, AlertTriangle, CheckCircle2, Info, Loader2,
  Play, Pause, Sun, Moon, Link2, Star,
} from '@lucide/vue'

/* ── 의미 → 아이콘 ─────────────────────────
   왼쪽 이름이 우리 어휘입니다. 화면에서는 이 이름만 씁니다. */
export const icons = {
  /* 액션 */
  search: Search,
  filter: Filter,
  close: X,
  add: Plus,
  confirm: Check,
  copy: Copy,
  download: Download,
  upload: Upload,
  delete: Trash2,
  edit: Pencil,
  more: MoreHorizontal,
  refresh: RefreshCw,
  settings: Settings,
  view: Eye,
  archive: Archive,
  send: Send,
  attach: Paperclip,
  command: Slash,
  externalLink: ExternalLink,
  link: Link2,

  /* 방향 */
  expand: ChevronDown,
  collapse: ChevronRight,
  prev: ChevronLeft,
  back: ArrowLeft,
  forward: ArrowRight,

  /* 파일 · 드라이브 */
  folder: Folder,
  folderOpen: FolderOpen,
  file: File,
  document: FileText,
  spreadsheet: FileSpreadsheet,
  drive: HardDrive,

  /* 에이전트 */
  agent: Bot,
  ai: Sparkles,
  run: Zap,
  chat: MessageSquare,
  citation: Quote,
  artifact: PanelRight,
  source: Database,

  /* 보기 · 시간 */
  gridView: LayoutGrid,
  listView: List,
  tableView: Table,
  calendar: Calendar,
  time: Clock,
  recent: Clock,
  favorite: Star,
  notification: Bell,

  /* 사람 · 권한 */
  user: User,
  team: Users,
  /* 드라이브 스코프 — AI 드라이브 화면과 파일피커가 같은 아이콘을 쓰도록 의미로 등록 (2026-08-26).
     그전에는 피커가 team(사람들)·drive(하드디스크)를 빌려 써서 같은 '조직'·'공용'이
     두 화면에서 다른 아이콘으로 나왔습니다 — 이 레지스트리의 원칙("같은 뜻에는 같은 아이콘") 위반. */
  organization: Building2,
  shared: Globe,
  permission: Shield,
  permissionDenied: ShieldAlert,
  lock: Lock,
  signOut: LogOut,

  /* 상태 */
  error: AlertCircle,
  warning: AlertTriangle,
  success: CheckCircle2,
  info: Info,
  loading: Loader2,

  /* 기타 */
  play: Play,
  pause: Pause,
  light: Sun,
  dark: Moon,
} as const

export type IconName = keyof typeof icons

/* 크기 토큰 — 16 / 20 / 24 외의 값은 쓰지 않습니다.
   그 사이 값(18, 22)은 픽셀 그리드가 어긋나 흐려집니다. */
export const ICON_SIZES = { sm: 16, md: 20, lg: 24 } as const
export type IconSize = keyof typeof ICON_SIZES
