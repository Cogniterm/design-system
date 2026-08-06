<#
  setup.ps1 — Cogniterm Design System 개발 환경 한 번에 만들기 (Windows)

  VS Code 말고는 아무것도 없는 컴퓨터를 전제로 합니다.
  Node.js가 없으면 winget으로 설치하고, git이 없어도 압축본을 내려받아
  프로젝트를 만들고 설정 파일을 넣고 화면을 띄웁니다.

  쓰는 법 — VS Code 터미널에 이 한 줄:
    irm https://Cogniterm.github.io/design-system/setup/setup.ps1 | iex

  같은 이름의 폴더가 이미 있으면 아무것도 하지 않고 멈춥니다.
  설정 파일 내용은 이 스크립트가 아니라 setup/template/에 있습니다.
#>

$ErrorActionPreference = 'Stop'
$AppName = if ($env:DS_APP_NAME) { $env:DS_APP_NAME } else { 'my-app' }
$Zip     = 'https://github.com/Cogniterm/design-system/archive/refs/heads/main.zip'

function Step($n, $t) { Write-Host "`n[$n/7] $t" -ForegroundColor Cyan }
function Ok($t)       { Write-Host "      OK  $t" -ForegroundColor Green }
function Warn($t)     { Write-Host "      !   $t" -ForegroundColor Yellow }
function Die($t)      { Write-Host "`n실패: $t`n" -ForegroundColor Red; exit 1 }

Write-Host ''
Write-Host 'Cogniterm Design System — 개발 환경 세팅' -ForegroundColor White
Write-Host "만들 위치: $(Join-Path (Get-Location) $AppName)" -ForegroundColor DarkGray

if (Test-Path $AppName) {
  Die "'$AppName' 폴더가 이미 있습니다. 다른 폴더에서 실행하거나, 다른 이름을 쓰세요:
       `$env:DS_APP_NAME = 'other-name'"
}

# ── 1. Node.js ───────────────────────────────────────────────
Step 1 'Node.js 확인'
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Warn 'Node.js가 없습니다 — winget으로 설치합니다 (2~3분)'
  if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
    Die 'winget이 없습니다. https://nodejs.org 에서 LTS를 설치한 뒤 다시 실행하세요.'
  }
  winget install --id OpenJS.NodeJS.LTS --silent --accept-source-agreements --accept-package-agreements
  # 방금 설치한 것은 지금 터미널의 PATH에 없습니다 — 다시 읽어옵니다
  $env:Path = [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' +
              [Environment]::GetEnvironmentVariable('Path', 'User')
  if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Die '설치는 됐는데 이 터미널이 아직 못 찾습니다. VS Code를 껐다 켜고 다시 실행하세요.'
  }
}
$major = [int]((node -v).TrimStart('v').Split('.')[0])
if ($major -lt 20) { Die "Node.js $(node -v)는 너무 낮습니다. 20 이상이 필요합니다." }
Ok "Node.js $(node -v)"

# ── 2. 디자인 시스템 내려받기 (git 없이) ─────────────────────
Step 2 '디자인 시스템 내려받기'
$tmp = Join-Path $env:TEMP ('ds-' + [guid]::NewGuid().ToString('N').Substring(0, 8))
New-Item -ItemType Directory -Path $tmp | Out-Null
Invoke-WebRequest -Uri $Zip -OutFile (Join-Path $tmp 'ds.zip') -UseBasicParsing
Expand-Archive -Path (Join-Path $tmp 'ds.zip') -DestinationPath $tmp -Force
$DS = (Get-ChildItem $tmp -Directory | Where-Object { $_.Name -like 'design-system-*' } |
       Select-Object -First 1).FullName
if (-not $DS) { Die '압축을 풀었는데 폴더를 못 찾았습니다.' }
Ok '내려받음'

# ── 3. 프로젝트 만들기 ───────────────────────────────────────
Step 3 '프로젝트 만들기'
npm create vite@latest $AppName -- --template vue-ts | Out-Null
if (-not (Test-Path $AppName)) { Die '프로젝트 생성에 실패했습니다.' }
Set-Location $AppName
Ok $AppName

# ── 4. 패키지 설치 ───────────────────────────────────────────
Step 4 '패키지 설치 (1~3분)'
npm install --silent --no-fund --no-audit
npm install --silent --no-fund --no-audit vue vuetify@3.11.6 lucide-vue-next pretendard
npm install --silent --no-fund --no-audit -D vite '@vitejs/plugin-vue' vite-plugin-vuetify typescript vue-tsc
Ok '설치 완료'

# ── 5. 디자인 시스템 파일 복사 ───────────────────────────────
Step 5 '디자인 시스템 파일 복사'
New-Item -ItemType Directory -Path 'src/design' -Force | Out-Null
Copy-Item (Join-Path $DS 'vue/*') 'src/design' -Recurse -Force
Copy-Item (Join-Path $DS 'ds.css'), (Join-Path $DS 'ds-vuetify.css') 'src/design' -Force
Ok 'src/design/'

# ── 6. 설정 파일 넣기 ────────────────────────────────────────
Step 6 '설정 파일 넣기'
# 내용은 setup/template/에 그대로 있습니다 — 스크립트가 문자열로 들고 있지 않습니다
Copy-Item (Join-Path $DS 'setup/template/*') '.' -Recurse -Force
# Vite 템플릿이 만든 tsconfig 조각들은 우리 tsconfig.json이 대신하므로 지웁니다
# (남겨 두면 tsconfig가 세 개라 어느 것이 진짜인지 헷갈립니다)
Remove-Item 'tsconfig.app.json', 'tsconfig.node.json' -ErrorAction SilentlyContinue
Ok 'vite.config.ts · tsconfig.json · vuetify-layer.css · main.ts · App.vue'

Remove-Item $tmp -Recurse -Force -ErrorAction SilentlyContinue

# ── 7. 실행 ──────────────────────────────────────────────────
Step 7 '개발 서버 실행'
Write-Host ''
Write-Host '  브라우저에서 확인할 것 — 버튼이 파란색(#1F7FF0)인지' -ForegroundColor White
Write-Host '  멈추기 Ctrl+C · 다시 켜기 npm run dev' -ForegroundColor DarkGray
Write-Host ''
npm run dev
