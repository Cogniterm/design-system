#!/usr/bin/env bash
# setup.sh — Cogniterm Design System 개발 환경 한 번에 만들기 (macOS · Linux)
#
# 쓰는 법 — VS Code 터미널에 이 한 줄:
#   curl -fsSL https://Cogniterm.github.io/design-system/setup/setup.sh | bash
#
# 같은 이름의 폴더가 이미 있으면 아무것도 하지 않고 멈춥니다.
# 설정 파일 내용은 이 스크립트가 아니라 setup/template/에 있습니다.
set -euo pipefail

APP="${DS_APP_NAME:-my-app}"
ZIP='https://github.com/Cogniterm/design-system/archive/refs/heads/main.zip'
step() { printf '\n\033[36m[%s/7] %s\033[0m\n' "$1" "$2"; }
ok()   { printf '      \033[32mOK  %s\033[0m\n' "$1"; }
die()  { printf '\n\033[31m실패: %s\033[0m\n\n' "$1"; exit 1; }

printf '\nCogniterm Design System — 개발 환경 세팅\n'
printf '만들 위치: %s/%s\n' "$(pwd)" "$APP"
[ -e "$APP" ] && die "'$APP' 폴더가 이미 있습니다. 다른 폴더에서 실행하거나 DS_APP_NAME을 바꾸세요."

step 1 'Node.js 확인'
if ! command -v node >/dev/null 2>&1; then
  if command -v brew >/dev/null 2>&1; then
    printf '      ! Node.js가 없습니다 — Homebrew로 설치합니다\n'; brew install node
  else
    die 'Node.js가 없습니다. https://nodejs.org 에서 LTS를 설치한 뒤 다시 실행하세요.'
  fi
fi
MAJOR="$(node -v | sed 's/^v//' | cut -d. -f1)"
[ "$MAJOR" -lt 20 ] && die "Node.js $(node -v)는 너무 낮습니다. 20 이상이 필요합니다."
ok "Node.js $(node -v)"

step 2 '디자인 시스템 내려받기'
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
curl -fsSL "$ZIP" -o "$TMP/ds.zip"
( cd "$TMP" && unzip -q ds.zip )
DS="$(find "$TMP" -maxdepth 1 -type d -name 'design-system-*' | head -1)"
[ -z "$DS" ] && die '압축을 풀었는데 폴더를 못 찾았습니다.'
ok '내려받음'

step 3 '프로젝트 만들기'
npm create vite@latest "$APP" -- --template vue-ts >/dev/null
cd "$APP"; ok "$APP"

step 4 '패키지 설치 (1~3분)'
npm install --silent --no-fund --no-audit
npm install --silent --no-fund --no-audit vue vuetify@3.11.6 lucide-vue-next pretendard
npm install --silent --no-fund --no-audit -D vite @vitejs/plugin-vue vite-plugin-vuetify typescript vue-tsc
ok '설치 완료'

step 5 '디자인 시스템 파일 복사'
mkdir -p src/design
cp -R "$DS/vue/." src/design/
cp "$DS/ds.css" "$DS/ds-vuetify.css" src/design/
ok 'src/design/'

step 6 '설정 파일 넣기'
cp -R "$DS/setup/template/." .
# Vite 템플릿이 만든 tsconfig 조각들은 우리 tsconfig.json이 대신하므로 지웁니다
rm -f tsconfig.app.json tsconfig.node.json
ok 'vite.config.ts · tsconfig.json · vuetify-layer.css · main.ts · App.vue'

step 7 '개발 서버 실행'
printf '\n  브라우저에서 확인할 것 — 버튼이 파란색(#1F7FF0)인지\n'
printf '  멈추기 Ctrl+C · 다시 켜기 npm run dev\n\n'
npm run dev
